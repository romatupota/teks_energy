import os
import cloudinary
import cloudinary.uploader
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime
import pytz
import json
from typing import List, Optional

from . import models, schemas, auth, database, crud

cloudinary.config( 
    cloud_name = "dohdugb5p", 
    api_key = "727274989311534", 
    api_secret = "czltXbr4R1LePYesKmwQzL7CuPw" 
)

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="TeksEnergy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://teks.energy/",
        "https://teks-energy-admin-panel.onrender.com",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "static/uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Невірний логін або пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/content", response_model=List[schemas.ContentOut])
def get_all_content(db: Session = Depends(database.get_db)):
    return crud.get_all_content(db)

@app.get("/content/{content_id}", response_model=schemas.ContentOut)
def get_single_project(content_id: int, db: Session = Depends(database.get_db)):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if not db_content:
        raise HTTPException(status_code=404, detail="Проєкт не знайдено")
    return db_content

@app.post("/content", response_model=schemas.ContentOut)
def create_project(
    title: str = Form(...),
    body: str = Form(...),
    short_description: str = Form(None),
    image_url: str = Form(None),
    additional_images: str = Form(""),
    items: str = Form("[]"),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    project_data = schemas.ContentCreate(
        title=title,
        body=body,
        short_description=short_description,
        image_url=image_url,
        additional_images=additional_images
    )
    db_content = crud.create_content(db=db, content=project_data, owner_id=current_user.id)
    
    try:
        items_list = json.loads(items)
        for index, item_text in enumerate(items_list):
            if isinstance(item_text, dict):
                desc = item_text.get("description", "")
            else:
                desc = str(item_text)
            
            if desc.strip():
                db_item = models.Item(
                    number=index + 1,
                    description=desc,
                    project_id=db_content.id
                )
                db.add(db_item)
        db.commit()
        db.refresh(db_content)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Помилка обробки пунктів структури: {str(e)}")
        
    return db_content

@app.patch("/content/{content_id}", response_model=schemas.ContentOut)
def update_project(
    content_id: int,
    content_update: schemas.ContentUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    updated_content = crud.update_content(db, content_id, content_update)
    if not updated_content:
        raise HTTPException(status_code=404, detail="Контент не знайдено")
    return updated_content

@app.delete("/content/{content_id}")
def delete_project(
    content_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    success = crud.delete_content(db, content_id)
    if not success:
        raise HTTPException(status_code=404, detail="Контент не знайдено")
    return {"detail": "Проєкт видалено"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        result = cloudinary.uploader.upload(file.file)
        return {"url": result['secure_url']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Помилка завантаження в хмару: {str(e)}")

@app.post("/upload-multiple")
async def upload_multiple_files(files: List[UploadFile] = File(...)):
    urls = []
    for file in files:
        try:
            result = cloudinary.uploader.upload(file.file)
            urls.append(result['secure_url'])
        except Exception as e:
            continue
    return urls

@app.post("/applications", response_model=schemas.ApplicationOut)
def send_application(app_data: schemas.ApplicationCreate, db: Session = Depends(database.get_db)):
    return crud.create_application(db=db, app_data=app_data)

@app.get("/applications", response_model=List[schemas.ApplicationOut])
def read_applications(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_applications(db)

@app.delete("/applications/{app_id}")
def delete_application(
    app_id: int, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    success = crud.delete_application(db, app_id)
    if not success:
        raise HTTPException(status_code=404, detail="Заявку не знайдено")
    return {"detail": "Заявку видалено успішно"}

@app.post("/api/content/items/{project_id}")
async def save_project_items_flexible(
    project_id: int, 
    payload: list, 
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    project = db.query(models.Content).filter(models.Content.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проєкт не знайдено")
    try:
        db.query(models.Item).filter(models.Item.project_id == project_id).delete()
        for index, item_data in enumerate(payload):
            desc = item_data.get("description", "") if isinstance(item_data, dict) else str(item_data)
            if desc.strip():
                db_item = models.Item(
                    number=index + 1, 
                    description=desc, 
                    project_id=project_id
                )
                db.add(db_item)
        db.commit()
        return {"status": "success", "message": f"Синхронізовано пунктів: {len(payload)} для проєкту {project_id}"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/content/items/{project_id}")
async def get_project_items(project_id: int, db: Session = Depends(database.get_db)):
    project = db.query(models.Content).filter(models.Content.id == project_id).first()
    if not project:
        return []
    return db.query(models.Item).filter(models.Item.project_id == project_id).order_by(models.Item.number.asc()).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)
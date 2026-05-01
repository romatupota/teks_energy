import os
import cloudinary
import cloudinary.uploader
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import List

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
        "https://teks-energy-admin-panel.onrender.com",
        "https://teks-energy-content-site.onrender.com",
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

@app.post("/content", response_model=schemas.ContentOut)
def create_project(
    content: schemas.ContentCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_content(db=db, content=content, owner_id=current_user.id)

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)
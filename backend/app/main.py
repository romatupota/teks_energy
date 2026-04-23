import os
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import List
from . import models, schemas, auth, database, crud

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="TeksEnergy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "static/uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
app.mount("/static", StaticFiles(directory="static"), name="static")

# --- 3. ЕНДПОІНТИ АВТОРИЗАЦІЇ ---

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

@app.post("/admins", response_model=schemas.UserOut)
def create_admin(
    user: schemas.UserCreate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Користувач вже існує")
    return crud.create_user(db=db, user=user)

@app.get("/admins", response_model=List[schemas.UserOut])
def read_admins(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_users(db)

@app.delete("/admins/{username}")
def delete_admin(
    username: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Недостатньо прав")
    success = crud.delete_user(db, username)
    if not success:
        raise HTTPException(status_code=404, detail="Адміна не знайдено")
    return {"detail": f"Користувача {username} видалено"}

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

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
):
    file_name = file.filename.replace(" ", "_")
    file_path = f"{UPLOAD_DIR}/{file_name}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {"url": f"http://127.0.0.1:8000/{file_path}"}

@app.post("/upload-multiple")
async def upload_multiple_files(files: list[UploadFile] = File(...)):
    urls = []
    # Створюємо папку, якщо її немає
    upload_dir = "static/uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    for file in files:
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        # ВАЖЛИВО: URL має збігатися з адресою сервера
        urls.append(f"http://127.0.0.1:8000/static/uploads/{file.filename}")
    
    return urls

@app.post("/applications", response_model=schemas.ApplicationOut)
def send_application(app_data: schemas.ApplicationCreate, db: Session = Depends(database.get_db)):
    # Публічний ендпоінт для клієнтів
    return crud.create_application(db=db, app_data=app_data)

@app.get("/applications", response_model=list[schemas.ApplicationOut])
def read_applications(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_applications(db)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
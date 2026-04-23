from sqlalchemy.orm import Session
from . import models, schemas, auth
from datetime import datetime, timedelta, timezone

offset = timezone(timedelta(hours=3))

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        hashed_password=hashed_password,
        is_superuser=False
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, username: str):
    db_user = db.query(models.User).filter(models.User.username == username).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

def get_all_content(db: Session):
    return db.query(models.Content).all()

def create_content(db: Session, content: schemas.ContentCreate, owner_id: int):
    db_content = models.Content(
        title=content.title,
        body=content.body,
        image_url=content.image_url,
        additional_images=content.additional_images,
        owner_id=owner_id
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

def update_content(db: Session, content_id: int, content_update: schemas.ContentUpdate):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if db_content:
        update_data = content_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_content, key, value)
        db.commit()
        db.refresh(db_content)
    return db_content

def create_application(db: Session, app_data: schemas.ApplicationCreate):
    db_app = models.Application(
        user_name=app_data.user_name,
        user_phone=app_data.user_phone,
        service_type=app_data.service_type
    )
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

def get_applications(db: Session):
    return db.query(models.Application).order_by(models.Application.created_at.desc()).all()
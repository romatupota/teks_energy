from sqlalchemy.orm import Session
from . import models, schemas, auth
from datetime import datetime, timedelta, timezone
import pytz

offset = timezone(timedelta(hours=3))
kyiv_tz = pytz.timezone('Europe/Kyiv')

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
        short_description=content.short_description,
        image_url=content.image_url,
        additional_images=content.additional_images,
        structure_items=content.structure_items,
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

def delete_content(db: Session, content_id: int):
    db_content = db.query(models.Content).filter(models.Content.id == content_id).first()
    if db_content:
        db.delete(db_content)
        db.commit()
        return True
    return False

def create_application(db: Session, app_data: schemas.ApplicationCreate):
    current_time = datetime.now(kyiv_tz) 
    db_application = models.Application(
        **app_data.model_dump(),
        created_at=current_time
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def get_applications(db: Session):
    return db.query(models.Application).order_by(models.Application.created_at.desc()).all()

def delete_application(db: Session, app_id: int):
    db_app = db.query(models.Application).filter(models.Application.id == app_id).first()
    if db_app:
        db.delete(db_app)
        db.commit()
        return True
    return False

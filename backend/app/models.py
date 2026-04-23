from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from .database import Base
from datetime import datetime, timedelta, timezone

offset = timezone(timedelta(hours=3))

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_superuser = Column(Boolean, default=False)

class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body = Column(String)
    image_url = Column(String)  # Основне фото
    additional_images = Column(String, default="")
    owner_id = Column(Integer, ForeignKey("users.id"))

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_phone = Column(String, nullable=False)
    service_type = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


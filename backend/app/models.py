from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, JSON
from datetime import datetime, timedelta, timezone
from .database import Base

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
    short_description = Column(String(255), nullable=True)
    body = Column(String)
    image_url = Column(String)
    additional_images = Column(String, default="")
    owner_id = Column(Integer, ForeignKey("users.id"))
    structure_items = Column(JSON, default=list)

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_phone = Column(String, nullable=False)
    service_type = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


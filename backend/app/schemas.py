from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_superuser: bool
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ContentBase(BaseModel):
    title: str
    body: str
    image_url: Optional[str] = None
    additional_images: Optional[str] = "" 

class ContentCreate(ContentBase):
    pass

class ContentUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    image_url: Optional[str] = None
    additional_images: Optional[str] = None

class ContentOut(ContentBase):
    id: int
    owner_id: int
    class Config:
        from_attributes = True

class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None

class ApplicationCreate(BaseModel):
    user_name: str
    user_phone: str
    service_type: str

class ApplicationOut(ApplicationCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
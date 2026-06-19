from pydantic import BaseModel
from typing import Optional, List
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
    short_description: Optional[str] = None
    image_url: Optional[str] = None
    additional_images: Optional[str] = "" 
    structure_items: Optional[List[str]] = []

class ContentCreate(ContentBase):
    pass

class ContentUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    short_description: Optional[str] = None
    image_url: Optional[str] = None
    additional_images: Optional[str] = None
    structure_items: Optional[List[str]] = None

class ContentOut(ContentBase):
    id: int
    owner_id: int
    
    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    user_name: str
    user_phone: str
    service_type: Optional[str] = None

class ApplicationOut(ApplicationCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
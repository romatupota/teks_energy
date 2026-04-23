from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import database, models, schemas

SECRET_KEY = "DEV_SECRET_KEY_CHANGE_IN_PRODUCTION"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto", truncate_error=False)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": int(expire.timestamp())}) 
        
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(db: Session = Depends(database.get_db), token: str = Depends(oauth2_scheme)):
    print(f"\n[DEBUG] Отримано токен: {token[:15]}...")
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        print(f"[DEBUG] Розшифрований username: {username}")
        
        if username is None:
            print("[DEBUG] Помилка: username (sub) відсутній у токені")
            raise credentials_exception
    except JWTError as e:
        print(f"[DEBUG] Помилка JWT: {str(e)}")
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.username == username).first()
    
    if user is None:
        print(f"[DEBUG] Помилка: Користувача {username} не знайдено в базі")
        raise credentials_exception
        
    print(f"[DEBUG] Успішна авторизація для: {user.username}")
    return user
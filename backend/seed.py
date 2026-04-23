from app.database import SessionLocal, engine
from app import models, auth

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

admin = db.query(models.User).filter(models.User.username == "root").first()
if not admin:
    new_admin = models.User(
        username="root",
        hashed_password=auth.get_password_hash("A4FmQmo24!{f}"),
        is_superuser=True
    )
    db.add(new_admin)
    db.commit()
    print(" Адмін створений: логін 'root', пароль 'A4FmQmo24!{f}'")
else:
    print(" Адмін вже існує")
db.close()
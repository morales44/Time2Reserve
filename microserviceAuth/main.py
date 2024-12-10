from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import pymysql
import jwt
import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from google.oauth2 import id_token

from google.auth.transport import requests

db = pymysql.connect(
    host="localhost",
    user="root",
    password="root",
    db="time2reserve",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

app = FastAPI(
    title="Authentication API",
    description="API for user authentication and favorite lanes management.",
    version="1.0.0",
    docs_url="/docs",  # Path for Swagger documentation
    redoc_url="/redoc",  # Path for ReDoc documentation
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Modelo Pydantic para el registro y login de usuarios
class User(BaseModel):
    name: str
    username: str
    password: str

# Load environment variables
load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
 
# Función para crear un token JWT
def create_jwt_token(data: dict):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    data.update({"exp": expiration})
    token = jwt.encode(data, os.getenv("SECRET_KEY"), algorithm="HS256")
    return token

# Ruta para generar el token JWT
@app.post("/auth/token")
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    cursor = db.cursor()
    query = "SELECT * FROM user WHERE username=%s AND password=%s"
    cursor.execute(query, (form_data.username, form_data.password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        token = create_jwt_token({"sub": user["username"]})
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

# Route to register a new user
@app.post("/auth/register")
async def register(user_data: User):
    cursor = db.cursor()
    
    # Check if the user already exists in the database
    query = "SELECT * FROM user WHERE username=%s"
    cursor.execute(query, (user_data.username,))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        raise HTTPException(status_code=400, detail="User already exists")

    # Insert the new user into the database
    insert_query = "INSERT INTO user (name, username, password) VALUES (%s, %s, %s)"
    cursor.execute(insert_query, (user_data.name, user_data.username, user_data.password))
    
    db.commit()
    cursor.close()
    
    return {"message": "User registered successfully"}

@app.post("/auth/google")
async def google_login(user: dict):
    cursor = db.cursor()
    print(user)
            
    # Check if the user already exists in the database
    query = "SELECT * FROM user WHERE name=%s"
    cursor.execute(query, (user["credentialResponseDecoded"]["name"],))
    
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        token = create_jwt_token({"sub": existing_user["username"]})
        return {"access_token": token, "token_type": "bearer"}
    else:
        query = "INSERT INTO user (username, name, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (user["credentialResponseDecoded"]["name"], user["credentialResponseDecoded"]["given_name"],""))
        db.commit()
        cursor.close()
        token = create_jwt_token({"sub": user["credentialResponseDecoded"]["name"]})
        return {"access_token": token, "token_type": "bearer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
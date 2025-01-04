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

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

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
    
# Function to get the current user
async def getCurrentUser(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Credencial inválida")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Credencial inválida")
    
# Route to get the current user
@app.get("/auth/users/me")
async def read_users_me(current_user: str = Depends(getCurrentUser)):
    return {"username": current_user}

    
class AddFavoriteRestaurant(BaseModel):
    restaurant: str # The name of the restaurant to add to the user's favorites

class DeleteFavoriteRestaurant(BaseModel):
    restaurant: str # The name of the restaurant to delete from the user's favorites

class FavoriteRestaurant(BaseModel):
    restaurantID: str 

# Route to add a favorite restaurant to the user
@app.post("/auth/favorite-restaurants/add")
async def add_favorite_restaurant(
        favorite_restaurant: AddFavoriteRestaurant,
        current_user: str = Depends(getCurrentUser)
    ):
        cursor = db.cursor()
        
        # Check if the restaurant is already a favorite
        query = "SELECT * FROM favoriteRestaurants WHERE username=%s AND restaurantID=%s"
        cursor.execute(query, (current_user, favorite_restaurant.restaurant))
        existing_favorite = cursor.fetchone()

        if existing_favorite:
            cursor.close()
            raise HTTPException(status_code=400, detail="The restaurant is already a favorite")

        # Add the restaurant to the user's favorites
        insert_query = "INSERT INTO favoriteRestaurants (username, restaurantID) VALUES (%s, %s)"
        cursor.execute(insert_query, (current_user, favorite_restaurant.restaurant))
        
        db.commit()
        cursor.close()
        
        return {"message": "restaurant added to favorites successfully"}

# Route to delete a favorite restaurant from the user
@app.delete("/auth/favorite-restaurants/delete")
async def delete_favorite_restaurant(
        favorite_restaurant: DeleteFavoriteRestaurant,
        current_user: str = Depends(getCurrentUser)
    ):
        cursor = db.cursor()
        
        # Delete the restaurant from the user's favorites
        delete_query = "DELETE FROM favoriteRestaurants WHERE username=%s AND restaurantID=%s"
        cursor.execute(delete_query, (current_user, favorite_restaurant.restaurant))
        
        db.commit()
        cursor.close()
        
        return {"message": "restaurant deleted from favorites successfully"}

# Route to get all the favorite restaurants of the user
@app.get("/auth/favorite-restaurants/all", response_model=list)
async def get_all_favorite_restaurants(current_user: str = Depends(getCurrentUser)):
    cursor = db.cursor()
    
    # Get all the favorite restaurants of the user
    query = "SELECT restaurantID, username FROM favoriteRestaurants WHERE username=%s"
    cursor.execute(query, (current_user,))
    favorite_restaurants = cursor.fetchall()
    
    cursor.close()
    
    return favorite_restaurants

@app.post("/auth/favorite-restaurants/check")
async def check_favorite_restaurant(
    restaurant: FavoriteRestaurant,
    current_user: str = Depends(getCurrentUser)
):
    cursor = db.cursor()
    
    # Check if the restaurant is a favorite
    query = "SELECT * FROM favoriteRestaurants WHERE username=%s AND restaurantID=%s"
    cursor.execute(query, (current_user, restaurant.restaurantID))
    favorite_restaurant = cursor.fetchone()
    
    cursor.close()
    
    # Return true if an element is found, false otherwise
    return {"isFavorite": favorite_restaurant is not None}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
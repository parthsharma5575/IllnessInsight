from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    app_name: str = "IllnessInsight API"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = int(os.getenv("PORT", 8000))
    cors_origins: list = ["*"]
    google_api_key: str = os.getenv("GOOGLE_API_KEY", "")
    model_path: str = "models"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 
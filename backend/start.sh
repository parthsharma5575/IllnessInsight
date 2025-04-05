#!/bin/bash

# Get the port from the environment variable or use a default
PORT=${PORT:-8000}

# Start the FastAPI application
uvicorn main:app --host=0.0.0.0 --port=$PORT 
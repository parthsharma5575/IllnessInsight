#!/bin/bash
# Get the port from environment variable or use default
PORT=${PORT:-8000}
echo "Starting server on port $PORT"
uvicorn main:app --host 0.0.0.0 --port $PORT 
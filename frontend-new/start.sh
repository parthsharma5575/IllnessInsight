#!/bin/bash
# Get the port from environment variable or use default
PORT=${PORT:-3000}
echo "Starting frontend on port $PORT"
npx serve -s build -l $PORT 
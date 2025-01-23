#!/bin/bash

# Configuration
LOCAL_DIST_DIR="./dist"  # Path to your local dist folder
REMOTE_USER="root"       # Remote server username (default root)
REMOTE_HOST="67.227.250.3" # Remote server IP or hostname
REMOTE_DIR="/root/astro" # Target directory on the server

# Check if the local dist directory exists
if [ ! -d "$LOCAL_DIST_DIR" ]; then
  echo "Error: Local dist directory '$LOCAL_DIST_DIR' does not exist."
  exit 1
fi

# Sync local dist folder to remote server
echo "Uploading '$LOCAL_DIST_DIR' to '$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR'..."
scp -r "$LOCAL_DIST_DIR"/* "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"

if [ $? -eq 0 ]; then
  echo "Upload complete!"
else
  echo "Error occurred during upload."
  exit 1
fi

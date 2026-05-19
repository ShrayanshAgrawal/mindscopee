#!/bin/bash

# Install frontend dependencies and build React
cd frontend
npm install
npm run build
cd ..

# Install backend dependencies
cd backend
pip install -r requirements.txt

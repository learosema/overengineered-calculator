#!/bin/sh
docker build -t overcalc-frontend:latest frontend
docker build -t overcalc-backend:latest backend

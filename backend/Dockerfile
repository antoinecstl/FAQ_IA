# 1. Base image Python
FROM python:3.10-slim

# 2. Créer un répertoire de travail
WORKDIR /app

# 3. Copier requirements et installer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copier le reste du code
COPY . .

# 5. Exposer le port interne FastAPI
EXPOSE 8000

# 6. Commande de démarrage (lancer l'app en mode prod)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

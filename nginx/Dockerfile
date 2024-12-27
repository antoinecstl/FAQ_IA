FROM nginx:alpine

# Supprimer la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Installer Certbot
RUN apk add --no-cache certbot certbot-nginx

# Copier notre config personnalisée
COPY nginx.conf /etc/nginx/conf.d/

# Créer le répertoire pour les challenges ACME
RUN mkdir -p /var/www/certbot

EXPOSE 80
EXPOSE 443

CMD ["sh", "-c", "nginx -g 'daemon off;' & certbot certonly --nginx --non-interactive --agree-tos --email your-email@example.com -d yourdomain"]

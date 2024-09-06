FROM nginx:latest

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier votre propre configuration Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

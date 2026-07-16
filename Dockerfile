FROM nginx:alpine

# OpenShift runs containers as an arbitrary non-root UID by default.
# nginx unprivileged base handles this, but for the vanilla nginx:alpine
# image we need to fix permissions so it can bind/write as any UID.
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf \
    && chgrp -R 0 /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx \
    && chmod -R g=u /var/cache/nginx /var/run /usr/share/nginx/html /etc/nginx

EXPOSE 8080

USER 1001

CMD ["nginx", "-g", "daemon off;"]

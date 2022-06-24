FROM php:8.1-alpine
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN mkdir app
VOLUME app
CMD tail -f /dev/null

FROM alpine:3.9.3

ENV LANG en_US.UTF-8

# psycopg2 - http://initd.org/psycopg/docs/install.html#build-prerequisites
RUN apk add --no-cache \
    gcc \
    git \
    musl-dev \
    postgresql-dev \
    python3 \
    python3-dev \
    wget

RUN pip3 install pipenv

RUN adduser -D mellophone
USER mellophone
WORKDIR /home/mellophone

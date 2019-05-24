FROM ubuntu:bionic-20181204

ENV DEBIAN_FRONTEND noninteractive 

RUN apt update -qqy && apt install -qqy \
    curl \
    libpq-dev \
    nginx \
    postgresql \
    postgresql-contrib \
    python3-dev \
    python3-pip \
    unzip

RUN pip3 install --user pipenv

RUN useradd -m conductor
USER conductor
WORKDIR /home/conductor


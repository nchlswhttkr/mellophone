FROM ubuntu:bionic-20181204

RUN apt update -qqy && DEBIAN_FRONTEND=noninteractive apt install -qqy \
    curl \
    libpq-dev \
    nginx \
    openssh-client \
    postgresql \
    postgresql-contrib \
    python3-dev \
    python3-pip \
    rsync \
    unzip

RUN pip3 install --upgrade pip

RUN useradd -m conductor
USER conductor
WORKDIR /home/conductor

ENV PATH="/home/conductor/.local/bin:${PATH}" LANG="C.UTF-8"
RUN echo "extended"
RUN pip3 install --user pipenv

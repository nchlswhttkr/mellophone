FROM ubuntu:18.04

RUN apt-get -qqy update && DEBIAN_FRONTEND=noninteractive apt-get -qqy --no-install-recommends install \
    curl \
    firefox \
    libpq-dev \
    openssh-client \
    python3-pip \
    rsync \
    unzip

RUN pip3 install --upgrade pip

ARG GECKODRIVER_VERSION=0.26.0
RUN curl -L https://github.com/mozilla/geckodriver/releases/download/v$GECKODRIVER_VERSION/geckodriver-v$GECKODRIVER_VERSION-linux64.tar.gz > /tmp/geckodriver.tar.gz \
    && tar -xf /tmp/geckodriver.tar.gz -C /opt \
    && ln -s /opt/geckodriver /usr/local/bin/geckodriver \
    && rm /tmp/geckodriver.tar.gz \
    && chmod +x /usr/local/bin/geckodriver /opt/geckodriver

RUN useradd -m conductor
USER conductor
WORKDIR /home/conductor

ENV PATH="/home/conductor/.local/bin:${PATH}" LANG="C.UTF-8"
RUN pip3 install --user pipenv

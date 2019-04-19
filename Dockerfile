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

ARG FIREFOX_VERSION=66.0.3
RUN wget -nv https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2 -O /tmp/firefox.tar.bz2 \
    && tar -xf /tmp/firefox.tar.bz2 -C /opt \
    && ln -s /opt/firefox/firefox /usr/local/bin/firefox \
    && rm /tmp/firefox.tar.bz2

ARG GECKODRIVER_VERSION=0.24.0
RUN wget -nv https://github.com/mozilla/geckodriver/releases/download/v$GECKODRIVER_VERSION/geckodriver-v$GECKODRIVER_VERSION-linux64.tar.gz -O /tmp/geckodriver.tar.gz \
    && tar -xf /tmp/geckodriver.tar.gz -C /opt \
    && ln -s /opt/geckodriver /usr/local/bin/geckodriver \
    && rm /tmp/geckodriver.tar.gz

RUN adduser -D mellophone
USER mellophone
WORKDIR /home/mellophone

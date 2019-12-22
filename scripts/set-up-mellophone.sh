#!/bin/sh

# This is a collection of most of the commands I ran to set up Mellophone on a
# $5/month Ubnutu DO droplet. Useful if I'm trying to remember a command I ran.

# https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
ssh-keyscan 157.230.241.239 ~/.ssh/known_hosts
ssh -i .ssh/mellophone root@157.230.241.239
adduser conductor # provide password, default answers
usermod -aG sudo conductor
ufw allow OpenSSH
ufw enable
rsync --archive --chown=conductor:conductor ~/.ssh /home/conductor

# https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-18-04
ssh -i .ssh/mellophone conductor@157.230.241.239
sudo apt update
sudo apt install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx
pip3 install --user pipenv
# restart shell
sudo -u postgres postgres
CREATE DATABASE mellophone
\password postgres
# sync files (including env) into ~/production
nano production/.env
sudo cp production/config/gunicorn.socket /etc/systemd/system
sudo cp production/config/gunicorn.service /etc/systemd/system
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
sudo cp production/config/nginx-mellophone /etc/nginx/sites-available/mellophone
sudo nginx -t
sudo systemctl restart nginx

# https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx
# https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority
# https://certbot-dns-digitalocean.readthedocs.io/en/stable/
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install certbot python3-certbot-dns-digitalocean
sudo vi /root/digitalocean.ini # declare API key per certbot-dns-digitalocean
sudo chmod 600 /root/ssl/digitalocean.ini
sudo certbot certonly \
  -i nginx \
  --dns-digitalocean --dns-digitalocean-credentials=/root/ssl/digitalocean.ini \
  -d "*.mellophone.pink" -d "mellophone.pink" \
  --server https://acme-v02.api.letsencrypt.org/directory

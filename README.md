# chgk-tournaments

Angular frontend for Chgk Tournaments application. 

Below is a deployment guide for self-hosted solution with AWS EC2 as proxy for VPN and static IP.

## Set up EC2 proxy
Actually, any cloud provider can be used, the thing is that static IP is needed which is hard to achieve in home network. The idea is to set up OpenVPN on Proxy, and then connect to this VPN from server where web app is actually hosted. Below there are steps for AWS EC2 setup.

### Security group settings
Here are settings required for OpenVPN to work

| Protocol | Type        | Protocol | Port | Source   |
|----------|-------------|----------|------|----------|
| IPv4     | Custom TCP  | TCP      | 943  | 0.0.0.0/0|
| IPv4     | Custom UDP  | UDP      | 1194 | 0.0.0.0/0|
| IPv4     | HTTP        | TCP      | 80   | 0.0.0.0/0|
| IPv4     | All ICMP - IPv4 | ICMP | All  | 0.0.0.0/0|
| IPv4     | SSH         | TCP      | 22   | 0.0.0.0/0|
| IPv4     | HTTPS       | TCP      | 443  | 0.0.0.0/0|

### Assign static IP to EC2
In AWS it's called Elastic IP, just allocate one and assign it to EC2 instance. This IP will be used later to set up DNS.

### Set up OpenVPN
Better follow [this guide](https://youtu.be/-jgLeEcLPwM?si=i2TfIe5Kh3DDudXY), it's pretty understandable. After setting up OpenVPN you'll have a fixed IPv4 address of the host machine in VPN net, this will be needed to forward traffic to it in Nginx.

### Set up Nginx

Probably you'll have to install nginx, I don't think this is a big problem. After that, do the following:
```bash
sudo nano /etc/nginx/sites-available/your-website-domain
```
Sample nginx config:
```nginx
server {
    server_name your-website-domain;

    location / {
        proxy_pass http://<server-ip-inside-vpn>:4200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
To use the config, copy it to `sites-enabled`, check nginx syntax and restart:
```bash
sudo ln -s /etc/nginx/sites-available/your-website-domain /etc/nginx/sites-enabled/your-website-domain
sudo nginx -t
sudo systemctl restart nginx
```
After that you are ready to request SSL certificates with CertBot.

### Certbot setup
Everything is pretty simple and [described here](https://certbot.eff.org/). Just install the bot with snap and run this:
```
sudo certbot --nginx
``` 
Just follow the instructions, this should get your website ready for HTTPS. 

## Set up DNS in domain settings
Pretty intuitive, just open domain settings and create A record to point map website name to server IPv4 address.

## Set up the host machine
Basically, here everything is individual, but you'll have to connect the machine to OpenVPN net created earlier. After that all you need to do is launch you app on machine and it will be exposed to the Internet. You may want to create systemd service to run the app automatically, here is a sample config which needs to be stored in `/lib/systemd/system/service-name.service` for Ubuntu. Here is how my resume service config looks like:

```systemcd
[Unit]
Description=Resume Frontend Angular App
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/repos/resume-frontend
Environment=PATH=/home/pi/.nvm/versions/node/v20.12.2/bin/:/usr/local/sbin:/usr>
ExecStart=/home/pi/.nvm/versions/node/v20.12.2/bin/ng serve --host 0.0.0.0
Restart=always
RestartSec=3
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=resume-frontend

[Install]
WantedBy=multi-user.target
```
After that, just do
```bash
sudo systemctl enable service-name
sudo systemctl start service-name
```
And that's it, you're up and running!

# mr.robot_IRCbot
Node IRCbot

* API keys > config/default.son

### Docker start up memo

* docker run -it mr_robot:latest /bin/bash
* cd srv/
* git clone https://github.com/ex1tium/mr.robot_IRCbot.git
* cd srv/mr.robot_IRCbot 
* npm install
* wget http://ftp.fi.debian.org/debian/pool/main/s/screen/screen_4.1.0~20120320gitdb59704-7+deb7u1_armhf.deb
* dpkg -i screen_4.1.0~20120320gitdb59704-7+deb7u1_armhf.deb
* Ctrl+p, Ctrl+q to Detach


### Getting back to docker container
* docker attach mr_robot




https://packages.debian.org/wheezy/armhf/screen/download
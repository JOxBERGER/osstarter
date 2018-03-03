#!/bin/bash

echo "Tested with RPI3 & 2017-11-29-raspbian-stretch-lite"
echo " "
echo "Stop Service."
sudo systemctl stop startupudp.service

echo "Start Build."
gcc cclient.c -o build/cclient 
sudo chown root:root build/cclient 
sudo chmod +x build/cclient

echo "Copy Files."

sudo cp startupudp.service /lib/systemd/system/startupudp.service
sudo chown root:root /lib/systemd/system/startupudp.service

sudo rm -rf /usr/bin/startupudp
sudo mkdir /usr/bin/startupudp
sudo cp build/cclient /usr/bin/startupudp/cclient

sudo systemctl daemon-reload
sudo systemctl enable startupudp.service
sudo systemctl start startupudp.service
sudo systemctl status startupudp.service


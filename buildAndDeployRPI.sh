#!/bin/bash

gcc cclient.c -o build/cclient 
sudo chown root:root build/cclient 
sudo chmod +x build/cclient

sudo systemctl stop startupudp.service
sudo cp build/cclient /usr/bin/startupudp/cclient

sudo systemctl daemon-reload
sudo systemctl enable startupudp.service
sudo systemctl status startupudp.service


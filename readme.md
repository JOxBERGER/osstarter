# About:
Exploartion on how to restart linux machienes with low level udp commands.  
Very __experimental__ and not testet at all.  
Not suposed to be used on any production system at all!.  

# Setup:

Tested with RPI3 & 2017-11-29-raspbian-stretch-lite
  
1. compile cclient with gcc: `gcc cclient.c -o cclient`  
2. copy cclient to: `/usr/bin/startupudp/cclient` 
3. generate /lib/systemd/system/startupudp.service containing:  
```
[Unit]
Description=startupudp
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/startupudp/cclient

[Install]
WantedBy=multi-user.target
```  

4. config systemd:  
`sudo systemctl daemon-reload`  
`sudo systemctl enable startupudp.service`  

5. check the service:  
`sudo systemctl status startupudp.service` 

6. run `nano server.js`on any machine in the network.  

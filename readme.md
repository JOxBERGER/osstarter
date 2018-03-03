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
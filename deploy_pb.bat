scp -r pb_migrations root@172.104.154.168:/root/pb
scp -r pb_hooks root@172.104.154.168:/root/pb
ssh root@172.104.154.168
:: systemctl restart pocketbase.service
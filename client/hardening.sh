#!/bin/bash
#Actualizar el sistema
sudo apt update -y; sudo apt upgrade -y ; sudo apt autoremove -y
#Firewall
sudo apt install ufw
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow https
#Confirmar ultimos parches y actualizaciones
apt-cache policy
#Verificar integridad de paquetes
apt-key list
#Instalar herramientas de seguridad
sudo apt install fail2ban
#Instalar antivirus frente a malware
sudo apt install clamav
#Actualizar base de datos clamav
sudo freshclam
#Escanear el sistema
sudo clamscan -r /home
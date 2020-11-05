#!/bin/bash

echo "Give your root username"
read username
echo "Give your root paasword"
read -s rootpass

DB_NAME="rewaa5"
DB_PASS="effb2ac6d4c7"
if [[ $rootpass ]]; then
    # create db
    # create user
    mysql -u$username -p$rootpass <<EOF
USE mysql;
create database ${DB_NAME};
CREATE USER '${DB_NAME}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL ON *.* TO '${DB_NAME}'@'localhost';
flush privileges;
EOF

fi
echo "Created database $DB_NAME and user $DB_NAME"
rm -f .env

echo "------------- Creating environment -----------"

echo -e "DEBUG=on\nDATABASE_HOST=localhost\nDB_NAME=${DB_NAME}\nDB_USER=${username}\nDB_PASSWORD=${rootpass}" >> .env

echo END
echo --------------------------------------------------

!/bin/bash

# General verison: recursively set permissions in dir
# chmod -R 755 docker-entrypoint-initdb.d

# Permissions for directories
find docker-entrypoint-initdb.d -type d -exec chmod 755 {} +

# Permissions for shell scripts
find docker-entrypoint-initdb.d -type f -name "*.sh" -exec chmod 755 {} +

# Permissions for sql files
find docker-entrypoint-initdb.d -type f -name "*.sql" -exec chmod 644 {} +

echo "Permissions updated for docker-entrypoint-initdb.d files"
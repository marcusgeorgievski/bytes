#!/bin/bash
#
# This script sets the appropriate permissions for files and directories within the 
#
# Note:
#   Ensure this script has execute permissions before running it.

# General recursive verison: chmod -R 755 docker-entrypoint-initdb.d

# Permissions for directories
find docker-entrypoint-initdb.d -type d -exec chmod 755 {} +

# Permissions for shell scripts
find docker-entrypoint-initdb.d -type f -name "*.sh" -exec chmod 755 {} +

# Permissions for sql files
find docker-entrypoint-initdb.d -type f -name "*.sql" -exec chmod 644 {} +

echo "Permissions updated for docker-entrypoint-initdb.d files"
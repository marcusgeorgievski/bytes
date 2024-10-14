# Features

- [x] [Environment Variables](#environment-variables)
- [x] [Initialization](#initialization)
  - [x] [Permissions](#permissions)
  - [x] [Create Non-Root User](#create-non-root-user)
- [ ] SSL for secure connections
- [ ] Database migrations - Flyway
- [ ] Automated backups and point-in-time recovery
- [ ] Connection pooling - PgBouncer
- [ ] Read replica
- [ ] Monitoring - Prometheus and Grafana
- [ ] Advanced High Availability Solutions

## Environment Variables

Environment variables are used to configure the PostgreSQL container without hardcoding sensitive information. This is achieved using a `.env` file and the `env_file` directive in `docker-compose.yml`.

```yaml
services:
  db:
    env_file: .env
    environment:
      POSTGRES_DB: ${APP_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      # ... other variables ...
```

The loading is done in the following order, and any previous loads are overwritten:

1. Any previously existing environment variables
2. The `.env` file variables
3. The variables from the `environment:` directive list

## Initialization

When a PostgreSQL container starts for the first time, it executes files with extensions `.sql`, `.sql.gz`, or `.sh` found in `/docker-entrypoint-initdb.d/` in alphabetical order. This Docker feature initializes the database based on the contents of the data directory.

**Note:** The `docker-entrypoint-initdb.d` directory is mounted as read-only (`:ro`) in the container for added security:

### Permissions

To ensure proper execution of initialization scripts, correct file permissions are crucial. A script is used to set appropriate permissions:

```sh
#!/bin/bash
find docker-entrypoint-initdb.d -type d -exec chmod 755 {} +
find docker-entrypoint-initdb.d -type f -name "*.sh" -exec chmod 755 {} +
find docker-entrypoint-initdb.d -type f -name "*.sql" -exec chmod 644 {} +
echo "Permissions updated for docker-entrypoint-initdb.d files"
```

**Principle of Least Privilege:** It may be best to manually set permissions for each file. For example, `.sql` files do not need executable permissions because they are not directly executed on the OS, but read and interpreted in the db engine.

### Create Non-Root User

As a security measure, a non-root user is created for database operations. This is done through an initialization script:

```sql
CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASSWORD';
CREATE SCHEMA $APP_DB_SCHEMA AUTHORIZATION $APP_DB_USER;
GRANT CONNECT ON DATABASE "$POSTGRES_DB" TO $APP_DB_USER;
-- Additional grants and configurations...
```

This script creates a user with limited privileges, following the principle of least privilege.

This setup ensures a secure and properly initialized PostgreSQL instance, with environment-specific configurations and a non-root user for database operations.

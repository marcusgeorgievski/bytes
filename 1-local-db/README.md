# Postgres Docker

## Docker Compose

### Services

- Abstract definition of a computing resource within an application
- Can be scaled or replaced independently from other components
- Backed by a set of containers, each defined by a Docker image and set of runtime args
- A service may include a `build` section which defines how to create the Docker image for the service

### Attributes

- `depends_on` - control the order of service startup and shutdown
- `environment` - defines env variables set in container
- `healthcheck` - declates a check to determins if service containers are healthy

  - `test` - Command Compose runs to check container health
  - `interval`, `timeout`, `retries` - Durations

- `image` - Specifies the image to start the container form
- `labels` - Metadata
- `ports` - Define port mapping between host machine and containers. Crucial for allowing external access to services running inside container
- `restart` - Defines policy that the platform applies on container termination
  - `no`, `always`, etc.
- `user` - overrides the user used to run the container process. Default by image, otherwise `root` if not set
- `volumes` - Define mount host paths or names volumes that are accessible by service containers
  - Content from the host directory takes precedence and shadows any content in the container path.

### Commands

```sh
# View running containers
docker-compose ps

# Start container
docker-compose up -d

# Stop container
docker-compose down

# View container logs
docker-compose logs db

# Rebuild container if Dockerfile or compose file changes
docker-compose up -d --build

#Access pg shell
docker-compose exec db psql -U myuser -d test-db
```

## Postgres

### Commands

**Useful Docker Commands**

**Useful psql Commands**

```sh
# Connect from anywhere on local machine
psql -h localhost -p 5432 -U postgres
```

```sql
-- Basic Connection and Information Commands
\c                  -- Get current db and user
\conninfo           -- Get current db, user, host, and port
\l                  -- List databases
\c database_name    -- Connect to a database
\q                  -- Quit psql

-- Schema and Table Information
\dn                 -- List all schemas
\dt schema_name.*   -- List tables in a specific schema
\dt                 -- List tables in current schema                      *
\d table_name       -- Describe a table's structure
\df schema_name.*   -- List functions in a specific schema
\df                 -- List functions in current schema
\dv schema_name.*   -- List views in a specific schema
\dv                 -- List views in current schema

-- User and Privilege Information
\du                 -- List all roles/users
\du+ username       -- Show detailed information about a specific user
\dp schema_name.*   -- Show access privileges for objects in a schema
\dp table_name      -- Show access privileges for a specific table
```

**Postgres DSN**

- Remember to not directly include sensitive DSN info

```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
postgresql://myuser:mypassword@localhost:5432/mydatabase
```

## Features

### Initialization

When a pg container is started for the first time, it will execute files with extensions `.sql`, `.sql.gz`, or `.sh` found in `/docker-entrypoint-initdb.d/`. These files will be executed in alphabetical order.

This is primarily a docker feature specifically implemented in the PostgreSQL Docker image. Docker knows if it's the first time the container is started by checking if the data directory, `/var/lib/postgres/data`, is empty. It is skipped otherwise.

**1. Create dir and needed files**

```sh
# Create docker-entrypoint-initdb.d directory
mkdir docker-entrypoint-initdb.d

# Create scripts to run
touch 01-create-tables.sql
touch 02-insert-data.sql


```

**2. Update permissions**

Can be easily done with a script

```sh
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
```

**3. Configure Volume Mounts**

- `:ro` for read only in contaienr

```yml
services:
  db:
    # ...
    volumes:
      - ./docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d:ro
```

**Principle of Least Privilege:** It may be best to manually set permissions for each file. For example, `.sql` files do not need executable permissions because they are not directly executed on the OS, but read and interpreted in the db engine.

## Notes

- Add extra security with Docker Compose `networks` field to control which services can communicate with each other in multi-service applications.
- Using a `.env` is a good idea, just make sure to never commit it anywhere and keep it secure behind a password protected vault
- Notes for production:
  - Docker Secrets or a secure key management service instead of a `.env` for staring passwords and sensitive data
  - Disable default `postgres` superuser if not needed
  - Use named volumes instead of bind mounts
  - Implement backup strategy with a tool like `pg_dump` for regular backups
  - Monitor and log, a volume can be mounted for this
  - Performance tuning, network security, resource limits, PgBouncer, etc.

### Future Features

See `features.md`

- [x] Initialization scripts
  - [x] Permissions
  - [x] Create non-root user
- [ ] SSL for secure connections
- [ ] Database migrations - Flyway
- [ ] Automated backups and point-in-time recovery
- [ ] Connection pooling - PgBouncer
- [ ] Read replica
- [ ] Monitoring - Prometheus and Grafana
- [ ] Advanced High Availability Solutions

#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create non-superuser role
    CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASSWORD';

    -- Create schema and set ownership
    CREATE SCHEMA IF NOT EXISTS app_schema AUTHORIZATION $APP_DB_USER;

    -- Create schema and set ownership
    GRANT CONNECT ON DATABASE "$APP_DB" TO $APP_DB_USER;
    GRANT USAGE, CREATE ON SCHEMA app_schema TO $APP_DB_USER;

    -- Grant privileges on future objects in the schema
    ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $APP_DB_USER;
    
    ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
    GRANT USAGE, SELECT ON SEQUENCES TO $APP_DB_USER;

    ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema
    GRANT EXECUTE ON FUNCTIONS TO $APP_DB_USER;

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Set search path for the user
    ALTER USER $APP_DB_USER SET search_path TO app_schema, public;

    -- Revoke public schema creation privilege from public role
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;

    -- Revoke superuser access (if applicable)
    ALTER USER $APP_DB_USER WITH NOSUPERUSER;
EOSQL
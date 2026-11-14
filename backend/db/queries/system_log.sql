-- PostgreSQL: there's no USE; the database is chosen by DB_NAME when connecting.
CREATE TABLE IF NOT EXISTS system_log (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

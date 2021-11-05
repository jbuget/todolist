type Environment = {
  server: {
    port: number;
    host: string;
  },
  logger: {
    enabled: boolean;
    level: string;
  }
}

function getNumber(value: string | undefined, defaultValue: number): number {
  if (value) {
    return parseInt(value);
  }
  return defaultValue;
}

function getBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value) {
    return value === 'true';
  }
  return defaultValue;
}

function buildEnvironment() : Environment {
  const env: Environment = {
    server: {
      port: getNumber(process.env.PORT, 3000),
      host: process.env.HOST || 'localhost'
    },
    logger: {
      enabled: getBoolean(process.env.LOGGER_ENABLED, true),
      level: process.env.LOGGER_LEVEL || 'info'
    }
  };

  if (process.env.NODE_ENV === 'production') {
    // Override properties according to production environment
  }

  if (process.env.NODE_ENV === 'test') {
    env.server.port = 0;
    env.logger.level = 'error';
  }

  return env;
}

const environment = buildEnvironment();

export { environment };

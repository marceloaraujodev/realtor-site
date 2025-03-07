const NODE_ENV = process.env.NODE_ENV || 'production';

const serverUrl =
  NODE_ENV === 'development'
    ? process.env.BASE_URL_DEV
    : process.env.BASE_URL;

if (!serverUrl) {
  throw new Error(
    `Server URL is not defined for environment: ${NODE_ENV}. Please check your .env file.`
  );

}

export { serverUrl };


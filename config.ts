// config.js
const NODE_ENV = process.env.NODE_ENV || 'production';

// // Determine the base URL based on the environment
// const siteUrl = NODE_ENV === 'development' 
//   ? process.env.NEXT_PUBLIC_BASE_URL_DEV 
//   : process.env.NEXT_PUBLIC_BASE_URL;

// const siteUrl = process.env.NODE_ENV === 'development' 
//   ? process.env.NEXT_PUBLIC_BASE_URL_DEV 
//   : process.env.NEXT_PUBLIC_BASE_URL;
const siteUrl = process.env.NODE_ENV === 'development' 
  ? process.env.NEXT_PUBLIC_BASE_URL_DEV 
  : process.env.NEXT_PUBLIC_BASE_URL_DEV ;

// Validate that the siteUrl is defined
if (!siteUrl) {
  throw new Error(
    `Base URL is not defined for environment: ${NODE_ENV}. ` +
    `Please check your .env file.`
  );
}

console.log('Running in environment:', NODE_ENV);
console.log('Resolved siteUrl:', siteUrl);

export { siteUrl };
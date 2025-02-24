// config.js
import dotenv from 'dotenv';

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'production';
// Set up MODE (default to production if not explicitly set)
const MODE = NODE_ENV === 'development' ? 'dev' : 'production';

console.log('this is process.env.NODE_ENV', process.env.NODE_ENV)

// Define reusable variables based on MODE
const siteUrl = MODE === 'dev' ? process.env.NEXT_PUBLIC_BASE_URL_DEV : process.env.NEXT_PUBLIC_BASE_URL;


export { MODE, siteUrl};
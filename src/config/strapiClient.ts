import axios from 'axios';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;  // optional

export const createStrapiClient = (authHeader?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // If frontend passed JWT → use it
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }
  // Server-side fallback → Strapi API token
  else if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return axios.create({
    baseURL: STRAPI_URL,
    headers,
    timeout: 15000,
  });
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  google: {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  sites: {
    ekantipur: {
      propertyId: process.env.EKANTIPUR_PROPERTY_ID,
    },
    tkp: {
      propertyId: process.env.TKP_PROPERTY_ID,
    },
  },
  port: parseInt(process.env.PORT || '3000'),
};

export type SiteId = keyof typeof config.sites;

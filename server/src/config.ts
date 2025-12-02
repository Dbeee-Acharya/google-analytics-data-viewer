import dotenv from 'dotenv';

dotenv.config();

export const config = {
  google: {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  sites: {
    ekantipur: {
      propertyId: process.env.EKANTIPUR_PROPERTY_ID,
    },
    tkp: {
      propertyId: process.env.TKP_PROPERTY_ID,
    },
  },
};

export type SiteId = keyof typeof config.sites;

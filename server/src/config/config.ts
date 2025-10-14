import dotenv from 'dotenv';
dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }

  return value;
}

const config = {
  ekantipurPropertyId: getEnvVar('EKANTIPUR_PROPERTY_ID'),

  tkpPropertyId: getEnvVar('TKP_PROPERTY_ID'),

  port: getEnvVar('PORT'),

  frontendUrl: getEnvVar('FRONTEND_URL')
    ? getEnvVar('FRONTEND_URL').split(',').map((origin) => origin.trim())
    : ['http://localhost:5173'],

  serviceFilePath: getEnvVar('SERVICE_FILE_PATH')
};

export default Object.freeze(config);

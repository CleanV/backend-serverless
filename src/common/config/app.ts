import 'dotenv/config.js';

const app = {
  host: process.env.HOST,
  hostPort: process.env.HOST_PORT,
  pwaUrl: process.env.PWA_URL,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUrl: process.env.DB_URL,
  email: process.env.EMAIL,
  emailPass: process.env.EMAIL_PASS,
  JWTUser: process.env.JWT_USER,
  awsBucket: process.env.AWS_BUCKET,
  awsRegion: process.env.AWS_REGION,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSignatureVersion: process.env.AWS_SIGNATURE_VERSION,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  }
};

export default app;

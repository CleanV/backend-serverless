import pkg from 'aws-sdk';
import app from './app';

const { S3 } = pkg;

const s3Client = new S3({
  region: app.awsRegion,
  secretAccessKey: app.awsSecretAccessKey,
  accessKeyId: app.awsAccessKeyId,
  signatureVersion: app.awsSignatureVersion,
});

export default s3Client;

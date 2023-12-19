import { randomUUID } from 'crypto';
import s3Client from '../../../common/config/aws';
import app from '../../../common/config/app';

export default async function getPresignedURL(
  bucket: string = app.awsBucket,
  path: string = randomUUID(),
) {
  try {
    const url = await s3Client.getSignedUrlPromise(`putObject`, {
      Bucket: bucket,
      Key: path,
      Expires: 172800,
    });

    return url;
  } catch (error) {
    return null;
  }
}

import message from '../../common/config/message';
import output from '../../common/utils/output';
import getPresignedURL from '../../common/utils/aws/get_presigned_url';

export default async function getPresignedUrl({
  bucket = undefined,
  path = undefined,
}) {
  const presignedUrl = await getPresignedURL(bucket, path);
  return output(message.success, presignedUrl);
}

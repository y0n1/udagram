import AWS = require('aws-sdk');
import { config } from './config';

const c = config.dev;

//Configure AWS
const credentials = new AWS.SharedIniFileCredentials({ profile: c.aws_profile });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_reigion,
  params: { Bucket: c.aws_media_bucket },
});

/**
 * Generates an AWS signed URL for retreiving an item.
 * @Params `key` The filename to be put into the s3 bucket.
 * @Returns The URL from which the item with the given key can be retrieved.
 */
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('getObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

/** 
 * Generates an AWS signed URL for putting an item.
 * @Params `key` The filename to be retreived from the S3 bucket.
 * @Returns The URL which can be used in order to put the given item.
 */
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('putObject', {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

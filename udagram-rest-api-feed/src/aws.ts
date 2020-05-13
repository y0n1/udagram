import AWS = require("aws-sdk");
import { config } from "../config";

//Configure AWS
var credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: config.awsReigion,
  params: { Bucket: config.awsMediaBucket },
});

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl("getObject", {
    Bucket: config.awsMediaBucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl("putObject", {
    Bucket: config.awsMediaBucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

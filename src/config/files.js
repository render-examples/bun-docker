import {
  S3Client,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: Bun.env.S3_REGION,
  forcePathStyle: true,
  endpoint: Bun.env.S3_URL,
  credentials: {
    accessKeyId: Bun.env.S3_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.S3_ACCESS_KEY_SECRET,
  },
});

const s3_cdn = new S3Client({
  region: Bun.env.S3_REGION,
  forcePathStyle: true,
  endpoint: Bun.env.S3_URL_CDN,
  credentials: {
    accessKeyId: Bun.env.S3_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.S3_ACCESS_KEY_SECRET,
  },
});

export { s3, s3_cdn };

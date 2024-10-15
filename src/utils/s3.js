import { v4 } from "uuid";
import { s3, s3_cdn } from "../config/files";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadFile = async (file, empresa) => {
  const docId = v4();
  const params = {
    Body: Buffer.from(await file.arrayBuffer()),
    Bucket: empresa,
    Key: docId,
    ContentType: file.type,
    ACL: "public-read",
  };

  let obj = await s3.send(new PutObjectCommand(params))
  
  if (obj.$metadata.httpStatusCode === 200) {
    return docId;
  }
  return false;
};

export const getCDNUrl = (empresa, docId) => {
  return Bun.env.S3_URL_CDN +"/"+empresa + "/" + docId;
  /*
  const command = new GetObjectCommand({
    Bucket: "jungla-magica",
    Key: empresa + "/" + docId,
  });
  console.log(command);
  try {
    await getSignedUrl(
      s3_cdn,
      command,
      {
        expiresIn: 3600,
      }
    );
  } catch (e) {
    console.log(e);
  }*/
};

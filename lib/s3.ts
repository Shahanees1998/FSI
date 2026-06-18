import AWS from "aws-sdk";
import { randomUUID } from "crypto";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("AWS credentials are not configured");
  }

  return new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
  });
}

function getBucket() {
  const bucket = process.env.AWS_BUCKET;
  if (!bucket) {
    throw new Error("AWS_BUCKET is not configured");
  }
  return bucket;
}

export function getS3PublicUrl(key: string): string {
  const bucket = getBucket();
  const region = process.env.AWS_REGION!;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export function validateProfileImage(file: File): { isValid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { isValid: false, error: "Only JPEG, PNG, GIF, and WebP images are allowed." };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { isValid: false, error: "Image must be smaller than 5MB." };
  }

  return { isValid: true };
}

function getExtension(contentType: string): string {
  switch (contentType) {
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

export async function uploadProfileImageToS3(
  file: File,
  userId: string
): Promise<{ url: string; key: string }> {
  const validation = validateProfileImage(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const key = `profile-images/${userId}/${randomUUID()}.${getExtension(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await getS3Client()
    .upload({
      Bucket: getBucket(),
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
    .promise();

  return {
    url: getS3PublicUrl(key),
    key,
  };
}

export async function uploadClientImageToS3(
  file: File,
  agentId: string
): Promise<{ url: string; key: string }> {
  const validation = validateProfileImage(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const key = `client-images/${agentId}/${randomUUID()}.${getExtension(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await getS3Client()
    .upload({
      Bucket: getBucket(),
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
    .promise();

  return {
    url: getS3PublicUrl(key),
    key,
  };
}

export function isClientImageKeyForAgent(key: string, agentId: string): boolean {
  return key.startsWith(`client-images/${agentId}/`);
}

export async function deleteFromS3(key: string): Promise<void> {
  if (!key) {
    return;
  }

  await getS3Client()
    .deleteObject({
      Bucket: getBucket(),
      Key: key,
    })
    .promise();
}

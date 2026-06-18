import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const CONTACT_TABLE = process.env.AWS_DYNAMODB_CONTACT_TABLE ?? "ContactMesages";

function getDynamoClient() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;

  if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("AWS credentials are not configured");
  }

  const client = new DynamoDBClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return DynamoDBDocumentClient.from(client);
}

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export async function saveContactMessage(input: ContactMessageInput) {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  await getDynamoClient().send(
    new PutCommand({
      TableName: CONTACT_TABLE,
      Item: {
        id,
        name: input.name,
        email: input.email,
        message: input.message,
        createdAt,
      },
    })
  );

  return { id, createdAt };
}

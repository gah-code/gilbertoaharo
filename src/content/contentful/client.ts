import { createClient } from "contentful";
import { env } from "@/env";

export const contentful = createClient({
  space: env.contentful.spaceId,
  environment: env.contentful.environment,
  accessToken: env.contentful.deliveryToken,
});

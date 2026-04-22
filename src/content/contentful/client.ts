import { createClient } from "contentful";
import { env } from "@/env";

// Current architecture:
// - Contentful reads browser-side Vite env values.
// - `VITE_CONTENTFUL_DELIVERY_TOKEN` remains transitional client-exposed config.
// - A later phase can move delivery access server-side for a stricter boundary.
export const contentful = createClient({
  space: env.contentful.spaceId,
  environment: env.contentful.environment,
  accessToken: env.contentful.deliveryToken,
});

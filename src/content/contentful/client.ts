import { createClient } from "contentful";

export const contentful = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
});

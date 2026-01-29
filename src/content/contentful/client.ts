import { createClient } from "contentful";

export const contentful = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "testing",
  accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
});

// import { createClient } from "contentful";

// const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
// const environment =
//   (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) ??
//   "master";

// const usePreview =
//   String(import.meta.env.VITE_CONTENTFUL_USE_PREVIEW) === "true";
// const deliveryToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN as
//   | string
//   | undefined;
// const previewToken = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN as
//   | string
//   | undefined;

// if (!space) throw new Error("Missing VITE_CONTENTFUL_SPACE_ID");
// if (!usePreview && !deliveryToken)
//   throw new Error("Missing VITE_CONTENTFUL_DELIVERY_TOKEN");
// if (usePreview && !previewToken)
//   throw new Error("Missing VITE_CONTENTFUL_PREVIEW_TOKEN");

// export const contentful = createClient({
//   space,
//   environment,
//   accessToken: usePreview ? previewToken! : deliveryToken!,
//   host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
// });

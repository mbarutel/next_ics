import { ContentfulClientApi, createClient } from "contentful";

import { TypeConferenceSkeleton } from "./types/contentful/types";
import { Entry } from "contentful";
import contentfulClient from "./client";
import { ConferencePage } from "./types/types";
import { coverImageParse } from "./utils/coverImageParse";

export default class ContentfulService {
  client: ContentfulClientApi<undefined>;
  previewClient: ContentfulClientApi<undefined>;

  constructor({ preview = false }) {
    if (preview === false) {
      this.client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      });
    } else {
      this.previewClient = createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      });
    }
  }
}

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'
import { apiVersion } from '../env';
import "server-only";

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    apiVersion,
    perspective: 'published',
    stega: false
  }),
  // The 'token' warnings in the logs are expected for public datasets
  // without a token and can be safely ignored
});

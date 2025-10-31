import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
  // Add cache and revalidation settings
  perspective: 'published',
  // Adding stega false to not require additional tokens
  stega: false
})

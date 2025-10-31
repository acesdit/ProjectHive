import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { STARTUPS_QUERIES } from '@/sanity/lib/queries'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://starthub.com'
  
  try {
    // Fetch all startups
    const response = await client.fetch(STARTUPS_QUERIES, { search: null })
    
    // Create sitemap entries for each startup
    const startupEntries = response ? response.map((post: any) => ({
      url: `${baseUrl}/startup/${post._id}`,
      lastModified: post._updatedAt || post._createdAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) : []
    
    // Basic static pages
    const routes = ['', '/login'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    }))
    
    return [...routes, ...startupEntries]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback with basic routes if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/login`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ]
  }
}

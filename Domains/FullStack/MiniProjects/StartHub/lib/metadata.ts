import { Metadata } from "next";

/**
 * Generates metadata for a specific page
 * 
 * @param title Page title
 * @param description Page description
 * @param imageUrl URL for the main image (optional)
 * @param keywords Array of keywords (optional)
 * @param isArticle Whether the page should use article schema (default: false)
 * @param authorName Author name for article pages (optional)
 * @returns Metadata object
 */
export function createMetadata({
  title,
  description,
  imageUrl = '/logo.svg',
  keywords = [],
  isArticle = false,
  authorName,
  canonicalPath = '',
}: {
  title: string;
  description: string;
  imageUrl?: string;
  keywords?: string[];
  isArticle?: boolean;
  authorName?: string;
  canonicalPath?: string;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://starthub.com';
  const mainTitle = title ? `${title} | StartHub` : 'StartHub - Connect, Innovate, Launch';
  
  // Default keywords for all pages
  const defaultKeywords = ['startup', 'innovation', 'entrepreneurs', 'business'];
  const allKeywords = [...defaultKeywords, ...keywords];
  
  return {
    title: mainTitle,
    description,
    keywords: allKeywords,
    ...(authorName && { authors: [{ name: authorName }] }),
    openGraph: {
      title: mainTitle,
      description,
      url: canonicalPath ? `${baseUrl}${canonicalPath}` : baseUrl,
      siteName: 'StartHub',
      locale: 'en_US',
      type: isArticle ? 'article' : 'website',
      ...(isArticle && authorName && {
        authors: authorName,
      }),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: mainTitle,
      description,
      images: [imageUrl],
      ...(authorName && { creator: authorName }),
    },
    ...(canonicalPath && {
      alternates: {
        canonical: `${baseUrl}${canonicalPath}`,
      },
    }),
  };
}

import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Connect, Innovate, Launch',  // This will become "Connect, Innovate, Launch | StartHub"
  description: 'Join our community of entrepreneurs, showcase your startup, and connect with innovators around the world.',
  keywords: ['pitch', 'connect', 'entrepreneurs', 'showcase', 'startups'],
  canonicalPath: '/',
});

// This file defines the metadata for the home page

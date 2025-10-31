import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Create Your Startup',
  description: 'Share your vision with the world. Create a startup profile to showcase your idea, attract collaborators, and gain visibility.',
  keywords: ['create startup', 'pitch', 'showcase', 'startup profile', 'entrepreneur'],
  canonicalPath: '/startup/create',
});

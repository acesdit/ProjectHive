import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Login to StartHub',
  description: 'Join our community of entrepreneurs and innovators. Login to showcase your startup, connect with like-minded individuals, and take your ideas to the next level.',
  keywords: ['login', 'signup', 'join', 'community', 'entrepreneur account'],
  canonicalPath: '/login',
});

import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StartHub',
    short_name: 'StartHub',
    description: 'Connect, Innovate, Launch - A platform for startups and entrepreneurs',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5f2eff',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

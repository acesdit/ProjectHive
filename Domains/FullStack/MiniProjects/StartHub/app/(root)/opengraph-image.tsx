import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'StartHub - Connect, Innovate, Launch'
export const size = {
  width: 1200,
  height: 630,
}
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom right, #00b2ff, #5f2eff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            fontSize: 72,
            fontWeight: 'bold',
          }}
        >
          StartHub
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Connect, Innovate, Launch
        </div>
        <div style={{ fontSize: 24, marginTop: 24, opacity: 0.7 }}>
          Join our community of entrepreneurs, showcase your startup,
          and connect with innovators around the world.
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse width and height.
      ...size,
    }
  )
}

import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'StartHub Icon'
export const size = {
  width: 32,
  height: 32,
}
 
// Image generation
export default async function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom right, #00b2ff, #5f2eff)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        S
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icon
      // size config to also set the ImageResponse width and height.
      ...size,
    }
  )
}

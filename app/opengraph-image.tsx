import { ImageResponse } from 'next/og'
import { promises as fs } from 'fs'
import path from 'path'
import profileData from '../content/profileData.json';

export const alt = profileData.general.byline;
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const imageBuffer = await fs.readFile(path.join(process.cwd(), 'public/content/media/IMG_3884.png'));
  const imageSrc = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={imageSrc} height="400" style={{ borderRadius: '50%' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}

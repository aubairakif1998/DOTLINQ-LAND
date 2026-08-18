import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'DotLinQ — Connect Every Dot. Automate Every Flow.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social / search thumbnail — large product logo centered on brand navy. */
export default async function OpenGraphImage() {
  const logoBytes = await readFile(join(process.cwd(), 'public/brand/dotlinq-logo.png'));
  const logoSrc = `data:image/png;base64,${logoBytes.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #07101F 0%, #0A1628 45%, #0E2A4A 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: '#1A8FD6',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 920,
            height: 340,
            background: '#FFFFFF',
            borderRadius: 28,
            boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="DotLinQ"
            width={780}
            height={262}
            style={{
              width: 780,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}

import QRCode from 'qrcode';
import sharp from 'sharp';

const SUPPORT_URL = 'https://saweria.co/Fizzx';

export async function createWatermarkedImage(input: Buffer, filename: string) {
  const image = sharp(input);
  const metadata = await image.metadata();
  const width = metadata.width ?? 1600;
  const height = metadata.height ?? 1200;
  const qrSize = Math.max(120, Math.round(width * 0.14));
  const qrInner = Math.max(92, Math.round(width * 0.11));
  const qrDataUrl = await QRCode.toDataURL(SUPPORT_URL, {
    margin: 1,
    width: qrSize,
    color: {
      dark: '#FFFFFFE6',
      light: '#00000000'
    }
  });
  const qrSvg = Buffer.from(
    `<svg width="${qrSize}" height="${qrSize}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" rx="24" ry="24" fill="rgba(0,0,0,0.26)" stroke="rgba(255,255,255,0.16)"/>
      <image href="${qrDataUrl}" x="14" y="14" width="${qrInner}" height="${qrInner}" opacity="0.72"/>
      <text x="50%" y="${Math.max(110, Math.round(width * 0.12))}" text-anchor="middle" fill="rgba(255,255,255,0.62)" font-size="12" font-family="Arial, Helvetica, sans-serif" letter-spacing="1.8">support developer</text>
    </svg>`
  );

  const watermark = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .main { fill: rgba(255,255,255,0.22); font-size: ${Math.max(26, Math.round(width * 0.032))}px; font-family: Arial, Helvetica, sans-serif; letter-spacing: 4px; font-weight: 700; }
        .sub { fill: rgba(255,255,255,0.16); font-size: ${Math.max(12, Math.round(width * 0.012))}px; font-family: Arial, Helvetica, sans-serif; letter-spacing: 2px; }
        .diag { fill: rgba(255,255,255,0.08); font-size: ${Math.max(14, Math.round(width * 0.016))}px; font-family: Arial, Helvetica, sans-serif; letter-spacing: 4px; }
      </style>
      <g transform="translate(${width * 0.16} ${height * 0.72}) rotate(-28)">
        <text class="diag">HAFIZ AL FARIZ · PROTECTED PREVIEW · ${filename.toUpperCase()}</text>
      </g>
      <text x="50%" y="50%" text-anchor="middle" class="main">HAFIZ AL FARIZ</text>
      <text x="50%" y="${Math.min(height - 48, height * 0.92)}" text-anchor="middle" class="sub">Protected preview · author credit embedded by system</text>
    </svg>
  `);

  return {
    image,
    qrSvg,
    watermark
  };
}

export async function renderWatermarkedBuffer(input: Buffer, filename: string, formatHint: 'png' | 'jpg' | 'webp' = 'jpg') {
  const { image, qrSvg, watermark } = await createWatermarkedImage(input, filename);
  let pipeline = image
    .composite([
      { input: watermark, gravity: 'center' },
      { input: qrSvg, gravity: 'southeast', top: 28, left: 28 }
    ])
    .withMetadata();

  const maybeExif = pipeline as typeof pipeline & {
    withExifMerge?: (value: unknown) => typeof pipeline;
  };

  if (typeof maybeExif.withExifMerge === 'function') {
    pipeline = maybeExif.withExifMerge({
      IFD0: {
        Artist: 'Hafiz Al Fariz',
        Copyright: 'Hafiz Al Fariz',
        ImageDescription: 'Protected portfolio asset with generated watermark'
      }
    });
  }

  if (formatHint === 'png') return pipeline.png({ compressionLevel: 8 }).toBuffer();
  if (formatHint === 'webp') return pipeline.webp({ quality: 92 }).toBuffer();
  return pipeline.jpeg({ quality: 92 }).toBuffer();
}

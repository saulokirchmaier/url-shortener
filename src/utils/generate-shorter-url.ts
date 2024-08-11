import { randomBytes } from 'crypto';

export function generateShorterUrl(length: number): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const bytes = randomBytes(length);

  for (let i = 0; i < length; i++) {
    token += charset[bytes[i] % charset.length];
  }

  return token;
}

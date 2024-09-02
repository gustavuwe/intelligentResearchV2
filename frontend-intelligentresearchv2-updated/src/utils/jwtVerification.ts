import { JWTPayload } from 'jose';

export interface CustomJWTPayload extends JWTPayload {
  role: string;
  sub: string;
}

export async function verifyJWT(): Promise<CustomJWTPayload | null> {
  try {
    const token = getCookie('token');
    if (!token) {
      console.error('No token found in cookie');
      return null;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = await JSON.parse(window.atob(base64));
    console.log("Payload", payload)
    return payload as CustomJWTPayload;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    return null;
  }
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
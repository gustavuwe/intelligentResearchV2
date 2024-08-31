import { jwtVerify, JWTPayload } from 'jose';

export interface CustomJWTPayload extends JWTPayload {
  role: string;
  sub: string;
  // Add any other custom properties your JWT might have
}

export async function verifyJWT(): Promise<CustomJWTPayload | null> {
  try {
    const token = getCookie('token');
    if (!token) {
      console.error('No token found in cookie');
      return null;
    }

    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);
    return payload as CustomJWTPayload;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    return null;
  }
}

function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null; // Estamos no servidor
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
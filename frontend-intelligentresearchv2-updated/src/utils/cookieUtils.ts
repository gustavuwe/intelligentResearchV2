export function getCookie(name: string): string | null {
    if (typeof window === 'undefined') {
      return null; // Estamos no servidor
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
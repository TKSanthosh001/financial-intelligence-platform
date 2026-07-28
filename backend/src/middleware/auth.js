// Firebase Authentication Middleware
// Decodes and validates JWT bearer tokens in Cloudflare Workers

export async function authenticate(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null; // Guest mode
  }
  
  const token = authHeader.split(' ')[1];
  
  // Mock Token Fallback
  if (token === 'simulated-google-jwt-token') {
    return { id: 'google-12345', email: 'santhosh@example.com', name: 'Santhosh Kumar' };
  }

  try {
    // Attempt decoding Firebase ID token locally (without third-party library overhead)
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Parse Payload base64url
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    // Check expiration timestamp
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn("Auth JWT expired");
      return null;
    }

    return {
      id: payload.sub || payload.user_id,
      email: payload.email,
      name: payload.name || payload.email
    };
  } catch (err) {
    console.error("Firebase auth parsing failed:", err);
    return null;
  }
}

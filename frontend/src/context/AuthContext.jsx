/**
 * Google SSO Authentication Context
 * ==================================
 * Uses Google Identity Services (GIS) — the modern Google Sign-In library.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.cloud.google.com/apis/credentials
 * 2. Create an OAuth 2.0 Client ID (type: Web application)
 * 3. Add authorized JavaScript origins:
 *    - https://tksanthosh001.github.io
 *    - http://localhost:5173 (for local dev)
 * 4. Replace the GOOGLE_CLIENT_ID below with your real Client ID
 */

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';

const AuthContext = createContext();

// ─── REPLACE THIS WITH YOUR REAL GOOGLE CLIENT ID ───────────────────────────
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
// ─────────────────────────────────────────────────────────────────────────────

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Decode a Google JWT ID token (without external libraries).
 * The ID token is a standard JWT — the payload is base64url encoded.
 */
const decodeJwt = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64url → base64 → decode
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gsiReady, setGsiReady] = useState(false);
  const googleBtnRef = useRef(null);

  // ── Restore session from localStorage ────────────────────────────────────
  useEffect(() => {
    const savedUser = localStorage.getItem('aegis_user');
    const savedToken = localStorage.getItem('aegis_id_token');

    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        // Check if token is still valid (Google ID tokens last ~1 hour)
        const decoded = decodeJwt(savedToken);
        const isExpired = decoded && decoded.exp && (decoded.exp * 1000 < Date.now());

        if (!isExpired) {
          setUser(parsed);
        } else {
          // Token expired — clear session
          localStorage.removeItem('aegis_user');
          localStorage.removeItem('aegis_id_token');
        }
      } catch {
        localStorage.removeItem('aegis_user');
        localStorage.removeItem('aegis_id_token');
      }
    }
    setLoading(false);
  }, []);

  // ── Google Sign-In callback ──────────────────────────────────────────────
  const handleGoogleCallback = useCallback((response) => {
    if (!response.credential) {
      console.warn('Google Sign-In: No credential returned');
      return;
    }

    const idToken = response.credential;
    const decoded = decodeJwt(idToken);

    if (!decoded) {
      console.error('Failed to decode Google ID token');
      return;
    }

    const googleUser = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      givenName: decoded.given_name,
      familyName: decoded.family_name,
      emailVerified: decoded.email_verified,
      locale: decoded.locale,
    };

    // Persist session
    localStorage.setItem('aegis_user', JSON.stringify(googleUser));
    localStorage.setItem('aegis_id_token', idToken);
    localStorage.setItem('auth_token', idToken); // for API calls

    setUser(googleUser);
  }, []);

  // ── Initialize Google Identity Services ─────────────────────────────────
  useEffect(() => {
    // Wait for the GSI script to load
    const initGSI = () => {
      if (!window.google?.accounts?.id) return false;

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: true,        // Auto sign-in if user previously logged in
          cancel_on_tap_outside: true,
          context: 'signin',
          ux_mode: 'popup',
          itp_support: true,
        });
        setGsiReady(true);
        return true;
      } catch (err) {
        console.warn('GSI init failed:', err);
        return false;
      }
    };

    // Try immediately, then retry with polling (script may still be loading)
    if (!initGSI()) {
      const interval = setInterval(() => {
        if (initGSI()) {
          clearInterval(interval);
        }
      }, 200);
      // Stop trying after 10 seconds
      setTimeout(() => clearInterval(interval), 10000);
      return () => clearInterval(interval);
    }
  }, [handleGoogleCallback]);

  // ── Trigger Google Sign-In popup ────────────────────────────────────────
  const loginWithGoogle = useCallback(() => {
    if (!window.google?.accounts?.id) {
      console.warn('Google Identity Services not loaded yet');
      // Fallback: Show One Tap prompt
      return;
    }
    // Method 1: Show the One-Tap prompt
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One-tap was blocked or dismissed — fall back to renderButton
        // Create a temporary container for the Google button
        const tempDiv = document.createElement('div');
        tempDiv.id = 'google-signin-fallback';
        tempDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;padding:40px;background:#0d1117;border:1px solid #2a2e39;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.6);display:flex;flex-direction:column;align-items:center;gap:20px;';

        const title = document.createElement('p');
        title.textContent = 'Sign in with your Google account';
        title.style.cssText = 'color:#f0f3fa;font-family:Inter,Roboto,sans-serif;font-size:16px;font-weight:700;margin:0;';
        tempDiv.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.textContent = 'to save your portfolio, watchlists, and preferences';
        subtitle.style.cssText = 'color:#b2b5be;font-family:Inter,Roboto,sans-serif;font-size:13px;margin:0;';
        tempDiv.appendChild(subtitle);

        const btnContainer = document.createElement('div');
        btnContainer.id = 'google-signin-btn-container';
        tempDiv.appendChild(btnContainer);

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = 'background:none;border:1px solid #2a2e39;color:#b2b5be;padding:8px 24px;border-radius:6px;cursor:pointer;font-size:13px;margin-top:8px;';
        cancelBtn.onclick = () => {
          document.body.removeChild(tempDiv);
          backdrop.remove();
        };
        tempDiv.appendChild(cancelBtn);

        // Dark backdrop
        const backdrop = document.createElement('div');
        backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99998;';
        backdrop.onclick = () => {
          document.body.removeChild(tempDiv);
          backdrop.remove();
        };

        document.body.appendChild(backdrop);
        document.body.appendChild(tempDiv);

        // Render the real Google button inside the popup
        window.google.accounts.id.renderButton(btnContainer, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'center',
          width: 280,
        });
      }
    });
  }, []);

  // ── Render the Google Sign-In button into a DOM ref ─────────────────────
  const renderGoogleButton = useCallback((element) => {
    if (!element || !window.google?.accounts?.id) return;
    window.google.accounts.id.renderButton(element, {
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      logo_alignment: 'left',
      width: 220,
    });
  }, []);

  // ── Logout ──────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('aegis_user');
    localStorage.removeItem('aegis_id_token');
    localStorage.removeItem('auth_token');
    setUser(null);

    // Revoke the Google session so user can pick a different account
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  const value = {
    user,
    loading,
    gsiReady,
    loginWithGoogle,
    renderGoogleButton,
    logout,
    isPlaceholderClientId: GOOGLE_CLIENT_ID.startsWith('YOUR_'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";

export function LoginButton() {
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        }).then((res) => res.json());
        
        setUser({ email: userInfo.email, name: userInfo.name });
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  if (!mounted) {
    return <div className="login-container" style={{ marginLeft: 'auto', display: 'flex', width: '150px' }} aria-label="Loading authentication"></div>;
  }

  return (
    <div className="login-container" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }} aria-label="Authentication controls">
      {user ? (
        <div style={{ fontSize: '0.875rem' }} role="status" aria-live="polite">
          <span>Welcome, {user.name}</span>
          <button 
            onClick={() => setUser(null)}
            aria-label="Sign out of your account"
            style={{ marginLeft: '0.5rem', background: 'transparent', border: '1px solid currentColor', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button 
          onClick={() => login()}
          aria-label="Sign in with your Google account"
          style={{ background: '#4285F4', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
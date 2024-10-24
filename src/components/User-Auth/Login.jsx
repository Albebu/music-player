import React, { useEffect, useState } from 'react';

const Login = ({ clientId, onProfileFetched }) => {
  const [error, setError] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    const redirectToAuthCodeFlow = async () => {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);

      localStorage.setItem("verifier", verifier);

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", "http://localhost:5173/callback");
      params.append("scope", "user-read-private user-read-email");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    };

    const generateCodeVerifier = (length) => {
      let text = '';
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    const generateCodeChallenge = async (codeVerifier) => {
      const data = new TextEncoder().encode(codeVerifier);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
    };
    
    const getAccessToken = async (clientId, code) => {
      const verifier = localStorage.getItem("verifier");
    
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:5173/callback");
      params.append("code_verifier", verifier);
    
      console.log('Requesting access token with params:', params.toString());
    
      const result = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params
      });
    
      if (!result.ok) {
        const errorText = await result.text();
        console.error('Failed to fetch access token:', errorText);
        throw new Error('Failed to fetch access token');
      }
    
      const { access_token, refresh_token } = await result.json();
      console.log('Access Token:', access_token); // Verificar el token de acceso
      console.log('Refresh Token:', refresh_token); // Verificar el token de actualización
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token); // Almacenar el token de actualización
      return access_token;
    };
    
    const refreshAccessToken = async (clientId) => {
      const refreshToken = localStorage.getItem("refresh_token");
    
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
    
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refreshToken);
    
      console.log('Requesting new access token with params:', params.toString());
    
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });
    
      if (!result.ok) {
        const errorText = await result.text();
        console.error('Failed to refresh access token:', errorText);
        throw new Error('Failed to refresh access token');
      }
    
      const { access_token } = await result.json();
      console.log('New Access Token:', access_token); // Verificar el nuevo token de acceso
      localStorage.setItem("access_token", access_token);
      return access_token;
    };
    
    const fetchProfile = async (token, clientId) => {
  let result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  if (result.status === 401) {
    // Token expirado, obtener un nuevo token de acceso
    const newToken = await refreshAccessToken(clientId);
    result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${newToken}` }
    });
  }

  if (!result.ok) {
    const errorText = await result.text();
    console.error('Failed to fetch profile:', errorText); // Verificar el error
    throw new Error('Failed to fetch profile');
  }

  return await result.json();
};
    
    const authenticate = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");
    
        if (storedToken) {
          const profile = await fetchProfile(storedToken, clientId);
          onProfileFetched(profile);
        } else if (!code) {
          redirectToAuthCodeFlow();
        } else {
          const accessToken = await getAccessToken(clientId, code);
          const profile = await fetchProfile(accessToken, clientId);
          onProfileFetched(profile);
    
          window.history.replaceState({}, document.title, "/");
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    authenticate();
  }, [code, clientId, onProfileFetched]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {!error && <p>Loading...</p>}
    </div>
  );
};

export default Login;
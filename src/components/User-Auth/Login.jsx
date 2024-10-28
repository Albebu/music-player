import React, { useEffect } from "react";

function Login({ accessToken, setAccessToken, clientId }) {
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      // Si ya hay un token almacenado, lo establecemos en el estado.
      setAccessToken(storedToken);
    } else {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        fetchAccessToken(clientId, code);
      }
    }
  }, [accessToken, clientId, setAccessToken]);

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async function fetchAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    if (!verifier) {
      console.error("No verifier found in localStorage.");
      return;
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    try {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      const data = await result.json();
      if (result.ok && data.access_token) {
        // Almacena el token en localStorage y actualiza el estado.
        localStorage.setItem("accessToken", data.access_token);
        setAccessToken(data.access_token);

      } else {
        console.error("Error fetching access token:", data);
      }
    } catch (error) {
      console.error("Failed to fetch access token:", error);
    }
  }


  function generateCodeVerifier(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
}

export default Login;

"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Use dummy keys for development if not provided
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy-client-id.apps.googleusercontent.com";
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "dummy-maps-key";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <APIProvider apiKey={mapsApiKey}>
        {children}
      </APIProvider>
    </GoogleOAuthProvider>
  );
}
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "993153128688-a3kg51074bcm67ns910925v9ujbfeq20.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

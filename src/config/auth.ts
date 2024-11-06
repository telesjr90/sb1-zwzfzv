export const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your Azure AD app client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["Files.ReadWrite", "Files.ReadWrite.All"]
};
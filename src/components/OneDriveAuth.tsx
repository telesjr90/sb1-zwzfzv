import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button } from '@mui/material';
import { loginRequest } from '../config/auth';

interface OneDriveAuthProps {
  onLogin: (accessToken: string) => void;
}

export const OneDriveAuth: React.FC<OneDriveAuthProps> = ({ onLogin }) => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      if (response.accessToken) {
        onLogin(response.accessToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogin}
      className="bg-blue-600 hover:bg-blue-700"
    >
      Connect to OneDrive
    </Button>
  );
};
// src/services/authService.ts
import { msalConfig } from '../config/auth';
import { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';

export class AuthService {
  private static instance: AuthService;
  private msalInstance: PublicClientApplication;

  private constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(): Promise<AuthenticationResult> {
    try {
      return await this.msalInstance.loginPopup({
        scopes: ['user.read', 'Files.ReadWrite']
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.msalInstance.logout();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  getAccount() {
    return this.msalInstance.getAllAccounts()[0];
  }
}

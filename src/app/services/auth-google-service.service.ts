import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleServiceService {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }
  private configureOAuth() {
    this.oauthService.configure({
      issuer: 'https://your-identity-provider.com',
      redirectUri: window.location.origin + '/login-callback',
      clientId: 'your-client-id',
      responseType: 'code',
      scope: 'openid profile email',
      requireHttps: true,
    });
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    this.oauthService.initImplicitFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }
  initLoginFlow() {
    this.oauthService.initCodeFlow();
  }
}

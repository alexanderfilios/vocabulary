import { provide } from '@angular/core';
import { AuthRouteHelper } from './auth-route-helper';
import { AuthService } from './auth-service';


export { AuthService };

export const AUTH_PROVIDERS: any[] = [
  AuthRouteHelper,

  provide(AuthService, {
    useFactory: (): AuthService => {
      return new AuthService();
    }
  })
];

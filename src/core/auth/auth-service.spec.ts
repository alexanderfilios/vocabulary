import { describe, expect, it, beforeEachProviders, injectAsync } from 'angular2/testing';
import { AuthService } from './auth-service';


describe('AuthService', () => {
  beforeEachProviders(() => [AuthService]);

  describe('#authenticate()', () => {
    it('should fulfill promise when pin is correct', injectAsync([AuthService], service => {
      return new Promise(resolve => {
        service.authenticate(1234)
          .then(authenticated => {
            expect(authenticated).toBe(true);
            resolve();
          });
      });
    }));

    it('should reject promise when pin is incorrect', injectAsync([AuthService], service => {
      return new Promise(resolve => {
        service.authenticate(4321)
          .then(authenticated => {
            expect(authenticated).toBe(false);
            resolve();
          });
      });
    }));
  });
});

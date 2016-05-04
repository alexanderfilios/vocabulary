import { async, beforeEachProviders, describe, expect, inject, it } from '@angular/core/testing';
import { AuthService } from './auth-service';


describe('AuthService', () => {
  beforeEachProviders(() => [AuthService]);

  describe('#authenticate()', () => {
    it('should fulfill promise when pin is correct', async(inject([AuthService], service => {
      service.authenticate(1234)
        .then(authenticated => {
          expect(authenticated).toBe(true);
        });
    })));

    it('should reject promise when pin is incorrect', async(inject([AuthService], service => {
      service.authenticate(4321)
        .then(authenticated => {
          expect(authenticated).toBe(false);
        });
    })));
  });
});

export class AuthService {
  authenticate(pin: number): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void) => {
      setTimeout(() => {
        if (pin === 1234) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }, 1000);
    });
  }
}

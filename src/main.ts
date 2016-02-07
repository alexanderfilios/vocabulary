import { enableProdMode, provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { APP_BASE_HREF, ROUTER_PROVIDERS } from 'angular2/router';

// root component
import { App } from 'components/app/app';

// modules
import { AUTH_PROVIDERS } from 'modules/auth/providers';

// global styles
import 'styles/styles.scss';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}


bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'})
]).catch((error: Error) => console.error(error));

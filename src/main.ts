import { enableProdMode } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';

// core
import { AUTH_PROVIDERS } from './core/auth';

// root component
import { App } from './views/app';

// common styles
import './views/common/styles.scss';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}


bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS
]).catch((error: Error) => console.error(error));

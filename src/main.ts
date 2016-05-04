import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

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

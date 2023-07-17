import 'zone.js';
import { enableProdMode, getPlatform } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from "./app/app.module";

if (environment.production) {
    enableProdMode();
}

const platform = getPlatform() ?? platformBrowserDynamic();

platform.bootstrapModule(AppModule)
    .catch(err => console.error(err));
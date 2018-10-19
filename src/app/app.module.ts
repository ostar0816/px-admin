import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';

import { PyxisSharedModule } from '@pyxis/shared.module';
import { PyxisModule } from '@pyxis/pyxis.module';

import { pyxisConfig } from './pyxis-config';

import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';
import { PyxisFakeDbService } from './pyxis-fake-db/pyxis-fake-db.service';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(PyxisFakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),

    PyxisSharedModule,
    PyxisModule.forRoot(pyxisConfig),

    AppRoutingModule,
    MainModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

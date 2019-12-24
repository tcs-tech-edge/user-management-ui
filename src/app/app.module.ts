import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppRoutes } from "./appRouter.module";

import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { MemDbService } from './services/mem-db.service';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ListUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutes, InMemoryWebApiModule.forRoot(MemDbService, {delay: 0, passThruUnknownUrl: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

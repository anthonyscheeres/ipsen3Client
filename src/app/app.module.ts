import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component:HomeComponent
        },
        {
          path: "login",
          component: LoginComponent
        },
        {
          path: "admin",
          component: AdminComponent
        },
        // otherwise redirect to home
        { path: '**', redirectTo: '' }
      ]
    )
  ],
  providers: [   {
          provide: LocationStrategy, useClass: HashLocationStrategy
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }

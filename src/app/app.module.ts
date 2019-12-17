import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { JSONTableModule } from 'angular-json-table';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ExperimentListComponent } from './experiment-list/experiment-list.component';
import { CreateExperimentComponent } from './create-experiment/create-experiment.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule , ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UsersComponent,
    NavigationBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ExperimentListComponent,
    CreateExperimentComponent

  ],
    imports: [
        BrowserModule,
        JSONTableModule, // Add the JSONTableModule
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        RouterModule.forRoot(
            [
                {
                    path: 'register',
                    component: RegisterComponent
                },
                {
                    path: '',
                    component: HomeComponent
                },
                {
                    path: "login",
                    component: LoginComponent
                },
                {
                    path: "users",
                    component: UsersComponent
                },
                {
                    path: "experiment",
                    component: ExperimentListComponent
                },

                // otherwise redirect to home
                {path: '**', redirectTo: ''}
            ]
        ),
        FormsModule,
        ReactiveFormsModule
    ],
  entryComponents: [
    CreateExperimentComponent
  ],
  providers: [   {
          provide: LocationStrategy, useClass: HashLocationStrategy
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }

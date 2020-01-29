import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ExperimentListComponent } from './experiment-list/experiment-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmPopupComponent } from './popup/confirm-popup/confirm-popup.component';
import { AlertPopupComponent } from './popup/alert-popup/alert-popup.component';
import { HorizontaleNavigationBarComponent } from './horizontale-navigation-bar/horizontale-navigation-bar.component';
import { VerticalNavigationBarComponent } from './vertical-navigation-bar/vertical-navigation-bar.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardListContainerComponent } from './dashboard-list/dashboard-list-container/dashboard-list-container.component';
import {FilterService} from "./filter.service";
import {PopupService} from "./popup.service";
import {CreateExperimentComponent} from "./create-experiment/create-experiment.component";

@NgModule({
  declarations: [
    VerticalNavigationBarComponent,
    HorizontaleNavigationBarComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UsersComponent,
    NavigationBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ExperimentListComponent,
    ConfirmPopupComponent,
    AlertPopupComponent,
    DashboardListComponent,
    DashboardListContainerComponent,
    CreateExperimentComponent
  ],
    imports: [
        BrowserModule,
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
                    path: 'home',
                    component: HomeComponent
                },
                {
                    path: "",
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

                {
                    path: "dashboard",
                    component: DashboardListComponent
                },

                // otherwise redirect to home
                {path: '**', redirectTo: ''}
            ]
        ),
        FormsModule,
        ReactiveFormsModule,
    ],
  entryComponents: [
    ConfirmPopupComponent,
    AlertPopupComponent,
    CreateExperimentComponent
  ],
  providers: [
    PopupService,
    FilterService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

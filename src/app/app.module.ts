import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login.component';
import { SideNavBar } from '../pages/side-nav/side-nav.component';
import { HomePage } from '../pages/homepage/homepage.component';
import { ProjectsPage } from '../pages/projects/projects.component';
import { CompletedProjects } from '../pages/projects/completed/completed.component';
import { CurrentProjects } from '../pages/projects/current/current.component';
import { UpcomingProjects } from '../pages/projects/upcoming/upcoming.component';
import { ProjectDetails } from '../pages/projects/project-details/project-details.component';
import { SiteDetails } from '../pages/projects/site-details/site-details.component';
import { DataServiceProvider } from '../providers/data-service/data-service';

import { BlankPage } from '../pages/blank/blank';
import { GroundWaterSampling } from '../pages/projects/ground-water-sampling/ground-water.component';
import { WellReffDetails1 } from '../pages/projects/well-reff-data/well-reff1.component';
import { ProjectSetup } from '../pages/project-setup/project-setup.component'
import { WellReffDetails2 } from '../pages/projects/well-reff-data/well-reff2.component';
import { ProjectSetupDetails } from '../pages/project-setup/project-setup-details/project-setup-details.component';
import { SoilBoring } from '../pages/projects/soil-boring/soil-boring.component';
import { SoilBoringSamples } from '../pages/projects/soil-boring/soil-boring-samples.component';
import { WellConstruction } from '../pages/projects/well-construction/well-construction.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NativeStorage } from '@ionic-native/native-storage'

import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { EmailComposer } from '@ionic-native/email-composer'
import { PageServiceProvider } from '../providers/page-service/page-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SideNavBar,
    HomePage,
    ProjectsPage,
    CompletedProjects,
    CurrentProjects,
    UpcomingProjects,
    ProjectDetails,
    SiteDetails,
    BlankPage,
    WellReffDetails1,
    GroundWaterSampling,
    WellReffDetails2,
    ProjectSetup,
    ProjectSetupDetails,
    SoilBoring,
    SoilBoringSamples,
    WellConstruction
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SideNavBar,
    HomePage,
    ProjectsPage,
    CompletedProjects,
    CurrentProjects,
    UpcomingProjects,
    ProjectDetails,
    SiteDetails,
    BlankPage,
    WellReffDetails1,
    GroundWaterSampling,
    WellReffDetails2,
    ProjectSetup,
    ProjectSetupDetails,
    SoilBoring,
    SoilBoringSamples,
    WellConstruction
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider,
    NativeStorage,
    File,
    Diagnostic,
    EmailComposer,
    PageServiceProvider
  ]
})
export class AppModule { }

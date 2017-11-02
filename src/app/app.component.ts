import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login.component';
// import { SiteDetails } from '../pages/projects/site-details/site-details.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
  public alertCtrl: AlertController ,public toastCtrl:ToastController, public splashScreen: SplashScreen) {
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        platform.registerBackButtonAction(()=>this.backButton());
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage }
    
    ];

  }

   backButton(){
        return false;
     }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

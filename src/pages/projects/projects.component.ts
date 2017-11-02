import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import { LoadingController } from 'ionic-angular';


@Component({
selector: 'projects-page',
templateUrl: 'projects.component.html',
})
export class ProjectsPage {

  loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
   });

  private projectType;
  private showTab;

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public params:NavParams) {

    this.projectType = [
      {
        title: 'Current Projects',
        show: true
      },
      {
        title: 'Upcoming Projects',
        show: false
      },
      {
        title: 'Completed Projects',
        show: false
      }
    ];
    
    this.showTab = params.get('projectType');
    this.showProjectTab(this.showTab);
    
    
  } 
  ionViewWillEnter() {
    this.loadingPopup.present();
  }
  ionViewDidEnter(){
      this.loadingPopup.dismiss();
  }

  showProjectTab(pageTitle : string){
    let currentPage = _.findIndex(this.projectType, { show : true});
    this.projectType[currentPage].show = false;
    let newPage = _.findIndex(this.projectType, { title : pageTitle});
    this.projectType[newPage].show = true;
  }
}
import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core'; 
import { NavController } from 'ionic-angular';

import _ from 'lodash';

import { HomePage } from '../homepage/homepage.component';
import { ProjectsPage } from '../projects/projects.component';
import { BlankPage } from '../blank/blank';
import { ProjectSetup } from '../project-setup/project-setup.component';
import { ProjectSetupDetails } from '../project-setup/project-setup-details/project-setup-details.component';
import { SoilBoringSamples } from '../projects/soil-boring/soil-boring-samples.component';

import { PageServiceProvider }  from '../../providers/page-service/page-service';

@Component({
  selector: 'nav-bar',
  templateUrl: 'side-nav.component.html'
})
export class SideNavBar implements OnChanges  {

  // rootPage: any = ProjectsPage;
  private pages: Array<{title: string, url: string, selected_url:string, selectedIcon:boolean, urlToDisplay: string}>;
  
  @Input()
  private selectedUrl : string="Home";

  constructor(public navCtrl: NavController, private cd:ChangeDetectorRef, private pageService: PageServiceProvider) { 
    this.pages = pageService.pages;
    //this.setIconUrl()
  }

  ngOnChanges(){
    console.log(this.selectedUrl);
     //this.setIconUrl();
  }

  redirectToPage(pageTitle : string){
    let currentPage = _.findIndex(this.pages, { title : pageTitle});
    //this.pages[currentPage].selectedIcon = true;
    switch(currentPage){
      case 0: 
        this.navCtrl.push(HomePage, {}, {animate:false}).catch(() => {});
        break;
      case 1:
        this.navCtrl.push(ProjectsPage, { projectType: "Current Projects"}, {animate:false}).catch(() => {});
        break;
      case 2:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 3:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 4:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 5:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 6:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 7:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 8:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
      case 9:
        this.navCtrl.push(BlankPage, {}, {animate:false}).catch(() => {});
        break;
    }
  }

  setIconUrl(){
    // let initialPage = _.findIndex(this.pages, { selectedIcon : true})
    // this.pages[initialPage].selectedIcon = false;
    let currentPage = _.findIndex(this.pages, { title : this.selectedUrl});
    this.pages[currentPage].selectedIcon = true;
  }

  toggleActive(pageTitle){
    for(var iMod = 0; iMod<this.pageService.pages.length;iMod++){
      this.pageService.pages[iMod].urlToDisplay = this.pageService.pages[iMod].url;
    }
    let currentPage = _.findIndex(this.pages, { title : pageTitle});
    this.pageService.pages[currentPage].urlToDisplay = this.pageService.pages[currentPage].selected_url;
    this.cd.detectChanges();
  }
}
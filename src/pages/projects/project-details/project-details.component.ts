import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';

import { SiteDetails } from '../site-details/site-details.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';
import { WellConstruction } from '../well-construction/well-construction.component';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'project-details',
  templateUrl: 'project-details.component.html',
})
export class ProjectDetails {
    loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
    });

    private selectedProjectDetails;  

    constructor(public loadingCtrl: LoadingController,public navCtrl2: NavController, public params:NavParams,public navCtrl3: NavController,public navCtrl4: NavController,
                    private alertCtrl: AlertController) {
        this.selectedProjectDetails = params.get('selectedProjectDetails')
    } 
    ionViewWillEnter() {
        this.loadingPopup.present();
    }
    ionViewDidEnter(){
      this.loadingPopup.dismiss();
    }
    openSiteData(site, projectname){
        this.navCtrl2.push( SiteDetails, {siteData: site, project:projectname}, {animate: false} )
    }
    
    openWellRefData(site,projectname){
     this.navCtrl3.push( WellReffDetails1, {siteData: site, project:projectname}, {animate: false} )
    }
    
    openWellConData(site, projectname){
        if(site.hydrocarbonSampling == true){
            if(site.soilboring.length > 0){
                this.navCtrl3.push( WellConstruction, {siteData: site, project:projectname}, {animate: false} )
            }
            else{
                this.showWellPopup();
            }
        }else{
            this.navCtrl3.push( WellConstruction, {siteData: site, project:projectname}, {animate: false} );
        }  
    }

    showWellPopup(){
        let confirm = this.alertCtrl.create({
                    title: "Soil boring data must be completed prior to entering well completion data.",
                    buttons: ['OK']
                    });
                    confirm.present();
    }   
    
    groundWaterSampling(site,projectname){
     this.navCtrl4.push( GroundWaterSampling, {siteData: site,project:projectname}, {animate: false} )
    }
    soilBoring(site,projectname){
     this.navCtrl4.push( SoilBoring, {siteData: site,project:projectname}, {animate: false} )
    }
  
}
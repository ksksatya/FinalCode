import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SiteDetails } from '../site-details/site-details.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { CurrentProjectModal } from '../../common/project/current-project.modal';
import { ProjectDetails } from '../project-details/project-details.component';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { LoadingController } from 'ionic-angular';
import { WellConstruction } from '../well-construction/well-construction.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';

@Component({
    selector: 'current-projects',
    templateUrl: 'current.component.html',
    // providers: [ProjectService]
})
export class CurrentProjects implements OnInit {

    loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...'
    });

    private currentProjectsList: Array<CurrentProjectModal>;
    private shownGroup;

    constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public dataServiceProvider: DataServiceProvider, public navCtrl1: NavController, public params: NavParams) {
        this.currentProjectsList = dataServiceProvider.getProjectData();
        console.log(this.currentProjectsList);
    }

    ionViewWillEnter() {
        this.loadingPopup.present();
    }
    ionViewDidEnter() {
        this.loadingPopup.dismiss();
    }

    ngOnInit() {
        this.getCurrentProjects();
    }

    getCurrentProjects() {
        this.currentProjectsList = this.dataServiceProvider.getSeparateProjects("Current");
    }

    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    }

    isGroupShown(group) {
        return this.shownGroup === group;
    }

    setProjectToView(project) {
        this.navCtrl1.push(ProjectDetails, { selectedProjectDetails: project }, { animate: false });
    }
    openSiteData(site, projectname, pageTitle: string) {
        if (pageTitle === 'fluidlevel') {
            this.navCtrl1.push(SiteDetails, { siteData: site, project: projectname }, { animate: false });
        }
        else if (pageTitle === 'groundwater') {
            this.navCtrl1.push(GroundWaterSampling, { siteData: site, project: projectname }, { animate: false });
        }
        else if (pageTitle === 'well') {
            this.navCtrl1.push(WellReffDetails1, { siteData: site, project: projectname }, { animate: false });
        }
        else if (pageTitle === 'soil') {
            this.navCtrl1.push(SoilBoring, { siteData: site, project: projectname }, { animate: false });
        }
        else if (pageTitle === 'wellcon') {
            if (site.hydrocarbonSampling == true) {
                if (site.soilboring.length > 0) {
                    this.navCtrl1.push(WellConstruction, { siteData: site, project: projectname }, { animate: false })
                }
                else {
                    this.showWellPopup();
                }
            } else {
                this.navCtrl1.push(WellConstruction, { siteData: site, project: projectname }, { animate: false });
            }    
        }
    }

    showWellPopup(){
        let confirm = this.alertCtrl.create({
                    title: "Soil boring data must be completed prior to entering well completion data.",
                    buttons: ['OK']
                    });
                    confirm.present();
    }

}
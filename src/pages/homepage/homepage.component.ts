import { Component, OnInit } from '@angular/core';
import { NavController} from 'ionic-angular';
// import { ProjectModal } from '../common/project/project.modal';
import { ProjectsPage } from '../projects/projects.component';
import { ProjectDetails } from '../projects/project-details/project-details.component';
// import { ProjectListService } from '../services/projectlist.service';
import { CardDataService } from '../services/carddata.service';

import { CurrentProjectModal } from '../common/project/current-project.modal';
import { DataServiceProvider } from '../../providers/data-service/data-service' ;
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'homepage.component.html',
  providers: [CardDataService]
})
export class HomePage implements OnInit{
    
    loadingPopup = this.loadingCtrl.create({
     content: 'Loading data...'
        });


    shownGroup = 0;
    private inboxContent: Array<{title: string, url: string, count : number}>;
    private timelineContent: Array<{title: string, url: string, count : number}>;
    private projectContent: Array<{title: string, projectList: Array<CurrentProjectModal>}>;

    private currentProjectsList : Array<CurrentProjectModal>;
    private upcomingProjectsList : Array<CurrentProjectModal>;
    private completedProjectsList : Array<CurrentProjectModal>;

    constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, private dataServiceProvider : DataServiceProvider, private cardDataService: CardDataService ) {
        this.inboxContent = cardDataService.inboxData();
        this.timelineContent = cardDataService.timelineData();    
        this.getUniqueProjects();
    }
    ionViewWillEnter() {
        this.loadingPopup.present();
    }
    ionViewDidEnter(){
      this.loadingPopup.dismiss();
    }
    ngOnInit(){
        this.getUniqueProjects();
        this.projectContent = [
            {
                "title" : "Current Projects",
                "projectList" : this.currentProjectsList
            },
            {
                "title" : "Upcoming Projects",
                "projectList" : this.upcomingProjectsList
            },
            {
                "title" : "Completed Projects",
                "projectList" : this.completedProjectsList
            }
        ]
    }

    ngOnChange(){
        this.getUniqueProjects();
        this.projectContent = [
            {
                "title" : "Current Projects",
                "projectList" : this.currentProjectsList
            },
            {
                "title" : "Upcoming Projects",
                "projectList" : this.upcomingProjectsList
            },
            {
                "title" : "Completed Projects",
                "projectList" : this.completedProjectsList
            }
        ]
    }

    getUniqueProjects(){
        this.currentProjectsList = this.dataServiceProvider.getSeparateProjects("Current");
        this.upcomingProjectsList = this.dataServiceProvider.getSeparateProjects("Upcoming");
        this.completedProjectsList = this.dataServiceProvider.getSeparateProjects("Completed");
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
    
    gotoprojectstab(pro){
      this.navCtrl.push(ProjectsPage, {projectType: pro}, {animate:false})
    }

    openProjectDetails(projectData){
        this.navCtrl.push(ProjectDetails, {selectedProjectDetails: projectData}, {animate:false})
    }
}



 


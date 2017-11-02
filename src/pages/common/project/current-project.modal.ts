import { ProjectSite } from './project-sites';

export class CurrentProjectModal{
    public projectName : string;
    public location : string;
    public startDate : string;     //change to date
    public endDate : string;       //change to date
    public clientName : string;
    public sitesCount : number;
    public projectType : string;        //Upcoming/Current/Completed
    public projectCloud : boolean;      //True : Cloud---- False: Sync Icon
    public sitesData : Array<ProjectSite>;   
}

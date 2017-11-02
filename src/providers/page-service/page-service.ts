import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PageServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PageServiceProvider {

  public pages: Array<{title: string, url: string, selected_url:string, selectedIcon:boolean, urlToDisplay: string}>;

  constructor(public http: Http) {
    this.pages = [
      {
        title: 'Home',
        url: 'assets/icon/home.svg',
        selected_url : "assets/icon/home_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/home_selected.svg'
      },
      {
        title: 'Projects',
        url: 'assets/icon/Projects.svg',
        selected_url : "assets/icon/Projects_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Projects.svg'
      },
      {
        title: 'Setup',
        url: 'assets/icon/ProjectSetup.svg',
        selected_url : "assets/icon/ProjectSetup_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/ProjectSetup.svg'
      },
      {
        title: 'Time Log',
        url: 'assets/icon/TimeLog.svg',
        selected_url : "assets/icon/TimeLog_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/TimeLog.svg'
      },
      {
        title: 'Documents',
        url: 'assets/icon/Documents.svg',
        selected_url : "assets/icon/Documents_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Documents.svg'
      },
      {
        title: 'Gallery',
        url: 'assets/icon/Gallery.svg',
        selected_url : "assets/icon/Gallery_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Gallery.svg'
      },
      {
        title: 'Maps',
        url: 'assets/icon/Maps.svg',
        selected_url : "assets/icon/Maps_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Maps.svg'
      },
      {
        title: 'Settings',
        url: 'assets/icon/settings.svg',
        selected_url : "assets/icon/settings_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/settings.svg'
      },
      {
        title: 'Alerts',
        url: 'assets/icon/Alerts.svg',
        selected_url : "assets/icon/Alerts_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Alerts.svg'
      },
      {
        title: 'Search',
        url: 'assets/icon/Search.svg',
        selected_url : "assets/icon/Search_selected.svg",
        selectedIcon: false,
        urlToDisplay: 'assets/icon/Search.svg'
      }     
    ];
  }

}

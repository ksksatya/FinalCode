import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SoilBoringModel } from '../../common/project/soilBoring.model';
import { LoadingController } from 'ionic-angular';
import { ProjectDetails } from '../project-details/project-details.component'
import { SiteDetails } from '../site-details/site-details.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { WellReffDetails1 } from '../well-reff-data/well-reff1.component';
import { WellConstruction } from '../well-construction/well-construction.component';


import _ from 'lodash';

@Component({
    selector: 'soil-boring-samples',
    templateUrl: 'soil-boring-samples.component.html',
})
export class SoilBoringSamples {

    loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...'
    });

    private siteData;
    private projectName;
    private grade: boolean;

    private fromDepth: string;
    private toDepth: string;
    private percentRecovered: string;
    private sampleType: string;
    private sampleTypeList: Array<string>;
    private lithology: string;
    private lithologyList: Array<string>;
    private color: string;
    private moistureContent: string;
    private moistureContentList: Array<string>;
    private plasticity: string;
    private plasticityList: Array<string>;
    private grading: string;
    private sorting: string;
    private sortingList: Array<string>;
    private density: string;
    private densityList: Array<string>;
    private gradingList: Array<string>;
    private notes: string;
    public pattern: any;
    public pattern1: any;
    public pattern2: any;
    //public validationFlag = false;


    private soilPrevFormData: SoilBoringModel;

    private soilBoringSampleForm: FormGroup;

    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams, public _form: FormBuilder, public dataServiceProvider: DataServiceProvider, private alertCtrl: AlertController) {

        this.pattern = true;
        this.pattern1 = true;
        this.pattern2 = true;
        this.siteData = params.get('siteData');
        this.projectName = params.get('projectname');
        this.soilPrevFormData = params.get('soilBoringData');

        this.sampleTypeList = ["Thin Walled Tube", "Denison", "Split Spoon", "Rock Core", "Auger", "Piston", "Pitcher", "No Recovery"];
        this.lithologyList = ["Sand", "Coarse Sand", "Silty Sand", "Clayey Sand", "Silty Clayey Sand", "Sandy Silt", "Clayey Silt", "Sandy Clayey Silt", "Silty Clayey Sand", "Sandy Silty Clay", "Fill", "Shale", "Siltstone", "Mudstone", "Claystone", "Limestone", "Concrete", "Saccrete", "Gravel", "Sandy Gravel", "Gravelly Sand", "Peat", "Caliche", "Shell Hash", "Wood", "Interlaminated Sand", "Interlaminated Clay", "Non Recovery", "Sludge"];
        this.moistureContentList = ["Dry", "Dry To Damp", "Damp", "Damp To Moist", "Moist", "Moist To Wet", "Wet", "Wet To Saturated", "Saturated"];
        this.plasticityList = ["Non-Plastic", "Semi-Plastic", "Plastic"];
        this.sortingList = ["Well Sorted", "Medium Sorting", "Poorly Sorted", "Not Applicable"];
        this.densityList = ["Very Loose", "Loose", "Medium Dense", "Dense", "Very Dense"];
        this.gradingList = ["Well Graded", "Medium Grading", "Poorly Graded", "Not Applicable"]

        this.soilBoringSampleForm = this._form.group({
            "fromDepth": [this.fromDepth, Validators.required],
            "toDepth": [this.toDepth, Validators.required],
            "percentRecovered": [this.percentRecovered, Validators.required],
            "sampleType": [this.sampleType, Validators.required],
            "lithology": [this.lithology, Validators.required],
            "color": [this.color, Validators.required],
            "moistureContent": [this.moistureContent, Validators.required],
            "plasticity": [this.plasticity, Validators.required],
            "grading": [this.grading, Validators.required],
            "sorting": [this.sorting, Validators.required],
            "density": [this.density, Validators.required],
            "notes": [this.notes]
        })
    }

    ngOnInit() {
        console.log(this.siteData.soilboring);
        var soilboring = this.siteData.soilboring;
        if (JSON.stringify(soilboring) !== '{}') {

            // this.fromDepth = soilboring.fromDepth;
            // this.toDepth = soilboring.toDepth;
            // this.percentRecovered = soilboring.percentRecovered;
            // this.sampleType = soilboring.sampleType;
            // this.lithology = soilboring.lithology;
            // this.color = soilboring.color;
            // this.plasticity = soilboring.plasticity;
            // this.grading = soilboring.grading;
            // this.sorting = soilboring.sorting;
            // this.density = soilboring.density;
            // this.notes = soilboring.notes;
        }
    }

    ionViewWillEnter() {
        this.loadingPopup.present();
    }
    ionViewDidEnter() {
        this.loadingPopup.dismiss();
    }

    goBackToDetails() {
        this.navCtrl.pop({ animate: false });
    }

    headerNavigation(pageTitle: string) {
        if (pageTitle === 'fluidlevel') {
            this.navCtrl.push(SiteDetails, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else if (pageTitle === 'groundwater') {
            this.navCtrl.push(GroundWaterSampling, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else if (pageTitle === 'well') {
            this.navCtrl.push(WellReffDetails1, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else if (pageTitle === 'wellcon') {
            if (this.siteData.hydrocarbonSampling == true) {
                if (this.siteData.soilboring.length > 0) {
                    this.navCtrl.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false })
                }
                else {
                    this.showWellPopup();
                }
            } else {
                this.navCtrl.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false });
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

    save() {

        let currentDate= new Date();
        let finalSoilBoringData = new SoilBoringModel(this.soilPrevFormData.boringWellId, this.soilPrevFormData.latitude,
            this.soilPrevFormData.longitude, this.soilPrevFormData.owner, this.soilPrevFormData.boreDiameter,
            this.soilPrevFormData.surfaceElevation, this.soilPrevFormData.totalDepth, this.soilPrevFormData.drillingCompany,
            this.soilPrevFormData.drillingMethod, this.soilPrevFormData.driller, this.fromDepth, this.toDepth,
            this.percentRecovered, this.sampleType, this.lithology, this.color, this.moistureContent, this.plasticity,
            this.grading, this.sorting, this.density, this.notes ,currentDate)
        console.log(finalSoilBoringData);

        // this.dataServiceProvider.updateSoilDataDetails([{
        //     "projectName": this.projectName, "siteName": this.siteData.siteName,
        //     "updateSoilData": {
        //         "soilBoring": finalSoilBoringData
        //     }
        // }])
        this.soilBoringSampleForm.reset();
        this.dataServiceProvider.updateSoilDetails([{
            "projectName": this.projectName, "siteName": this.siteData.siteName,
            "updateSoilBoring": {
                "soilboring": finalSoilBoringData
            }
        }])
    }
    // gotoProjectDetails(){
    //     this.navCtrl.push(ProjectDetails, {}, { animate: false });
    // }


                                                                                                                                   
                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                       
  triggerPDF(){
    this.dataServiceProvider.exportPDF(this.projectName, this.siteData.siteName,"soilboring", ["boringWellId", "latitude","longitude","owner", "boreDiameter", "surfaceElevation", "totalDepth","drillingCompany","drillingMethod","driller","fromDepth","toDepth","percentRecovered","sampleType","lithology","color","moistureContent","plasticity","grading","sorting","density","notes","timestamp"],"soil_boring_sampledetail");
  }

  triggerCSV(){
    this.dataServiceProvider.exportCSV(this.projectName, this.siteData.siteName,"soilboring", ["boringWellId", "latitude","longitude","owner", "boreDiameter", "surfaceElevation", "totalDepth","drillingCompany","drillingMethod","driller","fromDepth","toDepth","percentRecovered","sampleType","lithology","color","moistureContent","plasticity","grading","sorting","density","notes","timestamp"],"soil_boring_sampledetail");
  }

    goTowell() {
        this.navCtrl.push(WellConstruction, { siteData: this.siteData, project: this.projectName, grade: this.grade }, { animate: false });//why I have to use this (this has not been used anywhere else)
    }

    //Validations for Soilboaring
    changeDepthFrom(value1) {
        if (value1 && value1.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,2})$");
        }
        if (regEx.test(value1)) {
            this.pattern = true;
            //this.validationFlag = false;
        }
        else {
            this.pattern = false;
            //this.validationFlag = true;
        }
    }

    changeDepthTo(value2) {
        if (value2 && value2.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,2})$");
        }
        if (regEx.test(value2)) {
            this.pattern1 = true;
            //this.validationFlag = false;
        }
        else {
            this.pattern1 = false;
            //this.validationFlag = true;
        }
    }

    changePercentRecover(value3) {

        var regEx = new RegExp("^([0-9]{1,3})$");

        if (regEx.test(value3)) {
            this.pattern2 = true;
            //this.validationFlag = false;
        }
        else {
            this.pattern2 = false;
            //this.validationFlag = true;
        }
    }

    //End of Soil boring validations.
    
    //Reset Error Message
    resetValidation(){
      this.pattern = true;
        this.pattern1 = true;
        this.pattern2 = true;
    }

    completePopup() {
        let confirm = this.alertCtrl.create({
            title: 'Is there well completion data?',
            buttons: [{
                text: 'Yes',
                handler: () => {
                    let confirm2 = this.alertCtrl.create({
                        title: 'Is this Above or At grade?',
                        buttons: [{
                            text: 'Above grade',
                            handler: () => {
                                this.save();
                                this.grade = true;
                                this.goTowell();


                            },
                        }, {
                            text: 'At grade',
                            handler: () => {
                                this.save();
                                this.grade = false;
                                this.goTowell();

                            }
                        }],
                    });
                    confirm2.present();
                },
            }, {
                text: 'No',
                handler: () => {

                }
            }],
        });
        confirm.present();
    }

    ionViewCanLeave(): Promise<{}> {
    return new Promise((resolve, reject) => {
      if (!(this.soilBoringSampleForm.dirty)) {
        resolve();
      }
      else {
        let confirm = this.alertCtrl.create({
          title: 'Are you sure?',
          message: 'You have unsaved data! Do you want to leave?',
          buttons: [{
            text: 'Yes',
            handler: () => {
              resolve();
            },
          }, {
            text: 'No',
            handler: () => {
              reject();
            }
          }],
        });
        confirm.present();
      }
    })
  }

}
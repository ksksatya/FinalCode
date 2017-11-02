import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DataServiceProvider } from '../../../providers/data-service/data-service';
import { SampleModel } from '../../common/project/sampling.model';
import _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteDetails } from '../site-details/site-details.component';
import { GroundWaterSampling } from '../ground-water-sampling/ground-water.component';
import { WellDevelopment } from '../../common/project/well-development';
import { WellConstruction } from '../well-construction/well-construction.component';
import { SoilBoring } from '../soil-boring/soil-boring.component';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'well-reff-two',
    templateUrl: 'well-reff2.component.html',
})
export class WellReffDetails2 {

    loadingPopup = this.loadingCtrl.create({
        content: 'Loading data...',
        dismissOnPageChange: true
    });

    private siteData;
    private projectName;
    private purgeMethodList;
    private purgeList;
    private volumeRemoved;
    private cumuVolumeRemoved;
    private acidity;
    private temperature;
    private turbidity;
    private dissolvedOxygen;
    private oxygenReduction;
    private specificConductivity;
    private notes;

    private WellDevData: WellDevelopment;

    private diameter;
    private boreHole;
    private sandheight;
    private filter;
    private deptWater;
    private deptToProduct;
    private minVolume;
    private maxVolume;
    private totalDept;
    public wellDataForm2: FormGroup;

    private acidityStable: boolean = false;
    private tempStable: boolean = false;
    private turbStable: boolean = false;
    private disStable: boolean = false;
    private oxyStable: boolean = false;
    private conductivityStable: boolean = false;

    private sampleValue: number;
    private viewSample: number;

    private sampling_intervals: Array<SampleModel>;

    private sampling_data: Array<{ sample_number: number, sample_data: WellDevelopment }> = [];

    private isDisabled: boolean = false;

    private msCm;
    public validationFlag = false;
    public pattern: any;
    public pattern1: any;
    public pattern2: any;
    public pattern3: any;
    public pattern4: any;
    public pattern5: any;
    public pattern6: any;
    public pattern7: any;


    // private currentDate = Observable
    // .interval(1000)
    //  .map(()=> new Date());
    ionViewWillEnter() {
        this.loadingPopup.present();
    }
    ionViewDidEnter() {
        this.loadingPopup.dismiss();
    }

    headerNavigation(pageTitle: string) {
        if (pageTitle === 'fluidlevel') {
            this.navCtrl5.push(SiteDetails, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else if (pageTitle === 'groundwater') {
            this.navCtrl5.push(GroundWaterSampling, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
        else if (pageTitle === 'wellcon') {
            if (this.siteData.hydrocarbonSampling == true) {
                if (this.siteData.soilboring.length > 0) {
                    this.navCtrl5.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false })
                }
                else {
                    this.showWellPopup();
                }
            } else {
                this.navCtrl5.push(WellConstruction, { siteData: this.siteData, project: this.projectName }, { animate: false });
            }
        }
        else if (pageTitle === 'soil') {
            this.navCtrl5.push(SoilBoring, { siteData: this.siteData, project: this.projectName }, { animate: false })
        }
    }

    showWellPopup() {
        let confirm = this.alertCtrl.create({
            title: "Soil boring data must be completed prior to entering well completion data.",
            buttons: ['OK']
        });
        confirm.present();
    }

    ngOnInit() {
        this.initialiseSamples();
        let wellDataDetails: Array<WellDevelopment>;
        wellDataDetails = this.siteData.welldevelopment;

        if (wellDataDetails.length > 0) {
            let wellData: WellDevelopment;
            wellData = _.last(wellDataDetails);
            this.purgeMethodList = "";
            this.volumeRemoved = "";
            this.cumuVolumeRemoved = "";
            this.acidity = "";
            this.temperature = "";
            this.turbidity = "";
            this.dissolvedOxygen = "";
            this.oxygenReduction = "";
            this.specificConductivity = "";
            this.notes = "";
            this.sampleValue = 1;
            this.viewSample = 1;
            wellDataDetails.forEach((wellSampleData) => {
                this.sampling_data.push({ "sample_number": this.sampleValue, "sample_data": wellSampleData });
                this.sampleValue++;
                this.viewSample++;
            })
            console.log(this.sampling_data);
            //this.sampleValue--;
            let currentSample = _.findIndex(this.sampling_intervals, { visible: true });
            this.sampling_intervals[currentSample].visible = false;
            let activeSample = _.findIndex(this.sampling_intervals, { sample_number: this.sampleValue });
            this.sampling_intervals[activeSample].visible = true;
            this.moveToSample(this.sampleValue);
        }


        if (JSON.stringify(wellDataDetails) !== '{}') {

            // this.purgeMethodList = wellDataDetails.purgeMethod;
            // this.volumeRemoved = wellDataDetails.volumeRemoved;
            // this.cumuVolumeRemoved = wellDataDetails.cumuVolumeRemoved;
            // this.acidity = wellDataDetails.acidity;
            // this.temperature = wellDataDetails.temperature;
            // this.turbidity = wellDataDetails.turbidity;
            // this.dissolvedOxygen = wellDataDetails.dissolvedOxygen;
            // this.oxygenReduction = wellDataDetails.oxygenReduction;
            // this.specificConductivity = wellDataDetails.specificConductivity;
            // this.notes = wellDataDetails.notes;
        }
        //this.initialiseSamples()
    }

    initialiseSamples() {
        this.sampling_intervals = [
            { sample_number: 1, visible: true, viewing: true },
            { sample_number: 2, visible: false, viewing: false },
            { sample_number: 3, visible: false, viewing: false },
            { sample_number: 4, visible: false, viewing: false },
            { sample_number: 5, visible: false, viewing: false },
            { sample_number: 6, visible: false, viewing: false },
            { sample_number: 7, visible: false, viewing: false },
            { sample_number: 8, visible: false, viewing: false },
            { sample_number: 9, visible: false, viewing: false }
        ]

        this.sampleValue = 1;
        this.viewSample = 1;

    }


    goBackToDetails() {
        this.navCtrl5.pop({ animate: false });
    }


    constructor(public loadingCtrl: LoadingController, public navCtrl5: NavController, public params: NavParams, public dataServiceProvider: DataServiceProvider, public _form: FormBuilder, private alertCtrl: AlertController) {
        this.pattern = true;
        this.pattern1 = true;
        this.pattern2 = true;
        this.pattern3 = true;
        this.pattern4 = true;
        this.pattern5 = true;
        this.pattern6 = true;
        this.pattern7 = true;
        this.purgeList = ["Bailer", "Bailer/Pump", "Pump", "Other"];
        this.siteData = params.get('siteData');
        this.projectName = params.get('projectname');
        // this.diameter = params.get('diameter');
        // this.boreHole = params.get('boreHole');
        // this.sandheight = params.get('sandheight');
        // this.filter = params.get('filter')
        // this.deptWater = params.get('deptWater');
        // this.deptToProduct = params.get('deptToProduct');
        // this.minVolume = params.get('minVolume');
        // this.maxVolume = params.get('maxVolume');
        // this.totalDept = params.get('totalDept');

        this.WellDevData = params.get('wellDevData');



        this.wellDataForm2 = this._form.group({
            "purgeMethod": [this.purgeMethodList, Validators.required],
            "volumeRemoved": [this.volumeRemoved, Validators.required],
            "cummulativeVolume": [this.cumuVolumeRemoved, Validators.required],
            "acidity": [this.acidity, Validators.required],
            "temperature": [this.temperature, Validators.required],
            "turbidity": [this.turbidity, Validators.required],
            "dissolvedOxygen": [this.dissolvedOxygen, Validators.required],
            "oxygenReduction": [this.oxygenReduction, Validators.required],
            "specificConductivity": [this.specificConductivity, Validators.required],
            "msCm": [this.msCm],
            "notes": [this.notes]

        })


    }

    //Field Validations Start Here

    changeVolumeRemoved(value) {

        if (value && value.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,3})$");
        }
        if (regEx.test(value)) {
            this.pattern = true;
            this.validationFlag = false;
        }
        else {
            this.pattern = false;
            this.validationFlag = true;
        }
    }

    changeCumuVolume(value1) {

        if (value1 && value1.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,3})$");
        }
        if (regEx.test(value1)) {
            this.pattern1 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern1 = false;
            this.validationFlag = true;
        }
    }

    changeAcidityAlkalinity(value2) {
        if (value2 && value2.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,2})$");
        }
        if (regEx.test(value2)) {
            this.pattern2 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern2 = false;
            this.validationFlag = true;
        }
        this.showAcidityTicks();
    }

    changeTemperature(value3) {
        if (value3 && value3.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,2})$");
        }
        if (regEx.test(value3)) {
            this.pattern3 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern3 = false;
            this.validationFlag = true;
        }
        this.showTempTicks();
    }

    changeTurbidity(value4) {

        if (value4 && value4.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,3})$");
        }
        if (regEx.test(value4)) {
            this.pattern4 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern4 = false;
            this.validationFlag = true;
        }
        this.showTurbTicks();
    }

    changeDissolbedOxygen(value5) {
        if (value5 && value5.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,2}[.]{0,1}[0-9]{0,2})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,2})$");
        }
        if (regEx.test(value5)) {
            this.pattern5 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern5 = false;
            this.validationFlag = true;
        }
        this.showDisTicks();
    }

    changeOxygen(value6) {
        if (value6 && value6.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,3}[.]{0,1}[0-9]{0,1})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,3})$");
        }
        if (regEx.test(value6)) {
            this.pattern6 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern6 = false;
            this.validationFlag = true;
        }
        this.showOxyTicks();
    }

    changeConductivity(value7) {
        if (value7 && value7.indexOf('.') != -1) {
            var regEx = new RegExp("^([0-9]{1,4}[.]{0,1}[0-9]{0,3})$");
        }
        else {
            var regEx = new RegExp("^([0-9]{1,4})$");
        }
        if (regEx.test(value7)) {
            this.pattern7 = true;
            this.validationFlag = false;
        }
        else {
            this.pattern7 = false;
            this.validationFlag = true;
        }
        this.showConTicks();
    }
    //Field Validations End Here

    save() {


        let currentDate = new Date();
        let finalWellData = new WellDevelopment(this.WellDevData.wellDiameter, this.WellDevData.boreHoleDiameter, this.WellDevData.sandHeight, this.WellDevData.filterPack, this.WellDevData.depthToWater, this.WellDevData.depthToProduct, this.WellDevData.minimum, this.WellDevData.maximum, this.WellDevData.totalDepth, this.purgeMethodList, this.volumeRemoved, this.cumuVolumeRemoved, this.acidity, this.temperature, this.turbidity, this.dissolvedOxygen, this.oxygenReduction, this.specificConductivity, this.notes, currentDate)

        console.log(finalWellData);

        console.log(this.purgeMethodList + " " + this.volumeRemoved + " " + this.cumuVolumeRemoved + " " + this.acidity + " " + this.temperature + " " + this.turbidity + " " + this.dissolvedOxygen + " " + this.oxygenReduction + " " + this.specificConductivity + " " + this.notes);

        this.dataServiceProvider.updateWellDataDetails([{
            "projectName": this.projectName, "siteName": this.siteData.siteName,
            "updateWellData": {
                "welldevelopment": finalWellData
            }
        }])

        // this.dataServiceProvider.updateWellDataDetails([{
        //     "projectName": this.projectName, "siteName": this.siteData.siteName,
        //     "updateWellData": {
        //         "siteName": this.siteData.siteName,
        //         "siteCord": this.siteData.siteCord,
        //         "groundwaterLevelMeasurement": this.siteData.groundwaterLevelMeasurement,
        //         "groundwaterSampling": this.siteData.groundwaterSampling,
        //         "hydrocarbonSampling": this.siteData.hydrocarbonSampling,
        //         "soilSamples": this.siteData.soilSamples,
        //         "waterpump": this.siteData.waterpump,
        //         "status": this.siteData.status,
        //         "welldevelopment": {
        //             "wellDiameter": this.diameter,
        //             "boreHoleDiameter": this.boreHole,
        //             "sandHeight": this.sandheight,
        //             "filterPack": this.filter,
        //             "depthToWater": this.deptWater,
        //             "depthToProduct": this.deptToProduct,
        //             "minimum": this.minVolume,
        //             "maximum": this.maxVolume,
        //             "totalDepth": this.totalDept,
        //             "purgeMethod": this.purgeMethodList,
        //             "volumeRemoved": this.volumeRemoved,
        //             "cumuVolumeRemoved": this.cumuVolumeRemoved,
        //             "acidity": this.acidity,
        //             "temperature": this.temperature,
        //             "turbidity": this.turbidity,
        //             "dissolvedOxygen": this.dissolvedOxygen,
        //             "oxygenReduction": this.oxygenReduction,
        //             "specificConductivity": this.specificConductivity,
        //             "notes": this.notes
        //         }
        //     }
        // }])



        // let sample = new WellDevelopment(this.diameter, this.boreHole, this.sandheight, this.filter,
        //     this.deptWater, this.deptToProduct, this.minVolume, this.maxVolume, this.totalDept, this.purgeMethodList,
        //     this.volumeRemoved, this.cumuVolumeRemoved, this.acidity, this.temperature, this.turbidity, this.dissolvedOxygen,
        //     this.oxygenReduction, this.specificConductivity, this.notes)

        this.sampling_data.push({ "sample_number": this.sampleValue, "sample_data": finalWellData });
  //     this.wellDataForm2.reset();
        
        this.purgeMethodList = "";
            this.volumeRemoved = "";
            this.cumuVolumeRemoved = "";
            this.acidity = "";
            this.temperature = "";
            this.turbidity = "";
            this.dissolvedOxygen = "";
            this.oxygenReduction = "";
            this.specificConductivity = "";
 //          this.notes = "";
        
        

        this.increaseSampleLevel();
        this.acidityStable = false;
        this.tempStable = false;
        this.turbStable = false;
        this.disStable = false;
        this.oxyStable = false;
        this.conductivityStable = false;
    }

                                                                                                                                          
                                                                                                                                                                                                                                                                                                 
    triggerPDF() {
        this.dataServiceProvider.exportPDF(this.projectName, this.siteData.siteName, "welldevelopment", ["wellDiameter", "boreHoleDiameter", "sandHeight", "filterPack", "depthToWater", "depthToProduct", "totalDepth", "minimum", "maximum", "purgeMethod", "volumeRemoved", "cumuVolumeRemoved", "acidity", "temperature", "turbidity", "dissolvedoxygen", "oxygenreductionpotential", "specificconductivity", "notes", "timestamp"],"well_development_detail");
    }

    triggerCSV() {
        this.dataServiceProvider.exportCSV(this.projectName, this.siteData.siteName, "welldevelopment", ["wellDiameter", "boreHoleDiameter", "sandHeight", "filterPack", "depthToWater", "depthToProduct", "totalDepth", "minimum", "maximum", "purgeMethod", "volumeRemoved", "cumuVolumeRemoved", "acidity", "temperature", "turbidity", "dissolvedoxygen", "oxygenreductionpotential", "specificconductivity", "notes", "timestamp"],"well_development_detail");
    }

    //Green Ticks Validations

    showTempTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.temperature != '') {
            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
            let diff_1_temp = this.temperature - prev_sample1.sample_data.temperature;
            let diff_2_temp = this.temperature - prev_sample2.sample_data.temperature;

            if ((diff_1_temp <= 1 && diff_1_temp >= -1) && (diff_2_temp <= 1 && diff_2_temp >= -1)) {
                this.tempStable = true;
            } else {
                this.tempStable = false;
            }
        } else {
            this.tempStable = false;
        }
    }
    showTurbTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.turbidity != '') {
            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
            let diff_1_turb = this.turbidity - prev_sample1.sample_data.turbidity;
            let diff_2_turb = this.turbidity - prev_sample2.sample_data.turbidity;

            if ((diff_1_turb <= this.turbidity * 0.1 && diff_1_turb >= -this.turbidity * 0.1)
                && (diff_2_turb <= this.turbidity * 0.1 && diff_2_turb >= -this.turbidity * 0.1)) {
                this.turbStable = true;
            } else {
                this.turbStable = false;
            }
        } else {
            this.turbStable = false;
        }
    }
    showDisTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.dissolvedOxygen != '') {
            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
            let diff_1_dis = this.dissolvedOxygen - prev_sample1.sample_data.dissolvedoxygen;
            let diff_2_dis = this.dissolvedOxygen - prev_sample2.sample_data.dissolvedoxygen;

            if ((diff_1_dis <= this.dissolvedOxygen * 0.1 && diff_1_dis >= -this.dissolvedOxygen * 0.1)
                && (diff_2_dis <= this.dissolvedOxygen * 0.1 && diff_2_dis >= -this.dissolvedOxygen * 0.1)) {
                this.disStable = true;
            } else {
                this.disStable = false;
            }
        } else {
            this.disStable = false;
        }
    }
    showOxyTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.oxygenReduction != '') {
            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
            let diff_1_oxy = this.oxygenReduction - prev_sample1.sample_data.oxygenreductionpotential;
            let diff_2_oxy = this.oxygenReduction - prev_sample2.sample_data.oxygenreductionpotential;

            if ((diff_1_oxy <= 10 && diff_1_oxy >= -10) && (diff_2_oxy <= 10 && diff_2_oxy >= -10)) {
                this.oxyStable = true;
            } else {
                this.oxyStable = false;
            }

        } else {
            this.oxyStable = false;
        }
    }
    showConTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.specificConductivity != '') {
            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });
            let diff_1_conductivity = this.specificConductivity - prev_sample1.sample_data.specificconductivity;
            let diff_2_conductivity = this.specificConductivity - prev_sample2.sample_data.specificconductivity;

            if ((diff_1_conductivity <= this.specificConductivity * 0.3 && diff_1_conductivity >= -this.specificConductivity * 0.3)
                && (diff_2_conductivity <= this.specificConductivity * 0.3 && diff_2_conductivity >= -this.specificConductivity * 0.3)) {
                this.conductivityStable = true;
            } else {
                this.conductivityStable = false;
            }
        } else {
            this.conductivityStable = false;
        }
    }
    showAcidityTicks() {
        if (this.sampling_data.length >= 2 && this.viewSample >= 3 && this.acidity != '') {

            let prev_sample1 = _.find(this.sampling_data, { sample_number: this.viewSample - 1 });
            let prev_sample2 = _.find(this.sampling_data, { sample_number: this.viewSample - 2 });

            //acidity
            let diff_1_acid = this.acidity - prev_sample1.sample_data.acidity;
            let diff_2_acid = this.acidity - prev_sample2.sample_data.acidity;

            if ((diff_1_acid <= 0.1 && diff_1_acid >= -0.1) && (diff_2_acid <= 0.1 && diff_2_acid >= -0.1)) {
                this.acidityStable = true;
            } else {
                this.acidityStable = false;
            }
        } else {
            this.acidityStable = false;
        }
    }
    //Green Tick Validation ends Here

    increaseSampleLevel() {
        if (this.sampling_intervals !== undefined) {
            let index = _.findIndex(this.sampling_intervals, { sample_number: this.sampleValue });
            let sample_length = this.sampling_intervals.length;
            sample_length--;
            if (index < sample_length) {
                this.sampling_intervals[index].visible = false;
                this.sampling_intervals[index].viewing = false;
                index++;
                this.sampling_intervals[index].visible = true;
                this.sampling_intervals[index].viewing = true;
                this.sampleValue++;
                this.viewSample++;
            }
        }
    }

    addSample() {
        let length = this.sampling_intervals.length;
        length++;
        let newsample = { sample_number: length, visible: false, viewing: false };

        this.sampling_intervals.push(newsample);
    }

    showSample(sampleNumber) {
        if (!(this.wellDataForm2.dirty)) {
            this.moveToSample(sampleNumber);
        }
        else {
            let confirm = this.alertCtrl.create({
                title: 'Are you sure?',
                message: 'You have unsaved data! Do you want to leave?',
                buttons: [{
                    text: 'Yes',
                    handler: () => {
                        this.moveToSample(sampleNumber);
                    },
                }, {
                    text: 'No',
                    handler: () => {
                        console.log("stay");
                    }
                }],
            });
            confirm.present();
        }
    }

    moveToSample(sampleNumber) {
        if (sampleNumber <= this.sampling_data.length) {
            //this.wellDataForm2.reset();
            let sample = _.find(this.sampling_data, { sample_number: sampleNumber });

            let viewCurrent = _.findIndex(this.sampling_intervals, { viewing: true });
            this.sampling_intervals[viewCurrent].viewing = false;

            let viewIndex = _.findIndex(this.sampling_intervals, { sample_number: sampleNumber });
            this.sampling_intervals[viewIndex].viewing = true;
            this.viewSample = sampleNumber;

            console.log(sample)
            this.wellDataForm2.reset({
                "purgeMethod": [sample.sample_data.purgeMethodList],
                "volumeRemoved": [sample.sample_data.volumeRemoved],
                "cummulativeVolume": [sample.sample_data.cumuVolumeRemoved],
                "acidity": [sample.sample_data.acidity],
                "temperature": [sample.sample_data.temperature],
                "turbidity": [sample.sample_data.turbidity],
                "dissolvedOxygen": [sample.sample_data.dissolvedOxygen],
                "oxygenReduction": [sample.sample_data.oxygenReduction],
                "specificConductivity": [sample.sample_data.specificConductivity],
                "msCm": [sample.sample_data.msCm],
                "notes": [sample.sample_data.notes]

            })


            this.purgeMethodList = sample.sample_data.purgeMethod;
            this.volumeRemoved = sample.sample_data.volumeRemoved;
            this.cumuVolumeRemoved = sample.sample_data.cumuVolumeRemoved;
            this.acidity = sample.sample_data.acidity;
            this.temperature = sample.sample_data.temperature;
            this.turbidity = sample.sample_data.turbidity;
            this.dissolvedOxygen = sample.sample_data.dissolvedoxygen;
            this.oxygenReduction = sample.sample_data.oxygenreductionpotential;
            this.specificConductivity = sample.sample_data.specificconductivity;
            // this.msCm = sample.sample_data.purgeMethod;
            this.notes = sample.sample_data.notes;

            this.isDisabled = true;
        } else if (sampleNumber == (this.sampling_data.length + 1)) {

            let viewCurrent = _.findIndex(this.sampling_intervals, { viewing: true });
            this.sampling_intervals[viewCurrent].viewing = false;

            let viewIndex = _.findIndex(this.sampling_intervals, { sample_number: sampleNumber });
            this.sampling_intervals[viewIndex].viewing = true;
            this.viewSample = sampleNumber;

            this.purgeMethodList = "";
            this.volumeRemoved = "";
            this.cumuVolumeRemoved = "";
            this.acidity = "";
            this.temperature = "";
            this.turbidity = "";
            this.dissolvedOxygen = "";
            this.oxygenReduction = "";
            this.specificConductivity = "";
            this.notes = "";
            this.isDisabled = false;
        } else {
            let alert = this.alertCtrl.create({
                title: 'No Data',
                subTitle: 'These samples are not filled yet',
                buttons: ['Dismiss']
            });
            alert.present();
        }
        this.pattern = true;
        this.pattern1 = true;
        this.pattern2 = true;
        this.pattern3 = true;
        this.pattern4 = true;
        this.pattern5 = true;
        this.pattern6 = true;
        this.pattern7 = true;
        this.showTempTicks();
        this.showTurbTicks();
        this.showAcidityTicks();
        this.showConTicks();
        this.showDisTicks();
        this.showOxyTicks();
    }
   
   
   //Reset Error Messages
   resetValidation(){
        this.pattern = true;
        this.pattern1 = true;
        this.pattern2 = true;
        this.pattern3 = true;
        this.pattern4 = true;
        this.pattern5 = true;
        this.pattern6 = true;
        this.pattern7 = true;
     
   }
    ionViewCanLeave(): Promise<{}> {
        return new Promise((resolve, reject) => {
            if (!(this.wellDataForm2.dirty)) {
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
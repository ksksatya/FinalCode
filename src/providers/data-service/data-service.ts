import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { CurrentProjectModal } from '../../pages/common/project/current-project.modal';
import { NativeStorage } from '@ionic-native/native-storage';
import _ from 'lodash';
import { AlertController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { EmailComposer } from '@ionic-native/email-composer';

declare var cordova:any;


@Injectable()
export class DataServiceProvider {
    public data: CurrentProjectModal[] = [];
    authenticated: any;
    authenticatedObserver: any;

constructor(private http: Http, private nativeStorage: NativeStorage, private file: File, private diagnostic:Diagnostic, private alert: AlertController, private emailComposer: EmailComposer) { 
    this.authenticated = Observable.create(observer => {
      this.authenticatedObserver = observer;
    });
}

    getProjectData() {
        return this.data;
    }

    getProjectDetails(projectName: string) {
        for (var i in this.data) {
            if (this.data[i].projectName === projectName) {
                return this.data[i];
            }
        }
    }

    projects() {
        this.data = [];

        this.diagnostic.requestExternalStorageAuthorization()
        .then(
            result => {
                if(result)
                {
                    this.diagnostic.getExternalSdCardDetails()
                    .then(
                        result => {
                            if(result.length > 0){
                                let alertToShow = this.alert.create({
                                    title: 'Load Project Setup?',
                                    subTitle: 'Would you like to load the project details from SD Card?',
                                    buttons: [{
                                        text: 'No',
                                        role: 'cancel',
                                        handler: () => {
                                            this.loadDataForApp();
                                        }
                                    },
                                    {
                                        text: 'Yes',
                                        handler: () => {
                                            this.readFromExternalStorage("file://" + result[result.length - 1].path + "/", "ERM_Backup.txt");
                                        }
                                    }]
                                });
                                alertToShow.present();
                            }
                            else{
                                this.loadDataForApp();
                            }
                        },
                        error => { 
                            console.log(error);
                            this.loadDataForApp();
                        }
                    );
                }
            },
            error => {
                this.loadDataForApp();
            }
        );
    }

    getSeparateProjects(projectTitle) {
        let projectList: Array<CurrentProjectModal> = [];
        for (var i in this.data) {
            if (this.data[i].projectType === projectTitle) {
                projectList.push(this.data[i])
            }
        }
        return projectList;
    }



/////////         SAVE FUNCTIONS




    /// FLUID-LEVEL
    updateProjectDetails(data: any) {
        
        let projectUpdated = _.findIndex(this.data, { "projectName": data[0].projectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": data[0].siteName });
        //this.data[projectUpdated].sitesData[siteUpdated].waterpumpdetail = data[0].updateWaterPumpDetail.waterpumpdetail;
        this.data[projectUpdated].sitesData[siteUpdated].waterpumpdetail.push( data[0].updateWaterPumpDetail.waterpumpdetail);
        console.log(this.data[projectUpdated]);
        this.saveToNativeStorage();
    }

      conversionForCsv(projects: any) {
        var pumpDetail = []
        for (var i = 0; i < projects.sitesData.length; i++) {
            if (JSON.stringify(projects.sitesData[i].waterpumpdetail) !== '{}') {

                pumpDetail.push(projects.sitesData[i].waterpumpdetail);
                pumpDetail[pumpDetail.length - 1]["siteName"] = projects.sitesData[i].siteName;
                pumpDetail[pumpDetail.length - 1]["projectName"] = projects.projectName;
            }
        }
        this.download(pumpDetail, "UpdatedData");

    }

     download(data: any, filename: string) {
        var csvData = this.ConvertToCSV(data);
        var a: any = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], {
            type: 'text/csv'
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;

        var isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
        if (isIE) {
            var retVal = navigator.msSaveBlob(blob, filename + '.csv');
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this. 
        a.click();
    }

    ConvertToCSV(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if (typeof (array[i][index]) != 'object') {
                    line += '"' + array[i][index] + '"';
                } else {
                    line += '"' + JSON.stringify(array[i][index]).replace(",", " ; ") + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
    }





    ///    WELL DATA
    updateWellDataDetails(data: any) {

        let projectUpdated = _.findIndex(this.data, { "projectName": data[0].projectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": data[0].siteName });
        //this.data[projectUpdated].sitesData[siteUpdated].welldevelopment = data[0].updateWellData.welldevelopment;
        this.data[projectUpdated].sitesData[siteUpdated].welldevelopment.push( data[0].updateWellData.welldevelopment);
        console.log(this.data[projectUpdated]);

        this.saveToNativeStorage();
        this.convertWellDataForCsv(this.data[projectUpdated]);
    }

    convertWellDataForCsv(projects: any) {
        var wellDetail = []
        for (var i = 0; i < projects.sitesData.length; i++) {
            if (JSON.stringify(projects.sitesData[i].welldevelopment) !== '{}') {
                wellDetail.push(projects.sitesData[i].welldevelopment);
                wellDetail[wellDetail.length - 1]["siteName"] = projects.sitesData[i].siteName;
                wellDetail[wellDetail.length - 1]["projectName"] = projects.projectName;
            }
        }
        console.log(wellDetail);
        this.downloadWellData(wellDetail, "UpdatedWellData");
    }

    downloadWellData(data: any, filename: string) {
        var csvData = this.ConvertWellToCSV(data);
        var a: any = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], {
            type: 'text/csv'
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;

        var isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
        if (isIE) {
            var retVal = navigator.msSaveBlob(blob, filename + '.csv');
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this. 
        a.click();
    }

    //JSON.stringify(temp1[0].address)
    // convert Json to Well Reff CSV data
    ConvertWellToCSV(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if (typeof (array[i][index]) != 'object') {
                    line += '"' + array[i][index] + '"';
                } else {
                    line += '"' + JSON.stringify(array[i][index]).replace(",", " ; ") + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
    }




    /// ground water sampling
    updateGroundDetail(data: any) {

        let projectUpdated = _.findIndex(this.data, { "projectName": data[0].projectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": data[0].siteName });
        //this.data[projectUpdated].sitesData[siteUpdated].groundwaterdetail = data[0].updateGroundDetails.groundwaterdetail;
        this.data[projectUpdated].sitesData[siteUpdated].groundwaterdetail.push( data[0].updateGroundDetails.groundwaterdetail);
        console.log(this.data[projectUpdated]);

        this.saveToNativeStorage();
        this.convertGroundWaterForCsv(this.data[projectUpdated])

    }

    convertGroundWaterForCsv(projects: any) {
        var groundWaterDetail = []
        for (var i = 0; i < projects.sitesData.length; i++) {
            if (JSON.stringify(projects.sitesData[i].groundwaterdetail) !== '{}') {

                groundWaterDetail.push(projects.sitesData[i].groundwaterdetail);
                groundWaterDetail[groundWaterDetail.length - 1]["siteName"] = projects.sitesData[i].siteName;
                groundWaterDetail[groundWaterDetail.length - 1]["projectName"] = projects.projectName;
            }
        }
        console.log(groundWaterDetail);
        this.downloadGroundWaterData(groundWaterDetail, "UpdatedGroundWaterData");

    }

    downloadGroundWaterData(data: any, filename: string) {
        var csvData = this.ConvertGroundWaterToCSV(data);
        var a: any = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], {
            type: 'text/csv'
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;

        var isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
        if (isIE) {
            var retVal = navigator.msSaveBlob(blob, filename + '.csv');
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this. 
        a.click();
    }

    //JSON.stringify(temp1[0].address)
    // convert Json to Well Reff CSV data
    ConvertGroundWaterToCSV(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if (typeof (array[i][index]) != 'object') {
                    line += '"' + array[i][index] + '"';
                } else {
                    line += '"' + JSON.stringify(array[i][index]).replace(",", " ; ") + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
    }
    





    /// Soil page
    updateSoilDetails(data: any) {
       
        let projectUpdated = _.findIndex(this.data, { "projectName": data[0].projectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": data[0].siteName });
        //this.data[projectUpdated].sitesData[siteUpdated].soilboring = data[0].updateSoilBoring.soilboring;
        this.data[projectUpdated].sitesData[siteUpdated].soilboring.push( data[0].updateSoilBoring.soilboring);
        console.log(this.data[projectUpdated]);

        this.saveToNativeStorage();
        this.convertsoilboringForCsv(this.data[projectUpdated]);
    }
    convertsoilboringForCsv(projects: any) {
        var soilBoringDetail = []
        for (var i = 0; i < projects.sitesData.length; i++) {
            if (JSON.stringify(projects.sitesData[i].soilboring) !== '{}') {

                soilBoringDetail.push(projects.sitesData[i].soilboring);
                soilBoringDetail[soilBoringDetail.length - 1]["siteName"] = projects.sitesData[i].siteName;
                soilBoringDetail[soilBoringDetail.length - 1]["projectName"] = projects.projectName;
            }
        }
        console.log(soilBoringDetail);
        this.downloadSoilData(soilBoringDetail, "UpdatedGroundWaterData");

    }

      downloadSoilData(data: any, filename: string) {
        var csvData = this.convertSoilBoringToCsv(data);
        var a: any = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], {
            type: 'text/csv'
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;

        var isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
        if (isIE) {
            var retVal = navigator.msSaveBlob(blob, filename + '.csv');
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this. 
        a.click();
    }

    convertSoilBoringToCsv(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if (typeof (array[i][index]) != 'object') {
                    line += '"' + array[i][index] + '"';
                } else {
                    line += '"' + JSON.stringify(array[i][index]).replace(",", " ; ") + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
    }
 


    
    
    //update well construction page
    updateWellConstructionDetails(data: any) {

        let projectUpdated = _.findIndex(this.data, { "projectName": data[0].projectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": data[0].siteName });
        //this.data[projectUpdated].sitesData[siteUpdated].wellconstruction = data[0].updateWellConstruction.wellconstruction;
        this.data[projectUpdated].sitesData[siteUpdated].wellconstruction.push( data[0].updateWellConstruction.wellconstruction);
        console.log(this.data[projectUpdated]);

        this.saveToNativeStorage();
        this.convertwellconstructionForCsv(this.data[projectUpdated]);
    }

    convertwellconstructionForCsv(projects: any) {
        var wellConstructionDetail = []
        for (var i = 0; i < projects.sitesData.length; i++) {
            if (JSON.stringify(projects.sitesData[i].wellconstruction) !== '{}') {

                wellConstructionDetail.push(projects.sitesData[i].wellconstruction);
                wellConstructionDetail[wellConstructionDetail.length - 1]["siteName"] = projects.sitesData[i].siteName;
                wellConstructionDetail[wellConstructionDetail.length - 1]["projectName"] = projects.projectName;
            }
        }
        console.log(wellConstructionDetail);
        this.downloadWellConstrucData(wellConstructionDetail, "UpdatedGroundWaterData");

    }

     
    
      //download csv for well-construction
    downloadWellConstrucData(data: any, filename: string) {
        var csvData = this.convertWellConstructionToCsv(data);
        var a: any = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], {
            type: 'text/csv'
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;

        var isIE = /*@cc_on!@*/ false || !!(<any>document).documentMode;
        if (isIE) {
            var retVal = navigator.msSaveBlob(blob, filename + '.csv');
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this. 
        a.click();
    }
       
    convertWellConstructionToCsv(objArray: any) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        for (var index in objArray[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if (typeof (array[i][index]) != 'object') {
                    line += '"' + array[i][index] + '"';
                } else {
                    line += '"' + JSON.stringify(array[i][index]).replace(",", " ; ") + '"';
                }
            }
            str += line + '\r\n';
        }
        return str;
    }



/////////// SAVE ENDS HERE



    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    loadDataForApp(){
        this.nativeStorage.getItem('projects')
        .then(
        data => {
            this.data = JSON.parse(data);
            this.saveToExternalStorageAsBackup(JSON.stringify(this.data));
        },
        error => {
            return new Promise(resolve => {
                // We're using Angular HTTP provider to request the data,
                // then on the response, it'll map the JSON data to a parsed JS object.
                // Next, we process the data and resolve the promise with the new data.
                this.http.get('data/data.json')
                    .map(res => res.json())
                    .subscribe(data => {
                        // we've got back the raw data, now generate the core schedule data
                        // and save the data for later reference
                        for (var i = 0; i < data.length; i++) {
                            this.data.push(data[i])
                        }
                        this.saveToNativeStorage("login");
                    });
            });
        }
        );
    }
    
    readFromExternalStorage(filePath:string, fileName:string){
        this.file.readAsText(filePath,fileName)
            .then(result => 
            {
                this.data = JSON.parse(result);
                this.nativeStorage.setItem("projects", JSON.stringify(this.data))
                .then(
                _ => { 
                    this.authenticatedObserver.next(true);
                },
                error => {
                    console.log('Error storing item', error);
                });
            },
            error =>
            {
                this.loadDataForApp();
            });
    }

    saveToExternalStorage(data: string){
        let externalStoragePath: string;
        //this.file.externalRootDirectory + /";
        this.diagnostic.getExternalSdCardDetails().then( 
        result => {
            if(result.length > 0){
                externalStoragePath = "file://" + result[result.length - 1].path + "/";    
                this.file.writeFile(externalStoragePath, "ERM_Backup.txt", data, {replace: true})
                .then( result => 
                {
                    console.log(result);
                },
                error =>
                {
                    console.log(error);
                });              
            }
        },
        error => {
            console.log(error);
        });
    }

    saveToNativeStorage(login?:string){
         this.nativeStorage.setItem("projects", JSON.stringify(this.data))
            .then(
            () => { 
                if(login == "login"){
                    this.saveToExternalStorageAsBackup(JSON.stringify(this.data));
                }
                else{
                    this.saveToExternalStorage(JSON.stringify(this.data)); 
                }
            },
            error => {
                 if(login == "login"){
                    this.saveToExternalStorageAsBackup(JSON.stringify(this.data));
                }
                else{
                    this.saveToExternalStorage(JSON.stringify(this.data)); 
                }
                console.log('Error storing item', error);
            });
    }

    saveToExternalStorageAsBackup(data: string){
        let externalStoragePath: string;
        //this.file.externalRootDirectory + "/";
        this.diagnostic.getExternalSdCardDetails().then( 
        result => {
            if(result.length > 0){
                externalStoragePath = "file://" + result[result.length - 1].path + "/";    
                this.file.writeFile(externalStoragePath, "ERM_Backup.txt", data, {replace: true})
                .then( result => 
                {
                    console.log(result);
                },
                error =>
                {
                    console.log(error);
                });              
            }
            this.authenticatedObserver.next(true);
        },
        error => {
            console.log(error);
            this.authenticatedObserver.next(true);
        });
    }

    generateExportData(pProjectName: string, pSiteName: string, pActivityName: string, pOrder: any){
        let columnOrder = pOrder;

        let projectUpdated = _.findIndex(this.data, { "projectName": pProjectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": pSiteName });
        //this.data[projectUpdated].sitesData[siteUpdated].waterpumpdetail = data[0].updateWaterPumpDetail.waterpumpdetail;
        let activityToExport = (this.data[projectUpdated].sitesData[siteUpdated])[pActivityName];

        let dataToExport = "";
        let headerToExport = "projectName,siteName,";
         for(var iColumnOrder = 0; iColumnOrder < columnOrder.length; iColumnOrder++){
             if(iColumnOrder === columnOrder.length - 1){
                 headerToExport += columnOrder[iColumnOrder]
             }
             else{
                headerToExport += columnOrder[iColumnOrder] + ",";
             }
        }
        dataToExport += headerToExport + "\r\n";

        for(var iActivity = 0; iActivity < activityToExport.length; iActivity++){
            let eachRowToExport = (pProjectName + ",");
            eachRowToExport += (pSiteName + ",");

            for(var iColumnOrder = 0; iColumnOrder < columnOrder.length; iColumnOrder++){
                 if(iColumnOrder === columnOrder.length - 1){
                    eachRowToExport += activityToExport[iActivity][columnOrder[iColumnOrder]];
                 }
                 else
                 {
                     eachRowToExport += (activityToExport[iActivity][columnOrder[iColumnOrder]] + ",");
                 }
            }
            dataToExport += eachRowToExport + "\r\n";
        }

        return dataToExport;
    }

    exportCSV(pProjectName: string, pSiteName: string, pActivityName: string, pOrder: any                       ,pFileName: string){
        var finalExportData = this.generateExportData(pProjectName, pSiteName, pActivityName, pOrder);
        var fileNameForExport = pProjectName + "_" + pSiteName + "_" + pFileName + ".csv";
        this.file.writeFile(this.file.externalApplicationStorageDirectory, fileNameForExport, finalExportData, { replace : true })
        .then(result => {
            this.emailExportedData(fileNameForExport);
        },
        error =>{
            //show alert
        })
    }

    exportPDF(pProjectName: string, pSiteName: string, pActivityName: string, pOrder: any
                ,pFileName: string){
        var finalExportData = this.generateExportData(pProjectName, pSiteName, pActivityName, pOrder);
        var fileNameForExport = pProjectName + "_" + pSiteName + "_" + pFileName + ".pdf";
        var pdfDataToExport = finalExportData.split('\r\n');
        var htmlForPdf = "";
        for(var iPdfData = 0; iPdfData < pdfDataToExport.length; iPdfData++){
            htmlForPdf += "<label>" + pdfDataToExport[iPdfData] + "</label><br>";
        }
        this.generatePDF(htmlForPdf, fileNameForExport);
    }

    emailExportedData(fileName: string){
        let email = {
            to: '',
            cc: '',
            bcc: '',
            attachments: [
                this.file.externalApplicationStorageDirectory + fileName
            ],
            subject: 'Activity Report',
            body: '',
            isHtml: true
        };

        this.emailComposer.open(email);
    }

    generatePDF(htmlToConvert: string, fileName: string){
        cordova.plugins.pdf.htmlToPDF({
            data: htmlToConvert,
            documentSize: "A4",
            landscape: "portrait",
            type: "base64"
        },
        (success) => {
            let blobForPdf = this.b64toBlob(success, "application/pdf", undefined);
            this.file.writeFile(this.file.externalApplicationStorageDirectory, fileName, blobForPdf, { replace : true })
            .then(result => {
                this.emailExportedData(fileName);
            },
            error =>{
                //show alert
                console.log(error);
            })
        },
        (error) => {
            //alert
            console.log(error);
        });
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    getMetaDataValue(pProjectName: string, pSiteName: string, pValue: string){
        let projectUpdated = _.findIndex(this.data, { "projectName": pProjectName });
        let siteUpdated = _.findIndex(this.data[projectUpdated].sitesData, { "siteName": pSiteName });
        //this.data[projectUpdated].sitesData[siteUpdated].wellconstruction = data[0].updateWellConstruction.wellconstruction;
        return this.data[projectUpdated].sitesData[pValue];
    }
}


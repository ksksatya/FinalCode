export class SoilBoringModel {

    public boringWellId: string;
    public latitude: string;
    public longitude: string;
    public owner: string;
    public boreDiameter: string;
    public surfaceElevation: string;
    public totalDepth: string;
    public drillingCompany: string;
    public drillingMethod: string;
    public driller: string;
    public fromDepth: string;
    public toDepth: string;
    public percentRecovered: string;
    public sampleType: string;
    public lithology: string;
    public color: string;
    public moistureContent: string;
    public plasticity: string;
    public grading: string;
    public sorting: string;
    public density: string;
    public notes: string;
    public timestamp : Date;

    constructor(boringWellId: string, latitude: string, longitude: string, owner: string, boreDiameter: string,
        surfaceElevation: string, totalDepth: string, drillingCompany: string, drillingMethod: string, driller: string,
        fromDepth? : string, toDepth? : string, percentRecovered? : string, sampleType? : string, lithology? : string, color? : string,
        moistureContent? : string, plasticity? : string, grading? : string, sorting? : string, density? : string, notes? : string,
        timestamp? : Date) {

        this.boringWellId = boringWellId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.owner = owner;
        this.boreDiameter = boreDiameter;
        this.surfaceElevation = surfaceElevation;
        this.totalDepth = totalDepth;
        this.drillingCompany = drillingCompany;
        this.drillingMethod = drillingMethod;
        this.driller = driller;
        this.fromDepth = fromDepth;
        this.toDepth = toDepth;
        this.percentRecovered = percentRecovered;
        this.sampleType = sampleType;
        this.lithology = lithology;
        this.color = color;
        this.moistureContent = moistureContent;
        this.plasticity = plasticity;
        this.grading = grading;
        this.sorting = sorting;
        this.density = density;
        this.notes = notes;
        this.timestamp = timestamp;
    }
}
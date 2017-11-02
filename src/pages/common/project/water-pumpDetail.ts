export class WaterPumpDetails {
    public padCondition: string;
    public boltsCondition: string;
    public surroundingVegetation: string;
    public pvcCasing: string;
    public protectiveCasing: string;
    public labelAndLock: string;
    public dedicatedMeassuringPoint: string;
    public wellHeadCompletion: string;
    public wellSecure: string;
    public depthToProduct: string;
    public depthToWater: string;
    public totalDepth: string;
    public notes: string;
    public timestamp : Date;

    constructor(padCondition: string, boltsCondition: string, surroundingVegetation: string, pvcCasing: string,
        protectiveCasing: string, dedicatedMeassuringPoint: string, wellHeadCompletion: string, wellSecure: string,
        depthToProduct: string, depthToWater: string, totalDepth: string,labelAndLock: string,  notes: string,
        timestamp : Date) {

        this.padCondition = padCondition;
        this.boltsCondition = boltsCondition;
        this.surroundingVegetation = surroundingVegetation;
        this.pvcCasing = pvcCasing;
        this.protectiveCasing = protectiveCasing;
        this.dedicatedMeassuringPoint = dedicatedMeassuringPoint;
        this.wellHeadCompletion = wellHeadCompletion;
        this.wellSecure = wellSecure;
        this.depthToProduct = depthToProduct;        
        this.depthToWater = depthToWater;
        this.totalDepth = totalDepth;
        this.labelAndLock = labelAndLock;
        this.notes = notes;
        this.timestamp = timestamp;
    }

}
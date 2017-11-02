export class WellConstructionModel {
    public casingStick: string;
    public topCasing: string;
    public boreHoleDiameter: string;
    public topGrout: string;
    public casingDiameter: string;
    public topSeal: string;
    public casingType: string;
    public topFilterPack: string;
    public screenDiameter: string;
    public topScreen: string;
    public screenType: string;
    public topSump: string;
    public screenSlot: string;
    public sumpBottom: string;
    public filterPackType: string;
    public timestamp : Date;

    constructor(casingStick: string,topCasing: string, boreHoleDiameter: string, topGrout: string, casingDiameter: string, topSeal: string,casingType: string, topFilterPack: string, screenDiameter: string, topScreen: string, screenType: string,topSump : string, screenSlot : string, sumpBottom : string, filterPackType : string , timestamp : Date) {
        this.casingStick= casingStick;
        this.topCasing = topCasing;
        this.boreHoleDiameter = boreHoleDiameter;
        this.topGrout = topGrout;
        this.casingDiameter = casingDiameter;
        this.topSeal = topSeal;
        this.casingType = casingType;
        this.topFilterPack = topFilterPack;
        this.screenDiameter = screenDiameter;
        this.topScreen = topScreen;
        this.screenType = screenType;
        this.topSump = topSump;
        this.screenSlot = screenSlot;
        this.sumpBottom = sumpBottom;
        this.filterPackType = filterPackType;
        this.timestamp = timestamp;
    }
}

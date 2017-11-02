export class WellDevelopment{

    public wellDiameter:number;
    public boreHoleDiameter:number;
    public sandHeight:number;
    public filterPack:number;
    public depthToWater:number;
    public depthToProduct:number;
    public totalDepth:number;
    public minimum: number;
    public maximum: number;
    public purgeMethod:string;
    public volumeRemoved:number;
    public cumuVolumeRemoved:number;
    public acidity : number;
    public temperature : number;
	public turbidity : number;
	public dissolvedoxygen : number;
	public oxygenreductionpotential : number;
	public specificconductivity : number; 
    public notes:string;   
	public timestamp : Date;
    

    constructor( wellDiameter : number, boreHoleDiameter : number,
	 			 sandHeight : number, filterPack : number, depthToWater : number,
     			 depthToProduct : number, totalDepth : number, minimum : number,
	             maximum : number, purgeMethod? : string, volumeRemoved? : number,
	 			 cumuVolumeRemoved? : number, acidity? : number, temperature? : number,
	             turbidity? : number, dissolvedoxygen? : number, oxygenreductionpotential? : number,
	 			 specificconductivity? : number, notes? : string , timestamp? : Date){
		this.wellDiameter = wellDiameter;
		this.boreHoleDiameter = boreHoleDiameter;
		this.sandHeight = sandHeight;
		this.filterPack = filterPack;
		this.depthToWater = depthToWater;
		this.depthToProduct = depthToProduct;
		this.totalDepth = totalDepth;
		this.minimum = minimum;
		this.maximum = maximum;
		this.purgeMethod = purgeMethod;
		this.volumeRemoved = volumeRemoved;
		this.cumuVolumeRemoved = cumuVolumeRemoved;
        this.acidity = acidity;
		this.temperature = temperature;
		this.turbidity = turbidity;
		this.dissolvedoxygen = dissolvedoxygen;
		this.oxygenreductionpotential = oxygenreductionpotential;
		this.specificconductivity = specificconductivity;
		this.notes = notes;
		this.timestamp = timestamp;
	}
}
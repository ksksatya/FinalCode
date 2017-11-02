export class GroundWaterDetail {
    
    public suggestedpumpspeed : number;
	public suggestedintakedepth : number;
	public welldia : number;
    public initaildepthtowater : number;
	public pumpspeed : number;
	public intakedepth : number;
    public drawdown : number;
    public acidity : number;
    public temperature : number;
	public turbidity : number;
	public dissolvedoxygen : number;
	public oxygenreductionpotential : number;
	public specificconductivity : number;
	public units : string;
	public timestamp : Date;

	constructor( suggestedpumpspeed : number, suggestedintakedepth : number,
	 			 welldia : number, initaildepthtowater : number,pumpspeed : number, intakedepth : number,
     			 drawdown : number, acidity : number, temperature : number,
	             turbidity : number, dissolvedoxygen : number, oxygenreductionpotential : number,
	 			 specificconductivity : number, units : string , timestamp : Date){
		this.suggestedpumpspeed = suggestedpumpspeed;
		this.suggestedintakedepth = suggestedintakedepth;
		this.welldia = welldia;
        this.initaildepthtowater = initaildepthtowater;
		this.pumpspeed = pumpspeed;
		this.intakedepth = intakedepth;
		this.drawdown = drawdown;
		this.acidity = acidity;
		this.temperature = temperature;
		this.turbidity = turbidity;
		this.dissolvedoxygen = dissolvedoxygen;
		this.oxygenreductionpotential = oxygenreductionpotential;
		this.specificconductivity = specificconductivity;
		this.units = units;
		this.timestamp = timestamp;
	}
}
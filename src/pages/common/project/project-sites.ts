import { WaterPumpDetails } from './water-pumpDetail';
import { WellDevelopment } from './well-development';
import { GroundWaterDetail } from './groundWaterDetail';
import { SoilBoringModel } from './soilBoring.model';
import { WellConstructionModel } from './wellConstruction.model'


export class ProjectSite {
    public siteName : string;
    public siteCord : string;
    public groundwaterLevelMeasurement : boolean = false;
    public groundwaterSampling : boolean = false;
    public hydrocarbonSampling : boolean = false;
    public soilSamples : boolean = false;
    public waterpump : boolean = false;
    public status : boolean = false;
    public siteCloud : boolean;             //True : Cloud---- False: Sync Icon
    public siteListIcon : boolean;
    public waterpumpdetail : Array<WaterPumpDetails>;
    public welldevelopment : Array<WellDevelopment>;
    public groundwaterdetail : Array<GroundWaterDetail>;
    public soilboring: Array<SoilBoringModel>;
    public wellconstruction : Array<WellConstructionModel>;
}

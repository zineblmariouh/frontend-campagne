import {TypeInstanceVo} from './TypeInstance.model';
import {VieInstitutionnelleVo} from './VieInstitutionnelle.model';
import {VieInstitutionnelleDetailInstrumentIrdVo} from './VieInstitutionnelleDetailInstrumentIrd.model';
import {StructureIrdVo} from './StructureIrd.model';
import {PaysVo} from './Pays.model';
import {VieInstitutionnelleDetailEtablissementVo} from './VieInstitutionnelleDetailEtablissement.model';



export class VieInstitutionnelleDetailVo {

    public id: number;

    public cooreleStructureIrd: null | boolean;
    public cooreleInstrumentIrd: null | boolean;
    public libelle: string;
      public typeInstanceVo: TypeInstanceVo ;
      public structureIrdVo: StructureIrdVo ;
      public paysVo: PaysVo ;
      public vieInstitutionnelleVo: VieInstitutionnelleVo ;
      public vieInstitutionnelleDetailInstrumentIrdsVo: Array<VieInstitutionnelleDetailInstrumentIrdVo>;
      public vieInstitutionnelleDetailEtablissementsVo: Array<VieInstitutionnelleDetailEtablissementVo>;

}

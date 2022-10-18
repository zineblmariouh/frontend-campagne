import {Component, OnInit, Input} from '@angular/core';
import {VieInstitutionnelleService} from '../../../../../controller/service/VieInstitutionnelle.service';
import {VieInstitutionnelleVo} from '../../../../../controller/model/VieInstitutionnelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-vie-institutionnelle-create-admin',
  templateUrl: './vie-institutionnelle-create-admin.component.html',
  styleUrls: ['./vie-institutionnelle-create-admin.component.css']
})
export class VieInstitutionnelleCreateAdminComponent implements OnInit {

        selectedVieInstitutionnelleDetails: VieInstitutionnelleDetailVo = new VieInstitutionnelleDetailVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;

       private _vieInstitutionnelleDetailInstrumentIrdsVo: Array<VieInstitutionnelleDetailInstrumentIrdVo> = [];
       private _vieInstitutionnelleDetailEtablissementsVo: Array<VieInstitutionnelleDetailEtablissementVo> = [];


constructor(private datePipe: DatePipe, private vieInstitutionnelleService: VieInstitutionnelleService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private instrumentIrdService :InstrumentIrdService
,       private chercheurService :ChercheurService
,       private structureIrdService :StructureIrdService
,       private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
,       private typeInstanceService :TypeInstanceService
,       private paysService :PaysService
,       private etablissementService :EtablissementService
,       private campagneService :CampagneService
) {

}


// methods
ngOnInit(): void {


                this.selectedVieInstitutionnelleDetails.typeInstanceVo = new TypeInstanceVo();
                this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
                this.selectedVieInstitutionnelleDetails.structureIrdVo = new StructureIrdVo();
                this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
                this.selectedVieInstitutionnelleDetails.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);

                this.instrumentIrdService.findAll().subscribe(data => this.prepareVieInstitutionnelleDetailInstrumentIrds(data));
                this.etablissementService.findAll().subscribe(data => this.prepareVieInstitutionnelleDetailEtablissements(data));

    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

   prepareVieInstitutionnelleDetailInstrumentIrds(instrumentIrds: Array<InstrumentIrdVo>): void{
        if( instrumentIrds != null){
        instrumentIrds.forEach(e => {
        const vieInstitutionnelleDetailInstrumentIrd = new VieInstitutionnelleDetailInstrumentIrdVo();
        vieInstitutionnelleDetailInstrumentIrd.instrumentIrdVo = e;
        this.vieInstitutionnelleDetailInstrumentIrdsVo.push(vieInstitutionnelleDetailInstrumentIrd);
        });
        }
   }
   prepareVieInstitutionnelleDetailEtablissements(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const vieInstitutionnelleDetailEtablissement = new VieInstitutionnelleDetailEtablissementVo();
        vieInstitutionnelleDetailEtablissement.etablissementVo = e;
        this.vieInstitutionnelleDetailEtablissementsVo.push(vieInstitutionnelleDetailEtablissement);
        });
        }
   }

    validateVieInstitutionnelleDetails(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addVieInstitutionnelleDetails() {
        if( this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo == null ){
            this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo = new Array<VieInstitutionnelleDetailVo>();
        }
       this.validateVieInstitutionnelleDetails();
       if (this.errorMessages.length === 0) {
              this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.push(this.selectedVieInstitutionnelleDetails);
              this.selectedVieInstitutionnelleDetails = new VieInstitutionnelleDetailVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteVieInstitutionnelleDetails(p: VieInstitutionnelleDetailVo) {
        this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedVieInstitutionnelle.vieInstitutionnelleDetailsVo.splice(index, 1); }
        });
    }

public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.vieInstitutionnelleService.save().subscribe(vieInstitutionnelle=>{
       this.vieInstitutionnelles.push({...vieInstitutionnelle});
       this.createVieInstitutionnelleDialog = false;
       this.submitted = false;
       this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }






















//openPopup
              public async openCreatetypeInstance(typeInstance: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstance', 'add');
                       if(isPermistted){
         this.selectedTypeInstance = new TypeInstanceVo();
        this.createTypeInstanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestructureIrd(structureIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('StructureIrd', 'add');
                       if(isPermistted){
         this.selectedStructureIrd = new StructureIrdVo();
        this.createStructureIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createVieInstitutionnelleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
    return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }

 get selectedVieInstitutionnelle():VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }

   get createVieInstitutionnelleDialog(): boolean {
           return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;

       }
    set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog= value;
       }

       get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
      set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
       get typeInstances(): Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
       set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }
       get createTypeInstanceDialog(): boolean {
           return this.typeInstanceService.createTypeInstanceDialog;
       }
      set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
      set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }
       get structureIrds(): Array<StructureIrdVo> {
           return this.structureIrdService.structureIrds;
       }
       set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }
       get createStructureIrdDialog(): boolean {
           return this.structureIrdService.createStructureIrdDialog;
       }
      set createStructureIrdDialog(value: boolean) {
        this.structureIrdService.createStructureIrdDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }



    get vieInstitutionnelleDetailInstrumentIrdsVo(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    if( this._vieInstitutionnelleDetailInstrumentIrdsVo == null )
    this._vieInstitutionnelleDetailInstrumentIrdsVo = new Array();
        return this._vieInstitutionnelleDetailInstrumentIrdsVo;
    }

    set vieInstitutionnelleDetailInstrumentIrdsVo(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this._vieInstitutionnelleDetailInstrumentIrdsVo = value;
    }
    get vieInstitutionnelleDetailEtablissementsVo(): Array<VieInstitutionnelleDetailEtablissementVo> {
    if( this._vieInstitutionnelleDetailEtablissementsVo == null )
    this._vieInstitutionnelleDetailEtablissementsVo = new Array();
        return this._vieInstitutionnelleDetailEtablissementsVo;
    }

    set vieInstitutionnelleDetailEtablissementsVo(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this._vieInstitutionnelleDetailEtablissementsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }

}

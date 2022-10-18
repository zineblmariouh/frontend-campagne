import {Component, OnInit, Input} from '@angular/core';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {VieInstitutionnelleVo} from '../../../../../controller/model/VieInstitutionnelle.model';
import {VieInstitutionnelleService} from '../../../../../controller/service/VieInstitutionnelle.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
@Component({
  selector: 'app-vie-institutionnelle-detail-create-admin',
  templateUrl: './vie-institutionnelle-detail-create-admin.component.html',
  styleUrls: ['./vie-institutionnelle-detail-create-admin.component.css']
})
export class VieInstitutionnelleDetailCreateAdminComponent implements OnInit {

        selectedVieInstitutionnelleDetailInstrumentIrds: VieInstitutionnelleDetailInstrumentIrdVo = new VieInstitutionnelleDetailInstrumentIrdVo();
        selectedVieInstitutionnelleDetailEtablissements: VieInstitutionnelleDetailEtablissementVo = new VieInstitutionnelleDetailEtablissementVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeInstanceCode = true;
    _validTypeInstanceLibelle = true;
    _validStructureIrdLibelle = true;
    _validStructureIrdCode = true;
    _validPaysLibelle = true;
    _validPaysCode = true;


private _vieInstitutionnelleDetailInstrumentIrdsVo: Array<VieInstitutionnelleDetailInstrumentIrdVo> = [];
private _vieInstitutionnelleDetailEtablissementsVo: Array<VieInstitutionnelleDetailEtablissementVo> = [];

constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private vieInstitutionnelleDetailEtablissementService :VieInstitutionnelleDetailEtablissementService
,       private vieInstitutionnelleDetailInstrumentIrdService :VieInstitutionnelleDetailInstrumentIrdService
,       private structureIrdService :StructureIrdService
,       private vieInstitutionnelleService :VieInstitutionnelleService
,       private typeInstanceService :TypeInstanceService
,       private paysService :PaysService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

            this.instrumentIrdService.findAll().subscribe(data => this.prepareVieInstitutionnelleDetailInstrumentIrds(data));

                this.selectedVieInstitutionnelleDetailInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.etablissementService.findAll().subscribe(data => this.prepareVieInstitutionnelleDetailEtablissements(data));

                this.selectedVieInstitutionnelleDetailEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


    this.selectedTypeInstance = new TypeInstanceVo();
    this.typeInstanceService.findAll().subscribe((data) => this.typeInstances = data);
    this.selectedStructureIrd = new StructureIrdVo();
    this.structureIrdService.findAll().subscribe((data) => this.structureIrds = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
    this.vieInstitutionnelleService.findAll().subscribe((data) => this.vieInstitutionnelles = data);
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



private setValidation(value : boolean){
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
     this.vieInstitutionnelleDetailService.save().subscribe(vieInstitutionnelleDetail=>{
       this.vieInstitutionnelleDetails.push({...vieInstitutionnelleDetail});
       this.createVieInstitutionnelleDetailDialog = false;
       this.submitted = false;
       this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }






















//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreatevieInstitutionnelle(vieInstitutionnelle: string) {
                      const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'add');
                       if(isPermistted){
         this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
        this.createVieInstitutionnelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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
    this.createVieInstitutionnelleDetailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
    return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }

 get selectedVieInstitutionnelleDetail():VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
    set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }

   get createVieInstitutionnelleDetailDialog(): boolean {
           return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;

       }
    set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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
       get selectedVieInstitutionnelle(): VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
      set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }
       get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
           return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
       set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }
       get createVieInstitutionnelleDialog(): boolean {
           return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;
       }
      set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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


    get validTypeInstanceCode(): boolean {
    return this._validTypeInstanceCode;
    }

    set validTypeInstanceCode(value: boolean) {
    this._validTypeInstanceCode = value;
    }
    get validTypeInstanceLibelle(): boolean {
    return this._validTypeInstanceLibelle;
    }

    set validTypeInstanceLibelle(value: boolean) {
    this._validTypeInstanceLibelle = value;
    }
    get validStructureIrdLibelle(): boolean {
    return this._validStructureIrdLibelle;
    }

    set validStructureIrdLibelle(value: boolean) {
    this._validStructureIrdLibelle = value;
    }
    get validStructureIrdCode(): boolean {
    return this._validStructureIrdCode;
    }

    set validStructureIrdCode(value: boolean) {
    this._validStructureIrdCode = value;
    }
    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }

}

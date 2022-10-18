import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstitutionCoContractant.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
@Component({
  selector: 'app-projet-activite-recherche-detail-create-admin',
  templateUrl: './projet-activite-recherche-detail-create-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-create-admin.component.css']
})
export class ProjetActiviteRechercheDetailCreateAdminComponent implements OnInit {

        selectedProjetActiviteRechercheDetailEnjeuxIrds: ProjetActiviteRechercheDetailEnjeuxIrdVo = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
        selectedProjetActiviteRechercheDetailInstrumentIrds: ProjetActiviteRechercheDetailInstrumentIrdVo = new ProjetActiviteRechercheDetailInstrumentIrdVo();
        selectedProjetActiviteRechercheDetailPayss: ProjetActiviteRechercheDetailPaysVo = new ProjetActiviteRechercheDetailPaysVo();
        selectedProjetActiviteRechercheDetailInstitutionCoContractants: ProjetActiviteRechercheDetailInstitutionCoContractantVo = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
        selectedProjetActiviteRechercheDetailEtablissementLanceurs: ProjetActiviteRechercheDetailEtablissementLanceurVo = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validStatusProjetLibelle = true;
    _validStatusProjetCode = true;
    _validRoleProjetLibelle = true;
    _validRoleProjetCode = true;
    _validEtablissementLibelle = true;
    _validPaysLibelle = true;
    _validPaysCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _projetActiviteRechercheDetailEnjeuxIrdsVo: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> = [];
private _projetActiviteRechercheDetailInstrumentIrdsVo: Array<ProjetActiviteRechercheDetailInstrumentIrdVo> = [];
private _projetActiviteRechercheDetailPayssVo: Array<ProjetActiviteRechercheDetailPaysVo> = [];
private _projetActiviteRechercheDetailInstitutionCoContractantsVo: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> = [];
private _projetActiviteRechercheDetailEtablissementLanceursVo: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> = [];

constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private statusProjetService :StatusProjetService
,       private instrumentIrdService :InstrumentIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private projetActiviteRechercheDetailInstrumentIrdService :ProjetActiviteRechercheDetailInstrumentIrdService
,       private enjeuxIrdService :EnjeuxIrdService
,       private projetActiviteRechercheDetailInstitutionCoContractantService :ProjetActiviteRechercheDetailInstitutionCoContractantService
,       private projetActiviteRechercheService :ProjetActiviteRechercheService
,       private etablissementService :EtablissementService
,       private roleProjetService :RoleProjetService
,       private projetActiviteRechercheDetailEnjeuxIrdService :ProjetActiviteRechercheDetailEnjeuxIrdService
,       private projetActiviteRechercheDetailPaysService :ProjetActiviteRechercheDetailPaysService
,       private paysService :PaysService
,       private projetActiviteRechercheDetailEtablissementLanceurService :ProjetActiviteRechercheDetailEtablissementLanceurService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailEnjeuxIrds(data));

                this.selectedProjetActiviteRechercheDetailEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.instrumentIrdService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailInstrumentIrds(data));

                this.selectedProjetActiviteRechercheDetailInstrumentIrds.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.paysService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailPayss(data));

                this.selectedProjetActiviteRechercheDetailPayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.etablissementService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailInstitutionCoContractants(data));

                this.selectedProjetActiviteRechercheDetailInstitutionCoContractants.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


            this.etablissementService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailEtablissementLanceurs(data));

                this.selectedProjetActiviteRechercheDetailEtablissementLanceurs.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


    this.selectedStatusProjet = new StatusProjetVo();
    this.statusProjetService.findAll().subscribe((data) => this.statusProjets = data);
    this.selectedRoleProjet = new RoleProjetVo();
    this.roleProjetService.findAll().subscribe((data) => this.roleProjets = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
    this.projetActiviteRechercheService.findAll().subscribe((data) => this.projetActiviteRecherches = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareProjetActiviteRechercheDetailEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const projetActiviteRechercheDetailEnjeuxIrd = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
        projetActiviteRechercheDetailEnjeuxIrd.enjeuxIrdVo = e;
        this.projetActiviteRechercheDetailEnjeuxIrdsVo.push(projetActiviteRechercheDetailEnjeuxIrd);
        });
        }
    }
         prepareProjetActiviteRechercheDetailInstrumentIrds(instrumentIrds: Array<InstrumentIrdVo>): void{
        if( instrumentIrds != null){
        instrumentIrds.forEach(e => {
        const projetActiviteRechercheDetailInstrumentIrd = new ProjetActiviteRechercheDetailInstrumentIrdVo();
        projetActiviteRechercheDetailInstrumentIrd.instrumentIrdVo = e;
        this.projetActiviteRechercheDetailInstrumentIrdsVo.push(projetActiviteRechercheDetailInstrumentIrd);
        });
        }
    }
         prepareProjetActiviteRechercheDetailPayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const projetActiviteRechercheDetailPays = new ProjetActiviteRechercheDetailPaysVo();
        projetActiviteRechercheDetailPays.paysVo = e;
        this.projetActiviteRechercheDetailPayssVo.push(projetActiviteRechercheDetailPays);
        });
        }
    }
         prepareProjetActiviteRechercheDetailInstitutionCoContractants(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const projetActiviteRechercheDetailInstitutionCoContractant = new ProjetActiviteRechercheDetailInstitutionCoContractantVo();
        projetActiviteRechercheDetailInstitutionCoContractant.etablissementVo = e;
        this.projetActiviteRechercheDetailInstitutionCoContractantsVo.push(projetActiviteRechercheDetailInstitutionCoContractant);
        });
        }
    }
         prepareProjetActiviteRechercheDetailEtablissementLanceurs(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const projetActiviteRechercheDetailEtablissementLanceur = new ProjetActiviteRechercheDetailEtablissementLanceurVo();
        projetActiviteRechercheDetailEtablissementLanceur.etablissementVo = e;
        this.projetActiviteRechercheDetailEtablissementLanceursVo.push(projetActiviteRechercheDetailEtablissementLanceur);
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
     this.projetActiviteRechercheDetailService.save().subscribe(projetActiviteRechercheDetail=>{
       this.projetActiviteRechercheDetails.push({...projetActiviteRechercheDetail});
       this.createProjetActiviteRechercheDetailDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();


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
              public async openCreateprojetActiviteRecherche(projetActiviteRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        this.createProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleProjet(roleProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleProjet', 'add');
                       if(isPermistted){
         this.selectedRoleProjet = new RoleProjetVo();
        this.createRoleProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusProjet(statusProjet: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusProjet', 'add');
                       if(isPermistted){
         this.selectedStatusProjet = new StatusProjetVo();
        this.createStatusProjetDialog = true;
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
// methods

hideCreateDialog(){
    this.createProjetActiviteRechercheDetailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
    return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }

 get selectedProjetActiviteRechercheDetail():ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
    set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }

   get createProjetActiviteRechercheDetailDialog(): boolean {
           return this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog;

       }
    set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog= value;
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
       get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get createProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;
       }
      set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
       }
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedRoleProjet(): RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
      set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }
       get roleProjets(): Array<RoleProjetVo> {
           return this.roleProjetService.roleProjets;
       }
       set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }
       get createRoleProjetDialog(): boolean {
           return this.roleProjetService.createRoleProjetDialog;
       }
      set createRoleProjetDialog(value: boolean) {
        this.roleProjetService.createRoleProjetDialog= value;
       }
       get selectedStatusProjet(): StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
      set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }
       get statusProjets(): Array<StatusProjetVo> {
           return this.statusProjetService.statusProjets;
       }
       set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }
       get createStatusProjetDialog(): boolean {
           return this.statusProjetService.createStatusProjetDialog;
       }
      set createStatusProjetDialog(value: boolean) {
        this.statusProjetService.createStatusProjetDialog= value;
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


    get projetActiviteRechercheDetailEnjeuxIrdsVo(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    if( this._projetActiviteRechercheDetailEnjeuxIrdsVo == null )
    this._projetActiviteRechercheDetailEnjeuxIrdsVo = new Array();
    return this._projetActiviteRechercheDetailEnjeuxIrdsVo;
    }

    set projetActiviteRechercheDetailEnjeuxIrdsVo(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
    this._projetActiviteRechercheDetailEnjeuxIrdsVo = value;
    }
    get projetActiviteRechercheDetailInstrumentIrdsVo(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    if( this._projetActiviteRechercheDetailInstrumentIrdsVo == null )
    this._projetActiviteRechercheDetailInstrumentIrdsVo = new Array();
    return this._projetActiviteRechercheDetailInstrumentIrdsVo;
    }

    set projetActiviteRechercheDetailInstrumentIrdsVo(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
    this._projetActiviteRechercheDetailInstrumentIrdsVo = value;
    }
    get projetActiviteRechercheDetailPayssVo(): Array<ProjetActiviteRechercheDetailPaysVo> {
    if( this._projetActiviteRechercheDetailPayssVo == null )
    this._projetActiviteRechercheDetailPayssVo = new Array();
    return this._projetActiviteRechercheDetailPayssVo;
    }

    set projetActiviteRechercheDetailPayssVo(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
    this._projetActiviteRechercheDetailPayssVo = value;
    }
    get projetActiviteRechercheDetailInstitutionCoContractantsVo(): Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> {
    if( this._projetActiviteRechercheDetailInstitutionCoContractantsVo == null )
    this._projetActiviteRechercheDetailInstitutionCoContractantsVo = new Array();
    return this._projetActiviteRechercheDetailInstitutionCoContractantsVo;
    }

    set projetActiviteRechercheDetailInstitutionCoContractantsVo(value: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo>) {
    this._projetActiviteRechercheDetailInstitutionCoContractantsVo = value;
    }
    get projetActiviteRechercheDetailEtablissementLanceursVo(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    if( this._projetActiviteRechercheDetailEtablissementLanceursVo == null )
    this._projetActiviteRechercheDetailEtablissementLanceursVo = new Array();
    return this._projetActiviteRechercheDetailEtablissementLanceursVo;
    }

    set projetActiviteRechercheDetailEtablissementLanceursVo(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
    this._projetActiviteRechercheDetailEtablissementLanceursVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validStatusProjetLibelle(): boolean {
    return this._validStatusProjetLibelle;
    }

    set validStatusProjetLibelle(value: boolean) {
    this._validStatusProjetLibelle = value;
    }
    get validStatusProjetCode(): boolean {
    return this._validStatusProjetCode;
    }

    set validStatusProjetCode(value: boolean) {
    this._validStatusProjetCode = value;
    }
    get validRoleProjetLibelle(): boolean {
    return this._validRoleProjetLibelle;
    }

    set validRoleProjetLibelle(value: boolean) {
    this._validRoleProjetLibelle = value;
    }
    get validRoleProjetCode(): boolean {
    return this._validRoleProjetCode;
    }

    set validRoleProjetCode(value: boolean) {
    this._validRoleProjetCode = value;
    }
    get validEtablissementLibelle(): boolean {
    return this._validEtablissementLibelle;
    }

    set validEtablissementLibelle(value: boolean) {
    this._validEtablissementLibelle = value;
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

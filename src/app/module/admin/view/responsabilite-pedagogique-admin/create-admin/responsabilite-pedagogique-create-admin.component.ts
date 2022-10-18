import {Component, OnInit, Input} from '@angular/core';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-responsabilite-pedagogique-create-admin',
  templateUrl: './responsabilite-pedagogique-create-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-create-admin.component.css']
})
export class ResponsabilitePedagogiqueCreateAdminComponent implements OnInit {

        selectedResponsabilitePedagogiqueEnjeuxIrds: ResponsabilitePedagogiqueEnjeuxIrdVo = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        selectedResponsabilitePedagogiqueEtablissements: ResponsabilitePedagogiqueEtablissementVo = new ResponsabilitePedagogiqueEtablissementVo();
        selectedResponsabilitePedagogiquePayss: ResponsabilitePedagogiquePaysVo = new ResponsabilitePedagogiquePaysVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
   _validResponsabilitePedagogiqueStatusCursus = true;
   _validResponsabilitePedagogiqueIntituleCursus = true;
   _validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
   _validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;

    _validNiveauResponsabilitePedagogiqueLibelle = true;
    _validStatusCursusLibelle = true;
    _validStatusCursusCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validEnseignementEtFormationTempsEstimePourCetteAnnne = true;


private _responsabilitePedagogiqueEnjeuxIrdsVo: Array<ResponsabilitePedagogiqueEnjeuxIrdVo> = [];
private _responsabilitePedagogiquePayssVo: Array<ResponsabilitePedagogiquePaysVo> = [];

constructor(private datePipe: DatePipe, private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private responsabilitePedagogiqueEtablissementService :ResponsabilitePedagogiqueEtablissementService
,       private responsabilitePedagogiquePaysService :ResponsabilitePedagogiquePaysService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private enseignementEtFormationService :EnseignementEtFormationService
,       private responsabilitePedagogiqueEnjeuxIrdService :ResponsabilitePedagogiqueEnjeuxIrdService
,       private niveauResponsabilitePedagogiqueService :NiveauResponsabilitePedagogiqueService
,       private statusCursusService :StatusCursusService
,       private enjeuxIrdService :EnjeuxIrdService
,       private paysService :PaysService
,       private etablissementService :EtablissementService
) {

}


// methods
ngOnInit(): void {

            this.enjeuxIrdService.findAll().subscribe(data => this.prepareResponsabilitePedagogiqueEnjeuxIrds(data));

                this.selectedResponsabilitePedagogiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);



                this.selectedResponsabilitePedagogiqueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedResponsabilitePedagogiqueEtablissements.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.paysService.findAll().subscribe(data => this.prepareResponsabilitePedagogiquePayss(data));

                this.selectedResponsabilitePedagogiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


    this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
    this.niveauResponsabilitePedagogiqueService.findAll().subscribe((data) => this.niveauResponsabilitePedagogiques = data);
    this.selectedStatusCursus = new StatusCursusVo();
    this.statusCursusService.findAll().subscribe((data) => this.statusCursuss = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
}

         prepareResponsabilitePedagogiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const responsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        responsabilitePedagogiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.responsabilitePedagogiqueEnjeuxIrdsVo.push(responsabilitePedagogiqueEnjeuxIrd);
        });
        }
    }
         prepareResponsabilitePedagogiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const responsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();
        responsabilitePedagogiquePays.paysVo = e;
        this.responsabilitePedagogiquePayssVo.push(responsabilitePedagogiquePays);
        });
        }
    }

    validateResponsabilitePedagogiqueEtablissements(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    this.validResponsabilitePedagogiqueStatusCursus = value;
    this.validResponsabilitePedagogiqueIntituleCursus = value;
    this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

        addResponsabilitePedagogiqueEtablissements() {
        if( this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo == null ){
            this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo = new Array<ResponsabilitePedagogiqueEtablissementVo>();
        }
       this.validateResponsabilitePedagogiqueEtablissements();
       if (this.errorMessages.length === 0) {
              this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.push(this.selectedResponsabilitePedagogiqueEtablissements);
              this.selectedResponsabilitePedagogiqueEtablissements = new ResponsabilitePedagogiqueEtablissementVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteResponsabilitePedagogiqueEtablissements(p: ResponsabilitePedagogiqueEtablissementVo) {
        this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.forEach((element, index) => {
            if (element === p) { this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo.splice(index, 1); }
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
     this.responsabilitePedagogiqueService.save().subscribe(responsabilitePedagogique=>{
       this.responsabilitePedagogiques.push({...responsabilitePedagogique});
       this.createResponsabilitePedagogiqueDialog = false;
       this.submitted = false;
       this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateResponsabilitePedagogiqueNiveauResponsabilitePedagogique();
this.validateResponsabilitePedagogiqueStatusCursus();
this.validateResponsabilitePedagogiqueIntituleCursus();
this.validateResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements();
this.validateResponsabilitePedagogiqueResponsabilitePedagogiquePayss();

    }

private validateResponsabilitePedagogiqueNiveauResponsabilitePedagogique(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabilitePedagogique.niveauResponsabilitePedagogiqueVo)) {
            this.errorMessages.push('Niveau responsabilite pedagogique non valide');
            this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = false;
        } else {
            this.validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = true;
        }
    }
private validateResponsabilitePedagogiqueStatusCursus(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabilitePedagogique.statusCursusVo)) {
            this.errorMessages.push('Status cursus non valide');
            this.validResponsabilitePedagogiqueStatusCursus = false;
        } else {
            this.validResponsabilitePedagogiqueStatusCursus = true;
        }
    }
private validateResponsabilitePedagogiqueIntituleCursus(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabilitePedagogique.intituleCursus)) {
            this.errorMessages.push('Intitule cursus non valide');
            this.validResponsabilitePedagogiqueIntituleCursus = false;
        } else {
            this.validResponsabilitePedagogiqueIntituleCursus = true;
        }
    }
private validateResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabilitePedagogique.responsabilitePedagogiqueEtablissementsVo)) {
            this.errorMessages.push('Responsabilite pedagogique etablissements non valide');
            this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = false;
        } else {
            this.validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = true;
        }
    }
private validateResponsabilitePedagogiqueResponsabilitePedagogiquePayss(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabilitePedagogique.responsabilitePedagogiquePayssVo)) {
            this.errorMessages.push('Responsabilite pedagogique payss non valide');
            this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = false;
        } else {
            this.validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = true;
        }
    }



























//openPopup
              public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
                      const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
                       if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
        this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
              public async openCreateniveauResponsabilitePedagogique(niveauResponsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
        this.createNiveauResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusCursus(statusCursus: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusCursus', 'add');
                       if(isPermistted){
         this.selectedStatusCursus = new StatusCursusVo();
        this.createStatusCursusDialog = true;
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
    this.createResponsabilitePedagogiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
    return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }

 get selectedResponsabilitePedagogique():ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
    set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }

   get createResponsabilitePedagogiqueDialog(): boolean {
           return this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog;

       }
    set createResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog= value;
       }

       get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
      set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
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
       get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
      set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
       get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
       set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }
       get createNiveauResponsabilitePedagogiqueDialog(): boolean {
           return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;
       }
      set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog= value;
       }
       get selectedStatusCursus(): StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
      set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
       get statusCursuss(): Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
       set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }
       get createStatusCursusDialog(): boolean {
           return this.statusCursusService.createStatusCursusDialog;
       }
      set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog= value;
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


    get responsabilitePedagogiqueEnjeuxIrdsVo(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    if( this._responsabilitePedagogiqueEnjeuxIrdsVo == null )
    this._responsabilitePedagogiqueEnjeuxIrdsVo = new Array();
    return this._responsabilitePedagogiqueEnjeuxIrdsVo;
    }

    set responsabilitePedagogiqueEnjeuxIrdsVo(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
    this._responsabilitePedagogiqueEnjeuxIrdsVo = value;
    }
    get responsabilitePedagogiquePayssVo(): Array<ResponsabilitePedagogiquePaysVo> {
    if( this._responsabilitePedagogiquePayssVo == null )
    this._responsabilitePedagogiquePayssVo = new Array();
    return this._responsabilitePedagogiquePayssVo;
    }

    set responsabilitePedagogiquePayssVo(value: Array<ResponsabilitePedagogiquePaysVo>) {
    this._responsabilitePedagogiquePayssVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(): boolean {
    return this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique;
    }

    set validResponsabilitePedagogiqueNiveauResponsabilitePedagogique(value: boolean) {
    this._validResponsabilitePedagogiqueNiveauResponsabilitePedagogique = value;
    }
    get validResponsabilitePedagogiqueStatusCursus(): boolean {
    return this._validResponsabilitePedagogiqueStatusCursus;
    }

    set validResponsabilitePedagogiqueStatusCursus(value: boolean) {
    this._validResponsabilitePedagogiqueStatusCursus = value;
    }
    get validResponsabilitePedagogiqueIntituleCursus(): boolean {
    return this._validResponsabilitePedagogiqueIntituleCursus;
    }

    set validResponsabilitePedagogiqueIntituleCursus(value: boolean) {
    this._validResponsabilitePedagogiqueIntituleCursus = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiqueEtablissements = value;
    }
    get validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(): boolean {
    return this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss;
    }

    set validResponsabilitePedagogiqueResponsabilitePedagogiquePayss(value: boolean) {
    this._validResponsabilitePedagogiqueResponsabilitePedagogiquePayss = value;
    }

    get validNiveauResponsabilitePedagogiqueLibelle(): boolean {
    return this._validNiveauResponsabilitePedagogiqueLibelle;
    }

    set validNiveauResponsabilitePedagogiqueLibelle(value: boolean) {
    this._validNiveauResponsabilitePedagogiqueLibelle = value;
    }
    get validStatusCursusLibelle(): boolean {
    return this._validStatusCursusLibelle;
    }

    set validStatusCursusLibelle(value: boolean) {
    this._validStatusCursusLibelle = value;
    }
    get validStatusCursusCode(): boolean {
    return this._validStatusCursusCode;
    }

    set validStatusCursusCode(value: boolean) {
    this._validStatusCursusCode = value;
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
    get validEnseignementEtFormationTempsEstimePourCetteAnnne(): boolean {
    return this._validEnseignementEtFormationTempsEstimePourCetteAnnne;
    }

    set validEnseignementEtFormationTempsEstimePourCetteAnnne(value: boolean) {
    this._validEnseignementEtFormationTempsEstimePourCetteAnnne = value;
    }

}

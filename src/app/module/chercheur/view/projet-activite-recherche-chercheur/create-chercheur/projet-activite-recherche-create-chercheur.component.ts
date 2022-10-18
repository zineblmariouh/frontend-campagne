import {Component, OnInit, Input} from '@angular/core';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';

import { TokenService } from 'src/app/controller/service/Token.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ProjetActiviteRechercheDetailInstitutionCoContractantVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstitutionCoContractant.model';
import {ProjetActiviteRechercheDetailInstitutionCoContractantService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstitutionCoContractant.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
@Component({
  selector: 'app-projet-activite-recherche-create-chercheur',
  templateUrl: './projet-activite-recherche-create-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-create-chercheur.component.css']
})
export class ProjetActiviteRechercheCreateChercheurComponent implements OnInit {

        selectedProjetActiviteRechercheDetails: ProjetActiviteRechercheDetailVo = new ProjetActiviteRechercheDetailVo();
    msgsContents: string;
    info: string;
    chercheurVo: ChercheurVo;
    isLoaded: boolean = false;
    isBlocked: boolean = true;
    campagneVo: CampagneVo;
    data: any;
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validCampagneLibelle = true;

       private _projetActiviteRechercheDetailEnjeuxIrdsVo: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> = [];
       private _projetActiviteRechercheDetailInstrumentIrdsVo: Array<ProjetActiviteRechercheDetailInstrumentIrdVo> = [];
       private _projetActiviteRechercheDetailPayssVo: Array<ProjetActiviteRechercheDetailPaysVo> = [];
       private _projetActiviteRechercheDetailInstitutionCoContractantsVo: Array<ProjetActiviteRechercheDetailInstitutionCoContractantVo> = [];
       private _projetActiviteRechercheDetailEtablissementLanceursVo: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> = [];


constructor(private datePipe: DatePipe, private projetActiviteRechercheService: ProjetActiviteRechercheService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
  ,       private tokenService: TokenService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private statusProjetService :StatusProjetService
,       private instrumentIrdService :InstrumentIrdService
,       private chercheurService :ChercheurService
,       private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
,       private enjeuxIrdService :EnjeuxIrdService
,       private paysService :PaysService
,       private etablissementService :EtablissementService
,       private roleProjetService :RoleProjetService
,       private campagneService :CampagneService
) {

}


 public loadCampagne(username) {
    this.campagneService.findProgressCampagneByChercheurUsername(username).subscribe(data => {
     if (data != null && data.id != null) {
        let campagneVo = data;
        this.projetActiviteRechercheService.findByChercheurUsernameAndCampagneId(this.tokenService.getUsername(), campagneVo['id']).subscribe(projetActiviteRecherche => {
          this.isLoaded = false;
          if (projetActiviteRecherche) {
            this.msgsContents = 'Vous avez saisi les données projetActiviteRecherche de cette campagne';
            this.info = 'info'
            //this.selectedProjetActiviteRecherche={ ...projetActiviteRecherche }['0']; TODO: in case non formulaire
            this.selectedProjetActiviteRecherche.campagneVo=campagneVo;
            this.isLoaded = true;
          }
          else {
            this.msgsContents =  "Il y a une campagne en cours, vous pouvez saisir les données"
            this.selectedProjetActiviteRecherche.campagneVo=campagneVo;
            this.info = "info"
            this.isLoaded = true;
          }
        });
      }
      else {
        this.msgsContents = "Actuellement, aucune campagne en cours"
        this.info = "warn"
        this.isLoaded = false;
 }
});
}
// methods
ngOnInit(): void {
        this.loadCampagne(this.tokenService.getUsername());


                this.selectedProjetActiviteRechercheDetails.statusProjetVo = new StatusProjetVo();
                this.statusProjetService.findAll().subscribe((data) => this.statusProjets = data);
                this.selectedProjetActiviteRechercheDetails.roleProjetVo = new RoleProjetVo();
                this.roleProjetService.findAll().subscribe((data) => this.roleProjets = data);
                this.selectedProjetActiviteRechercheDetails.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedProjetActiviteRechercheDetails.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedProjetActiviteRechercheDetails.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailEnjeuxIrds(data));
                this.instrumentIrdService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailInstrumentIrds(data));
                this.paysService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailPayss(data));
                this.etablissementService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailInstitutionCoContractants(data));
                this.etablissementService.findAll().subscribe(data => this.prepareProjetActiviteRechercheDetailEtablissementLanceurs(data));

    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
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

    validateProjetActiviteRechercheDetails(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addProjetActiviteRechercheDetails() {
        if( this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo == null ){
            this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo = new Array<ProjetActiviteRechercheDetailVo>();
        }
       this.validateProjetActiviteRechercheDetails();
       if (this.errorMessages.length === 0) {
              this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.push(this.selectedProjetActiviteRechercheDetails);
              this.selectedProjetActiviteRechercheDetails = new ProjetActiviteRechercheDetailVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteProjetActiviteRechercheDetails(p: ProjetActiviteRechercheDetailVo) {
        this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedProjetActiviteRecherche.projetActiviteRechercheDetailsVo.splice(index, 1); }
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
if(this.data) {
 this.selectedProjetActiviteRecherche=this.data;
 }
     this.projetActiviteRechercheService.save().subscribe(projetActiviteRecherche=>{
       this.projetActiviteRecherches.push({...projetActiviteRecherche});
       this.createProjetActiviteRechercheDialog = false;
       this.submitted = false;
       this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();


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
    this.createProjetActiviteRechercheDialog  = false;
    this.setValidation(true);
}

// getters and setters

get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
    return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }

 get selectedProjetActiviteRecherche():ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
    set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }

   get createProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;

       }
    set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
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
    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }

}

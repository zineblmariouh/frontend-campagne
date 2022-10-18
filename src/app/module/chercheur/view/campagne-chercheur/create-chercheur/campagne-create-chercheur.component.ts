import {Component, OnInit, Input} from '@angular/core';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {CampagneChercheurOuvertureVo} from '../../../../../controller/model/CampagneChercheurOuverture.model';
import {CampagneChercheurOuvertureService} from '../../../../../controller/service/CampagneChercheurOuverture.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EtatCampagneVo} from '../../../../../controller/model/EtatCampagne.model';
import {EtatCampagneService} from '../../../../../controller/service/EtatCampagne.service';
import {TemplateOuvertureVo} from '../../../../../controller/model/TemplateOuverture.model';
import {TemplateOuvertureService} from '../../../../../controller/service/TemplateOuverture.service';
import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {TemplateClotureVo} from '../../../../../controller/model/TemplateCloture.model';
import {TemplateClotureService} from '../../../../../controller/service/TemplateCloture.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {CampagneChercheurFermetureVo} from '../../../../../controller/model/CampagneChercheurFermeture.model';
import {CampagneChercheurFermetureService} from '../../../../../controller/service/CampagneChercheurFermeture.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {InstrumentsEtDispositifsIrdVo} from '../../../../../controller/model/InstrumentsEtDispositifsIrd.model';
import {InstrumentsEtDispositifsIrdService} from '../../../../../controller/service/InstrumentsEtDispositifsIrd.service';
import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {DistinctionService} from '../../../../../controller/service/Distinction.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {DistinctionEtablissementPaysVo} from '../../../../../controller/model/DistinctionEtablissementPays.model';
import {DistinctionEtablissementPaysService} from '../../../../../controller/service/DistinctionEtablissementPays.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
@Component({
  selector: 'app-campagne-create-chercheur',
  templateUrl: './campagne-create-chercheur.component.html',
  styleUrls: ['./campagne-create-chercheur.component.css']
})
export class CampagneCreateChercheurComponent implements OnInit {

        selectedCampagneChercheurOuvertures: CampagneChercheurOuvertureVo = new CampagneChercheurOuvertureVo();
        selectedCampagneChercheurFermetures: CampagneChercheurFermetureVo = new CampagneChercheurFermetureVo();
        selectedCampagneRelances: CampagneRelanceVo = new CampagneRelanceVo();
        selectedCampagneRappels: CampagneRappelVo = new CampagneRappelVo();
        selectedDistinctions: DistinctionVo = new DistinctionVo();
        selectedProjetActiviteRecherches: ProjetActiviteRechercheVo = new ProjetActiviteRechercheVo();
        selectedInstrumentsEtDispositifsIrds: InstrumentsEtDispositifsIrdVo = new InstrumentsEtDispositifsIrdVo();
        selectedGestionEquipes: GestionEquipeVo = new GestionEquipeVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCampagneLibelle = true;

    _validEtatCampagneLibelle = true;
    _validEtatCampagneCode = true;
    _validTemplateOuvertureCode = true;
    _validTemplateClotureCode = true;
    _validInstrumentsEtDispositifsIrdLibelle = true;



constructor(private datePipe: DatePipe, private campagneService: CampagneService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private templateRelanceService :TemplateRelanceService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private chercheurService :ChercheurService
,       private etatCampagneChercheurService :EtatCampagneChercheurService
,       private campagneRelanceService :CampagneRelanceService
,       private campagneChercheurOuvertureService :CampagneChercheurOuvertureService
,       private etatCampagneService :EtatCampagneService
,       private projetActiviteRechercheService :ProjetActiviteRechercheService
,       private templateOuvertureService :TemplateOuvertureService
,       private campagneRappelService :CampagneRappelService
,       private gestionEquipeService :GestionEquipeService
,       private instrumentsEtDispositifsIrdService :InstrumentsEtDispositifsIrdService
,       private distinctionService :DistinctionService
,       private templateRappelService :TemplateRappelService
,       private templateClotureService :TemplateClotureService
,       private paysService :PaysService
,       private typeParticipationService :TypeParticipationService
,       private campagneChercheurFermetureService :CampagneChercheurFermetureService
) {

}


// methods
ngOnInit(): void {


                this.selectedCampagneChercheurOuvertures.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedCampagneChercheurOuvertures.etatCampagneChercheurVo = new EtatCampagneChercheurVo();
                this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);



                this.selectedCampagneChercheurFermetures.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);



                this.selectedCampagneRelances.templateRelanceVo = new TemplateRelanceVo();
                this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);



                this.selectedCampagneRappels.templateRappelVo = new TemplateRappelVo();
                this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);



                this.selectedDistinctions.typeParticipationVo = new TypeParticipationVo();
                this.typeParticipationService.findAll().subscribe((data) => this.typeParticipations = data);
                this.selectedDistinctions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedDistinctions.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedDistinctions.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);



                this.selectedProjetActiviteRecherches.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedProjetActiviteRecherches.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);



                this.selectedInstrumentsEtDispositifsIrds.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);



                this.selectedGestionEquipes.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedGestionEquipes.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);


    this.selectedEtatCampagne = new EtatCampagneVo();
    this.etatCampagneService.findAll().subscribe((data) => this.etatCampagnes = data);
    this.selectedTemplateOuverture = new TemplateOuvertureVo();
    this.templateOuvertureService.findAll().subscribe((data) => this.templateOuvertures = data);
    this.selectedTemplateCloture = new TemplateClotureVo();
    this.templateClotureService.findAll().subscribe((data) => this.templateClotures = data);
}


    validateCampagneChercheurOuvertures(){
    this.errorMessages = new Array();
    }
    validateCampagneChercheurFermetures(){
    this.errorMessages = new Array();
    }
    validateCampagneRelances(){
    this.errorMessages = new Array();
    }
    validateCampagneRappels(){
    this.errorMessages = new Array();
    }
    validateDistinctions(){
    this.errorMessages = new Array();
    }
    validateProjetActiviteRecherches(){
    this.errorMessages = new Array();
    }
    validateInstrumentsEtDispositifsIrds(){
    this.errorMessages = new Array();
    this.validateInstrumentsEtDispositifsIrdLibelle();
    }
    validateGestionEquipes(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validCampagneLibelle = value;
    this.validInstrumentsEtDispositifsIrdLibelle = value;
    }

        addCampagneChercheurOuvertures() {
        if( this.selectedCampagne.campagneChercheurOuverturesVo == null ){
            this.selectedCampagne.campagneChercheurOuverturesVo = new Array<CampagneChercheurOuvertureVo>();
        }
       this.validateCampagneChercheurOuvertures();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.campagneChercheurOuverturesVo.push(this.selectedCampagneChercheurOuvertures);
              this.selectedCampagneChercheurOuvertures = new CampagneChercheurOuvertureVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneChercheurOuvertures(p: CampagneChercheurOuvertureVo) {
        this.selectedCampagne.campagneChercheurOuverturesVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.campagneChercheurOuverturesVo.splice(index, 1); }
        });
    }
        addCampagneChercheurFermetures() {
        if( this.selectedCampagne.campagneChercheurFermeturesVo == null ){
            this.selectedCampagne.campagneChercheurFermeturesVo = new Array<CampagneChercheurFermetureVo>();
        }
       this.validateCampagneChercheurFermetures();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.campagneChercheurFermeturesVo.push(this.selectedCampagneChercheurFermetures);
              this.selectedCampagneChercheurFermetures = new CampagneChercheurFermetureVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneChercheurFermetures(p: CampagneChercheurFermetureVo) {
        this.selectedCampagne.campagneChercheurFermeturesVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.campagneChercheurFermeturesVo.splice(index, 1); }
        });
    }
        addCampagneRelances() {
        if( this.selectedCampagne.campagneRelancesVo == null ){
            this.selectedCampagne.campagneRelancesVo = new Array<CampagneRelanceVo>();
        }
       this.validateCampagneRelances();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.campagneRelancesVo.push(this.selectedCampagneRelances);
              this.selectedCampagneRelances = new CampagneRelanceVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneRelances(p: CampagneRelanceVo) {
        this.selectedCampagne.campagneRelancesVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.campagneRelancesVo.splice(index, 1); }
        });
    }
        addCampagneRappels() {
        if( this.selectedCampagne.campagneRappelsVo == null ){
            this.selectedCampagne.campagneRappelsVo = new Array<CampagneRappelVo>();
        }
       this.validateCampagneRappels();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.campagneRappelsVo.push(this.selectedCampagneRappels);
              this.selectedCampagneRappels = new CampagneRappelVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteCampagneRappels(p: CampagneRappelVo) {
        this.selectedCampagne.campagneRappelsVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.campagneRappelsVo.splice(index, 1); }
        });
    }
        addDistinctions() {
        if( this.selectedCampagne.distinctionsVo == null ){
            this.selectedCampagne.distinctionsVo = new Array<DistinctionVo>();
        }
       this.validateDistinctions();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.distinctionsVo.push(this.selectedDistinctions);
              this.selectedDistinctions = new DistinctionVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteDistinctions(p: DistinctionVo) {
        this.selectedCampagne.distinctionsVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.distinctionsVo.splice(index, 1); }
        });
    }
        addProjetActiviteRecherches() {
        if( this.selectedCampagne.projetActiviteRecherchesVo == null ){
            this.selectedCampagne.projetActiviteRecherchesVo = new Array<ProjetActiviteRechercheVo>();
        }
       this.validateProjetActiviteRecherches();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.projetActiviteRecherchesVo.push(this.selectedProjetActiviteRecherches);
              this.selectedProjetActiviteRecherches = new ProjetActiviteRechercheVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteProjetActiviteRecherches(p: ProjetActiviteRechercheVo) {
        this.selectedCampagne.projetActiviteRecherchesVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.projetActiviteRecherchesVo.splice(index, 1); }
        });
    }
        addInstrumentsEtDispositifsIrds() {
        if( this.selectedCampagne.instrumentsEtDispositifsIrdsVo == null ){
            this.selectedCampagne.instrumentsEtDispositifsIrdsVo = new Array<InstrumentsEtDispositifsIrdVo>();
        }
       this.validateInstrumentsEtDispositifsIrds();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.instrumentsEtDispositifsIrdsVo.push(this.selectedInstrumentsEtDispositifsIrds);
              this.selectedInstrumentsEtDispositifsIrds = new InstrumentsEtDispositifsIrdVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteInstrumentsEtDispositifsIrds(p: InstrumentsEtDispositifsIrdVo) {
        this.selectedCampagne.instrumentsEtDispositifsIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.instrumentsEtDispositifsIrdsVo.splice(index, 1); }
        });
    }
        addGestionEquipes() {
        if( this.selectedCampagne.gestionEquipesVo == null ){
            this.selectedCampagne.gestionEquipesVo = new Array<GestionEquipeVo>();
        }
       this.validateGestionEquipes();
       if (this.errorMessages.length === 0) {
              this.selectedCampagne.gestionEquipesVo.push(this.selectedGestionEquipes);
              this.selectedGestionEquipes = new GestionEquipeVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteGestionEquipes(p: GestionEquipeVo) {
        this.selectedCampagne.gestionEquipesVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagne.gestionEquipesVo.splice(index, 1); }
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
     this.campagneService.save().subscribe(campagne=>{
       this.campagnes.push({...campagne});
       this.createCampagneDialog = false;
       this.submitted = false;
       this.selectedCampagne = new CampagneVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCampagneLibelle();

    }

private validateCampagneLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCampagne.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCampagneLibelle = false;
        } else {
            this.validCampagneLibelle = true;
        }
    }











































































            private validateInstrumentsEtDispositifsIrdLibelle(){
            if (this.selectedInstrumentsEtDispositifsIrds.libelle == null) {
            this.errorMessages.push('Libelle de la instrumentsEtDispositifsIrd est  invalide');
             this.validInstrumentsEtDispositifsIrdLibelle = false;
            } else {
            this.validInstrumentsEtDispositifsIrdLibelle = true;
            }
            }
















//openPopup
              public async openCreateetatCampagneChercheur(etatCampagneChercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'add');
                       if(isPermistted){
         this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
        this.createEtatCampagneChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatCampagne(etatCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatCampagne = new EtatCampagneVo();
        this.createEtatCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetemplateRappel(templateRappel: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'add');
                       if(isPermistted){
         this.selectedTemplateRappel = new TemplateRappelVo();
        this.createTemplateRappelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetemplateOuverture(templateOuverture: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateOuverture', 'add');
                       if(isPermistted){
         this.selectedTemplateOuverture = new TemplateOuvertureVo();
        this.createTemplateOuvertureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetemplateCloture(templateCloture: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateCloture', 'add');
                       if(isPermistted){
         this.selectedTemplateCloture = new TemplateClotureVo();
        this.createTemplateClotureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetemplateRelance(templateRelance: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateRelance', 'add');
                       if(isPermistted){
         this.selectedTemplateRelance = new TemplateRelanceVo();
        this.createTemplateRelanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeParticipation(typeParticipation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeParticipation', 'add');
                       if(isPermistted){
         this.selectedTypeParticipation = new TypeParticipationVo();
        this.createTypeParticipationDialog = true;
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
    this.createCampagneDialog  = false;
    this.setValidation(true);
}

// getters and setters

get campagnes(): Array<CampagneVo> {
    return this.campagneService.campagnes;
       }
set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }

 get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }

   get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;

       }
    set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }

       get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
      set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
       get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
       set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }
       get createEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
       }
      set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
       }
       get selectedEtatCampagne(): EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
      set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }
       get etatCampagnes(): Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagnes;
       }
       set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }
       get createEtatCampagneDialog(): boolean {
           return this.etatCampagneService.createEtatCampagneDialog;
       }
      set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog= value;
       }
       get selectedTemplateRappel(): TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
      set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
       get templateRappels(): Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
       set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }
       get createTemplateRappelDialog(): boolean {
           return this.templateRappelService.createTemplateRappelDialog;
       }
      set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
       }
       get selectedTemplateOuverture(): TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
      set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }
       get templateOuvertures(): Array<TemplateOuvertureVo> {
           return this.templateOuvertureService.templateOuvertures;
       }
       set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }
       get createTemplateOuvertureDialog(): boolean {
           return this.templateOuvertureService.createTemplateOuvertureDialog;
       }
      set createTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.createTemplateOuvertureDialog= value;
       }
       get selectedTemplateCloture(): TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
      set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }
       get templateClotures(): Array<TemplateClotureVo> {
           return this.templateClotureService.templateClotures;
       }
       set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }
       get createTemplateClotureDialog(): boolean {
           return this.templateClotureService.createTemplateClotureDialog;
       }
      set createTemplateClotureDialog(value: boolean) {
        this.templateClotureService.createTemplateClotureDialog= value;
       }
       get selectedTemplateRelance(): TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
      set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }
       get templateRelances(): Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelances;
       }
       set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }
       get createTemplateRelanceDialog(): boolean {
           return this.templateRelanceService.createTemplateRelanceDialog;
       }
      set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog= value;
       }
       get selectedTypeParticipation(): TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
      set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }
       get typeParticipations(): Array<TypeParticipationVo> {
           return this.typeParticipationService.typeParticipations;
       }
       set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }
       get createTypeParticipationDialog(): boolean {
           return this.typeParticipationService.createTypeParticipationDialog;
       }
      set createTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.createTypeParticipationDialog= value;
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

    get validEtatCampagneLibelle(): boolean {
    return this._validEtatCampagneLibelle;
    }

    set validEtatCampagneLibelle(value: boolean) {
    this._validEtatCampagneLibelle = value;
    }
    get validEtatCampagneCode(): boolean {
    return this._validEtatCampagneCode;
    }

    set validEtatCampagneCode(value: boolean) {
    this._validEtatCampagneCode = value;
    }
    get validTemplateOuvertureCode(): boolean {
    return this._validTemplateOuvertureCode;
    }

    set validTemplateOuvertureCode(value: boolean) {
    this._validTemplateOuvertureCode = value;
    }
    get validTemplateClotureCode(): boolean {
    return this._validTemplateClotureCode;
    }

    set validTemplateClotureCode(value: boolean) {
    this._validTemplateClotureCode = value;
    }
    get validInstrumentsEtDispositifsIrdLibelle(): boolean {
    return this._validInstrumentsEtDispositifsIrdLibelle;
    }

    set validInstrumentsEtDispositifsIrdLibelle(value: boolean) {
    this._validInstrumentsEtDispositifsIrdLibelle = value;
    }

}

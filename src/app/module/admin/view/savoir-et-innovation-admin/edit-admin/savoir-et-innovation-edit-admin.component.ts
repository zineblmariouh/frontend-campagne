import {Component, OnInit} from '@angular/core';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-savoir-et-innovation-edit-admin',
  templateUrl: './savoir-et-innovation-edit-admin.component.html',
  styleUrls: ['./savoir-et-innovation-edit-admin.component.css']
})
export class SavoirEtInnovationEditAdminComponent implements OnInit {

        selectedContratEtConventionIrds: ContratEtConventionIrdVo = new ContratEtConventionIrdVo();
        contratEtConventionIrdsListe: Array<ContratEtConventionIrdVo> = [];

        myStatusContratEtConventions: Array<StatusContratEtConventionVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedEvenementColloqueScienntifiques: EvenementColloqueScienntifiqueVo = new EvenementColloqueScienntifiqueVo();
        evenementColloqueScienntifiquesListe: Array<EvenementColloqueScienntifiqueVo> = [];

        myModalites: Array<ModaliteVo> = [];
        myModaliteInterventions: Array<ModaliteInterventionVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        developpementDeSavoirEtInnovationScientifiquesListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> = [];

        myRoleDeveloppementDeSavoirs: Array<RoleDeveloppementDeSavoirVo> = [];


constructor(private datePipe: DatePipe, private savoirEtInnovationService: SavoirEtInnovationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private modaliteInterventionService: ModaliteInterventionService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private contratEtConventionIrdService: ContratEtConventionIrdService
 ,       private statusContratEtConventionService: StatusContratEtConventionService
 ,       private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
 ,       private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private campagneService: CampagneService
 ,       private modaliteService: ModaliteService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedContratEtConventionIrds.statusContratEtConventionVo = new StatusContratEtConventionVo();
                this.statusContratEtConventionService.findAll().subscribe((data) => this.statusContratEtConventions = data);
                this.selectedContratEtConventionIrds.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedEvenementColloqueScienntifiques.modaliteVo = new ModaliteVo();
                this.modaliteService.findAll().subscribe((data) => this.modalites = data);
                this.selectedEvenementColloqueScienntifiques.modaliteInterventionVo = new ModaliteInterventionVo();
                this.modaliteInterventionService.findAll().subscribe((data) => this.modaliteInterventions = data);
                this.selectedEvenementColloqueScienntifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiques.roleDeveloppementDeSavoirVo = new RoleDeveloppementDeSavoirVo();
                this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addContratEtConventionIrds() {
        if( this.selectedSavoirEtInnovation.contratEtConventionIrdsVo == null ){
            this.selectedSavoirEtInnovation.contratEtConventionIrdsVo = new Array<ContratEtConventionIrdVo>();
        }
        this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.push(this.selectedContratEtConventionIrds);
        this.selectedContratEtConventionIrds = new ContratEtConventionIrdVo();
        }

       deleteContratEtConventionIrds(p: ContratEtConventionIrdVo) {
        this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.splice(index, 1); }
        });
    }
        addEvenementColloqueScienntifiques() {
        if( this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo == null ){
            this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo = new Array<EvenementColloqueScienntifiqueVo>();
        }
        this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.push(this.selectedEvenementColloqueScienntifiques);
        this.selectedEvenementColloqueScienntifiques = new EvenementColloqueScienntifiqueVo();
        }

       deleteEvenementColloqueScienntifiques(p: EvenementColloqueScienntifiqueVo) {
        this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiques() {
        if( this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo == null ){
            this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>();
        }
        this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiques);
        this.selectedDeveloppementDeSavoirEtInnovationScientifiques = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        }

       deleteDeveloppementDeSavoirEtInnovationScientifiques(p: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.savoirEtInnovationService.edit().subscribe(savoirEtInnovation=>{
    const myIndex = this.savoirEtInnovations.findIndex(e => e.id === this.selectedSavoirEtInnovation.id);
    this.savoirEtInnovations[myIndex] = this.selectedSavoirEtInnovation;
    this.editSavoirEtInnovationDialog = false;
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatemodaliteIntervention(modaliteIntervention: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'add');
                       if(isPermistted){
         this.selectedModaliteIntervention = new ModaliteInterventionVo();
        this.createModaliteInterventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusContratEtConvention(statusContratEtConvention: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'add');
                       if(isPermistted){
         this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
        this.createStatusContratEtConventionDialog = true;
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
              public async openCreatemodalite(modalite: string) {
                      const isPermistted = await this.roleService.isPermitted('Modalite', 'add');
                       if(isPermistted){
         this.selectedModalite = new ModaliteVo();
        this.createModaliteDialog = true;
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
              public async openCreateroleDeveloppementDeSavoir(roleDeveloppementDeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'add');
                       if(isPermistted){
         this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.createRoleDeveloppementDeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editSavoirEtInnovationDialog  = false;
}

// getters and setters

get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
    return this.savoirEtInnovationService.savoirEtInnovations;
       }
set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }

 get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }

   get editSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;

       }
    set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog = value;
       }

       get selectedModaliteIntervention(): ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get createModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;
       }
      set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
       }
       get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get createStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
       }
      set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
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
       get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites(): Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get createModaliteDialog(): boolean {
           return this.modaliteService.createModaliteDialog;
       }
      set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
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
       get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get createRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
       }
      set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

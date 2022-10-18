import {Component, OnInit} from '@angular/core';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-enseignement-et-formation-edit-admin',
  templateUrl: './enseignement-et-formation-edit-admin.component.html',
  styleUrls: ['./enseignement-et-formation-edit-admin.component.css']
})
export class EnseignementEtFormationEditAdminComponent implements OnInit {

        selectedEnseignements: EnseignementVo = new EnseignementVo();
        enseignementsListe: Array<EnseignementVo> = [];

        myModaliteEtudes: Array<ModaliteEtudeVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedFormationContinues: FormationContinueVo = new FormationContinueVo();
        formationContinuesListe: Array<FormationContinueVo> = [];

        myModaliteFormationContinues: Array<ModaliteFormationContinueVo> = [];

        selectedResponsabilitePedagogiques: ResponsabilitePedagogiqueVo = new ResponsabilitePedagogiqueVo();
        responsabilitePedagogiquesListe: Array<ResponsabilitePedagogiqueVo> = [];

        myNiveauResponsabilitePedagogiques: Array<NiveauResponsabilitePedagogiqueVo> = [];
        myStatusCursuss: Array<StatusCursusVo> = [];


constructor(private datePipe: DatePipe, private enseignementEtFormationService: EnseignementEtFormationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private formationContinueService: FormationContinueService
 ,       private enseignementService: EnseignementService
 ,       private statusCursusService: StatusCursusService
 ,       private modaliteEtudeService: ModaliteEtudeService
 ,       private modaliteFormationContinueService: ModaliteFormationContinueService
 ,       private campagneService: CampagneService
 ,       private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
 ,       private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedEnseignements.modaliteEtudeVo = new ModaliteEtudeVo();
                this.modaliteEtudeService.findAll().subscribe((data) => this.modaliteEtudes = data);
                this.selectedEnseignements.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedFormationContinues.modaliteFormationContinueVo = new ModaliteFormationContinueVo();
                this.modaliteFormationContinueService.findAll().subscribe((data) => this.modaliteFormationContinues = data);
                this.selectedFormationContinues.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedResponsabilitePedagogiques.niveauResponsabilitePedagogiqueVo = new NiveauResponsabilitePedagogiqueVo();
                this.niveauResponsabilitePedagogiqueService.findAll().subscribe((data) => this.niveauResponsabilitePedagogiques = data);
                this.selectedResponsabilitePedagogiques.statusCursusVo = new StatusCursusVo();
                this.statusCursusService.findAll().subscribe((data) => this.statusCursuss = data);
                this.selectedResponsabilitePedagogiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}
        addEnseignements() {
        if( this.selectedEnseignementEtFormation.enseignementsVo == null ){
            this.selectedEnseignementEtFormation.enseignementsVo = new Array<EnseignementVo>();
        }
        this.selectedEnseignementEtFormation.enseignementsVo.push(this.selectedEnseignements);
        this.selectedEnseignements = new EnseignementVo();
        }

       deleteEnseignements(p: EnseignementVo) {
        this.selectedEnseignementEtFormation.enseignementsVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.enseignementsVo.splice(index, 1); }
        });
    }
        addFormationContinues() {
        if( this.selectedEnseignementEtFormation.formationContinuesVo == null ){
            this.selectedEnseignementEtFormation.formationContinuesVo = new Array<FormationContinueVo>();
        }
        this.selectedEnseignementEtFormation.formationContinuesVo.push(this.selectedFormationContinues);
        this.selectedFormationContinues = new FormationContinueVo();
        }

       deleteFormationContinues(p: FormationContinueVo) {
        this.selectedEnseignementEtFormation.formationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.formationContinuesVo.splice(index, 1); }
        });
    }
        addResponsabilitePedagogiques() {
        if( this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo == null ){
            this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo = new Array<ResponsabilitePedagogiqueVo>();
        }
        this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.push(this.selectedResponsabilitePedagogiques);
        this.selectedResponsabilitePedagogiques = new ResponsabilitePedagogiqueVo();
        }

       deleteResponsabilitePedagogiques(p: ResponsabilitePedagogiqueVo) {
        this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedEnseignementEtFormation.responsabilitePedagogiquesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementEtFormationService.edit().subscribe(enseignementEtFormation=>{
    const myIndex = this.enseignementEtFormations.findIndex(e => e.id === this.selectedEnseignementEtFormation.id);
    this.enseignementEtFormations[myIndex] = this.selectedEnseignementEtFormation;
    this.editEnseignementEtFormationDialog = false;
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatemodaliteEtude(modaliteEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteEtude', 'add');
                       if(isPermistted){
         this.selectedModaliteEtude = new ModaliteEtudeVo();
        this.createModaliteEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemodaliteFormationContinue(modaliteFormationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'add');
                       if(isPermistted){
         this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
        this.createModaliteFormationContinueDialog = true;
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
// methods

hideEditDialog(){
    this.editEnseignementEtFormationDialog  = false;
}

// getters and setters

get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
    return this.enseignementEtFormationService.enseignementEtFormations;
       }
set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }

 get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
    set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }

   get editEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.editEnseignementEtFormationDialog;

       }
    set editEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.editEnseignementEtFormationDialog = value;
       }

       get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
      set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
       get modaliteEtudes(): Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
       set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }
       get createModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.createModaliteEtudeDialog;
       }
      set createModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.createModaliteEtudeDialog= value;
       }
       get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
      set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
       get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
       set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }
       get createModaliteFormationContinueDialog(): boolean {
           return this.modaliteFormationContinueService.createModaliteFormationContinueDialog;
       }
      set createModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

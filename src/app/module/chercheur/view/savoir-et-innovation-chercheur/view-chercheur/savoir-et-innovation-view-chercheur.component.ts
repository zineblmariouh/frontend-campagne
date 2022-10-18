import {Component, OnInit} from '@angular/core';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-savoir-et-innovation-view-chercheur',
  templateUrl: './savoir-et-innovation-view-chercheur.component.html',
  styleUrls: ['./savoir-et-innovation-view-chercheur.component.css']
})
export class SavoirEtInnovationViewChercheurComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private modaliteInterventionService :ModaliteInterventionService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private contratEtConventionIrdService :ContratEtConventionIrdService
    ,private statusContratEtConventionService :StatusContratEtConventionService
    ,private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
    ,private roleDeveloppementDeSavoirService :RoleDeveloppementDeSavoirService
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
    ,private campagneService :CampagneService
    ,private modaliteService :ModaliteService
    ,private chercheurService :ChercheurService
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

hideViewDialog(){
    this.viewSavoirEtInnovationDialog  = false;
}

// getters and setters

get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
    return this.savoirEtInnovationService.savoirEtInnovations;
       }
set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }

 get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }

   get viewSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.viewSavoirEtInnovationDialog;

       }
    set viewSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.viewSavoirEtInnovationDialog= value;
       }

       get selectedModaliteIntervention():ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions():Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get editModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.editModaliteInterventionDialog;
       }
      set editModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.editModaliteInterventionDialog= value;
       }
       get selectedStatusContratEtConvention():StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions():Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get editStatusContratEtConventionDialog():boolean {
           return this.statusContratEtConventionService.editStatusContratEtConventionDialog;
       }
      set editStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.editStatusContratEtConventionDialog= value;
       }
       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedModalite():ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites():Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get editModaliteDialog():boolean {
           return this.modaliteService.editModaliteDialog;
       }
      set editModaliteDialog(value: boolean) {
        this.modaliteService.editModaliteDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedRoleDeveloppementDeSavoir():RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs():Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get editRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;
       }
      set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

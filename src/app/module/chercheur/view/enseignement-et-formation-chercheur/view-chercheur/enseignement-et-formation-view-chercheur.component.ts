import {Component, OnInit} from '@angular/core';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-enseignement-et-formation-view-chercheur',
  templateUrl: './enseignement-et-formation-view-chercheur.component.html',
  styleUrls: ['./enseignement-et-formation-view-chercheur.component.css']
})
export class EnseignementEtFormationViewChercheurComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private formationContinueService :FormationContinueService
    ,private enseignementService :EnseignementService
    ,private statusCursusService :StatusCursusService
    ,private modaliteEtudeService :ModaliteEtudeService
    ,private modaliteFormationContinueService :ModaliteFormationContinueService
    ,private campagneService :CampagneService
    ,private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
    ,private niveauResponsabilitePedagogiqueService :NiveauResponsabilitePedagogiqueService
    ,private chercheurService :ChercheurService
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

hideViewDialog(){
    this.viewEnseignementEtFormationDialog  = false;
}

// getters and setters

get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
    return this.enseignementEtFormationService.enseignementEtFormations;
       }
set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }

 get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
    set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }

   get viewEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.viewEnseignementEtFormationDialog;

       }
    set viewEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.viewEnseignementEtFormationDialog= value;
       }

       get selectedModaliteEtude():ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
      set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }
       get modaliteEtudes():Array<ModaliteEtudeVo> {
           return this.modaliteEtudeService.modaliteEtudes;
       }
       set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }
       get editModaliteEtudeDialog():boolean {
           return this.modaliteEtudeService.editModaliteEtudeDialog;
       }
      set editModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.editModaliteEtudeDialog= value;
       }
       get selectedModaliteFormationContinue():ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
      set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
       get modaliteFormationContinues():Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
       set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }
       get editModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;
       }
      set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog= value;
       }
       get selectedNiveauResponsabilitePedagogique():NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
      set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
       get niveauResponsabilitePedagogiques():Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
       set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }
       get editNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;
       }
      set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog= value;
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
       get selectedStatusCursus():StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
      set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
       get statusCursuss():Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
       set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }
       get editStatusCursusDialog():boolean {
           return this.statusCursusService.editStatusCursusDialog;
       }
      set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

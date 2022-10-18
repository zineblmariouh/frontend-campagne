import {Component, OnInit} from '@angular/core';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-expertise-view-chercheur',
  templateUrl: './expertise-view-chercheur.component.html',
  styleUrls: ['./expertise-view-chercheur.component.css']
})
export class ExpertiseViewChercheurComponent implements OnInit {

        selectedConseilsScientifiques: ConseilsScientifiqueVo = new ConseilsScientifiqueVo();
        conseilsScientifiquesListe: Array<ConseilsScientifiqueVo> = [];

        myNatureExpertises: Array<NatureExpertiseVo> = [];
        myTypeExpertises: Array<TypeExpertiseVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedConsultanceScientifiquePonctuelles: ConsultanceScientifiquePonctuelleVo = new ConsultanceScientifiquePonctuelleVo();
        consultanceScientifiquePonctuellesListe: Array<ConsultanceScientifiquePonctuelleVo> = [];


        selectedComiteEtCommissionEvaluations: ComiteEtCommissionEvaluationVo = new ComiteEtCommissionEvaluationVo();
        comiteEtCommissionEvaluationsListe: Array<ComiteEtCommissionEvaluationVo> = [];



constructor(private datePipe: DatePipe, private expertiseService: ExpertiseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private conseilsScientifiqueService :ConseilsScientifiqueService
    ,private natureExpertiseService :NatureExpertiseService
    ,private typeExpertiseService :TypeExpertiseService
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
                this.selectedConseilsScientifiques.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedConseilsScientifiques.typeExpertiseVo = new TypeExpertiseVo();
                this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
                this.selectedConseilsScientifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedConsultanceScientifiquePonctuelles.typeExpertiseVo = new TypeExpertiseVo();
                this.typeExpertiseService.findAll().subscribe((data) => this.typeExpertises = data);
                this.selectedConsultanceScientifiquePonctuelles.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedConsultanceScientifiquePonctuelles.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedComiteEtCommissionEvaluations.natureExpertiseVo = new NatureExpertiseVo();
                this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
                this.selectedComiteEtCommissionEvaluations.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}

hideViewDialog(){
    this.viewExpertiseDialog  = false;
}

// getters and setters

get expertises(): Array<ExpertiseVo> {
    return this.expertiseService.expertises;
       }
set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }

 get selectedExpertise():ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
    set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }

   get viewExpertiseDialog():boolean {
           return this.expertiseService.viewExpertiseDialog;

       }
    set viewExpertiseDialog(value: boolean) {
        this.expertiseService.viewExpertiseDialog= value;
       }

       get selectedNatureExpertise():NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
      set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }
       get natureExpertises():Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertises;
       }
       set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }
       get editNatureExpertiseDialog():boolean {
           return this.natureExpertiseService.editNatureExpertiseDialog;
       }
      set editNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.editNatureExpertiseDialog= value;
       }
       get selectedTypeExpertise():TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
      set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }
       get typeExpertises():Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertises;
       }
       set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }
       get editTypeExpertiseDialog():boolean {
           return this.typeExpertiseService.editTypeExpertiseDialog;
       }
      set editTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.editTypeExpertiseDialog= value;
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

import {Component, OnInit} from '@angular/core';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-expertise-edit-chercheur',
  templateUrl: './expertise-edit-chercheur.component.html',
  styleUrls: ['./expertise-edit-chercheur.component.css']
})
export class ExpertiseEditChercheurComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private natureExpertiseService: NatureExpertiseService
 ,       private typeExpertiseService: TypeExpertiseService
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
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
        addConseilsScientifiques() {
        if( this.selectedExpertise.conseilsScientifiquesVo == null ){
            this.selectedExpertise.conseilsScientifiquesVo = new Array<ConseilsScientifiqueVo>();
        }
        this.selectedExpertise.conseilsScientifiquesVo.push(this.selectedConseilsScientifiques);
        this.selectedConseilsScientifiques = new ConseilsScientifiqueVo();
        }

       deleteConseilsScientifiques(p: ConseilsScientifiqueVo) {
        this.selectedExpertise.conseilsScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.conseilsScientifiquesVo.splice(index, 1); }
        });
    }
        addConsultanceScientifiquePonctuelles() {
        if( this.selectedExpertise.consultanceScientifiquePonctuellesVo == null ){
            this.selectedExpertise.consultanceScientifiquePonctuellesVo = new Array<ConsultanceScientifiquePonctuelleVo>();
        }
        this.selectedExpertise.consultanceScientifiquePonctuellesVo.push(this.selectedConsultanceScientifiquePonctuelles);
        this.selectedConsultanceScientifiquePonctuelles = new ConsultanceScientifiquePonctuelleVo();
        }

       deleteConsultanceScientifiquePonctuelles(p: ConsultanceScientifiquePonctuelleVo) {
        this.selectedExpertise.consultanceScientifiquePonctuellesVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.consultanceScientifiquePonctuellesVo.splice(index, 1); }
        });
    }
        addComiteEtCommissionEvaluations() {
        if( this.selectedExpertise.comiteEtCommissionEvaluationsVo == null ){
            this.selectedExpertise.comiteEtCommissionEvaluationsVo = new Array<ComiteEtCommissionEvaluationVo>();
        }
        this.selectedExpertise.comiteEtCommissionEvaluationsVo.push(this.selectedComiteEtCommissionEvaluations);
        this.selectedComiteEtCommissionEvaluations = new ComiteEtCommissionEvaluationVo();
        }

       deleteComiteEtCommissionEvaluations(p: ComiteEtCommissionEvaluationVo) {
        this.selectedExpertise.comiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedExpertise.comiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.expertiseService.edit().subscribe(expertise=>{
    const myIndex = this.expertises.findIndex(e => e.id === this.selectedExpertise.id);
    this.expertises[myIndex] = this.selectedExpertise;
    this.editExpertiseDialog = false;
    this.selectedExpertise = new ExpertiseVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatenatureExpertise(natureExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'add');
                       if(isPermistted){
         this.selectedNatureExpertise = new NatureExpertiseVo();
        this.createNatureExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeExpertise(typeExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'add');
                       if(isPermistted){
         this.selectedTypeExpertise = new TypeExpertiseVo();
        this.createTypeExpertiseDialog = true;
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
// methods

hideEditDialog(){
    this.editExpertiseDialog  = false;
}

// getters and setters

get expertises(): Array<ExpertiseVo> {
    return this.expertiseService.expertises;
       }
set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }

 get selectedExpertise(): ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
    set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }

   get editExpertiseDialog(): boolean {
           return this.expertiseService.editExpertiseDialog;

       }
    set editExpertiseDialog(value: boolean) {
        this.expertiseService.editExpertiseDialog = value;
       }

       get selectedNatureExpertise(): NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
      set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }
       get natureExpertises(): Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertises;
       }
       set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }
       get createNatureExpertiseDialog(): boolean {
           return this.natureExpertiseService.createNatureExpertiseDialog;
       }
      set createNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.createNatureExpertiseDialog= value;
       }
       get selectedTypeExpertise(): TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
      set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }
       get typeExpertises(): Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertises;
       }
       set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }
       get createTypeExpertiseDialog(): boolean {
           return this.typeExpertiseService.createTypeExpertiseDialog;
       }
      set createTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.createTypeExpertiseDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

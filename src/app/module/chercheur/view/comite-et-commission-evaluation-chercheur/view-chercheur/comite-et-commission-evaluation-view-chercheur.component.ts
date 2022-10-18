import {Component, OnInit} from '@angular/core';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-comite-et-commission-evaluation-view-chercheur',
  templateUrl: './comite-et-commission-evaluation-view-chercheur.component.html',
  styleUrls: ['./comite-et-commission-evaluation-view-chercheur.component.css']
})
export class ComiteEtCommissionEvaluationViewChercheurComponent implements OnInit {

        selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        typeExpertiseEvaluationComiteEtCommissionEvaluationsListe: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> = [];

        myTypeExpertiseEvaluations: Array<TypeExpertiseEvaluationVo> = [];

        selectedEtablissementComiteEtCommissionEvaluations: EtablissementComiteEtCommissionEvaluationVo = new EtablissementComiteEtCommissionEvaluationVo();
        etablissementComiteEtCommissionEvaluationsListe: Array<EtablissementComiteEtCommissionEvaluationVo> = [];

        myEtablissements: Array<EtablissementVo> = [];

        selectedRoleComiteEtCommissionEvaluations: RoleComiteEtCommissionEvaluationVo = new RoleComiteEtCommissionEvaluationVo();
        roleComiteEtCommissionEvaluationsListe: Array<RoleComiteEtCommissionEvaluationVo> = [];

        myRoleEvaluations: Array<RoleEvaluationVo> = [];

        selectedDisciplineScientifiqueComiteEtCommissionEvaluations: DisciplineScientifiqueComiteEtCommissionEvaluationVo = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        disciplineScientifiqueComiteEtCommissionEvaluationsListe: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedEnjeuxIrdComiteEtCommissionEvaluations: EnjeuxIrdComiteEtCommissionEvaluationVo = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        enjeuxIrdComiteEtCommissionEvaluationsListe: Array<EnjeuxIrdComiteEtCommissionEvaluationVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedInstrumentIrdComiteEtCommissionEvaluations: InstrumentIrdComiteEtCommissionEvaluationVo = new InstrumentIrdComiteEtCommissionEvaluationVo();
        instrumentIrdComiteEtCommissionEvaluationsListe: Array<InstrumentIrdComiteEtCommissionEvaluationVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];
        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];


constructor(private datePipe: DatePipe, private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private typeExpertiseEvaluationService :TypeExpertiseEvaluationService
    ,private etablissementService :EtablissementService
    ,private roleComiteEtCommissionEvaluationService :RoleComiteEtCommissionEvaluationService
    ,private roleEvaluationService :RoleEvaluationService
    ,private instrumentIrdService :InstrumentIrdService
    ,private etablissementComiteEtCommissionEvaluationService :EtablissementComiteEtCommissionEvaluationService
    ,private enjeuxIrdComiteEtCommissionEvaluationService :EnjeuxIrdComiteEtCommissionEvaluationService
    ,private disciplineScientifiqueComiteEtCommissionEvaluationService :DisciplineScientifiqueComiteEtCommissionEvaluationService
    ,private instrumentIrdComiteEtCommissionEvaluationService :InstrumentIrdComiteEtCommissionEvaluationService
    ,private typeExpertiseEvaluationComiteEtCommissionEvaluationService :TypeExpertiseEvaluationComiteEtCommissionEvaluationService
    ,private natureExpertiseService :NatureExpertiseService
    ,private expertiseService :ExpertiseService
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations.typeExpertiseEvaluationVo = new TypeExpertiseEvaluationVo();
                this.typeExpertiseEvaluationService.findAll().subscribe((data) => this.typeExpertiseEvaluations = data);
                this.selectedEtablissementComiteEtCommissionEvaluations.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
                this.selectedRoleComiteEtCommissionEvaluations.roleEvaluationVo = new RoleEvaluationVo();
                this.roleEvaluationService.findAll().subscribe((data) => this.roleEvaluations = data);
                this.selectedDisciplineScientifiqueComiteEtCommissionEvaluations.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedEnjeuxIrdComiteEtCommissionEvaluations.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedInstrumentIrdComiteEtCommissionEvaluations.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedInstrumentIrdComiteEtCommissionEvaluations.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedNatureExpertise = new NatureExpertiseVo();
    this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
    this.selectedExpertise = new ExpertiseVo();
    this.expertiseService.findAll().subscribe((data) => this.expertises = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
    return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }

 get selectedComiteEtCommissionEvaluation():ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
    set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }

   get viewComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.viewComiteEtCommissionEvaluationDialog;

       }
    set viewComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.viewComiteEtCommissionEvaluationDialog= value;
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
       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedExpertise():ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
      set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }
       get expertises():Array<ExpertiseVo> {
           return this.expertiseService.expertises;
       }
       set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }
       get editExpertiseDialog():boolean {
           return this.expertiseService.editExpertiseDialog;
       }
      set editExpertiseDialog(value: boolean) {
        this.expertiseService.editExpertiseDialog= value;
       }
       get selectedTypeExpertiseEvaluation():TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
      set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
       get typeExpertiseEvaluations():Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
       set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }
       get editTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog;
       }
      set editTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog= value;
       }
       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
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
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }
       get selectedRoleEvaluation():RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
      set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
       get roleEvaluations():Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
       set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }
       get editRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.editRoleEvaluationDialog;
       }
      set editRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.editRoleEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

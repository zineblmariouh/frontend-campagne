import {Component, OnInit} from '@angular/core';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-comite-et-commission-evaluation-edit-chercheur',
  templateUrl: './comite-et-commission-evaluation-edit-chercheur.component.html',
  styleUrls: ['./comite-et-commission-evaluation-edit-chercheur.component.css']
})
export class ComiteEtCommissionEvaluationEditChercheurComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
 ,       private etablissementService: EtablissementService
 ,       private roleComiteEtCommissionEvaluationService: RoleComiteEtCommissionEvaluationService
 ,       private roleEvaluationService: RoleEvaluationService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private etablissementComiteEtCommissionEvaluationService: EtablissementComiteEtCommissionEvaluationService
 ,       private enjeuxIrdComiteEtCommissionEvaluationService: EnjeuxIrdComiteEtCommissionEvaluationService
 ,       private disciplineScientifiqueComiteEtCommissionEvaluationService: DisciplineScientifiqueComiteEtCommissionEvaluationService
 ,       private instrumentIrdComiteEtCommissionEvaluationService: InstrumentIrdComiteEtCommissionEvaluationService
 ,       private typeExpertiseEvaluationComiteEtCommissionEvaluationService: TypeExpertiseEvaluationComiteEtCommissionEvaluationService
 ,       private natureExpertiseService: NatureExpertiseService
 ,       private expertiseService: ExpertiseService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
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
        addTypeExpertiseEvaluationComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo = new Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.push(this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations);
        this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        }

       deleteTypeExpertiseEvaluationComiteEtCommissionEvaluations(p: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }
        addEtablissementComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo = new Array<EtablissementComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo.push(this.selectedEtablissementComiteEtCommissionEvaluations);
        this.selectedEtablissementComiteEtCommissionEvaluations = new EtablissementComiteEtCommissionEvaluationVo();
        }

       deleteEtablissementComiteEtCommissionEvaluations(p: EtablissementComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }
        addRoleComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo = new Array<RoleComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo.push(this.selectedRoleComiteEtCommissionEvaluations);
        this.selectedRoleComiteEtCommissionEvaluations = new RoleComiteEtCommissionEvaluationVo();
        }

       deleteRoleComiteEtCommissionEvaluations(p: RoleComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo = new Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo.push(this.selectedDisciplineScientifiqueComiteEtCommissionEvaluations);
        this.selectedDisciplineScientifiqueComiteEtCommissionEvaluations = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        }

       deleteDisciplineScientifiqueComiteEtCommissionEvaluations(p: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }
        addEnjeuxIrdComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.enjeuxIrdComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.enjeuxIrdComiteEtCommissionEvaluationsVo = new Array<EnjeuxIrdComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.enjeuxIrdComiteEtCommissionEvaluationsVo.push(this.selectedEnjeuxIrdComiteEtCommissionEvaluations);
        this.selectedEnjeuxIrdComiteEtCommissionEvaluations = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        }

       deleteEnjeuxIrdComiteEtCommissionEvaluations(p: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.enjeuxIrdComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.enjeuxIrdComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }
        addInstrumentIrdComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo = new Array<InstrumentIrdComiteEtCommissionEvaluationVo>();
        }
        this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.push(this.selectedInstrumentIrdComiteEtCommissionEvaluations);
        this.selectedInstrumentIrdComiteEtCommissionEvaluations = new InstrumentIrdComiteEtCommissionEvaluationVo();
        }

       deleteInstrumentIrdComiteEtCommissionEvaluations(p: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.comiteEtCommissionEvaluationService.edit().subscribe(comiteEtCommissionEvaluation=>{
    const myIndex = this.comiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedComiteEtCommissionEvaluation.id);
    this.comiteEtCommissionEvaluations[myIndex] = this.selectedComiteEtCommissionEvaluation;
    this.editComiteEtCommissionEvaluationDialog = false;
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();


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
              public async openCreateexpertise(expertise: string) {
                      const isPermistted = await this.roleService.isPermitted('Expertise', 'add');
                       if(isPermistted){
         this.selectedExpertise = new ExpertiseVo();
        this.createExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeExpertiseEvaluation(typeExpertiseEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'add');
                       if(isPermistted){
         this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
        this.createTypeExpertiseEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleEvaluation(roleEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'add');
                       if(isPermistted){
         this.selectedRoleEvaluation = new RoleEvaluationVo();
        this.createRoleEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
    return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }

 get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
    set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }

   get editComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog;

       }
    set editComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog = value;
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
       get selectedExpertise(): ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
      set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }
       get expertises(): Array<ExpertiseVo> {
           return this.expertiseService.expertises;
       }
       set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }
       get createExpertiseDialog(): boolean {
           return this.expertiseService.createExpertiseDialog;
       }
      set createExpertiseDialog(value: boolean) {
        this.expertiseService.createExpertiseDialog= value;
       }
       get selectedTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
      set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
       get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
       set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }
       get createTypeExpertiseEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog;
       }
      set createTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog= value;
       }
       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }
       get selectedRoleEvaluation(): RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
      set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
       get roleEvaluations(): Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
       set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }
       get createRoleEvaluationDialog(): boolean {
           return this.roleEvaluationService.createRoleEvaluationDialog;
       }
      set createRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.createRoleEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

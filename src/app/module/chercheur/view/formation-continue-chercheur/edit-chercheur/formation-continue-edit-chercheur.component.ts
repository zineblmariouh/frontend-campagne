import {Component, OnInit} from '@angular/core';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-formation-continue-edit-chercheur',
  templateUrl: './formation-continue-edit-chercheur.component.html',
  styleUrls: ['./formation-continue-edit-chercheur.component.css']
})
export class FormationContinueEditChercheurComponent implements OnInit {

        selectedFormationContinuePubliqueProfessionels: FormationContinuePubliqueProfessionelVo = new FormationContinuePubliqueProfessionelVo();
        formationContinuePubliqueProfessionelsListe: Array<FormationContinuePubliqueProfessionelVo> = [];

        myPubliqueProfessionels: Array<PubliqueProfessionelVo> = [];

        selectedFormationContinueObjetFormationGeneriques: FormationContinueObjetFormationGeneriqueVo = new FormationContinueObjetFormationGeneriqueVo();
        formationContinueObjetFormationGeneriquesListe: Array<FormationContinueObjetFormationGeneriqueVo> = [];

        myObjetFormationGeneriques: Array<ObjetFormationGeneriqueVo> = [];

        selectedFormationContinueEnjeuxIrds: FormationContinueEnjeuxIrdVo = new FormationContinueEnjeuxIrdVo();
        formationContinueEnjeuxIrdsListe: Array<FormationContinueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedFormationContinueDisciplineScientifiques: FormationContinueDisciplineScientifiqueVo = new FormationContinueDisciplineScientifiqueVo();
        formationContinueDisciplineScientifiquesListe: Array<FormationContinueDisciplineScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedPaysFormationContinue: PaysFormationContinueVo = new PaysFormationContinueVo();
        paysFormationContinueListe: Array<PaysFormationContinueVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedZoneGeographiqueFormationContinues: ZoneGeographiqueFormationContinueVo = new ZoneGeographiqueFormationContinueVo();
        zoneGeographiqueFormationContinuesListe: Array<ZoneGeographiqueFormationContinueVo> = [];

        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];

        selectedFormationContinueCommanditaires: FormationContinueCommanditaireVo = new FormationContinueCommanditaireVo();
        formationContinueCommanditairesListe: Array<FormationContinueCommanditaireVo> = [];

        myCommanditaires: Array<CommanditaireVo> = [];


constructor(private datePipe: DatePipe, private formationContinueService: FormationContinueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private enseignementEtFormationService: EnseignementEtFormationService
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private commanditaireService: CommanditaireService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
 ,       private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService
 ,       private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
 ,       private paysFormationContinueService: PaysFormationContinueService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService
 ,       private publiqueProfessionelService: PubliqueProfessionelService
 ,       private modaliteFormationContinueService: ModaliteFormationContinueService
 ,       private objetFormationGeneriqueService: ObjetFormationGeneriqueService
 ,       private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
 ,       private formationContinueCommanditaireService: FormationContinueCommanditaireService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedFormationContinuePubliqueProfessionels.publiqueProfessionelVo = new PubliqueProfessionelVo();
                this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);
                this.selectedFormationContinueObjetFormationGeneriques.objetFormationGeneriqueVo = new ObjetFormationGeneriqueVo();
                this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
                this.selectedFormationContinueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedFormationContinueDisciplineScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedPaysFormationContinue.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedZoneGeographiqueFormationContinues.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedZoneGeographiqueFormationContinues.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedFormationContinueCommanditaires.commanditaireVo = new CommanditaireVo();
                this.commanditaireService.findAll().subscribe((data) => this.commanditaires = data);
                this.selectedFormationContinueCommanditaires.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
    this.modaliteFormationContinueService.findAll().subscribe((data) => this.modaliteFormationContinues = data);
    this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
    this.enseignementEtFormationService.findAll().subscribe((data) => this.enseignementEtFormations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addFormationContinuePubliqueProfessionels() {
        if( this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo == null ){
            this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo = new Array<FormationContinuePubliqueProfessionelVo>();
        }
        this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.push(this.selectedFormationContinuePubliqueProfessionels);
        this.selectedFormationContinuePubliqueProfessionels = new FormationContinuePubliqueProfessionelVo();
        }

       deleteFormationContinuePubliqueProfessionels(p: FormationContinuePubliqueProfessionelVo) {
        this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinuePubliqueProfessionelsVo.splice(index, 1); }
        });
    }
        addFormationContinueObjetFormationGeneriques() {
        if( this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo == null ){
            this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo = new Array<FormationContinueObjetFormationGeneriqueVo>();
        }
        this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.push(this.selectedFormationContinueObjetFormationGeneriques);
        this.selectedFormationContinueObjetFormationGeneriques = new FormationContinueObjetFormationGeneriqueVo();
        }

       deleteFormationContinueObjetFormationGeneriques(p: FormationContinueObjetFormationGeneriqueVo) {
        this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueObjetFormationGeneriquesVo.splice(index, 1); }
        });
    }
        addFormationContinueEnjeuxIrds() {
        if( this.selectedFormationContinue.formationContinueEnjeuxIrdsVo == null ){
            this.selectedFormationContinue.formationContinueEnjeuxIrdsVo = new Array<FormationContinueEnjeuxIrdVo>();
        }
        this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.push(this.selectedFormationContinueEnjeuxIrds);
        this.selectedFormationContinueEnjeuxIrds = new FormationContinueEnjeuxIrdVo();
        }

       deleteFormationContinueEnjeuxIrds(p: FormationContinueEnjeuxIrdVo) {
        this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueEnjeuxIrdsVo.splice(index, 1); }
        });
    }
        addFormationContinueDisciplineScientifiques() {
        if( this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo == null ){
            this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo = new Array<FormationContinueDisciplineScientifiqueVo>();
        }
        this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.push(this.selectedFormationContinueDisciplineScientifiques);
        this.selectedFormationContinueDisciplineScientifiques = new FormationContinueDisciplineScientifiqueVo();
        }

       deleteFormationContinueDisciplineScientifiques(p: FormationContinueDisciplineScientifiqueVo) {
        this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueDisciplineScientifiquesVo.splice(index, 1); }
        });
    }
        addPaysFormationContinue() {
        if( this.selectedFormationContinue.paysFormationContinueVo == null ){
            this.selectedFormationContinue.paysFormationContinueVo = new Array<PaysFormationContinueVo>();
        }
        this.selectedFormationContinue.paysFormationContinueVo.push(this.selectedPaysFormationContinue);
        this.selectedPaysFormationContinue = new PaysFormationContinueVo();
        }

       deletePaysFormationContinue(p: PaysFormationContinueVo) {
        this.selectedFormationContinue.paysFormationContinueVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.paysFormationContinueVo.splice(index, 1); }
        });
    }
        addZoneGeographiqueFormationContinues() {
        if( this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo == null ){
            this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo = new Array<ZoneGeographiqueFormationContinueVo>();
        }
        this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.push(this.selectedZoneGeographiqueFormationContinues);
        this.selectedZoneGeographiqueFormationContinues = new ZoneGeographiqueFormationContinueVo();
        }

       deleteZoneGeographiqueFormationContinues(p: ZoneGeographiqueFormationContinueVo) {
        this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.zoneGeographiqueFormationContinuesVo.splice(index, 1); }
        });
    }
        addFormationContinueCommanditaires() {
        if( this.selectedFormationContinue.formationContinueCommanditairesVo == null ){
            this.selectedFormationContinue.formationContinueCommanditairesVo = new Array<FormationContinueCommanditaireVo>();
        }
        this.selectedFormationContinue.formationContinueCommanditairesVo.push(this.selectedFormationContinueCommanditaires);
        this.selectedFormationContinueCommanditaires = new FormationContinueCommanditaireVo();
        }

       deleteFormationContinueCommanditaires(p: FormationContinueCommanditaireVo) {
        this.selectedFormationContinue.formationContinueCommanditairesVo.forEach((element, index) => {
            if (element === p) { this.selectedFormationContinue.formationContinueCommanditairesVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueService.edit().subscribe(formationContinue=>{
    const myIndex = this.formationContinues.findIndex(e => e.id === this.selectedFormationContinue.id);
    this.formationContinues[myIndex] = this.selectedFormationContinue;
    this.editFormationContinueDialog = false;
    this.selectedFormationContinue = new FormationContinueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignementEtFormation(enseignementEtFormation: string) {
                      const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'add');
                       if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
        this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
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
              public async openCreatecommanditaire(commanditaire: string) {
                      const isPermistted = await this.roleService.isPermitted('Commanditaire', 'add');
                       if(isPermistted){
         this.selectedCommanditaire = new CommanditaireVo();
        this.createCommanditaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
                       if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
        this.createPubliqueProfessionelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
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

hideEditDialog(){
    this.editFormationContinueDialog  = false;
}

// getters and setters

get formationContinues(): Array<FormationContinueVo> {
    return this.formationContinueService.formationContinues;
       }
set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }

 get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
    set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }

   get editFormationContinueDialog(): boolean {
           return this.formationContinueService.editFormationContinueDialog;

       }
    set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog = value;
       }

       get selectedEnseignementEtFormation(): EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get createEnseignementEtFormationDialog(): boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
      set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
       }
       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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
       get selectedCommanditaire(): CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires(): Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get createCommanditaireDialog(): boolean {
           return this.commanditaireService.createCommanditaireDialog;
       }
      set createCommanditaireDialog(value: boolean) {
        this.commanditaireService.createCommanditaireDialog= value;
       }
       get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
      set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
       }
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

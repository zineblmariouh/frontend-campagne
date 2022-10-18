import {Component, OnInit} from '@angular/core';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-formation-continue-view-admin',
  templateUrl: './formation-continue-view-admin.component.html',
  styleUrls: ['./formation-continue-view-admin.component.css']
})
export class FormationContinueViewAdminComponent implements OnInit {

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
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private enseignementEtFormationService :EnseignementEtFormationService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private commanditaireService :CommanditaireService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private formationContinueObjetFormationGeneriqueService :FormationContinueObjetFormationGeneriqueService
    ,private formationContinueEnjeuxIrdService :FormationContinueEnjeuxIrdService
    ,private formationContinuePubliqueProfessionelService :FormationContinuePubliqueProfessionelService
    ,private paysFormationContinueService :PaysFormationContinueService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private formationContinueDisciplineScientifiqueService :FormationContinueDisciplineScientifiqueService
    ,private publiqueProfessionelService :PubliqueProfessionelService
    ,private modaliteFormationContinueService :ModaliteFormationContinueService
    ,private objetFormationGeneriqueService :ObjetFormationGeneriqueService
    ,private zoneGeographiqueFormationContinueService :ZoneGeographiqueFormationContinueService
    ,private formationContinueCommanditaireService :FormationContinueCommanditaireService
    ,private paysService :PaysService
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

hideViewDialog(){
    this.viewFormationContinueDialog  = false;
}

// getters and setters

get formationContinues(): Array<FormationContinueVo> {
    return this.formationContinueService.formationContinues;
       }
set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }

 get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
    set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }

   get viewFormationContinueDialog():boolean {
           return this.formationContinueService.viewFormationContinueDialog;

       }
    set viewFormationContinueDialog(value: boolean) {
        this.formationContinueService.viewFormationContinueDialog= value;
       }

       get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
      set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
       get enseignementEtFormations():Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
       set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }
       get editEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.editEnseignementEtFormationDialog;
       }
      set editEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.editEnseignementEtFormationDialog= value;
       }
       get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques():Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get editObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
       }
      set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog= value;
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
       get selectedCommanditaire():CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires():Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get editCommanditaireDialog():boolean {
           return this.commanditaireService.editCommanditaireDialog;
       }
      set editCommanditaireDialog(value: boolean) {
        this.commanditaireService.editCommanditaireDialog= value;
       }
       get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels():Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get editPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.editPubliqueProfessionelDialog;
       }
      set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog= value;
       }
       get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques():Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get editZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.editZoneGeographiqueDialog;
       }
      set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog= value;
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
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

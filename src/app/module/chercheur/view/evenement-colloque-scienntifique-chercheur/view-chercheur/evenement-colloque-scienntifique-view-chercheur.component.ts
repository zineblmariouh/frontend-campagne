import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-view-chercheur',
  templateUrl: './evenement-colloque-scienntifique-view-chercheur.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-view-chercheur.component.css']
})
export class EvenementColloqueScienntifiqueViewChercheurComponent implements OnInit {

        selectedEvenementColloqueScienntifiqueEnjeuxIrds: EvenementColloqueScienntifiqueEnjeuxIrdVo = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        evenementColloqueScienntifiqueEnjeuxIrdsListe: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedCommunauteSavoirEvenementColloqueScientifiques: CommunauteSavoirEvenementColloqueScientifiqueVo = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        communauteSavoirEvenementColloqueScientifiquesListe: Array<CommunauteSavoirEvenementColloqueScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDisciplineScientifiqueEvenementColloqueScientifiques: DisciplineScientifiqueEvenementColloqueScientifiqueVo = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        disciplineScientifiqueEvenementColloqueScientifiquesListe: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];

        selectedEvenementColloqueScienntifiquePayss: EvenementColloqueScienntifiquePaysVo = new EvenementColloqueScienntifiquePaysVo();
        evenementColloqueScienntifiquePayssListe: Array<EvenementColloqueScienntifiquePaysVo> = [];

        myPayss: Array<PaysVo> = [];


constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private modaliteService :ModaliteService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private savoirEtInnovationService :SavoirEtInnovationService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private evenementColloqueScienntifiqueEnjeuxIrdService :EvenementColloqueScienntifiqueEnjeuxIrdService
    ,private modaliteInterventionService :ModaliteInterventionService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private disciplineScientifiqueEvenementColloqueScientifiqueService :DisciplineScientifiqueEvenementColloqueScientifiqueService
    ,private evenementColloqueScienntifiquePaysService :EvenementColloqueScienntifiquePaysService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private communauteSavoirEvenementColloqueScientifiqueService :CommunauteSavoirEvenementColloqueScientifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedEvenementColloqueScienntifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedCommunauteSavoirEvenementColloqueScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDisciplineScientifiqueEvenementColloqueScientifiques.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedEvenementColloqueScienntifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedModalite = new ModaliteVo();
    this.modaliteService.findAll().subscribe((data) => this.modalites = data);
    this.selectedModaliteIntervention = new ModaliteInterventionVo();
    this.modaliteInterventionService.findAll().subscribe((data) => this.modaliteInterventions = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewEvenementColloqueScienntifiqueDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
    return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }

 get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }

   get viewEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog;

       }
    set viewEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog= value;
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
       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
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
       get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations():Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get editSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
       }
      set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog= value;
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

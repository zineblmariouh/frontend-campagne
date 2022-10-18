import {Component, OnInit} from '@angular/core';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneChercheurOuvertureVo} from '../../../../../controller/model/CampagneChercheurOuverture.model';
import {CampagneChercheurOuvertureService} from '../../../../../controller/service/CampagneChercheurOuverture.service';
import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {EtatCampagneVo} from '../../../../../controller/model/EtatCampagne.model';
import {EtatCampagneService} from '../../../../../controller/service/EtatCampagne.service';
import {InstrumentsEtDispositifsIrdVo} from '../../../../../controller/model/InstrumentsEtDispositifsIrd.model';
import {InstrumentsEtDispositifsIrdService} from '../../../../../controller/service/InstrumentsEtDispositifsIrd.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {CampagneChercheurFermetureVo} from '../../../../../controller/model/CampagneChercheurFermeture.model';
import {CampagneChercheurFermetureService} from '../../../../../controller/service/CampagneChercheurFermeture.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {TemplateClotureVo} from '../../../../../controller/model/TemplateCloture.model';
import {TemplateClotureService} from '../../../../../controller/service/TemplateCloture.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {TemplateOuvertureVo} from '../../../../../controller/model/TemplateOuverture.model';
import {TemplateOuvertureService} from '../../../../../controller/service/TemplateOuverture.service';
import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {DistinctionService} from '../../../../../controller/service/Distinction.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-campagne-view-chercheur',
  templateUrl: './campagne-view-chercheur.component.html',
  styleUrls: ['./campagne-view-chercheur.component.css']
})
export class CampagneViewChercheurComponent implements OnInit {

        selectedCampagneChercheurOuvertures: CampagneChercheurOuvertureVo = new CampagneChercheurOuvertureVo();
        campagneChercheurOuverturesListe: Array<CampagneChercheurOuvertureVo> = [];

        myChercheurs: Array<ChercheurVo> = [];
        myEtatCampagneChercheurs: Array<EtatCampagneChercheurVo> = [];

        selectedCampagneChercheurFermetures: CampagneChercheurFermetureVo = new CampagneChercheurFermetureVo();
        campagneChercheurFermeturesListe: Array<CampagneChercheurFermetureVo> = [];


        selectedCampagneRelances: CampagneRelanceVo = new CampagneRelanceVo();
        campagneRelancesListe: Array<CampagneRelanceVo> = [];

        myTemplateRelances: Array<TemplateRelanceVo> = [];

        selectedCampagneRappels: CampagneRappelVo = new CampagneRappelVo();
        campagneRappelsListe: Array<CampagneRappelVo> = [];

        myTemplateRappels: Array<TemplateRappelVo> = [];

        selectedDistinctions: DistinctionVo = new DistinctionVo();
        distinctionsListe: Array<DistinctionVo> = [];

        myTypeParticipations: Array<TypeParticipationVo> = [];
        myPayss: Array<PaysVo> = [];
        myEtatEtapeCampagnes: Array<EtatEtapeCampagneVo> = [];

        selectedProjetActiviteRecherches: ProjetActiviteRechercheVo = new ProjetActiviteRechercheVo();
        projetActiviteRecherchesListe: Array<ProjetActiviteRechercheVo> = [];


        selectedInstrumentsEtDispositifsIrds: InstrumentsEtDispositifsIrdVo = new InstrumentsEtDispositifsIrdVo();
        instrumentsEtDispositifsIrdsListe: Array<InstrumentsEtDispositifsIrdVo> = [];


        selectedGestionEquipes: GestionEquipeVo = new GestionEquipeVo();
        gestionEquipesListe: Array<GestionEquipeVo> = [];



constructor(private datePipe: DatePipe, private campagneService: CampagneService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneChercheurOuvertureService :CampagneChercheurOuvertureService
    ,private gestionEquipeService :GestionEquipeService
    ,private etatCampagneChercheurService :EtatCampagneChercheurService
    ,private templateRelanceService :TemplateRelanceService
    ,private etatCampagneService :EtatCampagneService
    ,private instrumentsEtDispositifsIrdService :InstrumentsEtDispositifsIrdService
    ,private campagneRelanceService :CampagneRelanceService
    ,private typeParticipationService :TypeParticipationService
    ,private templateRappelService :TemplateRappelService
    ,private campagneChercheurFermetureService :CampagneChercheurFermetureService
    ,private projetActiviteRechercheService :ProjetActiviteRechercheService
    ,private templateClotureService :TemplateClotureService
    ,private chercheurService :ChercheurService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private templateOuvertureService :TemplateOuvertureService
    ,private distinctionService :DistinctionService
    ,private campagneRappelService :CampagneRappelService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedCampagneChercheurOuvertures.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedCampagneChercheurOuvertures.etatCampagneChercheurVo = new EtatCampagneChercheurVo();
                this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
                this.selectedCampagneChercheurFermetures.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedCampagneRelances.templateRelanceVo = new TemplateRelanceVo();
                this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);
                this.selectedCampagneRappels.templateRappelVo = new TemplateRappelVo();
                this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);
                this.selectedDistinctions.typeParticipationVo = new TypeParticipationVo();
                this.typeParticipationService.findAll().subscribe((data) => this.typeParticipations = data);
                this.selectedDistinctions.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedDistinctions.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedDistinctions.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedProjetActiviteRecherches.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
                this.selectedProjetActiviteRecherches.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedInstrumentsEtDispositifsIrds.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedGestionEquipes.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
                this.selectedGestionEquipes.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
    this.selectedEtatCampagne = new EtatCampagneVo();
    this.etatCampagneService.findAll().subscribe((data) => this.etatCampagnes = data);
    this.selectedTemplateOuverture = new TemplateOuvertureVo();
    this.templateOuvertureService.findAll().subscribe((data) => this.templateOuvertures = data);
    this.selectedTemplateCloture = new TemplateClotureVo();
    this.templateClotureService.findAll().subscribe((data) => this.templateClotures = data);
}

hideViewDialog(){
    this.viewCampagneDialog  = false;
}

// getters and setters

get campagnes(): Array<CampagneVo> {
    return this.campagneService.campagnes;
       }
set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }

 get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }

   get viewCampagneDialog():boolean {
           return this.campagneService.viewCampagneDialog;

       }
    set viewCampagneDialog(value: boolean) {
        this.campagneService.viewCampagneDialog= value;
       }

       get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
      set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
       get etatCampagneChercheurs():Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
       set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }
       get editEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
       }
      set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog= value;
       }
       get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
      set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }
       get etatCampagnes():Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagnes;
       }
       set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }
       get editEtatCampagneDialog():boolean {
           return this.etatCampagneService.editEtatCampagneDialog;
       }
      set editEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.editEtatCampagneDialog= value;
       }
       get selectedTemplateRappel():TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
      set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
       get templateRappels():Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
       set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }
       get editTemplateRappelDialog():boolean {
           return this.templateRappelService.editTemplateRappelDialog;
       }
      set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog= value;
       }
       get selectedTemplateOuverture():TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
      set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }
       get templateOuvertures():Array<TemplateOuvertureVo> {
           return this.templateOuvertureService.templateOuvertures;
       }
       set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }
       get editTemplateOuvertureDialog():boolean {
           return this.templateOuvertureService.editTemplateOuvertureDialog;
       }
      set editTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.editTemplateOuvertureDialog= value;
       }
       get selectedTemplateCloture():TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
      set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }
       get templateClotures():Array<TemplateClotureVo> {
           return this.templateClotureService.templateClotures;
       }
       set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }
       get editTemplateClotureDialog():boolean {
           return this.templateClotureService.editTemplateClotureDialog;
       }
      set editTemplateClotureDialog(value: boolean) {
        this.templateClotureService.editTemplateClotureDialog= value;
       }
       get selectedTemplateRelance():TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
      set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }
       get templateRelances():Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelances;
       }
       set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }
       get editTemplateRelanceDialog():boolean {
           return this.templateRelanceService.editTemplateRelanceDialog;
       }
      set editTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.editTemplateRelanceDialog= value;
       }
       get selectedTypeParticipation():TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
      set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }
       get typeParticipations():Array<TypeParticipationVo> {
           return this.typeParticipationService.typeParticipations;
       }
       set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }
       get editTypeParticipationDialog():boolean {
           return this.typeParticipationService.editTypeParticipationDialog;
       }
      set editTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.editTypeParticipationDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

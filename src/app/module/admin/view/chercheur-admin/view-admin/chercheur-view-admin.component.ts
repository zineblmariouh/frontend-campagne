import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {ZoneActiviteInteractionRechercheVo} from '../../../../../controller/model/ZoneActiviteInteractionRecherche.model';
import {ZoneActiviteInteractionRechercheService} from '../../../../../controller/service/ZoneActiviteInteractionRecherche.service';
import {GradeVo} from '../../../../../controller/model/Grade.model';
import {GradeService} from '../../../../../controller/service/Grade.service';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
import {CommissionScientifiqueService} from '../../../../../controller/service/CommissionScientifique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {IdentifiantAuteurExpertVo} from '../../../../../controller/model/IdentifiantAuteurExpert.model';
import {IdentifiantAuteurExpertService} from '../../../../../controller/service/IdentifiantAuteurExpert.service';
import {EnjeuxIrdChercheurVo} from '../../../../../controller/model/EnjeuxIrdChercheur.model';
import {EnjeuxIrdChercheurService} from '../../../../../controller/service/EnjeuxIrdChercheur.service';
import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {SexeService} from '../../../../../controller/service/Sexe.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import {TypeInstrumentIrdChercheurService} from '../../../../../controller/service/TypeInstrumentIrdChercheur.service';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import {InstrumentIrdChercheurService} from '../../../../../controller/service/InstrumentIrdChercheur.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {CommunauteSavoirChercheurVo} from '../../../../../controller/model/CommunauteSavoirChercheur.model';
import {CommunauteSavoirChercheurService} from '../../../../../controller/service/CommunauteSavoirChercheur.service';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from '../../../../../controller/service/DisciplineScientifiqueErc.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
import {CorpsService} from '../../../../../controller/service/Corps.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {DisciplineScientifiqueChercheurVo} from '../../../../../controller/model/DisciplineScientifiqueChercheur.model';
import {DisciplineScientifiqueChercheurService} from '../../../../../controller/service/DisciplineScientifiqueChercheur.service';
import {VilleVo} from '../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../controller/service/Ville.service';
import {IdentifiantRechercheVo} from '../../../../../controller/model/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from '../../../../../controller/service/IdentifiantRecherche.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';

@Component({
  selector: 'app-chercheur-view-admin',
  templateUrl: './chercheur-view-admin.component.html',
  styleUrls: ['./chercheur-view-admin.component.css']
})
export class ChercheurViewAdminComponent implements OnInit {

        selectedChercheurEmails: ChercheurEmailVo = new ChercheurEmailVo();
        chercheurEmailsListe: Array<ChercheurEmailVo> = [];


        selectedDisciplineScientifiqueChercheurs: DisciplineScientifiqueChercheurVo = new DisciplineScientifiqueChercheurVo();
        disciplineScientifiqueChercheursListe: Array<DisciplineScientifiqueChercheurVo> = [];

        myDisciplineScientifiques: Array<DisciplineScientifiqueVo> = [];
        myDisciplineScientifiqueErcs: Array<DisciplineScientifiqueErcVo> = [];

        selectedZoneActiviteInteractionRecherches: ZoneActiviteInteractionRechercheVo = new ZoneActiviteInteractionRechercheVo();
        zoneActiviteInteractionRecherchesListe: Array<ZoneActiviteInteractionRechercheVo> = [];

        myPayss: Array<PaysVo> = [];
        myZoneGeographiques: Array<ZoneGeographiqueVo> = [];

        selectedEnjeuxIrdChercheurs: EnjeuxIrdChercheurVo = new EnjeuxIrdChercheurVo();
        enjeuxIrdChercheursListe: Array<EnjeuxIrdChercheurVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedCommunauteSavoirChercheurs: CommunauteSavoirChercheurVo = new CommunauteSavoirChercheurVo();
        communauteSavoirChercheursListe: Array<CommunauteSavoirChercheurVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedInstrumentIrdChercheurs: InstrumentIrdChercheurVo = new InstrumentIrdChercheurVo();
        instrumentIrdChercheursListe: Array<InstrumentIrdChercheurVo> = [];

        myInstrumentIrds: Array<InstrumentIrdVo> = [];

        selectedTypeInstrumentIrdChercheurs: TypeInstrumentIrdChercheurVo = new TypeInstrumentIrdChercheurVo();
        typeInstrumentIrdChercheursListe: Array<TypeInstrumentIrdChercheurVo> = [];

        myTypeInstrumentIrds: Array<TypeInstrumentIrdVo> = [];

        selectedIdentifiantAuteurExperts: IdentifiantAuteurExpertVo = new IdentifiantAuteurExpertVo();
        identifiantAuteurExpertsListe: Array<IdentifiantAuteurExpertVo> = [];

        myIdentifiantRecherches: Array<IdentifiantRechercheVo> = [];


constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private typeEntiteAdministrativeService :TypeEntiteAdministrativeService
    ,private departementScientifiqueService :DepartementScientifiqueService
    ,private zoneActiviteInteractionRechercheService :ZoneActiviteInteractionRechercheService
    ,private gradeService :GradeService
    ,private commissionScientifiqueService :CommissionScientifiqueService
    ,private instrumentIrdService :InstrumentIrdService
    ,private chercheurEmailService :ChercheurEmailService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private identifiantAuteurExpertService :IdentifiantAuteurExpertService
    ,private enjeuxIrdChercheurService :EnjeuxIrdChercheurService
    ,private sexeService :SexeService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private typeInstrumentIrdChercheurService :TypeInstrumentIrdChercheurService
    ,private instrumentIrdChercheurService :InstrumentIrdChercheurService
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
    ,private communauteSavoirChercheurService :CommunauteSavoirChercheurService
    ,private disciplineScientifiqueErcService :DisciplineScientifiqueErcService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private corpsService :CorpsService
    ,private paysService :PaysService
    ,private entiteAdministrativeService :EntiteAdministrativeService
    ,private disciplineScientifiqueChercheurService :DisciplineScientifiqueChercheurService
    ,private villeService :VilleService
    ,private identifiantRechercheService :IdentifiantRechercheService
    ,private affectationStructurelleService :AffectationStructurelleService
) {
}

// methods
ngOnInit(): void {
                this.selectedDisciplineScientifiqueChercheurs.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedDisciplineScientifiqueChercheurs.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
                this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
                this.selectedZoneActiviteInteractionRecherches.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedZoneActiviteInteractionRecherches.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
                this.selectedEnjeuxIrdChercheurs.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedCommunauteSavoirChercheurs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedInstrumentIrdChercheurs.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedTypeInstrumentIrdChercheurs.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
                this.selectedIdentifiantAuteurExperts.identifiantRechercheVo = new IdentifiantRechercheVo();
                this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);
    this.selectedAffectationStructurelle = new AffectationStructurelleVo();
    this.affectationStructurelleService.findAll().subscribe((data) => this.affectationStructurelles = data);
    this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
    this.entiteAdministrativeService.findAll().subscribe((data) => this.entiteAdministratives = data);
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedDepartementScientifique = new DepartementScientifiqueVo();
    this.departementScientifiqueService.findAll().subscribe((data) => this.departementScientifiques = data);
    this.selectedCommissionScientifique = new CommissionScientifiqueVo();
    this.commissionScientifiqueService.findAll().subscribe((data) => this.commissionScientifiques = data);
    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedCorps = new CorpsVo();
    this.corpsService.findAll().subscribe((data) => this.corpss = data);
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
}

hideViewDialog(){
    this.viewChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get viewChercheurDialog():boolean {
           return this.chercheurService.viewChercheurDialog;

       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog= value;
       }

       get selectedEntiteAdministrative():EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
      set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }
       get entiteAdministratives():Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministratives;
       }
       set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }
       get editEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.editEntiteAdministrativeDialog;
       }
      set editEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.editEntiteAdministrativeDialog= value;
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
       get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes():Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get editVilleDialog():boolean {
           return this.villeService.editVilleDialog;
       }
      set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
       }
       get selectedTypeEntiteAdministrative():TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives():Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get editTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;
       }
      set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog= value;
       }
       get selectedCorps():CorpsVo {
           return this.corpsService.selectedCorps;
       }
      set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
       get corpss():Array<CorpsVo> {
           return this.corpsService.corpss;
       }
       set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }
       get editCorpsDialog():boolean {
           return this.corpsService.editCorpsDialog;
       }
      set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog= value;
       }
       get selectedDisciplineScientifiqueErc():DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs():Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get editDisciplineScientifiqueErcDialog():boolean {
           return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;
       }
      set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog= value;
       }
       get selectedSexe():SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes():Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get editSexeDialog():boolean {
           return this.sexeService.editSexeDialog;
       }
      set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog= value;
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
       get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
      set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }
       get commissionScientifiques():Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiques;
       }
       set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }
       get editCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.editCommissionScientifiqueDialog;
       }
      set editCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.editCommissionScientifiqueDialog= value;
       }
       get selectedIdentifiantRecherche():IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches():Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get editIdentifiantRechercheDialog():boolean {
           return this.identifiantRechercheService.editIdentifiantRechercheDialog;
       }
      set editIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.editIdentifiantRechercheDialog= value;
       }
       get selectedGrade():GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades():Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get editGradeDialog():boolean {
           return this.gradeService.editGradeDialog;
       }
      set editGradeDialog(value: boolean) {
        this.gradeService.editGradeDialog= value;
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
       get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
      set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }
       get departementScientifiques():Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiques;
       }
       set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }
       get editDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.editDepartementScientifiqueDialog;
       }
      set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog= value;
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
       get selectedAffectationStructurelle():AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
      set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }
       get affectationStructurelles():Array<AffectationStructurelleVo> {
           return this.affectationStructurelleService.affectationStructurelles;
       }
       set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }
       get editAffectationStructurelleDialog():boolean {
           return this.affectationStructurelleService.editAffectationStructurelleDialog;
       }
      set editAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.editAffectationStructurelleDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

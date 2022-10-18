import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
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
  selector: 'app-chercheur-edit-admin',
  templateUrl: './chercheur-edit-admin.component.html',
  styleUrls: ['./chercheur-edit-admin.component.css']
})
export class ChercheurEditAdminComponent implements OnInit {

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
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
 ,       private departementScientifiqueService: DepartementScientifiqueService
 ,       private zoneActiviteInteractionRechercheService: ZoneActiviteInteractionRechercheService
 ,       private gradeService: GradeService
 ,       private commissionScientifiqueService: CommissionScientifiqueService
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private chercheurEmailService: ChercheurEmailService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private identifiantAuteurExpertService: IdentifiantAuteurExpertService
 ,       private enjeuxIrdChercheurService: EnjeuxIrdChercheurService
 ,       private sexeService: SexeService
 ,       private communauteSavoirService: CommunauteSavoirService
 ,       private typeInstrumentIrdChercheurService: TypeInstrumentIrdChercheurService
 ,       private instrumentIrdChercheurService: InstrumentIrdChercheurService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private communauteSavoirChercheurService: CommunauteSavoirChercheurService
 ,       private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private corpsService: CorpsService
 ,       private paysService: PaysService
 ,       private entiteAdministrativeService: EntiteAdministrativeService
 ,       private disciplineScientifiqueChercheurService: DisciplineScientifiqueChercheurService
 ,       private villeService: VilleService
 ,       private identifiantRechercheService: IdentifiantRechercheService
 ,       private affectationStructurelleService: AffectationStructurelleService
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
        addChercheurEmails() {
        if( this.selectedChercheur.chercheurEmailsVo == null ){
            this.selectedChercheur.chercheurEmailsVo = new Array<ChercheurEmailVo>();
        }
        this.selectedChercheur.chercheurEmailsVo.push(this.selectedChercheurEmails);
        this.selectedChercheurEmails = new ChercheurEmailVo();
        }

       deleteChercheurEmails(p: ChercheurEmailVo) {
        this.selectedChercheur.chercheurEmailsVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.chercheurEmailsVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueChercheurs() {
        if( this.selectedChercheur.disciplineScientifiqueChercheursVo == null ){
            this.selectedChercheur.disciplineScientifiqueChercheursVo = new Array<DisciplineScientifiqueChercheurVo>();
        }
        this.selectedChercheur.disciplineScientifiqueChercheursVo.push(this.selectedDisciplineScientifiqueChercheurs);
        this.selectedDisciplineScientifiqueChercheurs = new DisciplineScientifiqueChercheurVo();
        }

       deleteDisciplineScientifiqueChercheurs(p: DisciplineScientifiqueChercheurVo) {
        this.selectedChercheur.disciplineScientifiqueChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.disciplineScientifiqueChercheursVo.splice(index, 1); }
        });
    }
        addZoneActiviteInteractionRecherches() {
        if( this.selectedChercheur.zoneActiviteInteractionRecherchesVo == null ){
            this.selectedChercheur.zoneActiviteInteractionRecherchesVo = new Array<ZoneActiviteInteractionRechercheVo>();
        }
        this.selectedChercheur.zoneActiviteInteractionRecherchesVo.push(this.selectedZoneActiviteInteractionRecherches);
        this.selectedZoneActiviteInteractionRecherches = new ZoneActiviteInteractionRechercheVo();
        }

       deleteZoneActiviteInteractionRecherches(p: ZoneActiviteInteractionRechercheVo) {
        this.selectedChercheur.zoneActiviteInteractionRecherchesVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.zoneActiviteInteractionRecherchesVo.splice(index, 1); }
        });
    }
        addEnjeuxIrdChercheurs() {
        if( this.selectedChercheur.enjeuxIrdChercheursVo == null ){
            this.selectedChercheur.enjeuxIrdChercheursVo = new Array<EnjeuxIrdChercheurVo>();
        }
        this.selectedChercheur.enjeuxIrdChercheursVo.push(this.selectedEnjeuxIrdChercheurs);
        this.selectedEnjeuxIrdChercheurs = new EnjeuxIrdChercheurVo();
        }

       deleteEnjeuxIrdChercheurs(p: EnjeuxIrdChercheurVo) {
        this.selectedChercheur.enjeuxIrdChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.enjeuxIrdChercheursVo.splice(index, 1); }
        });
    }
        addCommunauteSavoirChercheurs() {
        if( this.selectedChercheur.communauteSavoirChercheursVo == null ){
            this.selectedChercheur.communauteSavoirChercheursVo = new Array<CommunauteSavoirChercheurVo>();
        }
        this.selectedChercheur.communauteSavoirChercheursVo.push(this.selectedCommunauteSavoirChercheurs);
        this.selectedCommunauteSavoirChercheurs = new CommunauteSavoirChercheurVo();
        }

       deleteCommunauteSavoirChercheurs(p: CommunauteSavoirChercheurVo) {
        this.selectedChercheur.communauteSavoirChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.communauteSavoirChercheursVo.splice(index, 1); }
        });
    }
        addInstrumentIrdChercheurs() {
        if( this.selectedChercheur.instrumentIrdChercheursVo == null ){
            this.selectedChercheur.instrumentIrdChercheursVo = new Array<InstrumentIrdChercheurVo>();
        }
        this.selectedChercheur.instrumentIrdChercheursVo.push(this.selectedInstrumentIrdChercheurs);
        this.selectedInstrumentIrdChercheurs = new InstrumentIrdChercheurVo();
        }

       deleteInstrumentIrdChercheurs(p: InstrumentIrdChercheurVo) {
        this.selectedChercheur.instrumentIrdChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.instrumentIrdChercheursVo.splice(index, 1); }
        });
    }
        addTypeInstrumentIrdChercheurs() {
        if( this.selectedChercheur.typeInstrumentIrdChercheursVo == null ){
            this.selectedChercheur.typeInstrumentIrdChercheursVo = new Array<TypeInstrumentIrdChercheurVo>();
        }
        this.selectedChercheur.typeInstrumentIrdChercheursVo.push(this.selectedTypeInstrumentIrdChercheurs);
        this.selectedTypeInstrumentIrdChercheurs = new TypeInstrumentIrdChercheurVo();
        }

       deleteTypeInstrumentIrdChercheurs(p: TypeInstrumentIrdChercheurVo) {
        this.selectedChercheur.typeInstrumentIrdChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.typeInstrumentIrdChercheursVo.splice(index, 1); }
        });
    }
        addIdentifiantAuteurExperts() {
        if( this.selectedChercheur.identifiantAuteurExpertsVo == null ){
            this.selectedChercheur.identifiantAuteurExpertsVo = new Array<IdentifiantAuteurExpertVo>();
        }
        this.selectedChercheur.identifiantAuteurExpertsVo.push(this.selectedIdentifiantAuteurExperts);
        this.selectedIdentifiantAuteurExperts = new IdentifiantAuteurExpertVo();
        }

       deleteIdentifiantAuteurExperts(p: IdentifiantAuteurExpertVo) {
        this.selectedChercheur.identifiantAuteurExpertsVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.identifiantAuteurExpertsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedChercheur.createdAt = DateUtils.toDate(this.selectedChercheur.createdAt);
            this.selectedChercheur.updatedAt = DateUtils.toDate(this.selectedChercheur.updatedAt);
    this.chercheurService.edit().subscribe(chercheur=>{
    const myIndex = this.chercheurs.findIndex(e => e.id === this.selectedChercheur.id);
    this.chercheurs[myIndex] = this.selectedChercheur;
    this.editChercheurDialog = false;
    this.selectedChercheur = new ChercheurVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateentiteAdministrative(entiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
        this.createEntiteAdministrativeDialog = true;
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
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEntiteAdministrative(typeEntiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
        this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecorps(corps: string) {
                      const isPermistted = await this.roleService.isPermitted('Corps', 'add');
                       if(isPermistted){
         this.selectedCorps = new CorpsVo();
        this.createCorpsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
        this.createDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesexe(sexe: string) {
                      const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
                       if(isPermistted){
         this.selectedSexe = new SexeVo();
        this.createSexeDialog = true;
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
              public async openCreatecommissionScientifique(commissionScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'add');
                       if(isPermistted){
         this.selectedCommissionScientifique = new CommissionScientifiqueVo();
        this.createCommissionScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateidentifiantRecherche(identifiantRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'add');
                       if(isPermistted){
         this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
        this.createIdentifiantRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreategrade(grade: string) {
                      const isPermistted = await this.roleService.isPermitted('Grade', 'add');
                       if(isPermistted){
         this.selectedGrade = new GradeVo();
        this.createGradeDialog = true;
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
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedepartementScientifique(departementScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'add');
                       if(isPermistted){
         this.selectedDepartementScientifique = new DepartementScientifiqueVo();
        this.createDepartementScientifiqueDialog = true;
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
              public async openCreateaffectationStructurelle(affectationStructurelle: string) {
                      const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'add');
                       if(isPermistted){
         this.selectedAffectationStructurelle = new AffectationStructurelleVo();
        this.createAffectationStructurelleDialog = true;
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
// methods

hideEditDialog(){
    this.editChercheurDialog  = false;
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get editChercheurDialog(): boolean {
           return this.chercheurService.editChercheurDialog;

       }
    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog = value;
       }

       get selectedEntiteAdministrative(): EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
      set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }
       get entiteAdministratives(): Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministratives;
       }
       set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }
       get createEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.createEntiteAdministrativeDialog;
       }
      set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog= value;
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
       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
      set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
       }
       get selectedCorps(): CorpsVo {
           return this.corpsService.selectedCorps;
       }
      set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
       get corpss(): Array<CorpsVo> {
           return this.corpsService.corpss;
       }
       set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }
       get createCorpsDialog(): boolean {
           return this.corpsService.createCorpsDialog;
       }
      set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog= value;
       }
       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get createDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
       }
      set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog= value;
       }
       get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes(): Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get createSexeDialog(): boolean {
           return this.sexeService.createSexeDialog;
       }
      set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
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
       get selectedCommissionScientifique(): CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
      set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }
       get commissionScientifiques(): Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiques;
       }
       set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }
       get createCommissionScientifiqueDialog(): boolean {
           return this.commissionScientifiqueService.createCommissionScientifiqueDialog;
       }
      set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog= value;
       }
       get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches(): Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get createIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.createIdentifiantRechercheDialog;
       }
      set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog= value;
       }
       get selectedGrade(): GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades(): Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get createGradeDialog(): boolean {
           return this.gradeService.createGradeDialog;
       }
      set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog= value;
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
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedDepartementScientifique(): DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
      set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }
       get departementScientifiques(): Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiques;
       }
       set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }
       get createDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.createDepartementScientifiqueDialog;
       }
      set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog= value;
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
       get selectedAffectationStructurelle(): AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
      set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }
       get affectationStructurelles(): Array<AffectationStructurelleVo> {
           return this.affectationStructurelleService.affectationStructurelles;
       }
       set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }
       get createAffectationStructurelleDialog(): boolean {
           return this.affectationStructurelleService.createAffectationStructurelleDialog;
       }
      set createAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.createAffectationStructurelleDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

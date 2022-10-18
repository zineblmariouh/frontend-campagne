import {Component, OnInit} from '@angular/core';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { AffectationStructurelleService } from '../../../../../controller/service/AffectationStructurelle.service';
import { EntiteAdministrativeService } from '../../../../../controller/service/EntiteAdministrative.service';
import { TypeEntiteAdministrativeService } from '../../../../../controller/service/TypeEntiteAdministrative.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { VilleService } from '../../../../../controller/service/Ville.service';
import { DepartementScientifiqueService } from '../../../../../controller/service/DepartementScientifique.service';
import { CommissionScientifiqueService } from '../../../../../controller/service/CommissionScientifique.service';
import { GradeService } from '../../../../../controller/service/Grade.service';
import { CorpsService } from '../../../../../controller/service/Corps.service';
import { SexeService } from '../../../../../controller/service/Sexe.service';

import {CommunauteSavoirChercheurVo} from '../../../../../controller/model/CommunauteSavoirChercheur.model';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {ZoneActiviteInteractionRechercheVo} from '../../../../../controller/model/ZoneActiviteInteractionRecherche.model';
import {GradeVo} from '../../../../../controller/model/Grade.model';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {IdentifiantAuteurExpertVo} from '../../../../../controller/model/IdentifiantAuteurExpert.model';
import {EnjeuxIrdChercheurVo} from '../../../../../controller/model/EnjeuxIrdChercheur.model';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {DisciplineScientifiqueChercheurVo} from '../../../../../controller/model/DisciplineScientifiqueChercheur.model';
import {VilleVo} from '../../../../../controller/model/Ville.model';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-chercheur-list-chercheur',
  templateUrl: './chercheur-list-chercheur.component.html',
  styleUrls: ['./chercheur-list-chercheur.component.css']
})
export class ChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Chercheur';
     yesOrNoConsentementRgpd :any[] =[];
     yesOrNoFormationEnManagement :any[] =[];
     yesOrNoCredentialsNonExpired :any[] =[];
     yesOrNoEnabled :any[] =[];
     yesOrNoAccountNonExpired :any[] =[];
     yesOrNoAccountNonLocked :any[] =[];
     yesOrNoPasswordChanged :any[] =[];
    affectationStructurelles :Array<AffectationStructurelleVo>;
    entiteAdministratives :Array<EntiteAdministrativeVo>;
    typeEntiteAdministratives :Array<TypeEntiteAdministrativeVo>;
    payss :Array<PaysVo>;
    villes :Array<VilleVo>;
    departementScientifiques :Array<DepartementScientifiqueVo>;
    commissionScientifiques :Array<CommissionScientifiqueVo>;
    grades :Array<GradeVo>;
    corpss :Array<CorpsVo>;
    sexes :Array<SexeVo>;


    constructor(private datePipe: DatePipe, private chercheurService: ChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private affectationStructurelleService: AffectationStructurelleService
        , private entiteAdministrativeService: EntiteAdministrativeService
        , private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
        , private paysService: PaysService
        , private villeService: VilleService
        , private departementScientifiqueService: DepartementScientifiqueService
        , private commissionScientifiqueService: CommissionScientifiqueService
        , private gradeService: GradeService
        , private corpsService: CorpsService
        , private sexeService: SexeService
) { }

    ngOnInit(): void {
      this.loadChercheurs();
      this.initExport();
      this.initCol();
      this.loadAffectationStructurelle();
      this.loadEntiteAdministrative();
      this.loadTypeEntiteAdministrative();
      this.loadPays();
      this.loadVille();
      this.loadDepartementScientifique();
      this.loadCommissionScientifique();
      this.loadGrade();
      this.loadCorps();
      this.loadSexe();
    this.yesOrNoConsentementRgpd =  [{label: 'ConsentementRgpd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoFormationEnManagement =  [{label: 'FormationEnManagement', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoCredentialsNonExpired =  [{label: 'CredentialsNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoEnabled =  [{label: 'Enabled', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonExpired =  [{label: 'AccountNonExpired', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAccountNonLocked =  [{label: 'AccountNonLocked', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoPasswordChanged =  [{label: 'PasswordChanged', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.chercheurService.findByCriteria(this.searchChercheur).subscribe(chercheurs=>{
            
            this.chercheurs = chercheurs;
           // this.searchChercheur = new ChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'consentementRgpd', header: 'Consentement rgpd'},
                            {field: 'numeroMatricule', header: 'Numero matricule'},
                            {field: 'emailPrincipale', header: 'Email principale'},
                        {field: 'affectationStructurelle?.libelleCourt', header: 'Affectation structurelle'},
                        {field: 'entiteAdministrative?.libelleCourt', header: 'Entite administrative'},
                        {field: 'typeEntiteAdministrative?.libelle', header: 'Type entite administrative'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'ville?.libelle', header: 'Ville'},
                        {field: 'departementScientifique?.libelle', header: 'Departement scientifique'},
                        {field: 'commissionScientifique?.libelleCourt', header: 'Commission scientifique'},
                        {field: 'grade?.libelle', header: 'Grade'},
                        {field: 'corps?.libelle', header: 'Corps'},
                        {field: 'sexe?.libelle', header: 'Sexe'},
                            {field: 'natureImplication', header: 'Nature implication'},
                            {field: 'formationEnManagement', header: 'Formation en management'},
                            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
                            {field: 'enabled', header: 'Enabled'},
                            {field: 'accountNonExpired', header: 'Account non expired'},
                            {field: 'accountNonLocked', header: 'Account non locked'},
                            {field: 'passwordChanged', header: 'Password changed'},
                            {field: 'createdAt', header: 'Created at'},
                            {field: 'updatedAt', header: 'Updated at'},
                            {field: 'username', header: 'Username'},
                            {field: 'password', header: 'Password'},
                            {field: 'prenom', header: 'Prenom'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'baseHorizon', header: 'Base horizon'},
                            {field: 'role', header: 'Role'},
        ];
    }
    
    public async editChercheur(chercheur:ChercheurVo){
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'edit');
         if(isPermistted){
          this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
           this.selectedChercheur = res;
            this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
            this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
            this.editChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewChercheur(chercheur:ChercheurVo){
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'view');
        if(isPermistted){
           this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(res => {
           this.selectedChercheur = res;
            this.selectedChercheur.createdAt = new Date(chercheur.createdAt);
            this.selectedChercheur.updatedAt = new Date(chercheur.updatedAt);
            this.viewChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
            this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteChercheur(chercheur:ChercheurVo){
       const isPermistted = await this.roleService.isPermitted('Chercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.chercheurService.delete(chercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.chercheurs.indexOf(chercheur);
                          position > -1 ? this.chercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Chercheur Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadAffectationStructurelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.affectationStructurelleService.findAll().subscribe(affectationStructurelles => this.affectationStructurelles = affectationStructurelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEntiteAdministrative(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.entiteAdministrativeService.findAll().subscribe(entiteAdministratives => this.entiteAdministratives = entiteAdministratives,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeEntiteAdministrative(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.typeEntiteAdministrativeService.findAll().subscribe(typeEntiteAdministratives => this.typeEntiteAdministratives = typeEntiteAdministratives,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadVille(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDepartementScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.departementScientifiqueService.findAll().subscribe(departementScientifiques => this.departementScientifiques = departementScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCommissionScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.commissionScientifiqueService.findAll().subscribe(commissionScientifiques => this.commissionScientifiques = commissionScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadGrade(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.gradeService.findAll().subscribe(grades => this.grades = grades,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCorps(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.corpsService.findAll().subscribe(corpss => this.corpss = corpss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSexe(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
    isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateChercheur(chercheur: ChercheurVo) {

     this.chercheurService.findByIdWithAssociatedList(chercheur).subscribe(
	 res => {
	       this.initDuplicateChercheur(res);
	       this.selectedChercheur = res;
	       this.selectedChercheur.id = null;
            this.createChercheurDialog = true;

});

	}

	initDuplicateChercheur(res: ChercheurVo) {
        if (res.chercheurEmailsVo != null) {
             res.chercheurEmailsVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueChercheursVo != null) {
             res.disciplineScientifiqueChercheursVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.zoneActiviteInteractionRecherchesVo != null) {
             res.zoneActiviteInteractionRecherchesVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.enjeuxIrdChercheursVo != null) {
             res.enjeuxIrdChercheursVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.communauteSavoirChercheursVo != null) {
             res.communauteSavoirChercheursVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.instrumentIrdChercheursVo != null) {
             res.instrumentIrdChercheursVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.typeInstrumentIrdChercheursVo != null) {
             res.typeInstrumentIrdChercheursVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }
        if (res.identifiantAuteurExpertsVo != null) {
             res.identifiantAuteurExpertsVo.forEach(d => { d.chercheurVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.chercheurs.map(e => {
    return {
                    'Consentement rgpd': e.consentementRgpd? 'Vrai' : 'Faux' ,
                    'Numero matricule': e.numeroMatricule ,
                    'Email principale': e.emailPrincipale ,
            'Affectation structurelle': e.affectationStructurelleVo?.libelleCourt ,
            'Entite administrative': e.entiteAdministrativeVo?.libelleCourt ,
            'Type entite administrative': e.typeEntiteAdministrativeVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
            'Ville': e.villeVo?.libelle ,
            'Departement scientifique': e.departementScientifiqueVo?.libelle ,
            'Commission scientifique': e.commissionScientifiqueVo?.libelleCourt ,
            'Grade': e.gradeVo?.libelle ,
            'Corps': e.corpsVo?.libelle ,
            'Sexe': e.sexeVo?.libelle ,
                    'Resume': e.resume ,
                    'Nature implication': e.natureImplication ,
                    'Formation en management': e.formationEnManagement? 'Vrai' : 'Faux' ,
                    'Credentials non expired': e.credentialsNonExpired? 'Vrai' : 'Faux' ,
                    'Enabled': e.enabled? 'Vrai' : 'Faux' ,
                    'Account non expired': e.accountNonExpired? 'Vrai' : 'Faux' ,
                    'Account non locked': e.accountNonLocked? 'Vrai' : 'Faux' ,
                    'Password changed': e.passwordChanged? 'Vrai' : 'Faux' ,
                    'Created at': this.datePipe.transform(e.createdAt , 'dd-MM-yyyy'),
                    'Updated at': this.datePipe.transform(e.updatedAt , 'dd-MM-yyyy'),
                    'Username': e.username ,
                    'Password': e.password ,
                    'Prenom': e.prenom ,
                    'Nom': e.nom ,
                    'Base horizon': e.baseHorizon ,
                    'Role': e.role ,
     }
      });

      this.criteriaData = [{
            'Consentement rgpd': this.searchChercheur.consentementRgpd ? (this.searchChercheur.consentementRgpd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Numero matricule': this.searchChercheur.numeroMatricule ? this.searchChercheur.numeroMatricule : environment.emptyForExport ,
            'Email principale': this.searchChercheur.emailPrincipale ? this.searchChercheur.emailPrincipale : environment.emptyForExport ,
        'Affectation structurelle': this.searchChercheur.affectationStructurelleVo?.libelleCourt ? this.searchChercheur.affectationStructurelleVo?.libelleCourt : environment.emptyForExport ,
        'Entite administrative': this.searchChercheur.entiteAdministrativeVo?.libelleCourt ? this.searchChercheur.entiteAdministrativeVo?.libelleCourt : environment.emptyForExport ,
        'Type entite administrative': this.searchChercheur.typeEntiteAdministrativeVo?.libelle ? this.searchChercheur.typeEntiteAdministrativeVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchChercheur.paysVo?.libelle ? this.searchChercheur.paysVo?.libelle : environment.emptyForExport ,
        'Ville': this.searchChercheur.villeVo?.libelle ? this.searchChercheur.villeVo?.libelle : environment.emptyForExport ,
        'Departement scientifique': this.searchChercheur.departementScientifiqueVo?.libelle ? this.searchChercheur.departementScientifiqueVo?.libelle : environment.emptyForExport ,
        'Commission scientifique': this.searchChercheur.commissionScientifiqueVo?.libelleCourt ? this.searchChercheur.commissionScientifiqueVo?.libelleCourt : environment.emptyForExport ,
        'Grade': this.searchChercheur.gradeVo?.libelle ? this.searchChercheur.gradeVo?.libelle : environment.emptyForExport ,
        'Corps': this.searchChercheur.corpsVo?.libelle ? this.searchChercheur.corpsVo?.libelle : environment.emptyForExport ,
        'Sexe': this.searchChercheur.sexeVo?.libelle ? this.searchChercheur.sexeVo?.libelle : environment.emptyForExport ,
            'Resume': this.searchChercheur.resume ? this.searchChercheur.resume : environment.emptyForExport ,
            'Nature implication': this.searchChercheur.natureImplication ? this.searchChercheur.natureImplication : environment.emptyForExport ,
            'Formation en management': this.searchChercheur.formationEnManagement ? (this.searchChercheur.formationEnManagement ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Credentials non expired': this.searchChercheur.credentialsNonExpired ? (this.searchChercheur.credentialsNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Enabled': this.searchChercheur.enabled ? (this.searchChercheur.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non expired': this.searchChercheur.accountNonExpired ? (this.searchChercheur.accountNonExpired ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Account non locked': this.searchChercheur.accountNonLocked ? (this.searchChercheur.accountNonLocked ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Password changed': this.searchChercheur.passwordChanged ? (this.searchChercheur.passwordChanged ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Created at Min': this.searchChercheur.createdAtMin ? this.datePipe.transform(this.searchChercheur.createdAtMin , this.dateFormat) : environment.emptyForExport ,
            'Created at Max': this.searchChercheur.createdAtMax ? this.datePipe.transform(this.searchChercheur.createdAtMax , this.dateFormat) : environment.emptyForExport ,
            'Updated at Min': this.searchChercheur.updatedAtMin ? this.datePipe.transform(this.searchChercheur.updatedAtMin , this.dateFormat) : environment.emptyForExport ,
            'Updated at Max': this.searchChercheur.updatedAtMax ? this.datePipe.transform(this.searchChercheur.updatedAtMax , this.dateFormat) : environment.emptyForExport ,
            'Username': this.searchChercheur.username ? this.searchChercheur.username : environment.emptyForExport ,
            'Password': this.searchChercheur.password ? this.searchChercheur.password : environment.emptyForExport ,
            'Prenom': this.searchChercheur.prenom ? this.searchChercheur.prenom : environment.emptyForExport ,
            'Nom': this.searchChercheur.nom ? this.searchChercheur.nom : environment.emptyForExport ,
            'Base horizon': this.searchChercheur.baseHorizon ? this.searchChercheur.baseHorizon : environment.emptyForExport ,
            'Role': this.searchChercheur.role ? this.searchChercheur.role : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

    get chercheurSelections(): Array<ChercheurVo> {
           return this.chercheurService.chercheurSelections;
       }
    set chercheurSelections(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurSelections = value;
       }
   
     


    get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
    
    get createChercheurDialog():boolean {
           return this.chercheurService.createChercheurDialog;
       }
    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
    
    get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }
    get viewChercheurDialog():boolean {
           return this.chercheurService.viewChercheurDialog;
       }
    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog = value;
       }
       
     get searchChercheur(): ChercheurVo {
        return this.chercheurService.searchChercheur;
       }
    set searchChercheur(value: ChercheurVo) {
        this.chercheurService.searchChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

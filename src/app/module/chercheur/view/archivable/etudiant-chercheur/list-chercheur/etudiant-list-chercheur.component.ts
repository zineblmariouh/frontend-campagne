import {Component, OnInit} from '@angular/core';
import {EtudiantService} from '../../../../../controller/service/Etudiant.service';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SexeService } from '../../../../../controller/service/Sexe.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etudiant-list-chercheur',
  templateUrl: './etudiant-list-chercheur.component.html',
  styleUrls: ['./etudiant-list-chercheur.component.css']
})
export class EtudiantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Etudiant';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    sexes :Array<SexeVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private etudiantService: EtudiantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private sexeService: SexeService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadEtudiants();
      this.initExport();
      this.initCol();
      this.loadSexe();
      this.loadPays();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtudiants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
        isPermistted ? this.etudiantService.findAll().subscribe(etudiants => this.etudiants = etudiants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etudiantService.findByCriteria(this.searchEtudiant).subscribe(etudiants=>{
            
            this.etudiants = etudiants;
           // this.searchEtudiant = new EtudiantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                        {field: 'sexe?.libelle', header: 'Sexe'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'anneeNaissance', header: 'Annee naissance'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEtudiant(etudiant:EtudiantVo){
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'edit');
         if(isPermistted){
          this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(res => {
           this.selectedEtudiant = res;
            this.selectedEtudiant.dateArchivage = new Date(etudiant.dateArchivage);
            this.selectedEtudiant.dateCreation = new Date(etudiant.dateCreation);
            this.editEtudiantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtudiant(etudiant:EtudiantVo){
        const isPermistted = await this.roleService.isPermitted('Etudiant', 'view');
        if(isPermistted){
           this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(res => {
           this.selectedEtudiant = res;
            this.selectedEtudiant.dateArchivage = new Date(etudiant.dateArchivage);
            this.selectedEtudiant.dateCreation = new Date(etudiant.dateCreation);
            this.viewEtudiantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtudiant = new EtudiantVo();
            this.createEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtudiant(etudiant:EtudiantVo){
       const isPermistted = await this.roleService.isPermitted('Etudiant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etudiant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etudiantService.delete(etudiant).subscribe(status=>{
                          if(status > 0){
                          const position = this.etudiants.indexOf(etudiant);
                          position > -1 ? this.etudiants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etudiant Supprimé',
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

public async loadSexe(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
    isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Etudiant', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtudiant(etudiant: EtudiantVo) {

     this.etudiantService.findByIdWithAssociatedList(etudiant).subscribe(
	 res => {
	       this.initDuplicateEtudiant(res);
	       this.selectedEtudiant = res;
	       this.selectedEtudiant.id = null;
            this.createEtudiantDialog = true;

});

	}

	initDuplicateEtudiant(res: EtudiantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etudiants.map(e => {
    return {
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
            'Sexe': e.sexeVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
                    'Annee naissance': e.anneeNaissance ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Nom': this.searchEtudiant.nom ? this.searchEtudiant.nom : environment.emptyForExport ,
            'Prenom': this.searchEtudiant.prenom ? this.searchEtudiant.prenom : environment.emptyForExport ,
        'Sexe': this.searchEtudiant.sexeVo?.libelle ? this.searchEtudiant.sexeVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchEtudiant.paysVo?.libelle ? this.searchEtudiant.paysVo?.libelle : environment.emptyForExport ,
            'Annee naissance Min': this.searchEtudiant.anneeNaissanceMin ? this.searchEtudiant.anneeNaissanceMin : environment.emptyForExport ,
            'Annee naissance Max': this.searchEtudiant.anneeNaissanceMax ? this.searchEtudiant.anneeNaissanceMax : environment.emptyForExport ,
            'Archive': this.searchEtudiant.archive ? (this.searchEtudiant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtudiant.dateArchivageMin ? this.datePipe.transform(this.searchEtudiant.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtudiant.dateArchivageMax ? this.datePipe.transform(this.searchEtudiant.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtudiant.dateCreationMin ? this.datePipe.transform(this.searchEtudiant.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtudiant.dateCreationMax ? this.datePipe.transform(this.searchEtudiant.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtudiant.admin ? (this.searchEtudiant.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtudiant.visible ? (this.searchEtudiant.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtudiant.username ? this.searchEtudiant.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etudiants(): Array<EtudiantVo> {
           return this.etudiantService.etudiants;
       }
    set etudiants(value: Array<EtudiantVo>) {
        this.etudiantService.etudiants = value;
       }

    get etudiantSelections(): Array<EtudiantVo> {
           return this.etudiantService.etudiantSelections;
       }
    set etudiantSelections(value: Array<EtudiantVo>) {
        this.etudiantService.etudiantSelections = value;
       }
   
     


    get selectedEtudiant():EtudiantVo {
           return this.etudiantService.selectedEtudiant;
       }
    set selectedEtudiant(value: EtudiantVo) {
        this.etudiantService.selectedEtudiant = value;
       }
    
    get createEtudiantDialog():boolean {
           return this.etudiantService.createEtudiantDialog;
       }
    set createEtudiantDialog(value: boolean) {
        this.etudiantService.createEtudiantDialog= value;
       }
    
    get editEtudiantDialog():boolean {
           return this.etudiantService.editEtudiantDialog;
       }
    set editEtudiantDialog(value: boolean) {
        this.etudiantService.editEtudiantDialog= value;
       }
    get viewEtudiantDialog():boolean {
           return this.etudiantService.viewEtudiantDialog;
       }
    set viewEtudiantDialog(value: boolean) {
        this.etudiantService.viewEtudiantDialog = value;
       }
       
     get searchEtudiant(): EtudiantVo {
        return this.etudiantService.searchEtudiant;
       }
    set searchEtudiant(value: EtudiantVo) {
        this.etudiantService.searchEtudiant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-responsabilite-direction-encadrement-etudiant-list-chercheur',
  templateUrl: './responsabilite-direction-encadrement-etudiant-list-chercheur.component.html',
  styleUrls: ['./responsabilite-direction-encadrement-etudiant-list-chercheur.component.css']
})
export class ResponsabiliteDirectionEncadrementEtudiantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabiliteDirectionEncadrementEtudiant';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadResponsabiliteDirectionEncadrementEtudiants();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadResponsabiliteDirectionEncadrementEtudiants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'list');
        isPermistted ? this.responsabiliteDirectionEncadrementEtudiantService.findAll().subscribe(responsabiliteDirectionEncadrementEtudiants => this.responsabiliteDirectionEncadrementEtudiants = responsabiliteDirectionEncadrementEtudiants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.responsabiliteDirectionEncadrementEtudiantService.findByCriteria(this.searchResponsabiliteDirectionEncadrementEtudiant).subscribe(responsabiliteDirectionEncadrementEtudiants=>{
            
            this.responsabiliteDirectionEncadrementEtudiants = responsabiliteDirectionEncadrementEtudiants;
           // this.searchResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editResponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'edit');
         if(isPermistted){
          this.responsabiliteDirectionEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteDirectionEncadrementEtudiant).subscribe(res => {
           this.selectedResponsabiliteDirectionEncadrementEtudiant = res;
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateArchivage = new Date(responsabiliteDirectionEncadrementEtudiant.dateArchivage);
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateCreation = new Date(responsabiliteDirectionEncadrementEtudiant.dateCreation);
            this.editResponsabiliteDirectionEncadrementEtudiantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewResponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'view');
        if(isPermistted){
           this.responsabiliteDirectionEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteDirectionEncadrementEtudiant).subscribe(res => {
           this.selectedResponsabiliteDirectionEncadrementEtudiant = res;
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateArchivage = new Date(responsabiliteDirectionEncadrementEtudiant.dateArchivage);
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateCreation = new Date(responsabiliteDirectionEncadrementEtudiant.dateCreation);
            this.viewResponsabiliteDirectionEncadrementEtudiantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateResponsabiliteDirectionEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();
            this.createResponsabiliteDirectionEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteResponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant:ResponsabiliteDirectionEncadrementEtudiantVo){
       const isPermistted = await this.roleService.isPermitted('ResponsabiliteDirectionEncadrementEtudiant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Responsabilite direction encadrement etudiant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.responsabiliteDirectionEncadrementEtudiantService.delete(responsabiliteDirectionEncadrementEtudiant).subscribe(status=>{
                          if(status > 0){
                          const position = this.responsabiliteDirectionEncadrementEtudiants.indexOf(responsabiliteDirectionEncadrementEtudiant);
                          position > -1 ? this.responsabiliteDirectionEncadrementEtudiants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Responsabilite direction encadrement etudiant Supprimé',
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


public async duplicateResponsabiliteDirectionEncadrementEtudiant(responsabiliteDirectionEncadrementEtudiant: ResponsabiliteDirectionEncadrementEtudiantVo) {

     this.responsabiliteDirectionEncadrementEtudiantService.findByIdWithAssociatedList(responsabiliteDirectionEncadrementEtudiant).subscribe(
	 res => {
	       this.initDuplicateResponsabiliteDirectionEncadrementEtudiant(res);
	       this.selectedResponsabiliteDirectionEncadrementEtudiant = res;
	       this.selectedResponsabiliteDirectionEncadrementEtudiant.id = null;
            this.createResponsabiliteDirectionEncadrementEtudiantDialog = true;

});

	}

	initDuplicateResponsabiliteDirectionEncadrementEtudiant(res: ResponsabiliteDirectionEncadrementEtudiantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.responsabiliteDirectionEncadrementEtudiants.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchResponsabiliteDirectionEncadrementEtudiant.libelle ? this.searchResponsabiliteDirectionEncadrementEtudiant.libelle : environment.emptyForExport ,
            'Code': this.searchResponsabiliteDirectionEncadrementEtudiant.code ? this.searchResponsabiliteDirectionEncadrementEtudiant.code : environment.emptyForExport ,
            'Archive': this.searchResponsabiliteDirectionEncadrementEtudiant.archive ? (this.searchResponsabiliteDirectionEncadrementEtudiant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchResponsabiliteDirectionEncadrementEtudiant.dateArchivageMin ? this.datePipe.transform(this.searchResponsabiliteDirectionEncadrementEtudiant.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchResponsabiliteDirectionEncadrementEtudiant.dateArchivageMax ? this.datePipe.transform(this.searchResponsabiliteDirectionEncadrementEtudiant.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchResponsabiliteDirectionEncadrementEtudiant.dateCreationMin ? this.datePipe.transform(this.searchResponsabiliteDirectionEncadrementEtudiant.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchResponsabiliteDirectionEncadrementEtudiant.dateCreationMax ? this.datePipe.transform(this.searchResponsabiliteDirectionEncadrementEtudiant.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchResponsabiliteDirectionEncadrementEtudiant.admin ? (this.searchResponsabiliteDirectionEncadrementEtudiant.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchResponsabiliteDirectionEncadrementEtudiant.visible ? (this.searchResponsabiliteDirectionEncadrementEtudiant.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchResponsabiliteDirectionEncadrementEtudiant.username ? this.searchResponsabiliteDirectionEncadrementEtudiant.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
    set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }

    get responsabiliteDirectionEncadrementEtudiantSelections(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
           return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiantSelections;
       }
    set responsabiliteDirectionEncadrementEtudiantSelections(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiantSelections = value;
       }
   
     


    get selectedResponsabiliteDirectionEncadrementEtudiant():ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
    set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }
    
    get createResponsabiliteDirectionEncadrementEtudiantDialog():boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog;
       }
    set createResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }
    
    get editResponsabiliteDirectionEncadrementEtudiantDialog():boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog;
       }
    set editResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }
    get viewResponsabiliteDirectionEncadrementEtudiantDialog():boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.viewResponsabiliteDirectionEncadrementEtudiantDialog;
       }
    set viewResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.viewResponsabiliteDirectionEncadrementEtudiantDialog = value;
       }
       
     get searchResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
        return this.responsabiliteDirectionEncadrementEtudiantService.searchResponsabiliteDirectionEncadrementEtudiant;
       }
    set searchResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.searchResponsabiliteDirectionEncadrementEtudiant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

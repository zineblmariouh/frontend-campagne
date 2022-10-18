import {Component, OnInit} from '@angular/core';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
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
  selector: 'app-modalite-intervention-list-admin',
  templateUrl: './modalite-intervention-list-admin.component.html',
  styleUrls: ['./modalite-intervention-list-admin.component.css']
})
export class ModaliteInterventionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ModaliteIntervention';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadModaliteInterventions();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModaliteInterventions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'list');
        isPermistted ? this.modaliteInterventionService.findAll().subscribe(modaliteInterventions => this.modaliteInterventions = modaliteInterventions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modaliteInterventionService.findByCriteria(this.searchModaliteIntervention).subscribe(modaliteInterventions=>{
            
            this.modaliteInterventions = modaliteInterventions;
           // this.searchModaliteIntervention = new ModaliteInterventionVo();
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
    
    public async editModaliteIntervention(modaliteIntervention:ModaliteInterventionVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'edit');
         if(isPermistted){
          this.modaliteInterventionService.findByIdWithAssociatedList(modaliteIntervention).subscribe(res => {
           this.selectedModaliteIntervention = res;
            this.selectedModaliteIntervention.dateArchivage = new Date(modaliteIntervention.dateArchivage);
            this.selectedModaliteIntervention.dateCreation = new Date(modaliteIntervention.dateCreation);
            this.editModaliteInterventionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModaliteIntervention(modaliteIntervention:ModaliteInterventionVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'view');
        if(isPermistted){
           this.modaliteInterventionService.findByIdWithAssociatedList(modaliteIntervention).subscribe(res => {
           this.selectedModaliteIntervention = res;
            this.selectedModaliteIntervention.dateArchivage = new Date(modaliteIntervention.dateArchivage);
            this.selectedModaliteIntervention.dateCreation = new Date(modaliteIntervention.dateCreation);
            this.viewModaliteInterventionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModaliteIntervention(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModaliteIntervention = new ModaliteInterventionVo();
            this.createModaliteInterventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverModaliteIntervention(modaliteIntervention:ModaliteInterventionVo){
const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Modalite intervention) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteInterventionService.archiver(modaliteIntervention).subscribe(status=>{
const myIndex = this.modaliteInterventions.indexOf(modaliteIntervention);
this.modaliteInterventions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite intervention archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverModaliteIntervention(modaliteIntervention:ModaliteInterventionVo){
const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Modalite intervention) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteInterventionService.desarchiver(modaliteIntervention).subscribe(status=>{
const myIndex = this.modaliteInterventions.indexOf(modaliteIntervention);
this.modaliteInterventions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite intervention désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteModaliteIntervention(modaliteIntervention:ModaliteInterventionVo){
       const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Modalite intervention) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modaliteInterventionService.delete(modaliteIntervention).subscribe(status=>{
                          if(status > 0){
                          const position = this.modaliteInterventions.indexOf(modaliteIntervention);
                          position > -1 ? this.modaliteInterventions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Modalite intervention Supprimé',
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


public async duplicateModaliteIntervention(modaliteIntervention: ModaliteInterventionVo) {

     this.modaliteInterventionService.findByIdWithAssociatedList(modaliteIntervention).subscribe(
	 res => {
	       this.initDuplicateModaliteIntervention(res);
	       this.selectedModaliteIntervention = res;
	       this.selectedModaliteIntervention.id = null;
            this.createModaliteInterventionDialog = true;

});

	}

	initDuplicateModaliteIntervention(res: ModaliteInterventionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.modaliteInterventions.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchModaliteIntervention.libelle ? this.searchModaliteIntervention.libelle : environment.emptyForExport ,
            'Code': this.searchModaliteIntervention.code ? this.searchModaliteIntervention.code : environment.emptyForExport ,
            'Description': this.searchModaliteIntervention.description ? this.searchModaliteIntervention.description : environment.emptyForExport ,
            'Archive': this.searchModaliteIntervention.archive ? (this.searchModaliteIntervention.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModaliteIntervention.dateArchivageMin ? this.datePipe.transform(this.searchModaliteIntervention.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModaliteIntervention.dateArchivageMax ? this.datePipe.transform(this.searchModaliteIntervention.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModaliteIntervention.dateCreationMin ? this.datePipe.transform(this.searchModaliteIntervention.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModaliteIntervention.dateCreationMax ? this.datePipe.transform(this.searchModaliteIntervention.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchModaliteIntervention.admin ? (this.searchModaliteIntervention.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchModaliteIntervention.visible ? (this.searchModaliteIntervention.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchModaliteIntervention.username ? this.searchModaliteIntervention.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modaliteInterventions(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
    set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }

    get modaliteInterventionSelections(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventionSelections;
       }
    set modaliteInterventionSelections(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventionSelections = value;
       }
   
     


    get selectedModaliteIntervention():ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
    
    get createModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;
       }
    set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
       }
    
    get editModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.editModaliteInterventionDialog;
       }
    set editModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.editModaliteInterventionDialog= value;
       }
    get viewModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.viewModaliteInterventionDialog;
       }
    set viewModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.viewModaliteInterventionDialog = value;
       }
       
     get searchModaliteIntervention(): ModaliteInterventionVo {
        return this.modaliteInterventionService.searchModaliteIntervention;
       }
    set searchModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.searchModaliteIntervention = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

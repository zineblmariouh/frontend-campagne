import {Component, OnInit} from '@angular/core';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
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
  selector: 'app-modalite-formation-continue-list-admin',
  templateUrl: './modalite-formation-continue-list-admin.component.html',
  styleUrls: ['./modalite-formation-continue-list-admin.component.css']
})
export class ModaliteFormationContinueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ModaliteFormationContinue';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private modaliteFormationContinueService: ModaliteFormationContinueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadModaliteFormationContinues();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModaliteFormationContinues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'list');
        isPermistted ? this.modaliteFormationContinueService.findAll().subscribe(modaliteFormationContinues => this.modaliteFormationContinues = modaliteFormationContinues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modaliteFormationContinueService.findByCriteria(this.searchModaliteFormationContinue).subscribe(modaliteFormationContinues=>{
            
            this.modaliteFormationContinues = modaliteFormationContinues;
           // this.searchModaliteFormationContinue = new ModaliteFormationContinueVo();
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
    
    public async editModaliteFormationContinue(modaliteFormationContinue:ModaliteFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'edit');
         if(isPermistted){
          this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(res => {
           this.selectedModaliteFormationContinue = res;
            this.selectedModaliteFormationContinue.dateArchivage = new Date(modaliteFormationContinue.dateArchivage);
            this.selectedModaliteFormationContinue.dateCreation = new Date(modaliteFormationContinue.dateCreation);
            this.editModaliteFormationContinueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModaliteFormationContinue(modaliteFormationContinue:ModaliteFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'view');
        if(isPermistted){
           this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(res => {
           this.selectedModaliteFormationContinue = res;
            this.selectedModaliteFormationContinue.dateArchivage = new Date(modaliteFormationContinue.dateArchivage);
            this.selectedModaliteFormationContinue.dateCreation = new Date(modaliteFormationContinue.dateCreation);
            this.viewModaliteFormationContinueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModaliteFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();
            this.createModaliteFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverModaliteFormationContinue(modaliteFormationContinue:ModaliteFormationContinueVo){
const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Modalite formation continue) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteFormationContinueService.archiver(modaliteFormationContinue).subscribe(status=>{
const myIndex = this.modaliteFormationContinues.indexOf(modaliteFormationContinue);
this.modaliteFormationContinues[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite formation continue archivé',
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

public async desarchiverModaliteFormationContinue(modaliteFormationContinue:ModaliteFormationContinueVo){
const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Modalite formation continue) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteFormationContinueService.desarchiver(modaliteFormationContinue).subscribe(status=>{
const myIndex = this.modaliteFormationContinues.indexOf(modaliteFormationContinue);
this.modaliteFormationContinues[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite formation continue désarchivé',
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


    public async deleteModaliteFormationContinue(modaliteFormationContinue:ModaliteFormationContinueVo){
       const isPermistted = await this.roleService.isPermitted('ModaliteFormationContinue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Modalite formation continue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modaliteFormationContinueService.delete(modaliteFormationContinue).subscribe(status=>{
                          if(status > 0){
                          const position = this.modaliteFormationContinues.indexOf(modaliteFormationContinue);
                          position > -1 ? this.modaliteFormationContinues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Modalite formation continue Supprimé',
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


public async duplicateModaliteFormationContinue(modaliteFormationContinue: ModaliteFormationContinueVo) {

     this.modaliteFormationContinueService.findByIdWithAssociatedList(modaliteFormationContinue).subscribe(
	 res => {
	       this.initDuplicateModaliteFormationContinue(res);
	       this.selectedModaliteFormationContinue = res;
	       this.selectedModaliteFormationContinue.id = null;
            this.createModaliteFormationContinueDialog = true;

});

	}

	initDuplicateModaliteFormationContinue(res: ModaliteFormationContinueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.modaliteFormationContinues.map(e => {
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
            'Libelle': this.searchModaliteFormationContinue.libelle ? this.searchModaliteFormationContinue.libelle : environment.emptyForExport ,
            'Code': this.searchModaliteFormationContinue.code ? this.searchModaliteFormationContinue.code : environment.emptyForExport ,
            'Archive': this.searchModaliteFormationContinue.archive ? (this.searchModaliteFormationContinue.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModaliteFormationContinue.dateArchivageMin ? this.datePipe.transform(this.searchModaliteFormationContinue.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModaliteFormationContinue.dateArchivageMax ? this.datePipe.transform(this.searchModaliteFormationContinue.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModaliteFormationContinue.dateCreationMin ? this.datePipe.transform(this.searchModaliteFormationContinue.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModaliteFormationContinue.dateCreationMax ? this.datePipe.transform(this.searchModaliteFormationContinue.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchModaliteFormationContinue.admin ? (this.searchModaliteFormationContinue.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchModaliteFormationContinue.visible ? (this.searchModaliteFormationContinue.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchModaliteFormationContinue.username ? this.searchModaliteFormationContinue.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
    set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }

    get modaliteFormationContinueSelections(): Array<ModaliteFormationContinueVo> {
           return this.modaliteFormationContinueService.modaliteFormationContinueSelections;
       }
    set modaliteFormationContinueSelections(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinueSelections = value;
       }
   
     


    get selectedModaliteFormationContinue():ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }
    
    get createModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.createModaliteFormationContinueDialog;
       }
    set createModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.createModaliteFormationContinueDialog= value;
       }
    
    get editModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;
       }
    set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog= value;
       }
    get viewModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.viewModaliteFormationContinueDialog;
       }
    set viewModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.viewModaliteFormationContinueDialog = value;
       }
       
     get searchModaliteFormationContinue(): ModaliteFormationContinueVo {
        return this.modaliteFormationContinueService.searchModaliteFormationContinue;
       }
    set searchModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.searchModaliteFormationContinue = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

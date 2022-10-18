import {Component, OnInit} from '@angular/core';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
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
  selector: 'app-modalite-list-admin',
  templateUrl: './modalite-list-admin.component.html',
  styleUrls: ['./modalite-list-admin.component.css']
})
export class ModaliteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Modalite';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private modaliteService: ModaliteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadModalites();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModalites(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Modalite', 'list');
        isPermistted ? this.modaliteService.findAll().subscribe(modalites => this.modalites = modalites,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modaliteService.findByCriteria(this.searchModalite).subscribe(modalites=>{
            
            this.modalites = modalites;
           // this.searchModalite = new ModaliteVo();
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
    
    public async editModalite(modalite:ModaliteVo){
        const isPermistted = await this.roleService.isPermitted('Modalite', 'edit');
         if(isPermistted){
          this.modaliteService.findByIdWithAssociatedList(modalite).subscribe(res => {
           this.selectedModalite = res;
            this.selectedModalite.dateArchivage = new Date(modalite.dateArchivage);
            this.selectedModalite.dateCreation = new Date(modalite.dateCreation);
            this.editModaliteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModalite(modalite:ModaliteVo){
        const isPermistted = await this.roleService.isPermitted('Modalite', 'view');
        if(isPermistted){
           this.modaliteService.findByIdWithAssociatedList(modalite).subscribe(res => {
           this.selectedModalite = res;
            this.selectedModalite.dateArchivage = new Date(modalite.dateArchivage);
            this.selectedModalite.dateCreation = new Date(modalite.dateCreation);
            this.viewModaliteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModalite(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModalite = new ModaliteVo();
            this.createModaliteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverModalite(modalite:ModaliteVo){
const isPermistted = await this.roleService.isPermitted('Modalite', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Modalite) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteService.archiver(modalite).subscribe(status=>{
const myIndex = this.modalites.indexOf(modalite);
this.modalites[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite archivé',
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

public async desarchiverModalite(modalite:ModaliteVo){
const isPermistted = await this.roleService.isPermitted('Modalite', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Modalite) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modaliteService.desarchiver(modalite).subscribe(status=>{
const myIndex = this.modalites.indexOf(modalite);
this.modalites[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Modalite désarchivé',
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


    public async deleteModalite(modalite:ModaliteVo){
       const isPermistted = await this.roleService.isPermitted('Modalite', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Modalite) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modaliteService.delete(modalite).subscribe(status=>{
                          if(status > 0){
                          const position = this.modalites.indexOf(modalite);
                          position > -1 ? this.modalites.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Modalite Supprimé',
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


public async duplicateModalite(modalite: ModaliteVo) {

     this.modaliteService.findByIdWithAssociatedList(modalite).subscribe(
	 res => {
	       this.initDuplicateModalite(res);
	       this.selectedModalite = res;
	       this.selectedModalite.id = null;
            this.createModaliteDialog = true;

});

	}

	initDuplicateModalite(res: ModaliteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.modalites.map(e => {
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
            'Libelle': this.searchModalite.libelle ? this.searchModalite.libelle : environment.emptyForExport ,
            'Code': this.searchModalite.code ? this.searchModalite.code : environment.emptyForExport ,
            'Archive': this.searchModalite.archive ? (this.searchModalite.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModalite.dateArchivageMin ? this.datePipe.transform(this.searchModalite.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModalite.dateArchivageMax ? this.datePipe.transform(this.searchModalite.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModalite.dateCreationMin ? this.datePipe.transform(this.searchModalite.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModalite.dateCreationMax ? this.datePipe.transform(this.searchModalite.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchModalite.admin ? (this.searchModalite.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchModalite.visible ? (this.searchModalite.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchModalite.username ? this.searchModalite.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modalites(): Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
    set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

    get modaliteSelections(): Array<ModaliteVo> {
           return this.modaliteService.modaliteSelections;
       }
    set modaliteSelections(value: Array<ModaliteVo>) {
        this.modaliteService.modaliteSelections = value;
       }
   
     


    get selectedModalite():ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
    
    get createModaliteDialog():boolean {
           return this.modaliteService.createModaliteDialog;
       }
    set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
       }
    
    get editModaliteDialog():boolean {
           return this.modaliteService.editModaliteDialog;
       }
    set editModaliteDialog(value: boolean) {
        this.modaliteService.editModaliteDialog= value;
       }
    get viewModaliteDialog():boolean {
           return this.modaliteService.viewModaliteDialog;
       }
    set viewModaliteDialog(value: boolean) {
        this.modaliteService.viewModaliteDialog = value;
       }
       
     get searchModalite(): ModaliteVo {
        return this.modaliteService.searchModalite;
       }
    set searchModalite(value: ModaliteVo) {
        this.modaliteService.searchModalite = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

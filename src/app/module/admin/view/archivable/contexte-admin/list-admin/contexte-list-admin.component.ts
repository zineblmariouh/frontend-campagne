import {Component, OnInit} from '@angular/core';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
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
  selector: 'app-contexte-list-admin',
  templateUrl: './contexte-list-admin.component.html',
  styleUrls: ['./contexte-list-admin.component.css']
})
export class ContexteListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Contexte';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private contexteService: ContexteService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadContextes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadContextes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Contexte', 'list');
        isPermistted ? this.contexteService.findAll().subscribe(contextes => this.contextes = contextes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.contexteService.findByCriteria(this.searchContexte).subscribe(contextes=>{
            
            this.contextes = contextes;
           // this.searchContexte = new ContexteVo();
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
    
    public async editContexte(contexte:ContexteVo){
        const isPermistted = await this.roleService.isPermitted('Contexte', 'edit');
         if(isPermistted){
          this.contexteService.findByIdWithAssociatedList(contexte).subscribe(res => {
           this.selectedContexte = res;
            this.selectedContexte.dateArchivage = new Date(contexte.dateArchivage);
            this.selectedContexte.dateCreation = new Date(contexte.dateCreation);
            this.editContexteDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewContexte(contexte:ContexteVo){
        const isPermistted = await this.roleService.isPermitted('Contexte', 'view');
        if(isPermistted){
           this.contexteService.findByIdWithAssociatedList(contexte).subscribe(res => {
           this.selectedContexte = res;
            this.selectedContexte.dateArchivage = new Date(contexte.dateArchivage);
            this.selectedContexte.dateCreation = new Date(contexte.dateCreation);
            this.viewContexteDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateContexte(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedContexte = new ContexteVo();
            this.createContexteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverContexte(contexte:ContexteVo){
const isPermistted = await this.roleService.isPermitted('Contexte', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Contexte) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.contexteService.archiver(contexte).subscribe(status=>{
const myIndex = this.contextes.indexOf(contexte);
this.contextes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Contexte archivé',
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

public async desarchiverContexte(contexte:ContexteVo){
const isPermistted = await this.roleService.isPermitted('Contexte', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Contexte) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.contexteService.desarchiver(contexte).subscribe(status=>{
const myIndex = this.contextes.indexOf(contexte);
this.contextes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Contexte désarchivé',
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


    public async deleteContexte(contexte:ContexteVo){
       const isPermistted = await this.roleService.isPermitted('Contexte', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Contexte) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.contexteService.delete(contexte).subscribe(status=>{
                          if(status > 0){
                          const position = this.contextes.indexOf(contexte);
                          position > -1 ? this.contextes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Contexte Supprimé',
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


public async duplicateContexte(contexte: ContexteVo) {

     this.contexteService.findByIdWithAssociatedList(contexte).subscribe(
	 res => {
	       this.initDuplicateContexte(res);
	       this.selectedContexte = res;
	       this.selectedContexte.id = null;
            this.createContexteDialog = true;

});

	}

	initDuplicateContexte(res: ContexteVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.contextes.map(e => {
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
            'Libelle': this.searchContexte.libelle ? this.searchContexte.libelle : environment.emptyForExport ,
            'Code': this.searchContexte.code ? this.searchContexte.code : environment.emptyForExport ,
            'Archive': this.searchContexte.archive ? (this.searchContexte.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchContexte.dateArchivageMin ? this.datePipe.transform(this.searchContexte.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchContexte.dateArchivageMax ? this.datePipe.transform(this.searchContexte.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchContexte.dateCreationMin ? this.datePipe.transform(this.searchContexte.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchContexte.dateCreationMax ? this.datePipe.transform(this.searchContexte.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchContexte.admin ? (this.searchContexte.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchContexte.visible ? (this.searchContexte.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchContexte.username ? this.searchContexte.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get contextes(): Array<ContexteVo> {
           return this.contexteService.contextes;
       }
    set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }

    get contexteSelections(): Array<ContexteVo> {
           return this.contexteService.contexteSelections;
       }
    set contexteSelections(value: Array<ContexteVo>) {
        this.contexteService.contexteSelections = value;
       }
   
     


    get selectedContexte():ContexteVo {
           return this.contexteService.selectedContexte;
       }
    set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }
    
    get createContexteDialog():boolean {
           return this.contexteService.createContexteDialog;
       }
    set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
       }
    
    get editContexteDialog():boolean {
           return this.contexteService.editContexteDialog;
       }
    set editContexteDialog(value: boolean) {
        this.contexteService.editContexteDialog= value;
       }
    get viewContexteDialog():boolean {
           return this.contexteService.viewContexteDialog;
       }
    set viewContexteDialog(value: boolean) {
        this.contexteService.viewContexteDialog = value;
       }
       
     get searchContexte(): ContexteVo {
        return this.contexteService.searchContexte;
       }
    set searchContexte(value: ContexteVo) {
        this.contexteService.searchContexte = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

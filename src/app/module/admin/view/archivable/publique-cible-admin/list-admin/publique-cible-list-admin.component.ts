import {Component, OnInit} from '@angular/core';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
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
  selector: 'app-publique-cible-list-admin',
  templateUrl: './publique-cible-list-admin.component.html',
  styleUrls: ['./publique-cible-list-admin.component.css']
})
export class PubliqueCibleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PubliqueCible';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private publiqueCibleService: PubliqueCibleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadPubliqueCibles();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPubliqueCibles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'list');
        isPermistted ? this.publiqueCibleService.findAll().subscribe(publiqueCibles => this.publiqueCibles = publiqueCibles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.publiqueCibleService.findByCriteria(this.searchPubliqueCible).subscribe(publiqueCibles=>{
            
            this.publiqueCibles = publiqueCibles;
           // this.searchPubliqueCible = new PubliqueCibleVo();
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
    
    public async editPubliqueCible(publiqueCible:PubliqueCibleVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'edit');
         if(isPermistted){
          this.publiqueCibleService.findByIdWithAssociatedList(publiqueCible).subscribe(res => {
           this.selectedPubliqueCible = res;
            this.selectedPubliqueCible.dateArchivage = new Date(publiqueCible.dateArchivage);
            this.selectedPubliqueCible.dateCreation = new Date(publiqueCible.dateCreation);
            this.editPubliqueCibleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPubliqueCible(publiqueCible:PubliqueCibleVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'view');
        if(isPermistted){
           this.publiqueCibleService.findByIdWithAssociatedList(publiqueCible).subscribe(res => {
           this.selectedPubliqueCible = res;
            this.selectedPubliqueCible.dateArchivage = new Date(publiqueCible.dateArchivage);
            this.selectedPubliqueCible.dateCreation = new Date(publiqueCible.dateCreation);
            this.viewPubliqueCibleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePubliqueCible(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPubliqueCible = new PubliqueCibleVo();
            this.createPubliqueCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPubliqueCible(publiqueCible:PubliqueCibleVo){
const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Publique cible) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.publiqueCibleService.archiver(publiqueCible).subscribe(status=>{
const myIndex = this.publiqueCibles.indexOf(publiqueCible);
this.publiqueCibles[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Publique cible archivé',
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

public async desarchiverPubliqueCible(publiqueCible:PubliqueCibleVo){
const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Publique cible) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.publiqueCibleService.desarchiver(publiqueCible).subscribe(status=>{
const myIndex = this.publiqueCibles.indexOf(publiqueCible);
this.publiqueCibles[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Publique cible désarchivé',
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


    public async deletePubliqueCible(publiqueCible:PubliqueCibleVo){
       const isPermistted = await this.roleService.isPermitted('PubliqueCible', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Publique cible) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.publiqueCibleService.delete(publiqueCible).subscribe(status=>{
                          if(status > 0){
                          const position = this.publiqueCibles.indexOf(publiqueCible);
                          position > -1 ? this.publiqueCibles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Publique cible Supprimé',
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


public async duplicatePubliqueCible(publiqueCible: PubliqueCibleVo) {

     this.publiqueCibleService.findByIdWithAssociatedList(publiqueCible).subscribe(
	 res => {
	       this.initDuplicatePubliqueCible(res);
	       this.selectedPubliqueCible = res;
	       this.selectedPubliqueCible.id = null;
            this.createPubliqueCibleDialog = true;

});

	}

	initDuplicatePubliqueCible(res: PubliqueCibleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.publiqueCibles.map(e => {
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
            'Libelle': this.searchPubliqueCible.libelle ? this.searchPubliqueCible.libelle : environment.emptyForExport ,
            'Code': this.searchPubliqueCible.code ? this.searchPubliqueCible.code : environment.emptyForExport ,
            'Archive': this.searchPubliqueCible.archive ? (this.searchPubliqueCible.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPubliqueCible.dateArchivageMin ? this.datePipe.transform(this.searchPubliqueCible.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPubliqueCible.dateArchivageMax ? this.datePipe.transform(this.searchPubliqueCible.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPubliqueCible.dateCreationMin ? this.datePipe.transform(this.searchPubliqueCible.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPubliqueCible.dateCreationMax ? this.datePipe.transform(this.searchPubliqueCible.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPubliqueCible.admin ? (this.searchPubliqueCible.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPubliqueCible.visible ? (this.searchPubliqueCible.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPubliqueCible.username ? this.searchPubliqueCible.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get publiqueCibles(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
    set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }

    get publiqueCibleSelections(): Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibleSelections;
       }
    set publiqueCibleSelections(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibleSelections = value;
       }
   
     


    get selectedPubliqueCible():PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
    set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
    
    get createPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;
       }
    set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
       }
    
    get editPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.editPubliqueCibleDialog;
       }
    set editPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.editPubliqueCibleDialog= value;
       }
    get viewPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.viewPubliqueCibleDialog;
       }
    set viewPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.viewPubliqueCibleDialog = value;
       }
       
     get searchPubliqueCible(): PubliqueCibleVo {
        return this.publiqueCibleService.searchPubliqueCible;
       }
    set searchPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.searchPubliqueCible = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

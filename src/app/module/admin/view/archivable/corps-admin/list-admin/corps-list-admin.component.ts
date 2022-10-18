import {Component, OnInit} from '@angular/core';
import {CorpsService} from '../../../../../controller/service/Corps.service';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
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
  selector: 'app-corps-list-admin',
  templateUrl: './corps-list-admin.component.html',
  styleUrls: ['./corps-list-admin.component.css']
})
export class CorpsListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Corps';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private corpsService: CorpsService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCorpss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCorpss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Corps', 'list');
        isPermistted ? this.corpsService.findAll().subscribe(corpss => this.corpss = corpss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.corpsService.findByCriteria(this.searchCorps).subscribe(corpss=>{
            
            this.corpss = corpss;
           // this.searchCorps = new CorpsVo();
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
    
    public async editCorps(corps:CorpsVo){
        const isPermistted = await this.roleService.isPermitted('Corps', 'edit');
         if(isPermistted){
          this.corpsService.findByIdWithAssociatedList(corps).subscribe(res => {
           this.selectedCorps = res;
            this.selectedCorps.dateArchivage = new Date(corps.dateArchivage);
            this.selectedCorps.dateCreation = new Date(corps.dateCreation);
            this.editCorpsDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCorps(corps:CorpsVo){
        const isPermistted = await this.roleService.isPermitted('Corps', 'view');
        if(isPermistted){
           this.corpsService.findByIdWithAssociatedList(corps).subscribe(res => {
           this.selectedCorps = res;
            this.selectedCorps.dateArchivage = new Date(corps.dateArchivage);
            this.selectedCorps.dateCreation = new Date(corps.dateCreation);
            this.viewCorpsDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCorps(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCorps = new CorpsVo();
            this.createCorpsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCorps(corps:CorpsVo){
const isPermistted = await this.roleService.isPermitted('Corps', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Corps) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.corpsService.archiver(corps).subscribe(status=>{
const myIndex = this.corpss.indexOf(corps);
this.corpss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Corps archivé',
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

public async desarchiverCorps(corps:CorpsVo){
const isPermistted = await this.roleService.isPermitted('Corps', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Corps) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.corpsService.desarchiver(corps).subscribe(status=>{
const myIndex = this.corpss.indexOf(corps);
this.corpss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Corps désarchivé',
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


    public async deleteCorps(corps:CorpsVo){
       const isPermistted = await this.roleService.isPermitted('Corps', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Corps) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.corpsService.delete(corps).subscribe(status=>{
                          if(status > 0){
                          const position = this.corpss.indexOf(corps);
                          position > -1 ? this.corpss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Corps Supprimé',
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


public async duplicateCorps(corps: CorpsVo) {

     this.corpsService.findByIdWithAssociatedList(corps).subscribe(
	 res => {
	       this.initDuplicateCorps(res);
	       this.selectedCorps = res;
	       this.selectedCorps.id = null;
            this.createCorpsDialog = true;

});

	}

	initDuplicateCorps(res: CorpsVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.corpss.map(e => {
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
            'Libelle': this.searchCorps.libelle ? this.searchCorps.libelle : environment.emptyForExport ,
            'Code': this.searchCorps.code ? this.searchCorps.code : environment.emptyForExport ,
            'Description': this.searchCorps.description ? this.searchCorps.description : environment.emptyForExport ,
            'Archive': this.searchCorps.archive ? (this.searchCorps.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCorps.dateArchivageMin ? this.datePipe.transform(this.searchCorps.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCorps.dateArchivageMax ? this.datePipe.transform(this.searchCorps.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCorps.dateCreationMin ? this.datePipe.transform(this.searchCorps.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCorps.dateCreationMax ? this.datePipe.transform(this.searchCorps.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCorps.admin ? (this.searchCorps.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCorps.visible ? (this.searchCorps.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCorps.username ? this.searchCorps.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get corpss(): Array<CorpsVo> {
           return this.corpsService.corpss;
       }
    set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }

    get corpsSelections(): Array<CorpsVo> {
           return this.corpsService.corpsSelections;
       }
    set corpsSelections(value: Array<CorpsVo>) {
        this.corpsService.corpsSelections = value;
       }
   
     


    get selectedCorps():CorpsVo {
           return this.corpsService.selectedCorps;
       }
    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
    
    get createCorpsDialog():boolean {
           return this.corpsService.createCorpsDialog;
       }
    set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog= value;
       }
    
    get editCorpsDialog():boolean {
           return this.corpsService.editCorpsDialog;
       }
    set editCorpsDialog(value: boolean) {
        this.corpsService.editCorpsDialog= value;
       }
    get viewCorpsDialog():boolean {
           return this.corpsService.viewCorpsDialog;
       }
    set viewCorpsDialog(value: boolean) {
        this.corpsService.viewCorpsDialog = value;
       }
       
     get searchCorps(): CorpsVo {
        return this.corpsService.searchCorps;
       }
    set searchCorps(value: CorpsVo) {
        this.corpsService.searchCorps = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

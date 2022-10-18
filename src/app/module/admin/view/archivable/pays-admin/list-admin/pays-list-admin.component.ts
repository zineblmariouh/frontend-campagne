import {Component, OnInit} from '@angular/core';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
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
  selector: 'app-pays-list-admin',
  templateUrl: './pays-list-admin.component.html',
  styleUrls: ['./pays-list-admin.component.css']
})
export class PaysListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Pays';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private paysService: PaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadPayss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Pays', 'list');
        isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysService.findByCriteria(this.searchPays).subscribe(payss=>{
            
            this.payss = payss;
           // this.searchPays = new PaysVo();
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
    
    public async editPays(pays:PaysVo){
        const isPermistted = await this.roleService.isPermitted('Pays', 'edit');
         if(isPermistted){
          this.paysService.findByIdWithAssociatedList(pays).subscribe(res => {
           this.selectedPays = res;
            this.selectedPays.dateArchivage = new Date(pays.dateArchivage);
            this.selectedPays.dateCreation = new Date(pays.dateCreation);
            this.editPaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPays(pays:PaysVo){
        const isPermistted = await this.roleService.isPermitted('Pays', 'view');
        if(isPermistted){
           this.paysService.findByIdWithAssociatedList(pays).subscribe(res => {
           this.selectedPays = res;
            this.selectedPays.dateArchivage = new Date(pays.dateArchivage);
            this.selectedPays.dateCreation = new Date(pays.dateCreation);
            this.viewPaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPays = new PaysVo();
            this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverPays(pays:PaysVo){
const isPermistted = await this.roleService.isPermitted('Pays', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Pays) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.paysService.archiver(pays).subscribe(status=>{
const myIndex = this.payss.indexOf(pays);
this.payss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Pays archivé',
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

public async desarchiverPays(pays:PaysVo){
const isPermistted = await this.roleService.isPermitted('Pays', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Pays) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.paysService.desarchiver(pays).subscribe(status=>{
const myIndex = this.payss.indexOf(pays);
this.payss[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Pays désarchivé',
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


    public async deletePays(pays:PaysVo){
       const isPermistted = await this.roleService.isPermitted('Pays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysService.delete(pays).subscribe(status=>{
                          if(status > 0){
                          const position = this.payss.indexOf(pays);
                          position > -1 ? this.payss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays Supprimé',
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


public async duplicatePays(pays: PaysVo) {

     this.paysService.findByIdWithAssociatedList(pays).subscribe(
	 res => {
	       this.initDuplicatePays(res);
	       this.selectedPays = res;
	       this.selectedPays.id = null;
            this.createPaysDialog = true;

});

	}

	initDuplicatePays(res: PaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.payss.map(e => {
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
            'Libelle': this.searchPays.libelle ? this.searchPays.libelle : environment.emptyForExport ,
            'Code': this.searchPays.code ? this.searchPays.code : environment.emptyForExport ,
            'Archive': this.searchPays.archive ? (this.searchPays.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPays.dateArchivageMin ? this.datePipe.transform(this.searchPays.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPays.dateArchivageMax ? this.datePipe.transform(this.searchPays.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPays.dateCreationMin ? this.datePipe.transform(this.searchPays.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPays.dateCreationMax ? this.datePipe.transform(this.searchPays.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPays.admin ? (this.searchPays.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPays.visible ? (this.searchPays.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPays.username ? this.searchPays.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
    set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

    get paysSelections(): Array<PaysVo> {
           return this.paysService.paysSelections;
       }
    set paysSelections(value: Array<PaysVo>) {
        this.paysService.paysSelections = value;
       }
   
     


    get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
    
    get createPaysDialog():boolean {
           return this.paysService.createPaysDialog;
       }
    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
    
    get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
    set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }
    get viewPaysDialog():boolean {
           return this.paysService.viewPaysDialog;
       }
    set viewPaysDialog(value: boolean) {
        this.paysService.viewPaysDialog = value;
       }
       
     get searchPays(): PaysVo {
        return this.paysService.searchPays;
       }
    set searchPays(value: PaysVo) {
        this.paysService.searchPays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

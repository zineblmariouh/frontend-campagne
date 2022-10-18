import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
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
  selector: 'app-communaute-savoir-list-admin',
  templateUrl: './communaute-savoir-list-admin.component.html',
  styleUrls: ['./communaute-savoir-list-admin.component.css']
})
export class CommunauteSavoirListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoir';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private communauteSavoirService: CommunauteSavoirService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCommunauteSavoirs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'list');
        isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirService.findByCriteria(this.searchCommunauteSavoir).subscribe(communauteSavoirs=>{
            
            this.communauteSavoirs = communauteSavoirs;
           // this.searchCommunauteSavoir = new CommunauteSavoirVo();
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
    
    public async editCommunauteSavoir(communauteSavoir:CommunauteSavoirVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'edit');
         if(isPermistted){
          this.communauteSavoirService.findByIdWithAssociatedList(communauteSavoir).subscribe(res => {
           this.selectedCommunauteSavoir = res;
            this.selectedCommunauteSavoir.dateArchivage = new Date(communauteSavoir.dateArchivage);
            this.selectedCommunauteSavoir.dateCreation = new Date(communauteSavoir.dateCreation);
            this.editCommunauteSavoirDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoir(communauteSavoir:CommunauteSavoirVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'view');
        if(isPermistted){
           this.communauteSavoirService.findByIdWithAssociatedList(communauteSavoir).subscribe(res => {
           this.selectedCommunauteSavoir = res;
            this.selectedCommunauteSavoir.dateArchivage = new Date(communauteSavoir.dateArchivage);
            this.selectedCommunauteSavoir.dateCreation = new Date(communauteSavoir.dateCreation);
            this.viewCommunauteSavoirDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
            this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCommunauteSavoir(communauteSavoir:CommunauteSavoirVo){
const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Communaute savoir) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.communauteSavoirService.archiver(communauteSavoir).subscribe(status=>{
const myIndex = this.communauteSavoirs.indexOf(communauteSavoir);
this.communauteSavoirs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Communaute savoir archivé',
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

public async desarchiverCommunauteSavoir(communauteSavoir:CommunauteSavoirVo){
const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Communaute savoir) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.communauteSavoirService.desarchiver(communauteSavoir).subscribe(status=>{
const myIndex = this.communauteSavoirs.indexOf(communauteSavoir);
this.communauteSavoirs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Communaute savoir désarchivé',
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


    public async deleteCommunauteSavoir(communauteSavoir:CommunauteSavoirVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirService.delete(communauteSavoir).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirs.indexOf(communauteSavoir);
                          position > -1 ? this.communauteSavoirs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir Supprimé',
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


public async duplicateCommunauteSavoir(communauteSavoir: CommunauteSavoirVo) {

     this.communauteSavoirService.findByIdWithAssociatedList(communauteSavoir).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoir(res);
	       this.selectedCommunauteSavoir = res;
	       this.selectedCommunauteSavoir.id = null;
            this.createCommunauteSavoirDialog = true;

});

	}

	initDuplicateCommunauteSavoir(res: CommunauteSavoirVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirs.map(e => {
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
            'Libelle': this.searchCommunauteSavoir.libelle ? this.searchCommunauteSavoir.libelle : environment.emptyForExport ,
            'Code': this.searchCommunauteSavoir.code ? this.searchCommunauteSavoir.code : environment.emptyForExport ,
            'Archive': this.searchCommunauteSavoir.archive ? (this.searchCommunauteSavoir.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCommunauteSavoir.dateArchivageMin ? this.datePipe.transform(this.searchCommunauteSavoir.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCommunauteSavoir.dateArchivageMax ? this.datePipe.transform(this.searchCommunauteSavoir.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCommunauteSavoir.dateCreationMin ? this.datePipe.transform(this.searchCommunauteSavoir.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCommunauteSavoir.dateCreationMax ? this.datePipe.transform(this.searchCommunauteSavoir.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCommunauteSavoir.admin ? (this.searchCommunauteSavoir.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCommunauteSavoir.visible ? (this.searchCommunauteSavoir.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCommunauteSavoir.username ? this.searchCommunauteSavoir.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
    set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }

    get communauteSavoirSelections(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirSelections;
       }
    set communauteSavoirSelections(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirSelections = value;
       }
   
     


    get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
    
    get createCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
    set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
    
    get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
    set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
       }
    get viewCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.viewCommunauteSavoirDialog;
       }
    set viewCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.viewCommunauteSavoirDialog = value;
       }
       
     get searchCommunauteSavoir(): CommunauteSavoirVo {
        return this.communauteSavoirService.searchCommunauteSavoir;
       }
    set searchCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.searchCommunauteSavoir = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

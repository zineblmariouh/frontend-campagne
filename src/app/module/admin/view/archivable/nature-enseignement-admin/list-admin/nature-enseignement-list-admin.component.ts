import {Component, OnInit} from '@angular/core';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
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
  selector: 'app-nature-enseignement-list-admin',
  templateUrl: './nature-enseignement-list-admin.component.html',
  styleUrls: ['./nature-enseignement-list-admin.component.css']
})
export class NatureEnseignementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureEnseignement';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNatureEnseignements();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNatureEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'list');
        isPermistted ? this.natureEnseignementService.findAll().subscribe(natureEnseignements => this.natureEnseignements = natureEnseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.natureEnseignementService.findByCriteria(this.searchNatureEnseignement).subscribe(natureEnseignements=>{
            
            this.natureEnseignements = natureEnseignements;
           // this.searchNatureEnseignement = new NatureEnseignementVo();
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
    
    public async editNatureEnseignement(natureEnseignement:NatureEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'edit');
         if(isPermistted){
          this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(res => {
           this.selectedNatureEnseignement = res;
            this.selectedNatureEnseignement.dateArchivage = new Date(natureEnseignement.dateArchivage);
            this.selectedNatureEnseignement.dateCreation = new Date(natureEnseignement.dateCreation);
            this.editNatureEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNatureEnseignement(natureEnseignement:NatureEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'view');
        if(isPermistted){
           this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(res => {
           this.selectedNatureEnseignement = res;
            this.selectedNatureEnseignement.dateArchivage = new Date(natureEnseignement.dateArchivage);
            this.selectedNatureEnseignement.dateCreation = new Date(natureEnseignement.dateCreation);
            this.viewNatureEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNatureEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNatureEnseignement = new NatureEnseignementVo();
            this.createNatureEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverNatureEnseignement(natureEnseignement:NatureEnseignementVo){
const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Nature enseignement) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureEnseignementService.archiver(natureEnseignement).subscribe(status=>{
const myIndex = this.natureEnseignements.indexOf(natureEnseignement);
this.natureEnseignements[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature enseignement archivé',
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

public async desarchiverNatureEnseignement(natureEnseignement:NatureEnseignementVo){
const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Nature enseignement) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureEnseignementService.desarchiver(natureEnseignement).subscribe(status=>{
const myIndex = this.natureEnseignements.indexOf(natureEnseignement);
this.natureEnseignements[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature enseignement désarchivé',
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


    public async deleteNatureEnseignement(natureEnseignement:NatureEnseignementVo){
       const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Nature enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.natureEnseignementService.delete(natureEnseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.natureEnseignements.indexOf(natureEnseignement);
                          position > -1 ? this.natureEnseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Nature enseignement Supprimé',
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


public async duplicateNatureEnseignement(natureEnseignement: NatureEnseignementVo) {

     this.natureEnseignementService.findByIdWithAssociatedList(natureEnseignement).subscribe(
	 res => {
	       this.initDuplicateNatureEnseignement(res);
	       this.selectedNatureEnseignement = res;
	       this.selectedNatureEnseignement.id = null;
            this.createNatureEnseignementDialog = true;

});

	}

	initDuplicateNatureEnseignement(res: NatureEnseignementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.natureEnseignements.map(e => {
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
            'Libelle': this.searchNatureEnseignement.libelle ? this.searchNatureEnseignement.libelle : environment.emptyForExport ,
            'Code': this.searchNatureEnseignement.code ? this.searchNatureEnseignement.code : environment.emptyForExport ,
            'Description': this.searchNatureEnseignement.description ? this.searchNatureEnseignement.description : environment.emptyForExport ,
            'Archive': this.searchNatureEnseignement.archive ? (this.searchNatureEnseignement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNatureEnseignement.dateArchivageMin ? this.datePipe.transform(this.searchNatureEnseignement.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNatureEnseignement.dateArchivageMax ? this.datePipe.transform(this.searchNatureEnseignement.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNatureEnseignement.dateCreationMin ? this.datePipe.transform(this.searchNatureEnseignement.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNatureEnseignement.dateCreationMax ? this.datePipe.transform(this.searchNatureEnseignement.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchNatureEnseignement.admin ? (this.searchNatureEnseignement.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchNatureEnseignement.visible ? (this.searchNatureEnseignement.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchNatureEnseignement.username ? this.searchNatureEnseignement.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get natureEnseignements(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
    set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }

    get natureEnseignementSelections(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignementSelections;
       }
    set natureEnseignementSelections(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignementSelections = value;
       }
   
     


    get selectedNatureEnseignement():NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
    
    get createNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;
       }
    set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
       }
    
    get editNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.editNatureEnseignementDialog;
       }
    set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog= value;
       }
    get viewNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.viewNatureEnseignementDialog;
       }
    set viewNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.viewNatureEnseignementDialog = value;
       }
       
     get searchNatureEnseignement(): NatureEnseignementVo {
        return this.natureEnseignementService.searchNatureEnseignement;
       }
    set searchNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.searchNatureEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

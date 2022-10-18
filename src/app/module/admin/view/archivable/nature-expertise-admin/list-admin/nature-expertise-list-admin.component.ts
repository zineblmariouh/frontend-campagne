import {Component, OnInit} from '@angular/core';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
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
  selector: 'app-nature-expertise-list-admin',
  templateUrl: './nature-expertise-list-admin.component.html',
  styleUrls: ['./nature-expertise-list-admin.component.css']
})
export class NatureExpertiseListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureExpertise';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private natureExpertiseService: NatureExpertiseService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNatureExpertises();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNatureExpertises(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'list');
        isPermistted ? this.natureExpertiseService.findAll().subscribe(natureExpertises => this.natureExpertises = natureExpertises,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.natureExpertiseService.findByCriteria(this.searchNatureExpertise).subscribe(natureExpertises=>{
            
            this.natureExpertises = natureExpertises;
           // this.searchNatureExpertise = new NatureExpertiseVo();
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
    
    public async editNatureExpertise(natureExpertise:NatureExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'edit');
         if(isPermistted){
          this.natureExpertiseService.findByIdWithAssociatedList(natureExpertise).subscribe(res => {
           this.selectedNatureExpertise = res;
            this.selectedNatureExpertise.dateArchivage = new Date(natureExpertise.dateArchivage);
            this.selectedNatureExpertise.dateCreation = new Date(natureExpertise.dateCreation);
            this.editNatureExpertiseDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNatureExpertise(natureExpertise:NatureExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'view');
        if(isPermistted){
           this.natureExpertiseService.findByIdWithAssociatedList(natureExpertise).subscribe(res => {
           this.selectedNatureExpertise = res;
            this.selectedNatureExpertise.dateArchivage = new Date(natureExpertise.dateArchivage);
            this.selectedNatureExpertise.dateCreation = new Date(natureExpertise.dateCreation);
            this.viewNatureExpertiseDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNatureExpertise(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNatureExpertise = new NatureExpertiseVo();
            this.createNatureExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverNatureExpertise(natureExpertise:NatureExpertiseVo){
const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Nature expertise) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureExpertiseService.archiver(natureExpertise).subscribe(status=>{
const myIndex = this.natureExpertises.indexOf(natureExpertise);
this.natureExpertises[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature expertise archivé',
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

public async desarchiverNatureExpertise(natureExpertise:NatureExpertiseVo){
const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Nature expertise) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureExpertiseService.desarchiver(natureExpertise).subscribe(status=>{
const myIndex = this.natureExpertises.indexOf(natureExpertise);
this.natureExpertises[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature expertise désarchivé',
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


    public async deleteNatureExpertise(natureExpertise:NatureExpertiseVo){
       const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Nature expertise) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.natureExpertiseService.delete(natureExpertise).subscribe(status=>{
                          if(status > 0){
                          const position = this.natureExpertises.indexOf(natureExpertise);
                          position > -1 ? this.natureExpertises.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Nature expertise Supprimé',
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


public async duplicateNatureExpertise(natureExpertise: NatureExpertiseVo) {

     this.natureExpertiseService.findByIdWithAssociatedList(natureExpertise).subscribe(
	 res => {
	       this.initDuplicateNatureExpertise(res);
	       this.selectedNatureExpertise = res;
	       this.selectedNatureExpertise.id = null;
            this.createNatureExpertiseDialog = true;

});

	}

	initDuplicateNatureExpertise(res: NatureExpertiseVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.natureExpertises.map(e => {
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
            'Libelle': this.searchNatureExpertise.libelle ? this.searchNatureExpertise.libelle : environment.emptyForExport ,
            'Code': this.searchNatureExpertise.code ? this.searchNatureExpertise.code : environment.emptyForExport ,
            'Description': this.searchNatureExpertise.description ? this.searchNatureExpertise.description : environment.emptyForExport ,
            'Archive': this.searchNatureExpertise.archive ? (this.searchNatureExpertise.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNatureExpertise.dateArchivageMin ? this.datePipe.transform(this.searchNatureExpertise.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNatureExpertise.dateArchivageMax ? this.datePipe.transform(this.searchNatureExpertise.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNatureExpertise.dateCreationMin ? this.datePipe.transform(this.searchNatureExpertise.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNatureExpertise.dateCreationMax ? this.datePipe.transform(this.searchNatureExpertise.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchNatureExpertise.admin ? (this.searchNatureExpertise.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchNatureExpertise.visible ? (this.searchNatureExpertise.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchNatureExpertise.username ? this.searchNatureExpertise.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get natureExpertises(): Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertises;
       }
    set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }

    get natureExpertiseSelections(): Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertiseSelections;
       }
    set natureExpertiseSelections(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertiseSelections = value;
       }
   
     


    get selectedNatureExpertise():NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
    set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }
    
    get createNatureExpertiseDialog():boolean {
           return this.natureExpertiseService.createNatureExpertiseDialog;
       }
    set createNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.createNatureExpertiseDialog= value;
       }
    
    get editNatureExpertiseDialog():boolean {
           return this.natureExpertiseService.editNatureExpertiseDialog;
       }
    set editNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.editNatureExpertiseDialog= value;
       }
    get viewNatureExpertiseDialog():boolean {
           return this.natureExpertiseService.viewNatureExpertiseDialog;
       }
    set viewNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.viewNatureExpertiseDialog = value;
       }
       
     get searchNatureExpertise(): NatureExpertiseVo {
        return this.natureExpertiseService.searchNatureExpertise;
       }
    set searchNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.searchNatureExpertise = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

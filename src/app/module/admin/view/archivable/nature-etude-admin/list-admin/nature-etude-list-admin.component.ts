import {Component, OnInit} from '@angular/core';
import {NatureEtudeService} from '../../../../../controller/service/NatureEtude.service';
import {NatureEtudeVo} from '../../../../../controller/model/NatureEtude.model';
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
  selector: 'app-nature-etude-list-admin',
  templateUrl: './nature-etude-list-admin.component.html',
  styleUrls: ['./nature-etude-list-admin.component.css']
})
export class NatureEtudeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NatureEtude';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNatureEtudes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNatureEtudes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'list');
        isPermistted ? this.natureEtudeService.findAll().subscribe(natureEtudes => this.natureEtudes = natureEtudes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.natureEtudeService.findByCriteria(this.searchNatureEtude).subscribe(natureEtudes=>{
            
            this.natureEtudes = natureEtudes;
           // this.searchNatureEtude = new NatureEtudeVo();
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
    
    public async editNatureEtude(natureEtude:NatureEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'edit');
         if(isPermistted){
          this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(res => {
           this.selectedNatureEtude = res;
            this.selectedNatureEtude.dateArchivage = new Date(natureEtude.dateArchivage);
            this.selectedNatureEtude.dateCreation = new Date(natureEtude.dateCreation);
            this.editNatureEtudeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNatureEtude(natureEtude:NatureEtudeVo){
        const isPermistted = await this.roleService.isPermitted('NatureEtude', 'view');
        if(isPermistted){
           this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(res => {
           this.selectedNatureEtude = res;
            this.selectedNatureEtude.dateArchivage = new Date(natureEtude.dateArchivage);
            this.selectedNatureEtude.dateCreation = new Date(natureEtude.dateCreation);
            this.viewNatureEtudeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNatureEtude(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNatureEtude = new NatureEtudeVo();
            this.createNatureEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverNatureEtude(natureEtude:NatureEtudeVo){
const isPermistted = await this.roleService.isPermitted('NatureEtude', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Nature etude) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureEtudeService.archiver(natureEtude).subscribe(status=>{
const myIndex = this.natureEtudes.indexOf(natureEtude);
this.natureEtudes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature etude archivé',
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

public async desarchiverNatureEtude(natureEtude:NatureEtudeVo){
const isPermistted = await this.roleService.isPermitted('NatureEtude', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Nature etude) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.natureEtudeService.desarchiver(natureEtude).subscribe(status=>{
const myIndex = this.natureEtudes.indexOf(natureEtude);
this.natureEtudes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Nature etude désarchivé',
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


    public async deleteNatureEtude(natureEtude:NatureEtudeVo){
       const isPermistted = await this.roleService.isPermitted('NatureEtude', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Nature etude) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.natureEtudeService.delete(natureEtude).subscribe(status=>{
                          if(status > 0){
                          const position = this.natureEtudes.indexOf(natureEtude);
                          position > -1 ? this.natureEtudes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Nature etude Supprimé',
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


public async duplicateNatureEtude(natureEtude: NatureEtudeVo) {

     this.natureEtudeService.findByIdWithAssociatedList(natureEtude).subscribe(
	 res => {
	       this.initDuplicateNatureEtude(res);
	       this.selectedNatureEtude = res;
	       this.selectedNatureEtude.id = null;
            this.createNatureEtudeDialog = true;

});

	}

	initDuplicateNatureEtude(res: NatureEtudeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.natureEtudes.map(e => {
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
            'Libelle': this.searchNatureEtude.libelle ? this.searchNatureEtude.libelle : environment.emptyForExport ,
            'Code': this.searchNatureEtude.code ? this.searchNatureEtude.code : environment.emptyForExport ,
            'Archive': this.searchNatureEtude.archive ? (this.searchNatureEtude.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNatureEtude.dateArchivageMin ? this.datePipe.transform(this.searchNatureEtude.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNatureEtude.dateArchivageMax ? this.datePipe.transform(this.searchNatureEtude.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNatureEtude.dateCreationMin ? this.datePipe.transform(this.searchNatureEtude.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNatureEtude.dateCreationMax ? this.datePipe.transform(this.searchNatureEtude.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchNatureEtude.admin ? (this.searchNatureEtude.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchNatureEtude.visible ? (this.searchNatureEtude.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchNatureEtude.username ? this.searchNatureEtude.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get natureEtudes(): Array<NatureEtudeVo> {
           return this.natureEtudeService.natureEtudes;
       }
    set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

    get natureEtudeSelections(): Array<NatureEtudeVo> {
           return this.natureEtudeService.natureEtudeSelections;
       }
    set natureEtudeSelections(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudeSelections = value;
       }
   
     


    get selectedNatureEtude():NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }
    
    get createNatureEtudeDialog():boolean {
           return this.natureEtudeService.createNatureEtudeDialog;
       }
    set createNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.createNatureEtudeDialog= value;
       }
    
    get editNatureEtudeDialog():boolean {
           return this.natureEtudeService.editNatureEtudeDialog;
       }
    set editNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.editNatureEtudeDialog= value;
       }
    get viewNatureEtudeDialog():boolean {
           return this.natureEtudeService.viewNatureEtudeDialog;
       }
    set viewNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.viewNatureEtudeDialog = value;
       }
       
     get searchNatureEtude(): NatureEtudeVo {
        return this.natureEtudeService.searchNatureEtude;
       }
    set searchNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.searchNatureEtude = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from '../../../../../controller/service/Caracterisation.service';
import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
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
  selector: 'app-caracterisation-list-admin',
  templateUrl: './caracterisation-list-admin.component.html',
  styleUrls: ['./caracterisation-list-admin.component.css']
})
export class CaracterisationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Caracterisation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCaracterisations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCaracterisations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'list');
        isPermistted ? this.caracterisationService.findAll().subscribe(caracterisations => this.caracterisations = caracterisations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.caracterisationService.findByCriteria(this.searchCaracterisation).subscribe(caracterisations=>{
            
            this.caracterisations = caracterisations;
           // this.searchCaracterisation = new CaracterisationVo();
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
    
    public async editCaracterisation(caracterisation:CaracterisationVo){
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'edit');
         if(isPermistted){
          this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(res => {
           this.selectedCaracterisation = res;
            this.selectedCaracterisation.dateArchivage = new Date(caracterisation.dateArchivage);
            this.selectedCaracterisation.dateCreation = new Date(caracterisation.dateCreation);
            this.editCaracterisationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCaracterisation(caracterisation:CaracterisationVo){
        const isPermistted = await this.roleService.isPermitted('Caracterisation', 'view');
        if(isPermistted){
           this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(res => {
           this.selectedCaracterisation = res;
            this.selectedCaracterisation.dateArchivage = new Date(caracterisation.dateArchivage);
            this.selectedCaracterisation.dateCreation = new Date(caracterisation.dateCreation);
            this.viewCaracterisationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCaracterisation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCaracterisation = new CaracterisationVo();
            this.createCaracterisationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCaracterisation(caracterisation:CaracterisationVo){
const isPermistted = await this.roleService.isPermitted('Caracterisation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Caracterisation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.caracterisationService.archiver(caracterisation).subscribe(status=>{
const myIndex = this.caracterisations.indexOf(caracterisation);
this.caracterisations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Caracterisation archivé',
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

public async desarchiverCaracterisation(caracterisation:CaracterisationVo){
const isPermistted = await this.roleService.isPermitted('Caracterisation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Caracterisation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.caracterisationService.desarchiver(caracterisation).subscribe(status=>{
const myIndex = this.caracterisations.indexOf(caracterisation);
this.caracterisations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Caracterisation désarchivé',
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


    public async deleteCaracterisation(caracterisation:CaracterisationVo){
       const isPermistted = await this.roleService.isPermitted('Caracterisation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Caracterisation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.caracterisationService.delete(caracterisation).subscribe(status=>{
                          if(status > 0){
                          const position = this.caracterisations.indexOf(caracterisation);
                          position > -1 ? this.caracterisations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Caracterisation Supprimé',
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


public async duplicateCaracterisation(caracterisation: CaracterisationVo) {

     this.caracterisationService.findByIdWithAssociatedList(caracterisation).subscribe(
	 res => {
	       this.initDuplicateCaracterisation(res);
	       this.selectedCaracterisation = res;
	       this.selectedCaracterisation.id = null;
            this.createCaracterisationDialog = true;

});

	}

	initDuplicateCaracterisation(res: CaracterisationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.caracterisations.map(e => {
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
            'Libelle': this.searchCaracterisation.libelle ? this.searchCaracterisation.libelle : environment.emptyForExport ,
            'Code': this.searchCaracterisation.code ? this.searchCaracterisation.code : environment.emptyForExport ,
            'Archive': this.searchCaracterisation.archive ? (this.searchCaracterisation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCaracterisation.dateArchivageMin ? this.datePipe.transform(this.searchCaracterisation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCaracterisation.dateArchivageMax ? this.datePipe.transform(this.searchCaracterisation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCaracterisation.dateCreationMin ? this.datePipe.transform(this.searchCaracterisation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCaracterisation.dateCreationMax ? this.datePipe.transform(this.searchCaracterisation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCaracterisation.admin ? (this.searchCaracterisation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCaracterisation.visible ? (this.searchCaracterisation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCaracterisation.username ? this.searchCaracterisation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get caracterisations(): Array<CaracterisationVo> {
           return this.caracterisationService.caracterisations;
       }
    set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }

    get caracterisationSelections(): Array<CaracterisationVo> {
           return this.caracterisationService.caracterisationSelections;
       }
    set caracterisationSelections(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisationSelections = value;
       }
   
     


    get selectedCaracterisation():CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }
    
    get createCaracterisationDialog():boolean {
           return this.caracterisationService.createCaracterisationDialog;
       }
    set createCaracterisationDialog(value: boolean) {
        this.caracterisationService.createCaracterisationDialog= value;
       }
    
    get editCaracterisationDialog():boolean {
           return this.caracterisationService.editCaracterisationDialog;
       }
    set editCaracterisationDialog(value: boolean) {
        this.caracterisationService.editCaracterisationDialog= value;
       }
    get viewCaracterisationDialog():boolean {
           return this.caracterisationService.viewCaracterisationDialog;
       }
    set viewCaracterisationDialog(value: boolean) {
        this.caracterisationService.viewCaracterisationDialog = value;
       }
       
     get searchCaracterisation(): CaracterisationVo {
        return this.caracterisationService.searchCaracterisation;
       }
    set searchCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.searchCaracterisation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

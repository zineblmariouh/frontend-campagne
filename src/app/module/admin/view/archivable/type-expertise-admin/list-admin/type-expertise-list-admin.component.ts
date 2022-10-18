import {Component, OnInit} from '@angular/core';
import {TypeExpertiseService} from '../../../../../controller/service/TypeExpertise.service';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
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
  selector: 'app-type-expertise-list-admin',
  templateUrl: './type-expertise-list-admin.component.html',
  styleUrls: ['./type-expertise-list-admin.component.css']
})
export class TypeExpertiseListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeExpertise';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeExpertiseService: TypeExpertiseService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeExpertises();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeExpertises(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'list');
        isPermistted ? this.typeExpertiseService.findAll().subscribe(typeExpertises => this.typeExpertises = typeExpertises,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeExpertiseService.findByCriteria(this.searchTypeExpertise).subscribe(typeExpertises=>{
            
            this.typeExpertises = typeExpertises;
           // this.searchTypeExpertise = new TypeExpertiseVo();
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
    
    public async editTypeExpertise(typeExpertise:TypeExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'edit');
         if(isPermistted){
          this.typeExpertiseService.findByIdWithAssociatedList(typeExpertise).subscribe(res => {
           this.selectedTypeExpertise = res;
            this.selectedTypeExpertise.dateArchivage = new Date(typeExpertise.dateArchivage);
            this.selectedTypeExpertise.dateCreation = new Date(typeExpertise.dateCreation);
            this.editTypeExpertiseDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeExpertise(typeExpertise:TypeExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'view');
        if(isPermistted){
           this.typeExpertiseService.findByIdWithAssociatedList(typeExpertise).subscribe(res => {
           this.selectedTypeExpertise = res;
            this.selectedTypeExpertise.dateArchivage = new Date(typeExpertise.dateArchivage);
            this.selectedTypeExpertise.dateCreation = new Date(typeExpertise.dateCreation);
            this.viewTypeExpertiseDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeExpertise(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeExpertise = new TypeExpertiseVo();
            this.createTypeExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTypeExpertise(typeExpertise:TypeExpertiseVo){
const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Type expertise) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typeExpertiseService.archiver(typeExpertise).subscribe(status=>{
const myIndex = this.typeExpertises.indexOf(typeExpertise);
this.typeExpertises[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type expertise archivé',
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

public async desarchiverTypeExpertise(typeExpertise:TypeExpertiseVo){
const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Type expertise) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typeExpertiseService.desarchiver(typeExpertise).subscribe(status=>{
const myIndex = this.typeExpertises.indexOf(typeExpertise);
this.typeExpertises[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type expertise désarchivé',
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


    public async deleteTypeExpertise(typeExpertise:TypeExpertiseVo){
       const isPermistted = await this.roleService.isPermitted('TypeExpertise', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type expertise) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeExpertiseService.delete(typeExpertise).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeExpertises.indexOf(typeExpertise);
                          position > -1 ? this.typeExpertises.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type expertise Supprimé',
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


public async duplicateTypeExpertise(typeExpertise: TypeExpertiseVo) {

     this.typeExpertiseService.findByIdWithAssociatedList(typeExpertise).subscribe(
	 res => {
	       this.initDuplicateTypeExpertise(res);
	       this.selectedTypeExpertise = res;
	       this.selectedTypeExpertise.id = null;
            this.createTypeExpertiseDialog = true;

});

	}

	initDuplicateTypeExpertise(res: TypeExpertiseVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeExpertises.map(e => {
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
            'Libelle': this.searchTypeExpertise.libelle ? this.searchTypeExpertise.libelle : environment.emptyForExport ,
            'Code': this.searchTypeExpertise.code ? this.searchTypeExpertise.code : environment.emptyForExport ,
            'Archive': this.searchTypeExpertise.archive ? (this.searchTypeExpertise.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeExpertise.dateArchivageMin ? this.datePipe.transform(this.searchTypeExpertise.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeExpertise.dateArchivageMax ? this.datePipe.transform(this.searchTypeExpertise.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeExpertise.dateCreationMin ? this.datePipe.transform(this.searchTypeExpertise.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeExpertise.dateCreationMax ? this.datePipe.transform(this.searchTypeExpertise.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeExpertise.admin ? (this.searchTypeExpertise.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeExpertise.visible ? (this.searchTypeExpertise.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeExpertise.username ? this.searchTypeExpertise.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeExpertises(): Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertises;
       }
    set typeExpertises(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertises = value;
       }

    get typeExpertiseSelections(): Array<TypeExpertiseVo> {
           return this.typeExpertiseService.typeExpertiseSelections;
       }
    set typeExpertiseSelections(value: Array<TypeExpertiseVo>) {
        this.typeExpertiseService.typeExpertiseSelections = value;
       }
   
     


    get selectedTypeExpertise():TypeExpertiseVo {
           return this.typeExpertiseService.selectedTypeExpertise;
       }
    set selectedTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.selectedTypeExpertise = value;
       }
    
    get createTypeExpertiseDialog():boolean {
           return this.typeExpertiseService.createTypeExpertiseDialog;
       }
    set createTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.createTypeExpertiseDialog= value;
       }
    
    get editTypeExpertiseDialog():boolean {
           return this.typeExpertiseService.editTypeExpertiseDialog;
       }
    set editTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.editTypeExpertiseDialog= value;
       }
    get viewTypeExpertiseDialog():boolean {
           return this.typeExpertiseService.viewTypeExpertiseDialog;
       }
    set viewTypeExpertiseDialog(value: boolean) {
        this.typeExpertiseService.viewTypeExpertiseDialog = value;
       }
       
     get searchTypeExpertise(): TypeExpertiseVo {
        return this.typeExpertiseService.searchTypeExpertise;
       }
    set searchTypeExpertise(value: TypeExpertiseVo) {
        this.typeExpertiseService.searchTypeExpertise = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

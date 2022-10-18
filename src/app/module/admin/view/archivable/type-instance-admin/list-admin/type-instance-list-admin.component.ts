import {Component, OnInit} from '@angular/core';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
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
  selector: 'app-type-instance-list-admin',
  templateUrl: './type-instance-list-admin.component.html',
  styleUrls: ['./type-instance-list-admin.component.css']
})
export class TypeInstanceListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstance';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeInstances();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeInstances(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'list');
        isPermistted ? this.typeInstanceService.findAll().subscribe(typeInstances => this.typeInstances = typeInstances,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstanceService.findByCriteria(this.searchTypeInstance).subscribe(typeInstances=>{
            
            this.typeInstances = typeInstances;
           // this.searchTypeInstance = new TypeInstanceVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTypeInstance(typeInstance:TypeInstanceVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'edit');
         if(isPermistted){
          this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(res => {
           this.selectedTypeInstance = res;
            this.selectedTypeInstance.dateArchivage = new Date(typeInstance.dateArchivage);
            this.selectedTypeInstance.dateCreation = new Date(typeInstance.dateCreation);
            this.editTypeInstanceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstance(typeInstance:TypeInstanceVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstance', 'view');
        if(isPermistted){
           this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(res => {
           this.selectedTypeInstance = res;
            this.selectedTypeInstance.dateArchivage = new Date(typeInstance.dateArchivage);
            this.selectedTypeInstance.dateCreation = new Date(typeInstance.dateCreation);
            this.viewTypeInstanceDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstance = new TypeInstanceVo();
            this.createTypeInstanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTypeInstance(typeInstance:TypeInstanceVo){
const isPermistted = await this.roleService.isPermitted('TypeInstance', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Type instance) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typeInstanceService.archiver(typeInstance).subscribe(status=>{
const myIndex = this.typeInstances.indexOf(typeInstance);
this.typeInstances[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type instance archivé',
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

public async desarchiverTypeInstance(typeInstance:TypeInstanceVo){
const isPermistted = await this.roleService.isPermitted('TypeInstance', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Type instance) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typeInstanceService.desarchiver(typeInstance).subscribe(status=>{
const myIndex = this.typeInstances.indexOf(typeInstance);
this.typeInstances[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type instance désarchivé',
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


    public async deleteTypeInstance(typeInstance:TypeInstanceVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstance', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instance) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstanceService.delete(typeInstance).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstances.indexOf(typeInstance);
                          position > -1 ? this.typeInstances.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instance Supprimé',
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


public async duplicateTypeInstance(typeInstance: TypeInstanceVo) {

     this.typeInstanceService.findByIdWithAssociatedList(typeInstance).subscribe(
	 res => {
	       this.initDuplicateTypeInstance(res);
	       this.selectedTypeInstance = res;
	       this.selectedTypeInstance.id = null;
            this.createTypeInstanceDialog = true;

});

	}

	initDuplicateTypeInstance(res: TypeInstanceVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeInstances.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypeInstance.code ? this.searchTypeInstance.code : environment.emptyForExport ,
            'Libelle': this.searchTypeInstance.libelle ? this.searchTypeInstance.libelle : environment.emptyForExport ,
            'Archive': this.searchTypeInstance.archive ? (this.searchTypeInstance.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeInstance.dateArchivageMin ? this.datePipe.transform(this.searchTypeInstance.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeInstance.dateArchivageMax ? this.datePipe.transform(this.searchTypeInstance.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeInstance.dateCreationMin ? this.datePipe.transform(this.searchTypeInstance.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeInstance.dateCreationMax ? this.datePipe.transform(this.searchTypeInstance.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeInstance.admin ? (this.searchTypeInstance.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeInstance.visible ? (this.searchTypeInstance.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeInstance.username ? this.searchTypeInstance.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstances(): Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstances;
       }
    set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

    get typeInstanceSelections(): Array<TypeInstanceVo> {
           return this.typeInstanceService.typeInstanceSelections;
       }
    set typeInstanceSelections(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstanceSelections = value;
       }
   
     


    get selectedTypeInstance():TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }
    
    get createTypeInstanceDialog():boolean {
           return this.typeInstanceService.createTypeInstanceDialog;
       }
    set createTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.createTypeInstanceDialog= value;
       }
    
    get editTypeInstanceDialog():boolean {
           return this.typeInstanceService.editTypeInstanceDialog;
       }
    set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog= value;
       }
    get viewTypeInstanceDialog():boolean {
           return this.typeInstanceService.viewTypeInstanceDialog;
       }
    set viewTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.viewTypeInstanceDialog = value;
       }
       
     get searchTypeInstance(): TypeInstanceVo {
        return this.typeInstanceService.searchTypeInstance;
       }
    set searchTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.searchTypeInstance = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

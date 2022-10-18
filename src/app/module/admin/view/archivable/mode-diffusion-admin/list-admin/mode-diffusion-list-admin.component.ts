import {Component, OnInit} from '@angular/core';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeSavoirService } from '../../../../../controller/service/TypeSavoir.service';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-mode-diffusion-list-admin',
  templateUrl: './mode-diffusion-list-admin.component.html',
  styleUrls: ['./mode-diffusion-list-admin.component.css']
})
export class ModeDiffusionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ModeDiffusion';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    typeSavoirs :Array<TypeSavoirVo>;


    constructor(private datePipe: DatePipe, private modeDiffusionService: ModeDiffusionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeSavoirService: TypeSavoirService
) { }

    ngOnInit(): void {
      this.loadModeDiffusions();
      this.initExport();
      this.initCol();
      this.loadTypeSavoir();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadModeDiffusions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'list');
        isPermistted ? this.modeDiffusionService.findAll().subscribe(modeDiffusions => this.modeDiffusions = modeDiffusions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.modeDiffusionService.findByCriteria(this.searchModeDiffusion).subscribe(modeDiffusions=>{
            
            this.modeDiffusions = modeDiffusions;
           // this.searchModeDiffusion = new ModeDiffusionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'typeSavoir?.libelle', header: 'Type savoir'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editModeDiffusion(modeDiffusion:ModeDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'edit');
         if(isPermistted){
          this.modeDiffusionService.findByIdWithAssociatedList(modeDiffusion).subscribe(res => {
           this.selectedModeDiffusion = res;
            this.selectedModeDiffusion.dateArchivage = new Date(modeDiffusion.dateArchivage);
            this.selectedModeDiffusion.dateCreation = new Date(modeDiffusion.dateCreation);
            this.editModeDiffusionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewModeDiffusion(modeDiffusion:ModeDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'view');
        if(isPermistted){
           this.modeDiffusionService.findByIdWithAssociatedList(modeDiffusion).subscribe(res => {
           this.selectedModeDiffusion = res;
            this.selectedModeDiffusion.dateArchivage = new Date(modeDiffusion.dateArchivage);
            this.selectedModeDiffusion.dateCreation = new Date(modeDiffusion.dateCreation);
            this.viewModeDiffusionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateModeDiffusion(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedModeDiffusion = new ModeDiffusionVo();
            this.createModeDiffusionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverModeDiffusion(modeDiffusion:ModeDiffusionVo){
const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Mode diffusion) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modeDiffusionService.archiver(modeDiffusion).subscribe(status=>{
const myIndex = this.modeDiffusions.indexOf(modeDiffusion);
this.modeDiffusions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Mode diffusion archivé',
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

public async desarchiverModeDiffusion(modeDiffusion:ModeDiffusionVo){
const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Mode diffusion) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.modeDiffusionService.desarchiver(modeDiffusion).subscribe(status=>{
const myIndex = this.modeDiffusions.indexOf(modeDiffusion);
this.modeDiffusions[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Mode diffusion désarchivé',
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


    public async deleteModeDiffusion(modeDiffusion:ModeDiffusionVo){
       const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Mode diffusion) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.modeDiffusionService.delete(modeDiffusion).subscribe(status=>{
                          if(status > 0){
                          const position = this.modeDiffusions.indexOf(modeDiffusion);
                          position > -1 ? this.modeDiffusions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Mode diffusion Supprimé',
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

public async loadTypeSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'list');
    isPermistted ? this.typeSavoirService.findAll().subscribe(typeSavoirs => this.typeSavoirs = typeSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateModeDiffusion(modeDiffusion: ModeDiffusionVo) {

     this.modeDiffusionService.findByIdWithAssociatedList(modeDiffusion).subscribe(
	 res => {
	       this.initDuplicateModeDiffusion(res);
	       this.selectedModeDiffusion = res;
	       this.selectedModeDiffusion.id = null;
            this.createModeDiffusionDialog = true;

});

	}

	initDuplicateModeDiffusion(res: ModeDiffusionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.modeDiffusions.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
            'Type savoir': e.typeSavoirVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchModeDiffusion.libelle ? this.searchModeDiffusion.libelle : environment.emptyForExport ,
            'Code': this.searchModeDiffusion.code ? this.searchModeDiffusion.code : environment.emptyForExport ,
        'Type savoir': this.searchModeDiffusion.typeSavoirVo?.libelle ? this.searchModeDiffusion.typeSavoirVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchModeDiffusion.archive ? (this.searchModeDiffusion.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchModeDiffusion.dateArchivageMin ? this.datePipe.transform(this.searchModeDiffusion.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchModeDiffusion.dateArchivageMax ? this.datePipe.transform(this.searchModeDiffusion.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchModeDiffusion.dateCreationMin ? this.datePipe.transform(this.searchModeDiffusion.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchModeDiffusion.dateCreationMax ? this.datePipe.transform(this.searchModeDiffusion.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchModeDiffusion.admin ? (this.searchModeDiffusion.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchModeDiffusion.visible ? (this.searchModeDiffusion.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchModeDiffusion.username ? this.searchModeDiffusion.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get modeDiffusions(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
    set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }

    get modeDiffusionSelections(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusionSelections;
       }
    set modeDiffusionSelections(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusionSelections = value;
       }
   
     


    get selectedModeDiffusion():ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
    set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
    
    get createModeDiffusionDialog():boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;
       }
    set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
       }
    
    get editModeDiffusionDialog():boolean {
           return this.modeDiffusionService.editModeDiffusionDialog;
       }
    set editModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.editModeDiffusionDialog= value;
       }
    get viewModeDiffusionDialog():boolean {
           return this.modeDiffusionService.viewModeDiffusionDialog;
       }
    set viewModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.viewModeDiffusionDialog = value;
       }
       
     get searchModeDiffusion(): ModeDiffusionVo {
        return this.modeDiffusionService.searchModeDiffusion;
       }
    set searchModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.searchModeDiffusion = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

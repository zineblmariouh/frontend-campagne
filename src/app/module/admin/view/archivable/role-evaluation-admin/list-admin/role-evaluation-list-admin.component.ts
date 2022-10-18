import {Component, OnInit} from '@angular/core';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
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
  selector: 'app-role-evaluation-list-admin',
  templateUrl: './role-evaluation-list-admin.component.html',
  styleUrls: ['./role-evaluation-list-admin.component.css']
})
export class RoleEvaluationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleEvaluation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private roleEvaluationService: RoleEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadRoleEvaluations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadRoleEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'list');
        isPermistted ? this.roleEvaluationService.findAll().subscribe(roleEvaluations => this.roleEvaluations = roleEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.roleEvaluationService.findByCriteria(this.searchRoleEvaluation).subscribe(roleEvaluations=>{
            
            this.roleEvaluations = roleEvaluations;
           // this.searchRoleEvaluation = new RoleEvaluationVo();
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
    
    public async editRoleEvaluation(roleEvaluation:RoleEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'edit');
         if(isPermistted){
          this.roleEvaluationService.findByIdWithAssociatedList(roleEvaluation).subscribe(res => {
           this.selectedRoleEvaluation = res;
            this.selectedRoleEvaluation.dateArchivage = new Date(roleEvaluation.dateArchivage);
            this.selectedRoleEvaluation.dateCreation = new Date(roleEvaluation.dateCreation);
            this.editRoleEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRoleEvaluation(roleEvaluation:RoleEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'view');
        if(isPermistted){
           this.roleEvaluationService.findByIdWithAssociatedList(roleEvaluation).subscribe(res => {
           this.selectedRoleEvaluation = res;
            this.selectedRoleEvaluation.dateArchivage = new Date(roleEvaluation.dateArchivage);
            this.selectedRoleEvaluation.dateCreation = new Date(roleEvaluation.dateCreation);
            this.viewRoleEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRoleEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRoleEvaluation = new RoleEvaluationVo();
            this.createRoleEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverRoleEvaluation(roleEvaluation:RoleEvaluationVo){
const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Role evaluation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.roleEvaluationService.archiver(roleEvaluation).subscribe(status=>{
const myIndex = this.roleEvaluations.indexOf(roleEvaluation);
this.roleEvaluations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Role evaluation archivé',
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

public async desarchiverRoleEvaluation(roleEvaluation:RoleEvaluationVo){
const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Role evaluation) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.roleEvaluationService.desarchiver(roleEvaluation).subscribe(status=>{
const myIndex = this.roleEvaluations.indexOf(roleEvaluation);
this.roleEvaluations[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Role evaluation désarchivé',
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


    public async deleteRoleEvaluation(roleEvaluation:RoleEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Role evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.roleEvaluationService.delete(roleEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.roleEvaluations.indexOf(roleEvaluation);
                          position > -1 ? this.roleEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Role evaluation Supprimé',
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


public async duplicateRoleEvaluation(roleEvaluation: RoleEvaluationVo) {

     this.roleEvaluationService.findByIdWithAssociatedList(roleEvaluation).subscribe(
	 res => {
	       this.initDuplicateRoleEvaluation(res);
	       this.selectedRoleEvaluation = res;
	       this.selectedRoleEvaluation.id = null;
            this.createRoleEvaluationDialog = true;

});

	}

	initDuplicateRoleEvaluation(res: RoleEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.roleEvaluations.map(e => {
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
            'Libelle': this.searchRoleEvaluation.libelle ? this.searchRoleEvaluation.libelle : environment.emptyForExport ,
            'Code': this.searchRoleEvaluation.code ? this.searchRoleEvaluation.code : environment.emptyForExport ,
            'Archive': this.searchRoleEvaluation.archive ? (this.searchRoleEvaluation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchRoleEvaluation.dateArchivageMin ? this.datePipe.transform(this.searchRoleEvaluation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchRoleEvaluation.dateArchivageMax ? this.datePipe.transform(this.searchRoleEvaluation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchRoleEvaluation.dateCreationMin ? this.datePipe.transform(this.searchRoleEvaluation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchRoleEvaluation.dateCreationMax ? this.datePipe.transform(this.searchRoleEvaluation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchRoleEvaluation.admin ? (this.searchRoleEvaluation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchRoleEvaluation.visible ? (this.searchRoleEvaluation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchRoleEvaluation.username ? this.searchRoleEvaluation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get roleEvaluations(): Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
    set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }

    get roleEvaluationSelections(): Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluationSelections;
       }
    set roleEvaluationSelections(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluationSelections = value;
       }
   
     


    get selectedRoleEvaluation():RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
    set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
    
    get createRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.createRoleEvaluationDialog;
       }
    set createRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.createRoleEvaluationDialog= value;
       }
    
    get editRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.editRoleEvaluationDialog;
       }
    set editRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.editRoleEvaluationDialog= value;
       }
    get viewRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.viewRoleEvaluationDialog;
       }
    set viewRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.viewRoleEvaluationDialog = value;
       }
       
     get searchRoleEvaluation(): RoleEvaluationVo {
        return this.roleEvaluationService.searchRoleEvaluation;
       }
    set searchRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.searchRoleEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

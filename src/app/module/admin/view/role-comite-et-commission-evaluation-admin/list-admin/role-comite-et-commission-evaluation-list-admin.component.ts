import {Component, OnInit} from '@angular/core';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RoleEvaluationService } from '../../../../../controller/service/RoleEvaluation.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-role-comite-et-commission-evaluation-list-admin',
  templateUrl: './role-comite-et-commission-evaluation-list-admin.component.html',
  styleUrls: ['./role-comite-et-commission-evaluation-list-admin.component.css']
})
export class RoleComiteEtCommissionEvaluationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleComiteEtCommissionEvaluation';
    roleEvaluations :Array<RoleEvaluationVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private roleComiteEtCommissionEvaluationService: RoleComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private roleEvaluationService: RoleEvaluationService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadRoleComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadRoleEvaluation();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadRoleComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.roleComiteEtCommissionEvaluationService.findAll().subscribe(roleComiteEtCommissionEvaluations => this.roleComiteEtCommissionEvaluations = roleComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.roleComiteEtCommissionEvaluationService.findByCriteria(this.searchRoleComiteEtCommissionEvaluation).subscribe(roleComiteEtCommissionEvaluations=>{
            
            this.roleComiteEtCommissionEvaluations = roleComiteEtCommissionEvaluations;
           // this.searchRoleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'roleEvaluation?.libelle', header: 'Role evaluation'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editRoleComiteEtCommissionEvaluation(roleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.roleComiteEtCommissionEvaluationService.findByIdWithAssociatedList(roleComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedRoleComiteEtCommissionEvaluation = res;
            this.editRoleComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRoleComiteEtCommissionEvaluation(roleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.roleComiteEtCommissionEvaluationService.findByIdWithAssociatedList(roleComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedRoleComiteEtCommissionEvaluation = res;
            this.viewRoleComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRoleComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRoleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();
            this.createRoleComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRoleComiteEtCommissionEvaluation(roleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Role comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.roleComiteEtCommissionEvaluationService.delete(roleComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.roleComiteEtCommissionEvaluations.indexOf(roleComiteEtCommissionEvaluation);
                          position > -1 ? this.roleComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Role comite et commission evaluation Supprimé',
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

public async loadRoleEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.roleEvaluationService.findAll().subscribe(roleEvaluations => this.roleEvaluations = roleEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RoleComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRoleComiteEtCommissionEvaluation(roleComiteEtCommissionEvaluation: RoleComiteEtCommissionEvaluationVo) {

     this.roleComiteEtCommissionEvaluationService.findByIdWithAssociatedList(roleComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateRoleComiteEtCommissionEvaluation(res);
	       this.selectedRoleComiteEtCommissionEvaluation = res;
	       this.selectedRoleComiteEtCommissionEvaluation.id = null;
            this.createRoleComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateRoleComiteEtCommissionEvaluation(res: RoleComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.roleComiteEtCommissionEvaluations.map(e => {
    return {
            'Role evaluation': e.roleEvaluationVo?.libelle ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Role evaluation': this.searchRoleComiteEtCommissionEvaluation.roleEvaluationVo?.libelle ? this.searchRoleComiteEtCommissionEvaluation.roleEvaluationVo?.libelle : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchRoleComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchRoleComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get roleComiteEtCommissionEvaluations(): Array<RoleComiteEtCommissionEvaluationVo> {
           return this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations;
       }
    set roleComiteEtCommissionEvaluations(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations = value;
       }

    get roleComiteEtCommissionEvaluationSelections(): Array<RoleComiteEtCommissionEvaluationVo> {
           return this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluationSelections;
       }
    set roleComiteEtCommissionEvaluationSelections(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedRoleComiteEtCommissionEvaluation():RoleComiteEtCommissionEvaluationVo {
           return this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation;
       }
    set selectedRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation = value;
       }
    
    get createRoleComiteEtCommissionEvaluationDialog():boolean {
           return this.roleComiteEtCommissionEvaluationService.createRoleComiteEtCommissionEvaluationDialog;
       }
    set createRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.createRoleComiteEtCommissionEvaluationDialog= value;
       }
    
    get editRoleComiteEtCommissionEvaluationDialog():boolean {
           return this.roleComiteEtCommissionEvaluationService.editRoleComiteEtCommissionEvaluationDialog;
       }
    set editRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.editRoleComiteEtCommissionEvaluationDialog= value;
       }
    get viewRoleComiteEtCommissionEvaluationDialog():boolean {
           return this.roleComiteEtCommissionEvaluationService.viewRoleComiteEtCommissionEvaluationDialog;
       }
    set viewRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.viewRoleComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchRoleComiteEtCommissionEvaluation(): RoleComiteEtCommissionEvaluationVo {
        return this.roleComiteEtCommissionEvaluationService.searchRoleComiteEtCommissionEvaluation;
       }
    set searchRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this.roleComiteEtCommissionEvaluationService.searchRoleComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeExpertiseEvaluationService } from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-expertise-evaluation-comite-et-commission-evaluation-list-admin',
  templateUrl: './type-expertise-evaluation-comite-et-commission-evaluation-list-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-comite-et-commission-evaluation-list-admin.component.css']
})
export class TypeExpertiseEvaluationComiteEtCommissionEvaluationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeExpertiseEvaluationComiteEtCommissionEvaluation';
    typeExpertiseEvaluations :Array<TypeExpertiseEvaluationVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private typeExpertiseEvaluationComiteEtCommissionEvaluationService: TypeExpertiseEvaluationComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadTypeExpertiseEvaluationComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadTypeExpertiseEvaluation();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadTypeExpertiseEvaluationComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.findAll().subscribe(typeExpertiseEvaluationComiteEtCommissionEvaluations => this.typeExpertiseEvaluationComiteEtCommissionEvaluations = typeExpertiseEvaluationComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.findByCriteria(this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation).subscribe(typeExpertiseEvaluationComiteEtCommissionEvaluations=>{
            
            this.typeExpertiseEvaluationComiteEtCommissionEvaluations = typeExpertiseEvaluationComiteEtCommissionEvaluations;
           // this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeExpertiseEvaluation?.libelle', header: 'Type expertise evaluation'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editTypeExpertiseEvaluationComiteEtCommissionEvaluation(typeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluationComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = res;
            this.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeExpertiseEvaluationComiteEtCommissionEvaluation(typeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluationComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = res;
            this.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeExpertiseEvaluationComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
            this.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeExpertiseEvaluationComiteEtCommissionEvaluation(typeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type expertise evaluation comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.delete(typeExpertiseEvaluationComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeExpertiseEvaluationComiteEtCommissionEvaluations.indexOf(typeExpertiseEvaluationComiteEtCommissionEvaluation);
                          position > -1 ? this.typeExpertiseEvaluationComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type expertise evaluation comite et commission evaluation Supprimé',
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

public async loadTypeExpertiseEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.typeExpertiseEvaluationService.findAll().subscribe(typeExpertiseEvaluations => this.typeExpertiseEvaluations = typeExpertiseEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluationComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeExpertiseEvaluationComiteEtCommissionEvaluation(typeExpertiseEvaluationComiteEtCommissionEvaluation: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {

     this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluationComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateTypeExpertiseEvaluationComiteEtCommissionEvaluation(res);
	       this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = res;
	       this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation.id = null;
            this.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateTypeExpertiseEvaluationComiteEtCommissionEvaluation(res: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeExpertiseEvaluationComiteEtCommissionEvaluations.map(e => {
    return {
            'Type expertise evaluation': e.typeExpertiseEvaluationVo?.libelle ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type expertise evaluation': this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation.typeExpertiseEvaluationVo?.libelle ? this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation.typeExpertiseEvaluationVo?.libelle : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeExpertiseEvaluationComiteEtCommissionEvaluations(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations;
       }
    set typeExpertiseEvaluationComiteEtCommissionEvaluations(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations = value;
       }

    get typeExpertiseEvaluationComiteEtCommissionEvaluationSelections(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluationSelections;
       }
    set typeExpertiseEvaluationComiteEtCommissionEvaluationSelections(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation():TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }
    set selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }
    
    get createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }
    set createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog= value;
       }
    
    get editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }
    set editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog= value;
       }
    get viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }
    set viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchTypeExpertiseEvaluationComiteEtCommissionEvaluation(): TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
        return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }
    set searchTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.searchTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

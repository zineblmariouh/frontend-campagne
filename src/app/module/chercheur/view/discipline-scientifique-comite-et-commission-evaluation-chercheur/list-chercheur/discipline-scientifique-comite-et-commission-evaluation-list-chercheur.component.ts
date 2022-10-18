import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';
import { ComiteEtCommissionEvaluationService } from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-comite-et-commission-evaluation-list-chercheur',
  templateUrl: './discipline-scientifique-comite-et-commission-evaluation-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-comite-et-commission-evaluation-list-chercheur.component.css']
})
export class DisciplineScientifiqueComiteEtCommissionEvaluationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueComiteEtCommissionEvaluation';
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    comiteEtCommissionEvaluations :Array<ComiteEtCommissionEvaluationVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueComiteEtCommissionEvaluationService: DisciplineScientifiqueComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadComiteEtCommissionEvaluation();
    }
    
    // methods
      public async loadDisciplineScientifiqueComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.disciplineScientifiqueComiteEtCommissionEvaluationService.findAll().subscribe(disciplineScientifiqueComiteEtCommissionEvaluations => this.disciplineScientifiqueComiteEtCommissionEvaluations = disciplineScientifiqueComiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.findByCriteria(this.searchDisciplineScientifiqueComiteEtCommissionEvaluation).subscribe(disciplineScientifiqueComiteEtCommissionEvaluations=>{
            
            this.disciplineScientifiqueComiteEtCommissionEvaluations = disciplineScientifiqueComiteEtCommissionEvaluations;
           // this.searchDisciplineScientifiqueComiteEtCommissionEvaluation = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'comiteEtCommissionEvaluation?.id', header: 'Comite et commission evaluation'},
        ];
    }
    
    public async editDisciplineScientifiqueComiteEtCommissionEvaluation(disciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueComiteEtCommissionEvaluationService.findByIdWithAssociatedList(disciplineScientifiqueComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = res;
            this.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueComiteEtCommissionEvaluation(disciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.disciplineScientifiqueComiteEtCommissionEvaluationService.findByIdWithAssociatedList(disciplineScientifiqueComiteEtCommissionEvaluation).subscribe(res => {
           this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = res;
            this.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
            this.createDisciplineScientifiqueComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueComiteEtCommissionEvaluation(disciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueComiteEtCommissionEvaluationService.delete(disciplineScientifiqueComiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueComiteEtCommissionEvaluations.indexOf(disciplineScientifiqueComiteEtCommissionEvaluation);
                          position > -1 ? this.disciplineScientifiqueComiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique comite et commission evaluation Supprimé',
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

public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadComiteEtCommissionEvaluation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueComiteEtCommissionEvaluation(disciplineScientifiqueComiteEtCommissionEvaluation: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {

     this.disciplineScientifiqueComiteEtCommissionEvaluationService.findByIdWithAssociatedList(disciplineScientifiqueComiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueComiteEtCommissionEvaluation(res);
	       this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = res;
	       this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation.id = null;
            this.createDisciplineScientifiqueComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueComiteEtCommissionEvaluation(res: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueComiteEtCommissionEvaluations.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Comite et commission evaluation': e.comiteEtCommissionEvaluationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchDisciplineScientifiqueComiteEtCommissionEvaluation.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueComiteEtCommissionEvaluation.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Comite et commission evaluation': this.searchDisciplineScientifiqueComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id ? this.searchDisciplineScientifiqueComiteEtCommissionEvaluation.comiteEtCommissionEvaluationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueComiteEtCommissionEvaluations(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations;
       }
    set disciplineScientifiqueComiteEtCommissionEvaluations(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations = value;
       }

    get disciplineScientifiqueComiteEtCommissionEvaluationSelections(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluationSelections;
       }
    set disciplineScientifiqueComiteEtCommissionEvaluationSelections(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueComiteEtCommissionEvaluation():DisciplineScientifiqueComiteEtCommissionEvaluationVo {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation;
       }
    set selectedDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }
    
    get createDisciplineScientifiqueComiteEtCommissionEvaluationDialog():boolean {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.createDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }
    set createDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.createDisciplineScientifiqueComiteEtCommissionEvaluationDialog= value;
       }
    
    get editDisciplineScientifiqueComiteEtCommissionEvaluationDialog():boolean {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }
    set editDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog= value;
       }
    get viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog():boolean {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }
    set viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchDisciplineScientifiqueComiteEtCommissionEvaluation(): DisciplineScientifiqueComiteEtCommissionEvaluationVo {
        return this.disciplineScientifiqueComiteEtCommissionEvaluationService.searchDisciplineScientifiqueComiteEtCommissionEvaluation;
       }
    set searchDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.searchDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

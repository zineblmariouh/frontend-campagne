import {Component, OnInit} from '@angular/core';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-formation-continue-discipline-scientifique-list-admin',
  templateUrl: './formation-continue-discipline-scientifique-list-admin.component.html',
  styleUrls: ['./formation-continue-discipline-scientifique-list-admin.component.css']
})
export class FormationContinueDisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinueDisciplineScientifique';
    formationContinues :Array<FormationContinueVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formationContinueService: FormationContinueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadFormationContinueDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadFormationContinue();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadFormationContinueDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'list');
        isPermistted ? this.formationContinueDisciplineScientifiqueService.findAll().subscribe(formationContinueDisciplineScientifiques => this.formationContinueDisciplineScientifiques = formationContinueDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formationContinueDisciplineScientifiqueService.findByCriteria(this.searchFormationContinueDisciplineScientifique).subscribe(formationContinueDisciplineScientifiques=>{
            
            this.formationContinueDisciplineScientifiques = formationContinueDisciplineScientifiques;
           // this.searchFormationContinueDisciplineScientifique = new FormationContinueDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editFormationContinueDisciplineScientifique(formationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'edit');
         if(isPermistted){
          this.formationContinueDisciplineScientifiqueService.findByIdWithAssociatedList(formationContinueDisciplineScientifique).subscribe(res => {
           this.selectedFormationContinueDisciplineScientifique = res;
            this.editFormationContinueDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormationContinueDisciplineScientifique(formationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'view');
        if(isPermistted){
           this.formationContinueDisciplineScientifiqueService.findByIdWithAssociatedList(formationContinueDisciplineScientifique).subscribe(res => {
           this.selectedFormationContinueDisciplineScientifique = res;
            this.viewFormationContinueDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormationContinueDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormationContinueDisciplineScientifique = new FormationContinueDisciplineScientifiqueVo();
            this.createFormationContinueDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormationContinueDisciplineScientifique(formationContinueDisciplineScientifique:FormationContinueDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Formation continue discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formationContinueDisciplineScientifiqueService.delete(formationContinueDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.formationContinueDisciplineScientifiques.indexOf(formationContinueDisciplineScientifique);
                          position > -1 ? this.formationContinueDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Formation continue discipline scientifique Supprimé',
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

public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFormationContinueDisciplineScientifique(formationContinueDisciplineScientifique: FormationContinueDisciplineScientifiqueVo) {

     this.formationContinueDisciplineScientifiqueService.findByIdWithAssociatedList(formationContinueDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateFormationContinueDisciplineScientifique(res);
	       this.selectedFormationContinueDisciplineScientifique = res;
	       this.selectedFormationContinueDisciplineScientifique.id = null;
            this.createFormationContinueDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateFormationContinueDisciplineScientifique(res: FormationContinueDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formationContinueDisciplineScientifiques.map(e => {
    return {
            'Formation continue': e.formationContinueVo?.intitule ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Formation continue': this.searchFormationContinueDisciplineScientifique.formationContinueVo?.intitule ? this.searchFormationContinueDisciplineScientifique.formationContinueVo?.intitule : environment.emptyForExport ,
        'Discipline scientifique': this.searchFormationContinueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchFormationContinueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formationContinueDisciplineScientifiques(): Array<FormationContinueDisciplineScientifiqueVo> {
           return this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques;
       }
    set formationContinueDisciplineScientifiques(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques = value;
       }

    get formationContinueDisciplineScientifiqueSelections(): Array<FormationContinueDisciplineScientifiqueVo> {
           return this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiqueSelections;
       }
    set formationContinueDisciplineScientifiqueSelections(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedFormationContinueDisciplineScientifique():FormationContinueDisciplineScientifiqueVo {
           return this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique;
       }
    set selectedFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique = value;
       }
    
    get createFormationContinueDisciplineScientifiqueDialog():boolean {
           return this.formationContinueDisciplineScientifiqueService.createFormationContinueDisciplineScientifiqueDialog;
       }
    set createFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this.formationContinueDisciplineScientifiqueService.createFormationContinueDisciplineScientifiqueDialog= value;
       }
    
    get editFormationContinueDisciplineScientifiqueDialog():boolean {
           return this.formationContinueDisciplineScientifiqueService.editFormationContinueDisciplineScientifiqueDialog;
       }
    set editFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this.formationContinueDisciplineScientifiqueService.editFormationContinueDisciplineScientifiqueDialog= value;
       }
    get viewFormationContinueDisciplineScientifiqueDialog():boolean {
           return this.formationContinueDisciplineScientifiqueService.viewFormationContinueDisciplineScientifiqueDialog;
       }
    set viewFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this.formationContinueDisciplineScientifiqueService.viewFormationContinueDisciplineScientifiqueDialog = value;
       }
       
     get searchFormationContinueDisciplineScientifique(): FormationContinueDisciplineScientifiqueVo {
        return this.formationContinueDisciplineScientifiqueService.searchFormationContinueDisciplineScientifique;
       }
    set searchFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this.formationContinueDisciplineScientifiqueService.searchFormationContinueDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

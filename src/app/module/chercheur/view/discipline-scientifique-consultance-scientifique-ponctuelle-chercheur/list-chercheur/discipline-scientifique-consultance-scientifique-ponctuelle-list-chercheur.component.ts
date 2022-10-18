import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-consultance-scientifique-ponctuelle-list-chercheur',
  templateUrl: './discipline-scientifique-consultance-scientifique-ponctuelle-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-consultance-scientifique-ponctuelle-list-chercheur.component.css']
})
export class DisciplineScientifiqueConsultanceScientifiquePonctuelleListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueConsultanceScientifiquePonctuelle';
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueConsultanceScientifiquePonctuelleService: DisciplineScientifiqueConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadConsultanceScientifiquePonctuelle();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.findAll().subscribe(disciplineScientifiqueConsultanceScientifiquePonctuelles => this.disciplineScientifiqueConsultanceScientifiquePonctuelles = disciplineScientifiqueConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.findByCriteria(this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle).subscribe(disciplineScientifiqueConsultanceScientifiquePonctuelles=>{
            
            this.disciplineScientifiqueConsultanceScientifiquePonctuelles = disciplineScientifiqueConsultanceScientifiquePonctuelles;
           // this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueConsultanceScientifiquePonctuelle(disciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(disciplineScientifiqueConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = res;
            this.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueConsultanceScientifiquePonctuelle(disciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(disciplineScientifiqueConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = res;
            this.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
            this.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueConsultanceScientifiquePonctuelle(disciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.delete(disciplineScientifiqueConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueConsultanceScientifiquePonctuelles.indexOf(disciplineScientifiqueConsultanceScientifiquePonctuelle);
                          position > -1 ? this.disciplineScientifiqueConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique consultance scientifique ponctuelle Supprimé',
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

public async loadConsultanceScientifiquePonctuelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueConsultanceScientifiquePonctuelle(disciplineScientifiqueConsultanceScientifiquePonctuelle: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {

     this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(disciplineScientifiqueConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueConsultanceScientifiquePonctuelle(res);
	       this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = res;
	       this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle.id = null;
            this.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueConsultanceScientifiquePonctuelle(res: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Consultance scientifique ponctuelle': this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueConsultanceScientifiquePonctuelles(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles;
       }
    set disciplineScientifiqueConsultanceScientifiquePonctuelles(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles = value;
       }

    get disciplineScientifiqueConsultanceScientifiquePonctuelleSelections(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelleSelections;
       }
    set disciplineScientifiqueConsultanceScientifiquePonctuelleSelections(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle():DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }
    set selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }
    
    get createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }
    set createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }
    set editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }
    set viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchDisciplineScientifiqueConsultanceScientifiquePonctuelle(): DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
        return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }
    set searchDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.searchDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConseilsScientifiqueService } from '../../../../../controller/service/ConseilsScientifique.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-conseils-scientifique-list-chercheur',
  templateUrl: './discipline-scientifique-conseils-scientifique-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-conseils-scientifique-list-chercheur.component.css']
})
export class DisciplineScientifiqueConseilsScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueConseilsScientifique';
    conseilsScientifiques :Array<ConseilsScientifiqueVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilsScientifiqueService: DisciplineScientifiqueConseilsScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private conseilsScientifiqueService: ConseilsScientifiqueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueConseilsScientifiques();
      this.initExport();
      this.initCol();
      this.loadConseilsScientifique();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueConseilsScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'list');
        isPermistted ? this.disciplineScientifiqueConseilsScientifiqueService.findAll().subscribe(disciplineScientifiqueConseilsScientifiques => this.disciplineScientifiqueConseilsScientifiques = disciplineScientifiqueConseilsScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueConseilsScientifiqueService.findByCriteria(this.searchDisciplineScientifiqueConseilsScientifique).subscribe(disciplineScientifiqueConseilsScientifiques=>{
            
            this.disciplineScientifiqueConseilsScientifiques = disciplineScientifiqueConseilsScientifiques;
           // this.searchDisciplineScientifiqueConseilsScientifique = new DisciplineScientifiqueConseilsScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'conseilsScientifique?.id', header: 'Conseils scientifique'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueConseilsScientifique(disciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueConseilsScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilsScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueConseilsScientifique = res;
            this.editDisciplineScientifiqueConseilsScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueConseilsScientifique(disciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'view');
        if(isPermistted){
           this.disciplineScientifiqueConseilsScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilsScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueConseilsScientifique = res;
            this.viewDisciplineScientifiqueConseilsScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueConseilsScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueConseilsScientifique = new DisciplineScientifiqueConseilsScientifiqueVo();
            this.createDisciplineScientifiqueConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueConseilsScientifique(disciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique conseils scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueConseilsScientifiqueService.delete(disciplineScientifiqueConseilsScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueConseilsScientifiques.indexOf(disciplineScientifiqueConseilsScientifique);
                          position > -1 ? this.disciplineScientifiqueConseilsScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique conseils scientifique Supprimé',
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

public async loadConseilsScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'list');
    isPermistted ? this.conseilsScientifiqueService.findAll().subscribe(conseilsScientifiques => this.conseilsScientifiques = conseilsScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilsScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueConseilsScientifique(disciplineScientifiqueConseilsScientifique: DisciplineScientifiqueConseilsScientifiqueVo) {

     this.disciplineScientifiqueConseilsScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilsScientifique).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueConseilsScientifique(res);
	       this.selectedDisciplineScientifiqueConseilsScientifique = res;
	       this.selectedDisciplineScientifiqueConseilsScientifique.id = null;
            this.createDisciplineScientifiqueConseilsScientifiqueDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueConseilsScientifique(res: DisciplineScientifiqueConseilsScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueConseilsScientifiques.map(e => {
    return {
            'Conseils scientifique': e.conseilsScientifiqueVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Conseils scientifique': this.searchDisciplineScientifiqueConseilsScientifique.conseilsScientifiqueVo?.id ? this.searchDisciplineScientifiqueConseilsScientifique.conseilsScientifiqueVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchDisciplineScientifiqueConseilsScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueConseilsScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueConseilsScientifiques(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
           return this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques;
       }
    set disciplineScientifiqueConseilsScientifiques(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques = value;
       }

    get disciplineScientifiqueConseilsScientifiqueSelections(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
           return this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiqueSelections;
       }
    set disciplineScientifiqueConseilsScientifiqueSelections(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiqueSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueConseilsScientifique():DisciplineScientifiqueConseilsScientifiqueVo {
           return this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique;
       }
    set selectedDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique = value;
       }
    
    get createDisciplineScientifiqueConseilsScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.createDisciplineScientifiqueConseilsScientifiqueDialog;
       }
    set createDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.createDisciplineScientifiqueConseilsScientifiqueDialog= value;
       }
    
    get editDisciplineScientifiqueConseilsScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.editDisciplineScientifiqueConseilsScientifiqueDialog;
       }
    set editDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.editDisciplineScientifiqueConseilsScientifiqueDialog= value;
       }
    get viewDisciplineScientifiqueConseilsScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.viewDisciplineScientifiqueConseilsScientifiqueDialog;
       }
    set viewDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.viewDisciplineScientifiqueConseilsScientifiqueDialog = value;
       }
       
     get searchDisciplineScientifiqueConseilsScientifique(): DisciplineScientifiqueConseilsScientifiqueVo {
        return this.disciplineScientifiqueConseilsScientifiqueService.searchDisciplineScientifiqueConseilsScientifique;
       }
    set searchDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.disciplineScientifiqueConseilsScientifiqueService.searchDisciplineScientifiqueConseilsScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

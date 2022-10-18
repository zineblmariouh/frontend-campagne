import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EvenementColloqueScienntifiqueService } from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-evenement-colloque-scientifique-list-chercheur',
  templateUrl: './discipline-scientifique-evenement-colloque-scientifique-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-evenement-colloque-scientifique-list-chercheur.component.css']
})
export class DisciplineScientifiqueEvenementColloqueScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueEvenementColloqueScientifique';
    evenementColloqueScienntifiques :Array<EvenementColloqueScienntifiqueVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueEvenementColloqueScientifiqueService: DisciplineScientifiqueEvenementColloqueScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueEvenementColloqueScientifiques();
      this.initExport();
      this.initCol();
      this.loadEvenementColloqueScienntifique();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueEvenementColloqueScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'list');
        isPermistted ? this.disciplineScientifiqueEvenementColloqueScientifiqueService.findAll().subscribe(disciplineScientifiqueEvenementColloqueScientifiques => this.disciplineScientifiqueEvenementColloqueScientifiques = disciplineScientifiqueEvenementColloqueScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.findByCriteria(this.searchDisciplineScientifiqueEvenementColloqueScientifique).subscribe(disciplineScientifiqueEvenementColloqueScientifiques=>{
            
            this.disciplineScientifiqueEvenementColloqueScientifiques = disciplineScientifiqueEvenementColloqueScientifiques;
           // this.searchDisciplineScientifiqueEvenementColloqueScientifique = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'evenementColloqueScienntifique?.id', header: 'Evenement colloque scienntifique'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueEvenementColloqueScientifique(disciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueEvenementColloqueScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueEvenementColloqueScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueEvenementColloqueScientifique = res;
            this.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueEvenementColloqueScientifique(disciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'view');
        if(isPermistted){
           this.disciplineScientifiqueEvenementColloqueScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueEvenementColloqueScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueEvenementColloqueScientifique = res;
            this.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueEvenementColloqueScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueEvenementColloqueScientifique = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
            this.createDisciplineScientifiqueEvenementColloqueScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueEvenementColloqueScientifique(disciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique evenement colloque scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueEvenementColloqueScientifiqueService.delete(disciplineScientifiqueEvenementColloqueScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueEvenementColloqueScientifiques.indexOf(disciplineScientifiqueEvenementColloqueScientifique);
                          position > -1 ? this.disciplineScientifiqueEvenementColloqueScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique evenement colloque scientifique Supprimé',
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

public async loadEvenementColloqueScienntifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'list');
    isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEvenementColloqueScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueEvenementColloqueScientifique(disciplineScientifiqueEvenementColloqueScientifique: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {

     this.disciplineScientifiqueEvenementColloqueScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueEvenementColloqueScientifique).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueEvenementColloqueScientifique(res);
	       this.selectedDisciplineScientifiqueEvenementColloqueScientifique = res;
	       this.selectedDisciplineScientifiqueEvenementColloqueScientifique.id = null;
            this.createDisciplineScientifiqueEvenementColloqueScientifiqueDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueEvenementColloqueScientifique(res: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueEvenementColloqueScientifiques.map(e => {
    return {
            'Evenement colloque scienntifique': e.evenementColloqueScienntifiqueVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Evenement colloque scienntifique': this.searchDisciplineScientifiqueEvenementColloqueScientifique.evenementColloqueScienntifiqueVo?.id ? this.searchDisciplineScientifiqueEvenementColloqueScientifique.evenementColloqueScienntifiqueVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchDisciplineScientifiqueEvenementColloqueScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueEvenementColloqueScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueEvenementColloqueScientifiques(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques;
       }
    set disciplineScientifiqueEvenementColloqueScientifiques(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques = value;
       }

    get disciplineScientifiqueEvenementColloqueScientifiqueSelections(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiqueSelections;
       }
    set disciplineScientifiqueEvenementColloqueScientifiqueSelections(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiqueSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueEvenementColloqueScientifique():DisciplineScientifiqueEvenementColloqueScientifiqueVo {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique;
       }
    set selectedDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique = value;
       }
    
    get createDisciplineScientifiqueEvenementColloqueScientifiqueDialog():boolean {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.createDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }
    set createDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.createDisciplineScientifiqueEvenementColloqueScientifiqueDialog= value;
       }
    
    get editDisciplineScientifiqueEvenementColloqueScientifiqueDialog():boolean {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }
    set editDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog= value;
       }
    get viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog():boolean {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }
    set viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog = value;
       }
       
     get searchDisciplineScientifiqueEvenementColloqueScientifique(): DisciplineScientifiqueEvenementColloqueScientifiqueVo {
        return this.disciplineScientifiqueEvenementColloqueScientifiqueService.searchDisciplineScientifiqueEvenementColloqueScientifique;
       }
    set searchDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.searchDisciplineScientifiqueEvenementColloqueScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

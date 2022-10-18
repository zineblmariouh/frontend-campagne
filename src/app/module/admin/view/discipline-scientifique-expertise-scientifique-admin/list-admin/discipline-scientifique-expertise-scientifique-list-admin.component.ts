import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueExpertiseScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueExpertiseScientifique.service';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueExpertiseScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';
import { ExpertiseScientifiqueService } from '../../../../../controller/service/ExpertiseScientifique.service';

import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-expertise-scientifique-list-admin',
  templateUrl: './discipline-scientifique-expertise-scientifique-list-admin.component.html',
  styleUrls: ['./discipline-scientifique-expertise-scientifique-list-admin.component.css']
})
export class DisciplineScientifiqueExpertiseScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueExpertiseScientifique';
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    expertiseScientifiques :Array<ExpertiseScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueExpertiseScientifiqueService: DisciplineScientifiqueExpertiseScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private expertiseScientifiqueService: ExpertiseScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueExpertiseScientifiques();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadExpertiseScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueExpertiseScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'list');
        isPermistted ? this.disciplineScientifiqueExpertiseScientifiqueService.findAll().subscribe(disciplineScientifiqueExpertiseScientifiques => this.disciplineScientifiqueExpertiseScientifiques = disciplineScientifiqueExpertiseScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueExpertiseScientifiqueService.findByCriteria(this.searchDisciplineScientifiqueExpertiseScientifique).subscribe(disciplineScientifiqueExpertiseScientifiques=>{
            
            this.disciplineScientifiqueExpertiseScientifiques = disciplineScientifiqueExpertiseScientifiques;
           // this.searchDisciplineScientifiqueExpertiseScientifique = new DisciplineScientifiqueExpertiseScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'expertiseScientifique?.id', header: 'Expertise scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueExpertiseScientifique(disciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueExpertiseScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueExpertiseScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueExpertiseScientifique = res;
            this.editDisciplineScientifiqueExpertiseScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueExpertiseScientifique(disciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'view');
        if(isPermistted){
           this.disciplineScientifiqueExpertiseScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueExpertiseScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueExpertiseScientifique = res;
            this.viewDisciplineScientifiqueExpertiseScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueExpertiseScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueExpertiseScientifique = new DisciplineScientifiqueExpertiseScientifiqueVo();
            this.createDisciplineScientifiqueExpertiseScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueExpertiseScientifique(disciplineScientifiqueExpertiseScientifique:DisciplineScientifiqueExpertiseScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique expertise scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueExpertiseScientifiqueService.delete(disciplineScientifiqueExpertiseScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueExpertiseScientifiques.indexOf(disciplineScientifiqueExpertiseScientifique);
                          position > -1 ? this.disciplineScientifiqueExpertiseScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique expertise scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadExpertiseScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueExpertiseScientifique', 'list');
    isPermistted ? this.expertiseScientifiqueService.findAll().subscribe(expertiseScientifiques => this.expertiseScientifiques = expertiseScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueExpertiseScientifique(disciplineScientifiqueExpertiseScientifique: DisciplineScientifiqueExpertiseScientifiqueVo) {

     this.disciplineScientifiqueExpertiseScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueExpertiseScientifique).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueExpertiseScientifique(res);
	       this.selectedDisciplineScientifiqueExpertiseScientifique = res;
	       this.selectedDisciplineScientifiqueExpertiseScientifique.id = null;
            this.createDisciplineScientifiqueExpertiseScientifiqueDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueExpertiseScientifique(res: DisciplineScientifiqueExpertiseScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueExpertiseScientifiques.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Expertise scientifique': e.expertiseScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchDisciplineScientifiqueExpertiseScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueExpertiseScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Expertise scientifique': this.searchDisciplineScientifiqueExpertiseScientifique.expertiseScientifiqueVo?.id ? this.searchDisciplineScientifiqueExpertiseScientifique.expertiseScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueExpertiseScientifiques(): Array<DisciplineScientifiqueExpertiseScientifiqueVo> {
           return this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiques;
       }
    set disciplineScientifiqueExpertiseScientifiques(value: Array<DisciplineScientifiqueExpertiseScientifiqueVo>) {
        this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiques = value;
       }

    get disciplineScientifiqueExpertiseScientifiqueSelections(): Array<DisciplineScientifiqueExpertiseScientifiqueVo> {
           return this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiqueSelections;
       }
    set disciplineScientifiqueExpertiseScientifiqueSelections(value: Array<DisciplineScientifiqueExpertiseScientifiqueVo>) {
        this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiqueSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueExpertiseScientifique():DisciplineScientifiqueExpertiseScientifiqueVo {
           return this.disciplineScientifiqueExpertiseScientifiqueService.selectedDisciplineScientifiqueExpertiseScientifique;
       }
    set selectedDisciplineScientifiqueExpertiseScientifique(value: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this.disciplineScientifiqueExpertiseScientifiqueService.selectedDisciplineScientifiqueExpertiseScientifique = value;
       }
    
    get createDisciplineScientifiqueExpertiseScientifiqueDialog():boolean {
           return this.disciplineScientifiqueExpertiseScientifiqueService.createDisciplineScientifiqueExpertiseScientifiqueDialog;
       }
    set createDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueExpertiseScientifiqueService.createDisciplineScientifiqueExpertiseScientifiqueDialog= value;
       }
    
    get editDisciplineScientifiqueExpertiseScientifiqueDialog():boolean {
           return this.disciplineScientifiqueExpertiseScientifiqueService.editDisciplineScientifiqueExpertiseScientifiqueDialog;
       }
    set editDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueExpertiseScientifiqueService.editDisciplineScientifiqueExpertiseScientifiqueDialog= value;
       }
    get viewDisciplineScientifiqueExpertiseScientifiqueDialog():boolean {
           return this.disciplineScientifiqueExpertiseScientifiqueService.viewDisciplineScientifiqueExpertiseScientifiqueDialog;
       }
    set viewDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueExpertiseScientifiqueService.viewDisciplineScientifiqueExpertiseScientifiqueDialog = value;
       }
       
     get searchDisciplineScientifiqueExpertiseScientifique(): DisciplineScientifiqueExpertiseScientifiqueVo {
        return this.disciplineScientifiqueExpertiseScientifiqueService.searchDisciplineScientifiqueExpertiseScientifique;
       }
    set searchDisciplineScientifiqueExpertiseScientifique(value: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this.disciplineScientifiqueExpertiseScientifiqueService.searchDisciplineScientifiqueExpertiseScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

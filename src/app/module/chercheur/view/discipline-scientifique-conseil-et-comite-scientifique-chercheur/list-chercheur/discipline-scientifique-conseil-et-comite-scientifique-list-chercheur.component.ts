import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilEtComiteScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilEtComiteScientifique.service';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';
import { ConseilEtComiteScientifiqueService } from '../../../../../controller/service/ConseilEtComiteScientifique.service';

import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-conseil-et-comite-scientifique-list-chercheur',
  templateUrl: './discipline-scientifique-conseil-et-comite-scientifique-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-conseil-et-comite-scientifique-list-chercheur.component.css']
})
export class DisciplineScientifiqueConseilEtComiteScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueConseilEtComiteScientifique';
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    conseilEtComiteScientifiques :Array<ConseilEtComiteScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilEtComiteScientifiqueService: DisciplineScientifiqueConseilEtComiteScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueConseilEtComiteScientifiques();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadConseilEtComiteScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueConseilEtComiteScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'list');
        isPermistted ? this.disciplineScientifiqueConseilEtComiteScientifiqueService.findAll().subscribe(disciplineScientifiqueConseilEtComiteScientifiques => this.disciplineScientifiqueConseilEtComiteScientifiques = disciplineScientifiqueConseilEtComiteScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.findByCriteria(this.searchDisciplineScientifiqueConseilEtComiteScientifique).subscribe(disciplineScientifiqueConseilEtComiteScientifiques=>{
            
            this.disciplineScientifiqueConseilEtComiteScientifiques = disciplineScientifiqueConseilEtComiteScientifiques;
           // this.searchDisciplineScientifiqueConseilEtComiteScientifique = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'conseilEtComiteScientifique?.id', header: 'Conseil et comite scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueConseilEtComiteScientifique(disciplineScientifiqueConseilEtComiteScientifique:DisciplineScientifiqueConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueConseilEtComiteScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilEtComiteScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueConseilEtComiteScientifique = res;
            this.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueConseilEtComiteScientifique(disciplineScientifiqueConseilEtComiteScientifique:DisciplineScientifiqueConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'view');
        if(isPermistted){
           this.disciplineScientifiqueConseilEtComiteScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilEtComiteScientifique).subscribe(res => {
           this.selectedDisciplineScientifiqueConseilEtComiteScientifique = res;
            this.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueConseilEtComiteScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueConseilEtComiteScientifique = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();
            this.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueConseilEtComiteScientifique(disciplineScientifiqueConseilEtComiteScientifique:DisciplineScientifiqueConseilEtComiteScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique conseil et comite scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueConseilEtComiteScientifiqueService.delete(disciplineScientifiqueConseilEtComiteScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueConseilEtComiteScientifiques.indexOf(disciplineScientifiqueConseilEtComiteScientifique);
                          position > -1 ? this.disciplineScientifiqueConseilEtComiteScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique conseil et comite scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadConseilEtComiteScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueConseilEtComiteScientifique', 'list');
    isPermistted ? this.conseilEtComiteScientifiqueService.findAll().subscribe(conseilEtComiteScientifiques => this.conseilEtComiteScientifiques = conseilEtComiteScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueConseilEtComiteScientifique(disciplineScientifiqueConseilEtComiteScientifique: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {

     this.disciplineScientifiqueConseilEtComiteScientifiqueService.findByIdWithAssociatedList(disciplineScientifiqueConseilEtComiteScientifique).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueConseilEtComiteScientifique(res);
	       this.selectedDisciplineScientifiqueConseilEtComiteScientifique = res;
	       this.selectedDisciplineScientifiqueConseilEtComiteScientifique.id = null;
            this.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueConseilEtComiteScientifique(res: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueConseilEtComiteScientifiques.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Conseil et comite scientifique': e.conseilEtComiteScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchDisciplineScientifiqueConseilEtComiteScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueConseilEtComiteScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Conseil et comite scientifique': this.searchDisciplineScientifiqueConseilEtComiteScientifique.conseilEtComiteScientifiqueVo?.id ? this.searchDisciplineScientifiqueConseilEtComiteScientifique.conseilEtComiteScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueConseilEtComiteScientifiques(): Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques;
       }
    set disciplineScientifiqueConseilEtComiteScientifiques(value: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques = value;
       }

    get disciplineScientifiqueConseilEtComiteScientifiqueSelections(): Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiqueSelections;
       }
    set disciplineScientifiqueConseilEtComiteScientifiqueSelections(value: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiqueSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueConseilEtComiteScientifique():DisciplineScientifiqueConseilEtComiteScientifiqueVo {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique;
       }
    set selectedDisciplineScientifiqueConseilEtComiteScientifique(value: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique = value;
       }
    
    get createDisciplineScientifiqueConseilEtComiteScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog;
       }
    set createDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.createDisciplineScientifiqueConseilEtComiteScientifiqueDialog= value;
       }
    
    get editDisciplineScientifiqueConseilEtComiteScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog;
       }
    set editDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog= value;
       }
    get viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog;
       }
    set viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog = value;
       }
       
     get searchDisciplineScientifiqueConseilEtComiteScientifique(): DisciplineScientifiqueConseilEtComiteScientifiqueVo {
        return this.disciplineScientifiqueConseilEtComiteScientifiqueService.searchDisciplineScientifiqueConseilEtComiteScientifique;
       }
    set searchDisciplineScientifiqueConseilEtComiteScientifique(value: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.searchDisciplineScientifiqueConseilEtComiteScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

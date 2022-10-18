import {Component, OnInit} from '@angular/core';
import {EnseignementDisciplineScientifiqueService} from '../../../../../controller/service/EnseignementDisciplineScientifique.service';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';
import { EnseignementService } from '../../../../../controller/service/Enseignement.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-discipline-scientifique-list-admin',
  templateUrl: './enseignement-discipline-scientifique-list-admin.component.html',
  styleUrls: ['./enseignement-discipline-scientifique-list-admin.component.css']
})
export class EnseignementDisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnseignementDisciplineScientifique';
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    enseignements :Array<EnseignementVo>;


    constructor(private datePipe: DatePipe, private enseignementDisciplineScientifiqueService: EnseignementDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private enseignementService: EnseignementService
) { }

    ngOnInit(): void {
      this.loadEnseignementDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadEnseignement();
    }
    
    // methods
      public async loadEnseignementDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'list');
        isPermistted ? this.enseignementDisciplineScientifiqueService.findAll().subscribe(enseignementDisciplineScientifiques => this.enseignementDisciplineScientifiques = enseignementDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enseignementDisciplineScientifiqueService.findByCriteria(this.searchEnseignementDisciplineScientifique).subscribe(enseignementDisciplineScientifiques=>{
            
            this.enseignementDisciplineScientifiques = enseignementDisciplineScientifiques;
           // this.searchEnseignementDisciplineScientifique = new EnseignementDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'enseignement?.id', header: 'Enseignement'},
        ];
    }
    
    public async editEnseignementDisciplineScientifique(enseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'edit');
         if(isPermistted){
          this.enseignementDisciplineScientifiqueService.findByIdWithAssociatedList(enseignementDisciplineScientifique).subscribe(res => {
           this.selectedEnseignementDisciplineScientifique = res;
            this.editEnseignementDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignementDisciplineScientifique(enseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'view');
        if(isPermistted){
           this.enseignementDisciplineScientifiqueService.findByIdWithAssociatedList(enseignementDisciplineScientifique).subscribe(res => {
           this.selectedEnseignementDisciplineScientifique = res;
            this.viewEnseignementDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignementDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignementDisciplineScientifique = new EnseignementDisciplineScientifiqueVo();
            this.createEnseignementDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignementDisciplineScientifique(enseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementDisciplineScientifiqueService.delete(enseignementDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignementDisciplineScientifiques.indexOf(enseignementDisciplineScientifique);
                          position > -1 ? this.enseignementDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement discipline scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementDisciplineScientifique', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignementDisciplineScientifique(enseignementDisciplineScientifique: EnseignementDisciplineScientifiqueVo) {

     this.enseignementDisciplineScientifiqueService.findByIdWithAssociatedList(enseignementDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateEnseignementDisciplineScientifique(res);
	       this.selectedEnseignementDisciplineScientifique = res;
	       this.selectedEnseignementDisciplineScientifique.id = null;
            this.createEnseignementDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateEnseignementDisciplineScientifique(res: EnseignementDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enseignementDisciplineScientifiques.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Enseignement': e.enseignementVo?.id ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchEnseignementDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchEnseignementDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Enseignement': this.searchEnseignementDisciplineScientifique.enseignementVo?.id ? this.searchEnseignementDisciplineScientifique.enseignementVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignementDisciplineScientifiques(): Array<EnseignementDisciplineScientifiqueVo> {
           return this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques;
       }
    set enseignementDisciplineScientifiques(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques = value;
       }

    get enseignementDisciplineScientifiqueSelections(): Array<EnseignementDisciplineScientifiqueVo> {
           return this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiqueSelections;
       }
    set enseignementDisciplineScientifiqueSelections(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedEnseignementDisciplineScientifique():EnseignementDisciplineScientifiqueVo {
           return this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique;
       }
    set selectedEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique = value;
       }
    
    get createEnseignementDisciplineScientifiqueDialog():boolean {
           return this.enseignementDisciplineScientifiqueService.createEnseignementDisciplineScientifiqueDialog;
       }
    set createEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this.enseignementDisciplineScientifiqueService.createEnseignementDisciplineScientifiqueDialog= value;
       }
    
    get editEnseignementDisciplineScientifiqueDialog():boolean {
           return this.enseignementDisciplineScientifiqueService.editEnseignementDisciplineScientifiqueDialog;
       }
    set editEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this.enseignementDisciplineScientifiqueService.editEnseignementDisciplineScientifiqueDialog= value;
       }
    get viewEnseignementDisciplineScientifiqueDialog():boolean {
           return this.enseignementDisciplineScientifiqueService.viewEnseignementDisciplineScientifiqueDialog;
       }
    set viewEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this.enseignementDisciplineScientifiqueService.viewEnseignementDisciplineScientifiqueDialog = value;
       }
       
     get searchEnseignementDisciplineScientifique(): EnseignementDisciplineScientifiqueVo {
        return this.enseignementDisciplineScientifiqueService.searchEnseignementDisciplineScientifique;
       }
    set searchEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this.enseignementDisciplineScientifiqueService.searchEnseignementDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

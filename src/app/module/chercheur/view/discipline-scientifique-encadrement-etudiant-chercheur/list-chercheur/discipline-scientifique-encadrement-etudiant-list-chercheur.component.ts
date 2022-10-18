import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEncadrementEtudiantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementEtudiant.service';
import {DisciplineScientifiqueEncadrementEtudiantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementEtudiant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';
import { EncadrementEtudiantService } from '../../../../../controller/service/EncadrementEtudiant.service';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-encadrement-etudiant-list-chercheur',
  templateUrl: './discipline-scientifique-encadrement-etudiant-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-etudiant-list-chercheur.component.css']
})
export class DisciplineScientifiqueEncadrementEtudiantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueEncadrementEtudiant';
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    encadrementEtudiants :Array<EncadrementEtudiantVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementEtudiantService: DisciplineScientifiqueEncadrementEtudiantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private encadrementEtudiantService: EncadrementEtudiantService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueEncadrementEtudiants();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadEncadrementEtudiant();
    }
    
    // methods
      public async loadDisciplineScientifiqueEncadrementEtudiants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'list');
        isPermistted ? this.disciplineScientifiqueEncadrementEtudiantService.findAll().subscribe(disciplineScientifiqueEncadrementEtudiants => this.disciplineScientifiqueEncadrementEtudiants = disciplineScientifiqueEncadrementEtudiants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueEncadrementEtudiantService.findByCriteria(this.searchDisciplineScientifiqueEncadrementEtudiant).subscribe(disciplineScientifiqueEncadrementEtudiants=>{
            
            this.disciplineScientifiqueEncadrementEtudiants = disciplineScientifiqueEncadrementEtudiants;
           // this.searchDisciplineScientifiqueEncadrementEtudiant = new DisciplineScientifiqueEncadrementEtudiantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'encadrementEtudiant?.id', header: 'Encadrement etudiant'},
        ];
    }
    
    public async editDisciplineScientifiqueEncadrementEtudiant(disciplineScientifiqueEncadrementEtudiant:DisciplineScientifiqueEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueEncadrementEtudiantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementEtudiant).subscribe(res => {
           this.selectedDisciplineScientifiqueEncadrementEtudiant = res;
            this.editDisciplineScientifiqueEncadrementEtudiantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueEncadrementEtudiant(disciplineScientifiqueEncadrementEtudiant:DisciplineScientifiqueEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'view');
        if(isPermistted){
           this.disciplineScientifiqueEncadrementEtudiantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementEtudiant).subscribe(res => {
           this.selectedDisciplineScientifiqueEncadrementEtudiant = res;
            this.viewDisciplineScientifiqueEncadrementEtudiantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueEncadrementEtudiant = new DisciplineScientifiqueEncadrementEtudiantVo();
            this.createDisciplineScientifiqueEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueEncadrementEtudiant(disciplineScientifiqueEncadrementEtudiant:DisciplineScientifiqueEncadrementEtudiantVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique encadrement etudiant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueEncadrementEtudiantService.delete(disciplineScientifiqueEncadrementEtudiant).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueEncadrementEtudiants.indexOf(disciplineScientifiqueEncadrementEtudiant);
                          position > -1 ? this.disciplineScientifiqueEncadrementEtudiants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique encadrement etudiant Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrementEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementEtudiant', 'list');
    isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueEncadrementEtudiant(disciplineScientifiqueEncadrementEtudiant: DisciplineScientifiqueEncadrementEtudiantVo) {

     this.disciplineScientifiqueEncadrementEtudiantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementEtudiant).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueEncadrementEtudiant(res);
	       this.selectedDisciplineScientifiqueEncadrementEtudiant = res;
	       this.selectedDisciplineScientifiqueEncadrementEtudiant.id = null;
            this.createDisciplineScientifiqueEncadrementEtudiantDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueEncadrementEtudiant(res: DisciplineScientifiqueEncadrementEtudiantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueEncadrementEtudiants.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Encadrement etudiant': e.encadrementEtudiantVo?.id ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchDisciplineScientifiqueEncadrementEtudiant.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueEncadrementEtudiant.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Encadrement etudiant': this.searchDisciplineScientifiqueEncadrementEtudiant.encadrementEtudiantVo?.id ? this.searchDisciplineScientifiqueEncadrementEtudiant.encadrementEtudiantVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueEncadrementEtudiants(): Array<DisciplineScientifiqueEncadrementEtudiantVo> {
           return this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiants;
       }
    set disciplineScientifiqueEncadrementEtudiants(value: Array<DisciplineScientifiqueEncadrementEtudiantVo>) {
        this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiants = value;
       }

    get disciplineScientifiqueEncadrementEtudiantSelections(): Array<DisciplineScientifiqueEncadrementEtudiantVo> {
           return this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiantSelections;
       }
    set disciplineScientifiqueEncadrementEtudiantSelections(value: Array<DisciplineScientifiqueEncadrementEtudiantVo>) {
        this.disciplineScientifiqueEncadrementEtudiantService.disciplineScientifiqueEncadrementEtudiantSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueEncadrementEtudiant():DisciplineScientifiqueEncadrementEtudiantVo {
           return this.disciplineScientifiqueEncadrementEtudiantService.selectedDisciplineScientifiqueEncadrementEtudiant;
       }
    set selectedDisciplineScientifiqueEncadrementEtudiant(value: DisciplineScientifiqueEncadrementEtudiantVo) {
        this.disciplineScientifiqueEncadrementEtudiantService.selectedDisciplineScientifiqueEncadrementEtudiant = value;
       }
    
    get createDisciplineScientifiqueEncadrementEtudiantDialog():boolean {
           return this.disciplineScientifiqueEncadrementEtudiantService.createDisciplineScientifiqueEncadrementEtudiantDialog;
       }
    set createDisciplineScientifiqueEncadrementEtudiantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementEtudiantService.createDisciplineScientifiqueEncadrementEtudiantDialog= value;
       }
    
    get editDisciplineScientifiqueEncadrementEtudiantDialog():boolean {
           return this.disciplineScientifiqueEncadrementEtudiantService.editDisciplineScientifiqueEncadrementEtudiantDialog;
       }
    set editDisciplineScientifiqueEncadrementEtudiantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementEtudiantService.editDisciplineScientifiqueEncadrementEtudiantDialog= value;
       }
    get viewDisciplineScientifiqueEncadrementEtudiantDialog():boolean {
           return this.disciplineScientifiqueEncadrementEtudiantService.viewDisciplineScientifiqueEncadrementEtudiantDialog;
       }
    set viewDisciplineScientifiqueEncadrementEtudiantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementEtudiantService.viewDisciplineScientifiqueEncadrementEtudiantDialog = value;
       }
       
     get searchDisciplineScientifiqueEncadrementEtudiant(): DisciplineScientifiqueEncadrementEtudiantVo {
        return this.disciplineScientifiqueEncadrementEtudiantService.searchDisciplineScientifiqueEncadrementEtudiant;
       }
    set searchDisciplineScientifiqueEncadrementEtudiant(value: DisciplineScientifiqueEncadrementEtudiantVo) {
        this.disciplineScientifiqueEncadrementEtudiantService.searchDisciplineScientifiqueEncadrementEtudiant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

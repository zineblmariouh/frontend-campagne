import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EncadrementEtudiantService } from '../../../../../controller/service/EncadrementEtudiant.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-encadrement-etudiant-discipline-scientifique-list-admin',
  templateUrl: './encadrement-etudiant-discipline-scientifique-list-admin.component.html',
  styleUrls: ['./encadrement-etudiant-discipline-scientifique-list-admin.component.css']
})
export class EncadrementEtudiantDisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EncadrementEtudiantDisciplineScientifique';
    encadrementEtudiants :Array<EncadrementEtudiantVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private encadrementEtudiantDisciplineScientifiqueService: EncadrementEtudiantDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private encadrementEtudiantService: EncadrementEtudiantService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadEncadrementEtudiantDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadEncadrementEtudiant();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadEncadrementEtudiantDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'list');
        isPermistted ? this.encadrementEtudiantDisciplineScientifiqueService.findAll().subscribe(encadrementEtudiantDisciplineScientifiques => this.encadrementEtudiantDisciplineScientifiques = encadrementEtudiantDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.encadrementEtudiantDisciplineScientifiqueService.findByCriteria(this.searchEncadrementEtudiantDisciplineScientifique).subscribe(encadrementEtudiantDisciplineScientifiques=>{
            
            this.encadrementEtudiantDisciplineScientifiques = encadrementEtudiantDisciplineScientifiques;
           // this.searchEncadrementEtudiantDisciplineScientifique = new EncadrementEtudiantDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'encadrementEtudiant?.id', header: 'Encadrement etudiant'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editEncadrementEtudiantDisciplineScientifique(encadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'edit');
         if(isPermistted){
          this.encadrementEtudiantDisciplineScientifiqueService.findByIdWithAssociatedList(encadrementEtudiantDisciplineScientifique).subscribe(res => {
           this.selectedEncadrementEtudiantDisciplineScientifique = res;
            this.editEncadrementEtudiantDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEncadrementEtudiantDisciplineScientifique(encadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'view');
        if(isPermistted){
           this.encadrementEtudiantDisciplineScientifiqueService.findByIdWithAssociatedList(encadrementEtudiantDisciplineScientifique).subscribe(res => {
           this.selectedEncadrementEtudiantDisciplineScientifique = res;
            this.viewEncadrementEtudiantDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEncadrementEtudiantDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEncadrementEtudiantDisciplineScientifique = new EncadrementEtudiantDisciplineScientifiqueVo();
            this.createEncadrementEtudiantDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEncadrementEtudiantDisciplineScientifique(encadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Encadrement etudiant discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.encadrementEtudiantDisciplineScientifiqueService.delete(encadrementEtudiantDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.encadrementEtudiantDisciplineScientifiques.indexOf(encadrementEtudiantDisciplineScientifique);
                          position > -1 ? this.encadrementEtudiantDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Encadrement etudiant discipline scientifique Supprimé',
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

public async loadEncadrementEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'list');
    isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEncadrementEtudiantDisciplineScientifique(encadrementEtudiantDisciplineScientifique: EncadrementEtudiantDisciplineScientifiqueVo) {

     this.encadrementEtudiantDisciplineScientifiqueService.findByIdWithAssociatedList(encadrementEtudiantDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateEncadrementEtudiantDisciplineScientifique(res);
	       this.selectedEncadrementEtudiantDisciplineScientifique = res;
	       this.selectedEncadrementEtudiantDisciplineScientifique.id = null;
            this.createEncadrementEtudiantDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateEncadrementEtudiantDisciplineScientifique(res: EncadrementEtudiantDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.encadrementEtudiantDisciplineScientifiques.map(e => {
    return {
            'Encadrement etudiant': e.encadrementEtudiantVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Encadrement etudiant': this.searchEncadrementEtudiantDisciplineScientifique.encadrementEtudiantVo?.id ? this.searchEncadrementEtudiantDisciplineScientifique.encadrementEtudiantVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchEncadrementEtudiantDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchEncadrementEtudiantDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get encadrementEtudiantDisciplineScientifiques(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
           return this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques;
       }
    set encadrementEtudiantDisciplineScientifiques(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques = value;
       }

    get encadrementEtudiantDisciplineScientifiqueSelections(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
           return this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiqueSelections;
       }
    set encadrementEtudiantDisciplineScientifiqueSelections(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedEncadrementEtudiantDisciplineScientifique():EncadrementEtudiantDisciplineScientifiqueVo {
           return this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique;
       }
    set selectedEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique = value;
       }
    
    get createEncadrementEtudiantDisciplineScientifiqueDialog():boolean {
           return this.encadrementEtudiantDisciplineScientifiqueService.createEncadrementEtudiantDisciplineScientifiqueDialog;
       }
    set createEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this.encadrementEtudiantDisciplineScientifiqueService.createEncadrementEtudiantDisciplineScientifiqueDialog= value;
       }
    
    get editEncadrementEtudiantDisciplineScientifiqueDialog():boolean {
           return this.encadrementEtudiantDisciplineScientifiqueService.editEncadrementEtudiantDisciplineScientifiqueDialog;
       }
    set editEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this.encadrementEtudiantDisciplineScientifiqueService.editEncadrementEtudiantDisciplineScientifiqueDialog= value;
       }
    get viewEncadrementEtudiantDisciplineScientifiqueDialog():boolean {
           return this.encadrementEtudiantDisciplineScientifiqueService.viewEncadrementEtudiantDisciplineScientifiqueDialog;
       }
    set viewEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this.encadrementEtudiantDisciplineScientifiqueService.viewEncadrementEtudiantDisciplineScientifiqueDialog = value;
       }
       
     get searchEncadrementEtudiantDisciplineScientifique(): EncadrementEtudiantDisciplineScientifiqueVo {
        return this.encadrementEtudiantDisciplineScientifiqueService.searchEncadrementEtudiantDisciplineScientifique;
       }
    set searchEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.encadrementEtudiantDisciplineScientifiqueService.searchEncadrementEtudiantDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

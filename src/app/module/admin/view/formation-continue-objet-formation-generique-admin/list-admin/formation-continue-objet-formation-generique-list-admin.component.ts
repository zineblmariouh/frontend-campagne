import {Component, OnInit} from '@angular/core';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ObjetFormationGeneriqueService } from '../../../../../controller/service/ObjetFormationGenerique.service';
import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-formation-continue-objet-formation-generique-list-admin',
  templateUrl: './formation-continue-objet-formation-generique-list-admin.component.html',
  styleUrls: ['./formation-continue-objet-formation-generique-list-admin.component.css']
})
export class FormationContinueObjetFormationGeneriqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinueObjetFormationGenerique';
    objetFormationGeneriques :Array<ObjetFormationGeneriqueVo>;
    formationContinues :Array<FormationContinueVo>;


    constructor(private datePipe: DatePipe, private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private objetFormationGeneriqueService: ObjetFormationGeneriqueService
        , private formationContinueService: FormationContinueService
) { }

    ngOnInit(): void {
      this.loadFormationContinueObjetFormationGeneriques();
      this.initExport();
      this.initCol();
      this.loadObjetFormationGenerique();
      this.loadFormationContinue();
    }
    
    // methods
      public async loadFormationContinueObjetFormationGeneriques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'list');
        isPermistted ? this.formationContinueObjetFormationGeneriqueService.findAll().subscribe(formationContinueObjetFormationGeneriques => this.formationContinueObjetFormationGeneriques = formationContinueObjetFormationGeneriques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formationContinueObjetFormationGeneriqueService.findByCriteria(this.searchFormationContinueObjetFormationGenerique).subscribe(formationContinueObjetFormationGeneriques=>{
            
            this.formationContinueObjetFormationGeneriques = formationContinueObjetFormationGeneriques;
           // this.searchFormationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'objetFormationGenerique?.libelle', header: 'Objet formation generique'},
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
        ];
    }
    
    public async editFormationContinueObjetFormationGenerique(formationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'edit');
         if(isPermistted){
          this.formationContinueObjetFormationGeneriqueService.findByIdWithAssociatedList(formationContinueObjetFormationGenerique).subscribe(res => {
           this.selectedFormationContinueObjetFormationGenerique = res;
            this.editFormationContinueObjetFormationGeneriqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormationContinueObjetFormationGenerique(formationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'view');
        if(isPermistted){
           this.formationContinueObjetFormationGeneriqueService.findByIdWithAssociatedList(formationContinueObjetFormationGenerique).subscribe(res => {
           this.selectedFormationContinueObjetFormationGenerique = res;
            this.viewFormationContinueObjetFormationGeneriqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormationContinueObjetFormationGenerique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();
            this.createFormationContinueObjetFormationGeneriqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormationContinueObjetFormationGenerique(formationContinueObjetFormationGenerique:FormationContinueObjetFormationGeneriqueVo){
       const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Formation continue objet formation generique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formationContinueObjetFormationGeneriqueService.delete(formationContinueObjetFormationGenerique).subscribe(status=>{
                          if(status > 0){
                          const position = this.formationContinueObjetFormationGeneriques.indexOf(formationContinueObjetFormationGenerique);
                          position > -1 ? this.formationContinueObjetFormationGeneriques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Formation continue objet formation generique Supprimé',
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

public async loadObjetFormationGenerique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'list');
    isPermistted ? this.objetFormationGeneriqueService.findAll().subscribe(objetFormationGeneriques => this.objetFormationGeneriques = objetFormationGeneriques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueObjetFormationGenerique', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFormationContinueObjetFormationGenerique(formationContinueObjetFormationGenerique: FormationContinueObjetFormationGeneriqueVo) {

     this.formationContinueObjetFormationGeneriqueService.findByIdWithAssociatedList(formationContinueObjetFormationGenerique).subscribe(
	 res => {
	       this.initDuplicateFormationContinueObjetFormationGenerique(res);
	       this.selectedFormationContinueObjetFormationGenerique = res;
	       this.selectedFormationContinueObjetFormationGenerique.id = null;
            this.createFormationContinueObjetFormationGeneriqueDialog = true;

});

	}

	initDuplicateFormationContinueObjetFormationGenerique(res: FormationContinueObjetFormationGeneriqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formationContinueObjetFormationGeneriques.map(e => {
    return {
            'Objet formation generique': e.objetFormationGeneriqueVo?.libelle ,
            'Formation continue': e.formationContinueVo?.intitule ,
     }
      });

      this.criteriaData = [{
        'Objet formation generique': this.searchFormationContinueObjetFormationGenerique.objetFormationGeneriqueVo?.libelle ? this.searchFormationContinueObjetFormationGenerique.objetFormationGeneriqueVo?.libelle : environment.emptyForExport ,
        'Formation continue': this.searchFormationContinueObjetFormationGenerique.formationContinueVo?.intitule ? this.searchFormationContinueObjetFormationGenerique.formationContinueVo?.intitule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formationContinueObjetFormationGeneriques(): Array<FormationContinueObjetFormationGeneriqueVo> {
           return this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques;
       }
    set formationContinueObjetFormationGeneriques(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques = value;
       }

    get formationContinueObjetFormationGeneriqueSelections(): Array<FormationContinueObjetFormationGeneriqueVo> {
           return this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriqueSelections;
       }
    set formationContinueObjetFormationGeneriqueSelections(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriqueSelections = value;
       }
   
     


    get selectedFormationContinueObjetFormationGenerique():FormationContinueObjetFormationGeneriqueVo {
           return this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique;
       }
    set selectedFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique = value;
       }
    
    get createFormationContinueObjetFormationGeneriqueDialog():boolean {
           return this.formationContinueObjetFormationGeneriqueService.createFormationContinueObjetFormationGeneriqueDialog;
       }
    set createFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.createFormationContinueObjetFormationGeneriqueDialog= value;
       }
    
    get editFormationContinueObjetFormationGeneriqueDialog():boolean {
           return this.formationContinueObjetFormationGeneriqueService.editFormationContinueObjetFormationGeneriqueDialog;
       }
    set editFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.editFormationContinueObjetFormationGeneriqueDialog= value;
       }
    get viewFormationContinueObjetFormationGeneriqueDialog():boolean {
           return this.formationContinueObjetFormationGeneriqueService.viewFormationContinueObjetFormationGeneriqueDialog;
       }
    set viewFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.viewFormationContinueObjetFormationGeneriqueDialog = value;
       }
       
     get searchFormationContinueObjetFormationGenerique(): FormationContinueObjetFormationGeneriqueVo {
        return this.formationContinueObjetFormationGeneriqueService.searchFormationContinueObjetFormationGenerique;
       }
    set searchFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this.formationContinueObjetFormationGeneriqueService.searchFormationContinueObjetFormationGenerique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

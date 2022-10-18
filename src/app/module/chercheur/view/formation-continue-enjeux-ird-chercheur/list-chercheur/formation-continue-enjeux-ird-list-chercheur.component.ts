import {Component, OnInit} from '@angular/core';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-formation-continue-enjeux-ird-list-chercheur',
  templateUrl: './formation-continue-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./formation-continue-enjeux-ird-list-chercheur.component.css']
})
export class FormationContinueEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinueEnjeuxIrd';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    formationContinues :Array<FormationContinueVo>;


    constructor(private datePipe: DatePipe, private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private formationContinueService: FormationContinueService
) { }

    ngOnInit(): void {
      this.loadFormationContinueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadFormationContinue();
    }
    
    // methods
      public async loadFormationContinueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'list');
        isPermistted ? this.formationContinueEnjeuxIrdService.findAll().subscribe(formationContinueEnjeuxIrds => this.formationContinueEnjeuxIrds = formationContinueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formationContinueEnjeuxIrdService.findByCriteria(this.searchFormationContinueEnjeuxIrd).subscribe(formationContinueEnjeuxIrds=>{
            
            this.formationContinueEnjeuxIrds = formationContinueEnjeuxIrds;
           // this.searchFormationContinueEnjeuxIrd = new FormationContinueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
        ];
    }
    
    public async editFormationContinueEnjeuxIrd(formationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.formationContinueEnjeuxIrdService.findByIdWithAssociatedList(formationContinueEnjeuxIrd).subscribe(res => {
           this.selectedFormationContinueEnjeuxIrd = res;
            this.editFormationContinueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormationContinueEnjeuxIrd(formationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'view');
        if(isPermistted){
           this.formationContinueEnjeuxIrdService.findByIdWithAssociatedList(formationContinueEnjeuxIrd).subscribe(res => {
           this.selectedFormationContinueEnjeuxIrd = res;
            this.viewFormationContinueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormationContinueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormationContinueEnjeuxIrd = new FormationContinueEnjeuxIrdVo();
            this.createFormationContinueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormationContinueEnjeuxIrd(formationContinueEnjeuxIrd:FormationContinueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Formation continue enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formationContinueEnjeuxIrdService.delete(formationContinueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.formationContinueEnjeuxIrds.indexOf(formationContinueEnjeuxIrd);
                          position > -1 ? this.formationContinueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Formation continue enjeux ird Supprimé',
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

public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueEnjeuxIrd', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFormationContinueEnjeuxIrd(formationContinueEnjeuxIrd: FormationContinueEnjeuxIrdVo) {

     this.formationContinueEnjeuxIrdService.findByIdWithAssociatedList(formationContinueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateFormationContinueEnjeuxIrd(res);
	       this.selectedFormationContinueEnjeuxIrd = res;
	       this.selectedFormationContinueEnjeuxIrd.id = null;
            this.createFormationContinueEnjeuxIrdDialog = true;

});

	}

	initDuplicateFormationContinueEnjeuxIrd(res: FormationContinueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formationContinueEnjeuxIrds.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Formation continue': e.formationContinueVo?.intitule ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchFormationContinueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchFormationContinueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Formation continue': this.searchFormationContinueEnjeuxIrd.formationContinueVo?.intitule ? this.searchFormationContinueEnjeuxIrd.formationContinueVo?.intitule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formationContinueEnjeuxIrds(): Array<FormationContinueEnjeuxIrdVo> {
           return this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds;
       }
    set formationContinueEnjeuxIrds(value: Array<FormationContinueEnjeuxIrdVo>) {
        this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds = value;
       }

    get formationContinueEnjeuxIrdSelections(): Array<FormationContinueEnjeuxIrdVo> {
           return this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrdSelections;
       }
    set formationContinueEnjeuxIrdSelections(value: Array<FormationContinueEnjeuxIrdVo>) {
        this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrdSelections = value;
       }
   
     


    get selectedFormationContinueEnjeuxIrd():FormationContinueEnjeuxIrdVo {
           return this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd;
       }
    set selectedFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd = value;
       }
    
    get createFormationContinueEnjeuxIrdDialog():boolean {
           return this.formationContinueEnjeuxIrdService.createFormationContinueEnjeuxIrdDialog;
       }
    set createFormationContinueEnjeuxIrdDialog(value: boolean) {
        this.formationContinueEnjeuxIrdService.createFormationContinueEnjeuxIrdDialog= value;
       }
    
    get editFormationContinueEnjeuxIrdDialog():boolean {
           return this.formationContinueEnjeuxIrdService.editFormationContinueEnjeuxIrdDialog;
       }
    set editFormationContinueEnjeuxIrdDialog(value: boolean) {
        this.formationContinueEnjeuxIrdService.editFormationContinueEnjeuxIrdDialog= value;
       }
    get viewFormationContinueEnjeuxIrdDialog():boolean {
           return this.formationContinueEnjeuxIrdService.viewFormationContinueEnjeuxIrdDialog;
       }
    set viewFormationContinueEnjeuxIrdDialog(value: boolean) {
        this.formationContinueEnjeuxIrdService.viewFormationContinueEnjeuxIrdDialog = value;
       }
       
     get searchFormationContinueEnjeuxIrd(): FormationContinueEnjeuxIrdVo {
        return this.formationContinueEnjeuxIrdService.searchFormationContinueEnjeuxIrd;
       }
    set searchFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this.formationContinueEnjeuxIrdService.searchFormationContinueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

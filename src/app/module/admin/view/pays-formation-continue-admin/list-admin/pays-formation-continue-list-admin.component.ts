import {Component, OnInit} from '@angular/core';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-formation-continue-list-admin',
  templateUrl: './pays-formation-continue-list-admin.component.html',
  styleUrls: ['./pays-formation-continue-list-admin.component.css']
})
export class PaysFormationContinueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysFormationContinue';
    formationContinues :Array<FormationContinueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private paysFormationContinueService: PaysFormationContinueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formationContinueService: FormationContinueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadPaysFormationContinues();
      this.initExport();
      this.initCol();
      this.loadFormationContinue();
      this.loadPays();
    }
    
    // methods
      public async loadPaysFormationContinues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'list');
        isPermistted ? this.paysFormationContinueService.findAll().subscribe(paysFormationContinues => this.paysFormationContinues = paysFormationContinues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysFormationContinueService.findByCriteria(this.searchPaysFormationContinue).subscribe(paysFormationContinues=>{
            
            this.paysFormationContinues = paysFormationContinues;
           // this.searchPaysFormationContinue = new PaysFormationContinueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editPaysFormationContinue(paysFormationContinue:PaysFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'edit');
         if(isPermistted){
          this.paysFormationContinueService.findByIdWithAssociatedList(paysFormationContinue).subscribe(res => {
           this.selectedPaysFormationContinue = res;
            this.editPaysFormationContinueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysFormationContinue(paysFormationContinue:PaysFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'view');
        if(isPermistted){
           this.paysFormationContinueService.findByIdWithAssociatedList(paysFormationContinue).subscribe(res => {
           this.selectedPaysFormationContinue = res;
            this.viewPaysFormationContinueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysFormationContinue = new PaysFormationContinueVo();
            this.createPaysFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysFormationContinue(paysFormationContinue:PaysFormationContinueVo){
       const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays formation continue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysFormationContinueService.delete(paysFormationContinue).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysFormationContinues.indexOf(paysFormationContinue);
                          position > -1 ? this.paysFormationContinues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays formation continue Supprimé',
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

public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysFormationContinue', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysFormationContinue(paysFormationContinue: PaysFormationContinueVo) {

     this.paysFormationContinueService.findByIdWithAssociatedList(paysFormationContinue).subscribe(
	 res => {
	       this.initDuplicatePaysFormationContinue(res);
	       this.selectedPaysFormationContinue = res;
	       this.selectedPaysFormationContinue.id = null;
            this.createPaysFormationContinueDialog = true;

});

	}

	initDuplicatePaysFormationContinue(res: PaysFormationContinueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysFormationContinues.map(e => {
    return {
            'Formation continue': e.formationContinueVo?.intitule ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Formation continue': this.searchPaysFormationContinue.formationContinueVo?.intitule ? this.searchPaysFormationContinue.formationContinueVo?.intitule : environment.emptyForExport ,
        'Pays': this.searchPaysFormationContinue.paysVo?.libelle ? this.searchPaysFormationContinue.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysFormationContinues(): Array<PaysFormationContinueVo> {
           return this.paysFormationContinueService.paysFormationContinues;
       }
    set paysFormationContinues(value: Array<PaysFormationContinueVo>) {
        this.paysFormationContinueService.paysFormationContinues = value;
       }

    get paysFormationContinueSelections(): Array<PaysFormationContinueVo> {
           return this.paysFormationContinueService.paysFormationContinueSelections;
       }
    set paysFormationContinueSelections(value: Array<PaysFormationContinueVo>) {
        this.paysFormationContinueService.paysFormationContinueSelections = value;
       }
   
     


    get selectedPaysFormationContinue():PaysFormationContinueVo {
           return this.paysFormationContinueService.selectedPaysFormationContinue;
       }
    set selectedPaysFormationContinue(value: PaysFormationContinueVo) {
        this.paysFormationContinueService.selectedPaysFormationContinue = value;
       }
    
    get createPaysFormationContinueDialog():boolean {
           return this.paysFormationContinueService.createPaysFormationContinueDialog;
       }
    set createPaysFormationContinueDialog(value: boolean) {
        this.paysFormationContinueService.createPaysFormationContinueDialog= value;
       }
    
    get editPaysFormationContinueDialog():boolean {
           return this.paysFormationContinueService.editPaysFormationContinueDialog;
       }
    set editPaysFormationContinueDialog(value: boolean) {
        this.paysFormationContinueService.editPaysFormationContinueDialog= value;
       }
    get viewPaysFormationContinueDialog():boolean {
           return this.paysFormationContinueService.viewPaysFormationContinueDialog;
       }
    set viewPaysFormationContinueDialog(value: boolean) {
        this.paysFormationContinueService.viewPaysFormationContinueDialog = value;
       }
       
     get searchPaysFormationContinue(): PaysFormationContinueVo {
        return this.paysFormationContinueService.searchPaysFormationContinue;
       }
    set searchPaysFormationContinue(value: PaysFormationContinueVo) {
        this.paysFormationContinueService.searchPaysFormationContinue = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnseignementService } from '../../../../../controller/service/Enseignement.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-enjeux-ird-list-admin',
  templateUrl: './enseignement-enjeux-ird-list-admin.component.html',
  styleUrls: ['./enseignement-enjeux-ird-list-admin.component.css']
})
export class EnseignementEnjeuxIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnseignementEnjeuxIrd';
    enseignements :Array<EnseignementVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enseignementService: EnseignementService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadEnseignementEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEnseignement();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadEnseignementEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'list');
        isPermistted ? this.enseignementEnjeuxIrdService.findAll().subscribe(enseignementEnjeuxIrds => this.enseignementEnjeuxIrds = enseignementEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enseignementEnjeuxIrdService.findByCriteria(this.searchEnseignementEnjeuxIrd).subscribe(enseignementEnjeuxIrds=>{
            
            this.enseignementEnjeuxIrds = enseignementEnjeuxIrds;
           // this.searchEnseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enseignement?.id', header: 'Enseignement'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editEnseignementEnjeuxIrd(enseignementEnjeuxIrd:EnseignementEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'edit');
         if(isPermistted){
          this.enseignementEnjeuxIrdService.findByIdWithAssociatedList(enseignementEnjeuxIrd).subscribe(res => {
           this.selectedEnseignementEnjeuxIrd = res;
            this.editEnseignementEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignementEnjeuxIrd(enseignementEnjeuxIrd:EnseignementEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'view');
        if(isPermistted){
           this.enseignementEnjeuxIrdService.findByIdWithAssociatedList(enseignementEnjeuxIrd).subscribe(res => {
           this.selectedEnseignementEnjeuxIrd = res;
            this.viewEnseignementEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignementEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();
            this.createEnseignementEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignementEnjeuxIrd(enseignementEnjeuxIrd:EnseignementEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementEnjeuxIrdService.delete(enseignementEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignementEnjeuxIrds.indexOf(enseignementEnjeuxIrd);
                          position > -1 ? this.enseignementEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement enjeux ird Supprimé',
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

public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignementEnjeuxIrd(enseignementEnjeuxIrd: EnseignementEnjeuxIrdVo) {

     this.enseignementEnjeuxIrdService.findByIdWithAssociatedList(enseignementEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateEnseignementEnjeuxIrd(res);
	       this.selectedEnseignementEnjeuxIrd = res;
	       this.selectedEnseignementEnjeuxIrd.id = null;
            this.createEnseignementEnjeuxIrdDialog = true;

});

	}

	initDuplicateEnseignementEnjeuxIrd(res: EnseignementEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enseignementEnjeuxIrds.map(e => {
    return {
            'Enseignement': e.enseignementVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Enseignement': this.searchEnseignementEnjeuxIrd.enseignementVo?.id ? this.searchEnseignementEnjeuxIrd.enseignementVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchEnseignementEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchEnseignementEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignementEnjeuxIrds(): Array<EnseignementEnjeuxIrdVo> {
           return this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds;
       }
    set enseignementEnjeuxIrds(value: Array<EnseignementEnjeuxIrdVo>) {
        this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds = value;
       }

    get enseignementEnjeuxIrdSelections(): Array<EnseignementEnjeuxIrdVo> {
           return this.enseignementEnjeuxIrdService.enseignementEnjeuxIrdSelections;
       }
    set enseignementEnjeuxIrdSelections(value: Array<EnseignementEnjeuxIrdVo>) {
        this.enseignementEnjeuxIrdService.enseignementEnjeuxIrdSelections = value;
       }
   
     


    get selectedEnseignementEnjeuxIrd():EnseignementEnjeuxIrdVo {
           return this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd;
       }
    set selectedEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd = value;
       }
    
    get createEnseignementEnjeuxIrdDialog():boolean {
           return this.enseignementEnjeuxIrdService.createEnseignementEnjeuxIrdDialog;
       }
    set createEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.createEnseignementEnjeuxIrdDialog= value;
       }
    
    get editEnseignementEnjeuxIrdDialog():boolean {
           return this.enseignementEnjeuxIrdService.editEnseignementEnjeuxIrdDialog;
       }
    set editEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.editEnseignementEnjeuxIrdDialog= value;
       }
    get viewEnseignementEnjeuxIrdDialog():boolean {
           return this.enseignementEnjeuxIrdService.viewEnseignementEnjeuxIrdDialog;
       }
    set viewEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.viewEnseignementEnjeuxIrdDialog = value;
       }
       
     get searchEnseignementEnjeuxIrd(): EnseignementEnjeuxIrdVo {
        return this.enseignementEnjeuxIrdService.searchEnseignementEnjeuxIrd;
       }
    set searchEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this.enseignementEnjeuxIrdService.searchEnseignementEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

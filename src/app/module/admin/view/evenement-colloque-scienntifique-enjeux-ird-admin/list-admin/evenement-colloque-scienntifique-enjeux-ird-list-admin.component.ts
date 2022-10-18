import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EvenementColloqueScienntifiqueService } from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-enjeux-ird-list-admin',
  templateUrl: './evenement-colloque-scienntifique-enjeux-ird-list-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-enjeux-ird-list-admin.component.css']
})
export class EvenementColloqueScienntifiqueEnjeuxIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EvenementColloqueScienntifiqueEnjeuxIrd';
    evenementColloqueScienntifiques :Array<EvenementColloqueScienntifiqueVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueEnjeuxIrdService: EvenementColloqueScienntifiqueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadEvenementColloqueScienntifiqueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEvenementColloqueScienntifique();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadEvenementColloqueScienntifiqueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'list');
        isPermistted ? this.evenementColloqueScienntifiqueEnjeuxIrdService.findAll().subscribe(evenementColloqueScienntifiqueEnjeuxIrds => this.evenementColloqueScienntifiqueEnjeuxIrds = evenementColloqueScienntifiqueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.evenementColloqueScienntifiqueEnjeuxIrdService.findByCriteria(this.searchEvenementColloqueScienntifiqueEnjeuxIrd).subscribe(evenementColloqueScienntifiqueEnjeuxIrds=>{
            
            this.evenementColloqueScienntifiqueEnjeuxIrds = evenementColloqueScienntifiqueEnjeuxIrds;
           // this.searchEvenementColloqueScienntifiqueEnjeuxIrd = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'evenementColloqueScienntifique?.id', header: 'Evenement colloque scienntifique'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editEvenementColloqueScienntifiqueEnjeuxIrd(evenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.evenementColloqueScienntifiqueEnjeuxIrdService.findByIdWithAssociatedList(evenementColloqueScienntifiqueEnjeuxIrd).subscribe(res => {
           this.selectedEvenementColloqueScienntifiqueEnjeuxIrd = res;
            this.editEvenementColloqueScienntifiqueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEvenementColloqueScienntifiqueEnjeuxIrd(evenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'view');
        if(isPermistted){
           this.evenementColloqueScienntifiqueEnjeuxIrdService.findByIdWithAssociatedList(evenementColloqueScienntifiqueEnjeuxIrd).subscribe(res => {
           this.selectedEvenementColloqueScienntifiqueEnjeuxIrd = res;
            this.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEvenementColloqueScienntifiqueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEvenementColloqueScienntifiqueEnjeuxIrd = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
            this.createEvenementColloqueScienntifiqueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEvenementColloqueScienntifiqueEnjeuxIrd(evenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Evenement colloque scienntifique enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.evenementColloqueScienntifiqueEnjeuxIrdService.delete(evenementColloqueScienntifiqueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.evenementColloqueScienntifiqueEnjeuxIrds.indexOf(evenementColloqueScienntifiqueEnjeuxIrd);
                          position > -1 ? this.evenementColloqueScienntifiqueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Evenement colloque scienntifique enjeux ird Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'list');
    isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiqueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEvenementColloqueScienntifiqueEnjeuxIrd(evenementColloqueScienntifiqueEnjeuxIrd: EvenementColloqueScienntifiqueEnjeuxIrdVo) {

     this.evenementColloqueScienntifiqueEnjeuxIrdService.findByIdWithAssociatedList(evenementColloqueScienntifiqueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateEvenementColloqueScienntifiqueEnjeuxIrd(res);
	       this.selectedEvenementColloqueScienntifiqueEnjeuxIrd = res;
	       this.selectedEvenementColloqueScienntifiqueEnjeuxIrd.id = null;
            this.createEvenementColloqueScienntifiqueEnjeuxIrdDialog = true;

});

	}

	initDuplicateEvenementColloqueScienntifiqueEnjeuxIrd(res: EvenementColloqueScienntifiqueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.evenementColloqueScienntifiqueEnjeuxIrds.map(e => {
    return {
            'Evenement colloque scienntifique': e.evenementColloqueScienntifiqueVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Evenement colloque scienntifique': this.searchEvenementColloqueScienntifiqueEnjeuxIrd.evenementColloqueScienntifiqueVo?.id ? this.searchEvenementColloqueScienntifiqueEnjeuxIrd.evenementColloqueScienntifiqueVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchEvenementColloqueScienntifiqueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchEvenementColloqueScienntifiqueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get evenementColloqueScienntifiqueEnjeuxIrds(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds;
       }
    set evenementColloqueScienntifiqueEnjeuxIrds(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds = value;
       }

    get evenementColloqueScienntifiqueEnjeuxIrdSelections(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrdSelections;
       }
    set evenementColloqueScienntifiqueEnjeuxIrdSelections(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrdSelections = value;
       }
   
     


    get selectedEvenementColloqueScienntifiqueEnjeuxIrd():EvenementColloqueScienntifiqueEnjeuxIrdVo {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd;
       }
    set selectedEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }
    
    get createEvenementColloqueScienntifiqueEnjeuxIrdDialog():boolean {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.createEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }
    set createEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.createEvenementColloqueScienntifiqueEnjeuxIrdDialog= value;
       }
    
    get editEvenementColloqueScienntifiqueEnjeuxIrdDialog():boolean {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.editEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }
    set editEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.editEvenementColloqueScienntifiqueEnjeuxIrdDialog= value;
       }
    get viewEvenementColloqueScienntifiqueEnjeuxIrdDialog():boolean {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }
    set viewEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog = value;
       }
       
     get searchEvenementColloqueScienntifiqueEnjeuxIrd(): EvenementColloqueScienntifiqueEnjeuxIrdVo {
        return this.evenementColloqueScienntifiqueEnjeuxIrdService.searchEvenementColloqueScienntifiqueEnjeuxIrd;
       }
    set searchEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.searchEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

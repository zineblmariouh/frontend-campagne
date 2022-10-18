import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { ResponsabilitePedagogiqueService } from '../../../../../controller/service/ResponsabilitePedagogique.service';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-responsabilite-pedagogique-enjeux-ird-list-admin',
  templateUrl: './responsabilite-pedagogique-enjeux-ird-list-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-enjeux-ird-list-admin.component.css']
})
export class ResponsabilitePedagogiqueEnjeuxIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabilitePedagogiqueEnjeuxIrd';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    responsabilitePedagogiques :Array<ResponsabilitePedagogiqueVo>;


    constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEnjeuxIrdService: ResponsabilitePedagogiqueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
) { }

    ngOnInit(): void {
      this.loadResponsabilitePedagogiqueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadResponsabilitePedagogique();
    }
    
    // methods
      public async loadResponsabilitePedagogiqueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'list');
        isPermistted ? this.responsabilitePedagogiqueEnjeuxIrdService.findAll().subscribe(responsabilitePedagogiqueEnjeuxIrds => this.responsabilitePedagogiqueEnjeuxIrds = responsabilitePedagogiqueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.responsabilitePedagogiqueEnjeuxIrdService.findByCriteria(this.searchResponsabilitePedagogiqueEnjeuxIrd).subscribe(responsabilitePedagogiqueEnjeuxIrds=>{
            
            this.responsabilitePedagogiqueEnjeuxIrds = responsabilitePedagogiqueEnjeuxIrds;
           // this.searchResponsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'responsabilitePedagogique?.id', header: 'Responsabilite pedagogique'},
        ];
    }
    
    public async editResponsabilitePedagogiqueEnjeuxIrd(responsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.responsabilitePedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(responsabilitePedagogiqueEnjeuxIrd).subscribe(res => {
           this.selectedResponsabilitePedagogiqueEnjeuxIrd = res;
            this.editResponsabilitePedagogiqueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewResponsabilitePedagogiqueEnjeuxIrd(responsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'view');
        if(isPermistted){
           this.responsabilitePedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(responsabilitePedagogiqueEnjeuxIrd).subscribe(res => {
           this.selectedResponsabilitePedagogiqueEnjeuxIrd = res;
            this.viewResponsabilitePedagogiqueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateResponsabilitePedagogiqueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedResponsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();
            this.createResponsabilitePedagogiqueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteResponsabilitePedagogiqueEnjeuxIrd(responsabilitePedagogiqueEnjeuxIrd:ResponsabilitePedagogiqueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Responsabilite pedagogique enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.responsabilitePedagogiqueEnjeuxIrdService.delete(responsabilitePedagogiqueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.responsabilitePedagogiqueEnjeuxIrds.indexOf(responsabilitePedagogiqueEnjeuxIrd);
                          position > -1 ? this.responsabilitePedagogiqueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Responsabilite pedagogique enjeux ird Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadResponsabilitePedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEnjeuxIrd', 'list');
    isPermistted ? this.responsabilitePedagogiqueService.findAll().subscribe(responsabilitePedagogiques => this.responsabilitePedagogiques = responsabilitePedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateResponsabilitePedagogiqueEnjeuxIrd(responsabilitePedagogiqueEnjeuxIrd: ResponsabilitePedagogiqueEnjeuxIrdVo) {

     this.responsabilitePedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(responsabilitePedagogiqueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateResponsabilitePedagogiqueEnjeuxIrd(res);
	       this.selectedResponsabilitePedagogiqueEnjeuxIrd = res;
	       this.selectedResponsabilitePedagogiqueEnjeuxIrd.id = null;
            this.createResponsabilitePedagogiqueEnjeuxIrdDialog = true;

});

	}

	initDuplicateResponsabilitePedagogiqueEnjeuxIrd(res: ResponsabilitePedagogiqueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.responsabilitePedagogiqueEnjeuxIrds.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Responsabilite pedagogique': e.responsabilitePedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchResponsabilitePedagogiqueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchResponsabilitePedagogiqueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Responsabilite pedagogique': this.searchResponsabilitePedagogiqueEnjeuxIrd.responsabilitePedagogiqueVo?.id ? this.searchResponsabilitePedagogiqueEnjeuxIrd.responsabilitePedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get responsabilitePedagogiqueEnjeuxIrds(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
           return this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds;
       }
    set responsabilitePedagogiqueEnjeuxIrds(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds = value;
       }

    get responsabilitePedagogiqueEnjeuxIrdSelections(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
           return this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrdSelections;
       }
    set responsabilitePedagogiqueEnjeuxIrdSelections(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrdSelections = value;
       }
   
     


    get selectedResponsabilitePedagogiqueEnjeuxIrd():ResponsabilitePedagogiqueEnjeuxIrdVo {
           return this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd;
       }
    set selectedResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd = value;
       }
    
    get createResponsabilitePedagogiqueEnjeuxIrdDialog():boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.createResponsabilitePedagogiqueEnjeuxIrdDialog;
       }
    set createResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.createResponsabilitePedagogiqueEnjeuxIrdDialog= value;
       }
    
    get editResponsabilitePedagogiqueEnjeuxIrdDialog():boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.editResponsabilitePedagogiqueEnjeuxIrdDialog;
       }
    set editResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.editResponsabilitePedagogiqueEnjeuxIrdDialog= value;
       }
    get viewResponsabilitePedagogiqueEnjeuxIrdDialog():boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.viewResponsabilitePedagogiqueEnjeuxIrdDialog;
       }
    set viewResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.viewResponsabilitePedagogiqueEnjeuxIrdDialog = value;
       }
       
     get searchResponsabilitePedagogiqueEnjeuxIrd(): ResponsabilitePedagogiqueEnjeuxIrdVo {
        return this.responsabilitePedagogiqueEnjeuxIrdService.searchResponsabilitePedagogiqueEnjeuxIrd;
       }
    set searchResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.responsabilitePedagogiqueEnjeuxIrdService.searchResponsabilitePedagogiqueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

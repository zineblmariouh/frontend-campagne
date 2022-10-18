import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { ResponsabilitePedagogiqueService } from '../../../../../controller/service/ResponsabilitePedagogique.service';

import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-responsabilite-pedagogique-pays-list-admin',
  templateUrl: './responsabilite-pedagogique-pays-list-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-pays-list-admin.component.css']
})
export class ResponsabilitePedagogiquePaysListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabilitePedagogiquePays';
    payss :Array<PaysVo>;
    responsabilitePedagogiques :Array<ResponsabilitePedagogiqueVo>;


    constructor(private datePipe: DatePipe, private responsabilitePedagogiquePaysService: ResponsabilitePedagogiquePaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
) { }

    ngOnInit(): void {
      this.loadResponsabilitePedagogiquePayss();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadResponsabilitePedagogique();
    }
    
    // methods
      public async loadResponsabilitePedagogiquePayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'list');
        isPermistted ? this.responsabilitePedagogiquePaysService.findAll().subscribe(responsabilitePedagogiquePayss => this.responsabilitePedagogiquePayss = responsabilitePedagogiquePayss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.responsabilitePedagogiquePaysService.findByCriteria(this.searchResponsabilitePedagogiquePays).subscribe(responsabilitePedagogiquePayss=>{
            
            this.responsabilitePedagogiquePayss = responsabilitePedagogiquePayss;
           // this.searchResponsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'responsabilitePedagogique?.id', header: 'Responsabilite pedagogique'},
        ];
    }
    
    public async editResponsabilitePedagogiquePays(responsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'edit');
         if(isPermistted){
          this.responsabilitePedagogiquePaysService.findByIdWithAssociatedList(responsabilitePedagogiquePays).subscribe(res => {
           this.selectedResponsabilitePedagogiquePays = res;
            this.editResponsabilitePedagogiquePaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewResponsabilitePedagogiquePays(responsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'view');
        if(isPermistted){
           this.responsabilitePedagogiquePaysService.findByIdWithAssociatedList(responsabilitePedagogiquePays).subscribe(res => {
           this.selectedResponsabilitePedagogiquePays = res;
            this.viewResponsabilitePedagogiquePaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateResponsabilitePedagogiquePays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedResponsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();
            this.createResponsabilitePedagogiquePaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteResponsabilitePedagogiquePays(responsabilitePedagogiquePays:ResponsabilitePedagogiquePaysVo){
       const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Responsabilite pedagogique pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.responsabilitePedagogiquePaysService.delete(responsabilitePedagogiquePays).subscribe(status=>{
                          if(status > 0){
                          const position = this.responsabilitePedagogiquePayss.indexOf(responsabilitePedagogiquePays);
                          position > -1 ? this.responsabilitePedagogiquePayss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Responsabilite pedagogique pays Supprimé',
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

public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadResponsabilitePedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiquePays', 'list');
    isPermistted ? this.responsabilitePedagogiqueService.findAll().subscribe(responsabilitePedagogiques => this.responsabilitePedagogiques = responsabilitePedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateResponsabilitePedagogiquePays(responsabilitePedagogiquePays: ResponsabilitePedagogiquePaysVo) {

     this.responsabilitePedagogiquePaysService.findByIdWithAssociatedList(responsabilitePedagogiquePays).subscribe(
	 res => {
	       this.initDuplicateResponsabilitePedagogiquePays(res);
	       this.selectedResponsabilitePedagogiquePays = res;
	       this.selectedResponsabilitePedagogiquePays.id = null;
            this.createResponsabilitePedagogiquePaysDialog = true;

});

	}

	initDuplicateResponsabilitePedagogiquePays(res: ResponsabilitePedagogiquePaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.responsabilitePedagogiquePayss.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Responsabilite pedagogique': e.responsabilitePedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchResponsabilitePedagogiquePays.paysVo?.libelle ? this.searchResponsabilitePedagogiquePays.paysVo?.libelle : environment.emptyForExport ,
        'Responsabilite pedagogique': this.searchResponsabilitePedagogiquePays.responsabilitePedagogiqueVo?.id ? this.searchResponsabilitePedagogiquePays.responsabilitePedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get responsabilitePedagogiquePayss(): Array<ResponsabilitePedagogiquePaysVo> {
           return this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss;
       }
    set responsabilitePedagogiquePayss(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss = value;
       }

    get responsabilitePedagogiquePaysSelections(): Array<ResponsabilitePedagogiquePaysVo> {
           return this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePaysSelections;
       }
    set responsabilitePedagogiquePaysSelections(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePaysSelections = value;
       }
   
     


    get selectedResponsabilitePedagogiquePays():ResponsabilitePedagogiquePaysVo {
           return this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays;
       }
    set selectedResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays = value;
       }
    
    get createResponsabilitePedagogiquePaysDialog():boolean {
           return this.responsabilitePedagogiquePaysService.createResponsabilitePedagogiquePaysDialog;
       }
    set createResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.createResponsabilitePedagogiquePaysDialog= value;
       }
    
    get editResponsabilitePedagogiquePaysDialog():boolean {
           return this.responsabilitePedagogiquePaysService.editResponsabilitePedagogiquePaysDialog;
       }
    set editResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.editResponsabilitePedagogiquePaysDialog= value;
       }
    get viewResponsabilitePedagogiquePaysDialog():boolean {
           return this.responsabilitePedagogiquePaysService.viewResponsabilitePedagogiquePaysDialog;
       }
    set viewResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.viewResponsabilitePedagogiquePaysDialog = value;
       }
       
     get searchResponsabilitePedagogiquePays(): ResponsabilitePedagogiquePaysVo {
        return this.responsabilitePedagogiquePaysService.searchResponsabilitePedagogiquePays;
       }
    set searchResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this.responsabilitePedagogiquePaysService.searchResponsabilitePedagogiquePays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

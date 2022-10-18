import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-enjeux-ird-list-chercheur',
  templateUrl: './outil-pedagogique-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-enjeux-ird-list-chercheur.component.css']
})
export class OutilPedagogiqueEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiqueEnjeuxIrd';
    outilPedagogiques :Array<OutilPedagogiqueVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueEnjeuxIrdService: OutilPedagogiqueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private outilPedagogiqueService: OutilPedagogiqueService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiqueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadOutilPedagogique();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadOutilPedagogiqueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'list');
        isPermistted ? this.outilPedagogiqueEnjeuxIrdService.findAll().subscribe(outilPedagogiqueEnjeuxIrds => this.outilPedagogiqueEnjeuxIrds = outilPedagogiqueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueEnjeuxIrdService.findByCriteria(this.searchOutilPedagogiqueEnjeuxIrd).subscribe(outilPedagogiqueEnjeuxIrds=>{
            
            this.outilPedagogiqueEnjeuxIrds = outilPedagogiqueEnjeuxIrds;
           // this.searchOutilPedagogiqueEnjeuxIrd = new OutilPedagogiqueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editOutilPedagogiqueEnjeuxIrd(outilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.outilPedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(outilPedagogiqueEnjeuxIrd).subscribe(res => {
           this.selectedOutilPedagogiqueEnjeuxIrd = res;
            this.editOutilPedagogiqueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiqueEnjeuxIrd(outilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'view');
        if(isPermistted){
           this.outilPedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(outilPedagogiqueEnjeuxIrd).subscribe(res => {
           this.selectedOutilPedagogiqueEnjeuxIrd = res;
            this.viewOutilPedagogiqueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiqueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiqueEnjeuxIrd = new OutilPedagogiqueEnjeuxIrdVo();
            this.createOutilPedagogiqueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiqueEnjeuxIrd(outilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueEnjeuxIrdService.delete(outilPedagogiqueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiqueEnjeuxIrds.indexOf(outilPedagogiqueEnjeuxIrd);
                          position > -1 ? this.outilPedagogiqueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique enjeux ird Supprimé',
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

public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiqueEnjeuxIrd(outilPedagogiqueEnjeuxIrd: OutilPedagogiqueEnjeuxIrdVo) {

     this.outilPedagogiqueEnjeuxIrdService.findByIdWithAssociatedList(outilPedagogiqueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiqueEnjeuxIrd(res);
	       this.selectedOutilPedagogiqueEnjeuxIrd = res;
	       this.selectedOutilPedagogiqueEnjeuxIrd.id = null;
            this.createOutilPedagogiqueEnjeuxIrdDialog = true;

});

	}

	initDuplicateOutilPedagogiqueEnjeuxIrd(res: OutilPedagogiqueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiqueEnjeuxIrds.map(e => {
    return {
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Outil pedagogique': this.searchOutilPedagogiqueEnjeuxIrd.outilPedagogiqueVo?.id ? this.searchOutilPedagogiqueEnjeuxIrd.outilPedagogiqueVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchOutilPedagogiqueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchOutilPedagogiqueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiqueEnjeuxIrds(): Array<OutilPedagogiqueEnjeuxIrdVo> {
           return this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds;
       }
    set outilPedagogiqueEnjeuxIrds(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds = value;
       }

    get outilPedagogiqueEnjeuxIrdSelections(): Array<OutilPedagogiqueEnjeuxIrdVo> {
           return this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrdSelections;
       }
    set outilPedagogiqueEnjeuxIrdSelections(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrdSelections = value;
       }
   
     


    get selectedOutilPedagogiqueEnjeuxIrd():OutilPedagogiqueEnjeuxIrdVo {
           return this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd;
       }
    set selectedOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd = value;
       }
    
    get createOutilPedagogiqueEnjeuxIrdDialog():boolean {
           return this.outilPedagogiqueEnjeuxIrdService.createOutilPedagogiqueEnjeuxIrdDialog;
       }
    set createOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.createOutilPedagogiqueEnjeuxIrdDialog= value;
       }
    
    get editOutilPedagogiqueEnjeuxIrdDialog():boolean {
           return this.outilPedagogiqueEnjeuxIrdService.editOutilPedagogiqueEnjeuxIrdDialog;
       }
    set editOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.editOutilPedagogiqueEnjeuxIrdDialog= value;
       }
    get viewOutilPedagogiqueEnjeuxIrdDialog():boolean {
           return this.outilPedagogiqueEnjeuxIrdService.viewOutilPedagogiqueEnjeuxIrdDialog;
       }
    set viewOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.viewOutilPedagogiqueEnjeuxIrdDialog = value;
       }
       
     get searchOutilPedagogiqueEnjeuxIrd(): OutilPedagogiqueEnjeuxIrdVo {
        return this.outilPedagogiqueEnjeuxIrdService.searchOutilPedagogiqueEnjeuxIrd;
       }
    set searchOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this.outilPedagogiqueEnjeuxIrdService.searchOutilPedagogiqueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

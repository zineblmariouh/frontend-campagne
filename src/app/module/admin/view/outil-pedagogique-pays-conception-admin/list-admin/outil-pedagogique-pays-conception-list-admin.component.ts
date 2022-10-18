import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePaysConceptionService} from '../../../../../controller/service/OutilPedagogiquePaysConception.service';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-pays-conception-list-admin',
  templateUrl: './outil-pedagogique-pays-conception-list-admin.component.html',
  styleUrls: ['./outil-pedagogique-pays-conception-list-admin.component.css']
})
export class OutilPedagogiquePaysConceptionListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiquePaysConception';
    payss :Array<PaysVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiquePaysConceptionService: OutilPedagogiquePaysConceptionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiquePaysConceptions();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiquePaysConceptions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'list');
        isPermistted ? this.outilPedagogiquePaysConceptionService.findAll().subscribe(outilPedagogiquePaysConceptions => this.outilPedagogiquePaysConceptions = outilPedagogiquePaysConceptions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiquePaysConceptionService.findByCriteria(this.searchOutilPedagogiquePaysConception).subscribe(outilPedagogiquePaysConceptions=>{
            
            this.outilPedagogiquePaysConceptions = outilPedagogiquePaysConceptions;
           // this.searchOutilPedagogiquePaysConception = new OutilPedagogiquePaysConceptionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiquePaysConception(outilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'edit');
         if(isPermistted){
          this.outilPedagogiquePaysConceptionService.findByIdWithAssociatedList(outilPedagogiquePaysConception).subscribe(res => {
           this.selectedOutilPedagogiquePaysConception = res;
            this.editOutilPedagogiquePaysConceptionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiquePaysConception(outilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'view');
        if(isPermistted){
           this.outilPedagogiquePaysConceptionService.findByIdWithAssociatedList(outilPedagogiquePaysConception).subscribe(res => {
           this.selectedOutilPedagogiquePaysConception = res;
            this.viewOutilPedagogiquePaysConceptionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiquePaysConception(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiquePaysConception = new OutilPedagogiquePaysConceptionVo();
            this.createOutilPedagogiquePaysConceptionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiquePaysConception(outilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique pays conception) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiquePaysConceptionService.delete(outilPedagogiquePaysConception).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiquePaysConceptions.indexOf(outilPedagogiquePaysConception);
                          position > -1 ? this.outilPedagogiquePaysConceptions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique pays conception Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysConception', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiquePaysConception(outilPedagogiquePaysConception: OutilPedagogiquePaysConceptionVo) {

     this.outilPedagogiquePaysConceptionService.findByIdWithAssociatedList(outilPedagogiquePaysConception).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiquePaysConception(res);
	       this.selectedOutilPedagogiquePaysConception = res;
	       this.selectedOutilPedagogiquePaysConception.id = null;
            this.createOutilPedagogiquePaysConceptionDialog = true;

});

	}

	initDuplicateOutilPedagogiquePaysConception(res: OutilPedagogiquePaysConceptionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiquePaysConceptions.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchOutilPedagogiquePaysConception.paysVo?.libelle ? this.searchOutilPedagogiquePaysConception.paysVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiquePaysConception.outilPedagogiqueVo?.id ? this.searchOutilPedagogiquePaysConception.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiquePaysConceptions(): Array<OutilPedagogiquePaysConceptionVo> {
           return this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptions;
       }
    set outilPedagogiquePaysConceptions(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptions = value;
       }

    get outilPedagogiquePaysConceptionSelections(): Array<OutilPedagogiquePaysConceptionVo> {
           return this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptionSelections;
       }
    set outilPedagogiquePaysConceptionSelections(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptionSelections = value;
       }
   
     


    get selectedOutilPedagogiquePaysConception():OutilPedagogiquePaysConceptionVo {
           return this.outilPedagogiquePaysConceptionService.selectedOutilPedagogiquePaysConception;
       }
    set selectedOutilPedagogiquePaysConception(value: OutilPedagogiquePaysConceptionVo) {
        this.outilPedagogiquePaysConceptionService.selectedOutilPedagogiquePaysConception = value;
       }
    
    get createOutilPedagogiquePaysConceptionDialog():boolean {
           return this.outilPedagogiquePaysConceptionService.createOutilPedagogiquePaysConceptionDialog;
       }
    set createOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this.outilPedagogiquePaysConceptionService.createOutilPedagogiquePaysConceptionDialog= value;
       }
    
    get editOutilPedagogiquePaysConceptionDialog():boolean {
           return this.outilPedagogiquePaysConceptionService.editOutilPedagogiquePaysConceptionDialog;
       }
    set editOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this.outilPedagogiquePaysConceptionService.editOutilPedagogiquePaysConceptionDialog= value;
       }
    get viewOutilPedagogiquePaysConceptionDialog():boolean {
           return this.outilPedagogiquePaysConceptionService.viewOutilPedagogiquePaysConceptionDialog;
       }
    set viewOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this.outilPedagogiquePaysConceptionService.viewOutilPedagogiquePaysConceptionDialog = value;
       }
       
     get searchOutilPedagogiquePaysConception(): OutilPedagogiquePaysConceptionVo {
        return this.outilPedagogiquePaysConceptionService.searchOutilPedagogiquePaysConception;
       }
    set searchOutilPedagogiquePaysConception(value: OutilPedagogiquePaysConceptionVo) {
        this.outilPedagogiquePaysConceptionService.searchOutilPedagogiquePaysConception = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

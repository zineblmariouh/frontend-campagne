import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
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
  selector: 'app-outil-pedagogique-pays-diffusion-list-chercheur',
  templateUrl: './outil-pedagogique-pays-diffusion-list-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-pays-diffusion-list-chercheur.component.css']
})
export class OutilPedagogiquePaysDiffusionListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiquePaysDiffusion';
    payss :Array<PaysVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiquePaysDiffusionService: OutilPedagogiquePaysDiffusionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiquePaysDiffusions();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiquePaysDiffusions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'list');
        isPermistted ? this.outilPedagogiquePaysDiffusionService.findAll().subscribe(outilPedagogiquePaysDiffusions => this.outilPedagogiquePaysDiffusions = outilPedagogiquePaysDiffusions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiquePaysDiffusionService.findByCriteria(this.searchOutilPedagogiquePaysDiffusion).subscribe(outilPedagogiquePaysDiffusions=>{
            
            this.outilPedagogiquePaysDiffusions = outilPedagogiquePaysDiffusions;
           // this.searchOutilPedagogiquePaysDiffusion = new OutilPedagogiquePaysDiffusionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiquePaysDiffusion(outilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'edit');
         if(isPermistted){
          this.outilPedagogiquePaysDiffusionService.findByIdWithAssociatedList(outilPedagogiquePaysDiffusion).subscribe(res => {
           this.selectedOutilPedagogiquePaysDiffusion = res;
            this.editOutilPedagogiquePaysDiffusionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiquePaysDiffusion(outilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'view');
        if(isPermistted){
           this.outilPedagogiquePaysDiffusionService.findByIdWithAssociatedList(outilPedagogiquePaysDiffusion).subscribe(res => {
           this.selectedOutilPedagogiquePaysDiffusion = res;
            this.viewOutilPedagogiquePaysDiffusionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiquePaysDiffusion(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiquePaysDiffusion = new OutilPedagogiquePaysDiffusionVo();
            this.createOutilPedagogiquePaysDiffusionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiquePaysDiffusion(outilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique pays diffusion) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiquePaysDiffusionService.delete(outilPedagogiquePaysDiffusion).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiquePaysDiffusions.indexOf(outilPedagogiquePaysDiffusion);
                          position > -1 ? this.outilPedagogiquePaysDiffusions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique pays diffusion Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePaysDiffusion', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiquePaysDiffusion(outilPedagogiquePaysDiffusion: OutilPedagogiquePaysDiffusionVo) {

     this.outilPedagogiquePaysDiffusionService.findByIdWithAssociatedList(outilPedagogiquePaysDiffusion).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiquePaysDiffusion(res);
	       this.selectedOutilPedagogiquePaysDiffusion = res;
	       this.selectedOutilPedagogiquePaysDiffusion.id = null;
            this.createOutilPedagogiquePaysDiffusionDialog = true;

});

	}

	initDuplicateOutilPedagogiquePaysDiffusion(res: OutilPedagogiquePaysDiffusionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiquePaysDiffusions.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchOutilPedagogiquePaysDiffusion.paysVo?.libelle ? this.searchOutilPedagogiquePaysDiffusion.paysVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiquePaysDiffusion.outilPedagogiqueVo?.id ? this.searchOutilPedagogiquePaysDiffusion.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiquePaysDiffusions(): Array<OutilPedagogiquePaysDiffusionVo> {
           return this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions;
       }
    set outilPedagogiquePaysDiffusions(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions = value;
       }

    get outilPedagogiquePaysDiffusionSelections(): Array<OutilPedagogiquePaysDiffusionVo> {
           return this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusionSelections;
       }
    set outilPedagogiquePaysDiffusionSelections(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusionSelections = value;
       }
   
     


    get selectedOutilPedagogiquePaysDiffusion():OutilPedagogiquePaysDiffusionVo {
           return this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion;
       }
    set selectedOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion = value;
       }
    
    get createOutilPedagogiquePaysDiffusionDialog():boolean {
           return this.outilPedagogiquePaysDiffusionService.createOutilPedagogiquePaysDiffusionDialog;
       }
    set createOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this.outilPedagogiquePaysDiffusionService.createOutilPedagogiquePaysDiffusionDialog= value;
       }
    
    get editOutilPedagogiquePaysDiffusionDialog():boolean {
           return this.outilPedagogiquePaysDiffusionService.editOutilPedagogiquePaysDiffusionDialog;
       }
    set editOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this.outilPedagogiquePaysDiffusionService.editOutilPedagogiquePaysDiffusionDialog= value;
       }
    get viewOutilPedagogiquePaysDiffusionDialog():boolean {
           return this.outilPedagogiquePaysDiffusionService.viewOutilPedagogiquePaysDiffusionDialog;
       }
    set viewOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this.outilPedagogiquePaysDiffusionService.viewOutilPedagogiquePaysDiffusionDialog = value;
       }
       
     get searchOutilPedagogiquePaysDiffusion(): OutilPedagogiquePaysDiffusionVo {
        return this.outilPedagogiquePaysDiffusionService.searchOutilPedagogiquePaysDiffusion;
       }
    set searchOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this.outilPedagogiquePaysDiffusionService.searchOutilPedagogiquePaysDiffusion = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

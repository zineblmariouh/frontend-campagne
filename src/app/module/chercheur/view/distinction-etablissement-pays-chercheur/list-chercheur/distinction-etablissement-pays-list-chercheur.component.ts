import {Component, OnInit} from '@angular/core';
import {DistinctionEtablissementPaysService} from '../../../../../controller/service/DistinctionEtablissementPays.service';
import {DistinctionEtablissementPaysVo} from '../../../../../controller/model/DistinctionEtablissementPays.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { DistinctionService } from '../../../../../controller/service/Distinction.service';

import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-distinction-etablissement-pays-list-chercheur',
  templateUrl: './distinction-etablissement-pays-list-chercheur.component.html',
  styleUrls: ['./distinction-etablissement-pays-list-chercheur.component.css']
})
export class DistinctionEtablissementPaysListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DistinctionEtablissementPays';
    payss :Array<PaysVo>;
    etablissements :Array<EtablissementVo>;
    distinctions :Array<DistinctionVo>;


    constructor(private datePipe: DatePipe, private distinctionEtablissementPaysService: DistinctionEtablissementPaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private distinctionService: DistinctionService
) { }

    ngOnInit(): void {
      this.loadDistinctionEtablissementPayss();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadEtablissement();
      this.loadDistinction();
    }
    
    // methods
      public async loadDistinctionEtablissementPayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'list');
        isPermistted ? this.distinctionEtablissementPaysService.findAll().subscribe(distinctionEtablissementPayss => this.distinctionEtablissementPayss = distinctionEtablissementPayss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.distinctionEtablissementPaysService.findByCriteria(this.searchDistinctionEtablissementPays).subscribe(distinctionEtablissementPayss=>{
            
            this.distinctionEtablissementPayss = distinctionEtablissementPayss;
           // this.searchDistinctionEtablissementPays = new DistinctionEtablissementPaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'distinction?.id', header: 'Distinction'},
        ];
    }
    
    public async editDistinctionEtablissementPays(distinctionEtablissementPays:DistinctionEtablissementPaysVo){
        const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'edit');
         if(isPermistted){
          this.distinctionEtablissementPaysService.findByIdWithAssociatedList(distinctionEtablissementPays).subscribe(res => {
           this.selectedDistinctionEtablissementPays = res;
            this.editDistinctionEtablissementPaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDistinctionEtablissementPays(distinctionEtablissementPays:DistinctionEtablissementPaysVo){
        const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'view');
        if(isPermistted){
           this.distinctionEtablissementPaysService.findByIdWithAssociatedList(distinctionEtablissementPays).subscribe(res => {
           this.selectedDistinctionEtablissementPays = res;
            this.viewDistinctionEtablissementPaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDistinctionEtablissementPays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDistinctionEtablissementPays = new DistinctionEtablissementPaysVo();
            this.createDistinctionEtablissementPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDistinctionEtablissementPays(distinctionEtablissementPays:DistinctionEtablissementPaysVo){
       const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Distinction etablissement pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.distinctionEtablissementPaysService.delete(distinctionEtablissementPays).subscribe(status=>{
                          if(status > 0){
                          const position = this.distinctionEtablissementPayss.indexOf(distinctionEtablissementPays);
                          position > -1 ? this.distinctionEtablissementPayss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Distinction etablissement pays Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDistinction(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DistinctionEtablissementPays', 'list');
    isPermistted ? this.distinctionService.findAll().subscribe(distinctions => this.distinctions = distinctions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDistinctionEtablissementPays(distinctionEtablissementPays: DistinctionEtablissementPaysVo) {

     this.distinctionEtablissementPaysService.findByIdWithAssociatedList(distinctionEtablissementPays).subscribe(
	 res => {
	       this.initDuplicateDistinctionEtablissementPays(res);
	       this.selectedDistinctionEtablissementPays = res;
	       this.selectedDistinctionEtablissementPays.id = null;
            this.createDistinctionEtablissementPaysDialog = true;

});

	}

	initDuplicateDistinctionEtablissementPays(res: DistinctionEtablissementPaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.distinctionEtablissementPayss.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Etablissement': e.etablissementVo?.libelle ,
            'Distinction': e.distinctionVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchDistinctionEtablissementPays.paysVo?.libelle ? this.searchDistinctionEtablissementPays.paysVo?.libelle : environment.emptyForExport ,
        'Etablissement': this.searchDistinctionEtablissementPays.etablissementVo?.libelle ? this.searchDistinctionEtablissementPays.etablissementVo?.libelle : environment.emptyForExport ,
        'Distinction': this.searchDistinctionEtablissementPays.distinctionVo?.id ? this.searchDistinctionEtablissementPays.distinctionVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get distinctionEtablissementPayss(): Array<DistinctionEtablissementPaysVo> {
           return this.distinctionEtablissementPaysService.distinctionEtablissementPayss;
       }
    set distinctionEtablissementPayss(value: Array<DistinctionEtablissementPaysVo>) {
        this.distinctionEtablissementPaysService.distinctionEtablissementPayss = value;
       }

    get distinctionEtablissementPaysSelections(): Array<DistinctionEtablissementPaysVo> {
           return this.distinctionEtablissementPaysService.distinctionEtablissementPaysSelections;
       }
    set distinctionEtablissementPaysSelections(value: Array<DistinctionEtablissementPaysVo>) {
        this.distinctionEtablissementPaysService.distinctionEtablissementPaysSelections = value;
       }
   
     


    get selectedDistinctionEtablissementPays():DistinctionEtablissementPaysVo {
           return this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays;
       }
    set selectedDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays = value;
       }
    
    get createDistinctionEtablissementPaysDialog():boolean {
           return this.distinctionEtablissementPaysService.createDistinctionEtablissementPaysDialog;
       }
    set createDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.createDistinctionEtablissementPaysDialog= value;
       }
    
    get editDistinctionEtablissementPaysDialog():boolean {
           return this.distinctionEtablissementPaysService.editDistinctionEtablissementPaysDialog;
       }
    set editDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.editDistinctionEtablissementPaysDialog= value;
       }
    get viewDistinctionEtablissementPaysDialog():boolean {
           return this.distinctionEtablissementPaysService.viewDistinctionEtablissementPaysDialog;
       }
    set viewDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.viewDistinctionEtablissementPaysDialog = value;
       }
       
     get searchDistinctionEtablissementPays(): DistinctionEtablissementPaysVo {
        return this.distinctionEtablissementPaysService.searchDistinctionEtablissementPays;
       }
    set searchDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this.distinctionEtablissementPaysService.searchDistinctionEtablissementPays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

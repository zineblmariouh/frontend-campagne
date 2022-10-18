import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { ResponsabilitePedagogiqueService } from '../../../../../controller/service/ResponsabilitePedagogique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-responsabilite-pedagogique-etablissement-list-admin',
  templateUrl: './responsabilite-pedagogique-etablissement-list-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-etablissement-list-admin.component.css']
})
export class ResponsabilitePedagogiqueEtablissementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabilitePedagogiqueEtablissement';
    etablissements :Array<EtablissementVo>;
    responsabilitePedagogiques :Array<ResponsabilitePedagogiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEtablissementService: ResponsabilitePedagogiqueEtablissementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadResponsabilitePedagogiqueEtablissements();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadResponsabilitePedagogique();
      this.loadPays();
    }
    
    // methods
      public async loadResponsabilitePedagogiqueEtablissements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'list');
        isPermistted ? this.responsabilitePedagogiqueEtablissementService.findAll().subscribe(responsabilitePedagogiqueEtablissements => this.responsabilitePedagogiqueEtablissements = responsabilitePedagogiqueEtablissements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.responsabilitePedagogiqueEtablissementService.findByCriteria(this.searchResponsabilitePedagogiqueEtablissement).subscribe(responsabilitePedagogiqueEtablissements=>{
            
            this.responsabilitePedagogiqueEtablissements = responsabilitePedagogiqueEtablissements;
           // this.searchResponsabilitePedagogiqueEtablissement = new ResponsabilitePedagogiqueEtablissementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'responsabilitePedagogique?.id', header: 'Responsabilite pedagogique'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editResponsabilitePedagogiqueEtablissement(responsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'edit');
         if(isPermistted){
          this.responsabilitePedagogiqueEtablissementService.findByIdWithAssociatedList(responsabilitePedagogiqueEtablissement).subscribe(res => {
           this.selectedResponsabilitePedagogiqueEtablissement = res;
            this.editResponsabilitePedagogiqueEtablissementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewResponsabilitePedagogiqueEtablissement(responsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'view');
        if(isPermistted){
           this.responsabilitePedagogiqueEtablissementService.findByIdWithAssociatedList(responsabilitePedagogiqueEtablissement).subscribe(res => {
           this.selectedResponsabilitePedagogiqueEtablissement = res;
            this.viewResponsabilitePedagogiqueEtablissementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateResponsabilitePedagogiqueEtablissement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedResponsabilitePedagogiqueEtablissement = new ResponsabilitePedagogiqueEtablissementVo();
            this.createResponsabilitePedagogiqueEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteResponsabilitePedagogiqueEtablissement(responsabilitePedagogiqueEtablissement:ResponsabilitePedagogiqueEtablissementVo){
       const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Responsabilite pedagogique etablissement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.responsabilitePedagogiqueEtablissementService.delete(responsabilitePedagogiqueEtablissement).subscribe(status=>{
                          if(status > 0){
                          const position = this.responsabilitePedagogiqueEtablissements.indexOf(responsabilitePedagogiqueEtablissement);
                          position > -1 ? this.responsabilitePedagogiqueEtablissements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Responsabilite pedagogique etablissement Supprimé',
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

public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadResponsabilitePedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'list');
    isPermistted ? this.responsabilitePedagogiqueService.findAll().subscribe(responsabilitePedagogiques => this.responsabilitePedagogiques = responsabilitePedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogiqueEtablissement', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateResponsabilitePedagogiqueEtablissement(responsabilitePedagogiqueEtablissement: ResponsabilitePedagogiqueEtablissementVo) {

     this.responsabilitePedagogiqueEtablissementService.findByIdWithAssociatedList(responsabilitePedagogiqueEtablissement).subscribe(
	 res => {
	       this.initDuplicateResponsabilitePedagogiqueEtablissement(res);
	       this.selectedResponsabilitePedagogiqueEtablissement = res;
	       this.selectedResponsabilitePedagogiqueEtablissement.id = null;
            this.createResponsabilitePedagogiqueEtablissementDialog = true;

});

	}

	initDuplicateResponsabilitePedagogiqueEtablissement(res: ResponsabilitePedagogiqueEtablissementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.responsabilitePedagogiqueEtablissements.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Responsabilite pedagogique': e.responsabilitePedagogiqueVo?.id ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchResponsabilitePedagogiqueEtablissement.etablissementVo?.libelle ? this.searchResponsabilitePedagogiqueEtablissement.etablissementVo?.libelle : environment.emptyForExport ,
        'Responsabilite pedagogique': this.searchResponsabilitePedagogiqueEtablissement.responsabilitePedagogiqueVo?.id ? this.searchResponsabilitePedagogiqueEtablissement.responsabilitePedagogiqueVo?.id : environment.emptyForExport ,
        'Pays': this.searchResponsabilitePedagogiqueEtablissement.paysVo?.libelle ? this.searchResponsabilitePedagogiqueEtablissement.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get responsabilitePedagogiqueEtablissements(): Array<ResponsabilitePedagogiqueEtablissementVo> {
           return this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements;
       }
    set responsabilitePedagogiqueEtablissements(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements = value;
       }

    get responsabilitePedagogiqueEtablissementSelections(): Array<ResponsabilitePedagogiqueEtablissementVo> {
           return this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissementSelections;
       }
    set responsabilitePedagogiqueEtablissementSelections(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissementSelections = value;
       }
   
     


    get selectedResponsabilitePedagogiqueEtablissement():ResponsabilitePedagogiqueEtablissementVo {
           return this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement;
       }
    set selectedResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement = value;
       }
    
    get createResponsabilitePedagogiqueEtablissementDialog():boolean {
           return this.responsabilitePedagogiqueEtablissementService.createResponsabilitePedagogiqueEtablissementDialog;
       }
    set createResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this.responsabilitePedagogiqueEtablissementService.createResponsabilitePedagogiqueEtablissementDialog= value;
       }
    
    get editResponsabilitePedagogiqueEtablissementDialog():boolean {
           return this.responsabilitePedagogiqueEtablissementService.editResponsabilitePedagogiqueEtablissementDialog;
       }
    set editResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this.responsabilitePedagogiqueEtablissementService.editResponsabilitePedagogiqueEtablissementDialog= value;
       }
    get viewResponsabilitePedagogiqueEtablissementDialog():boolean {
           return this.responsabilitePedagogiqueEtablissementService.viewResponsabilitePedagogiqueEtablissementDialog;
       }
    set viewResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this.responsabilitePedagogiqueEtablissementService.viewResponsabilitePedagogiqueEtablissementDialog = value;
       }
       
     get searchResponsabilitePedagogiqueEtablissement(): ResponsabilitePedagogiqueEtablissementVo {
        return this.responsabilitePedagogiqueEtablissementService.searchResponsabilitePedagogiqueEtablissement;
       }
    set searchResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this.responsabilitePedagogiqueEtablissementService.searchResponsabilitePedagogiqueEtablissement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

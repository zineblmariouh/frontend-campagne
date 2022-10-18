import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { ProjetActiviteRechercheDetailService } from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-enjeux-ird-list-chercheur',
  templateUrl: './projet-activite-recherche-detail-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-enjeux-ird-list-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetailEnjeuxIrd';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    projetActiviteRechercheDetails :Array<ProjetActiviteRechercheDetailVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEnjeuxIrdService: ProjetActiviteRechercheDetailEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetailEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadProjetActiviteRechercheDetail();
    }
    
    // methods
      public async loadProjetActiviteRechercheDetailEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'list');
        isPermistted ? this.projetActiviteRechercheDetailEnjeuxIrdService.findAll().subscribe(projetActiviteRechercheDetailEnjeuxIrds => this.projetActiviteRechercheDetailEnjeuxIrds = projetActiviteRechercheDetailEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailEnjeuxIrdService.findByCriteria(this.searchProjetActiviteRechercheDetailEnjeuxIrd).subscribe(projetActiviteRechercheDetailEnjeuxIrds=>{
            
            this.projetActiviteRechercheDetailEnjeuxIrds = projetActiviteRechercheDetailEnjeuxIrds;
           // this.searchProjetActiviteRechercheDetailEnjeuxIrd = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'projetActiviteRechercheDetail?.id', header: 'Projet activite recherche detail'},
        ];
    }
    
    public async editProjetActiviteRechercheDetailEnjeuxIrd(projetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailEnjeuxIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailEnjeuxIrd).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailEnjeuxIrd = res;
            this.editProjetActiviteRechercheDetailEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetailEnjeuxIrd(projetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailEnjeuxIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailEnjeuxIrd).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailEnjeuxIrd = res;
            this.viewProjetActiviteRechercheDetailEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetailEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetailEnjeuxIrd = new ProjetActiviteRechercheDetailEnjeuxIrdVo();
            this.createProjetActiviteRechercheDetailEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetailEnjeuxIrd(projetActiviteRechercheDetailEnjeuxIrd:ProjetActiviteRechercheDetailEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailEnjeuxIrdService.delete(projetActiviteRechercheDetailEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetailEnjeuxIrds.indexOf(projetActiviteRechercheDetailEnjeuxIrd);
                          position > -1 ? this.projetActiviteRechercheDetailEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail enjeux ird Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProjetActiviteRechercheDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailEnjeuxIrd', 'list');
    isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetailEnjeuxIrd(projetActiviteRechercheDetailEnjeuxIrd: ProjetActiviteRechercheDetailEnjeuxIrdVo) {

     this.projetActiviteRechercheDetailEnjeuxIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetailEnjeuxIrd(res);
	       this.selectedProjetActiviteRechercheDetailEnjeuxIrd = res;
	       this.selectedProjetActiviteRechercheDetailEnjeuxIrd.id = null;
            this.createProjetActiviteRechercheDetailEnjeuxIrdDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetailEnjeuxIrd(res: ProjetActiviteRechercheDetailEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetailEnjeuxIrds.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Projet activite recherche detail': e.projetActiviteRechercheDetailVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchProjetActiviteRechercheDetailEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchProjetActiviteRechercheDetailEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Projet activite recherche detail': this.searchProjetActiviteRechercheDetailEnjeuxIrd.projetActiviteRechercheDetailVo?.id ? this.searchProjetActiviteRechercheDetailEnjeuxIrd.projetActiviteRechercheDetailVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetailEnjeuxIrds(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds;
       }
    set projetActiviteRechercheDetailEnjeuxIrds(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds = value;
       }

    get projetActiviteRechercheDetailEnjeuxIrdSelections(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrdSelections;
       }
    set projetActiviteRechercheDetailEnjeuxIrdSelections(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrdSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetailEnjeuxIrd():ProjetActiviteRechercheDetailEnjeuxIrdVo {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd;
       }
    set selectedProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd = value;
       }
    
    get createProjetActiviteRechercheDetailEnjeuxIrdDialog():boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.createProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }
    set createProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.createProjetActiviteRechercheDetailEnjeuxIrdDialog= value;
       }
    
    get editProjetActiviteRechercheDetailEnjeuxIrdDialog():boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.editProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }
    set editProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.editProjetActiviteRechercheDetailEnjeuxIrdDialog= value;
       }
    get viewProjetActiviteRechercheDetailEnjeuxIrdDialog():boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.viewProjetActiviteRechercheDetailEnjeuxIrdDialog;
       }
    set viewProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.viewProjetActiviteRechercheDetailEnjeuxIrdDialog = value;
       }
       
     get searchProjetActiviteRechercheDetailEnjeuxIrd(): ProjetActiviteRechercheDetailEnjeuxIrdVo {
        return this.projetActiviteRechercheDetailEnjeuxIrdService.searchProjetActiviteRechercheDetailEnjeuxIrd;
       }
    set searchProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.searchProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

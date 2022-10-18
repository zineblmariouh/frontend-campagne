import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { ProjetActiviteRechercheDetailService } from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-pays-list-chercheur',
  templateUrl: './projet-activite-recherche-detail-pays-list-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-pays-list-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailPaysListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetailPays';
    payss :Array<PaysVo>;
    projetActiviteRechercheDetails :Array<ProjetActiviteRechercheDetailVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailPaysService: ProjetActiviteRechercheDetailPaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetailPayss();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadProjetActiviteRechercheDetail();
    }
    
    // methods
      public async loadProjetActiviteRechercheDetailPayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'list');
        isPermistted ? this.projetActiviteRechercheDetailPaysService.findAll().subscribe(projetActiviteRechercheDetailPayss => this.projetActiviteRechercheDetailPayss = projetActiviteRechercheDetailPayss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailPaysService.findByCriteria(this.searchProjetActiviteRechercheDetailPays).subscribe(projetActiviteRechercheDetailPayss=>{
            
            this.projetActiviteRechercheDetailPayss = projetActiviteRechercheDetailPayss;
           // this.searchProjetActiviteRechercheDetailPays = new ProjetActiviteRechercheDetailPaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'projetActiviteRechercheDetail?.id', header: 'Projet activite recherche detail'},
        ];
    }
    
    public async editProjetActiviteRechercheDetailPays(projetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailPaysService.findByIdWithAssociatedList(projetActiviteRechercheDetailPays).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailPays = res;
            this.editProjetActiviteRechercheDetailPaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetailPays(projetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailPaysService.findByIdWithAssociatedList(projetActiviteRechercheDetailPays).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailPays = res;
            this.viewProjetActiviteRechercheDetailPaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetailPays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetailPays = new ProjetActiviteRechercheDetailPaysVo();
            this.createProjetActiviteRechercheDetailPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetailPays(projetActiviteRechercheDetailPays:ProjetActiviteRechercheDetailPaysVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailPaysService.delete(projetActiviteRechercheDetailPays).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetailPayss.indexOf(projetActiviteRechercheDetailPays);
                          position > -1 ? this.projetActiviteRechercheDetailPayss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail pays Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadProjetActiviteRechercheDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailPays', 'list');
    isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetailPays(projetActiviteRechercheDetailPays: ProjetActiviteRechercheDetailPaysVo) {

     this.projetActiviteRechercheDetailPaysService.findByIdWithAssociatedList(projetActiviteRechercheDetailPays).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetailPays(res);
	       this.selectedProjetActiviteRechercheDetailPays = res;
	       this.selectedProjetActiviteRechercheDetailPays.id = null;
            this.createProjetActiviteRechercheDetailPaysDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetailPays(res: ProjetActiviteRechercheDetailPaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetailPayss.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Projet activite recherche detail': e.projetActiviteRechercheDetailVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchProjetActiviteRechercheDetailPays.paysVo?.libelle ? this.searchProjetActiviteRechercheDetailPays.paysVo?.libelle : environment.emptyForExport ,
        'Projet activite recherche detail': this.searchProjetActiviteRechercheDetailPays.projetActiviteRechercheDetailVo?.id ? this.searchProjetActiviteRechercheDetailPays.projetActiviteRechercheDetailVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetailPayss(): Array<ProjetActiviteRechercheDetailPaysVo> {
           return this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss;
       }
    set projetActiviteRechercheDetailPayss(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss = value;
       }

    get projetActiviteRechercheDetailPaysSelections(): Array<ProjetActiviteRechercheDetailPaysVo> {
           return this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPaysSelections;
       }
    set projetActiviteRechercheDetailPaysSelections(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPaysSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetailPays():ProjetActiviteRechercheDetailPaysVo {
           return this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays;
       }
    set selectedProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays = value;
       }
    
    get createProjetActiviteRechercheDetailPaysDialog():boolean {
           return this.projetActiviteRechercheDetailPaysService.createProjetActiviteRechercheDetailPaysDialog;
       }
    set createProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.createProjetActiviteRechercheDetailPaysDialog= value;
       }
    
    get editProjetActiviteRechercheDetailPaysDialog():boolean {
           return this.projetActiviteRechercheDetailPaysService.editProjetActiviteRechercheDetailPaysDialog;
       }
    set editProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.editProjetActiviteRechercheDetailPaysDialog= value;
       }
    get viewProjetActiviteRechercheDetailPaysDialog():boolean {
           return this.projetActiviteRechercheDetailPaysService.viewProjetActiviteRechercheDetailPaysDialog;
       }
    set viewProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.viewProjetActiviteRechercheDetailPaysDialog = value;
       }
       
     get searchProjetActiviteRechercheDetailPays(): ProjetActiviteRechercheDetailPaysVo {
        return this.projetActiviteRechercheDetailPaysService.searchProjetActiviteRechercheDetailPays;
       }
    set searchProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this.projetActiviteRechercheDetailPaysService.searchProjetActiviteRechercheDetailPays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ProjetActiviteRechercheDetailService } from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-instrument-ird-list-chercheur',
  templateUrl: './projet-activite-recherche-detail-instrument-ird-list-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-instrument-ird-list-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailInstrumentIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRechercheDetailInstrumentIrd';
    projetActiviteRechercheDetails :Array<ProjetActiviteRechercheDetailVo>;
    instrumentIrds :Array<InstrumentIrdVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstrumentIrdService: ProjetActiviteRechercheDetailInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
        , private instrumentIrdService: InstrumentIrdService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRechercheDetailInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadProjetActiviteRechercheDetail();
      this.loadInstrumentIrd();
    }
    
    // methods
      public async loadProjetActiviteRechercheDetailInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'list');
        isPermistted ? this.projetActiviteRechercheDetailInstrumentIrdService.findAll().subscribe(projetActiviteRechercheDetailInstrumentIrds => this.projetActiviteRechercheDetailInstrumentIrds = projetActiviteRechercheDetailInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.projetActiviteRechercheDetailInstrumentIrdService.findByCriteria(this.searchProjetActiviteRechercheDetailInstrumentIrd).subscribe(projetActiviteRechercheDetailInstrumentIrds=>{
            
            this.projetActiviteRechercheDetailInstrumentIrds = projetActiviteRechercheDetailInstrumentIrds;
           // this.searchProjetActiviteRechercheDetailInstrumentIrd = new ProjetActiviteRechercheDetailInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'projetActiviteRechercheDetail?.id', header: 'Projet activite recherche detail'},
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
        ];
    }
    
    public async editProjetActiviteRechercheDetailInstrumentIrd(projetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheDetailInstrumentIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstrumentIrd).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailInstrumentIrd = res;
            this.editProjetActiviteRechercheDetailInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRechercheDetailInstrumentIrd(projetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'view');
        if(isPermistted){
           this.projetActiviteRechercheDetailInstrumentIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstrumentIrd).subscribe(res => {
           this.selectedProjetActiviteRechercheDetailInstrumentIrd = res;
            this.viewProjetActiviteRechercheDetailInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRechercheDetailInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRechercheDetailInstrumentIrd = new ProjetActiviteRechercheDetailInstrumentIrdVo();
            this.createProjetActiviteRechercheDetailInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRechercheDetailInstrumentIrd(projetActiviteRechercheDetailInstrumentIrd:ProjetActiviteRechercheDetailInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche detail instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheDetailInstrumentIrdService.delete(projetActiviteRechercheDetailInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRechercheDetailInstrumentIrds.indexOf(projetActiviteRechercheDetailInstrumentIrd);
                          position > -1 ? this.projetActiviteRechercheDetailInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche detail instrument ird Supprimé',
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

public async loadProjetActiviteRechercheDetail(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'list');
    isPermistted ? this.projetActiviteRechercheDetailService.findAll().subscribe(projetActiviteRechercheDetails => this.projetActiviteRechercheDetails = projetActiviteRechercheDetails,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetailInstrumentIrd', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRechercheDetailInstrumentIrd(projetActiviteRechercheDetailInstrumentIrd: ProjetActiviteRechercheDetailInstrumentIrdVo) {

     this.projetActiviteRechercheDetailInstrumentIrdService.findByIdWithAssociatedList(projetActiviteRechercheDetailInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRechercheDetailInstrumentIrd(res);
	       this.selectedProjetActiviteRechercheDetailInstrumentIrd = res;
	       this.selectedProjetActiviteRechercheDetailInstrumentIrd.id = null;
            this.createProjetActiviteRechercheDetailInstrumentIrdDialog = true;

});

	}

	initDuplicateProjetActiviteRechercheDetailInstrumentIrd(res: ProjetActiviteRechercheDetailInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRechercheDetailInstrumentIrds.map(e => {
    return {
            'Projet activite recherche detail': e.projetActiviteRechercheDetailVo?.id ,
            'Instrument ird': e.instrumentIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Projet activite recherche detail': this.searchProjetActiviteRechercheDetailInstrumentIrd.projetActiviteRechercheDetailVo?.id ? this.searchProjetActiviteRechercheDetailInstrumentIrd.projetActiviteRechercheDetailVo?.id : environment.emptyForExport ,
        'Instrument ird': this.searchProjetActiviteRechercheDetailInstrumentIrd.instrumentIrdVo?.libelle ? this.searchProjetActiviteRechercheDetailInstrumentIrd.instrumentIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRechercheDetailInstrumentIrds(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
           return this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds;
       }
    set projetActiviteRechercheDetailInstrumentIrds(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds = value;
       }

    get projetActiviteRechercheDetailInstrumentIrdSelections(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
           return this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrdSelections;
       }
    set projetActiviteRechercheDetailInstrumentIrdSelections(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrdSelections = value;
       }
   
     


    get selectedProjetActiviteRechercheDetailInstrumentIrd():ProjetActiviteRechercheDetailInstrumentIrdVo {
           return this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd;
       }
    set selectedProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd = value;
       }
    
    get createProjetActiviteRechercheDetailInstrumentIrdDialog():boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.createProjetActiviteRechercheDetailInstrumentIrdDialog;
       }
    set createProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.createProjetActiviteRechercheDetailInstrumentIrdDialog= value;
       }
    
    get editProjetActiviteRechercheDetailInstrumentIrdDialog():boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.editProjetActiviteRechercheDetailInstrumentIrdDialog;
       }
    set editProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.editProjetActiviteRechercheDetailInstrumentIrdDialog= value;
       }
    get viewProjetActiviteRechercheDetailInstrumentIrdDialog():boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.viewProjetActiviteRechercheDetailInstrumentIrdDialog;
       }
    set viewProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.viewProjetActiviteRechercheDetailInstrumentIrdDialog = value;
       }
       
     get searchProjetActiviteRechercheDetailInstrumentIrd(): ProjetActiviteRechercheDetailInstrumentIrdVo {
        return this.projetActiviteRechercheDetailInstrumentIrdService.searchProjetActiviteRechercheDetailInstrumentIrd;
       }
    set searchProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.projetActiviteRechercheDetailInstrumentIrdService.searchProjetActiviteRechercheDetailInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

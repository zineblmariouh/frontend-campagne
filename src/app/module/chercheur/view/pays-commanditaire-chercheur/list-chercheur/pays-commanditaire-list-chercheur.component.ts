import {Component, OnInit} from '@angular/core';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-commanditaire-list-chercheur',
  templateUrl: './pays-commanditaire-list-chercheur.component.html',
  styleUrls: ['./pays-commanditaire-list-chercheur.component.css']
})
export class PaysCommanditaireListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysCommanditaire';
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private paysCommanditaireService: PaysCommanditaireService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadPaysCommanditaires();
      this.initExport();
      this.initCol();
      this.loadConsultanceScientifiquePonctuelle();
      this.loadPays();
    }
    
    // methods
      public async loadPaysCommanditaires(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'list');
        isPermistted ? this.paysCommanditaireService.findAll().subscribe(paysCommanditaires => this.paysCommanditaires = paysCommanditaires,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysCommanditaireService.findByCriteria(this.searchPaysCommanditaire).subscribe(paysCommanditaires=>{
            
            this.paysCommanditaires = paysCommanditaires;
           // this.searchPaysCommanditaire = new PaysCommanditaireVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editPaysCommanditaire(paysCommanditaire:PaysCommanditaireVo){
        const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'edit');
         if(isPermistted){
          this.paysCommanditaireService.findByIdWithAssociatedList(paysCommanditaire).subscribe(res => {
           this.selectedPaysCommanditaire = res;
            this.editPaysCommanditaireDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysCommanditaire(paysCommanditaire:PaysCommanditaireVo){
        const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'view');
        if(isPermistted){
           this.paysCommanditaireService.findByIdWithAssociatedList(paysCommanditaire).subscribe(res => {
           this.selectedPaysCommanditaire = res;
            this.viewPaysCommanditaireDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysCommanditaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysCommanditaire = new PaysCommanditaireVo();
            this.createPaysCommanditaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysCommanditaire(paysCommanditaire:PaysCommanditaireVo){
       const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays commanditaire) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysCommanditaireService.delete(paysCommanditaire).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysCommanditaires.indexOf(paysCommanditaire);
                          position > -1 ? this.paysCommanditaires.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays commanditaire Supprimé',
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

public async loadConsultanceScientifiquePonctuelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysCommanditaire', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysCommanditaire(paysCommanditaire: PaysCommanditaireVo) {

     this.paysCommanditaireService.findByIdWithAssociatedList(paysCommanditaire).subscribe(
	 res => {
	       this.initDuplicatePaysCommanditaire(res);
	       this.selectedPaysCommanditaire = res;
	       this.selectedPaysCommanditaire.id = null;
            this.createPaysCommanditaireDialog = true;

});

	}

	initDuplicatePaysCommanditaire(res: PaysCommanditaireVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysCommanditaires.map(e => {
    return {
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Consultance scientifique ponctuelle': this.searchPaysCommanditaire.consultanceScientifiquePonctuelleVo?.id ? this.searchPaysCommanditaire.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
        'Pays': this.searchPaysCommanditaire.paysVo?.libelle ? this.searchPaysCommanditaire.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysCommanditaires(): Array<PaysCommanditaireVo> {
           return this.paysCommanditaireService.paysCommanditaires;
       }
    set paysCommanditaires(value: Array<PaysCommanditaireVo>) {
        this.paysCommanditaireService.paysCommanditaires = value;
       }

    get paysCommanditaireSelections(): Array<PaysCommanditaireVo> {
           return this.paysCommanditaireService.paysCommanditaireSelections;
       }
    set paysCommanditaireSelections(value: Array<PaysCommanditaireVo>) {
        this.paysCommanditaireService.paysCommanditaireSelections = value;
       }
   
     


    get selectedPaysCommanditaire():PaysCommanditaireVo {
           return this.paysCommanditaireService.selectedPaysCommanditaire;
       }
    set selectedPaysCommanditaire(value: PaysCommanditaireVo) {
        this.paysCommanditaireService.selectedPaysCommanditaire = value;
       }
    
    get createPaysCommanditaireDialog():boolean {
           return this.paysCommanditaireService.createPaysCommanditaireDialog;
       }
    set createPaysCommanditaireDialog(value: boolean) {
        this.paysCommanditaireService.createPaysCommanditaireDialog= value;
       }
    
    get editPaysCommanditaireDialog():boolean {
           return this.paysCommanditaireService.editPaysCommanditaireDialog;
       }
    set editPaysCommanditaireDialog(value: boolean) {
        this.paysCommanditaireService.editPaysCommanditaireDialog= value;
       }
    get viewPaysCommanditaireDialog():boolean {
           return this.paysCommanditaireService.viewPaysCommanditaireDialog;
       }
    set viewPaysCommanditaireDialog(value: boolean) {
        this.paysCommanditaireService.viewPaysCommanditaireDialog = value;
       }
       
     get searchPaysCommanditaire(): PaysCommanditaireVo {
        return this.paysCommanditaireService.searchPaysCommanditaire;
       }
    set searchPaysCommanditaire(value: PaysCommanditaireVo) {
        this.paysCommanditaireService.searchPaysCommanditaire = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

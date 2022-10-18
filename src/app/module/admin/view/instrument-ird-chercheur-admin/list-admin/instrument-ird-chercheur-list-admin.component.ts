import {Component, OnInit} from '@angular/core';
import {InstrumentIrdChercheurService} from '../../../../../controller/service/InstrumentIrdChercheur.service';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-instrument-ird-chercheur-list-admin',
  templateUrl: './instrument-ird-chercheur-list-admin.component.html',
  styleUrls: ['./instrument-ird-chercheur-list-admin.component.css']
})
export class InstrumentIrdChercheurListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InstrumentIrdChercheur';
    instrumentIrds :Array<InstrumentIrdVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private instrumentIrdChercheurService: InstrumentIrdChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private instrumentIrdService: InstrumentIrdService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadInstrumentIrdChercheurs();
      this.initExport();
      this.initCol();
      this.loadInstrumentIrd();
      this.loadChercheur();
    }
    
    // methods
      public async loadInstrumentIrdChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'list');
        isPermistted ? this.instrumentIrdChercheurService.findAll().subscribe(instrumentIrdChercheurs => this.instrumentIrdChercheurs = instrumentIrdChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.instrumentIrdChercheurService.findByCriteria(this.searchInstrumentIrdChercheur).subscribe(instrumentIrdChercheurs=>{
            
            this.instrumentIrdChercheurs = instrumentIrdChercheurs;
           // this.searchInstrumentIrdChercheur = new InstrumentIrdChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                            {field: 'natureImplication', header: 'Nature implication'},
        ];
    }
    
    public async editInstrumentIrdChercheur(instrumentIrdChercheur:InstrumentIrdChercheurVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'edit');
         if(isPermistted){
          this.instrumentIrdChercheurService.findByIdWithAssociatedList(instrumentIrdChercheur).subscribe(res => {
           this.selectedInstrumentIrdChercheur = res;
            this.editInstrumentIrdChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstrumentIrdChercheur(instrumentIrdChercheur:InstrumentIrdChercheurVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'view');
        if(isPermistted){
           this.instrumentIrdChercheurService.findByIdWithAssociatedList(instrumentIrdChercheur).subscribe(res => {
           this.selectedInstrumentIrdChercheur = res;
            this.viewInstrumentIrdChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstrumentIrdChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstrumentIrdChercheur = new InstrumentIrdChercheurVo();
            this.createInstrumentIrdChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstrumentIrdChercheur(instrumentIrdChercheur:InstrumentIrdChercheurVo){
       const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Instrument ird chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.instrumentIrdChercheurService.delete(instrumentIrdChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.instrumentIrdChercheurs.indexOf(instrumentIrdChercheur);
                          position > -1 ? this.instrumentIrdChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Instrument ird chercheur Supprimé',
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

public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentIrdChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInstrumentIrdChercheur(instrumentIrdChercheur: InstrumentIrdChercheurVo) {

     this.instrumentIrdChercheurService.findByIdWithAssociatedList(instrumentIrdChercheur).subscribe(
	 res => {
	       this.initDuplicateInstrumentIrdChercheur(res);
	       this.selectedInstrumentIrdChercheur = res;
	       this.selectedInstrumentIrdChercheur.id = null;
            this.createInstrumentIrdChercheurDialog = true;

});

	}

	initDuplicateInstrumentIrdChercheur(res: InstrumentIrdChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.instrumentIrdChercheurs.map(e => {
    return {
            'Instrument ird': e.instrumentIrdVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
                    'Nature implication': e.natureImplication ,
     }
      });

      this.criteriaData = [{
        'Instrument ird': this.searchInstrumentIrdChercheur.instrumentIrdVo?.libelle ? this.searchInstrumentIrdChercheur.instrumentIrdVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchInstrumentIrdChercheur.chercheurVo?.numeroMatricule ? this.searchInstrumentIrdChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
            'Nature implication': this.searchInstrumentIrdChercheur.natureImplication ? this.searchInstrumentIrdChercheur.natureImplication : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get instrumentIrdChercheurs(): Array<InstrumentIrdChercheurVo> {
           return this.instrumentIrdChercheurService.instrumentIrdChercheurs;
       }
    set instrumentIrdChercheurs(value: Array<InstrumentIrdChercheurVo>) {
        this.instrumentIrdChercheurService.instrumentIrdChercheurs = value;
       }

    get instrumentIrdChercheurSelections(): Array<InstrumentIrdChercheurVo> {
           return this.instrumentIrdChercheurService.instrumentIrdChercheurSelections;
       }
    set instrumentIrdChercheurSelections(value: Array<InstrumentIrdChercheurVo>) {
        this.instrumentIrdChercheurService.instrumentIrdChercheurSelections = value;
       }
   
     


    get selectedInstrumentIrdChercheur():InstrumentIrdChercheurVo {
           return this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur;
       }
    set selectedInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur = value;
       }
    
    get createInstrumentIrdChercheurDialog():boolean {
           return this.instrumentIrdChercheurService.createInstrumentIrdChercheurDialog;
       }
    set createInstrumentIrdChercheurDialog(value: boolean) {
        this.instrumentIrdChercheurService.createInstrumentIrdChercheurDialog= value;
       }
    
    get editInstrumentIrdChercheurDialog():boolean {
           return this.instrumentIrdChercheurService.editInstrumentIrdChercheurDialog;
       }
    set editInstrumentIrdChercheurDialog(value: boolean) {
        this.instrumentIrdChercheurService.editInstrumentIrdChercheurDialog= value;
       }
    get viewInstrumentIrdChercheurDialog():boolean {
           return this.instrumentIrdChercheurService.viewInstrumentIrdChercheurDialog;
       }
    set viewInstrumentIrdChercheurDialog(value: boolean) {
        this.instrumentIrdChercheurService.viewInstrumentIrdChercheurDialog = value;
       }
       
     get searchInstrumentIrdChercheur(): InstrumentIrdChercheurVo {
        return this.instrumentIrdChercheurService.searchInstrumentIrdChercheur;
       }
    set searchInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this.instrumentIrdChercheurService.searchInstrumentIrdChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

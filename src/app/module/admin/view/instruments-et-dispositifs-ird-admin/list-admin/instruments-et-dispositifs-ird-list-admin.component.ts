import {Component, OnInit} from '@angular/core';
import {InstrumentsEtDispositifsIrdService} from '../../../../../controller/service/InstrumentsEtDispositifsIrd.service';
import {InstrumentsEtDispositifsIrdVo} from '../../../../../controller/model/InstrumentsEtDispositifsIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-instruments-et-dispositifs-ird-list-admin',
  templateUrl: './instruments-et-dispositifs-ird-list-admin.component.html',
  styleUrls: ['./instruments-et-dispositifs-ird-list-admin.component.css']
})
export class InstrumentsEtDispositifsIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InstrumentsEtDispositifsIrd';
     yesOrNoNumerique :any[] =[];
    campagnes :Array<CampagneVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private instrumentsEtDispositifsIrdService: InstrumentsEtDispositifsIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadInstrumentsEtDispositifsIrds();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadChercheur();
    this.yesOrNoNumerique =  [{label: 'Numerique', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadInstrumentsEtDispositifsIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'list');
        isPermistted ? this.instrumentsEtDispositifsIrdService.findAll().subscribe(instrumentsEtDispositifsIrds => this.instrumentsEtDispositifsIrds = instrumentsEtDispositifsIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.instrumentsEtDispositifsIrdService.findByCriteria(this.searchInstrumentsEtDispositifsIrd).subscribe(instrumentsEtDispositifsIrds=>{
            
            this.instrumentsEtDispositifsIrds = instrumentsEtDispositifsIrds;
           // this.searchInstrumentsEtDispositifsIrd = new InstrumentsEtDispositifsIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                            {field: 'numerique', header: 'Numerique'},
        ];
    }
    
    public async editInstrumentsEtDispositifsIrd(instrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'edit');
         if(isPermistted){
          this.instrumentsEtDispositifsIrdService.findByIdWithAssociatedList(instrumentsEtDispositifsIrd).subscribe(res => {
           this.selectedInstrumentsEtDispositifsIrd = res;
            this.editInstrumentsEtDispositifsIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInstrumentsEtDispositifsIrd(instrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo){
        const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'view');
        if(isPermistted){
           this.instrumentsEtDispositifsIrdService.findByIdWithAssociatedList(instrumentsEtDispositifsIrd).subscribe(res => {
           this.selectedInstrumentsEtDispositifsIrd = res;
            this.viewInstrumentsEtDispositifsIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInstrumentsEtDispositifsIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInstrumentsEtDispositifsIrd = new InstrumentsEtDispositifsIrdVo();
            this.createInstrumentsEtDispositifsIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInstrumentsEtDispositifsIrd(instrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo){
       const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Instruments et dispositifs ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.instrumentsEtDispositifsIrdService.delete(instrumentsEtDispositifsIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.instrumentsEtDispositifsIrds.indexOf(instrumentsEtDispositifsIrd);
                          position > -1 ? this.instrumentsEtDispositifsIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Instruments et dispositifs ird Supprimé',
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

public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InstrumentsEtDispositifsIrd', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInstrumentsEtDispositifsIrd(instrumentsEtDispositifsIrd: InstrumentsEtDispositifsIrdVo) {

     this.instrumentsEtDispositifsIrdService.findByIdWithAssociatedList(instrumentsEtDispositifsIrd).subscribe(
	 res => {
	       this.initDuplicateInstrumentsEtDispositifsIrd(res);
	       this.selectedInstrumentsEtDispositifsIrd = res;
	       this.selectedInstrumentsEtDispositifsIrd.id = null;
            this.createInstrumentsEtDispositifsIrdDialog = true;

});

	}

	initDuplicateInstrumentsEtDispositifsIrd(res: InstrumentsEtDispositifsIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.instrumentsEtDispositifsIrds.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
            'Campagne': e.campagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
                    'Numerique': e.numerique? 'Vrai' : 'Faux' ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchInstrumentsEtDispositifsIrd.libelle ? this.searchInstrumentsEtDispositifsIrd.libelle : environment.emptyForExport ,
            'Code': this.searchInstrumentsEtDispositifsIrd.code ? this.searchInstrumentsEtDispositifsIrd.code : environment.emptyForExport ,
            'Description': this.searchInstrumentsEtDispositifsIrd.description ? this.searchInstrumentsEtDispositifsIrd.description : environment.emptyForExport ,
        'Campagne': this.searchInstrumentsEtDispositifsIrd.campagneVo?.libelle ? this.searchInstrumentsEtDispositifsIrd.campagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchInstrumentsEtDispositifsIrd.chercheurVo?.numeroMatricule ? this.searchInstrumentsEtDispositifsIrd.chercheurVo?.numeroMatricule : environment.emptyForExport ,
            'Numerique': this.searchInstrumentsEtDispositifsIrd.numerique ? (this.searchInstrumentsEtDispositifsIrd.numerique ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get instrumentsEtDispositifsIrds(): Array<InstrumentsEtDispositifsIrdVo> {
           return this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds;
       }
    set instrumentsEtDispositifsIrds(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrds = value;
       }

    get instrumentsEtDispositifsIrdSelections(): Array<InstrumentsEtDispositifsIrdVo> {
           return this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrdSelections;
       }
    set instrumentsEtDispositifsIrdSelections(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this.instrumentsEtDispositifsIrdService.instrumentsEtDispositifsIrdSelections = value;
       }
   
     


    get selectedInstrumentsEtDispositifsIrd():InstrumentsEtDispositifsIrdVo {
           return this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd;
       }
    set selectedInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this.instrumentsEtDispositifsIrdService.selectedInstrumentsEtDispositifsIrd = value;
       }
    
    get createInstrumentsEtDispositifsIrdDialog():boolean {
           return this.instrumentsEtDispositifsIrdService.createInstrumentsEtDispositifsIrdDialog;
       }
    set createInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.instrumentsEtDispositifsIrdService.createInstrumentsEtDispositifsIrdDialog= value;
       }
    
    get editInstrumentsEtDispositifsIrdDialog():boolean {
           return this.instrumentsEtDispositifsIrdService.editInstrumentsEtDispositifsIrdDialog;
       }
    set editInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.instrumentsEtDispositifsIrdService.editInstrumentsEtDispositifsIrdDialog= value;
       }
    get viewInstrumentsEtDispositifsIrdDialog():boolean {
           return this.instrumentsEtDispositifsIrdService.viewInstrumentsEtDispositifsIrdDialog;
       }
    set viewInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this.instrumentsEtDispositifsIrdService.viewInstrumentsEtDispositifsIrdDialog = value;
       }
       
     get searchInstrumentsEtDispositifsIrd(): InstrumentsEtDispositifsIrdVo {
        return this.instrumentsEtDispositifsIrdService.searchInstrumentsEtDispositifsIrd;
       }
    set searchInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this.instrumentsEtDispositifsIrdService.searchInstrumentsEtDispositifsIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { StatusContratEtConventionService } from '../../../../../controller/service/StatusContratEtConvention.service';
import { SavoirEtInnovationService } from '../../../../../controller/service/SavoirEtInnovation.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-contrat-et-convention-ird-list-chercheur',
  templateUrl: './contrat-et-convention-ird-list-chercheur.component.html',
  styleUrls: ['./contrat-et-convention-ird-list-chercheur.component.css']
})
export class ContratEtConventionIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ContratEtConventionIrd';
    statusContratEtConventions :Array<StatusContratEtConventionVo>;
    savoirEtInnovations :Array<SavoirEtInnovationVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private contratEtConventionIrdService: ContratEtConventionIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private statusContratEtConventionService: StatusContratEtConventionService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadContratEtConventionIrds();
      this.initExport();
      this.initCol();
      this.loadStatusContratEtConvention();
      this.loadSavoirEtInnovation();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadContratEtConventionIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'list');
        isPermistted ? this.contratEtConventionIrdService.findAll().subscribe(contratEtConventionIrds => this.contratEtConventionIrds = contratEtConventionIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.contratEtConventionIrdService.findByCriteria(this.searchContratEtConventionIrd).subscribe(contratEtConventionIrds=>{
            
            this.contratEtConventionIrds = contratEtConventionIrds;
           // this.searchContratEtConventionIrd = new ContratEtConventionIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'numero', header: 'Numero'},
                        {field: 'statusContratEtConvention?.libelle', header: 'Status contrat et convention'},
                            {field: 'dateContrat', header: 'Date contrat'},
                            {field: 'intitule', header: 'Intitule'},
                        {field: 'savoirEtInnovation?.id', header: 'Savoir et innovation'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editContratEtConventionIrd(contratEtConventionIrd:ContratEtConventionIrdVo){
        const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'edit');
         if(isPermistted){
          this.contratEtConventionIrdService.findByIdWithAssociatedList(contratEtConventionIrd).subscribe(res => {
           this.selectedContratEtConventionIrd = res;
            this.selectedContratEtConventionIrd.dateContrat = new Date(contratEtConventionIrd.dateContrat);
            this.editContratEtConventionIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewContratEtConventionIrd(contratEtConventionIrd:ContratEtConventionIrdVo){
        const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'view');
        if(isPermistted){
           this.contratEtConventionIrdService.findByIdWithAssociatedList(contratEtConventionIrd).subscribe(res => {
           this.selectedContratEtConventionIrd = res;
            this.selectedContratEtConventionIrd.dateContrat = new Date(contratEtConventionIrd.dateContrat);
            this.viewContratEtConventionIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateContratEtConventionIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedContratEtConventionIrd = new ContratEtConventionIrdVo();
            this.createContratEtConventionIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteContratEtConventionIrd(contratEtConventionIrd:ContratEtConventionIrdVo){
       const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Contrat et convention ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.contratEtConventionIrdService.delete(contratEtConventionIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.contratEtConventionIrds.indexOf(contratEtConventionIrd);
                          position > -1 ? this.contratEtConventionIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Contrat et convention ird Supprimé',
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

public async loadStatusContratEtConvention(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'list');
    isPermistted ? this.statusContratEtConventionService.findAll().subscribe(statusContratEtConventions => this.statusContratEtConventions = statusContratEtConventions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSavoirEtInnovation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'list');
    isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ContratEtConventionIrd', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateContratEtConventionIrd(contratEtConventionIrd: ContratEtConventionIrdVo) {

     this.contratEtConventionIrdService.findByIdWithAssociatedList(contratEtConventionIrd).subscribe(
	 res => {
	       this.initDuplicateContratEtConventionIrd(res);
	       this.selectedContratEtConventionIrd = res;
	       this.selectedContratEtConventionIrd.id = null;
            this.createContratEtConventionIrdDialog = true;

});

	}

	initDuplicateContratEtConventionIrd(res: ContratEtConventionIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.contratEtConventionIrds.map(e => {
    return {
                    'Numero': e.numero ,
            'Status contrat et convention': e.statusContratEtConventionVo?.libelle ,
                    'Date contrat': this.datePipe.transform(e.dateContrat , 'dd-MM-yyyy'),
                    'Intitule': e.intitule ,
                    'Description': e.description ,
            'Savoir et innovation': e.savoirEtInnovationVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Numero': this.searchContratEtConventionIrd.numero ? this.searchContratEtConventionIrd.numero : environment.emptyForExport ,
        'Status contrat et convention': this.searchContratEtConventionIrd.statusContratEtConventionVo?.libelle ? this.searchContratEtConventionIrd.statusContratEtConventionVo?.libelle : environment.emptyForExport ,
            'Date contrat Min': this.searchContratEtConventionIrd.dateContratMin ? this.datePipe.transform(this.searchContratEtConventionIrd.dateContratMin , this.dateFormat) : environment.emptyForExport ,
            'Date contrat Max': this.searchContratEtConventionIrd.dateContratMax ? this.datePipe.transform(this.searchContratEtConventionIrd.dateContratMax , this.dateFormat) : environment.emptyForExport ,
            'Intitule': this.searchContratEtConventionIrd.intitule ? this.searchContratEtConventionIrd.intitule : environment.emptyForExport ,
            'Description': this.searchContratEtConventionIrd.description ? this.searchContratEtConventionIrd.description : environment.emptyForExport ,
        'Savoir et innovation': this.searchContratEtConventionIrd.savoirEtInnovationVo?.id ? this.searchContratEtConventionIrd.savoirEtInnovationVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchContratEtConventionIrd.etatEtapeCampagneVo?.libelle ? this.searchContratEtConventionIrd.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get contratEtConventionIrds(): Array<ContratEtConventionIrdVo> {
           return this.contratEtConventionIrdService.contratEtConventionIrds;
       }
    set contratEtConventionIrds(value: Array<ContratEtConventionIrdVo>) {
        this.contratEtConventionIrdService.contratEtConventionIrds = value;
       }

    get contratEtConventionIrdSelections(): Array<ContratEtConventionIrdVo> {
           return this.contratEtConventionIrdService.contratEtConventionIrdSelections;
       }
    set contratEtConventionIrdSelections(value: Array<ContratEtConventionIrdVo>) {
        this.contratEtConventionIrdService.contratEtConventionIrdSelections = value;
       }
   
     


    get selectedContratEtConventionIrd():ContratEtConventionIrdVo {
           return this.contratEtConventionIrdService.selectedContratEtConventionIrd;
       }
    set selectedContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this.contratEtConventionIrdService.selectedContratEtConventionIrd = value;
       }
    
    get createContratEtConventionIrdDialog():boolean {
           return this.contratEtConventionIrdService.createContratEtConventionIrdDialog;
       }
    set createContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.createContratEtConventionIrdDialog= value;
       }
    
    get editContratEtConventionIrdDialog():boolean {
           return this.contratEtConventionIrdService.editContratEtConventionIrdDialog;
       }
    set editContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.editContratEtConventionIrdDialog= value;
       }
    get viewContratEtConventionIrdDialog():boolean {
           return this.contratEtConventionIrdService.viewContratEtConventionIrdDialog;
       }
    set viewContratEtConventionIrdDialog(value: boolean) {
        this.contratEtConventionIrdService.viewContratEtConventionIrdDialog = value;
       }
       
     get searchContratEtConventionIrd(): ContratEtConventionIrdVo {
        return this.contratEtConventionIrdService.searchContratEtConventionIrd;
       }
    set searchContratEtConventionIrd(value: ContratEtConventionIrdVo) {
        this.contratEtConventionIrdService.searchContratEtConventionIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

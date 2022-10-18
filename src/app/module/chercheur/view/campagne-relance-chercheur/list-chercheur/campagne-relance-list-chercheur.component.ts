import {Component, OnInit} from '@angular/core';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { TemplateRelanceService } from '../../../../../controller/service/TemplateRelance.service';

import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-relance-list-chercheur',
  templateUrl: './campagne-relance-list-chercheur.component.html',
  styleUrls: ['./campagne-relance-list-chercheur.component.css']
})
export class CampagneRelanceListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneRelance';
    campagnes :Array<CampagneVo>;
    templateRelances :Array<TemplateRelanceVo>;


    constructor(private datePipe: DatePipe, private campagneRelanceService: CampagneRelanceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private templateRelanceService: TemplateRelanceService
) { }

    ngOnInit(): void {
      this.loadCampagneRelances();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadTemplateRelance();
    }
    
    // methods
      public async loadCampagneRelances(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'list');
        isPermistted ? this.campagneRelanceService.findAll().subscribe(campagneRelances => this.campagneRelances = campagneRelances,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneRelanceService.findByCriteria(this.searchCampagneRelance).subscribe(campagneRelances=>{
            
            this.campagneRelances = campagneRelances;
           // this.searchCampagneRelance = new CampagneRelanceVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'campagne?.libelle', header: 'Campagne'},
                            {field: 'dateRelance', header: 'Date relance'},
                        {field: 'templateRelance?.code', header: 'Template relance'},
                            {field: 'objetRelance', header: 'Objet relance'},
        ];
    }
    
    public async editCampagneRelance(campagneRelance:CampagneRelanceVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'edit');
         if(isPermistted){
          this.campagneRelanceService.findByIdWithAssociatedList(campagneRelance).subscribe(res => {
           this.selectedCampagneRelance = res;
            this.selectedCampagneRelance.dateRelance = new Date(campagneRelance.dateRelance);
            this.editCampagneRelanceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneRelance(campagneRelance:CampagneRelanceVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'view');
        if(isPermistted){
           this.campagneRelanceService.findByIdWithAssociatedList(campagneRelance).subscribe(res => {
           this.selectedCampagneRelance = res;
            this.selectedCampagneRelance.dateRelance = new Date(campagneRelance.dateRelance);
            this.viewCampagneRelanceDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneRelance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneRelance = new CampagneRelanceVo();
            this.createCampagneRelanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneRelance(campagneRelance:CampagneRelanceVo){
       const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne relance) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneRelanceService.delete(campagneRelance).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneRelances.indexOf(campagneRelance);
                          position > -1 ? this.campagneRelances.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne relance Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTemplateRelance(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'list');
    isPermistted ? this.templateRelanceService.findAll().subscribe(templateRelances => this.templateRelances = templateRelances,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneRelance(campagneRelance: CampagneRelanceVo) {

     this.campagneRelanceService.findByIdWithAssociatedList(campagneRelance).subscribe(
	 res => {
	       this.initDuplicateCampagneRelance(res);
	       this.selectedCampagneRelance = res;
	       this.selectedCampagneRelance.id = null;
            this.createCampagneRelanceDialog = true;

});

	}

	initDuplicateCampagneRelance(res: CampagneRelanceVo) {
        if (res.campagneRelanceChercheursVo != null) {
             res.campagneRelanceChercheursVo.forEach(d => { d.campagneRelanceVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.campagneRelances.map(e => {
    return {
            'Campagne': e.campagneVo?.libelle ,
                    'Date relance': this.datePipe.transform(e.dateRelance , 'dd-MM-yyyy'),
            'Template relance': e.templateRelanceVo?.code ,
                    'Objet relance': e.objetRelance ,
                    'Message relance': e.messageRelance ,
     }
      });

      this.criteriaData = [{
        'Campagne': this.searchCampagneRelance.campagneVo?.libelle ? this.searchCampagneRelance.campagneVo?.libelle : environment.emptyForExport ,
            'Date relance Min': this.searchCampagneRelance.dateRelanceMin ? this.datePipe.transform(this.searchCampagneRelance.dateRelanceMin , this.dateFormat) : environment.emptyForExport ,
            'Date relance Max': this.searchCampagneRelance.dateRelanceMax ? this.datePipe.transform(this.searchCampagneRelance.dateRelanceMax , this.dateFormat) : environment.emptyForExport ,
        'Template relance': this.searchCampagneRelance.templateRelanceVo?.code ? this.searchCampagneRelance.templateRelanceVo?.code : environment.emptyForExport ,
            'Objet relance': this.searchCampagneRelance.objetRelance ? this.searchCampagneRelance.objetRelance : environment.emptyForExport ,
            'Message relance': this.searchCampagneRelance.messageRelance ? this.searchCampagneRelance.messageRelance : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneRelances(): Array<CampagneRelanceVo> {
           return this.campagneRelanceService.campagneRelances;
       }
    set campagneRelances(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelances = value;
       }

    get campagneRelanceSelections(): Array<CampagneRelanceVo> {
           return this.campagneRelanceService.campagneRelanceSelections;
       }
    set campagneRelanceSelections(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelanceSelections = value;
       }
   
     


    get selectedCampagneRelance():CampagneRelanceVo {
           return this.campagneRelanceService.selectedCampagneRelance;
       }
    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
       }
    
    get createCampagneRelanceDialog():boolean {
           return this.campagneRelanceService.createCampagneRelanceDialog;
       }
    set createCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.createCampagneRelanceDialog= value;
       }
    
    get editCampagneRelanceDialog():boolean {
           return this.campagneRelanceService.editCampagneRelanceDialog;
       }
    set editCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.editCampagneRelanceDialog= value;
       }
    get viewCampagneRelanceDialog():boolean {
           return this.campagneRelanceService.viewCampagneRelanceDialog;
       }
    set viewCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.viewCampagneRelanceDialog = value;
       }
       
     get searchCampagneRelance(): CampagneRelanceVo {
        return this.campagneRelanceService.searchCampagneRelance;
       }
    set searchCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.searchCampagneRelance = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { TemplateRappelService } from '../../../../../controller/service/TemplateRappel.service';

import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-rappel-list-chercheur',
  templateUrl: './campagne-rappel-list-chercheur.component.html',
  styleUrls: ['./campagne-rappel-list-chercheur.component.css']
})
export class CampagneRappelListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneRappel';
    campagnes :Array<CampagneVo>;
    templateRappels :Array<TemplateRappelVo>;


    constructor(private datePipe: DatePipe, private campagneRappelService: CampagneRappelService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private templateRappelService: TemplateRappelService
) { }

    ngOnInit(): void {
      this.loadCampagneRappels();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadTemplateRappel();
    }
    
    // methods
      public async loadCampagneRappels(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'list');
        isPermistted ? this.campagneRappelService.findAll().subscribe(campagneRappels => this.campagneRappels = campagneRappels,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneRappelService.findByCriteria(this.searchCampagneRappel).subscribe(campagneRappels=>{
            
            this.campagneRappels = campagneRappels;
           // this.searchCampagneRappel = new CampagneRappelVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'campagne?.libelle', header: 'Campagne'},
                            {field: 'dateRappel', header: 'Date rappel'},
                        {field: 'templateRappel?.code', header: 'Template rappel'},
                            {field: 'objetRappel', header: 'Objet rappel'},
        ];
    }
    
    public async editCampagneRappel(campagneRappel:CampagneRappelVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'edit');
         if(isPermistted){
          this.campagneRappelService.findByIdWithAssociatedList(campagneRappel).subscribe(res => {
           this.selectedCampagneRappel = res;
            this.selectedCampagneRappel.dateRappel = new Date(campagneRappel.dateRappel);
            this.editCampagneRappelDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneRappel(campagneRappel:CampagneRappelVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'view');
        if(isPermistted){
           this.campagneRappelService.findByIdWithAssociatedList(campagneRappel).subscribe(res => {
           this.selectedCampagneRappel = res;
            this.selectedCampagneRappel.dateRappel = new Date(campagneRappel.dateRappel);
            this.viewCampagneRappelDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneRappel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneRappel = new CampagneRappelVo();
            this.createCampagneRappelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneRappel(campagneRappel:CampagneRappelVo){
       const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne rappel) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneRappelService.delete(campagneRappel).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneRappels.indexOf(campagneRappel);
                          position > -1 ? this.campagneRappels.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne rappel Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTemplateRappel(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'list');
    isPermistted ? this.templateRappelService.findAll().subscribe(templateRappels => this.templateRappels = templateRappels,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneRappel(campagneRappel: CampagneRappelVo) {

     this.campagneRappelService.findByIdWithAssociatedList(campagneRappel).subscribe(
	 res => {
	       this.initDuplicateCampagneRappel(res);
	       this.selectedCampagneRappel = res;
	       this.selectedCampagneRappel.id = null;
            this.createCampagneRappelDialog = true;

});

	}

	initDuplicateCampagneRappel(res: CampagneRappelVo) {
        if (res.campagneRappelChercheursVo != null) {
             res.campagneRappelChercheursVo.forEach(d => { d.campagneRappelVo = null; d.id = null; });
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
    this.exportData = this.campagneRappels.map(e => {
    return {
            'Campagne': e.campagneVo?.libelle ,
                    'Date rappel': this.datePipe.transform(e.dateRappel , 'dd-MM-yyyy'),
            'Template rappel': e.templateRappelVo?.code ,
                    'Objet rappel': e.objetRappel ,
                    'Message rappel': e.messageRappel ,
     }
      });

      this.criteriaData = [{
        'Campagne': this.searchCampagneRappel.campagneVo?.libelle ? this.searchCampagneRappel.campagneVo?.libelle : environment.emptyForExport ,
            'Date rappel Min': this.searchCampagneRappel.dateRappelMin ? this.datePipe.transform(this.searchCampagneRappel.dateRappelMin , this.dateFormat) : environment.emptyForExport ,
            'Date rappel Max': this.searchCampagneRappel.dateRappelMax ? this.datePipe.transform(this.searchCampagneRappel.dateRappelMax , this.dateFormat) : environment.emptyForExport ,
        'Template rappel': this.searchCampagneRappel.templateRappelVo?.code ? this.searchCampagneRappel.templateRappelVo?.code : environment.emptyForExport ,
            'Objet rappel': this.searchCampagneRappel.objetRappel ? this.searchCampagneRappel.objetRappel : environment.emptyForExport ,
            'Message rappel': this.searchCampagneRappel.messageRappel ? this.searchCampagneRappel.messageRappel : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneRappels(): Array<CampagneRappelVo> {
           return this.campagneRappelService.campagneRappels;
       }
    set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }

    get campagneRappelSelections(): Array<CampagneRappelVo> {
           return this.campagneRappelService.campagneRappelSelections;
       }
    set campagneRappelSelections(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappelSelections = value;
       }
   
     


    get selectedCampagneRappel():CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }
    
    get createCampagneRappelDialog():boolean {
           return this.campagneRappelService.createCampagneRappelDialog;
       }
    set createCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.createCampagneRappelDialog= value;
       }
    
    get editCampagneRappelDialog():boolean {
           return this.campagneRappelService.editCampagneRappelDialog;
       }
    set editCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.editCampagneRappelDialog= value;
       }
    get viewCampagneRappelDialog():boolean {
           return this.campagneRappelService.viewCampagneRappelDialog;
       }
    set viewCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.viewCampagneRappelDialog = value;
       }
       
     get searchCampagneRappel(): CampagneRappelVo {
        return this.campagneRappelService.searchCampagneRappel;
       }
    set searchCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.searchCampagneRappel = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

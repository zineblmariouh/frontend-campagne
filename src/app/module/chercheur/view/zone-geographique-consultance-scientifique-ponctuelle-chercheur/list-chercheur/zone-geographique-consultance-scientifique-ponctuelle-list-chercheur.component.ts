import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import { ZoneGeographiqueService } from '../../../../../controller/service/ZoneGeographique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-zone-geographique-consultance-scientifique-ponctuelle-list-chercheur',
  templateUrl: './zone-geographique-consultance-scientifique-ponctuelle-list-chercheur.component.html',
  styleUrls: ['./zone-geographique-consultance-scientifique-ponctuelle-list-chercheur.component.css']
})
export class ZoneGeographiqueConsultanceScientifiquePonctuelleListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneGeographiqueConsultanceScientifiquePonctuelle';
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private zoneGeographiqueConsultanceScientifiquePonctuelleService: ZoneGeographiqueConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadZoneGeographiqueConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadConsultanceScientifiquePonctuelle();
      this.loadZoneGeographique();
      this.loadPays();
    }
    
    // methods
      public async loadZoneGeographiqueConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.zoneGeographiqueConsultanceScientifiquePonctuelleService.findAll().subscribe(zoneGeographiqueConsultanceScientifiquePonctuelles => this.zoneGeographiqueConsultanceScientifiquePonctuelles = zoneGeographiqueConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.findByCriteria(this.searchZoneGeographiqueConsultanceScientifiquePonctuelle).subscribe(zoneGeographiqueConsultanceScientifiquePonctuelles=>{
            
            this.zoneGeographiqueConsultanceScientifiquePonctuelles = zoneGeographiqueConsultanceScientifiquePonctuelles;
           // this.searchZoneGeographiqueConsultanceScientifiquePonctuelle = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editZoneGeographiqueConsultanceScientifiquePonctuelle(zoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.zoneGeographiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(zoneGeographiqueConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = res;
            this.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewZoneGeographiqueConsultanceScientifiquePonctuelle(zoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.zoneGeographiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(zoneGeographiqueConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = res;
            this.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateZoneGeographiqueConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
            this.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteZoneGeographiqueConsultanceScientifiquePonctuelle(zoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Zone geographique consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.zoneGeographiqueConsultanceScientifiquePonctuelleService.delete(zoneGeographiqueConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.zoneGeographiqueConsultanceScientifiquePonctuelles.indexOf(zoneGeographiqueConsultanceScientifiquePonctuelle);
                          position > -1 ? this.zoneGeographiqueConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Zone geographique consultance scientifique ponctuelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateZoneGeographiqueConsultanceScientifiquePonctuelle(zoneGeographiqueConsultanceScientifiquePonctuelle: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {

     this.zoneGeographiqueConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(zoneGeographiqueConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateZoneGeographiqueConsultanceScientifiquePonctuelle(res);
	       this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = res;
	       this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle.id = null;
            this.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateZoneGeographiqueConsultanceScientifiquePonctuelle(res: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.zoneGeographiqueConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Consultance scientifique ponctuelle': this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
        'Zone geographique': this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.zoneGeographiqueVo?.libelle ? this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.paysVo?.libelle ? this.searchZoneGeographiqueConsultanceScientifiquePonctuelle.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get zoneGeographiqueConsultanceScientifiquePonctuelles(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles;
       }
    set zoneGeographiqueConsultanceScientifiquePonctuelles(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles = value;
       }

    get zoneGeographiqueConsultanceScientifiquePonctuelleSelections(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelleSelections;
       }
    set zoneGeographiqueConsultanceScientifiquePonctuelleSelections(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedZoneGeographiqueConsultanceScientifiquePonctuelle():ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
       }
    set selectedZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }
    
    get createZoneGeographiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }
    set createZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.createZoneGeographiqueConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editZoneGeographiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }
    set editZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }
    set viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchZoneGeographiqueConsultanceScientifiquePonctuelle(): ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
        return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.searchZoneGeographiqueConsultanceScientifiquePonctuelle;
       }
    set searchZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.searchZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

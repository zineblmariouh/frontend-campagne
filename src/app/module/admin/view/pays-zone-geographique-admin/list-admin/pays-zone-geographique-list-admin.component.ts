import {Component, OnInit} from '@angular/core';
import {PaysZoneGeographiqueService} from '../../../../../controller/service/PaysZoneGeographique.service';
import {PaysZoneGeographiqueVo} from '../../../../../controller/model/PaysZoneGeographique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { ZoneGeographiqueService } from '../../../../../controller/service/ZoneGeographique.service';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-zone-geographique-list-admin',
  templateUrl: './pays-zone-geographique-list-admin.component.html',
  styleUrls: ['./pays-zone-geographique-list-admin.component.css']
})
export class PaysZoneGeographiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysZoneGeographique';
    payss :Array<PaysVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;


    constructor(private datePipe: DatePipe, private paysZoneGeographiqueService: PaysZoneGeographiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private zoneGeographiqueService: ZoneGeographiqueService
) { }

    ngOnInit(): void {
      this.loadPaysZoneGeographiques();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadZoneGeographique();
    }
    
    // methods
      public async loadPaysZoneGeographiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'list');
        isPermistted ? this.paysZoneGeographiqueService.findAll().subscribe(paysZoneGeographiques => this.paysZoneGeographiques = paysZoneGeographiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysZoneGeographiqueService.findByCriteria(this.searchPaysZoneGeographique).subscribe(paysZoneGeographiques=>{
            
            this.paysZoneGeographiques = paysZoneGeographiques;
           // this.searchPaysZoneGeographique = new PaysZoneGeographiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
        ];
    }
    
    public async editPaysZoneGeographique(paysZoneGeographique:PaysZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'edit');
         if(isPermistted){
          this.paysZoneGeographiqueService.findByIdWithAssociatedList(paysZoneGeographique).subscribe(res => {
           this.selectedPaysZoneGeographique = res;
            this.editPaysZoneGeographiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysZoneGeographique(paysZoneGeographique:PaysZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'view');
        if(isPermistted){
           this.paysZoneGeographiqueService.findByIdWithAssociatedList(paysZoneGeographique).subscribe(res => {
           this.selectedPaysZoneGeographique = res;
            this.viewPaysZoneGeographiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysZoneGeographique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysZoneGeographique = new PaysZoneGeographiqueVo();
            this.createPaysZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysZoneGeographique(paysZoneGeographique:PaysZoneGeographiqueVo){
       const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays zone geographique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysZoneGeographiqueService.delete(paysZoneGeographique).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysZoneGeographiques.indexOf(paysZoneGeographique);
                          position > -1 ? this.paysZoneGeographiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays zone geographique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysZoneGeographique', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysZoneGeographique(paysZoneGeographique: PaysZoneGeographiqueVo) {

     this.paysZoneGeographiqueService.findByIdWithAssociatedList(paysZoneGeographique).subscribe(
	 res => {
	       this.initDuplicatePaysZoneGeographique(res);
	       this.selectedPaysZoneGeographique = res;
	       this.selectedPaysZoneGeographique.id = null;
            this.createPaysZoneGeographiqueDialog = true;

});

	}

	initDuplicatePaysZoneGeographique(res: PaysZoneGeographiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysZoneGeographiques.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchPaysZoneGeographique.paysVo?.libelle ? this.searchPaysZoneGeographique.paysVo?.libelle : environment.emptyForExport ,
        'Zone geographique': this.searchPaysZoneGeographique.zoneGeographiqueVo?.libelle ? this.searchPaysZoneGeographique.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysZoneGeographiques(): Array<PaysZoneGeographiqueVo> {
           return this.paysZoneGeographiqueService.paysZoneGeographiques;
       }
    set paysZoneGeographiques(value: Array<PaysZoneGeographiqueVo>) {
        this.paysZoneGeographiqueService.paysZoneGeographiques = value;
       }

    get paysZoneGeographiqueSelections(): Array<PaysZoneGeographiqueVo> {
           return this.paysZoneGeographiqueService.paysZoneGeographiqueSelections;
       }
    set paysZoneGeographiqueSelections(value: Array<PaysZoneGeographiqueVo>) {
        this.paysZoneGeographiqueService.paysZoneGeographiqueSelections = value;
       }
   
     


    get selectedPaysZoneGeographique():PaysZoneGeographiqueVo {
           return this.paysZoneGeographiqueService.selectedPaysZoneGeographique;
       }
    set selectedPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this.paysZoneGeographiqueService.selectedPaysZoneGeographique = value;
       }
    
    get createPaysZoneGeographiqueDialog():boolean {
           return this.paysZoneGeographiqueService.createPaysZoneGeographiqueDialog;
       }
    set createPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.createPaysZoneGeographiqueDialog= value;
       }
    
    get editPaysZoneGeographiqueDialog():boolean {
           return this.paysZoneGeographiqueService.editPaysZoneGeographiqueDialog;
       }
    set editPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.editPaysZoneGeographiqueDialog= value;
       }
    get viewPaysZoneGeographiqueDialog():boolean {
           return this.paysZoneGeographiqueService.viewPaysZoneGeographiqueDialog;
       }
    set viewPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.viewPaysZoneGeographiqueDialog = value;
       }
       
     get searchPaysZoneGeographique(): PaysZoneGeographiqueVo {
        return this.paysZoneGeographiqueService.searchPaysZoneGeographique;
       }
    set searchPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this.paysZoneGeographiqueService.searchPaysZoneGeographique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

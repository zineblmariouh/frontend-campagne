import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConseilsScientifiqueService } from '../../../../../controller/service/ConseilsScientifique.service';
import { ZoneGeographiqueService } from '../../../../../controller/service/ZoneGeographique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-zone-geographique-conseils-scientifique-list-admin',
  templateUrl: './zone-geographique-conseils-scientifique-list-admin.component.html',
  styleUrls: ['./zone-geographique-conseils-scientifique-list-admin.component.css']
})
export class ZoneGeographiqueConseilsScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneGeographiqueConseilsScientifique';
    conseilsScientifiques :Array<ConseilsScientifiqueVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private zoneGeographiqueConseilsScientifiqueService: ZoneGeographiqueConseilsScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private conseilsScientifiqueService: ConseilsScientifiqueService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadZoneGeographiqueConseilsScientifiques();
      this.initExport();
      this.initCol();
      this.loadConseilsScientifique();
      this.loadZoneGeographique();
      this.loadPays();
    }
    
    // methods
      public async loadZoneGeographiqueConseilsScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'list');
        isPermistted ? this.zoneGeographiqueConseilsScientifiqueService.findAll().subscribe(zoneGeographiqueConseilsScientifiques => this.zoneGeographiqueConseilsScientifiques = zoneGeographiqueConseilsScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.zoneGeographiqueConseilsScientifiqueService.findByCriteria(this.searchZoneGeographiqueConseilsScientifique).subscribe(zoneGeographiqueConseilsScientifiques=>{
            
            this.zoneGeographiqueConseilsScientifiques = zoneGeographiqueConseilsScientifiques;
           // this.searchZoneGeographiqueConseilsScientifique = new ZoneGeographiqueConseilsScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'conseilsScientifique?.id', header: 'Conseils scientifique'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editZoneGeographiqueConseilsScientifique(zoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'edit');
         if(isPermistted){
          this.zoneGeographiqueConseilsScientifiqueService.findByIdWithAssociatedList(zoneGeographiqueConseilsScientifique).subscribe(res => {
           this.selectedZoneGeographiqueConseilsScientifique = res;
            this.editZoneGeographiqueConseilsScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewZoneGeographiqueConseilsScientifique(zoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'view');
        if(isPermistted){
           this.zoneGeographiqueConseilsScientifiqueService.findByIdWithAssociatedList(zoneGeographiqueConseilsScientifique).subscribe(res => {
           this.selectedZoneGeographiqueConseilsScientifique = res;
            this.viewZoneGeographiqueConseilsScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateZoneGeographiqueConseilsScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedZoneGeographiqueConseilsScientifique = new ZoneGeographiqueConseilsScientifiqueVo();
            this.createZoneGeographiqueConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteZoneGeographiqueConseilsScientifique(zoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Zone geographique conseils scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.zoneGeographiqueConseilsScientifiqueService.delete(zoneGeographiqueConseilsScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.zoneGeographiqueConseilsScientifiques.indexOf(zoneGeographiqueConseilsScientifique);
                          position > -1 ? this.zoneGeographiqueConseilsScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Zone geographique conseils scientifique Supprimé',
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

public async loadConseilsScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'list');
    isPermistted ? this.conseilsScientifiqueService.findAll().subscribe(conseilsScientifiques => this.conseilsScientifiques = conseilsScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueConseilsScientifique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateZoneGeographiqueConseilsScientifique(zoneGeographiqueConseilsScientifique: ZoneGeographiqueConseilsScientifiqueVo) {

     this.zoneGeographiqueConseilsScientifiqueService.findByIdWithAssociatedList(zoneGeographiqueConseilsScientifique).subscribe(
	 res => {
	       this.initDuplicateZoneGeographiqueConseilsScientifique(res);
	       this.selectedZoneGeographiqueConseilsScientifique = res;
	       this.selectedZoneGeographiqueConseilsScientifique.id = null;
            this.createZoneGeographiqueConseilsScientifiqueDialog = true;

});

	}

	initDuplicateZoneGeographiqueConseilsScientifique(res: ZoneGeographiqueConseilsScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.zoneGeographiqueConseilsScientifiques.map(e => {
    return {
            'Conseils scientifique': e.conseilsScientifiqueVo?.id ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
        'Conseils scientifique': this.searchZoneGeographiqueConseilsScientifique.conseilsScientifiqueVo?.id ? this.searchZoneGeographiqueConseilsScientifique.conseilsScientifiqueVo?.id : environment.emptyForExport ,
        'Zone geographique': this.searchZoneGeographiqueConseilsScientifique.zoneGeographiqueVo?.libelle ? this.searchZoneGeographiqueConseilsScientifique.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchZoneGeographiqueConseilsScientifique.paysVo?.libelle ? this.searchZoneGeographiqueConseilsScientifique.paysVo?.libelle : environment.emptyForExport ,
            'Libelle': this.searchZoneGeographiqueConseilsScientifique.libelle ? this.searchZoneGeographiqueConseilsScientifique.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get zoneGeographiqueConseilsScientifiques(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
           return this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques;
       }
    set zoneGeographiqueConseilsScientifiques(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques = value;
       }

    get zoneGeographiqueConseilsScientifiqueSelections(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
           return this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiqueSelections;
       }
    set zoneGeographiqueConseilsScientifiqueSelections(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiqueSelections = value;
       }
   
     


    get selectedZoneGeographiqueConseilsScientifique():ZoneGeographiqueConseilsScientifiqueVo {
           return this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique;
       }
    set selectedZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique = value;
       }
    
    get createZoneGeographiqueConseilsScientifiqueDialog():boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.createZoneGeographiqueConseilsScientifiqueDialog;
       }
    set createZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.createZoneGeographiqueConseilsScientifiqueDialog= value;
       }
    
    get editZoneGeographiqueConseilsScientifiqueDialog():boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.editZoneGeographiqueConseilsScientifiqueDialog;
       }
    set editZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.editZoneGeographiqueConseilsScientifiqueDialog= value;
       }
    get viewZoneGeographiqueConseilsScientifiqueDialog():boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.viewZoneGeographiqueConseilsScientifiqueDialog;
       }
    set viewZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.viewZoneGeographiqueConseilsScientifiqueDialog = value;
       }
       
     get searchZoneGeographiqueConseilsScientifique(): ZoneGeographiqueConseilsScientifiqueVo {
        return this.zoneGeographiqueConseilsScientifiqueService.searchZoneGeographiqueConseilsScientifique;
       }
    set searchZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this.zoneGeographiqueConseilsScientifiqueService.searchZoneGeographiqueConseilsScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

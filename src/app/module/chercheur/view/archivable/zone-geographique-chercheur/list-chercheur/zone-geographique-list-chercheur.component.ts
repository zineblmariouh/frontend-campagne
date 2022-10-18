import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-zone-geographique-list-chercheur',
  templateUrl: './zone-geographique-list-chercheur.component.html',
  styleUrls: ['./zone-geographique-list-chercheur.component.css']
})
export class ZoneGeographiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneGeographique';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private zoneGeographiqueService: ZoneGeographiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadZoneGeographiques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadZoneGeographiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'list');
        isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.zoneGeographiqueService.findByCriteria(this.searchZoneGeographique).subscribe(zoneGeographiques=>{
            
            this.zoneGeographiques = zoneGeographiques;
           // this.searchZoneGeographique = new ZoneGeographiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editZoneGeographique(zoneGeographique:ZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'edit');
         if(isPermistted){
          this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(res => {
           this.selectedZoneGeographique = res;
            this.selectedZoneGeographique.dateArchivage = new Date(zoneGeographique.dateArchivage);
            this.selectedZoneGeographique.dateCreation = new Date(zoneGeographique.dateCreation);
            this.editZoneGeographiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewZoneGeographique(zoneGeographique:ZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'view');
        if(isPermistted){
           this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(res => {
           this.selectedZoneGeographique = res;
            this.selectedZoneGeographique.dateArchivage = new Date(zoneGeographique.dateArchivage);
            this.selectedZoneGeographique.dateCreation = new Date(zoneGeographique.dateCreation);
            this.viewZoneGeographiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateZoneGeographique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
            this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteZoneGeographique(zoneGeographique:ZoneGeographiqueVo){
       const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Zone geographique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.zoneGeographiqueService.delete(zoneGeographique).subscribe(status=>{
                          if(status > 0){
                          const position = this.zoneGeographiques.indexOf(zoneGeographique);
                          position > -1 ? this.zoneGeographiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Zone geographique Supprimé',
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


public async duplicateZoneGeographique(zoneGeographique: ZoneGeographiqueVo) {

     this.zoneGeographiqueService.findByIdWithAssociatedList(zoneGeographique).subscribe(
	 res => {
	       this.initDuplicateZoneGeographique(res);
	       this.selectedZoneGeographique = res;
	       this.selectedZoneGeographique.id = null;
            this.createZoneGeographiqueDialog = true;

});

	}

	initDuplicateZoneGeographique(res: ZoneGeographiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.zoneGeographiques.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchZoneGeographique.libelle ? this.searchZoneGeographique.libelle : environment.emptyForExport ,
            'Code': this.searchZoneGeographique.code ? this.searchZoneGeographique.code : environment.emptyForExport ,
            'Archive': this.searchZoneGeographique.archive ? (this.searchZoneGeographique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchZoneGeographique.dateArchivageMin ? this.datePipe.transform(this.searchZoneGeographique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchZoneGeographique.dateArchivageMax ? this.datePipe.transform(this.searchZoneGeographique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchZoneGeographique.dateCreationMin ? this.datePipe.transform(this.searchZoneGeographique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchZoneGeographique.dateCreationMax ? this.datePipe.transform(this.searchZoneGeographique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchZoneGeographique.admin ? (this.searchZoneGeographique.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchZoneGeographique.visible ? (this.searchZoneGeographique.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchZoneGeographique.username ? this.searchZoneGeographique.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
    set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }

    get zoneGeographiqueSelections(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiqueSelections;
       }
    set zoneGeographiqueSelections(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiqueSelections = value;
       }
   
     


    get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
    
    get createZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
    set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
    
    get editZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.editZoneGeographiqueDialog;
       }
    set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog= value;
       }
    get viewZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.viewZoneGeographiqueDialog;
       }
    set viewZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.viewZoneGeographiqueDialog = value;
       }
       
     get searchZoneGeographique(): ZoneGeographiqueVo {
        return this.zoneGeographiqueService.searchZoneGeographique;
       }
    set searchZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.searchZoneGeographique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

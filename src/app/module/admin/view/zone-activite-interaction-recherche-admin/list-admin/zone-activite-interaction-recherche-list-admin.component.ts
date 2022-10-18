import {Component, OnInit} from '@angular/core';
import {ZoneActiviteInteractionRechercheService} from '../../../../../controller/service/ZoneActiviteInteractionRecherche.service';
import {ZoneActiviteInteractionRechercheVo} from '../../../../../controller/model/ZoneActiviteInteractionRecherche.model';
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
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-zone-activite-interaction-recherche-list-admin',
  templateUrl: './zone-activite-interaction-recherche-list-admin.component.html',
  styleUrls: ['./zone-activite-interaction-recherche-list-admin.component.css']
})
export class ZoneActiviteInteractionRechercheListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneActiviteInteractionRecherche';
    payss :Array<PaysVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private zoneActiviteInteractionRechercheService: ZoneActiviteInteractionRechercheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadZoneActiviteInteractionRecherches();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadZoneGeographique();
      this.loadChercheur();
    }
    
    // methods
      public async loadZoneActiviteInteractionRecherches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'list');
        isPermistted ? this.zoneActiviteInteractionRechercheService.findAll().subscribe(zoneActiviteInteractionRecherches => this.zoneActiviteInteractionRecherches = zoneActiviteInteractionRecherches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.zoneActiviteInteractionRechercheService.findByCriteria(this.searchZoneActiviteInteractionRecherche).subscribe(zoneActiviteInteractionRecherches=>{
            
            this.zoneActiviteInteractionRecherches = zoneActiviteInteractionRecherches;
           // this.searchZoneActiviteInteractionRecherche = new ZoneActiviteInteractionRechercheVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }
    
    public async editZoneActiviteInteractionRecherche(zoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo){
        const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'edit');
         if(isPermistted){
          this.zoneActiviteInteractionRechercheService.findByIdWithAssociatedList(zoneActiviteInteractionRecherche).subscribe(res => {
           this.selectedZoneActiviteInteractionRecherche = res;
            this.editZoneActiviteInteractionRechercheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewZoneActiviteInteractionRecherche(zoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo){
        const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'view');
        if(isPermistted){
           this.zoneActiviteInteractionRechercheService.findByIdWithAssociatedList(zoneActiviteInteractionRecherche).subscribe(res => {
           this.selectedZoneActiviteInteractionRecherche = res;
            this.viewZoneActiviteInteractionRechercheDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateZoneActiviteInteractionRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedZoneActiviteInteractionRecherche = new ZoneActiviteInteractionRechercheVo();
            this.createZoneActiviteInteractionRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteZoneActiviteInteractionRecherche(zoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo){
       const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Zone activite interaction recherche) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.zoneActiviteInteractionRechercheService.delete(zoneActiviteInteractionRecherche).subscribe(status=>{
                          if(status > 0){
                          const position = this.zoneActiviteInteractionRecherches.indexOf(zoneActiviteInteractionRecherche);
                          position > -1 ? this.zoneActiviteInteractionRecherches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Zone activite interaction recherche Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneActiviteInteractionRecherche', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateZoneActiviteInteractionRecherche(zoneActiviteInteractionRecherche: ZoneActiviteInteractionRechercheVo) {

     this.zoneActiviteInteractionRechercheService.findByIdWithAssociatedList(zoneActiviteInteractionRecherche).subscribe(
	 res => {
	       this.initDuplicateZoneActiviteInteractionRecherche(res);
	       this.selectedZoneActiviteInteractionRecherche = res;
	       this.selectedZoneActiviteInteractionRecherche.id = null;
            this.createZoneActiviteInteractionRechercheDialog = true;

});

	}

	initDuplicateZoneActiviteInteractionRecherche(res: ZoneActiviteInteractionRechercheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.zoneActiviteInteractionRecherches.map(e => {
    return {
                    'Libelle': e.libelle ,
            'Pays': e.paysVo?.libelle ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchZoneActiviteInteractionRecherche.libelle ? this.searchZoneActiviteInteractionRecherche.libelle : environment.emptyForExport ,
        'Pays': this.searchZoneActiviteInteractionRecherche.paysVo?.libelle ? this.searchZoneActiviteInteractionRecherche.paysVo?.libelle : environment.emptyForExport ,
        'Zone geographique': this.searchZoneActiviteInteractionRecherche.zoneGeographiqueVo?.libelle ? this.searchZoneActiviteInteractionRecherche.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchZoneActiviteInteractionRecherche.chercheurVo?.numeroMatricule ? this.searchZoneActiviteInteractionRecherche.chercheurVo?.numeroMatricule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get zoneActiviteInteractionRecherches(): Array<ZoneActiviteInteractionRechercheVo> {
           return this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRecherches;
       }
    set zoneActiviteInteractionRecherches(value: Array<ZoneActiviteInteractionRechercheVo>) {
        this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRecherches = value;
       }

    get zoneActiviteInteractionRechercheSelections(): Array<ZoneActiviteInteractionRechercheVo> {
           return this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRechercheSelections;
       }
    set zoneActiviteInteractionRechercheSelections(value: Array<ZoneActiviteInteractionRechercheVo>) {
        this.zoneActiviteInteractionRechercheService.zoneActiviteInteractionRechercheSelections = value;
       }
   
     


    get selectedZoneActiviteInteractionRecherche():ZoneActiviteInteractionRechercheVo {
           return this.zoneActiviteInteractionRechercheService.selectedZoneActiviteInteractionRecherche;
       }
    set selectedZoneActiviteInteractionRecherche(value: ZoneActiviteInteractionRechercheVo) {
        this.zoneActiviteInteractionRechercheService.selectedZoneActiviteInteractionRecherche = value;
       }
    
    get createZoneActiviteInteractionRechercheDialog():boolean {
           return this.zoneActiviteInteractionRechercheService.createZoneActiviteInteractionRechercheDialog;
       }
    set createZoneActiviteInteractionRechercheDialog(value: boolean) {
        this.zoneActiviteInteractionRechercheService.createZoneActiviteInteractionRechercheDialog= value;
       }
    
    get editZoneActiviteInteractionRechercheDialog():boolean {
           return this.zoneActiviteInteractionRechercheService.editZoneActiviteInteractionRechercheDialog;
       }
    set editZoneActiviteInteractionRechercheDialog(value: boolean) {
        this.zoneActiviteInteractionRechercheService.editZoneActiviteInteractionRechercheDialog= value;
       }
    get viewZoneActiviteInteractionRechercheDialog():boolean {
           return this.zoneActiviteInteractionRechercheService.viewZoneActiviteInteractionRechercheDialog;
       }
    set viewZoneActiviteInteractionRechercheDialog(value: boolean) {
        this.zoneActiviteInteractionRechercheService.viewZoneActiviteInteractionRechercheDialog = value;
       }
       
     get searchZoneActiviteInteractionRecherche(): ZoneActiviteInteractionRechercheVo {
        return this.zoneActiviteInteractionRechercheService.searchZoneActiviteInteractionRecherche;
       }
    set searchZoneActiviteInteractionRecherche(value: ZoneActiviteInteractionRechercheVo) {
        this.zoneActiviteInteractionRechercheService.searchZoneActiviteInteractionRecherche = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

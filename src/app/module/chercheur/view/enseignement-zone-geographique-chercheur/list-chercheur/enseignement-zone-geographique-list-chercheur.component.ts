import {Component, OnInit} from '@angular/core';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnseignementService } from '../../../../../controller/service/Enseignement.service';
import { ZoneGeographiqueService } from '../../../../../controller/service/ZoneGeographique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-zone-geographique-list-chercheur',
  templateUrl: './enseignement-zone-geographique-list-chercheur.component.html',
  styleUrls: ['./enseignement-zone-geographique-list-chercheur.component.css']
})
export class EnseignementZoneGeographiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnseignementZoneGeographique';
    enseignements :Array<EnseignementVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enseignementService: EnseignementService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadEnseignementZoneGeographiques();
      this.initExport();
      this.initCol();
      this.loadEnseignement();
      this.loadZoneGeographique();
      this.loadPays();
    }
    
    // methods
      public async loadEnseignementZoneGeographiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'list');
        isPermistted ? this.enseignementZoneGeographiqueService.findAll().subscribe(enseignementZoneGeographiques => this.enseignementZoneGeographiques = enseignementZoneGeographiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enseignementZoneGeographiqueService.findByCriteria(this.searchEnseignementZoneGeographique).subscribe(enseignementZoneGeographiques=>{
            
            this.enseignementZoneGeographiques = enseignementZoneGeographiques;
           // this.searchEnseignementZoneGeographique = new EnseignementZoneGeographiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enseignement?.id', header: 'Enseignement'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEnseignementZoneGeographique(enseignementZoneGeographique:EnseignementZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'edit');
         if(isPermistted){
          this.enseignementZoneGeographiqueService.findByIdWithAssociatedList(enseignementZoneGeographique).subscribe(res => {
           this.selectedEnseignementZoneGeographique = res;
            this.editEnseignementZoneGeographiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignementZoneGeographique(enseignementZoneGeographique:EnseignementZoneGeographiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'view');
        if(isPermistted){
           this.enseignementZoneGeographiqueService.findByIdWithAssociatedList(enseignementZoneGeographique).subscribe(res => {
           this.selectedEnseignementZoneGeographique = res;
            this.viewEnseignementZoneGeographiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignementZoneGeographique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignementZoneGeographique = new EnseignementZoneGeographiqueVo();
            this.createEnseignementZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignementZoneGeographique(enseignementZoneGeographique:EnseignementZoneGeographiqueVo){
       const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement zone geographique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementZoneGeographiqueService.delete(enseignementZoneGeographique).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignementZoneGeographiques.indexOf(enseignementZoneGeographique);
                          position > -1 ? this.enseignementZoneGeographiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement zone geographique Supprimé',
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

public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementZoneGeographique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignementZoneGeographique(enseignementZoneGeographique: EnseignementZoneGeographiqueVo) {

     this.enseignementZoneGeographiqueService.findByIdWithAssociatedList(enseignementZoneGeographique).subscribe(
	 res => {
	       this.initDuplicateEnseignementZoneGeographique(res);
	       this.selectedEnseignementZoneGeographique = res;
	       this.selectedEnseignementZoneGeographique.id = null;
            this.createEnseignementZoneGeographiqueDialog = true;

});

	}

	initDuplicateEnseignementZoneGeographique(res: EnseignementZoneGeographiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enseignementZoneGeographiques.map(e => {
    return {
            'Enseignement': e.enseignementVo?.id ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
        'Enseignement': this.searchEnseignementZoneGeographique.enseignementVo?.id ? this.searchEnseignementZoneGeographique.enseignementVo?.id : environment.emptyForExport ,
        'Zone geographique': this.searchEnseignementZoneGeographique.zoneGeographiqueVo?.libelle ? this.searchEnseignementZoneGeographique.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchEnseignementZoneGeographique.paysVo?.libelle ? this.searchEnseignementZoneGeographique.paysVo?.libelle : environment.emptyForExport ,
            'Libelle': this.searchEnseignementZoneGeographique.libelle ? this.searchEnseignementZoneGeographique.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignementZoneGeographiques(): Array<EnseignementZoneGeographiqueVo> {
           return this.enseignementZoneGeographiqueService.enseignementZoneGeographiques;
       }
    set enseignementZoneGeographiques(value: Array<EnseignementZoneGeographiqueVo>) {
        this.enseignementZoneGeographiqueService.enseignementZoneGeographiques = value;
       }

    get enseignementZoneGeographiqueSelections(): Array<EnseignementZoneGeographiqueVo> {
           return this.enseignementZoneGeographiqueService.enseignementZoneGeographiqueSelections;
       }
    set enseignementZoneGeographiqueSelections(value: Array<EnseignementZoneGeographiqueVo>) {
        this.enseignementZoneGeographiqueService.enseignementZoneGeographiqueSelections = value;
       }
   
     


    get selectedEnseignementZoneGeographique():EnseignementZoneGeographiqueVo {
           return this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique;
       }
    set selectedEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique = value;
       }
    
    get createEnseignementZoneGeographiqueDialog():boolean {
           return this.enseignementZoneGeographiqueService.createEnseignementZoneGeographiqueDialog;
       }
    set createEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.createEnseignementZoneGeographiqueDialog= value;
       }
    
    get editEnseignementZoneGeographiqueDialog():boolean {
           return this.enseignementZoneGeographiqueService.editEnseignementZoneGeographiqueDialog;
       }
    set editEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.editEnseignementZoneGeographiqueDialog= value;
       }
    get viewEnseignementZoneGeographiqueDialog():boolean {
           return this.enseignementZoneGeographiqueService.viewEnseignementZoneGeographiqueDialog;
       }
    set viewEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.viewEnseignementZoneGeographiqueDialog = value;
       }
       
     get searchEnseignementZoneGeographique(): EnseignementZoneGeographiqueVo {
        return this.enseignementZoneGeographiqueService.searchEnseignementZoneGeographique;
       }
    set searchEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this.enseignementZoneGeographiqueService.searchEnseignementZoneGeographique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

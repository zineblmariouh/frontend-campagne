import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';
import { ZoneGeographiqueService } from '../../../../../controller/service/ZoneGeographique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-zone-geographique-formation-continue-list-chercheur',
  templateUrl: './zone-geographique-formation-continue-list-chercheur.component.html',
  styleUrls: ['./zone-geographique-formation-continue-list-chercheur.component.css']
})
export class ZoneGeographiqueFormationContinueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ZoneGeographiqueFormationContinue';
    formationContinues :Array<FormationContinueVo>;
    zoneGeographiques :Array<ZoneGeographiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formationContinueService: FormationContinueService
        , private zoneGeographiqueService: ZoneGeographiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadZoneGeographiqueFormationContinues();
      this.initExport();
      this.initCol();
      this.loadFormationContinue();
      this.loadZoneGeographique();
      this.loadPays();
    }
    
    // methods
      public async loadZoneGeographiqueFormationContinues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'list');
        isPermistted ? this.zoneGeographiqueFormationContinueService.findAll().subscribe(zoneGeographiqueFormationContinues => this.zoneGeographiqueFormationContinues = zoneGeographiqueFormationContinues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.zoneGeographiqueFormationContinueService.findByCriteria(this.searchZoneGeographiqueFormationContinue).subscribe(zoneGeographiqueFormationContinues=>{
            
            this.zoneGeographiqueFormationContinues = zoneGeographiqueFormationContinues;
           // this.searchZoneGeographiqueFormationContinue = new ZoneGeographiqueFormationContinueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
                        {field: 'zoneGeographique?.libelle', header: 'Zone geographique'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editZoneGeographiqueFormationContinue(zoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'edit');
         if(isPermistted){
          this.zoneGeographiqueFormationContinueService.findByIdWithAssociatedList(zoneGeographiqueFormationContinue).subscribe(res => {
           this.selectedZoneGeographiqueFormationContinue = res;
            this.editZoneGeographiqueFormationContinueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewZoneGeographiqueFormationContinue(zoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo){
        const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'view');
        if(isPermistted){
           this.zoneGeographiqueFormationContinueService.findByIdWithAssociatedList(zoneGeographiqueFormationContinue).subscribe(res => {
           this.selectedZoneGeographiqueFormationContinue = res;
            this.viewZoneGeographiqueFormationContinueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateZoneGeographiqueFormationContinue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedZoneGeographiqueFormationContinue = new ZoneGeographiqueFormationContinueVo();
            this.createZoneGeographiqueFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteZoneGeographiqueFormationContinue(zoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo){
       const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Zone geographique formation continue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.zoneGeographiqueFormationContinueService.delete(zoneGeographiqueFormationContinue).subscribe(status=>{
                          if(status > 0){
                          const position = this.zoneGeographiqueFormationContinues.indexOf(zoneGeographiqueFormationContinue);
                          position > -1 ? this.zoneGeographiqueFormationContinues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Zone geographique formation continue Supprimé',
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

public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadZoneGeographique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'list');
    isPermistted ? this.zoneGeographiqueService.findAll().subscribe(zoneGeographiques => this.zoneGeographiques = zoneGeographiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ZoneGeographiqueFormationContinue', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateZoneGeographiqueFormationContinue(zoneGeographiqueFormationContinue: ZoneGeographiqueFormationContinueVo) {

     this.zoneGeographiqueFormationContinueService.findByIdWithAssociatedList(zoneGeographiqueFormationContinue).subscribe(
	 res => {
	       this.initDuplicateZoneGeographiqueFormationContinue(res);
	       this.selectedZoneGeographiqueFormationContinue = res;
	       this.selectedZoneGeographiqueFormationContinue.id = null;
            this.createZoneGeographiqueFormationContinueDialog = true;

});

	}

	initDuplicateZoneGeographiqueFormationContinue(res: ZoneGeographiqueFormationContinueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.zoneGeographiqueFormationContinues.map(e => {
    return {
            'Formation continue': e.formationContinueVo?.intitule ,
            'Zone geographique': e.zoneGeographiqueVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
        'Formation continue': this.searchZoneGeographiqueFormationContinue.formationContinueVo?.intitule ? this.searchZoneGeographiqueFormationContinue.formationContinueVo?.intitule : environment.emptyForExport ,
        'Zone geographique': this.searchZoneGeographiqueFormationContinue.zoneGeographiqueVo?.libelle ? this.searchZoneGeographiqueFormationContinue.zoneGeographiqueVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchZoneGeographiqueFormationContinue.paysVo?.libelle ? this.searchZoneGeographiqueFormationContinue.paysVo?.libelle : environment.emptyForExport ,
            'Libelle': this.searchZoneGeographiqueFormationContinue.libelle ? this.searchZoneGeographiqueFormationContinue.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get zoneGeographiqueFormationContinues(): Array<ZoneGeographiqueFormationContinueVo> {
           return this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues;
       }
    set zoneGeographiqueFormationContinues(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues = value;
       }

    get zoneGeographiqueFormationContinueSelections(): Array<ZoneGeographiqueFormationContinueVo> {
           return this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinueSelections;
       }
    set zoneGeographiqueFormationContinueSelections(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinueSelections = value;
       }
   
     


    get selectedZoneGeographiqueFormationContinue():ZoneGeographiqueFormationContinueVo {
           return this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue;
       }
    set selectedZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue = value;
       }
    
    get createZoneGeographiqueFormationContinueDialog():boolean {
           return this.zoneGeographiqueFormationContinueService.createZoneGeographiqueFormationContinueDialog;
       }
    set createZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.createZoneGeographiqueFormationContinueDialog= value;
       }
    
    get editZoneGeographiqueFormationContinueDialog():boolean {
           return this.zoneGeographiqueFormationContinueService.editZoneGeographiqueFormationContinueDialog;
       }
    set editZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.editZoneGeographiqueFormationContinueDialog= value;
       }
    get viewZoneGeographiqueFormationContinueDialog():boolean {
           return this.zoneGeographiqueFormationContinueService.viewZoneGeographiqueFormationContinueDialog;
       }
    set viewZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.viewZoneGeographiqueFormationContinueDialog = value;
       }
       
     get searchZoneGeographiqueFormationContinue(): ZoneGeographiqueFormationContinueVo {
        return this.zoneGeographiqueFormationContinueService.searchZoneGeographiqueFormationContinue;
       }
    set searchZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this.zoneGeographiqueFormationContinueService.searchZoneGeographiqueFormationContinue = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

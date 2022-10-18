import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-etablissement-list-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-etablissement-list-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-etablissement-list-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiqueEtablissement';
    etablissements :Array<EtablissementVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEtablissementService: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiqueEtablissements();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiqueEtablissements => this.developpementDeSavoirEtInnovationScientifiqueEtablissements = developpementDeSavoirEtInnovationScientifiqueEtablissements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement).subscribe(developpementDeSavoirEtInnovationScientifiqueEtablissements=>{
            
            this.developpementDeSavoirEtInnovationScientifiqueEtablissements = developpementDeSavoirEtInnovationScientifiqueEtablissements;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(developpementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEtablissement).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(developpementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEtablissement).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(developpementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique etablissement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.delete(developpementDeSavoirEtInnovationScientifiqueEtablissement).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiqueEtablissements.indexOf(developpementDeSavoirEtInnovationScientifiqueEtablissement);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiqueEtablissements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique etablissement Supprimé',
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

public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEtablissement', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(developpementDeSavoirEtInnovationScientifiqueEtablissement: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {

     this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEtablissement).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(res: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiqueEtablissements.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.etablissementVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.etablissementVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiqueEtablissements(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements;
       }
    set developpementDeSavoirEtInnovationScientifiqueEtablissements(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueEtablissementSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissementSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueEtablissementSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissementSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement():DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(): DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
        return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

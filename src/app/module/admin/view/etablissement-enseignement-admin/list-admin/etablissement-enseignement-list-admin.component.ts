import {Component, OnInit} from '@angular/core';
import {EtablissementEnseignementService} from '../../../../../controller/service/EtablissementEnseignement.service';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { EnseignementService } from '../../../../../controller/service/Enseignement.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etablissement-enseignement-list-admin',
  templateUrl: './etablissement-enseignement-list-admin.component.html',
  styleUrls: ['./etablissement-enseignement-list-admin.component.css']
})
export class EtablissementEnseignementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementEnseignement';
    etablissements :Array<EtablissementVo>;
    enseignements :Array<EnseignementVo>;


    constructor(private datePipe: DatePipe, private etablissementEnseignementService: EtablissementEnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etablissementService: EtablissementService
        , private enseignementService: EnseignementService
) { }

    ngOnInit(): void {
      this.loadEtablissementEnseignements();
      this.initExport();
      this.initCol();
      this.loadEtablissement();
      this.loadEnseignement();
    }
    
    // methods
      public async loadEtablissementEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'list');
        isPermistted ? this.etablissementEnseignementService.findAll().subscribe(etablissementEnseignements => this.etablissementEnseignements = etablissementEnseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementEnseignementService.findByCriteria(this.searchEtablissementEnseignement).subscribe(etablissementEnseignements=>{
            
            this.etablissementEnseignements = etablissementEnseignements;
           // this.searchEtablissementEnseignement = new EtablissementEnseignementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'enseignement?.id', header: 'Enseignement'},
        ];
    }
    
    public async editEtablissementEnseignement(etablissementEnseignement:EtablissementEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'edit');
         if(isPermistted){
          this.etablissementEnseignementService.findByIdWithAssociatedList(etablissementEnseignement).subscribe(res => {
           this.selectedEtablissementEnseignement = res;
            this.editEtablissementEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementEnseignement(etablissementEnseignement:EtablissementEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'view');
        if(isPermistted){
           this.etablissementEnseignementService.findByIdWithAssociatedList(etablissementEnseignement).subscribe(res => {
           this.selectedEtablissementEnseignement = res;
            this.viewEtablissementEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementEnseignement = new EtablissementEnseignementVo();
            this.createEtablissementEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtablissementEnseignement(etablissementEnseignement:EtablissementEnseignementVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementEnseignementService.delete(etablissementEnseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementEnseignements.indexOf(etablissementEnseignement);
                          position > -1 ? this.etablissementEnseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement enseignement Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementEnseignement', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissementEnseignement(etablissementEnseignement: EtablissementEnseignementVo) {

     this.etablissementEnseignementService.findByIdWithAssociatedList(etablissementEnseignement).subscribe(
	 res => {
	       this.initDuplicateEtablissementEnseignement(res);
	       this.selectedEtablissementEnseignement = res;
	       this.selectedEtablissementEnseignement.id = null;
            this.createEtablissementEnseignementDialog = true;

});

	}

	initDuplicateEtablissementEnseignement(res: EtablissementEnseignementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementEnseignements.map(e => {
    return {
            'Etablissement': e.etablissementVo?.libelle ,
            'Enseignement': e.enseignementVo?.id ,
     }
      });

      this.criteriaData = [{
        'Etablissement': this.searchEtablissementEnseignement.etablissementVo?.libelle ? this.searchEtablissementEnseignement.etablissementVo?.libelle : environment.emptyForExport ,
        'Enseignement': this.searchEtablissementEnseignement.enseignementVo?.id ? this.searchEtablissementEnseignement.enseignementVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementEnseignements(): Array<EtablissementEnseignementVo> {
           return this.etablissementEnseignementService.etablissementEnseignements;
       }
    set etablissementEnseignements(value: Array<EtablissementEnseignementVo>) {
        this.etablissementEnseignementService.etablissementEnseignements = value;
       }

    get etablissementEnseignementSelections(): Array<EtablissementEnseignementVo> {
           return this.etablissementEnseignementService.etablissementEnseignementSelections;
       }
    set etablissementEnseignementSelections(value: Array<EtablissementEnseignementVo>) {
        this.etablissementEnseignementService.etablissementEnseignementSelections = value;
       }
   
     


    get selectedEtablissementEnseignement():EtablissementEnseignementVo {
           return this.etablissementEnseignementService.selectedEtablissementEnseignement;
       }
    set selectedEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this.etablissementEnseignementService.selectedEtablissementEnseignement = value;
       }
    
    get createEtablissementEnseignementDialog():boolean {
           return this.etablissementEnseignementService.createEtablissementEnseignementDialog;
       }
    set createEtablissementEnseignementDialog(value: boolean) {
        this.etablissementEnseignementService.createEtablissementEnseignementDialog= value;
       }
    
    get editEtablissementEnseignementDialog():boolean {
           return this.etablissementEnseignementService.editEtablissementEnseignementDialog;
       }
    set editEtablissementEnseignementDialog(value: boolean) {
        this.etablissementEnseignementService.editEtablissementEnseignementDialog= value;
       }
    get viewEtablissementEnseignementDialog():boolean {
           return this.etablissementEnseignementService.viewEtablissementEnseignementDialog;
       }
    set viewEtablissementEnseignementDialog(value: boolean) {
        this.etablissementEnseignementService.viewEtablissementEnseignementDialog = value;
       }
       
     get searchEtablissementEnseignement(): EtablissementEnseignementVo {
        return this.etablissementEnseignementService.searchEtablissementEnseignement;
       }
    set searchEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this.etablissementEnseignementService.searchEtablissementEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

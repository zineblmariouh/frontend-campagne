import {Component, OnInit} from '@angular/core';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeEntiteAdministrativeService } from '../../../../../controller/service/TypeEntiteAdministrative.service';

import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-entite-administrative-list-chercheur',
  templateUrl: './entite-administrative-list-chercheur.component.html',
  styleUrls: ['./entite-administrative-list-chercheur.component.css']
})
export class EntiteAdministrativeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EntiteAdministrative';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    typeEntiteAdministratives :Array<TypeEntiteAdministrativeVo>;


    constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
) { }

    ngOnInit(): void {
      this.loadEntiteAdministratives();
      this.initExport();
      this.initCol();
      this.loadTypeEntiteAdministrative();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEntiteAdministratives(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'list');
        isPermistted ? this.entiteAdministrativeService.findAll().subscribe(entiteAdministratives => this.entiteAdministratives = entiteAdministratives,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.entiteAdministrativeService.findByCriteria(this.searchEntiteAdministrative).subscribe(entiteAdministratives=>{
            
            this.entiteAdministratives = entiteAdministratives;
           // this.searchEntiteAdministrative = new EntiteAdministrativeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'identifiantNational', header: 'Identifiant national'},
                            {field: 'siteWeb', header: 'Site web'},
                            {field: 'libelleCourt', header: 'Libelle court'},
                            {field: 'libelleLong', header: 'Libelle long'},
                        {field: 'typeEntiteAdministrative?.libelle', header: 'Type entite administrative'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEntiteAdministrative(entiteAdministrative:EntiteAdministrativeVo){
        const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'edit');
         if(isPermistted){
          this.entiteAdministrativeService.findByIdWithAssociatedList(entiteAdministrative).subscribe(res => {
           this.selectedEntiteAdministrative = res;
            this.selectedEntiteAdministrative.dateArchivage = new Date(entiteAdministrative.dateArchivage);
            this.selectedEntiteAdministrative.dateCreation = new Date(entiteAdministrative.dateCreation);
            this.editEntiteAdministrativeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEntiteAdministrative(entiteAdministrative:EntiteAdministrativeVo){
        const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'view');
        if(isPermistted){
           this.entiteAdministrativeService.findByIdWithAssociatedList(entiteAdministrative).subscribe(res => {
           this.selectedEntiteAdministrative = res;
            this.selectedEntiteAdministrative.dateArchivage = new Date(entiteAdministrative.dateArchivage);
            this.selectedEntiteAdministrative.dateCreation = new Date(entiteAdministrative.dateCreation);
            this.viewEntiteAdministrativeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEntiteAdministrative(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
            this.createEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEntiteAdministrative(entiteAdministrative:EntiteAdministrativeVo){
       const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Entite administrative) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.entiteAdministrativeService.delete(entiteAdministrative).subscribe(status=>{
                          if(status > 0){
                          const position = this.entiteAdministratives.indexOf(entiteAdministrative);
                          position > -1 ? this.entiteAdministratives.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Entite administrative Supprimé',
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

public async loadTypeEntiteAdministrative(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'list');
    isPermistted ? this.typeEntiteAdministrativeService.findAll().subscribe(typeEntiteAdministratives => this.typeEntiteAdministratives = typeEntiteAdministratives,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEntiteAdministrative(entiteAdministrative: EntiteAdministrativeVo) {

     this.entiteAdministrativeService.findByIdWithAssociatedList(entiteAdministrative).subscribe(
	 res => {
	       this.initDuplicateEntiteAdministrative(res);
	       this.selectedEntiteAdministrative = res;
	       this.selectedEntiteAdministrative.id = null;
            this.createEntiteAdministrativeDialog = true;

});

	}

	initDuplicateEntiteAdministrative(res: EntiteAdministrativeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.entiteAdministratives.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Identifiant national': e.identifiantNational ,
                    'Site web': e.siteWeb ,
                    'Libelle court': e.libelleCourt ,
                    'Libelle long': e.libelleLong ,
                    'Description': e.description ,
            'Type entite administrative': e.typeEntiteAdministrativeVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEntiteAdministrative.libelle ? this.searchEntiteAdministrative.libelle : environment.emptyForExport ,
            'Code': this.searchEntiteAdministrative.code ? this.searchEntiteAdministrative.code : environment.emptyForExport ,
            'Identifiant national': this.searchEntiteAdministrative.identifiantNational ? this.searchEntiteAdministrative.identifiantNational : environment.emptyForExport ,
            'Site web': this.searchEntiteAdministrative.siteWeb ? this.searchEntiteAdministrative.siteWeb : environment.emptyForExport ,
            'Libelle court': this.searchEntiteAdministrative.libelleCourt ? this.searchEntiteAdministrative.libelleCourt : environment.emptyForExport ,
            'Libelle long': this.searchEntiteAdministrative.libelleLong ? this.searchEntiteAdministrative.libelleLong : environment.emptyForExport ,
            'Description': this.searchEntiteAdministrative.description ? this.searchEntiteAdministrative.description : environment.emptyForExport ,
        'Type entite administrative': this.searchEntiteAdministrative.typeEntiteAdministrativeVo?.libelle ? this.searchEntiteAdministrative.typeEntiteAdministrativeVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchEntiteAdministrative.archive ? (this.searchEntiteAdministrative.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEntiteAdministrative.dateArchivageMin ? this.datePipe.transform(this.searchEntiteAdministrative.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEntiteAdministrative.dateArchivageMax ? this.datePipe.transform(this.searchEntiteAdministrative.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEntiteAdministrative.dateCreationMin ? this.datePipe.transform(this.searchEntiteAdministrative.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEntiteAdministrative.dateCreationMax ? this.datePipe.transform(this.searchEntiteAdministrative.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEntiteAdministrative.admin ? (this.searchEntiteAdministrative.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEntiteAdministrative.visible ? (this.searchEntiteAdministrative.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEntiteAdministrative.username ? this.searchEntiteAdministrative.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get entiteAdministratives(): Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministratives;
       }
    set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

    get entiteAdministrativeSelections(): Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministrativeSelections;
       }
    set entiteAdministrativeSelections(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministrativeSelections = value;
       }
   
     


    get selectedEntiteAdministrative():EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }
    
    get createEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.createEntiteAdministrativeDialog;
       }
    set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog= value;
       }
    
    get editEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.editEntiteAdministrativeDialog;
       }
    set editEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.editEntiteAdministrativeDialog= value;
       }
    get viewEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.viewEntiteAdministrativeDialog;
       }
    set viewEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.viewEntiteAdministrativeDialog = value;
       }
       
     get searchEntiteAdministrative(): EntiteAdministrativeVo {
        return this.entiteAdministrativeService.searchEntiteAdministrative;
       }
    set searchEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.searchEntiteAdministrative = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

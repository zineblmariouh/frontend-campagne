import {Component, OnInit} from '@angular/core';
import {StatusProjetService} from '../../../../../controller/service/StatusProjet.service';
import {StatusProjetVo} from '../../../../../controller/model/StatusProjet.model';
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
  selector: 'app-status-projet-list-chercheur',
  templateUrl: './status-projet-list-chercheur.component.html',
  styleUrls: ['./status-projet-list-chercheur.component.css']
})
export class StatusProjetListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatusProjet';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private statusProjetService: StatusProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadStatusProjets();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadStatusProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatusProjet', 'list');
        isPermistted ? this.statusProjetService.findAll().subscribe(statusProjets => this.statusProjets = statusProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statusProjetService.findByCriteria(this.searchStatusProjet).subscribe(statusProjets=>{
            
            this.statusProjets = statusProjets;
           // this.searchStatusProjet = new StatusProjetVo();
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
    
    public async editStatusProjet(statusProjet:StatusProjetVo){
        const isPermistted = await this.roleService.isPermitted('StatusProjet', 'edit');
         if(isPermistted){
          this.statusProjetService.findByIdWithAssociatedList(statusProjet).subscribe(res => {
           this.selectedStatusProjet = res;
            this.selectedStatusProjet.dateArchivage = new Date(statusProjet.dateArchivage);
            this.selectedStatusProjet.dateCreation = new Date(statusProjet.dateCreation);
            this.editStatusProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatusProjet(statusProjet:StatusProjetVo){
        const isPermistted = await this.roleService.isPermitted('StatusProjet', 'view');
        if(isPermistted){
           this.statusProjetService.findByIdWithAssociatedList(statusProjet).subscribe(res => {
           this.selectedStatusProjet = res;
            this.selectedStatusProjet.dateArchivage = new Date(statusProjet.dateArchivage);
            this.selectedStatusProjet.dateCreation = new Date(statusProjet.dateCreation);
            this.viewStatusProjetDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatusProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatusProjet = new StatusProjetVo();
            this.createStatusProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatusProjet(statusProjet:StatusProjetVo){
       const isPermistted = await this.roleService.isPermitted('StatusProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Status projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statusProjetService.delete(statusProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.statusProjets.indexOf(statusProjet);
                          position > -1 ? this.statusProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Status projet Supprimé',
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


public async duplicateStatusProjet(statusProjet: StatusProjetVo) {

     this.statusProjetService.findByIdWithAssociatedList(statusProjet).subscribe(
	 res => {
	       this.initDuplicateStatusProjet(res);
	       this.selectedStatusProjet = res;
	       this.selectedStatusProjet.id = null;
            this.createStatusProjetDialog = true;

});

	}

	initDuplicateStatusProjet(res: StatusProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.statusProjets.map(e => {
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
            'Libelle': this.searchStatusProjet.libelle ? this.searchStatusProjet.libelle : environment.emptyForExport ,
            'Code': this.searchStatusProjet.code ? this.searchStatusProjet.code : environment.emptyForExport ,
            'Archive': this.searchStatusProjet.archive ? (this.searchStatusProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchStatusProjet.dateArchivageMin ? this.datePipe.transform(this.searchStatusProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchStatusProjet.dateArchivageMax ? this.datePipe.transform(this.searchStatusProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchStatusProjet.dateCreationMin ? this.datePipe.transform(this.searchStatusProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchStatusProjet.dateCreationMax ? this.datePipe.transform(this.searchStatusProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchStatusProjet.admin ? (this.searchStatusProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchStatusProjet.visible ? (this.searchStatusProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchStatusProjet.username ? this.searchStatusProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statusProjets(): Array<StatusProjetVo> {
           return this.statusProjetService.statusProjets;
       }
    set statusProjets(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjets = value;
       }

    get statusProjetSelections(): Array<StatusProjetVo> {
           return this.statusProjetService.statusProjetSelections;
       }
    set statusProjetSelections(value: Array<StatusProjetVo>) {
        this.statusProjetService.statusProjetSelections = value;
       }
   
     


    get selectedStatusProjet():StatusProjetVo {
           return this.statusProjetService.selectedStatusProjet;
       }
    set selectedStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.selectedStatusProjet = value;
       }
    
    get createStatusProjetDialog():boolean {
           return this.statusProjetService.createStatusProjetDialog;
       }
    set createStatusProjetDialog(value: boolean) {
        this.statusProjetService.createStatusProjetDialog= value;
       }
    
    get editStatusProjetDialog():boolean {
           return this.statusProjetService.editStatusProjetDialog;
       }
    set editStatusProjetDialog(value: boolean) {
        this.statusProjetService.editStatusProjetDialog= value;
       }
    get viewStatusProjetDialog():boolean {
           return this.statusProjetService.viewStatusProjetDialog;
       }
    set viewStatusProjetDialog(value: boolean) {
        this.statusProjetService.viewStatusProjetDialog = value;
       }
       
     get searchStatusProjet(): StatusProjetVo {
        return this.statusProjetService.searchStatusProjet;
       }
    set searchStatusProjet(value: StatusProjetVo) {
        this.statusProjetService.searchStatusProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

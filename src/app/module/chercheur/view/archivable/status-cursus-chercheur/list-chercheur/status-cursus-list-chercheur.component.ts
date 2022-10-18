import {Component, OnInit} from '@angular/core';
import {StatusCursusService} from '../../../../../controller/service/StatusCursus.service';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
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
  selector: 'app-status-cursus-list-chercheur',
  templateUrl: './status-cursus-list-chercheur.component.html',
  styleUrls: ['./status-cursus-list-chercheur.component.css']
})
export class StatusCursusListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StatusCursus';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private statusCursusService: StatusCursusService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadStatusCursuss();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadStatusCursuss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'list');
        isPermistted ? this.statusCursusService.findAll().subscribe(statusCursuss => this.statusCursuss = statusCursuss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.statusCursusService.findByCriteria(this.searchStatusCursus).subscribe(statusCursuss=>{
            
            this.statusCursuss = statusCursuss;
           // this.searchStatusCursus = new StatusCursusVo();
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
    
    public async editStatusCursus(statusCursus:StatusCursusVo){
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'edit');
         if(isPermistted){
          this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(res => {
           this.selectedStatusCursus = res;
            this.selectedStatusCursus.dateArchivage = new Date(statusCursus.dateArchivage);
            this.selectedStatusCursus.dateCreation = new Date(statusCursus.dateCreation);
            this.editStatusCursusDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStatusCursus(statusCursus:StatusCursusVo){
        const isPermistted = await this.roleService.isPermitted('StatusCursus', 'view');
        if(isPermistted){
           this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(res => {
           this.selectedStatusCursus = res;
            this.selectedStatusCursus.dateArchivage = new Date(statusCursus.dateArchivage);
            this.selectedStatusCursus.dateCreation = new Date(statusCursus.dateCreation);
            this.viewStatusCursusDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStatusCursus(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStatusCursus = new StatusCursusVo();
            this.createStatusCursusDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStatusCursus(statusCursus:StatusCursusVo){
       const isPermistted = await this.roleService.isPermitted('StatusCursus', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Status cursus) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.statusCursusService.delete(statusCursus).subscribe(status=>{
                          if(status > 0){
                          const position = this.statusCursuss.indexOf(statusCursus);
                          position > -1 ? this.statusCursuss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Status cursus Supprimé',
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


public async duplicateStatusCursus(statusCursus: StatusCursusVo) {

     this.statusCursusService.findByIdWithAssociatedList(statusCursus).subscribe(
	 res => {
	       this.initDuplicateStatusCursus(res);
	       this.selectedStatusCursus = res;
	       this.selectedStatusCursus.id = null;
            this.createStatusCursusDialog = true;

});

	}

	initDuplicateStatusCursus(res: StatusCursusVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.statusCursuss.map(e => {
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
            'Libelle': this.searchStatusCursus.libelle ? this.searchStatusCursus.libelle : environment.emptyForExport ,
            'Code': this.searchStatusCursus.code ? this.searchStatusCursus.code : environment.emptyForExport ,
            'Archive': this.searchStatusCursus.archive ? (this.searchStatusCursus.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchStatusCursus.dateArchivageMin ? this.datePipe.transform(this.searchStatusCursus.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchStatusCursus.dateArchivageMax ? this.datePipe.transform(this.searchStatusCursus.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchStatusCursus.dateCreationMin ? this.datePipe.transform(this.searchStatusCursus.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchStatusCursus.dateCreationMax ? this.datePipe.transform(this.searchStatusCursus.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchStatusCursus.admin ? (this.searchStatusCursus.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchStatusCursus.visible ? (this.searchStatusCursus.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchStatusCursus.username ? this.searchStatusCursus.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get statusCursuss(): Array<StatusCursusVo> {
           return this.statusCursusService.statusCursuss;
       }
    set statusCursuss(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursuss = value;
       }

    get statusCursusSelections(): Array<StatusCursusVo> {
           return this.statusCursusService.statusCursusSelections;
       }
    set statusCursusSelections(value: Array<StatusCursusVo>) {
        this.statusCursusService.statusCursusSelections = value;
       }
   
     


    get selectedStatusCursus():StatusCursusVo {
           return this.statusCursusService.selectedStatusCursus;
       }
    set selectedStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.selectedStatusCursus = value;
       }
    
    get createStatusCursusDialog():boolean {
           return this.statusCursusService.createStatusCursusDialog;
       }
    set createStatusCursusDialog(value: boolean) {
        this.statusCursusService.createStatusCursusDialog= value;
       }
    
    get editStatusCursusDialog():boolean {
           return this.statusCursusService.editStatusCursusDialog;
       }
    set editStatusCursusDialog(value: boolean) {
        this.statusCursusService.editStatusCursusDialog= value;
       }
    get viewStatusCursusDialog():boolean {
           return this.statusCursusService.viewStatusCursusDialog;
       }
    set viewStatusCursusDialog(value: boolean) {
        this.statusCursusService.viewStatusCursusDialog = value;
       }
       
     get searchStatusCursus(): StatusCursusVo {
        return this.statusCursusService.searchStatusCursus;
       }
    set searchStatusCursus(value: StatusCursusVo) {
        this.statusCursusService.searchStatusCursus = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

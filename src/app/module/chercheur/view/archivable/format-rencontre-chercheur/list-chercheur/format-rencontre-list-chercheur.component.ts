import {Component, OnInit} from '@angular/core';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
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
  selector: 'app-format-rencontre-list-chercheur',
  templateUrl: './format-rencontre-list-chercheur.component.html',
  styleUrls: ['./format-rencontre-list-chercheur.component.css']
})
export class FormatRencontreListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormatRencontre';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private formatRencontreService: FormatRencontreService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadFormatRencontres();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadFormatRencontres(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'list');
        isPermistted ? this.formatRencontreService.findAll().subscribe(formatRencontres => this.formatRencontres = formatRencontres,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formatRencontreService.findByCriteria(this.searchFormatRencontre).subscribe(formatRencontres=>{
            
            this.formatRencontres = formatRencontres;
           // this.searchFormatRencontre = new FormatRencontreVo();
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
    
    public async editFormatRencontre(formatRencontre:FormatRencontreVo){
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'edit');
         if(isPermistted){
          this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(res => {
           this.selectedFormatRencontre = res;
            this.selectedFormatRencontre.dateArchivage = new Date(formatRencontre.dateArchivage);
            this.selectedFormatRencontre.dateCreation = new Date(formatRencontre.dateCreation);
            this.editFormatRencontreDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormatRencontre(formatRencontre:FormatRencontreVo){
        const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'view');
        if(isPermistted){
           this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(res => {
           this.selectedFormatRencontre = res;
            this.selectedFormatRencontre.dateArchivage = new Date(formatRencontre.dateArchivage);
            this.selectedFormatRencontre.dateCreation = new Date(formatRencontre.dateCreation);
            this.viewFormatRencontreDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormatRencontre(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormatRencontre = new FormatRencontreVo();
            this.createFormatRencontreDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormatRencontre(formatRencontre:FormatRencontreVo){
       const isPermistted = await this.roleService.isPermitted('FormatRencontre', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Format rencontre) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formatRencontreService.delete(formatRencontre).subscribe(status=>{
                          if(status > 0){
                          const position = this.formatRencontres.indexOf(formatRencontre);
                          position > -1 ? this.formatRencontres.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Format rencontre Supprimé',
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


public async duplicateFormatRencontre(formatRencontre: FormatRencontreVo) {

     this.formatRencontreService.findByIdWithAssociatedList(formatRencontre).subscribe(
	 res => {
	       this.initDuplicateFormatRencontre(res);
	       this.selectedFormatRencontre = res;
	       this.selectedFormatRencontre.id = null;
            this.createFormatRencontreDialog = true;

});

	}

	initDuplicateFormatRencontre(res: FormatRencontreVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formatRencontres.map(e => {
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
            'Libelle': this.searchFormatRencontre.libelle ? this.searchFormatRencontre.libelle : environment.emptyForExport ,
            'Code': this.searchFormatRencontre.code ? this.searchFormatRencontre.code : environment.emptyForExport ,
            'Archive': this.searchFormatRencontre.archive ? (this.searchFormatRencontre.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchFormatRencontre.dateArchivageMin ? this.datePipe.transform(this.searchFormatRencontre.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchFormatRencontre.dateArchivageMax ? this.datePipe.transform(this.searchFormatRencontre.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchFormatRencontre.dateCreationMin ? this.datePipe.transform(this.searchFormatRencontre.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchFormatRencontre.dateCreationMax ? this.datePipe.transform(this.searchFormatRencontre.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchFormatRencontre.admin ? (this.searchFormatRencontre.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchFormatRencontre.visible ? (this.searchFormatRencontre.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchFormatRencontre.username ? this.searchFormatRencontre.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formatRencontres(): Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontres;
       }
    set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }

    get formatRencontreSelections(): Array<FormatRencontreVo> {
           return this.formatRencontreService.formatRencontreSelections;
       }
    set formatRencontreSelections(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontreSelections = value;
       }
   
     


    get selectedFormatRencontre():FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }
    
    get createFormatRencontreDialog():boolean {
           return this.formatRencontreService.createFormatRencontreDialog;
       }
    set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
       }
    
    get editFormatRencontreDialog():boolean {
           return this.formatRencontreService.editFormatRencontreDialog;
       }
    set editFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.editFormatRencontreDialog= value;
       }
    get viewFormatRencontreDialog():boolean {
           return this.formatRencontreService.viewFormatRencontreDialog;
       }
    set viewFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.viewFormatRencontreDialog = value;
       }
       
     get searchFormatRencontre(): FormatRencontreVo {
        return this.formatRencontreService.searchFormatRencontre;
       }
    set searchFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.searchFormatRencontre = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

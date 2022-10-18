import {Component, OnInit} from '@angular/core';
import {PubliqueFormationService} from '../../../../../controller/service/PubliqueFormation.service';
import {PubliqueFormationVo} from '../../../../../controller/model/PubliqueFormation.model';
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
  selector: 'app-publique-formation-list-chercheur',
  templateUrl: './publique-formation-list-chercheur.component.html',
  styleUrls: ['./publique-formation-list-chercheur.component.css']
})
export class PubliqueFormationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PubliqueFormation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private publiqueFormationService: PubliqueFormationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadPubliqueFormations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPubliqueFormations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PubliqueFormation', 'list');
        isPermistted ? this.publiqueFormationService.findAll().subscribe(publiqueFormations => this.publiqueFormations = publiqueFormations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.publiqueFormationService.findByCriteria(this.searchPubliqueFormation).subscribe(publiqueFormations=>{
            
            this.publiqueFormations = publiqueFormations;
           // this.searchPubliqueFormation = new PubliqueFormationVo();
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
    
    public async editPubliqueFormation(publiqueFormation:PubliqueFormationVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueFormation', 'edit');
         if(isPermistted){
          this.publiqueFormationService.findByIdWithAssociatedList(publiqueFormation).subscribe(res => {
           this.selectedPubliqueFormation = res;
            this.selectedPubliqueFormation.dateArchivage = new Date(publiqueFormation.dateArchivage);
            this.selectedPubliqueFormation.dateCreation = new Date(publiqueFormation.dateCreation);
            this.editPubliqueFormationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPubliqueFormation(publiqueFormation:PubliqueFormationVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueFormation', 'view');
        if(isPermistted){
           this.publiqueFormationService.findByIdWithAssociatedList(publiqueFormation).subscribe(res => {
           this.selectedPubliqueFormation = res;
            this.selectedPubliqueFormation.dateArchivage = new Date(publiqueFormation.dateArchivage);
            this.selectedPubliqueFormation.dateCreation = new Date(publiqueFormation.dateCreation);
            this.viewPubliqueFormationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePubliqueFormation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPubliqueFormation = new PubliqueFormationVo();
            this.createPubliqueFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePubliqueFormation(publiqueFormation:PubliqueFormationVo){
       const isPermistted = await this.roleService.isPermitted('PubliqueFormation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Publique formation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.publiqueFormationService.delete(publiqueFormation).subscribe(status=>{
                          if(status > 0){
                          const position = this.publiqueFormations.indexOf(publiqueFormation);
                          position > -1 ? this.publiqueFormations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Publique formation Supprimé',
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


public async duplicatePubliqueFormation(publiqueFormation: PubliqueFormationVo) {

     this.publiqueFormationService.findByIdWithAssociatedList(publiqueFormation).subscribe(
	 res => {
	       this.initDuplicatePubliqueFormation(res);
	       this.selectedPubliqueFormation = res;
	       this.selectedPubliqueFormation.id = null;
            this.createPubliqueFormationDialog = true;

});

	}

	initDuplicatePubliqueFormation(res: PubliqueFormationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.publiqueFormations.map(e => {
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
            'Libelle': this.searchPubliqueFormation.libelle ? this.searchPubliqueFormation.libelle : environment.emptyForExport ,
            'Code': this.searchPubliqueFormation.code ? this.searchPubliqueFormation.code : environment.emptyForExport ,
            'Archive': this.searchPubliqueFormation.archive ? (this.searchPubliqueFormation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPubliqueFormation.dateArchivageMin ? this.datePipe.transform(this.searchPubliqueFormation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPubliqueFormation.dateArchivageMax ? this.datePipe.transform(this.searchPubliqueFormation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPubliqueFormation.dateCreationMin ? this.datePipe.transform(this.searchPubliqueFormation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPubliqueFormation.dateCreationMax ? this.datePipe.transform(this.searchPubliqueFormation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPubliqueFormation.admin ? (this.searchPubliqueFormation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPubliqueFormation.visible ? (this.searchPubliqueFormation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPubliqueFormation.username ? this.searchPubliqueFormation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get publiqueFormations(): Array<PubliqueFormationVo> {
           return this.publiqueFormationService.publiqueFormations;
       }
    set publiqueFormations(value: Array<PubliqueFormationVo>) {
        this.publiqueFormationService.publiqueFormations = value;
       }

    get publiqueFormationSelections(): Array<PubliqueFormationVo> {
           return this.publiqueFormationService.publiqueFormationSelections;
       }
    set publiqueFormationSelections(value: Array<PubliqueFormationVo>) {
        this.publiqueFormationService.publiqueFormationSelections = value;
       }
   
     


    get selectedPubliqueFormation():PubliqueFormationVo {
           return this.publiqueFormationService.selectedPubliqueFormation;
       }
    set selectedPubliqueFormation(value: PubliqueFormationVo) {
        this.publiqueFormationService.selectedPubliqueFormation = value;
       }
    
    get createPubliqueFormationDialog():boolean {
           return this.publiqueFormationService.createPubliqueFormationDialog;
       }
    set createPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.createPubliqueFormationDialog= value;
       }
    
    get editPubliqueFormationDialog():boolean {
           return this.publiqueFormationService.editPubliqueFormationDialog;
       }
    set editPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.editPubliqueFormationDialog= value;
       }
    get viewPubliqueFormationDialog():boolean {
           return this.publiqueFormationService.viewPubliqueFormationDialog;
       }
    set viewPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.viewPubliqueFormationDialog = value;
       }
       
     get searchPubliqueFormation(): PubliqueFormationVo {
        return this.publiqueFormationService.searchPubliqueFormation;
       }
    set searchPubliqueFormation(value: PubliqueFormationVo) {
        this.publiqueFormationService.searchPubliqueFormation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

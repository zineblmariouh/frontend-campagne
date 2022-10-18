import {Component, OnInit} from '@angular/core';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
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
  selector: 'app-financement-doctorant-list-chercheur',
  templateUrl: './financement-doctorant-list-chercheur.component.html',
  styleUrls: ['./financement-doctorant-list-chercheur.component.css']
})
export class FinancementDoctorantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FinancementDoctorant';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadFinancementDoctorants();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadFinancementDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'list');
        isPermistted ? this.financementDoctorantService.findAll().subscribe(financementDoctorants => this.financementDoctorants = financementDoctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.financementDoctorantService.findByCriteria(this.searchFinancementDoctorant).subscribe(financementDoctorants=>{
            
            this.financementDoctorants = financementDoctorants;
           // this.searchFinancementDoctorant = new FinancementDoctorantVo();
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
    
    public async editFinancementDoctorant(financementDoctorant:FinancementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'edit');
         if(isPermistted){
          this.financementDoctorantService.findByIdWithAssociatedList(financementDoctorant).subscribe(res => {
           this.selectedFinancementDoctorant = res;
            this.selectedFinancementDoctorant.dateArchivage = new Date(financementDoctorant.dateArchivage);
            this.selectedFinancementDoctorant.dateCreation = new Date(financementDoctorant.dateCreation);
            this.editFinancementDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFinancementDoctorant(financementDoctorant:FinancementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'view');
        if(isPermistted){
           this.financementDoctorantService.findByIdWithAssociatedList(financementDoctorant).subscribe(res => {
           this.selectedFinancementDoctorant = res;
            this.selectedFinancementDoctorant.dateArchivage = new Date(financementDoctorant.dateArchivage);
            this.selectedFinancementDoctorant.dateCreation = new Date(financementDoctorant.dateCreation);
            this.viewFinancementDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFinancementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFinancementDoctorant = new FinancementDoctorantVo();
            this.createFinancementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFinancementDoctorant(financementDoctorant:FinancementDoctorantVo){
       const isPermistted = await this.roleService.isPermitted('FinancementDoctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Financement doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.financementDoctorantService.delete(financementDoctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.financementDoctorants.indexOf(financementDoctorant);
                          position > -1 ? this.financementDoctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Financement doctorant Supprimé',
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


public async duplicateFinancementDoctorant(financementDoctorant: FinancementDoctorantVo) {

     this.financementDoctorantService.findByIdWithAssociatedList(financementDoctorant).subscribe(
	 res => {
	       this.initDuplicateFinancementDoctorant(res);
	       this.selectedFinancementDoctorant = res;
	       this.selectedFinancementDoctorant.id = null;
            this.createFinancementDoctorantDialog = true;

});

	}

	initDuplicateFinancementDoctorant(res: FinancementDoctorantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.financementDoctorants.map(e => {
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
            'Libelle': this.searchFinancementDoctorant.libelle ? this.searchFinancementDoctorant.libelle : environment.emptyForExport ,
            'Code': this.searchFinancementDoctorant.code ? this.searchFinancementDoctorant.code : environment.emptyForExport ,
            'Archive': this.searchFinancementDoctorant.archive ? (this.searchFinancementDoctorant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchFinancementDoctorant.dateArchivageMin ? this.datePipe.transform(this.searchFinancementDoctorant.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchFinancementDoctorant.dateArchivageMax ? this.datePipe.transform(this.searchFinancementDoctorant.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchFinancementDoctorant.dateCreationMin ? this.datePipe.transform(this.searchFinancementDoctorant.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchFinancementDoctorant.dateCreationMax ? this.datePipe.transform(this.searchFinancementDoctorant.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchFinancementDoctorant.admin ? (this.searchFinancementDoctorant.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchFinancementDoctorant.visible ? (this.searchFinancementDoctorant.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchFinancementDoctorant.username ? this.searchFinancementDoctorant.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get financementDoctorants(): Array<FinancementDoctorantVo> {
           return this.financementDoctorantService.financementDoctorants;
       }
    set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

    get financementDoctorantSelections(): Array<FinancementDoctorantVo> {
           return this.financementDoctorantService.financementDoctorantSelections;
       }
    set financementDoctorantSelections(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorantSelections = value;
       }
   
     


    get selectedFinancementDoctorant():FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }
    
    get createFinancementDoctorantDialog():boolean {
           return this.financementDoctorantService.createFinancementDoctorantDialog;
       }
    set createFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.createFinancementDoctorantDialog= value;
       }
    
    get editFinancementDoctorantDialog():boolean {
           return this.financementDoctorantService.editFinancementDoctorantDialog;
       }
    set editFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.editFinancementDoctorantDialog= value;
       }
    get viewFinancementDoctorantDialog():boolean {
           return this.financementDoctorantService.viewFinancementDoctorantDialog;
       }
    set viewFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.viewFinancementDoctorantDialog = value;
       }
       
     get searchFinancementDoctorant(): FinancementDoctorantVo {
        return this.financementDoctorantService.searchFinancementDoctorant;
       }
    set searchFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.searchFinancementDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

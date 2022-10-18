import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';
import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
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
  selector: 'app-categorie-faq-list-admin',
  templateUrl: './categorie-faq-list-admin.component.html',
  styleUrls: ['./categorie-faq-list-admin.component.css']
})
export class CategorieFaqListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieFaq';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private categorieFaqService: CategorieFaqService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCategorieFaqs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCategorieFaqs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'list');
        isPermistted ? this.categorieFaqService.findAll().subscribe(categorieFaqs => this.categorieFaqs = categorieFaqs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieFaqService.findByCriteria(this.searchCategorieFaq).subscribe(categorieFaqs=>{
            
            this.categorieFaqs = categorieFaqs;
           // this.searchCategorieFaq = new CategorieFaqVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'ordre', header: 'Ordre'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editCategorieFaq(categorieFaq:CategorieFaqVo){
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'edit');
         if(isPermistted){
          this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(res => {
           this.selectedCategorieFaq = res;
            this.selectedCategorieFaq.dateArchivage = new Date(categorieFaq.dateArchivage);
            this.selectedCategorieFaq.dateCreation = new Date(categorieFaq.dateCreation);
            this.editCategorieFaqDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieFaq(categorieFaq:CategorieFaqVo){
        const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'view');
        if(isPermistted){
           this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(res => {
           this.selectedCategorieFaq = res;
            this.selectedCategorieFaq.dateArchivage = new Date(categorieFaq.dateArchivage);
            this.selectedCategorieFaq.dateCreation = new Date(categorieFaq.dateCreation);
            this.viewCategorieFaqDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieFaq(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieFaq = new CategorieFaqVo();
            this.createCategorieFaqDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCategorieFaq(categorieFaq:CategorieFaqVo){
const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Categorie faq) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.categorieFaqService.archiver(categorieFaq).subscribe(status=>{
const myIndex = this.categorieFaqs.indexOf(categorieFaq);
this.categorieFaqs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Categorie faq archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverCategorieFaq(categorieFaq:CategorieFaqVo){
const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Categorie faq) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.categorieFaqService.desarchiver(categorieFaq).subscribe(status=>{
const myIndex = this.categorieFaqs.indexOf(categorieFaq);
this.categorieFaqs[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Categorie faq désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteCategorieFaq(categorieFaq:CategorieFaqVo){
       const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie faq) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieFaqService.delete(categorieFaq).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieFaqs.indexOf(categorieFaq);
                          position > -1 ? this.categorieFaqs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie faq Supprimé',
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


public async duplicateCategorieFaq(categorieFaq: CategorieFaqVo) {

     this.categorieFaqService.findByIdWithAssociatedList(categorieFaq).subscribe(
	 res => {
	       this.initDuplicateCategorieFaq(res);
	       this.selectedCategorieFaq = res;
	       this.selectedCategorieFaq.id = null;
            this.createCategorieFaqDialog = true;

});

	}

	initDuplicateCategorieFaq(res: CategorieFaqVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.categorieFaqs.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Ordre': e.ordre ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchCategorieFaq.libelle ? this.searchCategorieFaq.libelle : environment.emptyForExport ,
            'Ordre Min': this.searchCategorieFaq.ordreMin ? this.searchCategorieFaq.ordreMin : environment.emptyForExport ,
            'Ordre Max': this.searchCategorieFaq.ordreMax ? this.searchCategorieFaq.ordreMax : environment.emptyForExport ,
            'Archive': this.searchCategorieFaq.archive ? (this.searchCategorieFaq.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCategorieFaq.dateArchivageMin ? this.datePipe.transform(this.searchCategorieFaq.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCategorieFaq.dateArchivageMax ? this.datePipe.transform(this.searchCategorieFaq.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCategorieFaq.dateCreationMin ? this.datePipe.transform(this.searchCategorieFaq.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCategorieFaq.dateCreationMax ? this.datePipe.transform(this.searchCategorieFaq.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCategorieFaq.admin ? (this.searchCategorieFaq.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCategorieFaq.visible ? (this.searchCategorieFaq.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCategorieFaq.username ? this.searchCategorieFaq.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categorieFaqs(): Array<CategorieFaqVo> {
           return this.categorieFaqService.categorieFaqs;
       }
    set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }

    get categorieFaqSelections(): Array<CategorieFaqVo> {
           return this.categorieFaqService.categorieFaqSelections;
       }
    set categorieFaqSelections(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqSelections = value;
       }
   
     


    get selectedCategorieFaq():CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }
    
    get createCategorieFaqDialog():boolean {
           return this.categorieFaqService.createCategorieFaqDialog;
       }
    set createCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.createCategorieFaqDialog= value;
       }
    
    get editCategorieFaqDialog():boolean {
           return this.categorieFaqService.editCategorieFaqDialog;
       }
    set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog= value;
       }
    get viewCategorieFaqDialog():boolean {
           return this.categorieFaqService.viewCategorieFaqDialog;
       }
    set viewCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.viewCategorieFaqDialog = value;
       }
       
     get searchCategorieFaq(): CategorieFaqVo {
        return this.categorieFaqService.searchCategorieFaq;
       }
    set searchCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.searchCategorieFaq = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

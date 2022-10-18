import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
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
  selector: 'app-objet-formation-generique-list-admin',
  templateUrl: './objet-formation-generique-list-admin.component.html',
  styleUrls: ['./objet-formation-generique-list-admin.component.css']
})
export class ObjetFormationGeneriqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ObjetFormationGenerique';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadObjetFormationGeneriques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadObjetFormationGeneriques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'list');
        isPermistted ? this.objetFormationGeneriqueService.findAll().subscribe(objetFormationGeneriques => this.objetFormationGeneriques = objetFormationGeneriques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.objetFormationGeneriqueService.findByCriteria(this.searchObjetFormationGenerique).subscribe(objetFormationGeneriques=>{
            
            this.objetFormationGeneriques = objetFormationGeneriques;
           // this.searchObjetFormationGenerique = new ObjetFormationGeneriqueVo();
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
    
    public async editObjetFormationGenerique(objetFormationGenerique:ObjetFormationGeneriqueVo){
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'edit');
         if(isPermistted){
          this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(res => {
           this.selectedObjetFormationGenerique = res;
            this.selectedObjetFormationGenerique.dateArchivage = new Date(objetFormationGenerique.dateArchivage);
            this.selectedObjetFormationGenerique.dateCreation = new Date(objetFormationGenerique.dateCreation);
            this.editObjetFormationGeneriqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewObjetFormationGenerique(objetFormationGenerique:ObjetFormationGeneriqueVo){
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'view');
        if(isPermistted){
           this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(res => {
           this.selectedObjetFormationGenerique = res;
            this.selectedObjetFormationGenerique.dateArchivage = new Date(objetFormationGenerique.dateArchivage);
            this.selectedObjetFormationGenerique.dateCreation = new Date(objetFormationGenerique.dateCreation);
            this.viewObjetFormationGeneriqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateObjetFormationGenerique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
            this.createObjetFormationGeneriqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverObjetFormationGenerique(objetFormationGenerique:ObjetFormationGeneriqueVo){
const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Objet formation generique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.objetFormationGeneriqueService.archiver(objetFormationGenerique).subscribe(status=>{
const myIndex = this.objetFormationGeneriques.indexOf(objetFormationGenerique);
this.objetFormationGeneriques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Objet formation generique archivé',
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

public async desarchiverObjetFormationGenerique(objetFormationGenerique:ObjetFormationGeneriqueVo){
const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Objet formation generique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.objetFormationGeneriqueService.desarchiver(objetFormationGenerique).subscribe(status=>{
const myIndex = this.objetFormationGeneriques.indexOf(objetFormationGenerique);
this.objetFormationGeneriques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Objet formation generique désarchivé',
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


    public async deleteObjetFormationGenerique(objetFormationGenerique:ObjetFormationGeneriqueVo){
       const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Objet formation generique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.objetFormationGeneriqueService.delete(objetFormationGenerique).subscribe(status=>{
                          if(status > 0){
                          const position = this.objetFormationGeneriques.indexOf(objetFormationGenerique);
                          position > -1 ? this.objetFormationGeneriques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Objet formation generique Supprimé',
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


public async duplicateObjetFormationGenerique(objetFormationGenerique: ObjetFormationGeneriqueVo) {

     this.objetFormationGeneriqueService.findByIdWithAssociatedList(objetFormationGenerique).subscribe(
	 res => {
	       this.initDuplicateObjetFormationGenerique(res);
	       this.selectedObjetFormationGenerique = res;
	       this.selectedObjetFormationGenerique.id = null;
            this.createObjetFormationGeneriqueDialog = true;

});

	}

	initDuplicateObjetFormationGenerique(res: ObjetFormationGeneriqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.objetFormationGeneriques.map(e => {
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
            'Libelle': this.searchObjetFormationGenerique.libelle ? this.searchObjetFormationGenerique.libelle : environment.emptyForExport ,
            'Code': this.searchObjetFormationGenerique.code ? this.searchObjetFormationGenerique.code : environment.emptyForExport ,
            'Archive': this.searchObjetFormationGenerique.archive ? (this.searchObjetFormationGenerique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchObjetFormationGenerique.dateArchivageMin ? this.datePipe.transform(this.searchObjetFormationGenerique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchObjetFormationGenerique.dateArchivageMax ? this.datePipe.transform(this.searchObjetFormationGenerique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchObjetFormationGenerique.dateCreationMin ? this.datePipe.transform(this.searchObjetFormationGenerique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchObjetFormationGenerique.dateCreationMax ? this.datePipe.transform(this.searchObjetFormationGenerique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchObjetFormationGenerique.admin ? (this.searchObjetFormationGenerique.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchObjetFormationGenerique.visible ? (this.searchObjetFormationGenerique.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchObjetFormationGenerique.username ? this.searchObjetFormationGenerique.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
    set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }

    get objetFormationGeneriqueSelections(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriqueSelections;
       }
    set objetFormationGeneriqueSelections(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriqueSelections = value;
       }
   
     


    get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
    
    get createObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
    set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
       }
    
    get editObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
       }
    set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog= value;
       }
    get viewObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog;
       }
    set viewObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog = value;
       }
       
     get searchObjetFormationGenerique(): ObjetFormationGeneriqueVo {
        return this.objetFormationGeneriqueService.searchObjetFormationGenerique;
       }
    set searchObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.searchObjetFormationGenerique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

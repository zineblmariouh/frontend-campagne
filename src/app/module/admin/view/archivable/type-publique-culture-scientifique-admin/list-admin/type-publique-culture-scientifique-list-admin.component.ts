import {Component, OnInit} from '@angular/core';
import {TypePubliqueCultureScientifiqueService} from '../../../../../controller/service/TypePubliqueCultureScientifique.service';
import {TypePubliqueCultureScientifiqueVo} from '../../../../../controller/model/TypePubliqueCultureScientifique.model';
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
  selector: 'app-type-publique-culture-scientifique-list-admin',
  templateUrl: './type-publique-culture-scientifique-list-admin.component.html',
  styleUrls: ['./type-publique-culture-scientifique-list-admin.component.css']
})
export class TypePubliqueCultureScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePubliqueCultureScientifique';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typePubliqueCultureScientifiqueService: TypePubliqueCultureScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypePubliqueCultureScientifiques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypePubliqueCultureScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'list');
        isPermistted ? this.typePubliqueCultureScientifiqueService.findAll().subscribe(typePubliqueCultureScientifiques => this.typePubliqueCultureScientifiques = typePubliqueCultureScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePubliqueCultureScientifiqueService.findByCriteria(this.searchTypePubliqueCultureScientifique).subscribe(typePubliqueCultureScientifiques=>{
            
            this.typePubliqueCultureScientifiques = typePubliqueCultureScientifiques;
           // this.searchTypePubliqueCultureScientifique = new TypePubliqueCultureScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTypePubliqueCultureScientifique(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'edit');
         if(isPermistted){
          this.typePubliqueCultureScientifiqueService.findByIdWithAssociatedList(typePubliqueCultureScientifique).subscribe(res => {
           this.selectedTypePubliqueCultureScientifique = res;
            this.selectedTypePubliqueCultureScientifique.dateArchivage = new Date(typePubliqueCultureScientifique.dateArchivage);
            this.selectedTypePubliqueCultureScientifique.dateCreation = new Date(typePubliqueCultureScientifique.dateCreation);
            this.editTypePubliqueCultureScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePubliqueCultureScientifique(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'view');
        if(isPermistted){
           this.typePubliqueCultureScientifiqueService.findByIdWithAssociatedList(typePubliqueCultureScientifique).subscribe(res => {
           this.selectedTypePubliqueCultureScientifique = res;
            this.selectedTypePubliqueCultureScientifique.dateArchivage = new Date(typePubliqueCultureScientifique.dateArchivage);
            this.selectedTypePubliqueCultureScientifique.dateCreation = new Date(typePubliqueCultureScientifique.dateCreation);
            this.viewTypePubliqueCultureScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePubliqueCultureScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePubliqueCultureScientifique = new TypePubliqueCultureScientifiqueVo();
            this.createTypePubliqueCultureScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverTypePubliqueCultureScientifique(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo){
const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Type publique culture scientifique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typePubliqueCultureScientifiqueService.archiver(typePubliqueCultureScientifique).subscribe(status=>{
const myIndex = this.typePubliqueCultureScientifiques.indexOf(typePubliqueCultureScientifique);
this.typePubliqueCultureScientifiques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type publique culture scientifique archivé',
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

public async desarchiverTypePubliqueCultureScientifique(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo){
const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Type publique culture scientifique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.typePubliqueCultureScientifiqueService.desarchiver(typePubliqueCultureScientifique).subscribe(status=>{
const myIndex = this.typePubliqueCultureScientifiques.indexOf(typePubliqueCultureScientifique);
this.typePubliqueCultureScientifiques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Type publique culture scientifique désarchivé',
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


    public async deleteTypePubliqueCultureScientifique(typePubliqueCultureScientifique:TypePubliqueCultureScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('TypePubliqueCultureScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type publique culture scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePubliqueCultureScientifiqueService.delete(typePubliqueCultureScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePubliqueCultureScientifiques.indexOf(typePubliqueCultureScientifique);
                          position > -1 ? this.typePubliqueCultureScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type publique culture scientifique Supprimé',
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


public async duplicateTypePubliqueCultureScientifique(typePubliqueCultureScientifique: TypePubliqueCultureScientifiqueVo) {

     this.typePubliqueCultureScientifiqueService.findByIdWithAssociatedList(typePubliqueCultureScientifique).subscribe(
	 res => {
	       this.initDuplicateTypePubliqueCultureScientifique(res);
	       this.selectedTypePubliqueCultureScientifique = res;
	       this.selectedTypePubliqueCultureScientifique.id = null;
            this.createTypePubliqueCultureScientifiqueDialog = true;

});

	}

	initDuplicateTypePubliqueCultureScientifique(res: TypePubliqueCultureScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typePubliqueCultureScientifiques.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypePubliqueCultureScientifique.code ? this.searchTypePubliqueCultureScientifique.code : environment.emptyForExport ,
            'Libelle': this.searchTypePubliqueCultureScientifique.libelle ? this.searchTypePubliqueCultureScientifique.libelle : environment.emptyForExport ,
            'Archive': this.searchTypePubliqueCultureScientifique.archive ? (this.searchTypePubliqueCultureScientifique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypePubliqueCultureScientifique.dateArchivageMin ? this.datePipe.transform(this.searchTypePubliqueCultureScientifique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypePubliqueCultureScientifique.dateArchivageMax ? this.datePipe.transform(this.searchTypePubliqueCultureScientifique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypePubliqueCultureScientifique.dateCreationMin ? this.datePipe.transform(this.searchTypePubliqueCultureScientifique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypePubliqueCultureScientifique.dateCreationMax ? this.datePipe.transform(this.searchTypePubliqueCultureScientifique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypePubliqueCultureScientifique.admin ? (this.searchTypePubliqueCultureScientifique.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypePubliqueCultureScientifique.visible ? (this.searchTypePubliqueCultureScientifique.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypePubliqueCultureScientifique.username ? this.searchTypePubliqueCultureScientifique.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePubliqueCultureScientifiques(): Array<TypePubliqueCultureScientifiqueVo> {
           return this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques;
       }
    set typePubliqueCultureScientifiques(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques = value;
       }

    get typePubliqueCultureScientifiqueSelections(): Array<TypePubliqueCultureScientifiqueVo> {
           return this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiqueSelections;
       }
    set typePubliqueCultureScientifiqueSelections(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiqueSelections = value;
       }
   
     


    get selectedTypePubliqueCultureScientifique():TypePubliqueCultureScientifiqueVo {
           return this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique;
       }
    set selectedTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique = value;
       }
    
    get createTypePubliqueCultureScientifiqueDialog():boolean {
           return this.typePubliqueCultureScientifiqueService.createTypePubliqueCultureScientifiqueDialog;
       }
    set createTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.createTypePubliqueCultureScientifiqueDialog= value;
       }
    
    get editTypePubliqueCultureScientifiqueDialog():boolean {
           return this.typePubliqueCultureScientifiqueService.editTypePubliqueCultureScientifiqueDialog;
       }
    set editTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.editTypePubliqueCultureScientifiqueDialog= value;
       }
    get viewTypePubliqueCultureScientifiqueDialog():boolean {
           return this.typePubliqueCultureScientifiqueService.viewTypePubliqueCultureScientifiqueDialog;
       }
    set viewTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.viewTypePubliqueCultureScientifiqueDialog = value;
       }
       
     get searchTypePubliqueCultureScientifique(): TypePubliqueCultureScientifiqueVo {
        return this.typePubliqueCultureScientifiqueService.searchTypePubliqueCultureScientifique;
       }
    set searchTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this.typePubliqueCultureScientifiqueService.searchTypePubliqueCultureScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

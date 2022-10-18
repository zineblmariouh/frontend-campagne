import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireService} from '../../../../../controller/service/EtablissementPartenaire.service';
import {EtablissementPartenaireVo} from '../../../../../controller/model/EtablissementPartenaire.model';
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
  selector: 'app-etablissement-partenaire-list-admin',
  templateUrl: './etablissement-partenaire-list-admin.component.html',
  styleUrls: ['./etablissement-partenaire-list-admin.component.css']
})
export class EtablissementPartenaireListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementPartenaire';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtablissementPartenaires();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtablissementPartenaires(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'list');
        isPermistted ? this.etablissementPartenaireService.findAll().subscribe(etablissementPartenaires => this.etablissementPartenaires = etablissementPartenaires,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementPartenaireService.findByCriteria(this.searchEtablissementPartenaire).subscribe(etablissementPartenaires=>{
            
            this.etablissementPartenaires = etablissementPartenaires;
           // this.searchEtablissementPartenaire = new EtablissementPartenaireVo();
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
    
    public async editEtablissementPartenaire(etablissementPartenaire:EtablissementPartenaireVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'edit');
         if(isPermistted){
          this.etablissementPartenaireService.findByIdWithAssociatedList(etablissementPartenaire).subscribe(res => {
           this.selectedEtablissementPartenaire = res;
            this.selectedEtablissementPartenaire.dateArchivage = new Date(etablissementPartenaire.dateArchivage);
            this.selectedEtablissementPartenaire.dateCreation = new Date(etablissementPartenaire.dateCreation);
            this.editEtablissementPartenaireDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementPartenaire(etablissementPartenaire:EtablissementPartenaireVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'view');
        if(isPermistted){
           this.etablissementPartenaireService.findByIdWithAssociatedList(etablissementPartenaire).subscribe(res => {
           this.selectedEtablissementPartenaire = res;
            this.selectedEtablissementPartenaire.dateArchivage = new Date(etablissementPartenaire.dateArchivage);
            this.selectedEtablissementPartenaire.dateCreation = new Date(etablissementPartenaire.dateCreation);
            this.viewEtablissementPartenaireDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementPartenaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementPartenaire = new EtablissementPartenaireVo();
            this.createEtablissementPartenaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEtablissementPartenaire(etablissementPartenaire:EtablissementPartenaireVo){
const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Etablissement partenaire) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etablissementPartenaireService.archiver(etablissementPartenaire).subscribe(status=>{
const myIndex = this.etablissementPartenaires.indexOf(etablissementPartenaire);
this.etablissementPartenaires[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etablissement partenaire archivé',
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

public async desarchiverEtablissementPartenaire(etablissementPartenaire:EtablissementPartenaireVo){
const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Etablissement partenaire) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etablissementPartenaireService.desarchiver(etablissementPartenaire).subscribe(status=>{
const myIndex = this.etablissementPartenaires.indexOf(etablissementPartenaire);
this.etablissementPartenaires[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etablissement partenaire désarchivé',
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


    public async deleteEtablissementPartenaire(etablissementPartenaire:EtablissementPartenaireVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementPartenaire', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement partenaire) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementPartenaireService.delete(etablissementPartenaire).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementPartenaires.indexOf(etablissementPartenaire);
                          position > -1 ? this.etablissementPartenaires.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement partenaire Supprimé',
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


public async duplicateEtablissementPartenaire(etablissementPartenaire: EtablissementPartenaireVo) {

     this.etablissementPartenaireService.findByIdWithAssociatedList(etablissementPartenaire).subscribe(
	 res => {
	       this.initDuplicateEtablissementPartenaire(res);
	       this.selectedEtablissementPartenaire = res;
	       this.selectedEtablissementPartenaire.id = null;
            this.createEtablissementPartenaireDialog = true;

});

	}

	initDuplicateEtablissementPartenaire(res: EtablissementPartenaireVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementPartenaires.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtablissementPartenaire.libelle ? this.searchEtablissementPartenaire.libelle : environment.emptyForExport ,
            'Code': this.searchEtablissementPartenaire.code ? this.searchEtablissementPartenaire.code : environment.emptyForExport ,
            'Description': this.searchEtablissementPartenaire.description ? this.searchEtablissementPartenaire.description : environment.emptyForExport ,
            'Archive': this.searchEtablissementPartenaire.archive ? (this.searchEtablissementPartenaire.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtablissementPartenaire.dateArchivageMin ? this.datePipe.transform(this.searchEtablissementPartenaire.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtablissementPartenaire.dateArchivageMax ? this.datePipe.transform(this.searchEtablissementPartenaire.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtablissementPartenaire.dateCreationMin ? this.datePipe.transform(this.searchEtablissementPartenaire.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtablissementPartenaire.dateCreationMax ? this.datePipe.transform(this.searchEtablissementPartenaire.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtablissementPartenaire.admin ? (this.searchEtablissementPartenaire.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtablissementPartenaire.visible ? (this.searchEtablissementPartenaire.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtablissementPartenaire.username ? this.searchEtablissementPartenaire.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
           return this.etablissementPartenaireService.etablissementPartenaires;
       }
    set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
       }

    get etablissementPartenaireSelections(): Array<EtablissementPartenaireVo> {
           return this.etablissementPartenaireService.etablissementPartenaireSelections;
       }
    set etablissementPartenaireSelections(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaireSelections = value;
       }
   
     


    get selectedEtablissementPartenaire():EtablissementPartenaireVo {
           return this.etablissementPartenaireService.selectedEtablissementPartenaire;
       }
    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
       }
    
    get createEtablissementPartenaireDialog():boolean {
           return this.etablissementPartenaireService.createEtablissementPartenaireDialog;
       }
    set createEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.createEtablissementPartenaireDialog= value;
       }
    
    get editEtablissementPartenaireDialog():boolean {
           return this.etablissementPartenaireService.editEtablissementPartenaireDialog;
       }
    set editEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.editEtablissementPartenaireDialog= value;
       }
    get viewEtablissementPartenaireDialog():boolean {
           return this.etablissementPartenaireService.viewEtablissementPartenaireDialog;
       }
    set viewEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.viewEtablissementPartenaireDialog = value;
       }
       
     get searchEtablissementPartenaire(): EtablissementPartenaireVo {
        return this.etablissementPartenaireService.searchEtablissementPartenaire;
       }
    set searchEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.searchEtablissementPartenaire = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

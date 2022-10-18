import {Component, OnInit} from '@angular/core';
import {DoctorantService} from '../../../../../controller/service/Doctorant.service';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { SexeService } from '../../../../../controller/service/Sexe.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-doctorant-list-admin',
  templateUrl: './doctorant-list-admin.component.html',
  styleUrls: ['./doctorant-list-admin.component.css']
})
export class DoctorantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Doctorant';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    sexes :Array<SexeVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private doctorantService: DoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private sexeService: SexeService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadDoctorants();
      this.initExport();
      this.initCol();
      this.loadSexe();
      this.loadPays();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
        isPermistted ? this.doctorantService.findAll().subscribe(doctorants => this.doctorants = doctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.doctorantService.findByCriteria(this.searchDoctorant).subscribe(doctorants=>{
            
            this.doctorants = doctorants;
           // this.searchDoctorant = new DoctorantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nom', header: 'Nom'},
                            {field: 'prenom', header: 'Prenom'},
                        {field: 'sexe?.libelle', header: 'Sexe'},
                            {field: 'civilite', header: 'Civilite'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'anneeNaissance', header: 'Annee naissance'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDoctorant(doctorant:DoctorantVo){
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'edit');
         if(isPermistted){
          this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(res => {
           this.selectedDoctorant = res;
            this.selectedDoctorant.dateArchivage = new Date(doctorant.dateArchivage);
            this.selectedDoctorant.dateCreation = new Date(doctorant.dateCreation);
            this.editDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDoctorant(doctorant:DoctorantVo){
        const isPermistted = await this.roleService.isPermitted('Doctorant', 'view');
        if(isPermistted){
           this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(res => {
           this.selectedDoctorant = res;
            this.selectedDoctorant.dateArchivage = new Date(doctorant.dateArchivage);
            this.selectedDoctorant.dateCreation = new Date(doctorant.dateCreation);
            this.viewDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDoctorant = new DoctorantVo();
            this.createDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverDoctorant(doctorant:DoctorantVo){
const isPermistted = await this.roleService.isPermitted('Doctorant', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Doctorant) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.doctorantService.archiver(doctorant).subscribe(status=>{
const myIndex = this.doctorants.indexOf(doctorant);
this.doctorants[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Doctorant archivé',
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

public async desarchiverDoctorant(doctorant:DoctorantVo){
const isPermistted = await this.roleService.isPermitted('Doctorant', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Doctorant) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.doctorantService.desarchiver(doctorant).subscribe(status=>{
const myIndex = this.doctorants.indexOf(doctorant);
this.doctorants[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Doctorant désarchivé',
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


    public async deleteDoctorant(doctorant:DoctorantVo){
       const isPermistted = await this.roleService.isPermitted('Doctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.doctorantService.delete(doctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.doctorants.indexOf(doctorant);
                          position > -1 ? this.doctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Doctorant Supprimé',
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

public async loadSexe(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
    isPermistted ? this.sexeService.findAll().subscribe(sexes => this.sexes = sexes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Doctorant', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDoctorant(doctorant: DoctorantVo) {

     this.doctorantService.findByIdWithAssociatedList(doctorant).subscribe(
	 res => {
	       this.initDuplicateDoctorant(res);
	       this.selectedDoctorant = res;
	       this.selectedDoctorant.id = null;
            this.createDoctorantDialog = true;

});

	}

	initDuplicateDoctorant(res: DoctorantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.doctorants.map(e => {
    return {
                    'Nom': e.nom ,
                    'Prenom': e.prenom ,
            'Sexe': e.sexeVo?.libelle ,
                    'Civilite': e.civilite ,
            'Pays': e.paysVo?.libelle ,
                    'Annee naissance': e.anneeNaissance ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Nom': this.searchDoctorant.nom ? this.searchDoctorant.nom : environment.emptyForExport ,
            'Prenom': this.searchDoctorant.prenom ? this.searchDoctorant.prenom : environment.emptyForExport ,
        'Sexe': this.searchDoctorant.sexeVo?.libelle ? this.searchDoctorant.sexeVo?.libelle : environment.emptyForExport ,
            'Civilite': this.searchDoctorant.civilite ? this.searchDoctorant.civilite : environment.emptyForExport ,
        'Pays': this.searchDoctorant.paysVo?.libelle ? this.searchDoctorant.paysVo?.libelle : environment.emptyForExport ,
            'Annee naissance Min': this.searchDoctorant.anneeNaissanceMin ? this.searchDoctorant.anneeNaissanceMin : environment.emptyForExport ,
            'Annee naissance Max': this.searchDoctorant.anneeNaissanceMax ? this.searchDoctorant.anneeNaissanceMax : environment.emptyForExport ,
            'Archive': this.searchDoctorant.archive ? (this.searchDoctorant.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDoctorant.dateArchivageMin ? this.datePipe.transform(this.searchDoctorant.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDoctorant.dateArchivageMax ? this.datePipe.transform(this.searchDoctorant.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDoctorant.dateCreationMin ? this.datePipe.transform(this.searchDoctorant.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDoctorant.dateCreationMax ? this.datePipe.transform(this.searchDoctorant.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDoctorant.admin ? (this.searchDoctorant.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDoctorant.visible ? (this.searchDoctorant.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDoctorant.username ? this.searchDoctorant.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get doctorants(): Array<DoctorantVo> {
           return this.doctorantService.doctorants;
       }
    set doctorants(value: Array<DoctorantVo>) {
        this.doctorantService.doctorants = value;
       }

    get doctorantSelections(): Array<DoctorantVo> {
           return this.doctorantService.doctorantSelections;
       }
    set doctorantSelections(value: Array<DoctorantVo>) {
        this.doctorantService.doctorantSelections = value;
       }
   
     


    get selectedDoctorant():DoctorantVo {
           return this.doctorantService.selectedDoctorant;
       }
    set selectedDoctorant(value: DoctorantVo) {
        this.doctorantService.selectedDoctorant = value;
       }
    
    get createDoctorantDialog():boolean {
           return this.doctorantService.createDoctorantDialog;
       }
    set createDoctorantDialog(value: boolean) {
        this.doctorantService.createDoctorantDialog= value;
       }
    
    get editDoctorantDialog():boolean {
           return this.doctorantService.editDoctorantDialog;
       }
    set editDoctorantDialog(value: boolean) {
        this.doctorantService.editDoctorantDialog= value;
       }
    get viewDoctorantDialog():boolean {
           return this.doctorantService.viewDoctorantDialog;
       }
    set viewDoctorantDialog(value: boolean) {
        this.doctorantService.viewDoctorantDialog = value;
       }
       
     get searchDoctorant(): DoctorantVo {
        return this.doctorantService.searchDoctorant;
       }
    set searchDoctorant(value: DoctorantVo) {
        this.doctorantService.searchDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

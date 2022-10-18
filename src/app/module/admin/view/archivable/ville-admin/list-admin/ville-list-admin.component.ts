import {Component, OnInit} from '@angular/core';
import {VilleService} from '../../../../../controller/service/Ville.service';
import {VilleVo} from '../../../../../controller/model/Ville.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';

import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-ville-list-admin',
  templateUrl: './ville-list-admin.component.html',
  styleUrls: ['./ville-list-admin.component.css']
})
export class VilleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Ville';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private villeService: VilleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadVilles();
      this.initExport();
      this.initCol();
      this.loadPays();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadVilles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ville', 'list');
        isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.villeService.findByCriteria(this.searchVille).subscribe(villes=>{
            
            this.villes = villes;
           // this.searchVille = new VilleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editVille(ville:VilleVo){
        const isPermistted = await this.roleService.isPermitted('Ville', 'edit');
         if(isPermistted){
          this.villeService.findByIdWithAssociatedList(ville).subscribe(res => {
           this.selectedVille = res;
            this.selectedVille.dateArchivage = new Date(ville.dateArchivage);
            this.selectedVille.dateCreation = new Date(ville.dateCreation);
            this.editVilleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewVille(ville:VilleVo){
        const isPermistted = await this.roleService.isPermitted('Ville', 'view');
        if(isPermistted){
           this.villeService.findByIdWithAssociatedList(ville).subscribe(res => {
           this.selectedVille = res;
            this.selectedVille.dateArchivage = new Date(ville.dateArchivage);
            this.selectedVille.dateCreation = new Date(ville.dateCreation);
            this.viewVilleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateVille(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedVille = new VilleVo();
            this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverVille(ville:VilleVo){
const isPermistted = await this.roleService.isPermitted('Ville', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Ville) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.villeService.archiver(ville).subscribe(status=>{
const myIndex = this.villes.indexOf(ville);
this.villes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Ville archivé',
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

public async desarchiverVille(ville:VilleVo){
const isPermistted = await this.roleService.isPermitted('Ville', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Ville) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.villeService.desarchiver(ville).subscribe(status=>{
const myIndex = this.villes.indexOf(ville);
this.villes[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Ville désarchivé',
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


    public async deleteVille(ville:VilleVo){
       const isPermistted = await this.roleService.isPermitted('Ville', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Ville) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.villeService.delete(ville).subscribe(status=>{
                          if(status > 0){
                          const position = this.villes.indexOf(ville);
                          position > -1 ? this.villes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Ville Supprimé',
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

public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Ville', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateVille(ville: VilleVo) {

     this.villeService.findByIdWithAssociatedList(ville).subscribe(
	 res => {
	       this.initDuplicateVille(res);
	       this.selectedVille = res;
	       this.selectedVille.id = null;
            this.createVilleDialog = true;

});

	}

	initDuplicateVille(res: VilleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.villes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
            'Pays': e.paysVo?.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchVille.libelle ? this.searchVille.libelle : environment.emptyForExport ,
            'Code': this.searchVille.code ? this.searchVille.code : environment.emptyForExport ,
        'Pays': this.searchVille.paysVo?.libelle ? this.searchVille.paysVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchVille.archive ? (this.searchVille.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchVille.dateArchivageMin ? this.datePipe.transform(this.searchVille.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchVille.dateArchivageMax ? this.datePipe.transform(this.searchVille.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchVille.dateCreationMin ? this.datePipe.transform(this.searchVille.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchVille.dateCreationMax ? this.datePipe.transform(this.searchVille.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchVille.admin ? (this.searchVille.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchVille.visible ? (this.searchVille.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchVille.username ? this.searchVille.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
    set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }

    get villeSelections(): Array<VilleVo> {
           return this.villeService.villeSelections;
       }
    set villeSelections(value: Array<VilleVo>) {
        this.villeService.villeSelections = value;
       }
   
     


    get selectedVille():VilleVo {
           return this.villeService.selectedVille;
       }
    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
    
    get createVilleDialog():boolean {
           return this.villeService.createVilleDialog;
       }
    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
    
    get editVilleDialog():boolean {
           return this.villeService.editVilleDialog;
       }
    set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog= value;
       }
    get viewVilleDialog():boolean {
           return this.villeService.viewVilleDialog;
       }
    set viewVilleDialog(value: boolean) {
        this.villeService.viewVilleDialog = value;
       }
       
     get searchVille(): VilleVo {
        return this.villeService.searchVille;
       }
    set searchVille(value: VilleVo) {
        this.villeService.searchVille = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

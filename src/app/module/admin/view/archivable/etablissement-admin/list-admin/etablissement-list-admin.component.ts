import {Component, OnInit} from '@angular/core';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { VilleService } from '../../../../../controller/service/Ville.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {VilleVo} from '../../../../../controller/model/Ville.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etablissement-list-admin',
  templateUrl: './etablissement-list-admin.component.html',
  styleUrls: ['./etablissement-list-admin.component.css']
})
export class EtablissementListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Etablissement';
     yesOrNoValide :any[] =[];
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    villes :Array<VilleVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private etablissementService: EtablissementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadEtablissements();
      this.initExport();
      this.initCol();
      this.loadVille();
      this.loadPays();
    this.yesOrNoValide =  [{label: 'Valide', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEtablissements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Etablissement', 'list');
        isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementService.findByCriteria(this.searchEtablissement).subscribe(etablissements=>{
            
            this.etablissements = etablissements;
           // this.searchEtablissement = new EtablissementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'sigleOfficiel', header: 'Sigle officiel'},
                            {field: 'nomEnFrancais', header: 'Nom en francais'},
                            {field: 'sigleEnFrancais', header: 'Sigle en francais'},
                            {field: 'anciensNom', header: 'Anciens nom'},
                        {field: 'ville?.libelle', header: 'Ville'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'champIntervention', header: 'Champ intervention'},
                            {field: 'valide', header: 'Valide'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editEtablissement(etablissement:EtablissementVo){
        const isPermistted = await this.roleService.isPermitted('Etablissement', 'edit');
         if(isPermistted){
          this.etablissementService.findByIdWithAssociatedList(etablissement).subscribe(res => {
           this.selectedEtablissement = res;
            this.selectedEtablissement.dateArchivage = new Date(etablissement.dateArchivage);
            this.selectedEtablissement.dateCreation = new Date(etablissement.dateCreation);
            this.editEtablissementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissement(etablissement:EtablissementVo){
        const isPermistted = await this.roleService.isPermitted('Etablissement', 'view');
        if(isPermistted){
           this.etablissementService.findByIdWithAssociatedList(etablissement).subscribe(res => {
           this.selectedEtablissement = res;
            this.selectedEtablissement.dateArchivage = new Date(etablissement.dateArchivage);
            this.selectedEtablissement.dateCreation = new Date(etablissement.dateCreation);
            this.viewEtablissementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
            this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverEtablissement(etablissement:EtablissementVo){
const isPermistted = await this.roleService.isPermitted('Etablissement', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Etablissement) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etablissementService.archiver(etablissement).subscribe(status=>{
const myIndex = this.etablissements.indexOf(etablissement);
this.etablissements[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etablissement archivé',
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

public async desarchiverEtablissement(etablissement:EtablissementVo){
const isPermistted = await this.roleService.isPermitted('Etablissement', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Etablissement) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.etablissementService.desarchiver(etablissement).subscribe(status=>{
const myIndex = this.etablissements.indexOf(etablissement);
this.etablissements[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Etablissement désarchivé',
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


    public async deleteEtablissement(etablissement:EtablissementVo){
       const isPermistted = await this.roleService.isPermitted('Etablissement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementService.delete(etablissement).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissements.indexOf(etablissement);
                          position > -1 ? this.etablissements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement Supprimé',
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

public async loadVille(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Etablissement', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Etablissement', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissement(etablissement: EtablissementVo) {

     this.etablissementService.findByIdWithAssociatedList(etablissement).subscribe(
	 res => {
	       this.initDuplicateEtablissement(res);
	       this.selectedEtablissement = res;
	       this.selectedEtablissement.id = null;
            this.createEtablissementDialog = true;

});

	}

	initDuplicateEtablissement(res: EtablissementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Sigle officiel': e.sigleOfficiel ,
                    'Nom en francais': e.nomEnFrancais ,
                    'Sigle en francais': e.sigleEnFrancais ,
                    'Anciens nom': e.anciensNom ,
            'Ville': e.villeVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
                    'Champ intervention': e.champIntervention ,
                    'Valide': e.valide? 'Vrai' : 'Faux' ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtablissement.libelle ? this.searchEtablissement.libelle : environment.emptyForExport ,
            'Code': this.searchEtablissement.code ? this.searchEtablissement.code : environment.emptyForExport ,
            'Description': this.searchEtablissement.description ? this.searchEtablissement.description : environment.emptyForExport ,
            'Sigle officiel': this.searchEtablissement.sigleOfficiel ? this.searchEtablissement.sigleOfficiel : environment.emptyForExport ,
            'Nom en francais': this.searchEtablissement.nomEnFrancais ? this.searchEtablissement.nomEnFrancais : environment.emptyForExport ,
            'Sigle en francais': this.searchEtablissement.sigleEnFrancais ? this.searchEtablissement.sigleEnFrancais : environment.emptyForExport ,
            'Anciens nom': this.searchEtablissement.anciensNom ? this.searchEtablissement.anciensNom : environment.emptyForExport ,
        'Ville': this.searchEtablissement.villeVo?.libelle ? this.searchEtablissement.villeVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchEtablissement.paysVo?.libelle ? this.searchEtablissement.paysVo?.libelle : environment.emptyForExport ,
            'Champ intervention': this.searchEtablissement.champIntervention ? this.searchEtablissement.champIntervention : environment.emptyForExport ,
            'Valide': this.searchEtablissement.valide ? (this.searchEtablissement.valide ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Archive': this.searchEtablissement.archive ? (this.searchEtablissement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtablissement.dateArchivageMin ? this.datePipe.transform(this.searchEtablissement.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtablissement.dateArchivageMax ? this.datePipe.transform(this.searchEtablissement.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtablissement.dateCreationMin ? this.datePipe.transform(this.searchEtablissement.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtablissement.dateCreationMax ? this.datePipe.transform(this.searchEtablissement.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtablissement.admin ? (this.searchEtablissement.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtablissement.visible ? (this.searchEtablissement.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtablissement.username ? this.searchEtablissement.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
    set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }

    get etablissementSelections(): Array<EtablissementVo> {
           return this.etablissementService.etablissementSelections;
       }
    set etablissementSelections(value: Array<EtablissementVo>) {
        this.etablissementService.etablissementSelections = value;
       }
   
     


    get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
    set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
    
    get createEtablissementDialog():boolean {
           return this.etablissementService.createEtablissementDialog;
       }
    set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
    
    get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
    set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
    get viewEtablissementDialog():boolean {
           return this.etablissementService.viewEtablissementDialog;
       }
    set viewEtablissementDialog(value: boolean) {
        this.etablissementService.viewEtablissementDialog = value;
       }
       
     get searchEtablissement(): EtablissementVo {
        return this.etablissementService.searchEtablissement;
       }
    set searchEtablissement(value: EtablissementVo) {
        this.etablissementService.searchEtablissement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

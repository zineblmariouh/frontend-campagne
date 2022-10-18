import {Component, OnInit} from '@angular/core';
import {EtablissementProjetService} from '../../../../../controller/service/EtablissementProjet.service';
import {EtablissementProjetVo} from '../../../../../controller/model/EtablissementProjet.model';
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
  selector: 'app-etablissement-projet-list-chercheur',
  templateUrl: './etablissement-projet-list-chercheur.component.html',
  styleUrls: ['./etablissement-projet-list-chercheur.component.css']
})
export class EtablissementProjetListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementProjet';
     yesOrNoValide :any[] =[];
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    villes :Array<VilleVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private etablissementProjetService: EtablissementProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private villeService: VilleService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadEtablissementProjets();
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
      public async loadEtablissementProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
        isPermistted ? this.etablissementProjetService.findAll().subscribe(etablissementProjets => this.etablissementProjets = etablissementProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementProjetService.findByCriteria(this.searchEtablissementProjet).subscribe(etablissementProjets=>{
            
            this.etablissementProjets = etablissementProjets;
           // this.searchEtablissementProjet = new EtablissementProjetVo();
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
    
    public async editEtablissementProjet(etablissementProjet:EtablissementProjetVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'edit');
         if(isPermistted){
          this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(res => {
           this.selectedEtablissementProjet = res;
            this.selectedEtablissementProjet.dateArchivage = new Date(etablissementProjet.dateArchivage);
            this.selectedEtablissementProjet.dateCreation = new Date(etablissementProjet.dateCreation);
            this.editEtablissementProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementProjet(etablissementProjet:EtablissementProjetVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'view');
        if(isPermistted){
           this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(res => {
           this.selectedEtablissementProjet = res;
            this.selectedEtablissementProjet.dateArchivage = new Date(etablissementProjet.dateArchivage);
            this.selectedEtablissementProjet.dateCreation = new Date(etablissementProjet.dateCreation);
            this.viewEtablissementProjetDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementProjet = new EtablissementProjetVo();
            this.createEtablissementProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtablissementProjet(etablissementProjet:EtablissementProjetVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementProjetService.delete(etablissementProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementProjets.indexOf(etablissementProjet);
                          position > -1 ? this.etablissementProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement projet Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
    isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementProjet', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissementProjet(etablissementProjet: EtablissementProjetVo) {

     this.etablissementProjetService.findByIdWithAssociatedList(etablissementProjet).subscribe(
	 res => {
	       this.initDuplicateEtablissementProjet(res);
	       this.selectedEtablissementProjet = res;
	       this.selectedEtablissementProjet.id = null;
            this.createEtablissementProjetDialog = true;

});

	}

	initDuplicateEtablissementProjet(res: EtablissementProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementProjets.map(e => {
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
            'Libelle': this.searchEtablissementProjet.libelle ? this.searchEtablissementProjet.libelle : environment.emptyForExport ,
            'Code': this.searchEtablissementProjet.code ? this.searchEtablissementProjet.code : environment.emptyForExport ,
            'Description': this.searchEtablissementProjet.description ? this.searchEtablissementProjet.description : environment.emptyForExport ,
            'Sigle officiel': this.searchEtablissementProjet.sigleOfficiel ? this.searchEtablissementProjet.sigleOfficiel : environment.emptyForExport ,
            'Nom en francais': this.searchEtablissementProjet.nomEnFrancais ? this.searchEtablissementProjet.nomEnFrancais : environment.emptyForExport ,
            'Sigle en francais': this.searchEtablissementProjet.sigleEnFrancais ? this.searchEtablissementProjet.sigleEnFrancais : environment.emptyForExport ,
            'Anciens nom': this.searchEtablissementProjet.anciensNom ? this.searchEtablissementProjet.anciensNom : environment.emptyForExport ,
        'Ville': this.searchEtablissementProjet.villeVo?.libelle ? this.searchEtablissementProjet.villeVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchEtablissementProjet.paysVo?.libelle ? this.searchEtablissementProjet.paysVo?.libelle : environment.emptyForExport ,
            'Champ intervention': this.searchEtablissementProjet.champIntervention ? this.searchEtablissementProjet.champIntervention : environment.emptyForExport ,
            'Valide': this.searchEtablissementProjet.valide ? (this.searchEtablissementProjet.valide ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Archive': this.searchEtablissementProjet.archive ? (this.searchEtablissementProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchEtablissementProjet.dateArchivageMin ? this.datePipe.transform(this.searchEtablissementProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchEtablissementProjet.dateArchivageMax ? this.datePipe.transform(this.searchEtablissementProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchEtablissementProjet.dateCreationMin ? this.datePipe.transform(this.searchEtablissementProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchEtablissementProjet.dateCreationMax ? this.datePipe.transform(this.searchEtablissementProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchEtablissementProjet.admin ? (this.searchEtablissementProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchEtablissementProjet.visible ? (this.searchEtablissementProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchEtablissementProjet.username ? this.searchEtablissementProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementProjets(): Array<EtablissementProjetVo> {
           return this.etablissementProjetService.etablissementProjets;
       }
    set etablissementProjets(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjets = value;
       }

    get etablissementProjetSelections(): Array<EtablissementProjetVo> {
           return this.etablissementProjetService.etablissementProjetSelections;
       }
    set etablissementProjetSelections(value: Array<EtablissementProjetVo>) {
        this.etablissementProjetService.etablissementProjetSelections = value;
       }
   
     


    get selectedEtablissementProjet():EtablissementProjetVo {
           return this.etablissementProjetService.selectedEtablissementProjet;
       }
    set selectedEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.selectedEtablissementProjet = value;
       }
    
    get createEtablissementProjetDialog():boolean {
           return this.etablissementProjetService.createEtablissementProjetDialog;
       }
    set createEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.createEtablissementProjetDialog= value;
       }
    
    get editEtablissementProjetDialog():boolean {
           return this.etablissementProjetService.editEtablissementProjetDialog;
       }
    set editEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.editEtablissementProjetDialog= value;
       }
    get viewEtablissementProjetDialog():boolean {
           return this.etablissementProjetService.viewEtablissementProjetDialog;
       }
    set viewEtablissementProjetDialog(value: boolean) {
        this.etablissementProjetService.viewEtablissementProjetDialog = value;
       }
       
     get searchEtablissementProjet(): EtablissementProjetVo {
        return this.etablissementProjetService.searchEtablissementProjet;
       }
    set searchEtablissementProjet(value: EtablissementProjetVo) {
        this.etablissementProjetService.searchEtablissementProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

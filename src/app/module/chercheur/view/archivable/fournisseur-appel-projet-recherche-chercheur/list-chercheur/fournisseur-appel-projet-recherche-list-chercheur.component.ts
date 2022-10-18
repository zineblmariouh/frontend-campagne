import {Component, OnInit} from '@angular/core';
import {FournisseurAppelProjetRechercheService} from '../../../../../controller/service/FournisseurAppelProjetRecherche.service';
import {FournisseurAppelProjetRechercheVo} from '../../../../../controller/model/FournisseurAppelProjetRecherche.model';
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
  selector: 'app-fournisseur-appel-projet-recherche-list-chercheur',
  templateUrl: './fournisseur-appel-projet-recherche-list-chercheur.component.html',
  styleUrls: ['./fournisseur-appel-projet-recherche-list-chercheur.component.css']
})
export class FournisseurAppelProjetRechercheListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FournisseurAppelProjetRecherche';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private fournisseurAppelProjetRechercheService: FournisseurAppelProjetRechercheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadFournisseurAppelProjetRecherches();
      this.initExport();
      this.initCol();
      this.loadPays();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadFournisseurAppelProjetRecherches(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'list');
        isPermistted ? this.fournisseurAppelProjetRechercheService.findAll().subscribe(fournisseurAppelProjetRecherches => this.fournisseurAppelProjetRecherches = fournisseurAppelProjetRecherches,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.fournisseurAppelProjetRechercheService.findByCriteria(this.searchFournisseurAppelProjetRecherche).subscribe(fournisseurAppelProjetRecherches=>{
            
            this.fournisseurAppelProjetRecherches = fournisseurAppelProjetRecherches;
           // this.searchFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();
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
    
    public async editFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo){
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'edit');
         if(isPermistted){
          this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(res => {
           this.selectedFournisseurAppelProjetRecherche = res;
            this.selectedFournisseurAppelProjetRecherche.dateArchivage = new Date(fournisseurAppelProjetRecherche.dateArchivage);
            this.selectedFournisseurAppelProjetRecherche.dateCreation = new Date(fournisseurAppelProjetRecherche.dateCreation);
            this.editFournisseurAppelProjetRechercheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo){
        const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'view');
        if(isPermistted){
           this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(res => {
           this.selectedFournisseurAppelProjetRecherche = res;
            this.selectedFournisseurAppelProjetRecherche.dateArchivage = new Date(fournisseurAppelProjetRecherche.dateArchivage);
            this.selectedFournisseurAppelProjetRecherche.dateCreation = new Date(fournisseurAppelProjetRecherche.dateCreation);
            this.viewFournisseurAppelProjetRechercheDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFournisseurAppelProjetRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFournisseurAppelProjetRecherche = new FournisseurAppelProjetRechercheVo();
            this.createFournisseurAppelProjetRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche:FournisseurAppelProjetRechercheVo){
       const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Fournisseur appel projet recherche) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.fournisseurAppelProjetRechercheService.delete(fournisseurAppelProjetRecherche).subscribe(status=>{
                          if(status > 0){
                          const position = this.fournisseurAppelProjetRecherches.indexOf(fournisseurAppelProjetRecherche);
                          position > -1 ? this.fournisseurAppelProjetRecherches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Fournisseur appel projet recherche Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('FournisseurAppelProjetRecherche', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFournisseurAppelProjetRecherche(fournisseurAppelProjetRecherche: FournisseurAppelProjetRechercheVo) {

     this.fournisseurAppelProjetRechercheService.findByIdWithAssociatedList(fournisseurAppelProjetRecherche).subscribe(
	 res => {
	       this.initDuplicateFournisseurAppelProjetRecherche(res);
	       this.selectedFournisseurAppelProjetRecherche = res;
	       this.selectedFournisseurAppelProjetRecherche.id = null;
            this.createFournisseurAppelProjetRechercheDialog = true;

});

	}

	initDuplicateFournisseurAppelProjetRecherche(res: FournisseurAppelProjetRechercheVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.fournisseurAppelProjetRecherches.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
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
            'Libelle': this.searchFournisseurAppelProjetRecherche.libelle ? this.searchFournisseurAppelProjetRecherche.libelle : environment.emptyForExport ,
            'Code': this.searchFournisseurAppelProjetRecherche.code ? this.searchFournisseurAppelProjetRecherche.code : environment.emptyForExport ,
            'Description': this.searchFournisseurAppelProjetRecherche.description ? this.searchFournisseurAppelProjetRecherche.description : environment.emptyForExport ,
        'Pays': this.searchFournisseurAppelProjetRecherche.paysVo?.libelle ? this.searchFournisseurAppelProjetRecherche.paysVo?.libelle : environment.emptyForExport ,
            'Archive': this.searchFournisseurAppelProjetRecherche.archive ? (this.searchFournisseurAppelProjetRecherche.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchFournisseurAppelProjetRecherche.dateArchivageMin ? this.datePipe.transform(this.searchFournisseurAppelProjetRecherche.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchFournisseurAppelProjetRecherche.dateArchivageMax ? this.datePipe.transform(this.searchFournisseurAppelProjetRecherche.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchFournisseurAppelProjetRecherche.dateCreationMin ? this.datePipe.transform(this.searchFournisseurAppelProjetRecherche.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchFournisseurAppelProjetRecherche.dateCreationMax ? this.datePipe.transform(this.searchFournisseurAppelProjetRecherche.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchFournisseurAppelProjetRecherche.admin ? (this.searchFournisseurAppelProjetRecherche.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchFournisseurAppelProjetRecherche.visible ? (this.searchFournisseurAppelProjetRecherche.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchFournisseurAppelProjetRecherche.username ? this.searchFournisseurAppelProjetRecherche.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get fournisseurAppelProjetRecherches(): Array<FournisseurAppelProjetRechercheVo> {
           return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches;
       }
    set fournisseurAppelProjetRecherches(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRecherches = value;
       }

    get fournisseurAppelProjetRechercheSelections(): Array<FournisseurAppelProjetRechercheVo> {
           return this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRechercheSelections;
       }
    set fournisseurAppelProjetRechercheSelections(value: Array<FournisseurAppelProjetRechercheVo>) {
        this.fournisseurAppelProjetRechercheService.fournisseurAppelProjetRechercheSelections = value;
       }
   
     


    get selectedFournisseurAppelProjetRecherche():FournisseurAppelProjetRechercheVo {
           return this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche;
       }
    set selectedFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.selectedFournisseurAppelProjetRecherche = value;
       }
    
    get createFournisseurAppelProjetRechercheDialog():boolean {
           return this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog;
       }
    set createFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.createFournisseurAppelProjetRechercheDialog= value;
       }
    
    get editFournisseurAppelProjetRechercheDialog():boolean {
           return this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog;
       }
    set editFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.editFournisseurAppelProjetRechercheDialog= value;
       }
    get viewFournisseurAppelProjetRechercheDialog():boolean {
           return this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog;
       }
    set viewFournisseurAppelProjetRechercheDialog(value: boolean) {
        this.fournisseurAppelProjetRechercheService.viewFournisseurAppelProjetRechercheDialog = value;
       }
       
     get searchFournisseurAppelProjetRecherche(): FournisseurAppelProjetRechercheVo {
        return this.fournisseurAppelProjetRechercheService.searchFournisseurAppelProjetRecherche;
       }
    set searchFournisseurAppelProjetRecherche(value: FournisseurAppelProjetRechercheVo) {
        this.fournisseurAppelProjetRechercheService.searchFournisseurAppelProjetRecherche = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneService } from '../../../../../controller/service/Campagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-projet-activite-recherche-list-admin',
  templateUrl: './projet-activite-recherche-list-admin.component.html',
  styleUrls: ['./projet-activite-recherche-list-admin.component.css']
})
export class ProjetActiviteRechercheListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ProjetActiviteRecherche';
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;


    constructor(private datePipe: DatePipe, private projetActiviteRechercheService: ProjetActiviteRechercheService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
) { }

    ngOnInit(): void {
      this.loadProjetActiviteRecherches();
      this.initExport();
      this.initCol();
      this.loadEtatEtapeCampagne();
      this.loadChercheur();
      this.loadCampagne();
    }
    
    // methods
    public async loadProjetActiviteRecherches(){
       const chercheur = this.authService.authenticatedUserByAdmin();
        await this.roleService.findAll();
        if (chercheur !== null){
            const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'list');
            isPermistted ? this.projetActiviteRechercheService.findByChercheurId(chercheur.id).subscribe(projetActiviteRecherches => this.projetActiviteRecherches = projetActiviteRecherches,error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});}
        else{
            const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'list');
            isPermistted ? this.projetActiviteRechercheService.findAll().subscribe(projetActiviteRecherches => this.projetActiviteRecherches = projetActiviteRecherches,error=>console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
    }


  public searchRequest(){
        this.projetActiviteRechercheService.findByCriteria(this.searchProjetActiviteRecherche).subscribe(projetActiviteRecherches=>{
            
            this.projetActiviteRecherches = projetActiviteRecherches;
           // this.searchProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                            {field: 'annee', header: 'Annee'},
        ];
    }
    
    public async editProjetActiviteRecherche(projetActiviteRecherche:ProjetActiviteRechercheVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'edit');
         if(isPermistted){
          this.projetActiviteRechercheService.findByIdWithAssociatedList(projetActiviteRecherche).subscribe(res => {
           this.selectedProjetActiviteRecherche = res;
            this.editProjetActiviteRechercheDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewProjetActiviteRecherche(projetActiviteRecherche:ProjetActiviteRechercheVo){
        const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'view');
        if(isPermistted){
           this.projetActiviteRechercheService.findByIdWithAssociatedList(projetActiviteRecherche).subscribe(res => {
           this.selectedProjetActiviteRecherche = res;
            this.viewProjetActiviteRechercheDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateProjetActiviteRecherche(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
            this.createProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteProjetActiviteRecherche(projetActiviteRecherche:ProjetActiviteRechercheVo){
       const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Projet activite recherche) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.projetActiviteRechercheService.delete(projetActiviteRecherche).subscribe(status=>{
                          if(status > 0){
                          const position = this.projetActiviteRecherches.indexOf(projetActiviteRecherche);
                          position > -1 ? this.projetActiviteRecherches.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Projet activite recherche Supprimé',
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

public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateProjetActiviteRecherche(projetActiviteRecherche: ProjetActiviteRechercheVo) {

     this.projetActiviteRechercheService.findByIdWithAssociatedList(projetActiviteRecherche).subscribe(
	 res => {
	       this.initDuplicateProjetActiviteRecherche(res);
	       this.selectedProjetActiviteRecherche = res;
	       this.selectedProjetActiviteRecherche.id = null;
            this.createProjetActiviteRechercheDialog = true;

});

	}

	initDuplicateProjetActiviteRecherche(res: ProjetActiviteRechercheVo) {
        if (res.projetActiviteRechercheDetailsVo != null) {
             res.projetActiviteRechercheDetailsVo.forEach(d => { d.projetActiviteRechercheVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.projetActiviteRecherches.map(e => {
    return {
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
                    'Annee': e.annee ,
     }
      });

      this.criteriaData = [{
            'Temps estime pour cette annne Min': this.searchProjetActiviteRecherche.tempsEstimePourCetteAnnneMin ? this.searchProjetActiviteRecherche.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchProjetActiviteRecherche.tempsEstimePourCetteAnnneMax ? this.searchProjetActiviteRecherche.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Etat etape campagne': this.searchProjetActiviteRecherche.etatEtapeCampagneVo?.libelle ? this.searchProjetActiviteRecherche.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchProjetActiviteRecherche.chercheurVo?.numeroMatricule ? this.searchProjetActiviteRecherche.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchProjetActiviteRecherche.campagneVo?.libelle ? this.searchProjetActiviteRecherche.campagneVo?.libelle : environment.emptyForExport ,
            'Annee Min': this.searchProjetActiviteRecherche.anneeMin ? this.searchProjetActiviteRecherche.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchProjetActiviteRecherche.anneeMax ? this.searchProjetActiviteRecherche.anneeMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
    set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }

    get projetActiviteRechercheSelections(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRechercheSelections;
       }
    set projetActiviteRechercheSelections(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRechercheSelections = value;
       }
   
     


    get selectedProjetActiviteRecherche():ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
    set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
    
    get createProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;
       }
    set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
       }
    
    get editProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;
       }
    set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog= value;
       }
    get viewProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.viewProjetActiviteRechercheDialog;
       }
    set viewProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.viewProjetActiviteRechercheDialog = value;
       }
       
     get searchProjetActiviteRecherche(): ProjetActiviteRechercheVo {
        return this.projetActiviteRechercheService.searchProjetActiviteRecherche;
       }
    set searchProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.searchProjetActiviteRecherche = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-gestion-equipe-list-chercheur',
  templateUrl: './gestion-equipe-list-chercheur.component.html',
  styleUrls: ['./gestion-equipe-list-chercheur.component.css']
})
export class GestionEquipeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'GestionEquipe';
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private gestionEquipeService: GestionEquipeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadGestionEquipes();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCampagne();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadGestionEquipes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
        isPermistted ? this.gestionEquipeService.findAll().subscribe(gestionEquipes => this.gestionEquipes = gestionEquipes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToGestionEquipeCreate(){
this.router.navigate(['/app/chercheur/gestionEquipe/create']);
}


  public searchRequest(){
        this.gestionEquipeService.findByCriteria(this.searchGestionEquipe).subscribe(gestionEquipes=>{
            
            this.gestionEquipes = gestionEquipes;
           // this.searchGestionEquipe = new GestionEquipeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editGestionEquipe(gestionEquipe:GestionEquipeVo){
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'edit');
         if(isPermistted){
          this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(res => {
           this.selectedGestionEquipe = res;
            this.navigateToGestionEquipeCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewGestionEquipe(gestionEquipe:GestionEquipeVo){
        const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'view');
        if(isPermistted){
           this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(res => {
           this.selectedGestionEquipe = res;
            this.viewGestionEquipeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateGestionEquipe(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedGestionEquipe = new GestionEquipeVo();
            this.navigateToGestionEquipeCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteGestionEquipe(gestionEquipe:GestionEquipeVo){
       const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Gestion equipe) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.gestionEquipeService.delete(gestionEquipe).subscribe(status=>{
                          if(status > 0){
                          const position = this.gestionEquipes.indexOf(gestionEquipe);
                          position > -1 ? this.gestionEquipes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Gestion equipe Supprimé',
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

public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionEquipe', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateGestionEquipe(gestionEquipe: GestionEquipeVo) {

     this.gestionEquipeService.findByIdWithAssociatedList(gestionEquipe).subscribe(
	 res => {
	       this.initDuplicateGestionEquipe(res);
	       this.selectedGestionEquipe = res;
	       this.selectedGestionEquipe.id = null;
            this.navigateToGestionEquipeCreate() ;

});

	}

	initDuplicateGestionEquipe(res: GestionEquipeVo) {
        if (res.gestionEquipeDetailsVo != null) {
             res.gestionEquipeDetailsVo.forEach(d => { d.gestionEquipeVo = null; d.id = null; });
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
    this.exportData = this.gestionEquipes.map(e => {
    return {
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Temps estime pour cette annne Min': this.searchGestionEquipe.tempsEstimePourCetteAnnneMin ? this.searchGestionEquipe.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchGestionEquipe.tempsEstimePourCetteAnnneMax ? this.searchGestionEquipe.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Chercheur': this.searchGestionEquipe.chercheurVo?.numeroMatricule ? this.searchGestionEquipe.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchGestionEquipe.campagneVo?.libelle ? this.searchGestionEquipe.campagneVo?.libelle : environment.emptyForExport ,
        'Etat etape campagne': this.searchGestionEquipe.etatEtapeCampagneVo?.libelle ? this.searchGestionEquipe.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get gestionEquipes(): Array<GestionEquipeVo> {
           return this.gestionEquipeService.gestionEquipes;
       }
    set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }

    get gestionEquipeSelections(): Array<GestionEquipeVo> {
           return this.gestionEquipeService.gestionEquipeSelections;
       }
    set gestionEquipeSelections(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipeSelections = value;
       }
   
     


    get selectedGestionEquipe():GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }
    
    get createGestionEquipeDialog():boolean {
           return this.gestionEquipeService.createGestionEquipeDialog;
       }
    set createGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.createGestionEquipeDialog= value;
       }
    
    get editGestionEquipeDialog():boolean {
           return this.gestionEquipeService.editGestionEquipeDialog;
       }
    set editGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.editGestionEquipeDialog= value;
       }
    get viewGestionEquipeDialog():boolean {
           return this.gestionEquipeService.viewGestionEquipeDialog;
       }
    set viewGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.viewGestionEquipeDialog = value;
       }
       
     get searchGestionEquipe(): GestionEquipeVo {
        return this.gestionEquipeService.searchGestionEquipe;
       }
    set searchGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.searchGestionEquipe = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-savoir-et-innovation-list-chercheur',
  templateUrl: './savoir-et-innovation-list-chercheur.component.html',
  styleUrls: ['./savoir-et-innovation-list-chercheur.component.css']
})
export class SavoirEtInnovationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'SavoirEtInnovation';
    campagnes :Array<CampagneVo>;
    chercheurs :Array<ChercheurVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private savoirEtInnovationService: SavoirEtInnovationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadSavoirEtInnovations();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadChercheur();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadSavoirEtInnovations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'list');
        isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToSavoirEtInnovationCreate(){
this.router.navigate(['/app/chercheur/savoirEtInnovation/create']);
}


  public searchRequest(){
        this.savoirEtInnovationService.findByCriteria(this.searchSavoirEtInnovation).subscribe(savoirEtInnovations=>{
            
            this.savoirEtInnovations = savoirEtInnovations;
           // this.searchSavoirEtInnovation = new SavoirEtInnovationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'annee', header: 'Annee'},
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editSavoirEtInnovation(savoirEtInnovation:SavoirEtInnovationVo){
        const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'edit');
         if(isPermistted){
          this.savoirEtInnovationService.findByIdWithAssociatedList(savoirEtInnovation).subscribe(res => {
           this.selectedSavoirEtInnovation = res;
            this.navigateToSavoirEtInnovationCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewSavoirEtInnovation(savoirEtInnovation:SavoirEtInnovationVo){
        const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'view');
        if(isPermistted){
           this.savoirEtInnovationService.findByIdWithAssociatedList(savoirEtInnovation).subscribe(res => {
           this.selectedSavoirEtInnovation = res;
            this.viewSavoirEtInnovationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateSavoirEtInnovation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
            this.navigateToSavoirEtInnovationCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteSavoirEtInnovation(savoirEtInnovation:SavoirEtInnovationVo){
       const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Savoir et innovation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.savoirEtInnovationService.delete(savoirEtInnovation).subscribe(status=>{
                          if(status > 0){
                          const position = this.savoirEtInnovations.indexOf(savoirEtInnovation);
                          position > -1 ? this.savoirEtInnovations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Savoir et innovation Supprimé',
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

public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateSavoirEtInnovation(savoirEtInnovation: SavoirEtInnovationVo) {

     this.savoirEtInnovationService.findByIdWithAssociatedList(savoirEtInnovation).subscribe(
	 res => {
	       this.initDuplicateSavoirEtInnovation(res);
	       this.selectedSavoirEtInnovation = res;
	       this.selectedSavoirEtInnovation.id = null;
            this.navigateToSavoirEtInnovationCreate() ;

});

	}

	initDuplicateSavoirEtInnovation(res: SavoirEtInnovationVo) {
        if (res.contratEtConventionIrdsVo != null) {
             res.contratEtConventionIrdsVo.forEach(d => { d.savoirEtInnovationVo = null; d.id = null; });
                }
        if (res.evenementColloqueScienntifiquesVo != null) {
             res.evenementColloqueScienntifiquesVo.forEach(d => { d.savoirEtInnovationVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiquesVo != null) {
             res.developpementDeSavoirEtInnovationScientifiquesVo.forEach(d => { d.savoirEtInnovationVo = null; d.id = null; });
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
    this.exportData = this.savoirEtInnovations.map(e => {
    return {
                    'Annee': e.annee ,
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Campagne': e.campagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Annee Min': this.searchSavoirEtInnovation.anneeMin ? this.searchSavoirEtInnovation.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchSavoirEtInnovation.anneeMax ? this.searchSavoirEtInnovation.anneeMax : environment.emptyForExport ,
            'Temps estime pour cette annne Min': this.searchSavoirEtInnovation.tempsEstimePourCetteAnnneMin ? this.searchSavoirEtInnovation.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchSavoirEtInnovation.tempsEstimePourCetteAnnneMax ? this.searchSavoirEtInnovation.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Campagne': this.searchSavoirEtInnovation.campagneVo?.libelle ? this.searchSavoirEtInnovation.campagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchSavoirEtInnovation.chercheurVo?.numeroMatricule ? this.searchSavoirEtInnovation.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Etat etape campagne': this.searchSavoirEtInnovation.etatEtapeCampagneVo?.libelle ? this.searchSavoirEtInnovation.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
    set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }

    get savoirEtInnovationSelections(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovationSelections;
       }
    set savoirEtInnovationSelections(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovationSelections = value;
       }
   
     


    get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
    
    get createSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
    set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
       }
    
    get editSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
       }
    set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog= value;
       }
    get viewSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.viewSavoirEtInnovationDialog;
       }
    set viewSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.viewSavoirEtInnovationDialog = value;
       }
       
     get searchSavoirEtInnovation(): SavoirEtInnovationVo {
        return this.savoirEtInnovationService.searchSavoirEtInnovation;
       }
    set searchSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.searchSavoirEtInnovation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

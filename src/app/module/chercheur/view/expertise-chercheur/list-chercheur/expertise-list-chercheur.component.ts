import {Component, OnInit} from '@angular/core';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
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
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-expertise-list-chercheur',
  templateUrl: './expertise-list-chercheur.component.html',
  styleUrls: ['./expertise-list-chercheur.component.css']
})
export class ExpertiseListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Expertise';
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;


    constructor(private datePipe: DatePipe, private expertiseService: ExpertiseService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
) { }

    ngOnInit(): void {
      this.loadExpertises();
      this.initExport();
      this.initCol();
      this.loadEtatEtapeCampagne();
      this.loadChercheur();
      this.loadCampagne();
    }
    
    // methods
      public async loadExpertises(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Expertise', 'list');
        isPermistted ? this.expertiseService.findAll().subscribe(expertises => this.expertises = expertises,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToExpertiseCreate(){
this.router.navigate(['/app/chercheur/expertise/create']);
}


  public searchRequest(){
        this.expertiseService.findByCriteria(this.searchExpertise).subscribe(expertises=>{
            
            this.expertises = expertises;
           // this.searchExpertise = new ExpertiseVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                            {field: 'annee', header: 'Annee'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }
    
    public async editExpertise(expertise:ExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('Expertise', 'edit');
         if(isPermistted){
          this.expertiseService.findByIdWithAssociatedList(expertise).subscribe(res => {
           this.selectedExpertise = res;
            this.navigateToExpertiseCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewExpertise(expertise:ExpertiseVo){
        const isPermistted = await this.roleService.isPermitted('Expertise', 'view');
        if(isPermistted){
           this.expertiseService.findByIdWithAssociatedList(expertise).subscribe(res => {
           this.selectedExpertise = res;
            this.viewExpertiseDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateExpertise(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedExpertise = new ExpertiseVo();
            this.navigateToExpertiseCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteExpertise(expertise:ExpertiseVo){
       const isPermistted = await this.roleService.isPermitted('Expertise', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Expertise) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.expertiseService.delete(expertise).subscribe(status=>{
                          if(status > 0){
                          const position = this.expertises.indexOf(expertise);
                          position > -1 ? this.expertises.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Expertise Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('Expertise', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Expertise', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Expertise', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateExpertise(expertise: ExpertiseVo) {

     this.expertiseService.findByIdWithAssociatedList(expertise).subscribe(
	 res => {
	       this.initDuplicateExpertise(res);
	       this.selectedExpertise = res;
	       this.selectedExpertise.id = null;
            this.navigateToExpertiseCreate() ;

});

	}

	initDuplicateExpertise(res: ExpertiseVo) {
        if (res.conseilsScientifiquesVo != null) {
             res.conseilsScientifiquesVo.forEach(d => { d.expertiseVo = null; d.id = null; });
                }
        if (res.consultanceScientifiquePonctuellesVo != null) {
             res.consultanceScientifiquePonctuellesVo.forEach(d => { d.expertiseVo = null; d.id = null; });
                }
        if (res.comiteEtCommissionEvaluationsVo != null) {
             res.comiteEtCommissionEvaluationsVo.forEach(d => { d.expertiseVo = null; d.id = null; });
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
    this.exportData = this.expertises.map(e => {
    return {
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
                    'Annee': e.annee ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Temps estime pour cette annne Min': this.searchExpertise.tempsEstimePourCetteAnnneMin ? this.searchExpertise.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchExpertise.tempsEstimePourCetteAnnneMax ? this.searchExpertise.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
            'Annee Min': this.searchExpertise.anneeMin ? this.searchExpertise.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchExpertise.anneeMax ? this.searchExpertise.anneeMax : environment.emptyForExport ,
        'Etat etape campagne': this.searchExpertise.etatEtapeCampagneVo?.libelle ? this.searchExpertise.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchExpertise.chercheurVo?.numeroMatricule ? this.searchExpertise.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchExpertise.campagneVo?.libelle ? this.searchExpertise.campagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get expertises(): Array<ExpertiseVo> {
           return this.expertiseService.expertises;
       }
    set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }

    get expertiseSelections(): Array<ExpertiseVo> {
           return this.expertiseService.expertiseSelections;
       }
    set expertiseSelections(value: Array<ExpertiseVo>) {
        this.expertiseService.expertiseSelections = value;
       }
   
     


    get selectedExpertise():ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
    set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }
    
    get createExpertiseDialog():boolean {
           return this.expertiseService.createExpertiseDialog;
       }
    set createExpertiseDialog(value: boolean) {
        this.expertiseService.createExpertiseDialog= value;
       }
    
    get editExpertiseDialog():boolean {
           return this.expertiseService.editExpertiseDialog;
       }
    set editExpertiseDialog(value: boolean) {
        this.expertiseService.editExpertiseDialog= value;
       }
    get viewExpertiseDialog():boolean {
           return this.expertiseService.viewExpertiseDialog;
       }
    set viewExpertiseDialog(value: boolean) {
        this.expertiseService.viewExpertiseDialog = value;
       }
       
     get searchExpertise(): ExpertiseVo {
        return this.expertiseService.searchExpertise;
       }
    set searchExpertise(value: ExpertiseVo) {
        this.expertiseService.searchExpertise = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {EnseignementEtFormationService} from '../../../../../controller/service/EnseignementEtFormation.service';
import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
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
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-et-formation-list-admin',
  templateUrl: './enseignement-et-formation-list-admin.component.html',
  styleUrls: ['./enseignement-et-formation-list-admin.component.css']
})
export class EnseignementEtFormationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnseignementEtFormation';
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;


    constructor(private datePipe: DatePipe, private enseignementEtFormationService: EnseignementEtFormationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
) { }

    ngOnInit(): void {
      this.loadEnseignementEtFormations();
      this.initExport();
      this.initCol();
      this.loadEtatEtapeCampagne();
      this.loadChercheur();
      this.loadCampagne();
    }
    
    // methods
    public async loadEnseignementEtFormations(){
       const chercheur = this.authService.authenticatedUserByAdmin();
        await this.roleService.findAll();
        if (chercheur !== null){
            const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'list');
            isPermistted ? this.enseignementEtFormationService.findByChercheurId(chercheur.id).subscribe(enseignementEtFormations => this.enseignementEtFormations = enseignementEtFormations,error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});}
        else{
            const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'list');
            isPermistted ? this.enseignementEtFormationService.findAll().subscribe(enseignementEtFormations => this.enseignementEtFormations = enseignementEtFormations,error=>console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
    }


  public searchRequest(){
        this.enseignementEtFormationService.findByCriteria(this.searchEnseignementEtFormation).subscribe(enseignementEtFormations=>{
            
            this.enseignementEtFormations = enseignementEtFormations;
           // this.searchEnseignementEtFormation = new EnseignementEtFormationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'annee', header: 'Annee'},
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }
    
    public async editEnseignementEtFormation(enseignementEtFormation:EnseignementEtFormationVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'edit');
         if(isPermistted){
          this.enseignementEtFormationService.findByIdWithAssociatedList(enseignementEtFormation).subscribe(res => {
           this.selectedEnseignementEtFormation = res;
            this.editEnseignementEtFormationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignementEtFormation(enseignementEtFormation:EnseignementEtFormationVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'view');
        if(isPermistted){
           this.enseignementEtFormationService.findByIdWithAssociatedList(enseignementEtFormation).subscribe(res => {
           this.selectedEnseignementEtFormation = res;
            this.viewEnseignementEtFormationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignementEtFormation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignementEtFormation = new EnseignementEtFormationVo();
            this.createEnseignementEtFormationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignementEtFormation(enseignementEtFormation:EnseignementEtFormationVo){
       const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement et formation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementEtFormationService.delete(enseignementEtFormation).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignementEtFormations.indexOf(enseignementEtFormation);
                          position > -1 ? this.enseignementEtFormations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement et formation Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementEtFormation', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignementEtFormation(enseignementEtFormation: EnseignementEtFormationVo) {

     this.enseignementEtFormationService.findByIdWithAssociatedList(enseignementEtFormation).subscribe(
	 res => {
	       this.initDuplicateEnseignementEtFormation(res);
	       this.selectedEnseignementEtFormation = res;
	       this.selectedEnseignementEtFormation.id = null;
            this.createEnseignementEtFormationDialog = true;

});

	}

	initDuplicateEnseignementEtFormation(res: EnseignementEtFormationVo) {
        if (res.enseignementsVo != null) {
             res.enseignementsVo.forEach(d => { d.enseignementEtFormationVo = null; d.id = null; });
                }
        if (res.formationContinuesVo != null) {
             res.formationContinuesVo.forEach(d => { d.enseignementEtFormationVo = null; d.id = null; });
                }
        if (res.responsabilitePedagogiquesVo != null) {
             res.responsabilitePedagogiquesVo.forEach(d => { d.enseignementEtFormationVo = null; d.id = null; });
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
    this.exportData = this.enseignementEtFormations.map(e => {
    return {
                    'Annee': e.annee ,
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Annee Min': this.searchEnseignementEtFormation.anneeMin ? this.searchEnseignementEtFormation.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchEnseignementEtFormation.anneeMax ? this.searchEnseignementEtFormation.anneeMax : environment.emptyForExport ,
            'Temps estime pour cette annne Min': this.searchEnseignementEtFormation.tempsEstimePourCetteAnnneMin ? this.searchEnseignementEtFormation.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchEnseignementEtFormation.tempsEstimePourCetteAnnneMax ? this.searchEnseignementEtFormation.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Etat etape campagne': this.searchEnseignementEtFormation.etatEtapeCampagneVo?.libelle ? this.searchEnseignementEtFormation.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchEnseignementEtFormation.chercheurVo?.numeroMatricule ? this.searchEnseignementEtFormation.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchEnseignementEtFormation.campagneVo?.libelle ? this.searchEnseignementEtFormation.campagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignementEtFormations(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormations;
       }
    set enseignementEtFormations(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormations = value;
       }

    get enseignementEtFormationSelections(): Array<EnseignementEtFormationVo> {
           return this.enseignementEtFormationService.enseignementEtFormationSelections;
       }
    set enseignementEtFormationSelections(value: Array<EnseignementEtFormationVo>) {
        this.enseignementEtFormationService.enseignementEtFormationSelections = value;
       }
   
     


    get selectedEnseignementEtFormation():EnseignementEtFormationVo {
           return this.enseignementEtFormationService.selectedEnseignementEtFormation;
       }
    set selectedEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.selectedEnseignementEtFormation = value;
       }
    
    get createEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.createEnseignementEtFormationDialog;
       }
    set createEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.createEnseignementEtFormationDialog= value;
       }
    
    get editEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.editEnseignementEtFormationDialog;
       }
    set editEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.editEnseignementEtFormationDialog= value;
       }
    get viewEnseignementEtFormationDialog():boolean {
           return this.enseignementEtFormationService.viewEnseignementEtFormationDialog;
       }
    set viewEnseignementEtFormationDialog(value: boolean) {
        this.enseignementEtFormationService.viewEnseignementEtFormationDialog = value;
       }
       
     get searchEnseignementEtFormation(): EnseignementEtFormationVo {
        return this.enseignementEtFormationService.searchEnseignementEtFormation;
       }
    set searchEnseignementEtFormation(value: EnseignementEtFormationVo) {
        this.enseignementEtFormationService.searchEnseignementEtFormation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

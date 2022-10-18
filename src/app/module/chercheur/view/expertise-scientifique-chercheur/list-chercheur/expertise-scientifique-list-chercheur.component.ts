import {Component, OnInit} from '@angular/core';
import {ExpertiseScientifiqueService} from '../../../../../controller/service/ExpertiseScientifique.service';
import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeExpertiseService } from '../../../../../controller/service/TypeExpertise.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneService } from '../../../../../controller/service/Campagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueExpertiseScientifique.model';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {CommunauteSavoirExpertiseScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirExpertiseScientifique.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-expertise-scientifique-list-chercheur',
  templateUrl: './expertise-scientifique-list-chercheur.component.html',
  styleUrls: ['./expertise-scientifique-list-chercheur.component.css']
})
export class ExpertiseScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ExpertiseScientifique';
    typeExpertises :Array<TypeExpertiseVo>;
    payss :Array<PaysVo>;
    etablissements :Array<EtablissementVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;


    constructor(private datePipe: DatePipe, private expertiseScientifiqueService: ExpertiseScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeExpertiseService: TypeExpertiseService
        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
) { }

    ngOnInit(): void {
      this.loadExpertiseScientifiques();
      this.initExport();
      this.initCol();
      this.loadTypeExpertise();
      this.loadPays();
      this.loadEtablissement();
      this.loadEtatEtapeCampagne();
      this.loadChercheur();
      this.loadCampagne();
    }
    
    // methods
      public async loadExpertiseScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
        isPermistted ? this.expertiseScientifiqueService.findAll().subscribe(expertiseScientifiques => this.expertiseScientifiques = expertiseScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToExpertiseScientifiqueCreate(){
this.router.navigate(['/app/chercheur/expertiseScientifique/create']);
}


  public searchRequest(){
        this.expertiseScientifiqueService.findByCriteria(this.searchExpertiseScientifique).subscribe(expertiseScientifiques=>{
            
            this.expertiseScientifiques = expertiseScientifiques;
           // this.searchExpertiseScientifique = new ExpertiseScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'annee', header: 'Annee'},
                            {field: 'intitule', header: 'Intitule'},
                        {field: 'typeExpertise?.libelle', header: 'Type expertise'},
                            {field: 'nombreJourConsacrePourCetteAnnee', header: 'Nombre jour consacre pour cette annee'},
                            {field: 'periodeRemiseRapportMois', header: 'Periode remise rapport mois'},
                            {field: 'periodeRemiseRapportAnnee', header: 'Periode remise rapport annee'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
        ];
    }
    
    public async editExpertiseScientifique(expertiseScientifique:ExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'edit');
         if(isPermistted){
          this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(res => {
           this.selectedExpertiseScientifique = res;
            this.navigateToExpertiseScientifiqueCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewExpertiseScientifique(expertiseScientifique:ExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'view');
        if(isPermistted){
           this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(res => {
           this.selectedExpertiseScientifique = res;
            this.viewExpertiseScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateExpertiseScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
            this.navigateToExpertiseScientifiqueCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteExpertiseScientifique(expertiseScientifique:ExpertiseScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Expertise scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.expertiseScientifiqueService.delete(expertiseScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.expertiseScientifiques.indexOf(expertiseScientifique);
                          position > -1 ? this.expertiseScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Expertise scientifique Supprimé',
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

public async loadTypeExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.typeExpertiseService.findAll().subscribe(typeExpertises => this.typeExpertises = typeExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateExpertiseScientifique(expertiseScientifique: ExpertiseScientifiqueVo) {

     this.expertiseScientifiqueService.findByIdWithAssociatedList(expertiseScientifique).subscribe(
	 res => {
	       this.initDuplicateExpertiseScientifique(res);
	       this.selectedExpertiseScientifique = res;
	       this.selectedExpertiseScientifique.id = null;
            this.navigateToExpertiseScientifiqueCreate() ;

});

	}

	initDuplicateExpertiseScientifique(res: ExpertiseScientifiqueVo) {
        if (res.communauteSavoirExpertiseScientifiquesVo != null) {
             res.communauteSavoirExpertiseScientifiquesVo.forEach(d => { d.expertiseScientifiqueVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueExpertiseScientifiquesVo != null) {
             res.disciplineScientifiqueExpertiseScientifiquesVo.forEach(d => { d.expertiseScientifiqueVo = null; d.id = null; });
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
    this.exportData = this.expertiseScientifiques.map(e => {
    return {
                    'Annee': e.annee ,
                    'Intitule': e.intitule ,
            'Type expertise': e.typeExpertiseVo?.libelle ,
                    'Nombre jour consacre pour cette annee': e.nombreJourConsacrePourCetteAnnee ,
                    'Periode remise rapport mois': e.periodeRemiseRapportMois ,
                    'Periode remise rapport annee': e.periodeRemiseRapportAnnee ,
            'Pays': e.paysVo?.libelle ,
            'Etablissement': e.etablissementVo?.libelle ,
                    'Commentaires eventuels': e.commentairesEventuels ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Annee Min': this.searchExpertiseScientifique.anneeMin ? this.searchExpertiseScientifique.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchExpertiseScientifique.anneeMax ? this.searchExpertiseScientifique.anneeMax : environment.emptyForExport ,
            'Intitule': this.searchExpertiseScientifique.intitule ? this.searchExpertiseScientifique.intitule : environment.emptyForExport ,
        'Type expertise': this.searchExpertiseScientifique.typeExpertiseVo?.libelle ? this.searchExpertiseScientifique.typeExpertiseVo?.libelle : environment.emptyForExport ,
            'Nombre jour consacre pour cette annee Min': this.searchExpertiseScientifique.nombreJourConsacrePourCetteAnneeMin ? this.searchExpertiseScientifique.nombreJourConsacrePourCetteAnneeMin : environment.emptyForExport ,
            'Nombre jour consacre pour cette annee Max': this.searchExpertiseScientifique.nombreJourConsacrePourCetteAnneeMax ? this.searchExpertiseScientifique.nombreJourConsacrePourCetteAnneeMax : environment.emptyForExport ,
            'Periode remise rapport mois Min': this.searchExpertiseScientifique.periodeRemiseRapportMoisMin ? this.searchExpertiseScientifique.periodeRemiseRapportMoisMin : environment.emptyForExport ,
            'Periode remise rapport mois Max': this.searchExpertiseScientifique.periodeRemiseRapportMoisMax ? this.searchExpertiseScientifique.periodeRemiseRapportMoisMax : environment.emptyForExport ,
            'Periode remise rapport annee Min': this.searchExpertiseScientifique.periodeRemiseRapportAnneeMin ? this.searchExpertiseScientifique.periodeRemiseRapportAnneeMin : environment.emptyForExport ,
            'Periode remise rapport annee Max': this.searchExpertiseScientifique.periodeRemiseRapportAnneeMax ? this.searchExpertiseScientifique.periodeRemiseRapportAnneeMax : environment.emptyForExport ,
        'Pays': this.searchExpertiseScientifique.paysVo?.libelle ? this.searchExpertiseScientifique.paysVo?.libelle : environment.emptyForExport ,
        'Etablissement': this.searchExpertiseScientifique.etablissementVo?.libelle ? this.searchExpertiseScientifique.etablissementVo?.libelle : environment.emptyForExport ,
            'Commentaires eventuels': this.searchExpertiseScientifique.commentairesEventuels ? this.searchExpertiseScientifique.commentairesEventuels : environment.emptyForExport ,
        'Etat etape campagne': this.searchExpertiseScientifique.etatEtapeCampagneVo?.libelle ? this.searchExpertiseScientifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchExpertiseScientifique.chercheurVo?.numeroMatricule ? this.searchExpertiseScientifique.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchExpertiseScientifique.campagneVo?.libelle ? this.searchExpertiseScientifique.campagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
           return this.expertiseScientifiqueService.expertiseScientifiques;
       }
    set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
       }

    get expertiseScientifiqueSelections(): Array<ExpertiseScientifiqueVo> {
           return this.expertiseScientifiqueService.expertiseScientifiqueSelections;
       }
    set expertiseScientifiqueSelections(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiqueSelections = value;
       }
   
     


    get selectedExpertiseScientifique():ExpertiseScientifiqueVo {
           return this.expertiseScientifiqueService.selectedExpertiseScientifique;
       }
    set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
       }
    
    get createExpertiseScientifiqueDialog():boolean {
           return this.expertiseScientifiqueService.createExpertiseScientifiqueDialog;
       }
    set createExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.createExpertiseScientifiqueDialog= value;
       }
    
    get editExpertiseScientifiqueDialog():boolean {
           return this.expertiseScientifiqueService.editExpertiseScientifiqueDialog;
       }
    set editExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.editExpertiseScientifiqueDialog= value;
       }
    get viewExpertiseScientifiqueDialog():boolean {
           return this.expertiseScientifiqueService.viewExpertiseScientifiqueDialog;
       }
    set viewExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.viewExpertiseScientifiqueDialog = value;
       }
       
     get searchExpertiseScientifique(): ExpertiseScientifiqueVo {
        return this.expertiseScientifiqueService.searchExpertiseScientifique;
       }
    set searchExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.searchExpertiseScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

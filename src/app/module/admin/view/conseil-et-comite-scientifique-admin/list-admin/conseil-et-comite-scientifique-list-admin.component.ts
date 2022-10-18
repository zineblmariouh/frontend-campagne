import {Component, OnInit} from '@angular/core';
import {ConseilEtComiteScientifiqueService} from '../../../../../controller/service/ConseilEtComiteScientifique.service';
import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirConseilEtComiteScientifique.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-conseil-et-comite-scientifique-list-admin',
  templateUrl: './conseil-et-comite-scientifique-list-admin.component.html',
  styleUrls: ['./conseil-et-comite-scientifique-list-admin.component.css']
})
export class ConseilEtComiteScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ConseilEtComiteScientifique';
    payss :Array<PaysVo>;
    etablissements :Array<EtablissementVo>;
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private etablissementService: EtablissementService
        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadConseilEtComiteScientifiques();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadEtablissement();
      this.loadChercheur();
      this.loadCampagne();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadConseilEtComiteScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
        isPermistted ? this.conseilEtComiteScientifiqueService.findAll().subscribe(conseilEtComiteScientifiques => this.conseilEtComiteScientifiques = conseilEtComiteScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.conseilEtComiteScientifiqueService.findByCriteria(this.searchConseilEtComiteScientifique).subscribe(conseilEtComiteScientifiques=>{
            
            this.conseilEtComiteScientifiques = conseilEtComiteScientifiques;
           // this.searchConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                            {field: 'intitule', header: 'Intitule'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                            {field: 'nombreJoursParAnnee', header: 'Nombre jours par annee'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editConseilEtComiteScientifique(conseilEtComiteScientifique:ConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'edit');
         if(isPermistted){
          this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(res => {
           this.selectedConseilEtComiteScientifique = res;
            this.editConseilEtComiteScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewConseilEtComiteScientifique(conseilEtComiteScientifique:ConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'view');
        if(isPermistted){
           this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(res => {
           this.selectedConseilEtComiteScientifique = res;
            this.viewConseilEtComiteScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateConseilEtComiteScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
            this.createConseilEtComiteScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteConseilEtComiteScientifique(conseilEtComiteScientifique:ConseilEtComiteScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Conseil et comite scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.conseilEtComiteScientifiqueService.delete(conseilEtComiteScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.conseilEtComiteScientifiques.indexOf(conseilEtComiteScientifique);
                          position > -1 ? this.conseilEtComiteScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Conseil et comite scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateConseilEtComiteScientifique(conseilEtComiteScientifique: ConseilEtComiteScientifiqueVo) {

     this.conseilEtComiteScientifiqueService.findByIdWithAssociatedList(conseilEtComiteScientifique).subscribe(
	 res => {
	       this.initDuplicateConseilEtComiteScientifique(res);
	       this.selectedConseilEtComiteScientifique = res;
	       this.selectedConseilEtComiteScientifique.id = null;
            this.createConseilEtComiteScientifiqueDialog = true;

});

	}

	initDuplicateConseilEtComiteScientifique(res: ConseilEtComiteScientifiqueVo) {
        if (res.communauteSavoirConseilEtComiteScientifiquesVo != null) {
             res.communauteSavoirConseilEtComiteScientifiquesVo.forEach(d => { d.conseilEtComiteScientifiqueVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueConseilEtComiteScientifiquesVo != null) {
             res.disciplineScientifiqueConseilEtComiteScientifiquesVo.forEach(d => { d.conseilEtComiteScientifiqueVo = null; d.id = null; });
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
    this.exportData = this.conseilEtComiteScientifiques.map(e => {
    return {
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
                    'Intitule': e.intitule ,
            'Pays': e.paysVo?.libelle ,
            'Etablissement': e.etablissementVo?.libelle ,
                    'Nombre jours par annee': e.nombreJoursParAnnee ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Temps estime pour cette annne Min': this.searchConseilEtComiteScientifique.tempsEstimePourCetteAnnneMin ? this.searchConseilEtComiteScientifique.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchConseilEtComiteScientifique.tempsEstimePourCetteAnnneMax ? this.searchConseilEtComiteScientifique.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
            'Intitule': this.searchConseilEtComiteScientifique.intitule ? this.searchConseilEtComiteScientifique.intitule : environment.emptyForExport ,
        'Pays': this.searchConseilEtComiteScientifique.paysVo?.libelle ? this.searchConseilEtComiteScientifique.paysVo?.libelle : environment.emptyForExport ,
        'Etablissement': this.searchConseilEtComiteScientifique.etablissementVo?.libelle ? this.searchConseilEtComiteScientifique.etablissementVo?.libelle : environment.emptyForExport ,
            'Nombre jours par annee Min': this.searchConseilEtComiteScientifique.nombreJoursParAnneeMin ? this.searchConseilEtComiteScientifique.nombreJoursParAnneeMin : environment.emptyForExport ,
            'Nombre jours par annee Max': this.searchConseilEtComiteScientifique.nombreJoursParAnneeMax ? this.searchConseilEtComiteScientifique.nombreJoursParAnneeMax : environment.emptyForExport ,
        'Chercheur': this.searchConseilEtComiteScientifique.chercheurVo?.numeroMatricule ? this.searchConseilEtComiteScientifique.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchConseilEtComiteScientifique.campagneVo?.libelle ? this.searchConseilEtComiteScientifique.campagneVo?.libelle : environment.emptyForExport ,
        'Etat etape campagne': this.searchConseilEtComiteScientifique.etatEtapeCampagneVo?.libelle ? this.searchConseilEtComiteScientifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
    set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }

    get conseilEtComiteScientifiqueSelections(): Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiqueSelections;
       }
    set conseilEtComiteScientifiqueSelections(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiqueSelections = value;
       }
   
     


    get selectedConseilEtComiteScientifique():ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
    set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }
    
    get createConseilEtComiteScientifiqueDialog():boolean {
           return this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog;
       }
    set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog= value;
       }
    
    get editConseilEtComiteScientifiqueDialog():boolean {
           return this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog;
       }
    set editConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog= value;
       }
    get viewConseilEtComiteScientifiqueDialog():boolean {
           return this.conseilEtComiteScientifiqueService.viewConseilEtComiteScientifiqueDialog;
       }
    set viewConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.viewConseilEtComiteScientifiqueDialog = value;
       }
       
     get searchConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
        return this.conseilEtComiteScientifiqueService.searchConseilEtComiteScientifique;
       }
    set searchConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.searchConseilEtComiteScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

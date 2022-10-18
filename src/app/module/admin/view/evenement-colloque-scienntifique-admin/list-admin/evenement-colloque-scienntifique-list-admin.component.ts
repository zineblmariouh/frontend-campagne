import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ModaliteService } from '../../../../../controller/service/Modalite.service';
import { ModaliteInterventionService } from '../../../../../controller/service/ModaliteIntervention.service';
import { SavoirEtInnovationService } from '../../../../../controller/service/SavoirEtInnovation.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-list-admin',
  templateUrl: './evenement-colloque-scienntifique-list-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-list-admin.component.css']
})
export class EvenementColloqueScienntifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EvenementColloqueScienntifique';
     yesOrNoDiplomatieStategique :any[] =[];
    modalites :Array<ModaliteVo>;
    modaliteInterventions :Array<ModaliteInterventionVo>;
    savoirEtInnovations :Array<SavoirEtInnovationVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private modaliteService: ModaliteService
        , private modaliteInterventionService: ModaliteInterventionService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadEvenementColloqueScienntifiques();
      this.initExport();
      this.initCol();
      this.loadModalite();
      this.loadModaliteIntervention();
      this.loadSavoirEtInnovation();
      this.loadEtatEtapeCampagne();
    this.yesOrNoDiplomatieStategique =  [{label: 'DiplomatieStategique', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEvenementColloqueScienntifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
        isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.evenementColloqueScienntifiqueService.findByCriteria(this.searchEvenementColloqueScienntifique).subscribe(evenementColloqueScienntifiques=>{
            
            this.evenementColloqueScienntifiques = evenementColloqueScienntifiques;
           // this.searchEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'intitule', header: 'Intitule'},
                        {field: 'modalite?.libelle', header: 'Modalite'},
                            {field: 'typeDeParticipation', header: 'Type de participation'},
                            {field: 'dateEvenement', header: 'Date evenement'},
                            {field: 'diplomatieStategique', header: 'Diplomatie stategique'},
                        {field: 'modaliteIntervention?.libelle', header: 'Modalite intervention'},
                            {field: 'volumeParticipant', header: 'Volume participant'},
                        {field: 'savoirEtInnovation?.id', header: 'Savoir et innovation'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editEvenementColloqueScienntifique(evenementColloqueScienntifique:EvenementColloqueScienntifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'edit');
         if(isPermistted){
          this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(res => {
           this.selectedEvenementColloqueScienntifique = res;
            this.selectedEvenementColloqueScienntifique.dateEvenement = new Date(evenementColloqueScienntifique.dateEvenement);
            this.editEvenementColloqueScienntifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEvenementColloqueScienntifique(evenementColloqueScienntifique:EvenementColloqueScienntifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'view');
        if(isPermistted){
           this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(res => {
           this.selectedEvenementColloqueScienntifique = res;
            this.selectedEvenementColloqueScienntifique.dateEvenement = new Date(evenementColloqueScienntifique.dateEvenement);
            this.viewEvenementColloqueScienntifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEvenementColloqueScienntifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
            this.createEvenementColloqueScienntifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEvenementColloqueScienntifique(evenementColloqueScienntifique:EvenementColloqueScienntifiqueVo){
       const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Evenement colloque scienntifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.evenementColloqueScienntifiqueService.delete(evenementColloqueScienntifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.evenementColloqueScienntifiques.indexOf(evenementColloqueScienntifique);
                          position > -1 ? this.evenementColloqueScienntifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Evenement colloque scienntifique Supprimé',
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

public async loadModalite(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
    isPermistted ? this.modaliteService.findAll().subscribe(modalites => this.modalites = modalites,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadModaliteIntervention(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
    isPermistted ? this.modaliteInterventionService.findAll().subscribe(modaliteInterventions => this.modaliteInterventions = modaliteInterventions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSavoirEtInnovation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
    isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEvenementColloqueScienntifique(evenementColloqueScienntifique: EvenementColloqueScienntifiqueVo) {

     this.evenementColloqueScienntifiqueService.findByIdWithAssociatedList(evenementColloqueScienntifique).subscribe(
	 res => {
	       this.initDuplicateEvenementColloqueScienntifique(res);
	       this.selectedEvenementColloqueScienntifique = res;
	       this.selectedEvenementColloqueScienntifique.id = null;
            this.createEvenementColloqueScienntifiqueDialog = true;

});

	}

	initDuplicateEvenementColloqueScienntifique(res: EvenementColloqueScienntifiqueVo) {
        if (res.evenementColloqueScienntifiqueEnjeuxIrdsVo != null) {
             res.evenementColloqueScienntifiqueEnjeuxIrdsVo.forEach(d => { d.evenementColloqueScienntifiqueVo = null; d.id = null; });
                }
        if (res.communauteSavoirEvenementColloqueScientifiquesVo != null) {
             res.communauteSavoirEvenementColloqueScientifiquesVo.forEach(d => { d.evenementColloqueScienntifiqueVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueEvenementColloqueScientifiquesVo != null) {
             res.disciplineScientifiqueEvenementColloqueScientifiquesVo.forEach(d => { d.evenementColloqueScienntifiqueVo = null; d.id = null; });
                }
        if (res.evenementColloqueScienntifiquePayssVo != null) {
             res.evenementColloqueScienntifiquePayssVo.forEach(d => { d.evenementColloqueScienntifiqueVo = null; d.id = null; });
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
    this.exportData = this.evenementColloqueScienntifiques.map(e => {
    return {
                    'Intitule': e.intitule ,
            'Modalite': e.modaliteVo?.libelle ,
                    'Type de participation': e.typeDeParticipation ,
                    'Date evenement': this.datePipe.transform(e.dateEvenement , 'dd-MM-yyyy'),
                    'Diplomatie stategique': e.diplomatieStategique? 'Vrai' : 'Faux' ,
            'Modalite intervention': e.modaliteInterventionVo?.libelle ,
                    'Volume participant': e.volumeParticipant ,
            'Savoir et innovation': e.savoirEtInnovationVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Intitule': this.searchEvenementColloqueScienntifique.intitule ? this.searchEvenementColloqueScienntifique.intitule : environment.emptyForExport ,
        'Modalite': this.searchEvenementColloqueScienntifique.modaliteVo?.libelle ? this.searchEvenementColloqueScienntifique.modaliteVo?.libelle : environment.emptyForExport ,
            'Type de participation': this.searchEvenementColloqueScienntifique.typeDeParticipation ? this.searchEvenementColloqueScienntifique.typeDeParticipation : environment.emptyForExport ,
            'Date evenement Min': this.searchEvenementColloqueScienntifique.dateEvenementMin ? this.datePipe.transform(this.searchEvenementColloqueScienntifique.dateEvenementMin , this.dateFormat) : environment.emptyForExport ,
            'Date evenement Max': this.searchEvenementColloqueScienntifique.dateEvenementMax ? this.datePipe.transform(this.searchEvenementColloqueScienntifique.dateEvenementMax , this.dateFormat) : environment.emptyForExport ,
            'Diplomatie stategique': this.searchEvenementColloqueScienntifique.diplomatieStategique ? (this.searchEvenementColloqueScienntifique.diplomatieStategique ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Modalite intervention': this.searchEvenementColloqueScienntifique.modaliteInterventionVo?.libelle ? this.searchEvenementColloqueScienntifique.modaliteInterventionVo?.libelle : environment.emptyForExport ,
            'Volume participant Min': this.searchEvenementColloqueScienntifique.volumeParticipantMin ? this.searchEvenementColloqueScienntifique.volumeParticipantMin : environment.emptyForExport ,
            'Volume participant Max': this.searchEvenementColloqueScienntifique.volumeParticipantMax ? this.searchEvenementColloqueScienntifique.volumeParticipantMax : environment.emptyForExport ,
        'Savoir et innovation': this.searchEvenementColloqueScienntifique.savoirEtInnovationVo?.id ? this.searchEvenementColloqueScienntifique.savoirEtInnovationVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchEvenementColloqueScienntifique.etatEtapeCampagneVo?.libelle ? this.searchEvenementColloqueScienntifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
    set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }

    get evenementColloqueScienntifiqueSelections(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiqueSelections;
       }
    set evenementColloqueScienntifiqueSelections(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiqueSelections = value;
       }
   
     


    get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
    set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
    
    get createEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
       }
    set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
       }
    
    get editEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;
       }
    set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog= value;
       }
    get viewEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog;
       }
    set viewEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.viewEvenementColloqueScienntifiqueDialog = value;
       }
       
     get searchEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
        return this.evenementColloqueScienntifiqueService.searchEvenementColloqueScienntifique;
       }
    set searchEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.searchEvenementColloqueScienntifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

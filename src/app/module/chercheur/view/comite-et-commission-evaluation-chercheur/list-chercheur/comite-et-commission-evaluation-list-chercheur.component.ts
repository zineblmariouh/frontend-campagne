import {Component, OnInit} from '@angular/core';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NatureExpertiseService } from '../../../../../controller/service/NatureExpertise.service';
import { ExpertiseService } from '../../../../../controller/service/Expertise.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-comite-et-commission-evaluation-list-chercheur',
  templateUrl: './comite-et-commission-evaluation-list-chercheur.component.html',
  styleUrls: ['./comite-et-commission-evaluation-list-chercheur.component.css']
})
export class ComiteEtCommissionEvaluationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ComiteEtCommissionEvaluation';
     yesOrNoRelieeInstrumentsIrd :any[] =[];
    natureExpertises :Array<NatureExpertiseVo>;
    expertises :Array<ExpertiseVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private natureExpertiseService: NatureExpertiseService
        , private expertiseService: ExpertiseService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadComiteEtCommissionEvaluations();
      this.initExport();
      this.initCol();
      this.loadNatureExpertise();
      this.loadExpertise();
      this.loadEtatEtapeCampagne();
    this.yesOrNoRelieeInstrumentsIrd =  [{label: 'RelieeInstrumentsIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadComiteEtCommissionEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'list');
        isPermistted ? this.comiteEtCommissionEvaluationService.findAll().subscribe(comiteEtCommissionEvaluations => this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.comiteEtCommissionEvaluationService.findByCriteria(this.searchComiteEtCommissionEvaluation).subscribe(comiteEtCommissionEvaluations=>{
            
            this.comiteEtCommissionEvaluations = comiteEtCommissionEvaluations;
           // this.searchComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'natureExpertise?.libelle', header: 'Nature expertise'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'nomRevueOuEditeur', header: 'Nom revue ou editeur'},
                            {field: 'role', header: 'Role'},
                            {field: 'nombreJourDedie', header: 'Nombre jour dedie'},
                            {field: 'relieeInstrumentsIrd', header: 'Reliee instruments ird'},
                        {field: 'expertise?.id', header: 'Expertise'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editComiteEtCommissionEvaluation(comiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'edit');
         if(isPermistted){
          this.comiteEtCommissionEvaluationService.findByIdWithAssociatedList(comiteEtCommissionEvaluation).subscribe(res => {
           this.selectedComiteEtCommissionEvaluation = res;
            this.editComiteEtCommissionEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewComiteEtCommissionEvaluation(comiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'view');
        if(isPermistted){
           this.comiteEtCommissionEvaluationService.findByIdWithAssociatedList(comiteEtCommissionEvaluation).subscribe(res => {
           this.selectedComiteEtCommissionEvaluation = res;
            this.viewComiteEtCommissionEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateComiteEtCommissionEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
            this.createComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteComiteEtCommissionEvaluation(comiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Comite et commission evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.comiteEtCommissionEvaluationService.delete(comiteEtCommissionEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.comiteEtCommissionEvaluations.indexOf(comiteEtCommissionEvaluation);
                          position > -1 ? this.comiteEtCommissionEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Comite et commission evaluation Supprimé',
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

public async loadNatureExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.natureExpertiseService.findAll().subscribe(natureExpertises => this.natureExpertises = natureExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.expertiseService.findAll().subscribe(expertises => this.expertises = expertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateComiteEtCommissionEvaluation(comiteEtCommissionEvaluation: ComiteEtCommissionEvaluationVo) {

     this.comiteEtCommissionEvaluationService.findByIdWithAssociatedList(comiteEtCommissionEvaluation).subscribe(
	 res => {
	       this.initDuplicateComiteEtCommissionEvaluation(res);
	       this.selectedComiteEtCommissionEvaluation = res;
	       this.selectedComiteEtCommissionEvaluation.id = null;
            this.createComiteEtCommissionEvaluationDialog = true;

});

	}

	initDuplicateComiteEtCommissionEvaluation(res: ComiteEtCommissionEvaluationVo) {
        if (res.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo != null) {
             res.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
                }
        if (res.etablissementComiteEtCommissionEvaluationsVo != null) {
             res.etablissementComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
                }
        if (res.roleComiteEtCommissionEvaluationsVo != null) {
             res.roleComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueComiteEtCommissionEvaluationsVo != null) {
             res.disciplineScientifiqueComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
                }
        if (res.enjeuxIrdComiteEtCommissionEvaluationsVo != null) {
             res.enjeuxIrdComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
                }
        if (res.instrumentIrdComiteEtCommissionEvaluationsVo != null) {
             res.instrumentIrdComiteEtCommissionEvaluationsVo.forEach(d => { d.comiteEtCommissionEvaluationVo = null; d.id = null; });
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
    this.exportData = this.comiteEtCommissionEvaluations.map(e => {
    return {
            'Nature expertise': e.natureExpertiseVo?.libelle ,
                    'Nom': e.nom ,
                    'Nom revue ou editeur': e.nomRevueOuEditeur ,
                    'Role': e.role ,
                    'Nombre jour dedie': e.nombreJourDedie ,
                    'Reliee instruments ird': e.relieeInstrumentsIrd? 'Vrai' : 'Faux' ,
                    'Commentaire': e.commentaire ,
            'Expertise': e.expertiseVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Nature expertise': this.searchComiteEtCommissionEvaluation.natureExpertiseVo?.libelle ? this.searchComiteEtCommissionEvaluation.natureExpertiseVo?.libelle : environment.emptyForExport ,
            'Nom': this.searchComiteEtCommissionEvaluation.nom ? this.searchComiteEtCommissionEvaluation.nom : environment.emptyForExport ,
            'Nom revue ou editeur': this.searchComiteEtCommissionEvaluation.nomRevueOuEditeur ? this.searchComiteEtCommissionEvaluation.nomRevueOuEditeur : environment.emptyForExport ,
            'Role': this.searchComiteEtCommissionEvaluation.role ? this.searchComiteEtCommissionEvaluation.role : environment.emptyForExport ,
            'Nombre jour dedie Min': this.searchComiteEtCommissionEvaluation.nombreJourDedieMin ? this.searchComiteEtCommissionEvaluation.nombreJourDedieMin : environment.emptyForExport ,
            'Nombre jour dedie Max': this.searchComiteEtCommissionEvaluation.nombreJourDedieMax ? this.searchComiteEtCommissionEvaluation.nombreJourDedieMax : environment.emptyForExport ,
            'Reliee instruments ird': this.searchComiteEtCommissionEvaluation.relieeInstrumentsIrd ? (this.searchComiteEtCommissionEvaluation.relieeInstrumentsIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Commentaire': this.searchComiteEtCommissionEvaluation.commentaire ? this.searchComiteEtCommissionEvaluation.commentaire : environment.emptyForExport ,
        'Expertise': this.searchComiteEtCommissionEvaluation.expertiseVo?.id ? this.searchComiteEtCommissionEvaluation.expertiseVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchComiteEtCommissionEvaluation.etatEtapeCampagneVo?.libelle ? this.searchComiteEtCommissionEvaluation.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
    set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }

    get comiteEtCommissionEvaluationSelections(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluationSelections;
       }
    set comiteEtCommissionEvaluationSelections(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluationSelections = value;
       }
   
     


    get selectedComiteEtCommissionEvaluation():ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
    set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
    
    get createComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;
       }
    set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
       }
    
    get editComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog;
       }
    set editComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog= value;
       }
    get viewComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.viewComiteEtCommissionEvaluationDialog;
       }
    set viewComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.viewComiteEtCommissionEvaluationDialog = value;
       }
       
     get searchComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
        return this.comiteEtCommissionEvaluationService.searchComiteEtCommissionEvaluation;
       }
    set searchComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.searchComiteEtCommissionEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

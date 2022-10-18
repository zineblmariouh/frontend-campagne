import {Component, OnInit} from '@angular/core';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeExpertiseService } from '../../../../../controller/service/TypeExpertise.service';
import { NatureExpertiseService } from '../../../../../controller/service/NatureExpertise.service';
import { ExpertiseService } from '../../../../../controller/service/Expertise.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-consultance-scientifique-ponctuelle-list-chercheur',
  templateUrl: './consultance-scientifique-ponctuelle-list-chercheur.component.html',
  styleUrls: ['./consultance-scientifique-ponctuelle-list-chercheur.component.css']
})
export class ConsultanceScientifiquePonctuelleListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ConsultanceScientifiquePonctuelle';
     yesOrNoRelieeInstrumentsIrd :any[] =[];
    typeExpertises :Array<TypeExpertiseVo>;
    natureExpertises :Array<NatureExpertiseVo>;
    expertises :Array<ExpertiseVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeExpertiseService: TypeExpertiseService
        , private natureExpertiseService: NatureExpertiseService
        , private expertiseService: ExpertiseService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadTypeExpertise();
      this.loadNatureExpertise();
      this.loadExpertise();
      this.loadEtatEtapeCampagne();
    this.yesOrNoRelieeInstrumentsIrd =  [{label: 'RelieeInstrumentsIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.consultanceScientifiquePonctuelleService.findByCriteria(this.searchConsultanceScientifiquePonctuelle).subscribe(consultanceScientifiquePonctuelles=>{
            
            this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles;
           // this.searchConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeExpertise?.libelle', header: 'Type expertise'},
                        {field: 'natureExpertise?.libelle', header: 'Nature expertise'},
                            {field: 'sujetExpertise', header: 'Sujet expertise'},
                            {field: 'nombreJourDedie', header: 'Nombre jour dedie'},
                            {field: 'dateFin', header: 'Date fin'},
                            {field: 'relieeInstrumentsIrd', header: 'Reliee instruments ird'},
                        {field: 'expertise?.id', header: 'Expertise'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editConsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.consultanceScientifiquePonctuelleService.findByIdWithAssociatedList(consultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedConsultanceScientifiquePonctuelle = res;
            this.selectedConsultanceScientifiquePonctuelle.dateFin = new Date(consultanceScientifiquePonctuelle.dateFin);
            this.editConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewConsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.consultanceScientifiquePonctuelleService.findByIdWithAssociatedList(consultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedConsultanceScientifiquePonctuelle = res;
            this.selectedConsultanceScientifiquePonctuelle.dateFin = new Date(consultanceScientifiquePonctuelle.dateFin);
            this.viewConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
            this.createConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteConsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle:ConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.consultanceScientifiquePonctuelleService.delete(consultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.consultanceScientifiquePonctuelles.indexOf(consultanceScientifiquePonctuelle);
                          position > -1 ? this.consultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Consultance scientifique ponctuelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.typeExpertiseService.findAll().subscribe(typeExpertises => this.typeExpertises = typeExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadNatureExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.natureExpertiseService.findAll().subscribe(natureExpertises => this.natureExpertises = natureExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.expertiseService.findAll().subscribe(expertises => this.expertises = expertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateConsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: ConsultanceScientifiquePonctuelleVo) {

     this.consultanceScientifiquePonctuelleService.findByIdWithAssociatedList(consultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateConsultanceScientifiquePonctuelle(res);
	       this.selectedConsultanceScientifiquePonctuelle = res;
	       this.selectedConsultanceScientifiquePonctuelle.id = null;
            this.createConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateConsultanceScientifiquePonctuelle(res: ConsultanceScientifiquePonctuelleVo) {
        if (res.zoneGeographiqueConsultanceScientifiquePonctuellesVo != null) {
             res.zoneGeographiqueConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.paysCommanditairesVo != null) {
             res.paysCommanditairesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.etablissementConsultanceScientifiquePonctuellesVo != null) {
             res.etablissementConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueConsultanceScientifiquePonctuellesVo != null) {
             res.disciplineScientifiqueConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.enjeuxIrdConsultanceScientifiquePonctuellesVo != null) {
             res.enjeuxIrdConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.instrumentIrdConsultanceScientifiquePonctuellesVo != null) {
             res.instrumentIrdConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
                }
        if (res.typeInstrumentIrdConsultanceScientifiquePonctuellesVo != null) {
             res.typeInstrumentIrdConsultanceScientifiquePonctuellesVo.forEach(d => { d.consultanceScientifiquePonctuelleVo = null; d.id = null; });
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
    this.exportData = this.consultanceScientifiquePonctuelles.map(e => {
    return {
            'Type expertise': e.typeExpertiseVo?.libelle ,
            'Nature expertise': e.natureExpertiseVo?.libelle ,
                    'Sujet expertise': e.sujetExpertise ,
                    'Nombre jour dedie': e.nombreJourDedie ,
                    'Date fin': this.datePipe.transform(e.dateFin , 'dd-MM-yyyy'),
                    'Reliee instruments ird': e.relieeInstrumentsIrd? 'Vrai' : 'Faux' ,
                    'Commentaire': e.commentaire ,
            'Expertise': e.expertiseVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Type expertise': this.searchConsultanceScientifiquePonctuelle.typeExpertiseVo?.libelle ? this.searchConsultanceScientifiquePonctuelle.typeExpertiseVo?.libelle : environment.emptyForExport ,
        'Nature expertise': this.searchConsultanceScientifiquePonctuelle.natureExpertiseVo?.libelle ? this.searchConsultanceScientifiquePonctuelle.natureExpertiseVo?.libelle : environment.emptyForExport ,
            'Sujet expertise': this.searchConsultanceScientifiquePonctuelle.sujetExpertise ? this.searchConsultanceScientifiquePonctuelle.sujetExpertise : environment.emptyForExport ,
            'Nombre jour dedie Min': this.searchConsultanceScientifiquePonctuelle.nombreJourDedieMin ? this.searchConsultanceScientifiquePonctuelle.nombreJourDedieMin : environment.emptyForExport ,
            'Nombre jour dedie Max': this.searchConsultanceScientifiquePonctuelle.nombreJourDedieMax ? this.searchConsultanceScientifiquePonctuelle.nombreJourDedieMax : environment.emptyForExport ,
            'Date fin Min': this.searchConsultanceScientifiquePonctuelle.dateFinMin ? this.datePipe.transform(this.searchConsultanceScientifiquePonctuelle.dateFinMin , this.dateFormat) : environment.emptyForExport ,
            'Date fin Max': this.searchConsultanceScientifiquePonctuelle.dateFinMax ? this.datePipe.transform(this.searchConsultanceScientifiquePonctuelle.dateFinMax , this.dateFormat) : environment.emptyForExport ,
            'Reliee instruments ird': this.searchConsultanceScientifiquePonctuelle.relieeInstrumentsIrd ? (this.searchConsultanceScientifiquePonctuelle.relieeInstrumentsIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Commentaire': this.searchConsultanceScientifiquePonctuelle.commentaire ? this.searchConsultanceScientifiquePonctuelle.commentaire : environment.emptyForExport ,
        'Expertise': this.searchConsultanceScientifiquePonctuelle.expertiseVo?.id ? this.searchConsultanceScientifiquePonctuelle.expertiseVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchConsultanceScientifiquePonctuelle.etatEtapeCampagneVo?.libelle ? this.searchConsultanceScientifiquePonctuelle.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
    set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }

    get consultanceScientifiquePonctuelleSelections(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelleSelections;
       }
    set consultanceScientifiquePonctuelleSelections(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedConsultanceScientifiquePonctuelle():ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
    set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
    
    get createConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
    set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog;
       }
    set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.viewConsultanceScientifiquePonctuelleDialog;
       }
    set viewConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.viewConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
        return this.consultanceScientifiquePonctuelleService.searchConsultanceScientifiquePonctuelle;
       }
    set searchConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.searchConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

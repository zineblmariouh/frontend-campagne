import {Component, OnInit} from '@angular/core';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ModaliteEtudeService } from '../../../../../controller/service/ModaliteEtude.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';
import { EnseignementEtFormationService } from '../../../../../controller/service/EnseignementEtFormation.service';

import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-list-chercheur',
  templateUrl: './enseignement-list-chercheur.component.html',
  styleUrls: ['./enseignement-list-chercheur.component.css']
})
export class EnseignementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Enseignement';
     yesOrNoEtabilssementNonReconnu :any[] =[];
    modaliteEtudes :Array<ModaliteEtudeVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    enseignementEtFormations :Array<EnseignementEtFormationVo>;


    constructor(private datePipe: DatePipe, private enseignementService: EnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private modaliteEtudeService: ModaliteEtudeService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private enseignementEtFormationService: EnseignementEtFormationService
) { }

    ngOnInit(): void {
      this.loadEnseignements();
      this.initExport();
      this.initCol();
      this.loadModaliteEtude();
      this.loadEtatEtapeCampagne();
      this.loadEnseignementEtFormation();
    this.yesOrNoEtabilssementNonReconnu =  [{label: 'EtabilssementNonReconnu', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Enseignement', 'list');
        isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enseignementService.findByCriteria(this.searchEnseignement).subscribe(enseignements=>{
            
            this.enseignements = enseignements;
           // this.searchEnseignement = new EnseignementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'intitule', header: 'Intitule'},
                            {field: 'nombreHeure', header: 'Nombre heure'},
                        {field: 'modaliteEtude?.libelle', header: 'Modalite etude'},
                            {field: 'etabilssementNonReconnu', header: 'Etabilssement non reconnu'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'enseignementEtFormation?.id', header: 'Enseignement et formation'},
        ];
    }
    
    public async editEnseignement(enseignement:EnseignementVo){
        const isPermistted = await this.roleService.isPermitted('Enseignement', 'edit');
         if(isPermistted){
          this.enseignementService.findByIdWithAssociatedList(enseignement).subscribe(res => {
           this.selectedEnseignement = res;
            this.editEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignement(enseignement:EnseignementVo){
        const isPermistted = await this.roleService.isPermitted('Enseignement', 'view');
        if(isPermistted){
           this.enseignementService.findByIdWithAssociatedList(enseignement).subscribe(res => {
           this.selectedEnseignement = res;
            this.viewEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
            this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignement(enseignement:EnseignementVo){
       const isPermistted = await this.roleService.isPermitted('Enseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementService.delete(enseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignements.indexOf(enseignement);
                          position > -1 ? this.enseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement Supprimé',
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

public async loadModaliteEtude(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Enseignement', 'list');
    isPermistted ? this.modaliteEtudeService.findAll().subscribe(modaliteEtudes => this.modaliteEtudes = modaliteEtudes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Enseignement', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignementEtFormation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Enseignement', 'list');
    isPermistted ? this.enseignementEtFormationService.findAll().subscribe(enseignementEtFormations => this.enseignementEtFormations = enseignementEtFormations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignement(enseignement: EnseignementVo) {

     this.enseignementService.findByIdWithAssociatedList(enseignement).subscribe(
	 res => {
	       this.initDuplicateEnseignement(res);
	       this.selectedEnseignement = res;
	       this.selectedEnseignement.id = null;
            this.createEnseignementDialog = true;

});

	}

	initDuplicateEnseignement(res: EnseignementVo) {
        if (res.typeEtudeEnseignementsVo != null) {
             res.typeEtudeEnseignementsVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.enseignementNaturesVo != null) {
             res.enseignementNaturesVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.niveauEtudeEnseignementsVo != null) {
             res.niveauEtudeEnseignementsVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.etablissementEnseignementsVo != null) {
             res.etablissementEnseignementsVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.enseignementZoneGeographiquesVo != null) {
             res.enseignementZoneGeographiquesVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.enseignementEnjeuxIrdsVo != null) {
             res.enseignementEnjeuxIrdsVo.forEach(d => { d.enseignementVo = null; d.id = null; });
                }
        if (res.enseignementDisciplineScientifiquesVo != null) {
             res.enseignementDisciplineScientifiquesVo.forEach(d => { d.enseignementVo = null; d.id = null; });
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
    this.exportData = this.enseignements.map(e => {
    return {
                    'Intitule': e.intitule ,
                    'Nombre heure': e.nombreHeure ,
            'Modalite etude': e.modaliteEtudeVo?.libelle ,
                    'Etabilssement non reconnu': e.etabilssementNonReconnu? 'Vrai' : 'Faux' ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Enseignement et formation': e.enseignementEtFormationVo?.id ,
     }
      });

      this.criteriaData = [{
            'Intitule': this.searchEnseignement.intitule ? this.searchEnseignement.intitule : environment.emptyForExport ,
            'Nombre heure Min': this.searchEnseignement.nombreHeureMin ? this.searchEnseignement.nombreHeureMin : environment.emptyForExport ,
            'Nombre heure Max': this.searchEnseignement.nombreHeureMax ? this.searchEnseignement.nombreHeureMax : environment.emptyForExport ,
        'Modalite etude': this.searchEnseignement.modaliteEtudeVo?.libelle ? this.searchEnseignement.modaliteEtudeVo?.libelle : environment.emptyForExport ,
            'Etabilssement non reconnu': this.searchEnseignement.etabilssementNonReconnu ? (this.searchEnseignement.etabilssementNonReconnu ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Etat etape campagne': this.searchEnseignement.etatEtapeCampagneVo?.libelle ? this.searchEnseignement.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Enseignement et formation': this.searchEnseignement.enseignementEtFormationVo?.id ? this.searchEnseignement.enseignementEtFormationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
    set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }

    get enseignementSelections(): Array<EnseignementVo> {
           return this.enseignementService.enseignementSelections;
       }
    set enseignementSelections(value: Array<EnseignementVo>) {
        this.enseignementService.enseignementSelections = value;
       }
   
     


    get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
    set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
    
    get createEnseignementDialog():boolean {
           return this.enseignementService.createEnseignementDialog;
       }
    set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }
    
    get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
    set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
       }
    get viewEnseignementDialog():boolean {
           return this.enseignementService.viewEnseignementDialog;
       }
    set viewEnseignementDialog(value: boolean) {
        this.enseignementService.viewEnseignementDialog = value;
       }
       
     get searchEnseignement(): EnseignementVo {
        return this.enseignementService.searchEnseignement;
       }
    set searchEnseignement(value: EnseignementVo) {
        this.enseignementService.searchEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

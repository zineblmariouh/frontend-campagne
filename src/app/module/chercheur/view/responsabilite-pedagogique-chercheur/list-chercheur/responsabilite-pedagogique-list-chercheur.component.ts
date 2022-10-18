import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NiveauResponsabilitePedagogiqueService } from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import { StatusCursusService } from '../../../../../controller/service/StatusCursus.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';
import { EnseignementEtFormationService } from '../../../../../controller/service/EnseignementEtFormation.service';

import {EnseignementEtFormationVo} from '../../../../../controller/model/EnseignementEtFormation.model';
import {StatusCursusVo} from '../../../../../controller/model/StatusCursus.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-responsabilite-pedagogique-list-chercheur',
  templateUrl: './responsabilite-pedagogique-list-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-list-chercheur.component.css']
})
export class ResponsabilitePedagogiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ResponsabilitePedagogique';
     yesOrNoServiceRenforcementCapacite :any[] =[];
     yesOrNoCursusConstruitAvecEtablissements :any[] =[];
    niveauResponsabilitePedagogiques :Array<NiveauResponsabilitePedagogiqueVo>;
    statusCursuss :Array<StatusCursusVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    enseignementEtFormations :Array<EnseignementEtFormationVo>;


    constructor(private datePipe: DatePipe, private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
        , private statusCursusService: StatusCursusService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private enseignementEtFormationService: EnseignementEtFormationService
) { }

    ngOnInit(): void {
      this.loadResponsabilitePedagogiques();
      this.initExport();
      this.initCol();
      this.loadNiveauResponsabilitePedagogique();
      this.loadStatusCursus();
      this.loadEtatEtapeCampagne();
      this.loadEnseignementEtFormation();
    this.yesOrNoServiceRenforcementCapacite =  [{label: 'ServiceRenforcementCapacite', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoCursusConstruitAvecEtablissements =  [{label: 'CursusConstruitAvecEtablissements', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadResponsabilitePedagogiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'list');
        isPermistted ? this.responsabilitePedagogiqueService.findAll().subscribe(responsabilitePedagogiques => this.responsabilitePedagogiques = responsabilitePedagogiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.responsabilitePedagogiqueService.findByCriteria(this.searchResponsabilitePedagogique).subscribe(responsabilitePedagogiques=>{
            
            this.responsabilitePedagogiques = responsabilitePedagogiques;
           // this.searchResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'niveauResponsabilitePedagogique?.libelle', header: 'Niveau responsabilite pedagogique'},
                        {field: 'statusCursus?.libelle', header: 'Status cursus'},
                            {field: 'intituleCursus', header: 'Intitule cursus'},
                            {field: 'serviceRenforcementCapacite', header: 'Service renforcement capacite'},
                            {field: 'cursusConstruitAvecEtablissements', header: 'Cursus construit avec etablissements'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'enseignementEtFormation?.id', header: 'Enseignement et formation'},
        ];
    }
    
    public async editResponsabilitePedagogique(responsabilitePedagogique:ResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'edit');
         if(isPermistted){
          this.responsabilitePedagogiqueService.findByIdWithAssociatedList(responsabilitePedagogique).subscribe(res => {
           this.selectedResponsabilitePedagogique = res;
            this.editResponsabilitePedagogiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewResponsabilitePedagogique(responsabilitePedagogique:ResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'view');
        if(isPermistted){
           this.responsabilitePedagogiqueService.findByIdWithAssociatedList(responsabilitePedagogique).subscribe(res => {
           this.selectedResponsabilitePedagogique = res;
            this.viewResponsabilitePedagogiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateResponsabilitePedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
            this.createResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteResponsabilitePedagogique(responsabilitePedagogique:ResponsabilitePedagogiqueVo){
       const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Responsabilite pedagogique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.responsabilitePedagogiqueService.delete(responsabilitePedagogique).subscribe(status=>{
                          if(status > 0){
                          const position = this.responsabilitePedagogiques.indexOf(responsabilitePedagogique);
                          position > -1 ? this.responsabilitePedagogiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Responsabilite pedagogique Supprimé',
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

public async loadNiveauResponsabilitePedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'list');
    isPermistted ? this.niveauResponsabilitePedagogiqueService.findAll().subscribe(niveauResponsabilitePedagogiques => this.niveauResponsabilitePedagogiques = niveauResponsabilitePedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadStatusCursus(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'list');
    isPermistted ? this.statusCursusService.findAll().subscribe(statusCursuss => this.statusCursuss = statusCursuss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignementEtFormation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'list');
    isPermistted ? this.enseignementEtFormationService.findAll().subscribe(enseignementEtFormations => this.enseignementEtFormations = enseignementEtFormations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateResponsabilitePedagogique(responsabilitePedagogique: ResponsabilitePedagogiqueVo) {

     this.responsabilitePedagogiqueService.findByIdWithAssociatedList(responsabilitePedagogique).subscribe(
	 res => {
	       this.initDuplicateResponsabilitePedagogique(res);
	       this.selectedResponsabilitePedagogique = res;
	       this.selectedResponsabilitePedagogique.id = null;
            this.createResponsabilitePedagogiqueDialog = true;

});

	}

	initDuplicateResponsabilitePedagogique(res: ResponsabilitePedagogiqueVo) {
        if (res.responsabilitePedagogiqueEnjeuxIrdsVo != null) {
             res.responsabilitePedagogiqueEnjeuxIrdsVo.forEach(d => { d.responsabilitePedagogiqueVo = null; d.id = null; });
                }
        if (res.responsabilitePedagogiqueEtablissementsVo != null) {
             res.responsabilitePedagogiqueEtablissementsVo.forEach(d => { d.responsabilitePedagogiqueVo = null; d.id = null; });
                }
        if (res.responsabilitePedagogiquePayssVo != null) {
             res.responsabilitePedagogiquePayssVo.forEach(d => { d.responsabilitePedagogiqueVo = null; d.id = null; });
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
    this.exportData = this.responsabilitePedagogiques.map(e => {
    return {
            'Niveau responsabilite pedagogique': e.niveauResponsabilitePedagogiqueVo?.libelle ,
            'Status cursus': e.statusCursusVo?.libelle ,
                    'Intitule cursus': e.intituleCursus ,
                    'Service renforcement capacite': e.serviceRenforcementCapacite? 'Vrai' : 'Faux' ,
                    'Cursus construit avec etablissements': e.cursusConstruitAvecEtablissements? 'Vrai' : 'Faux' ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Enseignement et formation': e.enseignementEtFormationVo?.id ,
     }
      });

      this.criteriaData = [{
        'Niveau responsabilite pedagogique': this.searchResponsabilitePedagogique.niveauResponsabilitePedagogiqueVo?.libelle ? this.searchResponsabilitePedagogique.niveauResponsabilitePedagogiqueVo?.libelle : environment.emptyForExport ,
        'Status cursus': this.searchResponsabilitePedagogique.statusCursusVo?.libelle ? this.searchResponsabilitePedagogique.statusCursusVo?.libelle : environment.emptyForExport ,
            'Intitule cursus': this.searchResponsabilitePedagogique.intituleCursus ? this.searchResponsabilitePedagogique.intituleCursus : environment.emptyForExport ,
            'Service renforcement capacite': this.searchResponsabilitePedagogique.serviceRenforcementCapacite ? (this.searchResponsabilitePedagogique.serviceRenforcementCapacite ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Cursus construit avec etablissements': this.searchResponsabilitePedagogique.cursusConstruitAvecEtablissements ? (this.searchResponsabilitePedagogique.cursusConstruitAvecEtablissements ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Etat etape campagne': this.searchResponsabilitePedagogique.etatEtapeCampagneVo?.libelle ? this.searchResponsabilitePedagogique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Enseignement et formation': this.searchResponsabilitePedagogique.enseignementEtFormationVo?.id ? this.searchResponsabilitePedagogique.enseignementEtFormationVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
    set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }

    get responsabilitePedagogiqueSelections(): Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiqueSelections;
       }
    set responsabilitePedagogiqueSelections(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiqueSelections = value;
       }
   
     


    get selectedResponsabilitePedagogique():ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
    set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
    
    get createResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog;
       }
    set createResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog= value;
       }
    
    get editResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog;
       }
    set editResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog= value;
       }
    get viewResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.viewResponsabilitePedagogiqueDialog;
       }
    set viewResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.viewResponsabilitePedagogiqueDialog = value;
       }
       
     get searchResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
        return this.responsabilitePedagogiqueService.searchResponsabilitePedagogique;
       }
    set searchResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.searchResponsabilitePedagogique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

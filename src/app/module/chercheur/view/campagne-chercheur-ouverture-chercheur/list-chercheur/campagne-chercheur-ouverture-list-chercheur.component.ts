import {Component, OnInit} from '@angular/core';
import {CampagneChercheurOuvertureService} from '../../../../../controller/service/CampagneChercheurOuverture.service';
import {CampagneChercheurOuvertureVo} from '../../../../../controller/model/CampagneChercheurOuverture.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { EtatCampagneChercheurService } from '../../../../../controller/service/EtatCampagneChercheur.service';

import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-chercheur-ouverture-list-chercheur',
  templateUrl: './campagne-chercheur-ouverture-list-chercheur.component.html',
  styleUrls: ['./campagne-chercheur-ouverture-list-chercheur.component.css']
})
export class CampagneChercheurOuvertureListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneChercheurOuverture';
     yesOrNoEnvoye :any[] =[];
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;
    etatCampagneChercheurs :Array<EtatCampagneChercheurVo>;


    constructor(private datePipe: DatePipe, private campagneChercheurOuvertureService: CampagneChercheurOuvertureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
        , private etatCampagneChercheurService: EtatCampagneChercheurService
) { }

    ngOnInit(): void {
      this.loadCampagneChercheurOuvertures();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCampagne();
      this.loadEtatCampagneChercheur();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCampagneChercheurOuvertures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'list');
        isPermistted ? this.campagneChercheurOuvertureService.findAll().subscribe(campagneChercheurOuvertures => this.campagneChercheurOuvertures = campagneChercheurOuvertures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneChercheurOuvertureService.findByCriteria(this.searchCampagneChercheurOuverture).subscribe(campagneChercheurOuvertures=>{
            
            this.campagneChercheurOuvertures = campagneChercheurOuvertures;
           // this.searchCampagneChercheurOuverture = new CampagneChercheurOuvertureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                            {field: 'objet', header: 'Objet'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
                            {field: 'avancement', header: 'Avancement'},
                        {field: 'etatCampagneChercheur?.libelle', header: 'Etat campagne chercheur'},
        ];
    }
    
    public async editCampagneChercheurOuverture(campagneChercheurOuverture:CampagneChercheurOuvertureVo){
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'edit');
         if(isPermistted){
          this.campagneChercheurOuvertureService.findByIdWithAssociatedList(campagneChercheurOuverture).subscribe(res => {
           this.selectedCampagneChercheurOuverture = res;
            this.selectedCampagneChercheurOuverture.dateEnvoi = new Date(campagneChercheurOuverture.dateEnvoi);
            this.editCampagneChercheurOuvertureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneChercheurOuverture(campagneChercheurOuverture:CampagneChercheurOuvertureVo){
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'view');
        if(isPermistted){
           this.campagneChercheurOuvertureService.findByIdWithAssociatedList(campagneChercheurOuverture).subscribe(res => {
           this.selectedCampagneChercheurOuverture = res;
            this.selectedCampagneChercheurOuverture.dateEnvoi = new Date(campagneChercheurOuverture.dateEnvoi);
            this.viewCampagneChercheurOuvertureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneChercheurOuverture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneChercheurOuverture = new CampagneChercheurOuvertureVo();
            this.createCampagneChercheurOuvertureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneChercheurOuverture(campagneChercheurOuverture:CampagneChercheurOuvertureVo){
       const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne chercheur ouverture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneChercheurOuvertureService.delete(campagneChercheurOuverture).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneChercheurOuvertures.indexOf(campagneChercheurOuverture);
                          position > -1 ? this.campagneChercheurOuvertures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne chercheur ouverture Supprimé',
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

public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatCampagneChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneChercheurOuverture', 'list');
    isPermistted ? this.etatCampagneChercheurService.findAll().subscribe(etatCampagneChercheurs => this.etatCampagneChercheurs = etatCampagneChercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneChercheurOuverture(campagneChercheurOuverture: CampagneChercheurOuvertureVo) {

     this.campagneChercheurOuvertureService.findByIdWithAssociatedList(campagneChercheurOuverture).subscribe(
	 res => {
	       this.initDuplicateCampagneChercheurOuverture(res);
	       this.selectedCampagneChercheurOuverture = res;
	       this.selectedCampagneChercheurOuverture.id = null;
            this.createCampagneChercheurOuvertureDialog = true;

});

	}

	initDuplicateCampagneChercheurOuverture(res: CampagneChercheurOuvertureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.campagneChercheurOuvertures.map(e => {
    return {
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
                    'Objet': e.objet ,
                    'Message': e.message ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
                    'Avancement': e.avancement ,
            'Etat campagne chercheur': e.etatCampagneChercheurVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Chercheur': this.searchCampagneChercheurOuverture.chercheurVo?.numeroMatricule ? this.searchCampagneChercheurOuverture.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchCampagneChercheurOuverture.campagneVo?.libelle ? this.searchCampagneChercheurOuverture.campagneVo?.libelle : environment.emptyForExport ,
            'Objet': this.searchCampagneChercheurOuverture.objet ? this.searchCampagneChercheurOuverture.objet : environment.emptyForExport ,
            'Message': this.searchCampagneChercheurOuverture.message ? this.searchCampagneChercheurOuverture.message : environment.emptyForExport ,
            'Envoye': this.searchCampagneChercheurOuverture.envoye ? (this.searchCampagneChercheurOuverture.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchCampagneChercheurOuverture.dateEnvoiMin ? this.datePipe.transform(this.searchCampagneChercheurOuverture.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchCampagneChercheurOuverture.dateEnvoiMax ? this.datePipe.transform(this.searchCampagneChercheurOuverture.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
            'Avancement Min': this.searchCampagneChercheurOuverture.avancementMin ? this.searchCampagneChercheurOuverture.avancementMin : environment.emptyForExport ,
            'Avancement Max': this.searchCampagneChercheurOuverture.avancementMax ? this.searchCampagneChercheurOuverture.avancementMax : environment.emptyForExport ,
        'Etat campagne chercheur': this.searchCampagneChercheurOuverture.etatCampagneChercheurVo?.libelle ? this.searchCampagneChercheurOuverture.etatCampagneChercheurVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
           return this.campagneChercheurOuvertureService.campagneChercheurOuvertures;
       }
    set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertures = value;
       }

    get campagneChercheurOuvertureSelections(): Array<CampagneChercheurOuvertureVo> {
           return this.campagneChercheurOuvertureService.campagneChercheurOuvertureSelections;
       }
    set campagneChercheurOuvertureSelections(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertureSelections = value;
       }
   
     


    get selectedCampagneChercheurOuverture():CampagneChercheurOuvertureVo {
           return this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture;
       }
    set selectedCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture = value;
       }
    
    get createCampagneChercheurOuvertureDialog():boolean {
           return this.campagneChercheurOuvertureService.createCampagneChercheurOuvertureDialog;
       }
    set createCampagneChercheurOuvertureDialog(value: boolean) {
        this.campagneChercheurOuvertureService.createCampagneChercheurOuvertureDialog= value;
       }
    
    get editCampagneChercheurOuvertureDialog():boolean {
           return this.campagneChercheurOuvertureService.editCampagneChercheurOuvertureDialog;
       }
    set editCampagneChercheurOuvertureDialog(value: boolean) {
        this.campagneChercheurOuvertureService.editCampagneChercheurOuvertureDialog= value;
       }
    get viewCampagneChercheurOuvertureDialog():boolean {
           return this.campagneChercheurOuvertureService.viewCampagneChercheurOuvertureDialog;
       }
    set viewCampagneChercheurOuvertureDialog(value: boolean) {
        this.campagneChercheurOuvertureService.viewCampagneChercheurOuvertureDialog = value;
       }
       
     get searchCampagneChercheurOuverture(): CampagneChercheurOuvertureVo {
        return this.campagneChercheurOuvertureService.searchCampagneChercheurOuverture;
       }
    set searchCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this.campagneChercheurOuvertureService.searchCampagneChercheurOuverture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

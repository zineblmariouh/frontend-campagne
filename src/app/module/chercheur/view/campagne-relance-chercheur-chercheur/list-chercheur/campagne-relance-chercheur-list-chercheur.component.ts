import {Component, OnInit} from '@angular/core';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneRelanceService } from '../../../../../controller/service/CampagneRelance.service';

import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-relance-chercheur-list-chercheur',
  templateUrl: './campagne-relance-chercheur-list-chercheur.component.html',
  styleUrls: ['./campagne-relance-chercheur-list-chercheur.component.css']
})
export class CampagneRelanceChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneRelanceChercheur';
     yesOrNoEnvoye :any[] =[];
    chercheurs :Array<ChercheurVo>;
    campagneRelances :Array<CampagneRelanceVo>;


    constructor(private datePipe: DatePipe, private campagneRelanceChercheurService: CampagneRelanceChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private campagneRelanceService: CampagneRelanceService
) { }

    ngOnInit(): void {
      this.loadCampagneRelanceChercheurs();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCampagneRelance();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCampagneRelanceChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'list');
        isPermistted ? this.campagneRelanceChercheurService.findAll().subscribe(campagneRelanceChercheurs => this.campagneRelanceChercheurs = campagneRelanceChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneRelanceChercheurService.findByCriteria(this.searchCampagneRelanceChercheur).subscribe(campagneRelanceChercheurs=>{
            
            this.campagneRelanceChercheurs = campagneRelanceChercheurs;
           // this.searchCampagneRelanceChercheur = new CampagneRelanceChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagneRelance?.id', header: 'Campagne relance'},
                            {field: 'objet', header: 'Objet'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
        ];
    }
    
    public async editCampagneRelanceChercheur(campagneRelanceChercheur:CampagneRelanceChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'edit');
         if(isPermistted){
          this.campagneRelanceChercheurService.findByIdWithAssociatedList(campagneRelanceChercheur).subscribe(res => {
           this.selectedCampagneRelanceChercheur = res;
            this.selectedCampagneRelanceChercheur.dateEnvoi = new Date(campagneRelanceChercheur.dateEnvoi);
            this.editCampagneRelanceChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneRelanceChercheur(campagneRelanceChercheur:CampagneRelanceChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'view');
        if(isPermistted){
           this.campagneRelanceChercheurService.findByIdWithAssociatedList(campagneRelanceChercheur).subscribe(res => {
           this.selectedCampagneRelanceChercheur = res;
            this.selectedCampagneRelanceChercheur.dateEnvoi = new Date(campagneRelanceChercheur.dateEnvoi);
            this.viewCampagneRelanceChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneRelanceChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneRelanceChercheur = new CampagneRelanceChercheurVo();
            this.createCampagneRelanceChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneRelanceChercheur(campagneRelanceChercheur:CampagneRelanceChercheurVo){
       const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne relance chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneRelanceChercheurService.delete(campagneRelanceChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneRelanceChercheurs.indexOf(campagneRelanceChercheur);
                          position > -1 ? this.campagneRelanceChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne relance chercheur Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagneRelance(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRelanceChercheur', 'list');
    isPermistted ? this.campagneRelanceService.findAll().subscribe(campagneRelances => this.campagneRelances = campagneRelances,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneRelanceChercheur(campagneRelanceChercheur: CampagneRelanceChercheurVo) {

     this.campagneRelanceChercheurService.findByIdWithAssociatedList(campagneRelanceChercheur).subscribe(
	 res => {
	       this.initDuplicateCampagneRelanceChercheur(res);
	       this.selectedCampagneRelanceChercheur = res;
	       this.selectedCampagneRelanceChercheur.id = null;
            this.createCampagneRelanceChercheurDialog = true;

});

	}

	initDuplicateCampagneRelanceChercheur(res: CampagneRelanceChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.campagneRelanceChercheurs.map(e => {
    return {
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne relance': e.campagneRelanceVo?.id ,
                    'Objet': e.objet ,
                    'Message': e.message ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Chercheur': this.searchCampagneRelanceChercheur.chercheurVo?.numeroMatricule ? this.searchCampagneRelanceChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne relance': this.searchCampagneRelanceChercheur.campagneRelanceVo?.id ? this.searchCampagneRelanceChercheur.campagneRelanceVo?.id : environment.emptyForExport ,
            'Objet': this.searchCampagneRelanceChercheur.objet ? this.searchCampagneRelanceChercheur.objet : environment.emptyForExport ,
            'Message': this.searchCampagneRelanceChercheur.message ? this.searchCampagneRelanceChercheur.message : environment.emptyForExport ,
            'Envoye': this.searchCampagneRelanceChercheur.envoye ? (this.searchCampagneRelanceChercheur.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchCampagneRelanceChercheur.dateEnvoiMin ? this.datePipe.transform(this.searchCampagneRelanceChercheur.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchCampagneRelanceChercheur.dateEnvoiMax ? this.datePipe.transform(this.searchCampagneRelanceChercheur.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
           return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
       }
    set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
        this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
       }

    get campagneRelanceChercheurSelections(): Array<CampagneRelanceChercheurVo> {
           return this.campagneRelanceChercheurService.campagneRelanceChercheurSelections;
       }
    set campagneRelanceChercheurSelections(value: Array<CampagneRelanceChercheurVo>) {
        this.campagneRelanceChercheurService.campagneRelanceChercheurSelections = value;
       }
   
     


    get selectedCampagneRelanceChercheur():CampagneRelanceChercheurVo {
           return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
       }
    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
       }
    
    get createCampagneRelanceChercheurDialog():boolean {
           return this.campagneRelanceChercheurService.createCampagneRelanceChercheurDialog;
       }
    set createCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.createCampagneRelanceChercheurDialog= value;
       }
    
    get editCampagneRelanceChercheurDialog():boolean {
           return this.campagneRelanceChercheurService.editCampagneRelanceChercheurDialog;
       }
    set editCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.editCampagneRelanceChercheurDialog= value;
       }
    get viewCampagneRelanceChercheurDialog():boolean {
           return this.campagneRelanceChercheurService.viewCampagneRelanceChercheurDialog;
       }
    set viewCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.viewCampagneRelanceChercheurDialog = value;
       }
       
     get searchCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
        return this.campagneRelanceChercheurService.searchCampagneRelanceChercheur;
       }
    set searchCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.searchCampagneRelanceChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

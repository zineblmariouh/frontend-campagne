import {Component, OnInit} from '@angular/core';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CampagneRappelService } from '../../../../../controller/service/CampagneRappel.service';

import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-rappel-chercheur-list-chercheur',
  templateUrl: './campagne-rappel-chercheur-list-chercheur.component.html',
  styleUrls: ['./campagne-rappel-chercheur-list-chercheur.component.css']
})
export class CampagneRappelChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneRappelChercheur';
     yesOrNoEnvoye :any[] =[];
    chercheurs :Array<ChercheurVo>;
    campagneRappels :Array<CampagneRappelVo>;


    constructor(private datePipe: DatePipe, private campagneRappelChercheurService: CampagneRappelChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private campagneRappelService: CampagneRappelService
) { }

    ngOnInit(): void {
      this.loadCampagneRappelChercheurs();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCampagneRappel();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCampagneRappelChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'list');
        isPermistted ? this.campagneRappelChercheurService.findAll().subscribe(campagneRappelChercheurs => this.campagneRappelChercheurs = campagneRappelChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneRappelChercheurService.findByCriteria(this.searchCampagneRappelChercheur).subscribe(campagneRappelChercheurs=>{
            
            this.campagneRappelChercheurs = campagneRappelChercheurs;
           // this.searchCampagneRappelChercheur = new CampagneRappelChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagneRappel?.id', header: 'Campagne rappel'},
                            {field: 'objet', header: 'Objet'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
        ];
    }
    
    public async editCampagneRappelChercheur(campagneRappelChercheur:CampagneRappelChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'edit');
         if(isPermistted){
          this.campagneRappelChercheurService.findByIdWithAssociatedList(campagneRappelChercheur).subscribe(res => {
           this.selectedCampagneRappelChercheur = res;
            this.selectedCampagneRappelChercheur.dateEnvoi = new Date(campagneRappelChercheur.dateEnvoi);
            this.editCampagneRappelChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneRappelChercheur(campagneRappelChercheur:CampagneRappelChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'view');
        if(isPermistted){
           this.campagneRappelChercheurService.findByIdWithAssociatedList(campagneRappelChercheur).subscribe(res => {
           this.selectedCampagneRappelChercheur = res;
            this.selectedCampagneRappelChercheur.dateEnvoi = new Date(campagneRappelChercheur.dateEnvoi);
            this.viewCampagneRappelChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneRappelChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneRappelChercheur = new CampagneRappelChercheurVo();
            this.createCampagneRappelChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneRappelChercheur(campagneRappelChercheur:CampagneRappelChercheurVo){
       const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne rappel chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneRappelChercheurService.delete(campagneRappelChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneRappelChercheurs.indexOf(campagneRappelChercheur);
                          position > -1 ? this.campagneRappelChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne rappel chercheur Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagneRappel(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneRappelChercheur', 'list');
    isPermistted ? this.campagneRappelService.findAll().subscribe(campagneRappels => this.campagneRappels = campagneRappels,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneRappelChercheur(campagneRappelChercheur: CampagneRappelChercheurVo) {

     this.campagneRappelChercheurService.findByIdWithAssociatedList(campagneRappelChercheur).subscribe(
	 res => {
	       this.initDuplicateCampagneRappelChercheur(res);
	       this.selectedCampagneRappelChercheur = res;
	       this.selectedCampagneRappelChercheur.id = null;
            this.createCampagneRappelChercheurDialog = true;

});

	}

	initDuplicateCampagneRappelChercheur(res: CampagneRappelChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.campagneRappelChercheurs.map(e => {
    return {
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne rappel': e.campagneRappelVo?.id ,
                    'Objet': e.objet ,
                    'Message': e.message ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Chercheur': this.searchCampagneRappelChercheur.chercheurVo?.numeroMatricule ? this.searchCampagneRappelChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne rappel': this.searchCampagneRappelChercheur.campagneRappelVo?.id ? this.searchCampagneRappelChercheur.campagneRappelVo?.id : environment.emptyForExport ,
            'Objet': this.searchCampagneRappelChercheur.objet ? this.searchCampagneRappelChercheur.objet : environment.emptyForExport ,
            'Message': this.searchCampagneRappelChercheur.message ? this.searchCampagneRappelChercheur.message : environment.emptyForExport ,
            'Envoye': this.searchCampagneRappelChercheur.envoye ? (this.searchCampagneRappelChercheur.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchCampagneRappelChercheur.dateEnvoiMin ? this.datePipe.transform(this.searchCampagneRappelChercheur.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchCampagneRappelChercheur.dateEnvoiMax ? this.datePipe.transform(this.searchCampagneRappelChercheur.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
           return this.campagneRappelChercheurService.campagneRappelChercheurs;
       }
    set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
        this.campagneRappelChercheurService.campagneRappelChercheurs = value;
       }

    get campagneRappelChercheurSelections(): Array<CampagneRappelChercheurVo> {
           return this.campagneRappelChercheurService.campagneRappelChercheurSelections;
       }
    set campagneRappelChercheurSelections(value: Array<CampagneRappelChercheurVo>) {
        this.campagneRappelChercheurService.campagneRappelChercheurSelections = value;
       }
   
     


    get selectedCampagneRappelChercheur():CampagneRappelChercheurVo {
           return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
       }
    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
       }
    
    get createCampagneRappelChercheurDialog():boolean {
           return this.campagneRappelChercheurService.createCampagneRappelChercheurDialog;
       }
    set createCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.createCampagneRappelChercheurDialog= value;
       }
    
    get editCampagneRappelChercheurDialog():boolean {
           return this.campagneRappelChercheurService.editCampagneRappelChercheurDialog;
       }
    set editCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.editCampagneRappelChercheurDialog= value;
       }
    get viewCampagneRappelChercheurDialog():boolean {
           return this.campagneRappelChercheurService.viewCampagneRappelChercheurDialog;
       }
    set viewCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.viewCampagneRappelChercheurDialog = value;
       }
       
     get searchCampagneRappelChercheur(): CampagneRappelChercheurVo {
        return this.campagneRappelChercheurService.searchCampagneRappelChercheur;
       }
    set searchCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.searchCampagneRappelChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

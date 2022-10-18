import {Component, OnInit} from '@angular/core';
import {CampagneChercheurFermetureService} from '../../../../../controller/service/CampagneChercheurFermeture.service';
import {CampagneChercheurFermetureVo} from '../../../../../controller/model/CampagneChercheurFermeture.model';
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

import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-campagne-chercheur-fermeture-list-chercheur',
  templateUrl: './campagne-chercheur-fermeture-list-chercheur.component.html',
  styleUrls: ['./campagne-chercheur-fermeture-list-chercheur.component.css']
})
export class CampagneChercheurFermetureListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CampagneChercheurFermeture';
     yesOrNoEnvoye :any[] =[];
    chercheurs :Array<ChercheurVo>;
    campagnes :Array<CampagneVo>;


    constructor(private datePipe: DatePipe, private campagneChercheurFermetureService: CampagneChercheurFermetureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private campagneService: CampagneService
) { }

    ngOnInit(): void {
      this.loadCampagneChercheurFermetures();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCampagne();
    this.yesOrNoEnvoye =  [{label: 'Envoye', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCampagneChercheurFermetures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'list');
        isPermistted ? this.campagneChercheurFermetureService.findAll().subscribe(campagneChercheurFermetures => this.campagneChercheurFermetures = campagneChercheurFermetures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.campagneChercheurFermetureService.findByCriteria(this.searchCampagneChercheurFermeture).subscribe(campagneChercheurFermetures=>{
            
            this.campagneChercheurFermetures = campagneChercheurFermetures;
           // this.searchCampagneChercheurFermeture = new CampagneChercheurFermetureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                            {field: 'objet', header: 'Objet'},
                            {field: 'envoye', header: 'Envoye'},
                            {field: 'dateEnvoi', header: 'Date envoi'},
        ];
    }
    
    public async editCampagneChercheurFermeture(campagneChercheurFermeture:CampagneChercheurFermetureVo){
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'edit');
         if(isPermistted){
          this.campagneChercheurFermetureService.findByIdWithAssociatedList(campagneChercheurFermeture).subscribe(res => {
           this.selectedCampagneChercheurFermeture = res;
            this.selectedCampagneChercheurFermeture.dateEnvoi = new Date(campagneChercheurFermeture.dateEnvoi);
            this.editCampagneChercheurFermetureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCampagneChercheurFermeture(campagneChercheurFermeture:CampagneChercheurFermetureVo){
        const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'view');
        if(isPermistted){
           this.campagneChercheurFermetureService.findByIdWithAssociatedList(campagneChercheurFermeture).subscribe(res => {
           this.selectedCampagneChercheurFermeture = res;
            this.selectedCampagneChercheurFermeture.dateEnvoi = new Date(campagneChercheurFermeture.dateEnvoi);
            this.viewCampagneChercheurFermetureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCampagneChercheurFermeture(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCampagneChercheurFermeture = new CampagneChercheurFermetureVo();
            this.createCampagneChercheurFermetureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCampagneChercheurFermeture(campagneChercheurFermeture:CampagneChercheurFermetureVo){
       const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Campagne chercheur fermeture) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.campagneChercheurFermetureService.delete(campagneChercheurFermeture).subscribe(status=>{
                          if(status > 0){
                          const position = this.campagneChercheurFermetures.indexOf(campagneChercheurFermeture);
                          position > -1 ? this.campagneChercheurFermetures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Campagne chercheur fermeture Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CampagneChercheurFermeture', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCampagneChercheurFermeture(campagneChercheurFermeture: CampagneChercheurFermetureVo) {

     this.campagneChercheurFermetureService.findByIdWithAssociatedList(campagneChercheurFermeture).subscribe(
	 res => {
	       this.initDuplicateCampagneChercheurFermeture(res);
	       this.selectedCampagneChercheurFermeture = res;
	       this.selectedCampagneChercheurFermeture.id = null;
            this.createCampagneChercheurFermetureDialog = true;

});

	}

	initDuplicateCampagneChercheurFermeture(res: CampagneChercheurFermetureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.campagneChercheurFermetures.map(e => {
    return {
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Campagne': e.campagneVo?.libelle ,
                    'Objet': e.objet ,
                    'Message': e.message ,
                    'Envoye': e.envoye? 'Vrai' : 'Faux' ,
                    'Date envoi': this.datePipe.transform(e.dateEnvoi , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Chercheur': this.searchCampagneChercheurFermeture.chercheurVo?.numeroMatricule ? this.searchCampagneChercheurFermeture.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Campagne': this.searchCampagneChercheurFermeture.campagneVo?.libelle ? this.searchCampagneChercheurFermeture.campagneVo?.libelle : environment.emptyForExport ,
            'Objet': this.searchCampagneChercheurFermeture.objet ? this.searchCampagneChercheurFermeture.objet : environment.emptyForExport ,
            'Message': this.searchCampagneChercheurFermeture.message ? this.searchCampagneChercheurFermeture.message : environment.emptyForExport ,
            'Envoye': this.searchCampagneChercheurFermeture.envoye ? (this.searchCampagneChercheurFermeture.envoye ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date envoi Min': this.searchCampagneChercheurFermeture.dateEnvoiMin ? this.datePipe.transform(this.searchCampagneChercheurFermeture.dateEnvoiMin , this.dateFormat) : environment.emptyForExport ,
            'Date envoi Max': this.searchCampagneChercheurFermeture.dateEnvoiMax ? this.datePipe.transform(this.searchCampagneChercheurFermeture.dateEnvoiMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get campagneChercheurFermetures(): Array<CampagneChercheurFermetureVo> {
           return this.campagneChercheurFermetureService.campagneChercheurFermetures;
       }
    set campagneChercheurFermetures(value: Array<CampagneChercheurFermetureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetures = value;
       }

    get campagneChercheurFermetureSelections(): Array<CampagneChercheurFermetureVo> {
           return this.campagneChercheurFermetureService.campagneChercheurFermetureSelections;
       }
    set campagneChercheurFermetureSelections(value: Array<CampagneChercheurFermetureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetureSelections = value;
       }
   
     


    get selectedCampagneChercheurFermeture():CampagneChercheurFermetureVo {
           return this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture;
       }
    set selectedCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture = value;
       }
    
    get createCampagneChercheurFermetureDialog():boolean {
           return this.campagneChercheurFermetureService.createCampagneChercheurFermetureDialog;
       }
    set createCampagneChercheurFermetureDialog(value: boolean) {
        this.campagneChercheurFermetureService.createCampagneChercheurFermetureDialog= value;
       }
    
    get editCampagneChercheurFermetureDialog():boolean {
           return this.campagneChercheurFermetureService.editCampagneChercheurFermetureDialog;
       }
    set editCampagneChercheurFermetureDialog(value: boolean) {
        this.campagneChercheurFermetureService.editCampagneChercheurFermetureDialog= value;
       }
    get viewCampagneChercheurFermetureDialog():boolean {
           return this.campagneChercheurFermetureService.viewCampagneChercheurFermetureDialog;
       }
    set viewCampagneChercheurFermetureDialog(value: boolean) {
        this.campagneChercheurFermetureService.viewCampagneChercheurFermetureDialog = value;
       }
       
     get searchCampagneChercheurFermeture(): CampagneChercheurFermetureVo {
        return this.campagneChercheurFermetureService.searchCampagneChercheurFermeture;
       }
    set searchCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this.campagneChercheurFermetureService.searchCampagneChercheurFermeture = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

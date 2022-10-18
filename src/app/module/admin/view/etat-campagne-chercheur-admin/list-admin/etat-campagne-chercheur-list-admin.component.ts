import {Component, OnInit} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etat-campagne-chercheur-list-admin',
  templateUrl: './etat-campagne-chercheur-list-admin.component.html',
  styleUrls: ['./etat-campagne-chercheur-list-admin.component.css']
})
export class EtatCampagneChercheurListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatCampagneChercheur';


    constructor(private datePipe: DatePipe, private etatCampagneChercheurService: EtatCampagneChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatCampagneChercheurs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatCampagneChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'list');
        isPermistted ? this.etatCampagneChercheurService.findAll().subscribe(etatCampagneChercheurs => this.etatCampagneChercheurs = etatCampagneChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatCampagneChercheurService.findByCriteria(this.searchEtatCampagneChercheur).subscribe(etatCampagneChercheurs=>{
            
            this.etatCampagneChercheurs = etatCampagneChercheurs;
           // this.searchEtatCampagneChercheur = new EtatCampagneChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'ordre', header: 'Ordre'},
        ];
    }
    
    public async editEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'edit');
         if(isPermistted){
          this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(res => {
           this.selectedEtatCampagneChercheur = res;
            this.editEtatCampagneChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'view');
        if(isPermistted){
           this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(res => {
           this.selectedEtatCampagneChercheur = res;
            this.viewEtatCampagneChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatCampagneChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
            this.createEtatCampagneChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatCampagneChercheur(etatCampagneChercheur:EtatCampagneChercheurVo){
       const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat campagne chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatCampagneChercheurService.delete(etatCampagneChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatCampagneChercheurs.indexOf(etatCampagneChercheur);
                          position > -1 ? this.etatCampagneChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat campagne chercheur Supprimé',
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


public async duplicateEtatCampagneChercheur(etatCampagneChercheur: EtatCampagneChercheurVo) {

     this.etatCampagneChercheurService.findByIdWithAssociatedList(etatCampagneChercheur).subscribe(
	 res => {
	       this.initDuplicateEtatCampagneChercheur(res);
	       this.selectedEtatCampagneChercheur = res;
	       this.selectedEtatCampagneChercheur.id = null;
            this.createEtatCampagneChercheurDialog = true;

});

	}

	initDuplicateEtatCampagneChercheur(res: EtatCampagneChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatCampagneChercheurs.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Ordre': e.ordre ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatCampagneChercheur.libelle ? this.searchEtatCampagneChercheur.libelle : environment.emptyForExport ,
            'Code': this.searchEtatCampagneChercheur.code ? this.searchEtatCampagneChercheur.code : environment.emptyForExport ,
            'Ordre Min': this.searchEtatCampagneChercheur.ordreMin ? this.searchEtatCampagneChercheur.ordreMin : environment.emptyForExport ,
            'Ordre Max': this.searchEtatCampagneChercheur.ordreMax ? this.searchEtatCampagneChercheur.ordreMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
    set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

    get etatCampagneChercheurSelections(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurSelections;
       }
    set etatCampagneChercheurSelections(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurSelections = value;
       }
   
     


    get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
    
    get createEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
       }
    set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
       }
    
    get editEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
       }
    set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog= value;
       }
    get viewEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog;
       }
    set viewEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog = value;
       }
       
     get searchEtatCampagneChercheur(): EtatCampagneChercheurVo {
        return this.etatCampagneChercheurService.searchEtatCampagneChercheur;
       }
    set searchEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.searchEtatCampagneChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirChercheurService} from '../../../../../controller/service/CommunauteSavoirChercheur.service';
import {CommunauteSavoirChercheurVo} from '../../../../../controller/model/CommunauteSavoirChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-chercheur-list-chercheur',
  templateUrl: './communaute-savoir-chercheur-list-chercheur.component.html',
  styleUrls: ['./communaute-savoir-chercheur-list-chercheur.component.css']
})
export class CommunauteSavoirChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirChercheur';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirChercheurService: CommunauteSavoirChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirChercheurs();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadChercheur();
    }
    
    // methods
      public async loadCommunauteSavoirChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
        isPermistted ? this.communauteSavoirChercheurService.findAll().subscribe(communauteSavoirChercheurs => this.communauteSavoirChercheurs = communauteSavoirChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirChercheurService.findByCriteria(this.searchCommunauteSavoirChercheur).subscribe(communauteSavoirChercheurs=>{
            
            this.communauteSavoirChercheurs = communauteSavoirChercheurs;
           // this.searchCommunauteSavoirChercheur = new CommunauteSavoirChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }
    
    public async editCommunauteSavoirChercheur(communauteSavoirChercheur:CommunauteSavoirChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'edit');
         if(isPermistted){
          this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(res => {
           this.selectedCommunauteSavoirChercheur = res;
            this.editCommunauteSavoirChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirChercheur(communauteSavoirChercheur:CommunauteSavoirChercheurVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'view');
        if(isPermistted){
           this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(res => {
           this.selectedCommunauteSavoirChercheur = res;
            this.viewCommunauteSavoirChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirChercheur = new CommunauteSavoirChercheurVo();
            this.createCommunauteSavoirChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirChercheur(communauteSavoirChercheur:CommunauteSavoirChercheurVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirChercheurService.delete(communauteSavoirChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirChercheurs.indexOf(communauteSavoirChercheur);
                          position > -1 ? this.communauteSavoirChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir chercheur Supprimé',
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

public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirChercheur(communauteSavoirChercheur: CommunauteSavoirChercheurVo) {

     this.communauteSavoirChercheurService.findByIdWithAssociatedList(communauteSavoirChercheur).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirChercheur(res);
	       this.selectedCommunauteSavoirChercheur = res;
	       this.selectedCommunauteSavoirChercheur.id = null;
            this.createCommunauteSavoirChercheurDialog = true;

});

	}

	initDuplicateCommunauteSavoirChercheur(res: CommunauteSavoirChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirChercheurs.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchCommunauteSavoirChercheur.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirChercheur.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchCommunauteSavoirChercheur.chercheurVo?.numeroMatricule ? this.searchCommunauteSavoirChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirChercheurs(): Array<CommunauteSavoirChercheurVo> {
           return this.communauteSavoirChercheurService.communauteSavoirChercheurs;
       }
    set communauteSavoirChercheurs(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurs = value;
       }

    get communauteSavoirChercheurSelections(): Array<CommunauteSavoirChercheurVo> {
           return this.communauteSavoirChercheurService.communauteSavoirChercheurSelections;
       }
    set communauteSavoirChercheurSelections(value: Array<CommunauteSavoirChercheurVo>) {
        this.communauteSavoirChercheurService.communauteSavoirChercheurSelections = value;
       }
   
     


    get selectedCommunauteSavoirChercheur():CommunauteSavoirChercheurVo {
           return this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur;
       }
    set selectedCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.selectedCommunauteSavoirChercheur = value;
       }
    
    get createCommunauteSavoirChercheurDialog():boolean {
           return this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog;
       }
    set createCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.createCommunauteSavoirChercheurDialog= value;
       }
    
    get editCommunauteSavoirChercheurDialog():boolean {
           return this.communauteSavoirChercheurService.editCommunauteSavoirChercheurDialog;
       }
    set editCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.editCommunauteSavoirChercheurDialog= value;
       }
    get viewCommunauteSavoirChercheurDialog():boolean {
           return this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog;
       }
    set viewCommunauteSavoirChercheurDialog(value: boolean) {
        this.communauteSavoirChercheurService.viewCommunauteSavoirChercheurDialog = value;
       }
       
     get searchCommunauteSavoirChercheur(): CommunauteSavoirChercheurVo {
        return this.communauteSavoirChercheurService.searchCommunauteSavoirChercheur;
       }
    set searchCommunauteSavoirChercheur(value: CommunauteSavoirChercheurVo) {
        this.communauteSavoirChercheurService.searchCommunauteSavoirChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

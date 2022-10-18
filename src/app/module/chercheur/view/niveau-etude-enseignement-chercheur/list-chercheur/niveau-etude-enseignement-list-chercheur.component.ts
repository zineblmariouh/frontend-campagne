import {Component, OnInit} from '@angular/core';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NiveauEtudeService } from '../../../../../controller/service/NiveauEtude.service';
import { EnseignementService } from '../../../../../controller/service/Enseignement.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-niveau-etude-enseignement-list-chercheur',
  templateUrl: './niveau-etude-enseignement-list-chercheur.component.html',
  styleUrls: ['./niveau-etude-enseignement-list-chercheur.component.css']
})
export class NiveauEtudeEnseignementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauEtudeEnseignement';
    niveauEtudes :Array<NiveauEtudeVo>;
    enseignements :Array<EnseignementVo>;


    constructor(private datePipe: DatePipe, private niveauEtudeEnseignementService: NiveauEtudeEnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private niveauEtudeService: NiveauEtudeService
        , private enseignementService: EnseignementService
) { }

    ngOnInit(): void {
      this.loadNiveauEtudeEnseignements();
      this.initExport();
      this.initCol();
      this.loadNiveauEtude();
      this.loadEnseignement();
    }
    
    // methods
      public async loadNiveauEtudeEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'list');
        isPermistted ? this.niveauEtudeEnseignementService.findAll().subscribe(niveauEtudeEnseignements => this.niveauEtudeEnseignements = niveauEtudeEnseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauEtudeEnseignementService.findByCriteria(this.searchNiveauEtudeEnseignement).subscribe(niveauEtudeEnseignements=>{
            
            this.niveauEtudeEnseignements = niveauEtudeEnseignements;
           // this.searchNiveauEtudeEnseignement = new NiveauEtudeEnseignementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'niveauEtude?.libelle', header: 'Niveau etude'},
                        {field: 'enseignement?.id', header: 'Enseignement'},
        ];
    }
    
    public async editNiveauEtudeEnseignement(niveauEtudeEnseignement:NiveauEtudeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'edit');
         if(isPermistted){
          this.niveauEtudeEnseignementService.findByIdWithAssociatedList(niveauEtudeEnseignement).subscribe(res => {
           this.selectedNiveauEtudeEnseignement = res;
            this.editNiveauEtudeEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauEtudeEnseignement(niveauEtudeEnseignement:NiveauEtudeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'view');
        if(isPermistted){
           this.niveauEtudeEnseignementService.findByIdWithAssociatedList(niveauEtudeEnseignement).subscribe(res => {
           this.selectedNiveauEtudeEnseignement = res;
            this.viewNiveauEtudeEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauEtudeEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauEtudeEnseignement = new NiveauEtudeEnseignementVo();
            this.createNiveauEtudeEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauEtudeEnseignement(niveauEtudeEnseignement:NiveauEtudeEnseignementVo){
       const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau etude enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauEtudeEnseignementService.delete(niveauEtudeEnseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauEtudeEnseignements.indexOf(niveauEtudeEnseignement);
                          position > -1 ? this.niveauEtudeEnseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau etude enseignement Supprimé',
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

public async loadNiveauEtude(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'list');
    isPermistted ? this.niveauEtudeService.findAll().subscribe(niveauEtudes => this.niveauEtudes = niveauEtudes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('NiveauEtudeEnseignement', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateNiveauEtudeEnseignement(niveauEtudeEnseignement: NiveauEtudeEnseignementVo) {

     this.niveauEtudeEnseignementService.findByIdWithAssociatedList(niveauEtudeEnseignement).subscribe(
	 res => {
	       this.initDuplicateNiveauEtudeEnseignement(res);
	       this.selectedNiveauEtudeEnseignement = res;
	       this.selectedNiveauEtudeEnseignement.id = null;
            this.createNiveauEtudeEnseignementDialog = true;

});

	}

	initDuplicateNiveauEtudeEnseignement(res: NiveauEtudeEnseignementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.niveauEtudeEnseignements.map(e => {
    return {
            'Niveau etude': e.niveauEtudeVo?.libelle ,
            'Enseignement': e.enseignementVo?.id ,
     }
      });

      this.criteriaData = [{
        'Niveau etude': this.searchNiveauEtudeEnseignement.niveauEtudeVo?.libelle ? this.searchNiveauEtudeEnseignement.niveauEtudeVo?.libelle : environment.emptyForExport ,
        'Enseignement': this.searchNiveauEtudeEnseignement.enseignementVo?.id ? this.searchNiveauEtudeEnseignement.enseignementVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauEtudeEnseignements(): Array<NiveauEtudeEnseignementVo> {
           return this.niveauEtudeEnseignementService.niveauEtudeEnseignements;
       }
    set niveauEtudeEnseignements(value: Array<NiveauEtudeEnseignementVo>) {
        this.niveauEtudeEnseignementService.niveauEtudeEnseignements = value;
       }

    get niveauEtudeEnseignementSelections(): Array<NiveauEtudeEnseignementVo> {
           return this.niveauEtudeEnseignementService.niveauEtudeEnseignementSelections;
       }
    set niveauEtudeEnseignementSelections(value: Array<NiveauEtudeEnseignementVo>) {
        this.niveauEtudeEnseignementService.niveauEtudeEnseignementSelections = value;
       }
   
     


    get selectedNiveauEtudeEnseignement():NiveauEtudeEnseignementVo {
           return this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement;
       }
    set selectedNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement = value;
       }
    
    get createNiveauEtudeEnseignementDialog():boolean {
           return this.niveauEtudeEnseignementService.createNiveauEtudeEnseignementDialog;
       }
    set createNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.createNiveauEtudeEnseignementDialog= value;
       }
    
    get editNiveauEtudeEnseignementDialog():boolean {
           return this.niveauEtudeEnseignementService.editNiveauEtudeEnseignementDialog;
       }
    set editNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.editNiveauEtudeEnseignementDialog= value;
       }
    get viewNiveauEtudeEnseignementDialog():boolean {
           return this.niveauEtudeEnseignementService.viewNiveauEtudeEnseignementDialog;
       }
    set viewNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.viewNiveauEtudeEnseignementDialog = value;
       }
       
     get searchNiveauEtudeEnseignement(): NiveauEtudeEnseignementVo {
        return this.niveauEtudeEnseignementService.searchNiveauEtudeEnseignement;
       }
    set searchNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this.niveauEtudeEnseignementService.searchNiveauEtudeEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {ReclamationService} from '../../../../../controller/service/Reclamation.service';
import {ReclamationVo} from '../../../../../controller/model/Reclamation.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EtatReclamationService } from '../../../../../controller/service/EtatReclamation.service';
import { TypeReclamationService } from '../../../../../controller/service/TypeReclamation.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
import {EtatReclamationVo} from '../../../../../controller/model/EtatReclamation.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-reclamation-list-admin',
  templateUrl: './reclamation-list-admin.component.html',
  styleUrls: ['./reclamation-list-admin.component.css']
})
export class ReclamationListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Reclamation';
    etatReclamations :Array<EtatReclamationVo>;
    typeReclamations :Array<TypeReclamationVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private reclamationService: ReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private etatReclamationService: EtatReclamationService
        , private typeReclamationService: TypeReclamationService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadReclamations();
      this.initExport();
      this.initCol();
      this.loadEtatReclamation();
      this.loadTypeReclamation();
      this.loadChercheur();
    }
    
    // methods
      public async loadReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
        isPermistted ? this.reclamationService.findAll().subscribe(reclamations => this.reclamations = reclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.reclamationService.findByCriteria(this.searchReclamation).subscribe(reclamations=>{
            
            this.reclamations = reclamations;
           // this.searchReclamation = new ReclamationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'objet', header: 'Objet'},
                        {field: 'etatReclamation?.libelle', header: 'Etat reclamation'},
                        {field: 'typeReclamation?.libelle', header: 'Type reclamation'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                            {field: 'dateReclamation', header: 'Date reclamation'},
                            {field: 'dateTraitement', header: 'Date traitement'},
        ];
    }
    
    public async editReclamation(reclamation:ReclamationVo){
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'edit');
         if(isPermistted){
          this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
           this.selectedReclamation = res;
            this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
            this.selectedReclamation.dateTraitement = new Date(reclamation.dateTraitement);
            this.editReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewReclamation(reclamation:ReclamationVo){
        const isPermistted = await this.roleService.isPermitted('Reclamation', 'view');
        if(isPermistted){
           this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(res => {
           this.selectedReclamation = res;
            this.selectedReclamation.dateReclamation = new Date(reclamation.dateReclamation);
            this.selectedReclamation.dateTraitement = new Date(reclamation.dateTraitement);
            this.viewReclamationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedReclamation = new ReclamationVo();
            this.createReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteReclamation(reclamation:ReclamationVo){
       const isPermistted = await this.roleService.isPermitted('Reclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.reclamationService.delete(reclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.reclamations.indexOf(reclamation);
                          position > -1 ? this.reclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Reclamation Supprimé',
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

public async loadEtatReclamation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
    isPermistted ? this.etatReclamationService.findAll().subscribe(etatReclamations => this.etatReclamations = etatReclamations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeReclamation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
    isPermistted ? this.typeReclamationService.findAll().subscribe(typeReclamations => this.typeReclamations = typeReclamations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Reclamation', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateReclamation(reclamation: ReclamationVo) {

     this.reclamationService.findByIdWithAssociatedList(reclamation).subscribe(
	 res => {
	       this.initDuplicateReclamation(res);
	       this.selectedReclamation = res;
	       this.selectedReclamation.id = null;
            this.createReclamationDialog = true;

});

	}

	initDuplicateReclamation(res: ReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.reclamations.map(e => {
    return {
                    'Objet': e.objet ,
                    'Message': e.message ,
            'Etat reclamation': e.etatReclamationVo?.libelle ,
            'Type reclamation': e.typeReclamationVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
                    'Date reclamation': this.datePipe.transform(e.dateReclamation , 'dd-MM-yyyy'),
                    'Date traitement': this.datePipe.transform(e.dateTraitement , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Objet': this.searchReclamation.objet ? this.searchReclamation.objet : environment.emptyForExport ,
            'Message': this.searchReclamation.message ? this.searchReclamation.message : environment.emptyForExport ,
        'Etat reclamation': this.searchReclamation.etatReclamationVo?.libelle ? this.searchReclamation.etatReclamationVo?.libelle : environment.emptyForExport ,
        'Type reclamation': this.searchReclamation.typeReclamationVo?.libelle ? this.searchReclamation.typeReclamationVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchReclamation.chercheurVo?.numeroMatricule ? this.searchReclamation.chercheurVo?.numeroMatricule : environment.emptyForExport ,
            'Date reclamation Min': this.searchReclamation.dateReclamationMin ? this.datePipe.transform(this.searchReclamation.dateReclamationMin , this.dateFormat) : environment.emptyForExport ,
            'Date reclamation Max': this.searchReclamation.dateReclamationMax ? this.datePipe.transform(this.searchReclamation.dateReclamationMax , this.dateFormat) : environment.emptyForExport ,
            'Date traitement Min': this.searchReclamation.dateTraitementMin ? this.datePipe.transform(this.searchReclamation.dateTraitementMin , this.dateFormat) : environment.emptyForExport ,
            'Date traitement Max': this.searchReclamation.dateTraitementMax ? this.datePipe.transform(this.searchReclamation.dateTraitementMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get reclamations(): Array<ReclamationVo> {
           return this.reclamationService.reclamations;
       }
    set reclamations(value: Array<ReclamationVo>) {
        this.reclamationService.reclamations = value;
       }

    get reclamationSelections(): Array<ReclamationVo> {
           return this.reclamationService.reclamationSelections;
       }
    set reclamationSelections(value: Array<ReclamationVo>) {
        this.reclamationService.reclamationSelections = value;
       }
   
     


    get selectedReclamation():ReclamationVo {
           return this.reclamationService.selectedReclamation;
       }
    set selectedReclamation(value: ReclamationVo) {
        this.reclamationService.selectedReclamation = value;
       }
    
    get createReclamationDialog():boolean {
           return this.reclamationService.createReclamationDialog;
       }
    set createReclamationDialog(value: boolean) {
        this.reclamationService.createReclamationDialog= value;
       }
    
    get editReclamationDialog():boolean {
           return this.reclamationService.editReclamationDialog;
       }
    set editReclamationDialog(value: boolean) {
        this.reclamationService.editReclamationDialog= value;
       }
    get viewReclamationDialog():boolean {
           return this.reclamationService.viewReclamationDialog;
       }
    set viewReclamationDialog(value: boolean) {
        this.reclamationService.viewReclamationDialog = value;
       }
       
     get searchReclamation(): ReclamationVo {
        return this.reclamationService.searchReclamation;
       }
    set searchReclamation(value: ReclamationVo) {
        this.reclamationService.searchReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

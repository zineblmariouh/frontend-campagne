import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdChercheurService} from '../../../../../controller/service/TypeInstrumentIrdChercheur.service';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeInstrumentIrdService } from '../../../../../controller/service/TypeInstrumentIrd.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-instrument-ird-chercheur-list-chercheur',
  templateUrl: './type-instrument-ird-chercheur-list-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-chercheur-list-chercheur.component.css']
})
export class TypeInstrumentIrdChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstrumentIrdChercheur';
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private typeInstrumentIrdChercheurService: TypeInstrumentIrdChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeInstrumentIrdService: TypeInstrumentIrdService
        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadTypeInstrumentIrdChercheurs();
      this.initExport();
      this.initCol();
      this.loadTypeInstrumentIrd();
      this.loadChercheur();
    }
    
    // methods
      public async loadTypeInstrumentIrdChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'list');
        isPermistted ? this.typeInstrumentIrdChercheurService.findAll().subscribe(typeInstrumentIrdChercheurs => this.typeInstrumentIrdChercheurs = typeInstrumentIrdChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstrumentIrdChercheurService.findByCriteria(this.searchTypeInstrumentIrdChercheur).subscribe(typeInstrumentIrdChercheurs=>{
            
            this.typeInstrumentIrdChercheurs = typeInstrumentIrdChercheurs;
           // this.searchTypeInstrumentIrdChercheur = new TypeInstrumentIrdChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
        ];
    }
    
    public async editTypeInstrumentIrdChercheur(typeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'edit');
         if(isPermistted){
          this.typeInstrumentIrdChercheurService.findByIdWithAssociatedList(typeInstrumentIrdChercheur).subscribe(res => {
           this.selectedTypeInstrumentIrdChercheur = res;
            this.editTypeInstrumentIrdChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstrumentIrdChercheur(typeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'view');
        if(isPermistted){
           this.typeInstrumentIrdChercheurService.findByIdWithAssociatedList(typeInstrumentIrdChercheur).subscribe(res => {
           this.selectedTypeInstrumentIrdChercheur = res;
            this.viewTypeInstrumentIrdChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstrumentIrdChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstrumentIrdChercheur = new TypeInstrumentIrdChercheurVo();
            this.createTypeInstrumentIrdChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstrumentIrdChercheur(typeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instrument ird chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstrumentIrdChercheurService.delete(typeInstrumentIrdChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstrumentIrdChercheurs.indexOf(typeInstrumentIrdChercheur);
                          position > -1 ? this.typeInstrumentIrdChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instrument ird chercheur Supprimé',
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

public async loadTypeInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeInstrumentIrdChercheur(typeInstrumentIrdChercheur: TypeInstrumentIrdChercheurVo) {

     this.typeInstrumentIrdChercheurService.findByIdWithAssociatedList(typeInstrumentIrdChercheur).subscribe(
	 res => {
	       this.initDuplicateTypeInstrumentIrdChercheur(res);
	       this.selectedTypeInstrumentIrdChercheur = res;
	       this.selectedTypeInstrumentIrdChercheur.id = null;
            this.createTypeInstrumentIrdChercheurDialog = true;

});

	}

	initDuplicateTypeInstrumentIrdChercheur(res: TypeInstrumentIrdChercheurVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeInstrumentIrdChercheurs.map(e => {
    return {
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
     }
      });

      this.criteriaData = [{
        'Type instrument ird': this.searchTypeInstrumentIrdChercheur.typeInstrumentIrdVo?.libelle ? this.searchTypeInstrumentIrdChercheur.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchTypeInstrumentIrdChercheur.chercheurVo?.numeroMatricule ? this.searchTypeInstrumentIrdChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstrumentIrdChercheurs(): Array<TypeInstrumentIrdChercheurVo> {
           return this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs;
       }
    set typeInstrumentIrdChercheurs(value: Array<TypeInstrumentIrdChercheurVo>) {
        this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs = value;
       }

    get typeInstrumentIrdChercheurSelections(): Array<TypeInstrumentIrdChercheurVo> {
           return this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurSelections;
       }
    set typeInstrumentIrdChercheurSelections(value: Array<TypeInstrumentIrdChercheurVo>) {
        this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurSelections = value;
       }
   
     


    get selectedTypeInstrumentIrdChercheur():TypeInstrumentIrdChercheurVo {
           return this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur;
       }
    set selectedTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur = value;
       }
    
    get createTypeInstrumentIrdChercheurDialog():boolean {
           return this.typeInstrumentIrdChercheurService.createTypeInstrumentIrdChercheurDialog;
       }
    set createTypeInstrumentIrdChercheurDialog(value: boolean) {
        this.typeInstrumentIrdChercheurService.createTypeInstrumentIrdChercheurDialog= value;
       }
    
    get editTypeInstrumentIrdChercheurDialog():boolean {
           return this.typeInstrumentIrdChercheurService.editTypeInstrumentIrdChercheurDialog;
       }
    set editTypeInstrumentIrdChercheurDialog(value: boolean) {
        this.typeInstrumentIrdChercheurService.editTypeInstrumentIrdChercheurDialog= value;
       }
    get viewTypeInstrumentIrdChercheurDialog():boolean {
           return this.typeInstrumentIrdChercheurService.viewTypeInstrumentIrdChercheurDialog;
       }
    set viewTypeInstrumentIrdChercheurDialog(value: boolean) {
        this.typeInstrumentIrdChercheurService.viewTypeInstrumentIrdChercheurDialog = value;
       }
       
     get searchTypeInstrumentIrdChercheur(): TypeInstrumentIrdChercheurVo {
        return this.typeInstrumentIrdChercheurService.searchTypeInstrumentIrdChercheur;
       }
    set searchTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this.typeInstrumentIrdChercheurService.searchTypeInstrumentIrdChercheur = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

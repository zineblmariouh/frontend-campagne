import {Component, OnInit} from '@angular/core';
import {TypeEtudeEnseignementService} from '../../../../../controller/service/TypeEtudeEnseignement.service';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnseignementService } from '../../../../../controller/service/Enseignement.service';
import { TypeEtudeService } from '../../../../../controller/service/TypeEtude.service';

import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-etude-enseignement-list-chercheur',
  templateUrl: './type-etude-enseignement-list-chercheur.component.html',
  styleUrls: ['./type-etude-enseignement-list-chercheur.component.css']
})
export class TypeEtudeEnseignementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEtudeEnseignement';
    enseignements :Array<EnseignementVo>;
    typeEtudes :Array<TypeEtudeVo>;


    constructor(private datePipe: DatePipe, private typeEtudeEnseignementService: TypeEtudeEnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enseignementService: EnseignementService
        , private typeEtudeService: TypeEtudeService
) { }

    ngOnInit(): void {
      this.loadTypeEtudeEnseignements();
      this.initExport();
      this.initCol();
      this.loadEnseignement();
      this.loadTypeEtude();
    }
    
    // methods
      public async loadTypeEtudeEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'list');
        isPermistted ? this.typeEtudeEnseignementService.findAll().subscribe(typeEtudeEnseignements => this.typeEtudeEnseignements = typeEtudeEnseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEtudeEnseignementService.findByCriteria(this.searchTypeEtudeEnseignement).subscribe(typeEtudeEnseignements=>{
            
            this.typeEtudeEnseignements = typeEtudeEnseignements;
           // this.searchTypeEtudeEnseignement = new TypeEtudeEnseignementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enseignement?.id', header: 'Enseignement'},
                        {field: 'typeEtude?.libelle', header: 'Type etude'},
        ];
    }
    
    public async editTypeEtudeEnseignement(typeEtudeEnseignement:TypeEtudeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'edit');
         if(isPermistted){
          this.typeEtudeEnseignementService.findByIdWithAssociatedList(typeEtudeEnseignement).subscribe(res => {
           this.selectedTypeEtudeEnseignement = res;
            this.editTypeEtudeEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEtudeEnseignement(typeEtudeEnseignement:TypeEtudeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'view');
        if(isPermistted){
           this.typeEtudeEnseignementService.findByIdWithAssociatedList(typeEtudeEnseignement).subscribe(res => {
           this.selectedTypeEtudeEnseignement = res;
            this.viewTypeEtudeEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEtudeEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEtudeEnseignement = new TypeEtudeEnseignementVo();
            this.createTypeEtudeEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEtudeEnseignement(typeEtudeEnseignement:TypeEtudeEnseignementVo){
       const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type etude enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEtudeEnseignementService.delete(typeEtudeEnseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEtudeEnseignements.indexOf(typeEtudeEnseignement);
                          position > -1 ? this.typeEtudeEnseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type etude enseignement Supprimé',
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

public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeEtude(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeEtudeEnseignement', 'list');
    isPermistted ? this.typeEtudeService.findAll().subscribe(typeEtudes => this.typeEtudes = typeEtudes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeEtudeEnseignement(typeEtudeEnseignement: TypeEtudeEnseignementVo) {

     this.typeEtudeEnseignementService.findByIdWithAssociatedList(typeEtudeEnseignement).subscribe(
	 res => {
	       this.initDuplicateTypeEtudeEnseignement(res);
	       this.selectedTypeEtudeEnseignement = res;
	       this.selectedTypeEtudeEnseignement.id = null;
            this.createTypeEtudeEnseignementDialog = true;

});

	}

	initDuplicateTypeEtudeEnseignement(res: TypeEtudeEnseignementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeEtudeEnseignements.map(e => {
    return {
            'Enseignement': e.enseignementVo?.id ,
            'Type etude': e.typeEtudeVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Enseignement': this.searchTypeEtudeEnseignement.enseignementVo?.id ? this.searchTypeEtudeEnseignement.enseignementVo?.id : environment.emptyForExport ,
        'Type etude': this.searchTypeEtudeEnseignement.typeEtudeVo?.libelle ? this.searchTypeEtudeEnseignement.typeEtudeVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEtudeEnseignements(): Array<TypeEtudeEnseignementVo> {
           return this.typeEtudeEnseignementService.typeEtudeEnseignements;
       }
    set typeEtudeEnseignements(value: Array<TypeEtudeEnseignementVo>) {
        this.typeEtudeEnseignementService.typeEtudeEnseignements = value;
       }

    get typeEtudeEnseignementSelections(): Array<TypeEtudeEnseignementVo> {
           return this.typeEtudeEnseignementService.typeEtudeEnseignementSelections;
       }
    set typeEtudeEnseignementSelections(value: Array<TypeEtudeEnseignementVo>) {
        this.typeEtudeEnseignementService.typeEtudeEnseignementSelections = value;
       }
   
     


    get selectedTypeEtudeEnseignement():TypeEtudeEnseignementVo {
           return this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement;
       }
    set selectedTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement = value;
       }
    
    get createTypeEtudeEnseignementDialog():boolean {
           return this.typeEtudeEnseignementService.createTypeEtudeEnseignementDialog;
       }
    set createTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.createTypeEtudeEnseignementDialog= value;
       }
    
    get editTypeEtudeEnseignementDialog():boolean {
           return this.typeEtudeEnseignementService.editTypeEtudeEnseignementDialog;
       }
    set editTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.editTypeEtudeEnseignementDialog= value;
       }
    get viewTypeEtudeEnseignementDialog():boolean {
           return this.typeEtudeEnseignementService.viewTypeEtudeEnseignementDialog;
       }
    set viewTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.viewTypeEtudeEnseignementDialog = value;
       }
       
     get searchTypeEtudeEnseignement(): TypeEtudeEnseignementVo {
        return this.typeEtudeEnseignementService.searchTypeEtudeEnseignement;
       }
    set searchTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this.typeEtudeEnseignementService.searchTypeEtudeEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

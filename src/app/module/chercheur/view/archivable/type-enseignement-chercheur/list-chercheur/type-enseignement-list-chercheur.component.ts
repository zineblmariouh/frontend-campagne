import {Component, OnInit} from '@angular/core';
import {TypeEnseignementService} from '../../../../../controller/service/TypeEnseignement.service';
import {TypeEnseignementVo} from '../../../../../controller/model/TypeEnseignement.model';
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
  selector: 'app-type-enseignement-list-chercheur',
  templateUrl: './type-enseignement-list-chercheur.component.html',
  styleUrls: ['./type-enseignement-list-chercheur.component.css']
})
export class TypeEnseignementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEnseignement';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeEnseignementService: TypeEnseignementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeEnseignements();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeEnseignements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEnseignement', 'list');
        isPermistted ? this.typeEnseignementService.findAll().subscribe(typeEnseignements => this.typeEnseignements = typeEnseignements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEnseignementService.findByCriteria(this.searchTypeEnseignement).subscribe(typeEnseignements=>{
            
            this.typeEnseignements = typeEnseignements;
           // this.searchTypeEnseignement = new TypeEnseignementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTypeEnseignement(typeEnseignement:TypeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('TypeEnseignement', 'edit');
         if(isPermistted){
          this.typeEnseignementService.findByIdWithAssociatedList(typeEnseignement).subscribe(res => {
           this.selectedTypeEnseignement = res;
            this.selectedTypeEnseignement.dateArchivage = new Date(typeEnseignement.dateArchivage);
            this.selectedTypeEnseignement.dateCreation = new Date(typeEnseignement.dateCreation);
            this.editTypeEnseignementDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEnseignement(typeEnseignement:TypeEnseignementVo){
        const isPermistted = await this.roleService.isPermitted('TypeEnseignement', 'view');
        if(isPermistted){
           this.typeEnseignementService.findByIdWithAssociatedList(typeEnseignement).subscribe(res => {
           this.selectedTypeEnseignement = res;
            this.selectedTypeEnseignement.dateArchivage = new Date(typeEnseignement.dateArchivage);
            this.selectedTypeEnseignement.dateCreation = new Date(typeEnseignement.dateCreation);
            this.viewTypeEnseignementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEnseignement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEnseignement = new TypeEnseignementVo();
            this.createTypeEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEnseignement(typeEnseignement:TypeEnseignementVo){
       const isPermistted = await this.roleService.isPermitted('TypeEnseignement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type enseignement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEnseignementService.delete(typeEnseignement).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEnseignements.indexOf(typeEnseignement);
                          position > -1 ? this.typeEnseignements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type enseignement Supprimé',
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


public async duplicateTypeEnseignement(typeEnseignement: TypeEnseignementVo) {

     this.typeEnseignementService.findByIdWithAssociatedList(typeEnseignement).subscribe(
	 res => {
	       this.initDuplicateTypeEnseignement(res);
	       this.selectedTypeEnseignement = res;
	       this.selectedTypeEnseignement.id = null;
            this.createTypeEnseignementDialog = true;

});

	}

	initDuplicateTypeEnseignement(res: TypeEnseignementVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeEnseignements.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeEnseignement.libelle ? this.searchTypeEnseignement.libelle : environment.emptyForExport ,
            'Code': this.searchTypeEnseignement.code ? this.searchTypeEnseignement.code : environment.emptyForExport ,
            'Archive': this.searchTypeEnseignement.archive ? (this.searchTypeEnseignement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeEnseignement.dateArchivageMin ? this.datePipe.transform(this.searchTypeEnseignement.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeEnseignement.dateArchivageMax ? this.datePipe.transform(this.searchTypeEnseignement.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeEnseignement.dateCreationMin ? this.datePipe.transform(this.searchTypeEnseignement.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeEnseignement.dateCreationMax ? this.datePipe.transform(this.searchTypeEnseignement.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeEnseignement.admin ? (this.searchTypeEnseignement.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeEnseignement.visible ? (this.searchTypeEnseignement.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeEnseignement.username ? this.searchTypeEnseignement.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEnseignements(): Array<TypeEnseignementVo> {
           return this.typeEnseignementService.typeEnseignements;
       }
    set typeEnseignements(value: Array<TypeEnseignementVo>) {
        this.typeEnseignementService.typeEnseignements = value;
       }

    get typeEnseignementSelections(): Array<TypeEnseignementVo> {
           return this.typeEnseignementService.typeEnseignementSelections;
       }
    set typeEnseignementSelections(value: Array<TypeEnseignementVo>) {
        this.typeEnseignementService.typeEnseignementSelections = value;
       }
   
     


    get selectedTypeEnseignement():TypeEnseignementVo {
           return this.typeEnseignementService.selectedTypeEnseignement;
       }
    set selectedTypeEnseignement(value: TypeEnseignementVo) {
        this.typeEnseignementService.selectedTypeEnseignement = value;
       }
    
    get createTypeEnseignementDialog():boolean {
           return this.typeEnseignementService.createTypeEnseignementDialog;
       }
    set createTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.createTypeEnseignementDialog= value;
       }
    
    get editTypeEnseignementDialog():boolean {
           return this.typeEnseignementService.editTypeEnseignementDialog;
       }
    set editTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.editTypeEnseignementDialog= value;
       }
    get viewTypeEnseignementDialog():boolean {
           return this.typeEnseignementService.viewTypeEnseignementDialog;
       }
    set viewTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.viewTypeEnseignementDialog = value;
       }
       
     get searchTypeEnseignement(): TypeEnseignementVo {
        return this.typeEnseignementService.searchTypeEnseignement;
       }
    set searchTypeEnseignement(value: TypeEnseignementVo) {
        this.typeEnseignementService.searchTypeEnseignement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

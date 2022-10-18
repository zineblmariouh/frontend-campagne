import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from '../../../../../controller/service/TypeReclamation.service';
import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
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
  selector: 'app-type-reclamation-list-chercheur',
  templateUrl: './type-reclamation-list-chercheur.component.html',
  styleUrls: ['./type-reclamation-list-chercheur.component.css']
})
export class TypeReclamationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeReclamation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeReclamations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeReclamations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'list');
        isPermistted ? this.typeReclamationService.findAll().subscribe(typeReclamations => this.typeReclamations = typeReclamations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeReclamationService.findByCriteria(this.searchTypeReclamation).subscribe(typeReclamations=>{
            
            this.typeReclamations = typeReclamations;
           // this.searchTypeReclamation = new TypeReclamationVo();
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
    
    public async editTypeReclamation(typeReclamation:TypeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'edit');
         if(isPermistted){
          this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(res => {
           this.selectedTypeReclamation = res;
            this.selectedTypeReclamation.dateArchivage = new Date(typeReclamation.dateArchivage);
            this.selectedTypeReclamation.dateCreation = new Date(typeReclamation.dateCreation);
            this.editTypeReclamationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeReclamation(typeReclamation:TypeReclamationVo){
        const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'view');
        if(isPermistted){
           this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(res => {
           this.selectedTypeReclamation = res;
            this.selectedTypeReclamation.dateArchivage = new Date(typeReclamation.dateArchivage);
            this.selectedTypeReclamation.dateCreation = new Date(typeReclamation.dateCreation);
            this.viewTypeReclamationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeReclamation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeReclamation = new TypeReclamationVo();
            this.createTypeReclamationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeReclamation(typeReclamation:TypeReclamationVo){
       const isPermistted = await this.roleService.isPermitted('TypeReclamation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type reclamation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeReclamationService.delete(typeReclamation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeReclamations.indexOf(typeReclamation);
                          position > -1 ? this.typeReclamations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type reclamation Supprimé',
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


public async duplicateTypeReclamation(typeReclamation: TypeReclamationVo) {

     this.typeReclamationService.findByIdWithAssociatedList(typeReclamation).subscribe(
	 res => {
	       this.initDuplicateTypeReclamation(res);
	       this.selectedTypeReclamation = res;
	       this.selectedTypeReclamation.id = null;
            this.createTypeReclamationDialog = true;

});

	}

	initDuplicateTypeReclamation(res: TypeReclamationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeReclamations.map(e => {
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
            'Libelle': this.searchTypeReclamation.libelle ? this.searchTypeReclamation.libelle : environment.emptyForExport ,
            'Code': this.searchTypeReclamation.code ? this.searchTypeReclamation.code : environment.emptyForExport ,
            'Archive': this.searchTypeReclamation.archive ? (this.searchTypeReclamation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeReclamation.dateArchivageMin ? this.datePipe.transform(this.searchTypeReclamation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeReclamation.dateArchivageMax ? this.datePipe.transform(this.searchTypeReclamation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeReclamation.dateCreationMin ? this.datePipe.transform(this.searchTypeReclamation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeReclamation.dateCreationMax ? this.datePipe.transform(this.searchTypeReclamation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeReclamation.admin ? (this.searchTypeReclamation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeReclamation.visible ? (this.searchTypeReclamation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeReclamation.username ? this.searchTypeReclamation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeReclamations(): Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamations;
       }
    set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

    get typeReclamationSelections(): Array<TypeReclamationVo> {
           return this.typeReclamationService.typeReclamationSelections;
       }
    set typeReclamationSelections(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamationSelections = value;
       }
   
     


    get selectedTypeReclamation():TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }
    
    get createTypeReclamationDialog():boolean {
           return this.typeReclamationService.createTypeReclamationDialog;
       }
    set createTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.createTypeReclamationDialog= value;
       }
    
    get editTypeReclamationDialog():boolean {
           return this.typeReclamationService.editTypeReclamationDialog;
       }
    set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog= value;
       }
    get viewTypeReclamationDialog():boolean {
           return this.typeReclamationService.viewTypeReclamationDialog;
       }
    set viewTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.viewTypeReclamationDialog = value;
       }
       
     get searchTypeReclamation(): TypeReclamationVo {
        return this.typeReclamationService.searchTypeReclamation;
       }
    set searchTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.searchTypeReclamation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

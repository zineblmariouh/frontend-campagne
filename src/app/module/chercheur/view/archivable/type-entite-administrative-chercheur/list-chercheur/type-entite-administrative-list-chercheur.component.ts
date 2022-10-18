import {Component, OnInit} from '@angular/core';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
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
  selector: 'app-type-entite-administrative-list-chercheur',
  templateUrl: './type-entite-administrative-list-chercheur.component.html',
  styleUrls: ['./type-entite-administrative-list-chercheur.component.css']
})
export class TypeEntiteAdministrativeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEntiteAdministrative';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeEntiteAdministrativeService: TypeEntiteAdministrativeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeEntiteAdministratives();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeEntiteAdministratives(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'list');
        isPermistted ? this.typeEntiteAdministrativeService.findAll().subscribe(typeEntiteAdministratives => this.typeEntiteAdministratives = typeEntiteAdministratives,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEntiteAdministrativeService.findByCriteria(this.searchTypeEntiteAdministrative).subscribe(typeEntiteAdministratives=>{
            
            this.typeEntiteAdministratives = typeEntiteAdministratives;
           // this.searchTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
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
    
    public async editTypeEntiteAdministrative(typeEntiteAdministrative:TypeEntiteAdministrativeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'edit');
         if(isPermistted){
          this.typeEntiteAdministrativeService.findByIdWithAssociatedList(typeEntiteAdministrative).subscribe(res => {
           this.selectedTypeEntiteAdministrative = res;
            this.selectedTypeEntiteAdministrative.dateArchivage = new Date(typeEntiteAdministrative.dateArchivage);
            this.selectedTypeEntiteAdministrative.dateCreation = new Date(typeEntiteAdministrative.dateCreation);
            this.editTypeEntiteAdministrativeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEntiteAdministrative(typeEntiteAdministrative:TypeEntiteAdministrativeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'view');
        if(isPermistted){
           this.typeEntiteAdministrativeService.findByIdWithAssociatedList(typeEntiteAdministrative).subscribe(res => {
           this.selectedTypeEntiteAdministrative = res;
            this.selectedTypeEntiteAdministrative.dateArchivage = new Date(typeEntiteAdministrative.dateArchivage);
            this.selectedTypeEntiteAdministrative.dateCreation = new Date(typeEntiteAdministrative.dateCreation);
            this.viewTypeEntiteAdministrativeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEntiteAdministrative(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
            this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEntiteAdministrative(typeEntiteAdministrative:TypeEntiteAdministrativeVo){
       const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type entite administrative) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEntiteAdministrativeService.delete(typeEntiteAdministrative).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEntiteAdministratives.indexOf(typeEntiteAdministrative);
                          position > -1 ? this.typeEntiteAdministratives.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type entite administrative Supprimé',
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


public async duplicateTypeEntiteAdministrative(typeEntiteAdministrative: TypeEntiteAdministrativeVo) {

     this.typeEntiteAdministrativeService.findByIdWithAssociatedList(typeEntiteAdministrative).subscribe(
	 res => {
	       this.initDuplicateTypeEntiteAdministrative(res);
	       this.selectedTypeEntiteAdministrative = res;
	       this.selectedTypeEntiteAdministrative.id = null;
            this.createTypeEntiteAdministrativeDialog = true;

});

	}

	initDuplicateTypeEntiteAdministrative(res: TypeEntiteAdministrativeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeEntiteAdministratives.map(e => {
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
            'Libelle': this.searchTypeEntiteAdministrative.libelle ? this.searchTypeEntiteAdministrative.libelle : environment.emptyForExport ,
            'Code': this.searchTypeEntiteAdministrative.code ? this.searchTypeEntiteAdministrative.code : environment.emptyForExport ,
            'Archive': this.searchTypeEntiteAdministrative.archive ? (this.searchTypeEntiteAdministrative.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeEntiteAdministrative.dateArchivageMin ? this.datePipe.transform(this.searchTypeEntiteAdministrative.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeEntiteAdministrative.dateArchivageMax ? this.datePipe.transform(this.searchTypeEntiteAdministrative.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeEntiteAdministrative.dateCreationMin ? this.datePipe.transform(this.searchTypeEntiteAdministrative.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeEntiteAdministrative.dateCreationMax ? this.datePipe.transform(this.searchTypeEntiteAdministrative.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeEntiteAdministrative.admin ? (this.searchTypeEntiteAdministrative.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeEntiteAdministrative.visible ? (this.searchTypeEntiteAdministrative.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeEntiteAdministrative.username ? this.searchTypeEntiteAdministrative.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
    set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }

    get typeEntiteAdministrativeSelections(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministrativeSelections;
       }
    set typeEntiteAdministrativeSelections(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministrativeSelections = value;
       }
   
     


    get selectedTypeEntiteAdministrative():TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
    set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
    
    get createTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
    set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
       }
    
    get editTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;
       }
    set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog= value;
       }
    get viewTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog;
       }
    set viewTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.viewTypeEntiteAdministrativeDialog = value;
       }
       
     get searchTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
        return this.typeEntiteAdministrativeService.searchTypeEntiteAdministrative;
       }
    set searchTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.searchTypeEntiteAdministrative = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

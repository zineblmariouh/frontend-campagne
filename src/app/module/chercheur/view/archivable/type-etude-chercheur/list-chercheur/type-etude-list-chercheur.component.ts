import {Component, OnInit} from '@angular/core';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
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
  selector: 'app-type-etude-list-chercheur',
  templateUrl: './type-etude-list-chercheur.component.html',
  styleUrls: ['./type-etude-list-chercheur.component.css']
})
export class TypeEtudeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeEtude';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeEtudeService: TypeEtudeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeEtudes();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeEtudes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeEtude', 'list');
        isPermistted ? this.typeEtudeService.findAll().subscribe(typeEtudes => this.typeEtudes = typeEtudes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeEtudeService.findByCriteria(this.searchTypeEtude).subscribe(typeEtudes=>{
            
            this.typeEtudes = typeEtudes;
           // this.searchTypeEtude = new TypeEtudeVo();
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
    
    public async editTypeEtude(typeEtude:TypeEtudeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEtude', 'edit');
         if(isPermistted){
          this.typeEtudeService.findByIdWithAssociatedList(typeEtude).subscribe(res => {
           this.selectedTypeEtude = res;
            this.selectedTypeEtude.dateArchivage = new Date(typeEtude.dateArchivage);
            this.selectedTypeEtude.dateCreation = new Date(typeEtude.dateCreation);
            this.editTypeEtudeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeEtude(typeEtude:TypeEtudeVo){
        const isPermistted = await this.roleService.isPermitted('TypeEtude', 'view');
        if(isPermistted){
           this.typeEtudeService.findByIdWithAssociatedList(typeEtude).subscribe(res => {
           this.selectedTypeEtude = res;
            this.selectedTypeEtude.dateArchivage = new Date(typeEtude.dateArchivage);
            this.selectedTypeEtude.dateCreation = new Date(typeEtude.dateCreation);
            this.viewTypeEtudeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeEtude(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeEtude = new TypeEtudeVo();
            this.createTypeEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeEtude(typeEtude:TypeEtudeVo){
       const isPermistted = await this.roleService.isPermitted('TypeEtude', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type etude) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeEtudeService.delete(typeEtude).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeEtudes.indexOf(typeEtude);
                          position > -1 ? this.typeEtudes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type etude Supprimé',
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


public async duplicateTypeEtude(typeEtude: TypeEtudeVo) {

     this.typeEtudeService.findByIdWithAssociatedList(typeEtude).subscribe(
	 res => {
	       this.initDuplicateTypeEtude(res);
	       this.selectedTypeEtude = res;
	       this.selectedTypeEtude.id = null;
            this.createTypeEtudeDialog = true;

});

	}

	initDuplicateTypeEtude(res: TypeEtudeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeEtudes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypeEtude.libelle ? this.searchTypeEtude.libelle : environment.emptyForExport ,
            'Code': this.searchTypeEtude.code ? this.searchTypeEtude.code : environment.emptyForExport ,
            'Description': this.searchTypeEtude.description ? this.searchTypeEtude.description : environment.emptyForExport ,
            'Archive': this.searchTypeEtude.archive ? (this.searchTypeEtude.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeEtude.dateArchivageMin ? this.datePipe.transform(this.searchTypeEtude.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeEtude.dateArchivageMax ? this.datePipe.transform(this.searchTypeEtude.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeEtude.dateCreationMin ? this.datePipe.transform(this.searchTypeEtude.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeEtude.dateCreationMax ? this.datePipe.transform(this.searchTypeEtude.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeEtude.admin ? (this.searchTypeEtude.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeEtude.visible ? (this.searchTypeEtude.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeEtude.username ? this.searchTypeEtude.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeEtudes(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
    set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }

    get typeEtudeSelections(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudeSelections;
       }
    set typeEtudeSelections(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudeSelections = value;
       }
   
     


    get selectedTypeEtude():TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
    set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
    
    get createTypeEtudeDialog():boolean {
           return this.typeEtudeService.createTypeEtudeDialog;
       }
    set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
       }
    
    get editTypeEtudeDialog():boolean {
           return this.typeEtudeService.editTypeEtudeDialog;
       }
    set editTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.editTypeEtudeDialog= value;
       }
    get viewTypeEtudeDialog():boolean {
           return this.typeEtudeService.viewTypeEtudeDialog;
       }
    set viewTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.viewTypeEtudeDialog = value;
       }
       
     get searchTypeEtude(): TypeEtudeVo {
        return this.typeEtudeService.searchTypeEtude;
       }
    set searchTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.searchTypeEtude = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

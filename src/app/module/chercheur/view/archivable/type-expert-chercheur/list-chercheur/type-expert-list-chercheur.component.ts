import {Component, OnInit} from '@angular/core';
import {TypeExpertService} from '../../../../../controller/service/TypeExpert.service';
import {TypeExpertVo} from '../../../../../controller/model/TypeExpert.model';
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
  selector: 'app-type-expert-list-chercheur',
  templateUrl: './type-expert-list-chercheur.component.html',
  styleUrls: ['./type-expert-list-chercheur.component.css']
})
export class TypeExpertListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeExpert';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeExpertService: TypeExpertService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeExperts();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeExperts(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'list');
        isPermistted ? this.typeExpertService.findAll().subscribe(typeExperts => this.typeExperts = typeExperts,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeExpertService.findByCriteria(this.searchTypeExpert).subscribe(typeExperts=>{
            
            this.typeExperts = typeExperts;
           // this.searchTypeExpert = new TypeExpertVo();
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
    
    public async editTypeExpert(typeExpert:TypeExpertVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'edit');
         if(isPermistted){
          this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(res => {
           this.selectedTypeExpert = res;
            this.selectedTypeExpert.dateArchivage = new Date(typeExpert.dateArchivage);
            this.selectedTypeExpert.dateCreation = new Date(typeExpert.dateCreation);
            this.editTypeExpertDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeExpert(typeExpert:TypeExpertVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpert', 'view');
        if(isPermistted){
           this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(res => {
           this.selectedTypeExpert = res;
            this.selectedTypeExpert.dateArchivage = new Date(typeExpert.dateArchivage);
            this.selectedTypeExpert.dateCreation = new Date(typeExpert.dateCreation);
            this.viewTypeExpertDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeExpert(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeExpert = new TypeExpertVo();
            this.createTypeExpertDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeExpert(typeExpert:TypeExpertVo){
       const isPermistted = await this.roleService.isPermitted('TypeExpert', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type expert) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeExpertService.delete(typeExpert).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeExperts.indexOf(typeExpert);
                          position > -1 ? this.typeExperts.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type expert Supprimé',
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


public async duplicateTypeExpert(typeExpert: TypeExpertVo) {

     this.typeExpertService.findByIdWithAssociatedList(typeExpert).subscribe(
	 res => {
	       this.initDuplicateTypeExpert(res);
	       this.selectedTypeExpert = res;
	       this.selectedTypeExpert.id = null;
            this.createTypeExpertDialog = true;

});

	}

	initDuplicateTypeExpert(res: TypeExpertVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeExperts.map(e => {
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
            'Libelle': this.searchTypeExpert.libelle ? this.searchTypeExpert.libelle : environment.emptyForExport ,
            'Code': this.searchTypeExpert.code ? this.searchTypeExpert.code : environment.emptyForExport ,
            'Archive': this.searchTypeExpert.archive ? (this.searchTypeExpert.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeExpert.dateArchivageMin ? this.datePipe.transform(this.searchTypeExpert.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeExpert.dateArchivageMax ? this.datePipe.transform(this.searchTypeExpert.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeExpert.dateCreationMin ? this.datePipe.transform(this.searchTypeExpert.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeExpert.dateCreationMax ? this.datePipe.transform(this.searchTypeExpert.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeExpert.admin ? (this.searchTypeExpert.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeExpert.visible ? (this.searchTypeExpert.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeExpert.username ? this.searchTypeExpert.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeExperts(): Array<TypeExpertVo> {
           return this.typeExpertService.typeExperts;
       }
    set typeExperts(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExperts = value;
       }

    get typeExpertSelections(): Array<TypeExpertVo> {
           return this.typeExpertService.typeExpertSelections;
       }
    set typeExpertSelections(value: Array<TypeExpertVo>) {
        this.typeExpertService.typeExpertSelections = value;
       }
   
     


    get selectedTypeExpert():TypeExpertVo {
           return this.typeExpertService.selectedTypeExpert;
       }
    set selectedTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.selectedTypeExpert = value;
       }
    
    get createTypeExpertDialog():boolean {
           return this.typeExpertService.createTypeExpertDialog;
       }
    set createTypeExpertDialog(value: boolean) {
        this.typeExpertService.createTypeExpertDialog= value;
       }
    
    get editTypeExpertDialog():boolean {
           return this.typeExpertService.editTypeExpertDialog;
       }
    set editTypeExpertDialog(value: boolean) {
        this.typeExpertService.editTypeExpertDialog= value;
       }
    get viewTypeExpertDialog():boolean {
           return this.typeExpertService.viewTypeExpertDialog;
       }
    set viewTypeExpertDialog(value: boolean) {
        this.typeExpertService.viewTypeExpertDialog = value;
       }
       
     get searchTypeExpert(): TypeExpertVo {
        return this.typeExpertService.searchTypeExpert;
       }
    set searchTypeExpert(value: TypeExpertVo) {
        this.typeExpertService.searchTypeExpert = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

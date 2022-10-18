import {Component, OnInit} from '@angular/core';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
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
  selector: 'app-type-savoir-list-chercheur',
  templateUrl: './type-savoir-list-chercheur.component.html',
  styleUrls: ['./type-savoir-list-chercheur.component.css']
})
export class TypeSavoirListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeSavoir';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeSavoirService: TypeSavoirService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeSavoirs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeSavoirs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'list');
        isPermistted ? this.typeSavoirService.findAll().subscribe(typeSavoirs => this.typeSavoirs = typeSavoirs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeSavoirService.findByCriteria(this.searchTypeSavoir).subscribe(typeSavoirs=>{
            
            this.typeSavoirs = typeSavoirs;
           // this.searchTypeSavoir = new TypeSavoirVo();
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
    
    public async editTypeSavoir(typeSavoir:TypeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'edit');
         if(isPermistted){
          this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(res => {
           this.selectedTypeSavoir = res;
            this.selectedTypeSavoir.dateArchivage = new Date(typeSavoir.dateArchivage);
            this.selectedTypeSavoir.dateCreation = new Date(typeSavoir.dateCreation);
            this.editTypeSavoirDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeSavoir(typeSavoir:TypeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'view');
        if(isPermistted){
           this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(res => {
           this.selectedTypeSavoir = res;
            this.selectedTypeSavoir.dateArchivage = new Date(typeSavoir.dateArchivage);
            this.selectedTypeSavoir.dateCreation = new Date(typeSavoir.dateCreation);
            this.viewTypeSavoirDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
            this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeSavoir(typeSavoir:TypeSavoirVo){
       const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type savoir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeSavoirService.delete(typeSavoir).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeSavoirs.indexOf(typeSavoir);
                          position > -1 ? this.typeSavoirs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type savoir Supprimé',
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


public async duplicateTypeSavoir(typeSavoir: TypeSavoirVo) {

     this.typeSavoirService.findByIdWithAssociatedList(typeSavoir).subscribe(
	 res => {
	       this.initDuplicateTypeSavoir(res);
	       this.selectedTypeSavoir = res;
	       this.selectedTypeSavoir.id = null;
            this.createTypeSavoirDialog = true;

});

	}

	initDuplicateTypeSavoir(res: TypeSavoirVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeSavoirs.map(e => {
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
            'Libelle': this.searchTypeSavoir.libelle ? this.searchTypeSavoir.libelle : environment.emptyForExport ,
            'Code': this.searchTypeSavoir.code ? this.searchTypeSavoir.code : environment.emptyForExport ,
            'Archive': this.searchTypeSavoir.archive ? (this.searchTypeSavoir.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeSavoir.dateArchivageMin ? this.datePipe.transform(this.searchTypeSavoir.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeSavoir.dateArchivageMax ? this.datePipe.transform(this.searchTypeSavoir.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeSavoir.dateCreationMin ? this.datePipe.transform(this.searchTypeSavoir.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeSavoir.dateCreationMax ? this.datePipe.transform(this.searchTypeSavoir.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeSavoir.admin ? (this.searchTypeSavoir.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeSavoir.visible ? (this.searchTypeSavoir.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeSavoir.username ? this.searchTypeSavoir.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
    set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }

    get typeSavoirSelections(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirSelections;
       }
    set typeSavoirSelections(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirSelections = value;
       }
   
     


    get selectedTypeSavoir():TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
    set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
    
    get createTypeSavoirDialog():boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
    set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }
    
    get editTypeSavoirDialog():boolean {
           return this.typeSavoirService.editTypeSavoirDialog;
       }
    set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog= value;
       }
    get viewTypeSavoirDialog():boolean {
           return this.typeSavoirService.viewTypeSavoirDialog;
       }
    set viewTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.viewTypeSavoirDialog = value;
       }
       
     get searchTypeSavoir(): TypeSavoirVo {
        return this.typeSavoirService.searchTypeSavoir;
       }
    set searchTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.searchTypeSavoir = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

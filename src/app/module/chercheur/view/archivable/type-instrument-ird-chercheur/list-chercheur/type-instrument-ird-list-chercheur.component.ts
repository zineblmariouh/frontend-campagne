import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
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
  selector: 'app-type-instrument-ird-list-chercheur',
  templateUrl: './type-instrument-ird-list-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-list-chercheur.component.css']
})
export class TypeInstrumentIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstrumentIrd';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeInstrumentIrds();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'list');
        isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstrumentIrdService.findByCriteria(this.searchTypeInstrumentIrd).subscribe(typeInstrumentIrds=>{
            
            this.typeInstrumentIrds = typeInstrumentIrds;
           // this.searchTypeInstrumentIrd = new TypeInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editTypeInstrumentIrd(typeInstrumentIrd:TypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'edit');
         if(isPermistted){
          this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(res => {
           this.selectedTypeInstrumentIrd = res;
            this.selectedTypeInstrumentIrd.dateArchivage = new Date(typeInstrumentIrd.dateArchivage);
            this.selectedTypeInstrumentIrd.dateCreation = new Date(typeInstrumentIrd.dateCreation);
            this.editTypeInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstrumentIrd(typeInstrumentIrd:TypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'view');
        if(isPermistted){
           this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(res => {
           this.selectedTypeInstrumentIrd = res;
            this.selectedTypeInstrumentIrd.dateArchivage = new Date(typeInstrumentIrd.dateArchivage);
            this.selectedTypeInstrumentIrd.dateCreation = new Date(typeInstrumentIrd.dateCreation);
            this.viewTypeInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
            this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstrumentIrd(typeInstrumentIrd:TypeInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstrumentIrdService.delete(typeInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstrumentIrds.indexOf(typeInstrumentIrd);
                          position > -1 ? this.typeInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instrument ird Supprimé',
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


public async duplicateTypeInstrumentIrd(typeInstrumentIrd: TypeInstrumentIrdVo) {

     this.typeInstrumentIrdService.findByIdWithAssociatedList(typeInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateTypeInstrumentIrd(res);
	       this.selectedTypeInstrumentIrd = res;
	       this.selectedTypeInstrumentIrd.id = null;
            this.createTypeInstrumentIrdDialog = true;

});

	}

	initDuplicateTypeInstrumentIrd(res: TypeInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeInstrumentIrds.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypeInstrumentIrd.code ? this.searchTypeInstrumentIrd.code : environment.emptyForExport ,
            'Libelle': this.searchTypeInstrumentIrd.libelle ? this.searchTypeInstrumentIrd.libelle : environment.emptyForExport ,
            'Archive': this.searchTypeInstrumentIrd.archive ? (this.searchTypeInstrumentIrd.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeInstrumentIrd.dateArchivageMin ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeInstrumentIrd.dateArchivageMax ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeInstrumentIrd.dateCreationMin ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeInstrumentIrd.dateCreationMax ? this.datePipe.transform(this.searchTypeInstrumentIrd.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeInstrumentIrd.admin ? (this.searchTypeInstrumentIrd.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeInstrumentIrd.visible ? (this.searchTypeInstrumentIrd.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeInstrumentIrd.username ? this.searchTypeInstrumentIrd.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
    set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

    get typeInstrumentIrdSelections(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrdSelections;
       }
    set typeInstrumentIrdSelections(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrdSelections = value;
       }
   
     


    get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
    
    get createTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
    set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
    
    get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
    set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
    get viewTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog;
       }
    set viewTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog = value;
       }
       
     get searchTypeInstrumentIrd(): TypeInstrumentIrdVo {
        return this.typeInstrumentIrdService.searchTypeInstrumentIrd;
       }
    set searchTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.searchTypeInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeInstrumentIrdService } from '../../../../../controller/service/TypeInstrumentIrd.service';
import { ConsultanceScientifiquePonctuelleService } from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-instrument-ird-consultance-scientifique-ponctuelle-list-chercheur',
  templateUrl: './type-instrument-ird-consultance-scientifique-ponctuelle-list-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-consultance-scientifique-ponctuelle-list-chercheur.component.css']
})
export class TypeInstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeInstrumentIrdConsultanceScientifiquePonctuelle';
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;
    consultanceScientifiquePonctuelles :Array<ConsultanceScientifiquePonctuelleVo>;


    constructor(private datePipe: DatePipe, private typeInstrumentIrdConsultanceScientifiquePonctuelleService: TypeInstrumentIrdConsultanceScientifiquePonctuelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeInstrumentIrdService: TypeInstrumentIrdService
        , private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
) { }

    ngOnInit(): void {
      this.loadTypeInstrumentIrdConsultanceScientifiquePonctuelles();
      this.initExport();
      this.initCol();
      this.loadTypeInstrumentIrd();
      this.loadConsultanceScientifiquePonctuelle();
    }
    
    // methods
      public async loadTypeInstrumentIrdConsultanceScientifiquePonctuelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'list');
        isPermistted ? this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.findAll().subscribe(typeInstrumentIrdConsultanceScientifiquePonctuelles => this.typeInstrumentIrdConsultanceScientifiquePonctuelles = typeInstrumentIrdConsultanceScientifiquePonctuelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.findByCriteria(this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(typeInstrumentIrdConsultanceScientifiquePonctuelles=>{
            
            this.typeInstrumentIrdConsultanceScientifiquePonctuelles = typeInstrumentIrdConsultanceScientifiquePonctuelles;
           // this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                        {field: 'consultanceScientifiquePonctuelle?.id', header: 'Consultance scientifique ponctuelle'},
        ];
    }
    
    public async editTypeInstrumentIrdConsultanceScientifiquePonctuelle(typeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'edit');
         if(isPermistted){
          this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(typeInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = res;
            this.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeInstrumentIrdConsultanceScientifiquePonctuelle(typeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo){
        const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'view');
        if(isPermistted){
           this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(typeInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(res => {
           this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = res;
            this.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeInstrumentIrdConsultanceScientifiquePonctuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
            this.createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeInstrumentIrdConsultanceScientifiquePonctuelle(typeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo){
       const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type instrument ird consultance scientifique ponctuelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.delete(typeInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeInstrumentIrdConsultanceScientifiquePonctuelles.indexOf(typeInstrumentIrdConsultanceScientifiquePonctuelle);
                          position > -1 ? this.typeInstrumentIrdConsultanceScientifiquePonctuelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type instrument ird consultance scientifique ponctuelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadConsultanceScientifiquePonctuelle(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrdConsultanceScientifiquePonctuelle', 'list');
    isPermistted ? this.consultanceScientifiquePonctuelleService.findAll().subscribe(consultanceScientifiquePonctuelles => this.consultanceScientifiquePonctuelles = consultanceScientifiquePonctuelles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeInstrumentIrdConsultanceScientifiquePonctuelle(typeInstrumentIrdConsultanceScientifiquePonctuelle: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {

     this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.findByIdWithAssociatedList(typeInstrumentIrdConsultanceScientifiquePonctuelle).subscribe(
	 res => {
	       this.initDuplicateTypeInstrumentIrdConsultanceScientifiquePonctuelle(res);
	       this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = res;
	       this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle.id = null;
            this.createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = true;

});

	}

	initDuplicateTypeInstrumentIrdConsultanceScientifiquePonctuelle(res: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeInstrumentIrdConsultanceScientifiquePonctuelles.map(e => {
    return {
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
            'Consultance scientifique ponctuelle': e.consultanceScientifiquePonctuelleVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type instrument ird': this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle.typeInstrumentIrdVo?.libelle ? this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
        'Consultance scientifique ponctuelle': this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id ? this.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle.consultanceScientifiquePonctuelleVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeInstrumentIrdConsultanceScientifiquePonctuelles(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles;
       }
    set typeInstrumentIrdConsultanceScientifiquePonctuelles(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles = value;
       }

    get typeInstrumentIrdConsultanceScientifiquePonctuelleSelections(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelleSelections;
       }
    set typeInstrumentIrdConsultanceScientifiquePonctuelleSelections(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelleSelections = value;
       }
   
     


    get selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle():TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }
    
    get createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    
    get editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
       }
    get viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }
    set viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }
       
     get searchTypeInstrumentIrdConsultanceScientifiquePonctuelle(): TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
        return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set searchTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.searchTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

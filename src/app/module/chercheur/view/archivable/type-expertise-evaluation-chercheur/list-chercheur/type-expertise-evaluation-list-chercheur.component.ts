import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
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
  selector: 'app-type-expertise-evaluation-list-chercheur',
  templateUrl: './type-expertise-evaluation-list-chercheur.component.html',
  styleUrls: ['./type-expertise-evaluation-list-chercheur.component.css']
})
export class TypeExpertiseEvaluationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeExpertiseEvaluation';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private typeExpertiseEvaluationService: TypeExpertiseEvaluationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeExpertiseEvaluations();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadTypeExpertiseEvaluations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'list');
        isPermistted ? this.typeExpertiseEvaluationService.findAll().subscribe(typeExpertiseEvaluations => this.typeExpertiseEvaluations = typeExpertiseEvaluations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeExpertiseEvaluationService.findByCriteria(this.searchTypeExpertiseEvaluation).subscribe(typeExpertiseEvaluations=>{
            
            this.typeExpertiseEvaluations = typeExpertiseEvaluations;
           // this.searchTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
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
    
    public async editTypeExpertiseEvaluation(typeExpertiseEvaluation:TypeExpertiseEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'edit');
         if(isPermistted){
          this.typeExpertiseEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluation).subscribe(res => {
           this.selectedTypeExpertiseEvaluation = res;
            this.selectedTypeExpertiseEvaluation.dateArchivage = new Date(typeExpertiseEvaluation.dateArchivage);
            this.selectedTypeExpertiseEvaluation.dateCreation = new Date(typeExpertiseEvaluation.dateCreation);
            this.editTypeExpertiseEvaluationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeExpertiseEvaluation(typeExpertiseEvaluation:TypeExpertiseEvaluationVo){
        const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'view');
        if(isPermistted){
           this.typeExpertiseEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluation).subscribe(res => {
           this.selectedTypeExpertiseEvaluation = res;
            this.selectedTypeExpertiseEvaluation.dateArchivage = new Date(typeExpertiseEvaluation.dateArchivage);
            this.selectedTypeExpertiseEvaluation.dateCreation = new Date(typeExpertiseEvaluation.dateCreation);
            this.viewTypeExpertiseEvaluationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeExpertiseEvaluation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
            this.createTypeExpertiseEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeExpertiseEvaluation(typeExpertiseEvaluation:TypeExpertiseEvaluationVo){
       const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type expertise evaluation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeExpertiseEvaluationService.delete(typeExpertiseEvaluation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeExpertiseEvaluations.indexOf(typeExpertiseEvaluation);
                          position > -1 ? this.typeExpertiseEvaluations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type expertise evaluation Supprimé',
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


public async duplicateTypeExpertiseEvaluation(typeExpertiseEvaluation: TypeExpertiseEvaluationVo) {

     this.typeExpertiseEvaluationService.findByIdWithAssociatedList(typeExpertiseEvaluation).subscribe(
	 res => {
	       this.initDuplicateTypeExpertiseEvaluation(res);
	       this.selectedTypeExpertiseEvaluation = res;
	       this.selectedTypeExpertiseEvaluation.id = null;
            this.createTypeExpertiseEvaluationDialog = true;

});

	}

	initDuplicateTypeExpertiseEvaluation(res: TypeExpertiseEvaluationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeExpertiseEvaluations.map(e => {
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
            'Libelle': this.searchTypeExpertiseEvaluation.libelle ? this.searchTypeExpertiseEvaluation.libelle : environment.emptyForExport ,
            'Code': this.searchTypeExpertiseEvaluation.code ? this.searchTypeExpertiseEvaluation.code : environment.emptyForExport ,
            'Archive': this.searchTypeExpertiseEvaluation.archive ? (this.searchTypeExpertiseEvaluation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchTypeExpertiseEvaluation.dateArchivageMin ? this.datePipe.transform(this.searchTypeExpertiseEvaluation.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchTypeExpertiseEvaluation.dateArchivageMax ? this.datePipe.transform(this.searchTypeExpertiseEvaluation.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchTypeExpertiseEvaluation.dateCreationMin ? this.datePipe.transform(this.searchTypeExpertiseEvaluation.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchTypeExpertiseEvaluation.dateCreationMax ? this.datePipe.transform(this.searchTypeExpertiseEvaluation.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchTypeExpertiseEvaluation.admin ? (this.searchTypeExpertiseEvaluation.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchTypeExpertiseEvaluation.visible ? (this.searchTypeExpertiseEvaluation.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchTypeExpertiseEvaluation.username ? this.searchTypeExpertiseEvaluation.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
    set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }

    get typeExpertiseEvaluationSelections(): Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluationSelections;
       }
    set typeExpertiseEvaluationSelections(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluationSelections = value;
       }
   
     


    get selectedTypeExpertiseEvaluation():TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
    set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
    
    get createTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog;
       }
    set createTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog= value;
       }
    
    get editTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog;
       }
    set editTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog= value;
       }
    get viewTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.viewTypeExpertiseEvaluationDialog;
       }
    set viewTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.viewTypeExpertiseEvaluationDialog = value;
       }
       
     get searchTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
        return this.typeExpertiseEvaluationService.searchTypeExpertiseEvaluation;
       }
    set searchTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.searchTypeExpertiseEvaluation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

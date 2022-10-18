import {Component, OnInit} from '@angular/core';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
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
  selector: 'app-type-participation-list-chercheur',
  templateUrl: './type-participation-list-chercheur.component.html',
  styleUrls: ['./type-participation-list-chercheur.component.css']
})
export class TypeParticipationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeParticipation';


    constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypeParticipations();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypeParticipations(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeParticipation', 'list');
        isPermistted ? this.typeParticipationService.findAll().subscribe(typeParticipations => this.typeParticipations = typeParticipations,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeParticipationService.findByCriteria(this.searchTypeParticipation).subscribe(typeParticipations=>{
            
            this.typeParticipations = typeParticipations;
           // this.searchTypeParticipation = new TypeParticipationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editTypeParticipation(typeParticipation:TypeParticipationVo){
        const isPermistted = await this.roleService.isPermitted('TypeParticipation', 'edit');
         if(isPermistted){
          this.typeParticipationService.findByIdWithAssociatedList(typeParticipation).subscribe(res => {
           this.selectedTypeParticipation = res;
            this.editTypeParticipationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeParticipation(typeParticipation:TypeParticipationVo){
        const isPermistted = await this.roleService.isPermitted('TypeParticipation', 'view');
        if(isPermistted){
           this.typeParticipationService.findByIdWithAssociatedList(typeParticipation).subscribe(res => {
           this.selectedTypeParticipation = res;
            this.viewTypeParticipationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeParticipation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeParticipation = new TypeParticipationVo();
            this.createTypeParticipationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeParticipation(typeParticipation:TypeParticipationVo){
       const isPermistted = await this.roleService.isPermitted('TypeParticipation', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type participation) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeParticipationService.delete(typeParticipation).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeParticipations.indexOf(typeParticipation);
                          position > -1 ? this.typeParticipations.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type participation Supprimé',
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


public async duplicateTypeParticipation(typeParticipation: TypeParticipationVo) {

     this.typeParticipationService.findByIdWithAssociatedList(typeParticipation).subscribe(
	 res => {
	       this.initDuplicateTypeParticipation(res);
	       this.selectedTypeParticipation = res;
	       this.selectedTypeParticipation.id = null;
            this.createTypeParticipationDialog = true;

});

	}

	initDuplicateTypeParticipation(res: TypeParticipationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeParticipations.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchTypeParticipation.code ? this.searchTypeParticipation.code : environment.emptyForExport ,
            'Libelle': this.searchTypeParticipation.libelle ? this.searchTypeParticipation.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeParticipations(): Array<TypeParticipationVo> {
           return this.typeParticipationService.typeParticipations;
       }
    set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }

    get typeParticipationSelections(): Array<TypeParticipationVo> {
           return this.typeParticipationService.typeParticipationSelections;
       }
    set typeParticipationSelections(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipationSelections = value;
       }
   
     


    get selectedTypeParticipation():TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
    set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }
    
    get createTypeParticipationDialog():boolean {
           return this.typeParticipationService.createTypeParticipationDialog;
       }
    set createTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.createTypeParticipationDialog= value;
       }
    
    get editTypeParticipationDialog():boolean {
           return this.typeParticipationService.editTypeParticipationDialog;
       }
    set editTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.editTypeParticipationDialog= value;
       }
    get viewTypeParticipationDialog():boolean {
           return this.typeParticipationService.viewTypeParticipationDialog;
       }
    set viewTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.viewTypeParticipationDialog = value;
       }
       
     get searchTypeParticipation(): TypeParticipationVo {
        return this.typeParticipationService.searchTypeParticipation;
       }
    set searchTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.searchTypeParticipation = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

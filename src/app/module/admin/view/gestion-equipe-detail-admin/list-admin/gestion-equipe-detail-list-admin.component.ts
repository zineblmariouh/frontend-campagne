import {Component, OnInit} from '@angular/core';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { GestionEquipeService } from '../../../../../controller/service/GestionEquipe.service';

import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-gestion-equipe-detail-list-admin',
  templateUrl: './gestion-equipe-detail-list-admin.component.html',
  styleUrls: ['./gestion-equipe-detail-list-admin.component.css']
})
export class GestionEquipeDetailListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'GestionEquipeDetail';
     yesOrNoFormationManagement :any[] =[];
    gestionEquipes :Array<GestionEquipeVo>;


    constructor(private datePipe: DatePipe, private gestionEquipeDetailService: GestionEquipeDetailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private gestionEquipeService: GestionEquipeService
) { }

    ngOnInit(): void {
      this.loadGestionEquipeDetails();
      this.initExport();
      this.initCol();
      this.loadGestionEquipe();
    this.yesOrNoFormationManagement =  [{label: 'FormationManagement', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadGestionEquipeDetails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('GestionEquipeDetail', 'list');
        isPermistted ? this.gestionEquipeDetailService.findAll().subscribe(gestionEquipeDetails => this.gestionEquipeDetails = gestionEquipeDetails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.gestionEquipeDetailService.findByCriteria(this.searchGestionEquipeDetail).subscribe(gestionEquipeDetails=>{
            
            this.gestionEquipeDetails = gestionEquipeDetails;
           // this.searchGestionEquipeDetail = new GestionEquipeDetailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nombrePersonneEncadre', header: 'Nombre personne encadre'},
                            {field: 'nombrePersonneHorsIrd', header: 'Nombre personne hors ird'},
                            {field: 'nombrePersonneSousConventions', header: 'Nombre personne sous conventions'},
                            {field: 'formationManagement', header: 'Formation management'},
                        {field: 'gestionEquipe?.id', header: 'Gestion equipe'},
        ];
    }
    
    public async editGestionEquipeDetail(gestionEquipeDetail:GestionEquipeDetailVo){
        const isPermistted = await this.roleService.isPermitted('GestionEquipeDetail', 'edit');
         if(isPermistted){
          this.gestionEquipeDetailService.findByIdWithAssociatedList(gestionEquipeDetail).subscribe(res => {
           this.selectedGestionEquipeDetail = res;
            this.editGestionEquipeDetailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewGestionEquipeDetail(gestionEquipeDetail:GestionEquipeDetailVo){
        const isPermistted = await this.roleService.isPermitted('GestionEquipeDetail', 'view');
        if(isPermistted){
           this.gestionEquipeDetailService.findByIdWithAssociatedList(gestionEquipeDetail).subscribe(res => {
           this.selectedGestionEquipeDetail = res;
            this.viewGestionEquipeDetailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateGestionEquipeDetail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedGestionEquipeDetail = new GestionEquipeDetailVo();
            this.createGestionEquipeDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteGestionEquipeDetail(gestionEquipeDetail:GestionEquipeDetailVo){
       const isPermistted = await this.roleService.isPermitted('GestionEquipeDetail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Gestion equipe detail) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.gestionEquipeDetailService.delete(gestionEquipeDetail).subscribe(status=>{
                          if(status > 0){
                          const position = this.gestionEquipeDetails.indexOf(gestionEquipeDetail);
                          position > -1 ? this.gestionEquipeDetails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Gestion equipe detail Supprimé',
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

public async loadGestionEquipe(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('GestionEquipeDetail', 'list');
    isPermistted ? this.gestionEquipeService.findAll().subscribe(gestionEquipes => this.gestionEquipes = gestionEquipes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateGestionEquipeDetail(gestionEquipeDetail: GestionEquipeDetailVo) {

     this.gestionEquipeDetailService.findByIdWithAssociatedList(gestionEquipeDetail).subscribe(
	 res => {
	       this.initDuplicateGestionEquipeDetail(res);
	       this.selectedGestionEquipeDetail = res;
	       this.selectedGestionEquipeDetail.id = null;
            this.createGestionEquipeDetailDialog = true;

});

	}

	initDuplicateGestionEquipeDetail(res: GestionEquipeDetailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.gestionEquipeDetails.map(e => {
    return {
                    'Nombre personne encadre': e.nombrePersonneEncadre ,
                    'Nombre personne hors ird': e.nombrePersonneHorsIrd ,
                    'Nombre personne sous conventions': e.nombrePersonneSousConventions ,
                    'Formation management': e.formationManagement? 'Vrai' : 'Faux' ,
            'Gestion equipe': e.gestionEquipeVo?.id ,
     }
      });

      this.criteriaData = [{
            'Nombre personne encadre Min': this.searchGestionEquipeDetail.nombrePersonneEncadreMin ? this.searchGestionEquipeDetail.nombrePersonneEncadreMin : environment.emptyForExport ,
            'Nombre personne encadre Max': this.searchGestionEquipeDetail.nombrePersonneEncadreMax ? this.searchGestionEquipeDetail.nombrePersonneEncadreMax : environment.emptyForExport ,
            'Nombre personne hors ird Min': this.searchGestionEquipeDetail.nombrePersonneHorsIrdMin ? this.searchGestionEquipeDetail.nombrePersonneHorsIrdMin : environment.emptyForExport ,
            'Nombre personne hors ird Max': this.searchGestionEquipeDetail.nombrePersonneHorsIrdMax ? this.searchGestionEquipeDetail.nombrePersonneHorsIrdMax : environment.emptyForExport ,
            'Nombre personne sous conventions Min': this.searchGestionEquipeDetail.nombrePersonneSousConventionsMin ? this.searchGestionEquipeDetail.nombrePersonneSousConventionsMin : environment.emptyForExport ,
            'Nombre personne sous conventions Max': this.searchGestionEquipeDetail.nombrePersonneSousConventionsMax ? this.searchGestionEquipeDetail.nombrePersonneSousConventionsMax : environment.emptyForExport ,
            'Formation management': this.searchGestionEquipeDetail.formationManagement ? (this.searchGestionEquipeDetail.formationManagement ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Gestion equipe': this.searchGestionEquipeDetail.gestionEquipeVo?.id ? this.searchGestionEquipeDetail.gestionEquipeVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get gestionEquipeDetails(): Array<GestionEquipeDetailVo> {
           return this.gestionEquipeDetailService.gestionEquipeDetails;
       }
    set gestionEquipeDetails(value: Array<GestionEquipeDetailVo>) {
        this.gestionEquipeDetailService.gestionEquipeDetails = value;
       }

    get gestionEquipeDetailSelections(): Array<GestionEquipeDetailVo> {
           return this.gestionEquipeDetailService.gestionEquipeDetailSelections;
       }
    set gestionEquipeDetailSelections(value: Array<GestionEquipeDetailVo>) {
        this.gestionEquipeDetailService.gestionEquipeDetailSelections = value;
       }
   
     


    get selectedGestionEquipeDetail():GestionEquipeDetailVo {
           return this.gestionEquipeDetailService.selectedGestionEquipeDetail;
       }
    set selectedGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this.gestionEquipeDetailService.selectedGestionEquipeDetail = value;
       }
    
    get createGestionEquipeDetailDialog():boolean {
           return this.gestionEquipeDetailService.createGestionEquipeDetailDialog;
       }
    set createGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.createGestionEquipeDetailDialog= value;
       }
    
    get editGestionEquipeDetailDialog():boolean {
           return this.gestionEquipeDetailService.editGestionEquipeDetailDialog;
       }
    set editGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.editGestionEquipeDetailDialog= value;
       }
    get viewGestionEquipeDetailDialog():boolean {
           return this.gestionEquipeDetailService.viewGestionEquipeDetailDialog;
       }
    set viewGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.viewGestionEquipeDetailDialog = value;
       }
       
     get searchGestionEquipeDetail(): GestionEquipeDetailVo {
        return this.gestionEquipeDetailService.searchGestionEquipeDetail;
       }
    set searchGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this.gestionEquipeDetailService.searchGestionEquipeDetail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

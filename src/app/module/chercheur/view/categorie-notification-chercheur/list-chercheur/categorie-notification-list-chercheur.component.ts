import {Component, OnInit} from '@angular/core';
import {CategorieNotificationService} from '../../../../../controller/service/CategorieNotification.service';
import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
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
  selector: 'app-categorie-notification-list-chercheur',
  templateUrl: './categorie-notification-list-chercheur.component.html',
  styleUrls: ['./categorie-notification-list-chercheur.component.css']
})
export class CategorieNotificationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieNotification';


    constructor(private datePipe: DatePipe, private categorieNotificationService: CategorieNotificationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCategorieNotifications();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadCategorieNotifications(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieNotification', 'list');
        isPermistted ? this.categorieNotificationService.findAll().subscribe(categorieNotifications => this.categorieNotifications = categorieNotifications,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categorieNotificationService.findByCriteria(this.searchCategorieNotification).subscribe(categorieNotifications=>{
            
            this.categorieNotifications = categorieNotifications;
           // this.searchCategorieNotification = new CategorieNotificationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editCategorieNotification(categorieNotification:CategorieNotificationVo){
        const isPermistted = await this.roleService.isPermitted('CategorieNotification', 'edit');
         if(isPermistted){
          this.categorieNotificationService.findByIdWithAssociatedList(categorieNotification).subscribe(res => {
           this.selectedCategorieNotification = res;
            this.editCategorieNotificationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategorieNotification(categorieNotification:CategorieNotificationVo){
        const isPermistted = await this.roleService.isPermitted('CategorieNotification', 'view');
        if(isPermistted){
           this.categorieNotificationService.findByIdWithAssociatedList(categorieNotification).subscribe(res => {
           this.selectedCategorieNotification = res;
            this.viewCategorieNotificationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategorieNotification(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategorieNotification = new CategorieNotificationVo();
            this.createCategorieNotificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategorieNotification(categorieNotification:CategorieNotificationVo){
       const isPermistted = await this.roleService.isPermitted('CategorieNotification', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie notification) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categorieNotificationService.delete(categorieNotification).subscribe(status=>{
                          if(status > 0){
                          const position = this.categorieNotifications.indexOf(categorieNotification);
                          position > -1 ? this.categorieNotifications.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie notification Supprimé',
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


public async duplicateCategorieNotification(categorieNotification: CategorieNotificationVo) {

     this.categorieNotificationService.findByIdWithAssociatedList(categorieNotification).subscribe(
	 res => {
	       this.initDuplicateCategorieNotification(res);
	       this.selectedCategorieNotification = res;
	       this.selectedCategorieNotification.id = null;
            this.createCategorieNotificationDialog = true;

});

	}

	initDuplicateCategorieNotification(res: CategorieNotificationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.categorieNotifications.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchCategorieNotification.libelle ? this.searchCategorieNotification.libelle : environment.emptyForExport ,
            'Code': this.searchCategorieNotification.code ? this.searchCategorieNotification.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categorieNotifications(): Array<CategorieNotificationVo> {
           return this.categorieNotificationService.categorieNotifications;
       }
    set categorieNotifications(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotifications = value;
       }

    get categorieNotificationSelections(): Array<CategorieNotificationVo> {
           return this.categorieNotificationService.categorieNotificationSelections;
       }
    set categorieNotificationSelections(value: Array<CategorieNotificationVo>) {
        this.categorieNotificationService.categorieNotificationSelections = value;
       }
   
     


    get selectedCategorieNotification():CategorieNotificationVo {
           return this.categorieNotificationService.selectedCategorieNotification;
       }
    set selectedCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.selectedCategorieNotification = value;
       }
    
    get createCategorieNotificationDialog():boolean {
           return this.categorieNotificationService.createCategorieNotificationDialog;
       }
    set createCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.createCategorieNotificationDialog= value;
       }
    
    get editCategorieNotificationDialog():boolean {
           return this.categorieNotificationService.editCategorieNotificationDialog;
       }
    set editCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.editCategorieNotificationDialog= value;
       }
    get viewCategorieNotificationDialog():boolean {
           return this.categorieNotificationService.viewCategorieNotificationDialog;
       }
    set viewCategorieNotificationDialog(value: boolean) {
        this.categorieNotificationService.viewCategorieNotificationDialog = value;
       }
       
     get searchCategorieNotification(): CategorieNotificationVo {
        return this.categorieNotificationService.searchCategorieNotification;
       }
    set searchCategorieNotification(value: CategorieNotificationVo) {
        this.categorieNotificationService.searchCategorieNotification = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

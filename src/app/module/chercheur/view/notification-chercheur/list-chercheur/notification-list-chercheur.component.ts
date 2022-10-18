import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../../controller/service/Notification.service';
import {NotificationVo} from '../../../../../controller/model/Notification.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { CategorieNotificationService } from '../../../../../controller/service/CategorieNotification.service';

import {CategorieNotificationVo} from '../../../../../controller/model/CategorieNotification.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-notification-list-chercheur',
  templateUrl: './notification-list-chercheur.component.html',
  styleUrls: ['./notification-list-chercheur.component.css']
})
export class NotificationListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Notification';
     yesOrNoVu :any[] =[];
    chercheurs :Array<ChercheurVo>;
    categorieNotifications :Array<CategorieNotificationVo>;


    constructor(private datePipe: DatePipe, private notificationService: NotificationService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
        , private categorieNotificationService: CategorieNotificationService
) { }

    ngOnInit(): void {
      this.loadNotifications();
      this.initExport();
      this.initCol();
      this.loadChercheur();
      this.loadCategorieNotification();
    this.yesOrNoVu =  [{label: 'Vu', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNotifications(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Notification', 'list');
        isPermistted ? this.notificationService.findAll().subscribe(notifications => this.notifications = notifications,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.notificationService.findByCriteria(this.searchNotification).subscribe(notifications=>{
            
            this.notifications = notifications;
           // this.searchNotification = new NotificationVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'vu', header: 'Vu'},
                            {field: 'dateNotification', header: 'Date notification'},
                            {field: 'dateLecture', header: 'Date lecture'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'categorieNotification?.libelle', header: 'Categorie notification'},
        ];
    }
    
    public async editNotification(notification:NotificationVo){
        const isPermistted = await this.roleService.isPermitted('Notification', 'edit');
         if(isPermistted){
          this.notificationService.findByIdWithAssociatedList(notification).subscribe(res => {
           this.selectedNotification = res;
            this.selectedNotification.dateNotification = new Date(notification.dateNotification);
            this.selectedNotification.dateLecture = new Date(notification.dateLecture);
            this.editNotificationDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNotification(notification:NotificationVo){
        const isPermistted = await this.roleService.isPermitted('Notification', 'view');
        if(isPermistted){
           this.notificationService.findByIdWithAssociatedList(notification).subscribe(res => {
           this.selectedNotification = res;
            this.selectedNotification.dateNotification = new Date(notification.dateNotification);
            this.selectedNotification.dateLecture = new Date(notification.dateLecture);
            this.viewNotificationDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNotification(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNotification = new NotificationVo();
            this.createNotificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNotification(notification:NotificationVo){
       const isPermistted = await this.roleService.isPermitted('Notification', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Notification) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.notificationService.delete(notification).subscribe(status=>{
                          if(status > 0){
                          const position = this.notifications.indexOf(notification);
                          position > -1 ? this.notifications.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Notification Supprimé',
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

public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Notification', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCategorieNotification(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Notification', 'list');
    isPermistted ? this.categorieNotificationService.findAll().subscribe(categorieNotifications => this.categorieNotifications = categorieNotifications,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateNotification(notification: NotificationVo) {

     this.notificationService.findByIdWithAssociatedList(notification).subscribe(
	 res => {
	       this.initDuplicateNotification(res);
	       this.selectedNotification = res;
	       this.selectedNotification.id = null;
            this.createNotificationDialog = true;

});

	}

	initDuplicateNotification(res: NotificationVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.notifications.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Description': e.description ,
                    'Vu': e.vu? 'Vrai' : 'Faux' ,
                    'Date notification': this.datePipe.transform(e.dateNotification , 'dd-MM-yyyy'),
                    'Date lecture': this.datePipe.transform(e.dateLecture , 'dd-MM-yyyy'),
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Categorie notification': e.categorieNotificationVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchNotification.libelle ? this.searchNotification.libelle : environment.emptyForExport ,
            'Description': this.searchNotification.description ? this.searchNotification.description : environment.emptyForExport ,
            'Vu': this.searchNotification.vu ? (this.searchNotification.vu ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date notification Min': this.searchNotification.dateNotificationMin ? this.datePipe.transform(this.searchNotification.dateNotificationMin , this.dateFormat) : environment.emptyForExport ,
            'Date notification Max': this.searchNotification.dateNotificationMax ? this.datePipe.transform(this.searchNotification.dateNotificationMax , this.dateFormat) : environment.emptyForExport ,
            'Date lecture Min': this.searchNotification.dateLectureMin ? this.datePipe.transform(this.searchNotification.dateLectureMin , this.dateFormat) : environment.emptyForExport ,
            'Date lecture Max': this.searchNotification.dateLectureMax ? this.datePipe.transform(this.searchNotification.dateLectureMax , this.dateFormat) : environment.emptyForExport ,
        'Chercheur': this.searchNotification.chercheurVo?.numeroMatricule ? this.searchNotification.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Categorie notification': this.searchNotification.categorieNotificationVo?.libelle ? this.searchNotification.categorieNotificationVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get notifications(): Array<NotificationVo> {
           return this.notificationService.notifications;
       }
    set notifications(value: Array<NotificationVo>) {
        this.notificationService.notifications = value;
       }

    get notificationSelections(): Array<NotificationVo> {
           return this.notificationService.notificationSelections;
       }
    set notificationSelections(value: Array<NotificationVo>) {
        this.notificationService.notificationSelections = value;
       }
   
     


    get selectedNotification():NotificationVo {
           return this.notificationService.selectedNotification;
       }
    set selectedNotification(value: NotificationVo) {
        this.notificationService.selectedNotification = value;
       }
    
    get createNotificationDialog():boolean {
           return this.notificationService.createNotificationDialog;
       }
    set createNotificationDialog(value: boolean) {
        this.notificationService.createNotificationDialog= value;
       }
    
    get editNotificationDialog():boolean {
           return this.notificationService.editNotificationDialog;
       }
    set editNotificationDialog(value: boolean) {
        this.notificationService.editNotificationDialog= value;
       }
    get viewNotificationDialog():boolean {
           return this.notificationService.viewNotificationDialog;
       }
    set viewNotificationDialog(value: boolean) {
        this.notificationService.viewNotificationDialog = value;
       }
       
     get searchNotification(): NotificationVo {
        return this.notificationService.searchNotification;
       }
    set searchNotification(value: NotificationVo) {
        this.notificationService.searchNotification = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

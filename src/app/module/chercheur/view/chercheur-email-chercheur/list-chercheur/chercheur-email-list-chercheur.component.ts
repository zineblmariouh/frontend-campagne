import {Component, OnInit} from '@angular/core';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ChercheurService } from '../../../../../controller/service/Chercheur.service';

import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-chercheur-email-list-chercheur',
  templateUrl: './chercheur-email-list-chercheur.component.html',
  styleUrls: ['./chercheur-email-list-chercheur.component.css']
})
export class ChercheurEmailListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ChercheurEmail';
     yesOrNoPrincipale :any[] =[];
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private chercheurEmailService: ChercheurEmailService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private chercheurService: ChercheurService
) { }

    ngOnInit(): void {
      this.loadChercheurEmails();
      this.initExport();
      this.initCol();
      this.loadChercheur();
    this.yesOrNoPrincipale =  [{label: 'Principale', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadChercheurEmails(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ChercheurEmail', 'list');
        isPermistted ? this.chercheurEmailService.findAll().subscribe(chercheurEmails => this.chercheurEmails = chercheurEmails,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.chercheurEmailService.findByCriteria(this.searchChercheurEmail).subscribe(chercheurEmails=>{
            
            this.chercheurEmails = chercheurEmails;
           // this.searchChercheurEmail = new ChercheurEmailVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                            {field: 'email', header: 'Email'},
                            {field: 'principale', header: 'Principale'},
        ];
    }
    
    public async editChercheurEmail(chercheurEmail:ChercheurEmailVo){
        const isPermistted = await this.roleService.isPermitted('ChercheurEmail', 'edit');
         if(isPermistted){
          this.chercheurEmailService.findByIdWithAssociatedList(chercheurEmail).subscribe(res => {
           this.selectedChercheurEmail = res;
            this.editChercheurEmailDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewChercheurEmail(chercheurEmail:ChercheurEmailVo){
        const isPermistted = await this.roleService.isPermitted('ChercheurEmail', 'view');
        if(isPermistted){
           this.chercheurEmailService.findByIdWithAssociatedList(chercheurEmail).subscribe(res => {
           this.selectedChercheurEmail = res;
            this.viewChercheurEmailDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateChercheurEmail(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedChercheurEmail = new ChercheurEmailVo();
            this.createChercheurEmailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteChercheurEmail(chercheurEmail:ChercheurEmailVo){
       const isPermistted = await this.roleService.isPermitted('ChercheurEmail', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Chercheur email) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.chercheurEmailService.delete(chercheurEmail).subscribe(status=>{
                          if(status > 0){
                          const position = this.chercheurEmails.indexOf(chercheurEmail);
                          position > -1 ? this.chercheurEmails.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Chercheur email Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('ChercheurEmail', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateChercheurEmail(chercheurEmail: ChercheurEmailVo) {

     this.chercheurEmailService.findByIdWithAssociatedList(chercheurEmail).subscribe(
	 res => {
	       this.initDuplicateChercheurEmail(res);
	       this.selectedChercheurEmail = res;
	       this.selectedChercheurEmail.id = null;
            this.createChercheurEmailDialog = true;

});

	}

	initDuplicateChercheurEmail(res: ChercheurEmailVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.chercheurEmails.map(e => {
    return {
            'Chercheur': e.chercheurVo?.numeroMatricule ,
                    'Email': e.email ,
                    'Principale': e.principale? 'Vrai' : 'Faux' ,
     }
      });

      this.criteriaData = [{
        'Chercheur': this.searchChercheurEmail.chercheurVo?.numeroMatricule ? this.searchChercheurEmail.chercheurVo?.numeroMatricule : environment.emptyForExport ,
            'Email': this.searchChercheurEmail.email ? this.searchChercheurEmail.email : environment.emptyForExport ,
            'Principale': this.searchChercheurEmail.principale ? (this.searchChercheurEmail.principale ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get chercheurEmails(): Array<ChercheurEmailVo> {
           return this.chercheurEmailService.chercheurEmails;
       }
    set chercheurEmails(value: Array<ChercheurEmailVo>) {
        this.chercheurEmailService.chercheurEmails = value;
       }

    get chercheurEmailSelections(): Array<ChercheurEmailVo> {
           return this.chercheurEmailService.chercheurEmailSelections;
       }
    set chercheurEmailSelections(value: Array<ChercheurEmailVo>) {
        this.chercheurEmailService.chercheurEmailSelections = value;
       }
   
     


    get selectedChercheurEmail():ChercheurEmailVo {
           return this.chercheurEmailService.selectedChercheurEmail;
       }
    set selectedChercheurEmail(value: ChercheurEmailVo) {
        this.chercheurEmailService.selectedChercheurEmail = value;
       }
    
    get createChercheurEmailDialog():boolean {
           return this.chercheurEmailService.createChercheurEmailDialog;
       }
    set createChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.createChercheurEmailDialog= value;
       }
    
    get editChercheurEmailDialog():boolean {
           return this.chercheurEmailService.editChercheurEmailDialog;
       }
    set editChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.editChercheurEmailDialog= value;
       }
    get viewChercheurEmailDialog():boolean {
           return this.chercheurEmailService.viewChercheurEmailDialog;
       }
    set viewChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.viewChercheurEmailDialog = value;
       }
       
     get searchChercheurEmail(): ChercheurEmailVo {
        return this.chercheurEmailService.searchChercheurEmail;
       }
    set searchChercheurEmail(value: ChercheurEmailVo) {
        this.chercheurEmailService.searchChercheurEmail = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

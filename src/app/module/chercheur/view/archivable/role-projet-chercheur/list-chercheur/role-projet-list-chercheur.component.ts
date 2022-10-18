import {Component, OnInit} from '@angular/core';
import {RoleProjetService} from '../../../../../controller/service/RoleProjet.service';
import {RoleProjetVo} from '../../../../../controller/model/RoleProjet.model';
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
  selector: 'app-role-projet-list-chercheur',
  templateUrl: './role-projet-list-chercheur.component.html',
  styleUrls: ['./role-projet-list-chercheur.component.css']
})
export class RoleProjetListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleProjet';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private roleProjetService: RoleProjetService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadRoleProjets();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadRoleProjets(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'list');
        isPermistted ? this.roleProjetService.findAll().subscribe(roleProjets => this.roleProjets = roleProjets,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.roleProjetService.findByCriteria(this.searchRoleProjet).subscribe(roleProjets=>{
            
            this.roleProjets = roleProjets;
           // this.searchRoleProjet = new RoleProjetVo();
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
    
    public async editRoleProjet(roleProjet:RoleProjetVo){
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'edit');
         if(isPermistted){
          this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(res => {
           this.selectedRoleProjet = res;
            this.selectedRoleProjet.dateArchivage = new Date(roleProjet.dateArchivage);
            this.selectedRoleProjet.dateCreation = new Date(roleProjet.dateCreation);
            this.editRoleProjetDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRoleProjet(roleProjet:RoleProjetVo){
        const isPermistted = await this.roleService.isPermitted('RoleProjet', 'view');
        if(isPermistted){
           this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(res => {
           this.selectedRoleProjet = res;
            this.selectedRoleProjet.dateArchivage = new Date(roleProjet.dateArchivage);
            this.selectedRoleProjet.dateCreation = new Date(roleProjet.dateCreation);
            this.viewRoleProjetDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRoleProjet(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRoleProjet = new RoleProjetVo();
            this.createRoleProjetDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRoleProjet(roleProjet:RoleProjetVo){
       const isPermistted = await this.roleService.isPermitted('RoleProjet', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Role projet) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.roleProjetService.delete(roleProjet).subscribe(status=>{
                          if(status > 0){
                          const position = this.roleProjets.indexOf(roleProjet);
                          position > -1 ? this.roleProjets.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Role projet Supprimé',
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


public async duplicateRoleProjet(roleProjet: RoleProjetVo) {

     this.roleProjetService.findByIdWithAssociatedList(roleProjet).subscribe(
	 res => {
	       this.initDuplicateRoleProjet(res);
	       this.selectedRoleProjet = res;
	       this.selectedRoleProjet.id = null;
            this.createRoleProjetDialog = true;

});

	}

	initDuplicateRoleProjet(res: RoleProjetVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.roleProjets.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Description': e.description ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchRoleProjet.libelle ? this.searchRoleProjet.libelle : environment.emptyForExport ,
            'Code': this.searchRoleProjet.code ? this.searchRoleProjet.code : environment.emptyForExport ,
            'Description': this.searchRoleProjet.description ? this.searchRoleProjet.description : environment.emptyForExport ,
            'Archive': this.searchRoleProjet.archive ? (this.searchRoleProjet.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchRoleProjet.dateArchivageMin ? this.datePipe.transform(this.searchRoleProjet.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchRoleProjet.dateArchivageMax ? this.datePipe.transform(this.searchRoleProjet.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchRoleProjet.dateCreationMin ? this.datePipe.transform(this.searchRoleProjet.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchRoleProjet.dateCreationMax ? this.datePipe.transform(this.searchRoleProjet.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchRoleProjet.admin ? (this.searchRoleProjet.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchRoleProjet.visible ? (this.searchRoleProjet.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchRoleProjet.username ? this.searchRoleProjet.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get roleProjets(): Array<RoleProjetVo> {
           return this.roleProjetService.roleProjets;
       }
    set roleProjets(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjets = value;
       }

    get roleProjetSelections(): Array<RoleProjetVo> {
           return this.roleProjetService.roleProjetSelections;
       }
    set roleProjetSelections(value: Array<RoleProjetVo>) {
        this.roleProjetService.roleProjetSelections = value;
       }
   
     


    get selectedRoleProjet():RoleProjetVo {
           return this.roleProjetService.selectedRoleProjet;
       }
    set selectedRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.selectedRoleProjet = value;
       }
    
    get createRoleProjetDialog():boolean {
           return this.roleProjetService.createRoleProjetDialog;
       }
    set createRoleProjetDialog(value: boolean) {
        this.roleProjetService.createRoleProjetDialog= value;
       }
    
    get editRoleProjetDialog():boolean {
           return this.roleProjetService.editRoleProjetDialog;
       }
    set editRoleProjetDialog(value: boolean) {
        this.roleProjetService.editRoleProjetDialog= value;
       }
    get viewRoleProjetDialog():boolean {
           return this.roleProjetService.viewRoleProjetDialog;
       }
    set viewRoleProjetDialog(value: boolean) {
        this.roleProjetService.viewRoleProjetDialog = value;
       }
       
     get searchRoleProjet(): RoleProjetVo {
        return this.roleProjetService.searchRoleProjet;
       }
    set searchRoleProjet(value: RoleProjetVo) {
        this.roleProjetService.searchRoleProjet = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

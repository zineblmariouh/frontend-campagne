import {Component, OnInit} from '@angular/core';
import {CommissionScientifiqueService} from '../../../../../controller/service/CommissionScientifique.service';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
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
  selector: 'app-commission-scientifique-list-admin',
  templateUrl: './commission-scientifique-list-admin.component.html',
  styleUrls: ['./commission-scientifique-list-admin.component.css']
})
export class CommissionScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommissionScientifique';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private commissionScientifiqueService: CommissionScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadCommissionScientifiques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadCommissionScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'list');
        isPermistted ? this.commissionScientifiqueService.findAll().subscribe(commissionScientifiques => this.commissionScientifiques = commissionScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.commissionScientifiqueService.findByCriteria(this.searchCommissionScientifique).subscribe(commissionScientifiques=>{
            
            this.commissionScientifiques = commissionScientifiques;
           // this.searchCommissionScientifique = new CommissionScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelleCourt', header: 'Libelle court'},
                            {field: 'libelleLong', header: 'Libelle long'},
                            {field: 'code', header: 'Code'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editCommissionScientifique(commissionScientifique:CommissionScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'edit');
         if(isPermistted){
          this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(res => {
           this.selectedCommissionScientifique = res;
            this.selectedCommissionScientifique.dateArchivage = new Date(commissionScientifique.dateArchivage);
            this.selectedCommissionScientifique.dateCreation = new Date(commissionScientifique.dateCreation);
            this.editCommissionScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommissionScientifique(commissionScientifique:CommissionScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'view');
        if(isPermistted){
           this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(res => {
           this.selectedCommissionScientifique = res;
            this.selectedCommissionScientifique.dateArchivage = new Date(commissionScientifique.dateArchivage);
            this.selectedCommissionScientifique.dateCreation = new Date(commissionScientifique.dateCreation);
            this.viewCommissionScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommissionScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommissionScientifique = new CommissionScientifiqueVo();
            this.createCommissionScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }
public async archiverCommissionScientifique(commissionScientifique:CommissionScientifiqueVo){
const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet élément (Commission scientifique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commissionScientifiqueService.archiver(commissionScientifique).subscribe(status=>{
const myIndex = this.commissionScientifiques.indexOf(commissionScientifique);
this.commissionScientifiques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commission scientifique archivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}

public async desarchiverCommissionScientifique(commissionScientifique:CommissionScientifiqueVo){
const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous désarchiver cet élément (Commission scientifique) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.commissionScientifiqueService.desarchiver(commissionScientifique).subscribe(status=>{
const myIndex = this.commissionScientifiques.indexOf(commissionScientifique);
this.commissionScientifiques[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succès',
detail: 'Commission scientifique désarchivé',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Problème de permission'
});
}
}


    public async deleteCommissionScientifique(commissionScientifique:CommissionScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Commission scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.commissionScientifiqueService.delete(commissionScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.commissionScientifiques.indexOf(commissionScientifique);
                          position > -1 ? this.commissionScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Commission scientifique Supprimé',
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


public async duplicateCommissionScientifique(commissionScientifique: CommissionScientifiqueVo) {

     this.commissionScientifiqueService.findByIdWithAssociatedList(commissionScientifique).subscribe(
	 res => {
	       this.initDuplicateCommissionScientifique(res);
	       this.selectedCommissionScientifique = res;
	       this.selectedCommissionScientifique.id = null;
            this.createCommissionScientifiqueDialog = true;

});

	}

	initDuplicateCommissionScientifique(res: CommissionScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.commissionScientifiques.map(e => {
    return {
                    'Libelle court': e.libelleCourt ,
                    'Libelle long': e.libelleLong ,
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
            'Libelle court': this.searchCommissionScientifique.libelleCourt ? this.searchCommissionScientifique.libelleCourt : environment.emptyForExport ,
            'Libelle long': this.searchCommissionScientifique.libelleLong ? this.searchCommissionScientifique.libelleLong : environment.emptyForExport ,
            'Code': this.searchCommissionScientifique.code ? this.searchCommissionScientifique.code : environment.emptyForExport ,
            'Archive': this.searchCommissionScientifique.archive ? (this.searchCommissionScientifique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchCommissionScientifique.dateArchivageMin ? this.datePipe.transform(this.searchCommissionScientifique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchCommissionScientifique.dateArchivageMax ? this.datePipe.transform(this.searchCommissionScientifique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchCommissionScientifique.dateCreationMin ? this.datePipe.transform(this.searchCommissionScientifique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchCommissionScientifique.dateCreationMax ? this.datePipe.transform(this.searchCommissionScientifique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchCommissionScientifique.admin ? (this.searchCommissionScientifique.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchCommissionScientifique.visible ? (this.searchCommissionScientifique.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchCommissionScientifique.username ? this.searchCommissionScientifique.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get commissionScientifiques(): Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiques;
       }
    set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }

    get commissionScientifiqueSelections(): Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiqueSelections;
       }
    set commissionScientifiqueSelections(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiqueSelections = value;
       }
   
     


    get selectedCommissionScientifique():CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
    set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }
    
    get createCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.createCommissionScientifiqueDialog;
       }
    set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog= value;
       }
    
    get editCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.editCommissionScientifiqueDialog;
       }
    set editCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.editCommissionScientifiqueDialog= value;
       }
    get viewCommissionScientifiqueDialog():boolean {
           return this.commissionScientifiqueService.viewCommissionScientifiqueDialog;
       }
    set viewCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.viewCommissionScientifiqueDialog = value;
       }
       
     get searchCommissionScientifique(): CommissionScientifiqueVo {
        return this.commissionScientifiqueService.searchCommissionScientifique;
       }
    set searchCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.searchCommissionScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

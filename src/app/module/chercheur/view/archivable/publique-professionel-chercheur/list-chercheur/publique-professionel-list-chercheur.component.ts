import {Component, OnInit} from '@angular/core';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
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
  selector: 'app-publique-professionel-list-chercheur',
  templateUrl: './publique-professionel-list-chercheur.component.html',
  styleUrls: ['./publique-professionel-list-chercheur.component.css']
})
export class PubliqueProfessionelListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PubliqueProfessionel';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private publiqueProfessionelService: PubliqueProfessionelService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadPubliqueProfessionels();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadPubliqueProfessionels(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'list');
        isPermistted ? this.publiqueProfessionelService.findAll().subscribe(publiqueProfessionels => this.publiqueProfessionels = publiqueProfessionels,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.publiqueProfessionelService.findByCriteria(this.searchPubliqueProfessionel).subscribe(publiqueProfessionels=>{
            
            this.publiqueProfessionels = publiqueProfessionels;
           // this.searchPubliqueProfessionel = new PubliqueProfessionelVo();
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
    
    public async editPubliqueProfessionel(publiqueProfessionel:PubliqueProfessionelVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'edit');
         if(isPermistted){
          this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(res => {
           this.selectedPubliqueProfessionel = res;
            this.selectedPubliqueProfessionel.dateArchivage = new Date(publiqueProfessionel.dateArchivage);
            this.selectedPubliqueProfessionel.dateCreation = new Date(publiqueProfessionel.dateCreation);
            this.editPubliqueProfessionelDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPubliqueProfessionel(publiqueProfessionel:PubliqueProfessionelVo){
        const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'view');
        if(isPermistted){
           this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(res => {
           this.selectedPubliqueProfessionel = res;
            this.selectedPubliqueProfessionel.dateArchivage = new Date(publiqueProfessionel.dateArchivage);
            this.selectedPubliqueProfessionel.dateCreation = new Date(publiqueProfessionel.dateCreation);
            this.viewPubliqueProfessionelDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePubliqueProfessionel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
            this.createPubliqueProfessionelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePubliqueProfessionel(publiqueProfessionel:PubliqueProfessionelVo){
       const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Publique professionel) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.publiqueProfessionelService.delete(publiqueProfessionel).subscribe(status=>{
                          if(status > 0){
                          const position = this.publiqueProfessionels.indexOf(publiqueProfessionel);
                          position > -1 ? this.publiqueProfessionels.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Publique professionel Supprimé',
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


public async duplicatePubliqueProfessionel(publiqueProfessionel: PubliqueProfessionelVo) {

     this.publiqueProfessionelService.findByIdWithAssociatedList(publiqueProfessionel).subscribe(
	 res => {
	       this.initDuplicatePubliqueProfessionel(res);
	       this.selectedPubliqueProfessionel = res;
	       this.selectedPubliqueProfessionel.id = null;
            this.createPubliqueProfessionelDialog = true;

});

	}

	initDuplicatePubliqueProfessionel(res: PubliqueProfessionelVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.publiqueProfessionels.map(e => {
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
            'Libelle': this.searchPubliqueProfessionel.libelle ? this.searchPubliqueProfessionel.libelle : environment.emptyForExport ,
            'Code': this.searchPubliqueProfessionel.code ? this.searchPubliqueProfessionel.code : environment.emptyForExport ,
            'Archive': this.searchPubliqueProfessionel.archive ? (this.searchPubliqueProfessionel.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchPubliqueProfessionel.dateArchivageMin ? this.datePipe.transform(this.searchPubliqueProfessionel.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchPubliqueProfessionel.dateArchivageMax ? this.datePipe.transform(this.searchPubliqueProfessionel.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchPubliqueProfessionel.dateCreationMin ? this.datePipe.transform(this.searchPubliqueProfessionel.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchPubliqueProfessionel.dateCreationMax ? this.datePipe.transform(this.searchPubliqueProfessionel.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchPubliqueProfessionel.admin ? (this.searchPubliqueProfessionel.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchPubliqueProfessionel.visible ? (this.searchPubliqueProfessionel.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchPubliqueProfessionel.username ? this.searchPubliqueProfessionel.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
    set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }

    get publiqueProfessionelSelections(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionelSelections;
       }
    set publiqueProfessionelSelections(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionelSelections = value;
       }
   
     


    get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
    
    get createPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
    set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
       }
    
    get editPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.editPubliqueProfessionelDialog;
       }
    set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog= value;
       }
    get viewPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.viewPubliqueProfessionelDialog;
       }
    set viewPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.viewPubliqueProfessionelDialog = value;
       }
       
     get searchPubliqueProfessionel(): PubliqueProfessionelVo {
        return this.publiqueProfessionelService.searchPubliqueProfessionel;
       }
    set searchPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.searchPubliqueProfessionel = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {NiveauFormationPostBacService} from '../../../../../controller/service/NiveauFormationPostBac.service';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
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
  selector: 'app-niveau-formation-post-bac-list-chercheur',
  templateUrl: './niveau-formation-post-bac-list-chercheur.component.html',
  styleUrls: ['./niveau-formation-post-bac-list-chercheur.component.css']
})
export class NiveauFormationPostBacListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauFormationPostBac';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private niveauFormationPostBacService: NiveauFormationPostBacService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNiveauFormationPostBacs();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadNiveauFormationPostBacs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'list');
        isPermistted ? this.niveauFormationPostBacService.findAll().subscribe(niveauFormationPostBacs => this.niveauFormationPostBacs = niveauFormationPostBacs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauFormationPostBacService.findByCriteria(this.searchNiveauFormationPostBac).subscribe(niveauFormationPostBacs=>{
            
            this.niveauFormationPostBacs = niveauFormationPostBacs;
           // this.searchNiveauFormationPostBac = new NiveauFormationPostBacVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editNiveauFormationPostBac(niveauFormationPostBac:NiveauFormationPostBacVo){
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'edit');
         if(isPermistted){
          this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(res => {
           this.selectedNiveauFormationPostBac = res;
            this.selectedNiveauFormationPostBac.dateArchivage = new Date(niveauFormationPostBac.dateArchivage);
            this.selectedNiveauFormationPostBac.dateCreation = new Date(niveauFormationPostBac.dateCreation);
            this.editNiveauFormationPostBacDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauFormationPostBac(niveauFormationPostBac:NiveauFormationPostBacVo){
        const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'view');
        if(isPermistted){
           this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(res => {
           this.selectedNiveauFormationPostBac = res;
            this.selectedNiveauFormationPostBac.dateArchivage = new Date(niveauFormationPostBac.dateArchivage);
            this.selectedNiveauFormationPostBac.dateCreation = new Date(niveauFormationPostBac.dateCreation);
            this.viewNiveauFormationPostBacDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauFormationPostBac(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauFormationPostBac = new NiveauFormationPostBacVo();
            this.createNiveauFormationPostBacDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauFormationPostBac(niveauFormationPostBac:NiveauFormationPostBacVo){
       const isPermistted = await this.roleService.isPermitted('NiveauFormationPostBac', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau formation post bac) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauFormationPostBacService.delete(niveauFormationPostBac).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauFormationPostBacs.indexOf(niveauFormationPostBac);
                          position > -1 ? this.niveauFormationPostBacs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau formation post bac Supprimé',
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


public async duplicateNiveauFormationPostBac(niveauFormationPostBac: NiveauFormationPostBacVo) {

     this.niveauFormationPostBacService.findByIdWithAssociatedList(niveauFormationPostBac).subscribe(
	 res => {
	       this.initDuplicateNiveauFormationPostBac(res);
	       this.selectedNiveauFormationPostBac = res;
	       this.selectedNiveauFormationPostBac.id = null;
            this.createNiveauFormationPostBacDialog = true;

});

	}

	initDuplicateNiveauFormationPostBac(res: NiveauFormationPostBacVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.niveauFormationPostBacs.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle': e.libelle ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchNiveauFormationPostBac.code ? this.searchNiveauFormationPostBac.code : environment.emptyForExport ,
            'Libelle': this.searchNiveauFormationPostBac.libelle ? this.searchNiveauFormationPostBac.libelle : environment.emptyForExport ,
            'Archive': this.searchNiveauFormationPostBac.archive ? (this.searchNiveauFormationPostBac.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchNiveauFormationPostBac.dateArchivageMin ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchNiveauFormationPostBac.dateArchivageMax ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchNiveauFormationPostBac.dateCreationMin ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchNiveauFormationPostBac.dateCreationMax ? this.datePipe.transform(this.searchNiveauFormationPostBac.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchNiveauFormationPostBac.admin ? (this.searchNiveauFormationPostBac.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchNiveauFormationPostBac.visible ? (this.searchNiveauFormationPostBac.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchNiveauFormationPostBac.username ? this.searchNiveauFormationPostBac.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacs;
       }
    set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacs = value;
       }

    get niveauFormationPostBacSelections(): Array<NiveauFormationPostBacVo> {
           return this.niveauFormationPostBacService.niveauFormationPostBacSelections;
       }
    set niveauFormationPostBacSelections(value: Array<NiveauFormationPostBacVo>) {
        this.niveauFormationPostBacService.niveauFormationPostBacSelections = value;
       }
   
     


    get selectedNiveauFormationPostBac():NiveauFormationPostBacVo {
           return this.niveauFormationPostBacService.selectedNiveauFormationPostBac;
       }
    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.selectedNiveauFormationPostBac = value;
       }
    
    get createNiveauFormationPostBacDialog():boolean {
           return this.niveauFormationPostBacService.createNiveauFormationPostBacDialog;
       }
    set createNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.createNiveauFormationPostBacDialog= value;
       }
    
    get editNiveauFormationPostBacDialog():boolean {
           return this.niveauFormationPostBacService.editNiveauFormationPostBacDialog;
       }
    set editNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.editNiveauFormationPostBacDialog= value;
       }
    get viewNiveauFormationPostBacDialog():boolean {
           return this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog;
       }
    set viewNiveauFormationPostBacDialog(value: boolean) {
        this.niveauFormationPostBacService.viewNiveauFormationPostBacDialog = value;
       }
       
     get searchNiveauFormationPostBac(): NiveauFormationPostBacVo {
        return this.niveauFormationPostBacService.searchNiveauFormationPostBac;
       }
    set searchNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this.niveauFormationPostBacService.searchNiveauFormationPostBac = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

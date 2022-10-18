import {Component, OnInit} from '@angular/core';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
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
  selector: 'app-departement-scientifique-list-chercheur',
  templateUrl: './departement-scientifique-list-chercheur.component.html',
  styleUrls: ['./departement-scientifique-list-chercheur.component.css']
})
export class DepartementScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DepartementScientifique';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];


    constructor(private datePipe: DatePipe, private departementScientifiqueService: DepartementScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadDepartementScientifiques();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDepartementScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'list');
        isPermistted ? this.departementScientifiqueService.findAll().subscribe(departementScientifiques => this.departementScientifiques = departementScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.departementScientifiqueService.findByCriteria(this.searchDepartementScientifique).subscribe(departementScientifiques=>{
            
            this.departementScientifiques = departementScientifiques;
           // this.searchDepartementScientifique = new DepartementScientifiqueVo();
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
    
    public async editDepartementScientifique(departementScientifique:DepartementScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'edit');
         if(isPermistted){
          this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(res => {
           this.selectedDepartementScientifique = res;
            this.selectedDepartementScientifique.dateArchivage = new Date(departementScientifique.dateArchivage);
            this.selectedDepartementScientifique.dateCreation = new Date(departementScientifique.dateCreation);
            this.editDepartementScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDepartementScientifique(departementScientifique:DepartementScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'view');
        if(isPermistted){
           this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(res => {
           this.selectedDepartementScientifique = res;
            this.selectedDepartementScientifique.dateArchivage = new Date(departementScientifique.dateArchivage);
            this.selectedDepartementScientifique.dateCreation = new Date(departementScientifique.dateCreation);
            this.viewDepartementScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDepartementScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDepartementScientifique = new DepartementScientifiqueVo();
            this.createDepartementScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDepartementScientifique(departementScientifique:DepartementScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Departement scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.departementScientifiqueService.delete(departementScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.departementScientifiques.indexOf(departementScientifique);
                          position > -1 ? this.departementScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Departement scientifique Supprimé',
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


public async duplicateDepartementScientifique(departementScientifique: DepartementScientifiqueVo) {

     this.departementScientifiqueService.findByIdWithAssociatedList(departementScientifique).subscribe(
	 res => {
	       this.initDuplicateDepartementScientifique(res);
	       this.selectedDepartementScientifique = res;
	       this.selectedDepartementScientifique.id = null;
            this.createDepartementScientifiqueDialog = true;

});

	}

	initDuplicateDepartementScientifique(res: DepartementScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.departementScientifiques.map(e => {
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
            'Libelle': this.searchDepartementScientifique.libelle ? this.searchDepartementScientifique.libelle : environment.emptyForExport ,
            'Code': this.searchDepartementScientifique.code ? this.searchDepartementScientifique.code : environment.emptyForExport ,
            'Archive': this.searchDepartementScientifique.archive ? (this.searchDepartementScientifique.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDepartementScientifique.dateArchivageMin ? this.datePipe.transform(this.searchDepartementScientifique.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDepartementScientifique.dateArchivageMax ? this.datePipe.transform(this.searchDepartementScientifique.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDepartementScientifique.dateCreationMin ? this.datePipe.transform(this.searchDepartementScientifique.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDepartementScientifique.dateCreationMax ? this.datePipe.transform(this.searchDepartementScientifique.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDepartementScientifique.admin ? (this.searchDepartementScientifique.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDepartementScientifique.visible ? (this.searchDepartementScientifique.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDepartementScientifique.username ? this.searchDepartementScientifique.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get departementScientifiques(): Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiques;
       }
    set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

    get departementScientifiqueSelections(): Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiqueSelections;
       }
    set departementScientifiqueSelections(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiqueSelections = value;
       }
   
     


    get selectedDepartementScientifique():DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }
    
    get createDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.createDepartementScientifiqueDialog;
       }
    set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog= value;
       }
    
    get editDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.editDepartementScientifiqueDialog;
       }
    set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog= value;
       }
    get viewDepartementScientifiqueDialog():boolean {
           return this.departementScientifiqueService.viewDepartementScientifiqueDialog;
       }
    set viewDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.viewDepartementScientifiqueDialog = value;
       }
       
     get searchDepartementScientifique(): DepartementScientifiqueVo {
        return this.departementScientifiqueService.searchDepartementScientifique;
       }
    set searchDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.searchDepartementScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

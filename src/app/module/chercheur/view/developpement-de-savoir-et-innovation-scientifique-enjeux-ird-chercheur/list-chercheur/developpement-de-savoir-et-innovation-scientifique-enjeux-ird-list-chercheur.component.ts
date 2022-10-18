import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-enjeux-ird-list-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-enjeux-ird-list-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds => this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd).subscribe(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds=>{
            
            this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd:DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.delete(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.indexOf(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique enjeux ird Supprimé',
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

public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {

     this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(res: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
       }
    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd():DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.createDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(): DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
        return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.searchDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

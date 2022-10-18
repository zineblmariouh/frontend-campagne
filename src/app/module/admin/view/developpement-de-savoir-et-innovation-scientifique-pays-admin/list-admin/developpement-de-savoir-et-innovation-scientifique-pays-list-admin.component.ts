import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-pays-list-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-pays-list-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-pays-list-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiquePaysListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiquePays';
    payss :Array<PaysVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiquePaysService: DeveloppementDeSavoirEtInnovationScientifiquePaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiquePayss();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiquePayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiquePaysService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiquePayss => this.developpementDeSavoirEtInnovationScientifiquePayss = developpementDeSavoirEtInnovationScientifiquePayss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiquePaysService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiquePays).subscribe(developpementDeSavoirEtInnovationScientifiquePayss=>{
            
            this.developpementDeSavoirEtInnovationScientifiquePayss = developpementDeSavoirEtInnovationScientifiquePayss;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiquePays(developpementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiquePaysService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiquePays).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiquePays(developpementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiquePaysService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiquePays).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiquePays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiquePays(developpementDeSavoirEtInnovationScientifiquePays:DeveloppementDeSavoirEtInnovationScientifiquePaysVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiquePaysService.delete(developpementDeSavoirEtInnovationScientifiquePays).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiquePayss.indexOf(developpementDeSavoirEtInnovationScientifiquePays);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiquePayss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique pays Supprimé',
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

public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiquePays', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiquePays(developpementDeSavoirEtInnovationScientifiquePays: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {

     this.developpementDeSavoirEtInnovationScientifiquePaysService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiquePays).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiquePays(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiquePays(res: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiquePayss.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchDeveloppementDeSavoirEtInnovationScientifiquePays.paysVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiquePays.paysVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiquePays.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiquePays.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiquePayss(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss;
       }
    set developpementDeSavoirEtInnovationScientifiquePayss(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss = value;
       }

    get developpementDeSavoirEtInnovationScientifiquePaysSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePaysSelections;
       }
    set developpementDeSavoirEtInnovationScientifiquePaysSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePaysSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiquePays():DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.createDeveloppementDeSavoirEtInnovationScientifiquePaysDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.viewDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiquePays(): DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
        return this.developpementDeSavoirEtInnovationScientifiquePaysService.searchDeveloppementDeSavoirEtInnovationScientifiquePays;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.searchDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

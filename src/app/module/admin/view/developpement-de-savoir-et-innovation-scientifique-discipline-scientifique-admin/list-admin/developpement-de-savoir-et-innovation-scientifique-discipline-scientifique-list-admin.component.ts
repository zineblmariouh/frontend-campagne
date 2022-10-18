import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-list-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-list-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-list-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques => this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique).subscribe(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques=>{
            
            this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.delete(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.indexOf(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique discipline scientifique Supprimé',
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

public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {

     this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(res: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.communauteSavoirVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
       }
    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique():DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
        return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

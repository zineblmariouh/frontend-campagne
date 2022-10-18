import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ModeDiffusionService } from '../../../../../controller/service/ModeDiffusion.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-mode-diffusion-list-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-mode-diffusion-list-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-mode-diffusion-list-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion';
    modeDiffusions :Array<ModeDiffusionVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private modeDiffusionService: ModeDiffusionService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions();
      this.initExport();
      this.initCol();
      this.loadModeDiffusion();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiqueModeDiffusions => this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = developpementDeSavoirEtInnovationScientifiqueModeDiffusions,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion).subscribe(developpementDeSavoirEtInnovationScientifiqueModeDiffusions=>{
            
            this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'modeDiffusion?.libelle', header: 'Mode diffusion'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(developpementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueModeDiffusion).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(developpementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueModeDiffusion).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(developpementDeSavoirEtInnovationScientifiqueModeDiffusion:DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique mode diffusion) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.delete(developpementDeSavoirEtInnovationScientifiqueModeDiffusion).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions.indexOf(developpementDeSavoirEtInnovationScientifiqueModeDiffusion);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique mode diffusion Supprimé',
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

public async loadModeDiffusion(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'list');
    isPermistted ? this.modeDiffusionService.findAll().subscribe(modeDiffusions => this.modeDiffusions = modeDiffusions,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(developpementDeSavoirEtInnovationScientifiqueModeDiffusion: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {

     this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueModeDiffusion).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(res: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions.map(e => {
    return {
            'Mode diffusion': e.modeDiffusionVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Mode diffusion': this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.modeDiffusionVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.modeDiffusionVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiqueModeDiffusions(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
       }
    set developpementDeSavoirEtInnovationScientifiqueModeDiffusions(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusionSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion():DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.createDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(): DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
        return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.searchDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

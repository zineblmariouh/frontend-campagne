import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
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
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-communaute-savoir-list-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-communaute-savoir-list-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-communaute-savoir-list-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs => this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir).subscribe(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs=>{
            
            this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs;
           // this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir:DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique communaute savoir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.delete(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.indexOf(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique communaute savoir Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {

     this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(res: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.communauteSavoirVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs;
       }
    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirs = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir():DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(value: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.createDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.editDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.viewDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(): DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo {
        return this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir(value: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo) {
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService.searchDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

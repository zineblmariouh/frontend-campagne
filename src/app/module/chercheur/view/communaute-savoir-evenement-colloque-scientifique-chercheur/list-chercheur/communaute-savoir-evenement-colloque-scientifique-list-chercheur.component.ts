import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EvenementColloqueScienntifiqueService } from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-evenement-colloque-scientifique-list-chercheur',
  templateUrl: './communaute-savoir-evenement-colloque-scientifique-list-chercheur.component.html',
  styleUrls: ['./communaute-savoir-evenement-colloque-scientifique-list-chercheur.component.css']
})
export class CommunauteSavoirEvenementColloqueScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirEvenementColloqueScientifique';
    evenementColloqueScienntifiques :Array<EvenementColloqueScienntifiqueVo>;
    communauteSavoirs :Array<CommunauteSavoirVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirEvenementColloqueScientifiqueService: CommunauteSavoirEvenementColloqueScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
        , private communauteSavoirService: CommunauteSavoirService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirEvenementColloqueScientifiques();
      this.initExport();
      this.initCol();
      this.loadEvenementColloqueScienntifique();
      this.loadCommunauteSavoir();
    }
    
    // methods
      public async loadCommunauteSavoirEvenementColloqueScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'list');
        isPermistted ? this.communauteSavoirEvenementColloqueScientifiqueService.findAll().subscribe(communauteSavoirEvenementColloqueScientifiques => this.communauteSavoirEvenementColloqueScientifiques = communauteSavoirEvenementColloqueScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirEvenementColloqueScientifiqueService.findByCriteria(this.searchCommunauteSavoirEvenementColloqueScientifique).subscribe(communauteSavoirEvenementColloqueScientifiques=>{
            
            this.communauteSavoirEvenementColloqueScientifiques = communauteSavoirEvenementColloqueScientifiques;
           // this.searchCommunauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'evenementColloqueScienntifique?.id', header: 'Evenement colloque scienntifique'},
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
        ];
    }
    
    public async editCommunauteSavoirEvenementColloqueScientifique(communauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'edit');
         if(isPermistted){
          this.communauteSavoirEvenementColloqueScientifiqueService.findByIdWithAssociatedList(communauteSavoirEvenementColloqueScientifique).subscribe(res => {
           this.selectedCommunauteSavoirEvenementColloqueScientifique = res;
            this.editCommunauteSavoirEvenementColloqueScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirEvenementColloqueScientifique(communauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'view');
        if(isPermistted){
           this.communauteSavoirEvenementColloqueScientifiqueService.findByIdWithAssociatedList(communauteSavoirEvenementColloqueScientifique).subscribe(res => {
           this.selectedCommunauteSavoirEvenementColloqueScientifique = res;
            this.viewCommunauteSavoirEvenementColloqueScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirEvenementColloqueScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();
            this.createCommunauteSavoirEvenementColloqueScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirEvenementColloqueScientifique(communauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir evenement colloque scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirEvenementColloqueScientifiqueService.delete(communauteSavoirEvenementColloqueScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirEvenementColloqueScientifiques.indexOf(communauteSavoirEvenementColloqueScientifique);
                          position > -1 ? this.communauteSavoirEvenementColloqueScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir evenement colloque scientifique Supprimé',
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

public async loadEvenementColloqueScienntifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'list');
    isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEvenementColloqueScientifique', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirEvenementColloqueScientifique(communauteSavoirEvenementColloqueScientifique: CommunauteSavoirEvenementColloqueScientifiqueVo) {

     this.communauteSavoirEvenementColloqueScientifiqueService.findByIdWithAssociatedList(communauteSavoirEvenementColloqueScientifique).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirEvenementColloqueScientifique(res);
	       this.selectedCommunauteSavoirEvenementColloqueScientifique = res;
	       this.selectedCommunauteSavoirEvenementColloqueScientifique.id = null;
            this.createCommunauteSavoirEvenementColloqueScientifiqueDialog = true;

});

	}

	initDuplicateCommunauteSavoirEvenementColloqueScientifique(res: CommunauteSavoirEvenementColloqueScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirEvenementColloqueScientifiques.map(e => {
    return {
            'Evenement colloque scienntifique': e.evenementColloqueScienntifiqueVo?.id ,
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Evenement colloque scienntifique': this.searchCommunauteSavoirEvenementColloqueScientifique.evenementColloqueScienntifiqueVo?.id ? this.searchCommunauteSavoirEvenementColloqueScientifique.evenementColloqueScienntifiqueVo?.id : environment.emptyForExport ,
        'Communaute savoir': this.searchCommunauteSavoirEvenementColloqueScientifique.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirEvenementColloqueScientifique.communauteSavoirVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirEvenementColloqueScientifiques(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
           return this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques;
       }
    set communauteSavoirEvenementColloqueScientifiques(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques = value;
       }

    get communauteSavoirEvenementColloqueScientifiqueSelections(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
           return this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiqueSelections;
       }
    set communauteSavoirEvenementColloqueScientifiqueSelections(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiqueSelections = value;
       }
   
     


    get selectedCommunauteSavoirEvenementColloqueScientifique():CommunauteSavoirEvenementColloqueScientifiqueVo {
           return this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique;
       }
    set selectedCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique = value;
       }
    
    get createCommunauteSavoirEvenementColloqueScientifiqueDialog():boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.createCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }
    set createCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.createCommunauteSavoirEvenementColloqueScientifiqueDialog= value;
       }
    
    get editCommunauteSavoirEvenementColloqueScientifiqueDialog():boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.editCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }
    set editCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.editCommunauteSavoirEvenementColloqueScientifiqueDialog= value;
       }
    get viewCommunauteSavoirEvenementColloqueScientifiqueDialog():boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.viewCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }
    set viewCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.viewCommunauteSavoirEvenementColloqueScientifiqueDialog = value;
       }
       
     get searchCommunauteSavoirEvenementColloqueScientifique(): CommunauteSavoirEvenementColloqueScientifiqueVo {
        return this.communauteSavoirEvenementColloqueScientifiqueService.searchCommunauteSavoirEvenementColloqueScientifique;
       }
    set searchCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.communauteSavoirEvenementColloqueScientifiqueService.searchCommunauteSavoirEvenementColloqueScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

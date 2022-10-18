import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirConseilEtComiteScientifiqueService} from '../../../../../controller/service/CommunauteSavoirConseilEtComiteScientifique.service';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirConseilEtComiteScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { ConseilEtComiteScientifiqueService } from '../../../../../controller/service/ConseilEtComiteScientifique.service';

import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-conseil-et-comite-scientifique-list-chercheur',
  templateUrl: './communaute-savoir-conseil-et-comite-scientifique-list-chercheur.component.html',
  styleUrls: ['./communaute-savoir-conseil-et-comite-scientifique-list-chercheur.component.css']
})
export class CommunauteSavoirConseilEtComiteScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirConseilEtComiteScientifique';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    conseilEtComiteScientifiques :Array<ConseilEtComiteScientifiqueVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirConseilEtComiteScientifiqueService: CommunauteSavoirConseilEtComiteScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirConseilEtComiteScientifiques();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadConseilEtComiteScientifique();
    }
    
    // methods
      public async loadCommunauteSavoirConseilEtComiteScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'list');
        isPermistted ? this.communauteSavoirConseilEtComiteScientifiqueService.findAll().subscribe(communauteSavoirConseilEtComiteScientifiques => this.communauteSavoirConseilEtComiteScientifiques = communauteSavoirConseilEtComiteScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirConseilEtComiteScientifiqueService.findByCriteria(this.searchCommunauteSavoirConseilEtComiteScientifique).subscribe(communauteSavoirConseilEtComiteScientifiques=>{
            
            this.communauteSavoirConseilEtComiteScientifiques = communauteSavoirConseilEtComiteScientifiques;
           // this.searchCommunauteSavoirConseilEtComiteScientifique = new CommunauteSavoirConseilEtComiteScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'conseilEtComiteScientifique?.id', header: 'Conseil et comite scientifique'},
        ];
    }
    
    public async editCommunauteSavoirConseilEtComiteScientifique(communauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'edit');
         if(isPermistted){
          this.communauteSavoirConseilEtComiteScientifiqueService.findByIdWithAssociatedList(communauteSavoirConseilEtComiteScientifique).subscribe(res => {
           this.selectedCommunauteSavoirConseilEtComiteScientifique = res;
            this.editCommunauteSavoirConseilEtComiteScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirConseilEtComiteScientifique(communauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'view');
        if(isPermistted){
           this.communauteSavoirConseilEtComiteScientifiqueService.findByIdWithAssociatedList(communauteSavoirConseilEtComiteScientifique).subscribe(res => {
           this.selectedCommunauteSavoirConseilEtComiteScientifique = res;
            this.viewCommunauteSavoirConseilEtComiteScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirConseilEtComiteScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirConseilEtComiteScientifique = new CommunauteSavoirConseilEtComiteScientifiqueVo();
            this.createCommunauteSavoirConseilEtComiteScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirConseilEtComiteScientifique(communauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir conseil et comite scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirConseilEtComiteScientifiqueService.delete(communauteSavoirConseilEtComiteScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirConseilEtComiteScientifiques.indexOf(communauteSavoirConseilEtComiteScientifique);
                          position > -1 ? this.communauteSavoirConseilEtComiteScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir conseil et comite scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadConseilEtComiteScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirConseilEtComiteScientifique', 'list');
    isPermistted ? this.conseilEtComiteScientifiqueService.findAll().subscribe(conseilEtComiteScientifiques => this.conseilEtComiteScientifiques = conseilEtComiteScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirConseilEtComiteScientifique(communauteSavoirConseilEtComiteScientifique: CommunauteSavoirConseilEtComiteScientifiqueVo) {

     this.communauteSavoirConseilEtComiteScientifiqueService.findByIdWithAssociatedList(communauteSavoirConseilEtComiteScientifique).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirConseilEtComiteScientifique(res);
	       this.selectedCommunauteSavoirConseilEtComiteScientifique = res;
	       this.selectedCommunauteSavoirConseilEtComiteScientifique.id = null;
            this.createCommunauteSavoirConseilEtComiteScientifiqueDialog = true;

});

	}

	initDuplicateCommunauteSavoirConseilEtComiteScientifique(res: CommunauteSavoirConseilEtComiteScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirConseilEtComiteScientifiques.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Conseil et comite scientifique': e.conseilEtComiteScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchCommunauteSavoirConseilEtComiteScientifique.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirConseilEtComiteScientifique.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Conseil et comite scientifique': this.searchCommunauteSavoirConseilEtComiteScientifique.conseilEtComiteScientifiqueVo?.id ? this.searchCommunauteSavoirConseilEtComiteScientifique.conseilEtComiteScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirConseilEtComiteScientifiques(): Array<CommunauteSavoirConseilEtComiteScientifiqueVo> {
           return this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiques;
       }
    set communauteSavoirConseilEtComiteScientifiques(value: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>) {
        this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiques = value;
       }

    get communauteSavoirConseilEtComiteScientifiqueSelections(): Array<CommunauteSavoirConseilEtComiteScientifiqueVo> {
           return this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiqueSelections;
       }
    set communauteSavoirConseilEtComiteScientifiqueSelections(value: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>) {
        this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiqueSelections = value;
       }
   
     


    get selectedCommunauteSavoirConseilEtComiteScientifique():CommunauteSavoirConseilEtComiteScientifiqueVo {
           return this.communauteSavoirConseilEtComiteScientifiqueService.selectedCommunauteSavoirConseilEtComiteScientifique;
       }
    set selectedCommunauteSavoirConseilEtComiteScientifique(value: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this.communauteSavoirConseilEtComiteScientifiqueService.selectedCommunauteSavoirConseilEtComiteScientifique = value;
       }
    
    get createCommunauteSavoirConseilEtComiteScientifiqueDialog():boolean {
           return this.communauteSavoirConseilEtComiteScientifiqueService.createCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }
    set createCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this.communauteSavoirConseilEtComiteScientifiqueService.createCommunauteSavoirConseilEtComiteScientifiqueDialog= value;
       }
    
    get editCommunauteSavoirConseilEtComiteScientifiqueDialog():boolean {
           return this.communauteSavoirConseilEtComiteScientifiqueService.editCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }
    set editCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this.communauteSavoirConseilEtComiteScientifiqueService.editCommunauteSavoirConseilEtComiteScientifiqueDialog= value;
       }
    get viewCommunauteSavoirConseilEtComiteScientifiqueDialog():boolean {
           return this.communauteSavoirConseilEtComiteScientifiqueService.viewCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }
    set viewCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this.communauteSavoirConseilEtComiteScientifiqueService.viewCommunauteSavoirConseilEtComiteScientifiqueDialog = value;
       }
       
     get searchCommunauteSavoirConseilEtComiteScientifique(): CommunauteSavoirConseilEtComiteScientifiqueVo {
        return this.communauteSavoirConseilEtComiteScientifiqueService.searchCommunauteSavoirConseilEtComiteScientifique;
       }
    set searchCommunauteSavoirConseilEtComiteScientifique(value: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this.communauteSavoirConseilEtComiteScientifiqueService.searchCommunauteSavoirConseilEtComiteScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

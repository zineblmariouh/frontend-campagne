import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirExpertiseScientifiqueService} from '../../../../../controller/service/CommunauteSavoirExpertiseScientifique.service';
import {CommunauteSavoirExpertiseScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirExpertiseScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { ExpertiseScientifiqueService } from '../../../../../controller/service/ExpertiseScientifique.service';

import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-expertise-scientifique-list-admin',
  templateUrl: './communaute-savoir-expertise-scientifique-list-admin.component.html',
  styleUrls: ['./communaute-savoir-expertise-scientifique-list-admin.component.css']
})
export class CommunauteSavoirExpertiseScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirExpertiseScientifique';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    expertiseScientifiques :Array<ExpertiseScientifiqueVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirExpertiseScientifiqueService: CommunauteSavoirExpertiseScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private expertiseScientifiqueService: ExpertiseScientifiqueService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirExpertiseScientifiques();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadExpertiseScientifique();
    }
    
    // methods
      public async loadCommunauteSavoirExpertiseScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'list');
        isPermistted ? this.communauteSavoirExpertiseScientifiqueService.findAll().subscribe(communauteSavoirExpertiseScientifiques => this.communauteSavoirExpertiseScientifiques = communauteSavoirExpertiseScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirExpertiseScientifiqueService.findByCriteria(this.searchCommunauteSavoirExpertiseScientifique).subscribe(communauteSavoirExpertiseScientifiques=>{
            
            this.communauteSavoirExpertiseScientifiques = communauteSavoirExpertiseScientifiques;
           // this.searchCommunauteSavoirExpertiseScientifique = new CommunauteSavoirExpertiseScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'expertiseScientifique?.id', header: 'Expertise scientifique'},
        ];
    }
    
    public async editCommunauteSavoirExpertiseScientifique(communauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'edit');
         if(isPermistted){
          this.communauteSavoirExpertiseScientifiqueService.findByIdWithAssociatedList(communauteSavoirExpertiseScientifique).subscribe(res => {
           this.selectedCommunauteSavoirExpertiseScientifique = res;
            this.editCommunauteSavoirExpertiseScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirExpertiseScientifique(communauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'view');
        if(isPermistted){
           this.communauteSavoirExpertiseScientifiqueService.findByIdWithAssociatedList(communauteSavoirExpertiseScientifique).subscribe(res => {
           this.selectedCommunauteSavoirExpertiseScientifique = res;
            this.viewCommunauteSavoirExpertiseScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirExpertiseScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirExpertiseScientifique = new CommunauteSavoirExpertiseScientifiqueVo();
            this.createCommunauteSavoirExpertiseScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirExpertiseScientifique(communauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir expertise scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirExpertiseScientifiqueService.delete(communauteSavoirExpertiseScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirExpertiseScientifiques.indexOf(communauteSavoirExpertiseScientifique);
                          position > -1 ? this.communauteSavoirExpertiseScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir expertise scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadExpertiseScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirExpertiseScientifique', 'list');
    isPermistted ? this.expertiseScientifiqueService.findAll().subscribe(expertiseScientifiques => this.expertiseScientifiques = expertiseScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirExpertiseScientifique(communauteSavoirExpertiseScientifique: CommunauteSavoirExpertiseScientifiqueVo) {

     this.communauteSavoirExpertiseScientifiqueService.findByIdWithAssociatedList(communauteSavoirExpertiseScientifique).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirExpertiseScientifique(res);
	       this.selectedCommunauteSavoirExpertiseScientifique = res;
	       this.selectedCommunauteSavoirExpertiseScientifique.id = null;
            this.createCommunauteSavoirExpertiseScientifiqueDialog = true;

});

	}

	initDuplicateCommunauteSavoirExpertiseScientifique(res: CommunauteSavoirExpertiseScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirExpertiseScientifiques.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Expertise scientifique': e.expertiseScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchCommunauteSavoirExpertiseScientifique.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirExpertiseScientifique.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Expertise scientifique': this.searchCommunauteSavoirExpertiseScientifique.expertiseScientifiqueVo?.id ? this.searchCommunauteSavoirExpertiseScientifique.expertiseScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirExpertiseScientifiques(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
           return this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques;
       }
    set communauteSavoirExpertiseScientifiques(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques = value;
       }

    get communauteSavoirExpertiseScientifiqueSelections(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
           return this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiqueSelections;
       }
    set communauteSavoirExpertiseScientifiqueSelections(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiqueSelections = value;
       }
   
     


    get selectedCommunauteSavoirExpertiseScientifique():CommunauteSavoirExpertiseScientifiqueVo {
           return this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique;
       }
    set selectedCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique = value;
       }
    
    get createCommunauteSavoirExpertiseScientifiqueDialog():boolean {
           return this.communauteSavoirExpertiseScientifiqueService.createCommunauteSavoirExpertiseScientifiqueDialog;
       }
    set createCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this.communauteSavoirExpertiseScientifiqueService.createCommunauteSavoirExpertiseScientifiqueDialog= value;
       }
    
    get editCommunauteSavoirExpertiseScientifiqueDialog():boolean {
           return this.communauteSavoirExpertiseScientifiqueService.editCommunauteSavoirExpertiseScientifiqueDialog;
       }
    set editCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this.communauteSavoirExpertiseScientifiqueService.editCommunauteSavoirExpertiseScientifiqueDialog= value;
       }
    get viewCommunauteSavoirExpertiseScientifiqueDialog():boolean {
           return this.communauteSavoirExpertiseScientifiqueService.viewCommunauteSavoirExpertiseScientifiqueDialog;
       }
    set viewCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this.communauteSavoirExpertiseScientifiqueService.viewCommunauteSavoirExpertiseScientifiqueDialog = value;
       }
       
     get searchCommunauteSavoirExpertiseScientifique(): CommunauteSavoirExpertiseScientifiqueVo {
        return this.communauteSavoirExpertiseScientifiqueService.searchCommunauteSavoirExpertiseScientifique;
       }
    set searchCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this.communauteSavoirExpertiseScientifiqueService.searchCommunauteSavoirExpertiseScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

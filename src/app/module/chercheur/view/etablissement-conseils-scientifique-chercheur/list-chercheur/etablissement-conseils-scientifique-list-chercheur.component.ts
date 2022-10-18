import {Component, OnInit} from '@angular/core';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ConseilsScientifiqueService } from '../../../../../controller/service/ConseilsScientifique.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-etablissement-conseils-scientifique-list-chercheur',
  templateUrl: './etablissement-conseils-scientifique-list-chercheur.component.html',
  styleUrls: ['./etablissement-conseils-scientifique-list-chercheur.component.css']
})
export class EtablissementConseilsScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtablissementConseilsScientifique';
    conseilsScientifiques :Array<ConseilsScientifiqueVo>;
    etablissements :Array<EtablissementVo>;


    constructor(private datePipe: DatePipe, private etablissementConseilsScientifiqueService: EtablissementConseilsScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private conseilsScientifiqueService: ConseilsScientifiqueService
        , private etablissementService: EtablissementService
) { }

    ngOnInit(): void {
      this.loadEtablissementConseilsScientifiques();
      this.initExport();
      this.initCol();
      this.loadConseilsScientifique();
      this.loadEtablissement();
    }
    
    // methods
      public async loadEtablissementConseilsScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'list');
        isPermistted ? this.etablissementConseilsScientifiqueService.findAll().subscribe(etablissementConseilsScientifiques => this.etablissementConseilsScientifiques = etablissementConseilsScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etablissementConseilsScientifiqueService.findByCriteria(this.searchEtablissementConseilsScientifique).subscribe(etablissementConseilsScientifiques=>{
            
            this.etablissementConseilsScientifiques = etablissementConseilsScientifiques;
           // this.searchEtablissementConseilsScientifique = new EtablissementConseilsScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'conseilsScientifique?.id', header: 'Conseils scientifique'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
        ];
    }
    
    public async editEtablissementConseilsScientifique(etablissementConseilsScientifique:EtablissementConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'edit');
         if(isPermistted){
          this.etablissementConseilsScientifiqueService.findByIdWithAssociatedList(etablissementConseilsScientifique).subscribe(res => {
           this.selectedEtablissementConseilsScientifique = res;
            this.editEtablissementConseilsScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtablissementConseilsScientifique(etablissementConseilsScientifique:EtablissementConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'view');
        if(isPermistted){
           this.etablissementConseilsScientifiqueService.findByIdWithAssociatedList(etablissementConseilsScientifique).subscribe(res => {
           this.selectedEtablissementConseilsScientifique = res;
            this.viewEtablissementConseilsScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtablissementConseilsScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtablissementConseilsScientifique = new EtablissementConseilsScientifiqueVo();
            this.createEtablissementConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtablissementConseilsScientifique(etablissementConseilsScientifique:EtablissementConseilsScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etablissement conseils scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etablissementConseilsScientifiqueService.delete(etablissementConseilsScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.etablissementConseilsScientifiques.indexOf(etablissementConseilsScientifique);
                          position > -1 ? this.etablissementConseilsScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etablissement conseils scientifique Supprimé',
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

public async loadConseilsScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'list');
    isPermistted ? this.conseilsScientifiqueService.findAll().subscribe(conseilsScientifiques => this.conseilsScientifiques = conseilsScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EtablissementConseilsScientifique', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEtablissementConseilsScientifique(etablissementConseilsScientifique: EtablissementConseilsScientifiqueVo) {

     this.etablissementConseilsScientifiqueService.findByIdWithAssociatedList(etablissementConseilsScientifique).subscribe(
	 res => {
	       this.initDuplicateEtablissementConseilsScientifique(res);
	       this.selectedEtablissementConseilsScientifique = res;
	       this.selectedEtablissementConseilsScientifique.id = null;
            this.createEtablissementConseilsScientifiqueDialog = true;

});

	}

	initDuplicateEtablissementConseilsScientifique(res: EtablissementConseilsScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etablissementConseilsScientifiques.map(e => {
    return {
            'Conseils scientifique': e.conseilsScientifiqueVo?.id ,
            'Etablissement': e.etablissementVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Conseils scientifique': this.searchEtablissementConseilsScientifique.conseilsScientifiqueVo?.id ? this.searchEtablissementConseilsScientifique.conseilsScientifiqueVo?.id : environment.emptyForExport ,
        'Etablissement': this.searchEtablissementConseilsScientifique.etablissementVo?.libelle ? this.searchEtablissementConseilsScientifique.etablissementVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etablissementConseilsScientifiques(): Array<EtablissementConseilsScientifiqueVo> {
           return this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques;
       }
    set etablissementConseilsScientifiques(value: Array<EtablissementConseilsScientifiqueVo>) {
        this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques = value;
       }

    get etablissementConseilsScientifiqueSelections(): Array<EtablissementConseilsScientifiqueVo> {
           return this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiqueSelections;
       }
    set etablissementConseilsScientifiqueSelections(value: Array<EtablissementConseilsScientifiqueVo>) {
        this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiqueSelections = value;
       }
   
     


    get selectedEtablissementConseilsScientifique():EtablissementConseilsScientifiqueVo {
           return this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique;
       }
    set selectedEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique = value;
       }
    
    get createEtablissementConseilsScientifiqueDialog():boolean {
           return this.etablissementConseilsScientifiqueService.createEtablissementConseilsScientifiqueDialog;
       }
    set createEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.createEtablissementConseilsScientifiqueDialog= value;
       }
    
    get editEtablissementConseilsScientifiqueDialog():boolean {
           return this.etablissementConseilsScientifiqueService.editEtablissementConseilsScientifiqueDialog;
       }
    set editEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.editEtablissementConseilsScientifiqueDialog= value;
       }
    get viewEtablissementConseilsScientifiqueDialog():boolean {
           return this.etablissementConseilsScientifiqueService.viewEtablissementConseilsScientifiqueDialog;
       }
    set viewEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.viewEtablissementConseilsScientifiqueDialog = value;
       }
       
     get searchEtablissementConseilsScientifique(): EtablissementConseilsScientifiqueVo {
        return this.etablissementConseilsScientifiqueService.searchEtablissementConseilsScientifique;
       }
    set searchEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this.etablissementConseilsScientifiqueService.searchEtablissementConseilsScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { ConseilsScientifiqueService } from '../../../../../controller/service/ConseilsScientifique.service';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enjeux-ird-conseils-scientifique-list-chercheur',
  templateUrl: './enjeux-ird-conseils-scientifique-list-chercheur.component.html',
  styleUrls: ['./enjeux-ird-conseils-scientifique-list-chercheur.component.css']
})
export class EnjeuxIrdConseilsScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnjeuxIrdConseilsScientifique';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    conseilsScientifiques :Array<ConseilsScientifiqueVo>;


    constructor(private datePipe: DatePipe, private enjeuxIrdConseilsScientifiqueService: EnjeuxIrdConseilsScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private conseilsScientifiqueService: ConseilsScientifiqueService
) { }

    ngOnInit(): void {
      this.loadEnjeuxIrdConseilsScientifiques();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadConseilsScientifique();
    }
    
    // methods
      public async loadEnjeuxIrdConseilsScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'list');
        isPermistted ? this.enjeuxIrdConseilsScientifiqueService.findAll().subscribe(enjeuxIrdConseilsScientifiques => this.enjeuxIrdConseilsScientifiques = enjeuxIrdConseilsScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enjeuxIrdConseilsScientifiqueService.findByCriteria(this.searchEnjeuxIrdConseilsScientifique).subscribe(enjeuxIrdConseilsScientifiques=>{
            
            this.enjeuxIrdConseilsScientifiques = enjeuxIrdConseilsScientifiques;
           // this.searchEnjeuxIrdConseilsScientifique = new EnjeuxIrdConseilsScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'conseilsScientifique?.id', header: 'Conseils scientifique'},
        ];
    }
    
    public async editEnjeuxIrdConseilsScientifique(enjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'edit');
         if(isPermistted){
          this.enjeuxIrdConseilsScientifiqueService.findByIdWithAssociatedList(enjeuxIrdConseilsScientifique).subscribe(res => {
           this.selectedEnjeuxIrdConseilsScientifique = res;
            this.editEnjeuxIrdConseilsScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnjeuxIrdConseilsScientifique(enjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'view');
        if(isPermistted){
           this.enjeuxIrdConseilsScientifiqueService.findByIdWithAssociatedList(enjeuxIrdConseilsScientifique).subscribe(res => {
           this.selectedEnjeuxIrdConseilsScientifique = res;
            this.viewEnjeuxIrdConseilsScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnjeuxIrdConseilsScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnjeuxIrdConseilsScientifique = new EnjeuxIrdConseilsScientifiqueVo();
            this.createEnjeuxIrdConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnjeuxIrdConseilsScientifique(enjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enjeux ird conseils scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enjeuxIrdConseilsScientifiqueService.delete(enjeuxIrdConseilsScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.enjeuxIrdConseilsScientifiques.indexOf(enjeuxIrdConseilsScientifique);
                          position > -1 ? this.enjeuxIrdConseilsScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enjeux ird conseils scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadConseilsScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdConseilsScientifique', 'list');
    isPermistted ? this.conseilsScientifiqueService.findAll().subscribe(conseilsScientifiques => this.conseilsScientifiques = conseilsScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnjeuxIrdConseilsScientifique(enjeuxIrdConseilsScientifique: EnjeuxIrdConseilsScientifiqueVo) {

     this.enjeuxIrdConseilsScientifiqueService.findByIdWithAssociatedList(enjeuxIrdConseilsScientifique).subscribe(
	 res => {
	       this.initDuplicateEnjeuxIrdConseilsScientifique(res);
	       this.selectedEnjeuxIrdConseilsScientifique = res;
	       this.selectedEnjeuxIrdConseilsScientifique.id = null;
            this.createEnjeuxIrdConseilsScientifiqueDialog = true;

});

	}

	initDuplicateEnjeuxIrdConseilsScientifique(res: EnjeuxIrdConseilsScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enjeuxIrdConseilsScientifiques.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Conseils scientifique': e.conseilsScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchEnjeuxIrdConseilsScientifique.enjeuxIrdVo?.libelle ? this.searchEnjeuxIrdConseilsScientifique.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Conseils scientifique': this.searchEnjeuxIrdConseilsScientifique.conseilsScientifiqueVo?.id ? this.searchEnjeuxIrdConseilsScientifique.conseilsScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enjeuxIrdConseilsScientifiques(): Array<EnjeuxIrdConseilsScientifiqueVo> {
           return this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques;
       }
    set enjeuxIrdConseilsScientifiques(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques = value;
       }

    get enjeuxIrdConseilsScientifiqueSelections(): Array<EnjeuxIrdConseilsScientifiqueVo> {
           return this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiqueSelections;
       }
    set enjeuxIrdConseilsScientifiqueSelections(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiqueSelections = value;
       }
   
     


    get selectedEnjeuxIrdConseilsScientifique():EnjeuxIrdConseilsScientifiqueVo {
           return this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique;
       }
    set selectedEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique = value;
       }
    
    get createEnjeuxIrdConseilsScientifiqueDialog():boolean {
           return this.enjeuxIrdConseilsScientifiqueService.createEnjeuxIrdConseilsScientifiqueDialog;
       }
    set createEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this.enjeuxIrdConseilsScientifiqueService.createEnjeuxIrdConseilsScientifiqueDialog= value;
       }
    
    get editEnjeuxIrdConseilsScientifiqueDialog():boolean {
           return this.enjeuxIrdConseilsScientifiqueService.editEnjeuxIrdConseilsScientifiqueDialog;
       }
    set editEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this.enjeuxIrdConseilsScientifiqueService.editEnjeuxIrdConseilsScientifiqueDialog= value;
       }
    get viewEnjeuxIrdConseilsScientifiqueDialog():boolean {
           return this.enjeuxIrdConseilsScientifiqueService.viewEnjeuxIrdConseilsScientifiqueDialog;
       }
    set viewEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this.enjeuxIrdConseilsScientifiqueService.viewEnjeuxIrdConseilsScientifiqueDialog = value;
       }
       
     get searchEnjeuxIrdConseilsScientifique(): EnjeuxIrdConseilsScientifiqueVo {
        return this.enjeuxIrdConseilsScientifiqueService.searchEnjeuxIrdConseilsScientifique;
       }
    set searchEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this.enjeuxIrdConseilsScientifiqueService.searchEnjeuxIrdConseilsScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

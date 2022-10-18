import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EvenementColloqueScienntifiqueService } from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-pays-list-chercheur',
  templateUrl: './evenement-colloque-scienntifique-pays-list-chercheur.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-pays-list-chercheur.component.css']
})
export class EvenementColloqueScienntifiquePaysListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EvenementColloqueScienntifiquePays';
    evenementColloqueScienntifiques :Array<EvenementColloqueScienntifiqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private evenementColloqueScienntifiquePaysService: EvenementColloqueScienntifiquePaysService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadEvenementColloqueScienntifiquePayss();
      this.initExport();
      this.initCol();
      this.loadEvenementColloqueScienntifique();
      this.loadPays();
    }
    
    // methods
      public async loadEvenementColloqueScienntifiquePayss(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'list');
        isPermistted ? this.evenementColloqueScienntifiquePaysService.findAll().subscribe(evenementColloqueScienntifiquePayss => this.evenementColloqueScienntifiquePayss = evenementColloqueScienntifiquePayss,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.evenementColloqueScienntifiquePaysService.findByCriteria(this.searchEvenementColloqueScienntifiquePays).subscribe(evenementColloqueScienntifiquePayss=>{
            
            this.evenementColloqueScienntifiquePayss = evenementColloqueScienntifiquePayss;
           // this.searchEvenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'evenementColloqueScienntifique?.id', header: 'Evenement colloque scienntifique'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editEvenementColloqueScienntifiquePays(evenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'edit');
         if(isPermistted){
          this.evenementColloqueScienntifiquePaysService.findByIdWithAssociatedList(evenementColloqueScienntifiquePays).subscribe(res => {
           this.selectedEvenementColloqueScienntifiquePays = res;
            this.editEvenementColloqueScienntifiquePaysDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEvenementColloqueScienntifiquePays(evenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo){
        const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'view');
        if(isPermistted){
           this.evenementColloqueScienntifiquePaysService.findByIdWithAssociatedList(evenementColloqueScienntifiquePays).subscribe(res => {
           this.selectedEvenementColloqueScienntifiquePays = res;
            this.viewEvenementColloqueScienntifiquePaysDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEvenementColloqueScienntifiquePays(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEvenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();
            this.createEvenementColloqueScienntifiquePaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEvenementColloqueScienntifiquePays(evenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo){
       const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Evenement colloque scienntifique pays) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.evenementColloqueScienntifiquePaysService.delete(evenementColloqueScienntifiquePays).subscribe(status=>{
                          if(status > 0){
                          const position = this.evenementColloqueScienntifiquePayss.indexOf(evenementColloqueScienntifiquePays);
                          position > -1 ? this.evenementColloqueScienntifiquePayss.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Evenement colloque scienntifique pays Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'list');
    isPermistted ? this.evenementColloqueScienntifiqueService.findAll().subscribe(evenementColloqueScienntifiques => this.evenementColloqueScienntifiques = evenementColloqueScienntifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifiquePays', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEvenementColloqueScienntifiquePays(evenementColloqueScienntifiquePays: EvenementColloqueScienntifiquePaysVo) {

     this.evenementColloqueScienntifiquePaysService.findByIdWithAssociatedList(evenementColloqueScienntifiquePays).subscribe(
	 res => {
	       this.initDuplicateEvenementColloqueScienntifiquePays(res);
	       this.selectedEvenementColloqueScienntifiquePays = res;
	       this.selectedEvenementColloqueScienntifiquePays.id = null;
            this.createEvenementColloqueScienntifiquePaysDialog = true;

});

	}

	initDuplicateEvenementColloqueScienntifiquePays(res: EvenementColloqueScienntifiquePaysVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.evenementColloqueScienntifiquePayss.map(e => {
    return {
            'Evenement colloque scienntifique': e.evenementColloqueScienntifiqueVo?.id ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Evenement colloque scienntifique': this.searchEvenementColloqueScienntifiquePays.evenementColloqueScienntifiqueVo?.id ? this.searchEvenementColloqueScienntifiquePays.evenementColloqueScienntifiqueVo?.id : environment.emptyForExport ,
        'Pays': this.searchEvenementColloqueScienntifiquePays.paysVo?.libelle ? this.searchEvenementColloqueScienntifiquePays.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get evenementColloqueScienntifiquePayss(): Array<EvenementColloqueScienntifiquePaysVo> {
           return this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss;
       }
    set evenementColloqueScienntifiquePayss(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss = value;
       }

    get evenementColloqueScienntifiquePaysSelections(): Array<EvenementColloqueScienntifiquePaysVo> {
           return this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePaysSelections;
       }
    set evenementColloqueScienntifiquePaysSelections(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePaysSelections = value;
       }
   
     


    get selectedEvenementColloqueScienntifiquePays():EvenementColloqueScienntifiquePaysVo {
           return this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays;
       }
    set selectedEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays = value;
       }
    
    get createEvenementColloqueScienntifiquePaysDialog():boolean {
           return this.evenementColloqueScienntifiquePaysService.createEvenementColloqueScienntifiquePaysDialog;
       }
    set createEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.createEvenementColloqueScienntifiquePaysDialog= value;
       }
    
    get editEvenementColloqueScienntifiquePaysDialog():boolean {
           return this.evenementColloqueScienntifiquePaysService.editEvenementColloqueScienntifiquePaysDialog;
       }
    set editEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.editEvenementColloqueScienntifiquePaysDialog= value;
       }
    get viewEvenementColloqueScienntifiquePaysDialog():boolean {
           return this.evenementColloqueScienntifiquePaysService.viewEvenementColloqueScienntifiquePaysDialog;
       }
    set viewEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.viewEvenementColloqueScienntifiquePaysDialog = value;
       }
       
     get searchEvenementColloqueScienntifiquePays(): EvenementColloqueScienntifiquePaysVo {
        return this.evenementColloqueScienntifiquePaysService.searchEvenementColloqueScienntifiquePays;
       }
    set searchEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this.evenementColloqueScienntifiquePaysService.searchEvenementColloqueScienntifiquePays = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { LangueService } from '../../../../../controller/service/Langue.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-langue-list-chercheur',
  templateUrl: './outil-pedagogique-langue-list-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-langue-list-chercheur.component.css']
})
export class OutilPedagogiqueLangueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiqueLangue';
    langues :Array<LangueVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueLangueService: OutilPedagogiqueLangueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private langueService: LangueService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiqueLangues();
      this.initExport();
      this.initCol();
      this.loadLangue();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiqueLangues(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'list');
        isPermistted ? this.outilPedagogiqueLangueService.findAll().subscribe(outilPedagogiqueLangues => this.outilPedagogiqueLangues = outilPedagogiqueLangues,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueLangueService.findByCriteria(this.searchOutilPedagogiqueLangue).subscribe(outilPedagogiqueLangues=>{
            
            this.outilPedagogiqueLangues = outilPedagogiqueLangues;
           // this.searchOutilPedagogiqueLangue = new OutilPedagogiqueLangueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'langue?.libelle', header: 'Langue'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiqueLangue(outilPedagogiqueLangue:OutilPedagogiqueLangueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'edit');
         if(isPermistted){
          this.outilPedagogiqueLangueService.findByIdWithAssociatedList(outilPedagogiqueLangue).subscribe(res => {
           this.selectedOutilPedagogiqueLangue = res;
            this.editOutilPedagogiqueLangueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiqueLangue(outilPedagogiqueLangue:OutilPedagogiqueLangueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'view');
        if(isPermistted){
           this.outilPedagogiqueLangueService.findByIdWithAssociatedList(outilPedagogiqueLangue).subscribe(res => {
           this.selectedOutilPedagogiqueLangue = res;
            this.viewOutilPedagogiqueLangueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiqueLangue(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiqueLangue = new OutilPedagogiqueLangueVo();
            this.createOutilPedagogiqueLangueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiqueLangue(outilPedagogiqueLangue:OutilPedagogiqueLangueVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique langue) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueLangueService.delete(outilPedagogiqueLangue).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiqueLangues.indexOf(outilPedagogiqueLangue);
                          position > -1 ? this.outilPedagogiqueLangues.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique langue Supprimé',
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

public async loadLangue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'list');
    isPermistted ? this.langueService.findAll().subscribe(langues => this.langues = langues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueLangue', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiqueLangue(outilPedagogiqueLangue: OutilPedagogiqueLangueVo) {

     this.outilPedagogiqueLangueService.findByIdWithAssociatedList(outilPedagogiqueLangue).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiqueLangue(res);
	       this.selectedOutilPedagogiqueLangue = res;
	       this.selectedOutilPedagogiqueLangue.id = null;
            this.createOutilPedagogiqueLangueDialog = true;

});

	}

	initDuplicateOutilPedagogiqueLangue(res: OutilPedagogiqueLangueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiqueLangues.map(e => {
    return {
            'Langue': e.langueVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Langue': this.searchOutilPedagogiqueLangue.langueVo?.libelle ? this.searchOutilPedagogiqueLangue.langueVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiqueLangue.outilPedagogiqueVo?.id ? this.searchOutilPedagogiqueLangue.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiqueLangues(): Array<OutilPedagogiqueLangueVo> {
           return this.outilPedagogiqueLangueService.outilPedagogiqueLangues;
       }
    set outilPedagogiqueLangues(value: Array<OutilPedagogiqueLangueVo>) {
        this.outilPedagogiqueLangueService.outilPedagogiqueLangues = value;
       }

    get outilPedagogiqueLangueSelections(): Array<OutilPedagogiqueLangueVo> {
           return this.outilPedagogiqueLangueService.outilPedagogiqueLangueSelections;
       }
    set outilPedagogiqueLangueSelections(value: Array<OutilPedagogiqueLangueVo>) {
        this.outilPedagogiqueLangueService.outilPedagogiqueLangueSelections = value;
       }
   
     


    get selectedOutilPedagogiqueLangue():OutilPedagogiqueLangueVo {
           return this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue;
       }
    set selectedOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue = value;
       }
    
    get createOutilPedagogiqueLangueDialog():boolean {
           return this.outilPedagogiqueLangueService.createOutilPedagogiqueLangueDialog;
       }
    set createOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.createOutilPedagogiqueLangueDialog= value;
       }
    
    get editOutilPedagogiqueLangueDialog():boolean {
           return this.outilPedagogiqueLangueService.editOutilPedagogiqueLangueDialog;
       }
    set editOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.editOutilPedagogiqueLangueDialog= value;
       }
    get viewOutilPedagogiqueLangueDialog():boolean {
           return this.outilPedagogiqueLangueService.viewOutilPedagogiqueLangueDialog;
       }
    set viewOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.viewOutilPedagogiqueLangueDialog = value;
       }
       
     get searchOutilPedagogiqueLangue(): OutilPedagogiqueLangueVo {
        return this.outilPedagogiqueLangueService.searchOutilPedagogiqueLangue;
       }
    set searchOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this.outilPedagogiqueLangueService.searchOutilPedagogiqueLangue = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

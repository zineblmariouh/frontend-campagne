import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PubliqueCibleService } from '../../../../../controller/service/PubliqueCible.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-publique-cible-list-admin',
  templateUrl: './outil-pedagogique-publique-cible-list-admin.component.html',
  styleUrls: ['./outil-pedagogique-publique-cible-list-admin.component.css']
})
export class OutilPedagogiquePubliqueCibleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiquePubliqueCible';
    publiqueCibles :Array<PubliqueCibleVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiquePubliqueCibleService: OutilPedagogiquePubliqueCibleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private publiqueCibleService: PubliqueCibleService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiquePubliqueCibles();
      this.initExport();
      this.initCol();
      this.loadPubliqueCible();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiquePubliqueCibles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'list');
        isPermistted ? this.outilPedagogiquePubliqueCibleService.findAll().subscribe(outilPedagogiquePubliqueCibles => this.outilPedagogiquePubliqueCibles = outilPedagogiquePubliqueCibles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiquePubliqueCibleService.findByCriteria(this.searchOutilPedagogiquePubliqueCible).subscribe(outilPedagogiquePubliqueCibles=>{
            
            this.outilPedagogiquePubliqueCibles = outilPedagogiquePubliqueCibles;
           // this.searchOutilPedagogiquePubliqueCible = new OutilPedagogiquePubliqueCibleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'publiqueCible?.libelle', header: 'Publique cible'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiquePubliqueCible(outilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'edit');
         if(isPermistted){
          this.outilPedagogiquePubliqueCibleService.findByIdWithAssociatedList(outilPedagogiquePubliqueCible).subscribe(res => {
           this.selectedOutilPedagogiquePubliqueCible = res;
            this.editOutilPedagogiquePubliqueCibleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiquePubliqueCible(outilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'view');
        if(isPermistted){
           this.outilPedagogiquePubliqueCibleService.findByIdWithAssociatedList(outilPedagogiquePubliqueCible).subscribe(res => {
           this.selectedOutilPedagogiquePubliqueCible = res;
            this.viewOutilPedagogiquePubliqueCibleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiquePubliqueCible(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiquePubliqueCible = new OutilPedagogiquePubliqueCibleVo();
            this.createOutilPedagogiquePubliqueCibleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiquePubliqueCible(outilPedagogiquePubliqueCible:OutilPedagogiquePubliqueCibleVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique publique cible) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiquePubliqueCibleService.delete(outilPedagogiquePubliqueCible).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiquePubliqueCibles.indexOf(outilPedagogiquePubliqueCible);
                          position > -1 ? this.outilPedagogiquePubliqueCibles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique publique cible Supprimé',
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

public async loadPubliqueCible(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'list');
    isPermistted ? this.publiqueCibleService.findAll().subscribe(publiqueCibles => this.publiqueCibles = publiqueCibles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiquePubliqueCible', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiquePubliqueCible(outilPedagogiquePubliqueCible: OutilPedagogiquePubliqueCibleVo) {

     this.outilPedagogiquePubliqueCibleService.findByIdWithAssociatedList(outilPedagogiquePubliqueCible).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiquePubliqueCible(res);
	       this.selectedOutilPedagogiquePubliqueCible = res;
	       this.selectedOutilPedagogiquePubliqueCible.id = null;
            this.createOutilPedagogiquePubliqueCibleDialog = true;

});

	}

	initDuplicateOutilPedagogiquePubliqueCible(res: OutilPedagogiquePubliqueCibleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiquePubliqueCibles.map(e => {
    return {
            'Publique cible': e.publiqueCibleVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Publique cible': this.searchOutilPedagogiquePubliqueCible.publiqueCibleVo?.libelle ? this.searchOutilPedagogiquePubliqueCible.publiqueCibleVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiquePubliqueCible.outilPedagogiqueVo?.id ? this.searchOutilPedagogiquePubliqueCible.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiquePubliqueCibles(): Array<OutilPedagogiquePubliqueCibleVo> {
           return this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles;
       }
    set outilPedagogiquePubliqueCibles(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles = value;
       }

    get outilPedagogiquePubliqueCibleSelections(): Array<OutilPedagogiquePubliqueCibleVo> {
           return this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibleSelections;
       }
    set outilPedagogiquePubliqueCibleSelections(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibleSelections = value;
       }
   
     


    get selectedOutilPedagogiquePubliqueCible():OutilPedagogiquePubliqueCibleVo {
           return this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible;
       }
    set selectedOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible = value;
       }
    
    get createOutilPedagogiquePubliqueCibleDialog():boolean {
           return this.outilPedagogiquePubliqueCibleService.createOutilPedagogiquePubliqueCibleDialog;
       }
    set createOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.createOutilPedagogiquePubliqueCibleDialog= value;
       }
    
    get editOutilPedagogiquePubliqueCibleDialog():boolean {
           return this.outilPedagogiquePubliqueCibleService.editOutilPedagogiquePubliqueCibleDialog;
       }
    set editOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.editOutilPedagogiquePubliqueCibleDialog= value;
       }
    get viewOutilPedagogiquePubliqueCibleDialog():boolean {
           return this.outilPedagogiquePubliqueCibleService.viewOutilPedagogiquePubliqueCibleDialog;
       }
    set viewOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.viewOutilPedagogiquePubliqueCibleDialog = value;
       }
       
     get searchOutilPedagogiquePubliqueCible(): OutilPedagogiquePubliqueCibleVo {
        return this.outilPedagogiquePubliqueCibleService.searchOutilPedagogiquePubliqueCible;
       }
    set searchOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this.outilPedagogiquePubliqueCibleService.searchOutilPedagogiquePubliqueCible = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

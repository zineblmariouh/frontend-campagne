import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeInstrumentIrdService } from '../../../../../controller/service/TypeInstrumentIrd.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-type-instrument-ird-list-chercheur',
  templateUrl: './outil-pedagogique-type-instrument-ird-list-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-type-instrument-ird-list-chercheur.component.css']
})
export class OutilPedagogiqueTypeInstrumentIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiqueTypeInstrumentIrd';
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueTypeInstrumentIrdService: OutilPedagogiqueTypeInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeInstrumentIrdService: TypeInstrumentIrdService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiqueTypeInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadTypeInstrumentIrd();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadOutilPedagogiqueTypeInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'list');
        isPermistted ? this.outilPedagogiqueTypeInstrumentIrdService.findAll().subscribe(outilPedagogiqueTypeInstrumentIrds => this.outilPedagogiqueTypeInstrumentIrds = outilPedagogiqueTypeInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueTypeInstrumentIrdService.findByCriteria(this.searchOutilPedagogiqueTypeInstrumentIrd).subscribe(outilPedagogiqueTypeInstrumentIrds=>{
            
            this.outilPedagogiqueTypeInstrumentIrds = outilPedagogiqueTypeInstrumentIrds;
           // this.searchOutilPedagogiqueTypeInstrumentIrd = new OutilPedagogiqueTypeInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editOutilPedagogiqueTypeInstrumentIrd(outilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'edit');
         if(isPermistted){
          this.outilPedagogiqueTypeInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueTypeInstrumentIrd).subscribe(res => {
           this.selectedOutilPedagogiqueTypeInstrumentIrd = res;
            this.editOutilPedagogiqueTypeInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiqueTypeInstrumentIrd(outilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'view');
        if(isPermistted){
           this.outilPedagogiqueTypeInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueTypeInstrumentIrd).subscribe(res => {
           this.selectedOutilPedagogiqueTypeInstrumentIrd = res;
            this.viewOutilPedagogiqueTypeInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiqueTypeInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiqueTypeInstrumentIrd = new OutilPedagogiqueTypeInstrumentIrdVo();
            this.createOutilPedagogiqueTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiqueTypeInstrumentIrd(outilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique type instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueTypeInstrumentIrdService.delete(outilPedagogiqueTypeInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiqueTypeInstrumentIrds.indexOf(outilPedagogiqueTypeInstrumentIrd);
                          position > -1 ? this.outilPedagogiqueTypeInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique type instrument ird Supprimé',
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

public async loadTypeInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueTypeInstrumentIrd', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiqueTypeInstrumentIrd(outilPedagogiqueTypeInstrumentIrd: OutilPedagogiqueTypeInstrumentIrdVo) {

     this.outilPedagogiqueTypeInstrumentIrdService.findByIdWithAssociatedList(outilPedagogiqueTypeInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiqueTypeInstrumentIrd(res);
	       this.selectedOutilPedagogiqueTypeInstrumentIrd = res;
	       this.selectedOutilPedagogiqueTypeInstrumentIrd.id = null;
            this.createOutilPedagogiqueTypeInstrumentIrdDialog = true;

});

	}

	initDuplicateOutilPedagogiqueTypeInstrumentIrd(res: OutilPedagogiqueTypeInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiqueTypeInstrumentIrds.map(e => {
    return {
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type instrument ird': this.searchOutilPedagogiqueTypeInstrumentIrd.typeInstrumentIrdVo?.libelle ? this.searchOutilPedagogiqueTypeInstrumentIrd.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchOutilPedagogiqueTypeInstrumentIrd.outilPedagogiqueVo?.id ? this.searchOutilPedagogiqueTypeInstrumentIrd.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiqueTypeInstrumentIrds(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
           return this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds;
       }
    set outilPedagogiqueTypeInstrumentIrds(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds = value;
       }

    get outilPedagogiqueTypeInstrumentIrdSelections(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
           return this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrdSelections;
       }
    set outilPedagogiqueTypeInstrumentIrdSelections(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrdSelections = value;
       }
   
     


    get selectedOutilPedagogiqueTypeInstrumentIrd():OutilPedagogiqueTypeInstrumentIrdVo {
           return this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd;
       }
    set selectedOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd = value;
       }
    
    get createOutilPedagogiqueTypeInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueTypeInstrumentIrdService.createOutilPedagogiqueTypeInstrumentIrdDialog;
       }
    set createOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueTypeInstrumentIrdService.createOutilPedagogiqueTypeInstrumentIrdDialog= value;
       }
    
    get editOutilPedagogiqueTypeInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueTypeInstrumentIrdService.editOutilPedagogiqueTypeInstrumentIrdDialog;
       }
    set editOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueTypeInstrumentIrdService.editOutilPedagogiqueTypeInstrumentIrdDialog= value;
       }
    get viewOutilPedagogiqueTypeInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueTypeInstrumentIrdService.viewOutilPedagogiqueTypeInstrumentIrdDialog;
       }
    set viewOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueTypeInstrumentIrdService.viewOutilPedagogiqueTypeInstrumentIrdDialog = value;
       }
       
     get searchOutilPedagogiqueTypeInstrumentIrd(): OutilPedagogiqueTypeInstrumentIrdVo {
        return this.outilPedagogiqueTypeInstrumentIrdService.searchOutilPedagogiqueTypeInstrumentIrd;
       }
    set searchOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this.outilPedagogiqueTypeInstrumentIrdService.searchOutilPedagogiqueTypeInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

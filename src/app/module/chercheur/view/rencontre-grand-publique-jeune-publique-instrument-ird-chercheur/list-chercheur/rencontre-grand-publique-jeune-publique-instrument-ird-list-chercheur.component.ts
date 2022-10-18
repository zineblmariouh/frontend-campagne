import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { InstrumentIrdService } from '../../../../../controller/service/InstrumentIrd.service';
import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-instrument-ird-list-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-instrument-ird-list-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-instrument-ird-list-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueInstrumentIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePubliqueInstrumentIrd';
    instrumentIrds :Array<InstrumentIrdVo>;
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private instrumentIrdService: InstrumentIrdService
        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliqueInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadInstrumentIrd();
      this.loadRencontreGrandPubliqueJeunePublique();
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliqueInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.findAll().subscribe(rencontreGrandPubliqueJeunePubliqueInstrumentIrds => this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = rencontreGrandPubliqueJeunePubliqueInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.findByCriteria(this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd).subscribe(rencontreGrandPubliqueJeunePubliqueInstrumentIrds=>{
            
            this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
           // this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'instrumentIrd?.libelle', header: 'Instrument ird'},
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePubliqueInstrumentIrd(rencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueInstrumentIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = res;
            this.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePubliqueInstrumentIrd(rencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueInstrumentIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = res;
            this.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePubliqueInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();
            this.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePubliqueInstrumentIrd(rencontreGrandPubliqueJeunePubliqueInstrumentIrd:RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.delete(rencontreGrandPubliqueJeunePubliqueInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds.indexOf(rencontreGrandPubliqueJeunePubliqueInstrumentIrd);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique instrument ird Supprimé',
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

public async loadInstrumentIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'list');
    isPermistted ? this.instrumentIrdService.findAll().subscribe(instrumentIrds => this.instrumentIrds = instrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRencontreGrandPubliqueJeunePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueInstrumentIrd', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePubliqueInstrumentIrd(rencontreGrandPubliqueJeunePubliqueInstrumentIrd: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {

     this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePubliqueInstrumentIrd(res);
	       this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = res;
	       this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd.id = null;
            this.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePubliqueInstrumentIrd(res: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds.map(e => {
    return {
            'Instrument ird': e.instrumentIrdVo?.libelle ,
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Instrument ird': this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd.instrumentIrdVo?.libelle ? this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd.instrumentIrdVo?.libelle : environment.emptyForExport ,
        'Rencontre grand publique jeune publique': this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliqueInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
       }
    set rencontreGrandPubliqueJeunePubliqueInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = value;
       }

    get rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections;
       }
    set rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrdSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd():RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }
    set createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }
    set editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
        return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }
    set searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.searchRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

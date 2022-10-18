import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeInstrumentIrdService } from '../../../../../controller/service/TypeInstrumentIrd.service';
import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-type-instrument-ird-list-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-type-instrument-ird-list-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-type-instrument-ird-list-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd';
    typeInstrumentIrds :Array<TypeInstrumentIrdVo>;
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeInstrumentIrdService: TypeInstrumentIrdService
        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds();
      this.initExport();
      this.initCol();
      this.loadTypeInstrumentIrd();
      this.loadRencontreGrandPubliqueJeunePublique();
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.findAll().subscribe(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds => this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.findByCriteria(this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd).subscribe(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds=>{
            
            this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
           // this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeInstrumentIrd?.libelle', header: 'Type instrument ird'},
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = res;
            this.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = res;
            this.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();
            this.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd:RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique type instrument ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.delete(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.indexOf(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique type instrument ird Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'list');
    isPermistted ? this.typeInstrumentIrdService.findAll().subscribe(typeInstrumentIrds => this.typeInstrumentIrds = typeInstrumentIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRencontreGrandPubliqueJeunePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {

     this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(res);
	       this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = res;
	       this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.id = null;
            this.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(res: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.map(e => {
    return {
            'Type instrument ird': e.typeInstrumentIrdVo?.libelle ,
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type instrument ird': this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.typeInstrumentIrdVo?.libelle ? this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.typeInstrumentIrdVo?.libelle : environment.emptyForExport ,
        'Rencontre grand publique jeune publique': this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
       }
    set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = value;
       }

    get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections;
       }
    set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd():RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }
    set createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.createRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }
    set editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
        return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }
    set searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.searchRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

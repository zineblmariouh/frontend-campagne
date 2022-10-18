import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-enjeux-ird-list-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-enjeux-ird-list-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-enjeux-ird-list-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePubliqueEnjeuxIrd';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliqueEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliqueEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.findAll().subscribe(rencontreGrandPubliqueJeunePubliqueEnjeuxIrds => this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = rencontreGrandPubliqueJeunePubliqueEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.findByCriteria(this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd).subscribe(rencontreGrandPubliqueJeunePubliqueEnjeuxIrds=>{
            
            this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
           // this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = res;
            this.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = res;
            this.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();
            this.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd:RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.delete(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds.indexOf(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique enjeux ird Supprimé',
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

public async loadRencontreGrandPubliqueJeunePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {

     this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(res);
	       this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = res;
	       this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.id = null;
            this.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(res: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
       }
    set rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = value;
       }

    get rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections;
       }
    set rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd():RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }
    set createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.createRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }
    set editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.viewRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(): RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
        return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }
    set searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.searchRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

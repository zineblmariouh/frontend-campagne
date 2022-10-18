import {Component, OnInit} from '@angular/core';
import {RencontreMediaEnjeuxIrdService} from '../../../../../controller/service/RencontreMediaEnjeuxIrd.service';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreMediaService } from '../../../../../controller/service/RencontreMedia.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-media-enjeux-ird-list-chercheur',
  templateUrl: './rencontre-media-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./rencontre-media-enjeux-ird-list-chercheur.component.css']
})
export class RencontreMediaEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreMediaEnjeuxIrd';
    rencontreMedias :Array<RencontreMediaVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private rencontreMediaEnjeuxIrdService: RencontreMediaEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreMediaService: RencontreMediaService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadRencontreMediaEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadRencontreMedia();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadRencontreMediaEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'list');
        isPermistted ? this.rencontreMediaEnjeuxIrdService.findAll().subscribe(rencontreMediaEnjeuxIrds => this.rencontreMediaEnjeuxIrds = rencontreMediaEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreMediaEnjeuxIrdService.findByCriteria(this.searchRencontreMediaEnjeuxIrd).subscribe(rencontreMediaEnjeuxIrds=>{
            
            this.rencontreMediaEnjeuxIrds = rencontreMediaEnjeuxIrds;
           // this.searchRencontreMediaEnjeuxIrd = new RencontreMediaEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreMedia?.id', header: 'Rencontre media'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editRencontreMediaEnjeuxIrd(rencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'edit');
         if(isPermistted){
          this.rencontreMediaEnjeuxIrdService.findByIdWithAssociatedList(rencontreMediaEnjeuxIrd).subscribe(res => {
           this.selectedRencontreMediaEnjeuxIrd = res;
            this.editRencontreMediaEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreMediaEnjeuxIrd(rencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'view');
        if(isPermistted){
           this.rencontreMediaEnjeuxIrdService.findByIdWithAssociatedList(rencontreMediaEnjeuxIrd).subscribe(res => {
           this.selectedRencontreMediaEnjeuxIrd = res;
            this.viewRencontreMediaEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreMediaEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreMediaEnjeuxIrd = new RencontreMediaEnjeuxIrdVo();
            this.createRencontreMediaEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreMediaEnjeuxIrd(rencontreMediaEnjeuxIrd:RencontreMediaEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre media enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreMediaEnjeuxIrdService.delete(rencontreMediaEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreMediaEnjeuxIrds.indexOf(rencontreMediaEnjeuxIrd);
                          position > -1 ? this.rencontreMediaEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre media enjeux ird Supprimé',
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

public async loadRencontreMedia(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'list');
    isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMediaEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreMediaEnjeuxIrd(rencontreMediaEnjeuxIrd: RencontreMediaEnjeuxIrdVo) {

     this.rencontreMediaEnjeuxIrdService.findByIdWithAssociatedList(rencontreMediaEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateRencontreMediaEnjeuxIrd(res);
	       this.selectedRencontreMediaEnjeuxIrd = res;
	       this.selectedRencontreMediaEnjeuxIrd.id = null;
            this.createRencontreMediaEnjeuxIrdDialog = true;

});

	}

	initDuplicateRencontreMediaEnjeuxIrd(res: RencontreMediaEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreMediaEnjeuxIrds.map(e => {
    return {
            'Rencontre media': e.rencontreMediaVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Rencontre media': this.searchRencontreMediaEnjeuxIrd.rencontreMediaVo?.id ? this.searchRencontreMediaEnjeuxIrd.rencontreMediaVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchRencontreMediaEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchRencontreMediaEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreMediaEnjeuxIrds(): Array<RencontreMediaEnjeuxIrdVo> {
           return this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds;
       }
    set rencontreMediaEnjeuxIrds(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrds = value;
       }

    get rencontreMediaEnjeuxIrdSelections(): Array<RencontreMediaEnjeuxIrdVo> {
           return this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrdSelections;
       }
    set rencontreMediaEnjeuxIrdSelections(value: Array<RencontreMediaEnjeuxIrdVo>) {
        this.rencontreMediaEnjeuxIrdService.rencontreMediaEnjeuxIrdSelections = value;
       }
   
     


    get selectedRencontreMediaEnjeuxIrd():RencontreMediaEnjeuxIrdVo {
           return this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd;
       }
    set selectedRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this.rencontreMediaEnjeuxIrdService.selectedRencontreMediaEnjeuxIrd = value;
       }
    
    get createRencontreMediaEnjeuxIrdDialog():boolean {
           return this.rencontreMediaEnjeuxIrdService.createRencontreMediaEnjeuxIrdDialog;
       }
    set createRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.createRencontreMediaEnjeuxIrdDialog= value;
       }
    
    get editRencontreMediaEnjeuxIrdDialog():boolean {
           return this.rencontreMediaEnjeuxIrdService.editRencontreMediaEnjeuxIrdDialog;
       }
    set editRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.editRencontreMediaEnjeuxIrdDialog= value;
       }
    get viewRencontreMediaEnjeuxIrdDialog():boolean {
           return this.rencontreMediaEnjeuxIrdService.viewRencontreMediaEnjeuxIrdDialog;
       }
    set viewRencontreMediaEnjeuxIrdDialog(value: boolean) {
        this.rencontreMediaEnjeuxIrdService.viewRencontreMediaEnjeuxIrdDialog = value;
       }
       
     get searchRencontreMediaEnjeuxIrd(): RencontreMediaEnjeuxIrdVo {
        return this.rencontreMediaEnjeuxIrdService.searchRencontreMediaEnjeuxIrd;
       }
    set searchRencontreMediaEnjeuxIrd(value: RencontreMediaEnjeuxIrdVo) {
        this.rencontreMediaEnjeuxIrdService.searchRencontreMediaEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

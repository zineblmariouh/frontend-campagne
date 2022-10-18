import {Component, OnInit} from '@angular/core';
import {RencontreMediaPeriodeService} from '../../../../../controller/service/RencontreMediaPeriode.service';
import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreMediaService } from '../../../../../controller/service/RencontreMedia.service';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-media-periode-list-admin',
  templateUrl: './rencontre-media-periode-list-admin.component.html',
  styleUrls: ['./rencontre-media-periode-list-admin.component.css']
})
export class RencontreMediaPeriodeListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreMediaPeriode';
    rencontreMedias :Array<RencontreMediaVo>;


    constructor(private datePipe: DatePipe, private rencontreMediaPeriodeService: RencontreMediaPeriodeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreMediaService: RencontreMediaService
) { }

    ngOnInit(): void {
      this.loadRencontreMediaPeriodes();
      this.initExport();
      this.initCol();
      this.loadRencontreMedia();
    }
    
    // methods
      public async loadRencontreMediaPeriodes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreMediaPeriode', 'list');
        isPermistted ? this.rencontreMediaPeriodeService.findAll().subscribe(rencontreMediaPeriodes => this.rencontreMediaPeriodes = rencontreMediaPeriodes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreMediaPeriodeService.findByCriteria(this.searchRencontreMediaPeriode).subscribe(rencontreMediaPeriodes=>{
            
            this.rencontreMediaPeriodes = rencontreMediaPeriodes;
           // this.searchRencontreMediaPeriode = new RencontreMediaPeriodeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreMedia?.id', header: 'Rencontre media'},
                            {field: 'dateRencontre', header: 'Date rencontre'},
        ];
    }
    
    public async editRencontreMediaPeriode(rencontreMediaPeriode:RencontreMediaPeriodeVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaPeriode', 'edit');
         if(isPermistted){
          this.rencontreMediaPeriodeService.findByIdWithAssociatedList(rencontreMediaPeriode).subscribe(res => {
           this.selectedRencontreMediaPeriode = res;
            this.selectedRencontreMediaPeriode.dateRencontre = new Date(rencontreMediaPeriode.dateRencontre);
            this.editRencontreMediaPeriodeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreMediaPeriode(rencontreMediaPeriode:RencontreMediaPeriodeVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaPeriode', 'view');
        if(isPermistted){
           this.rencontreMediaPeriodeService.findByIdWithAssociatedList(rencontreMediaPeriode).subscribe(res => {
           this.selectedRencontreMediaPeriode = res;
            this.selectedRencontreMediaPeriode.dateRencontre = new Date(rencontreMediaPeriode.dateRencontre);
            this.viewRencontreMediaPeriodeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreMediaPeriode(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreMediaPeriode = new RencontreMediaPeriodeVo();
            this.createRencontreMediaPeriodeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreMediaPeriode(rencontreMediaPeriode:RencontreMediaPeriodeVo){
       const isPermistted = await this.roleService.isPermitted('RencontreMediaPeriode', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre media periode) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreMediaPeriodeService.delete(rencontreMediaPeriode).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreMediaPeriodes.indexOf(rencontreMediaPeriode);
                          position > -1 ? this.rencontreMediaPeriodes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre media periode Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('RencontreMediaPeriode', 'list');
    isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreMediaPeriode(rencontreMediaPeriode: RencontreMediaPeriodeVo) {

     this.rencontreMediaPeriodeService.findByIdWithAssociatedList(rencontreMediaPeriode).subscribe(
	 res => {
	       this.initDuplicateRencontreMediaPeriode(res);
	       this.selectedRencontreMediaPeriode = res;
	       this.selectedRencontreMediaPeriode.id = null;
            this.createRencontreMediaPeriodeDialog = true;

});

	}

	initDuplicateRencontreMediaPeriode(res: RencontreMediaPeriodeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreMediaPeriodes.map(e => {
    return {
            'Rencontre media': e.rencontreMediaVo?.id ,
                    'Date rencontre': this.datePipe.transform(e.dateRencontre , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Rencontre media': this.searchRencontreMediaPeriode.rencontreMediaVo?.id ? this.searchRencontreMediaPeriode.rencontreMediaVo?.id : environment.emptyForExport ,
            'Date rencontre Min': this.searchRencontreMediaPeriode.dateRencontreMin ? this.datePipe.transform(this.searchRencontreMediaPeriode.dateRencontreMin , this.dateFormat) : environment.emptyForExport ,
            'Date rencontre Max': this.searchRencontreMediaPeriode.dateRencontreMax ? this.datePipe.transform(this.searchRencontreMediaPeriode.dateRencontreMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreMediaPeriodes(): Array<RencontreMediaPeriodeVo> {
           return this.rencontreMediaPeriodeService.rencontreMediaPeriodes;
       }
    set rencontreMediaPeriodes(value: Array<RencontreMediaPeriodeVo>) {
        this.rencontreMediaPeriodeService.rencontreMediaPeriodes = value;
       }

    get rencontreMediaPeriodeSelections(): Array<RencontreMediaPeriodeVo> {
           return this.rencontreMediaPeriodeService.rencontreMediaPeriodeSelections;
       }
    set rencontreMediaPeriodeSelections(value: Array<RencontreMediaPeriodeVo>) {
        this.rencontreMediaPeriodeService.rencontreMediaPeriodeSelections = value;
       }
   
     


    get selectedRencontreMediaPeriode():RencontreMediaPeriodeVo {
           return this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode;
       }
    set selectedRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this.rencontreMediaPeriodeService.selectedRencontreMediaPeriode = value;
       }
    
    get createRencontreMediaPeriodeDialog():boolean {
           return this.rencontreMediaPeriodeService.createRencontreMediaPeriodeDialog;
       }
    set createRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.createRencontreMediaPeriodeDialog= value;
       }
    
    get editRencontreMediaPeriodeDialog():boolean {
           return this.rencontreMediaPeriodeService.editRencontreMediaPeriodeDialog;
       }
    set editRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.editRencontreMediaPeriodeDialog= value;
       }
    get viewRencontreMediaPeriodeDialog():boolean {
           return this.rencontreMediaPeriodeService.viewRencontreMediaPeriodeDialog;
       }
    set viewRencontreMediaPeriodeDialog(value: boolean) {
        this.rencontreMediaPeriodeService.viewRencontreMediaPeriodeDialog = value;
       }
       
     get searchRencontreMediaPeriode(): RencontreMediaPeriodeVo {
        return this.rencontreMediaPeriodeService.searchRencontreMediaPeriode;
       }
    set searchRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this.rencontreMediaPeriodeService.searchRencontreMediaPeriode = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliquePeriodeService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliquePeriode.service';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-periode-list-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-periode-list-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-periode-list-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliquePeriodeListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePubliquePeriode';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliquePeriodeService: RencontreGrandPubliqueJeunePubliquePeriodeService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliquePeriodes();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliquePeriodes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliquePeriode', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliquePeriodeService.findAll().subscribe(rencontreGrandPubliqueJeunePubliquePeriodes => this.rencontreGrandPubliqueJeunePubliquePeriodes = rencontreGrandPubliqueJeunePubliquePeriodes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.findByCriteria(this.searchRencontreGrandPubliqueJeunePubliquePeriode).subscribe(rencontreGrandPubliqueJeunePubliquePeriodes=>{
            
            this.rencontreGrandPubliqueJeunePubliquePeriodes = rencontreGrandPubliqueJeunePubliquePeriodes;
           // this.searchRencontreGrandPubliqueJeunePubliquePeriode = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                            {field: 'dateRencontre', header: 'Date rencontre'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePubliquePeriode(rencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliquePeriode', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliquePeriodeService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliquePeriode).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliquePeriode = res;
            this.selectedRencontreGrandPubliqueJeunePubliquePeriode.dateRencontre = new Date(rencontreGrandPubliqueJeunePubliquePeriode.dateRencontre);
            this.editRencontreGrandPubliqueJeunePubliquePeriodeDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePubliquePeriode(rencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliquePeriode', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliquePeriodeService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliquePeriode).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliquePeriode = res;
            this.selectedRencontreGrandPubliqueJeunePubliquePeriode.dateRencontre = new Date(rencontreGrandPubliqueJeunePubliquePeriode.dateRencontre);
            this.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePubliquePeriode(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePubliquePeriode = new RencontreGrandPubliqueJeunePubliquePeriodeVo();
            this.createRencontreGrandPubliqueJeunePubliquePeriodeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePubliquePeriode(rencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliquePeriode', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique periode) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliquePeriodeService.delete(rencontreGrandPubliqueJeunePubliquePeriode).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliquePeriodes.indexOf(rencontreGrandPubliqueJeunePubliquePeriode);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliquePeriodes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique periode Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliquePeriode', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePubliquePeriode(rencontreGrandPubliqueJeunePubliquePeriode: RencontreGrandPubliqueJeunePubliquePeriodeVo) {

     this.rencontreGrandPubliqueJeunePubliquePeriodeService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliquePeriode).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePubliquePeriode(res);
	       this.selectedRencontreGrandPubliqueJeunePubliquePeriode = res;
	       this.selectedRencontreGrandPubliqueJeunePubliquePeriode.id = null;
            this.createRencontreGrandPubliqueJeunePubliquePeriodeDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePubliquePeriode(res: RencontreGrandPubliqueJeunePubliquePeriodeVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreGrandPubliqueJeunePubliquePeriodes.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
                    'Date rencontre': this.datePipe.transform(e.dateRencontre , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchRencontreGrandPubliqueJeunePubliquePeriode.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchRencontreGrandPubliqueJeunePubliquePeriode.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
            'Date rencontre Min': this.searchRencontreGrandPubliqueJeunePubliquePeriode.dateRencontreMin ? this.datePipe.transform(this.searchRencontreGrandPubliqueJeunePubliquePeriode.dateRencontreMin , this.dateFormat) : environment.emptyForExport ,
            'Date rencontre Max': this.searchRencontreGrandPubliqueJeunePubliquePeriode.dateRencontreMax ? this.datePipe.transform(this.searchRencontreGrandPubliqueJeunePubliquePeriode.dateRencontreMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliquePeriodes(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes;
       }
    set rencontreGrandPubliqueJeunePubliquePeriodes(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodes = value;
       }

    get rencontreGrandPubliqueJeunePubliquePeriodeSelections(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodeSelections;
       }
    set rencontreGrandPubliqueJeunePubliquePeriodeSelections(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.rencontreGrandPubliqueJeunePubliquePeriodeSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePubliquePeriode():RencontreGrandPubliqueJeunePubliquePeriodeVo {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode;
       }
    set selectedRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.selectedRencontreGrandPubliqueJeunePubliquePeriode = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliquePeriodeDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.createRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }
    set createRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.createRencontreGrandPubliqueJeunePubliquePeriodeDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliquePeriodeDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.editRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }
    set editRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.editRencontreGrandPubliqueJeunePubliquePeriodeDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliquePeriodeDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliquePeriodeService.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.viewRencontreGrandPubliqueJeunePubliquePeriodeDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePubliquePeriode(): RencontreGrandPubliqueJeunePubliquePeriodeVo {
        return this.rencontreGrandPubliqueJeunePubliquePeriodeService.searchRencontreGrandPubliqueJeunePubliquePeriode;
       }
    set searchRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this.rencontreGrandPubliqueJeunePubliquePeriodeService.searchRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

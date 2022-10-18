import {Component, OnInit} from '@angular/core';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-rencontre-grand-publique-jeune-publique-list-chercheur',
  templateUrl: './pays-rencontre-grand-publique-jeune-publique-list-chercheur.component.html',
  styleUrls: ['./pays-rencontre-grand-publique-jeune-publique-list-chercheur.component.css']
})
export class PaysRencontreGrandPubliqueJeunePubliqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysRencontreGrandPubliqueJeunePublique';
    payss :Array<PaysVo>;
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;


    constructor(private datePipe: DatePipe, private paysRencontreGrandPubliqueJeunePubliqueService: PaysRencontreGrandPubliqueJeunePubliqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) { }

    ngOnInit(): void {
      this.loadPaysRencontreGrandPubliqueJeunePubliques();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadRencontreGrandPubliqueJeunePublique();
    }
    
    // methods
      public async loadPaysRencontreGrandPubliqueJeunePubliques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'list');
        isPermistted ? this.paysRencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(paysRencontreGrandPubliqueJeunePubliques => this.paysRencontreGrandPubliqueJeunePubliques = paysRencontreGrandPubliqueJeunePubliques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysRencontreGrandPubliqueJeunePubliqueService.findByCriteria(this.searchPaysRencontreGrandPubliqueJeunePublique).subscribe(paysRencontreGrandPubliqueJeunePubliques=>{
            
            this.paysRencontreGrandPubliqueJeunePubliques = paysRencontreGrandPubliqueJeunePubliques;
           // this.searchPaysRencontreGrandPubliqueJeunePublique = new PaysRencontreGrandPubliqueJeunePubliqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
        ];
    }
    
    public async editPaysRencontreGrandPubliqueJeunePublique(paysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'edit');
         if(isPermistted){
          this.paysRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedPaysRencontreGrandPubliqueJeunePublique = res;
            this.editPaysRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysRencontreGrandPubliqueJeunePublique(paysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'view');
        if(isPermistted){
           this.paysRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedPaysRencontreGrandPubliqueJeunePublique = res;
            this.viewPaysRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysRencontreGrandPubliqueJeunePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysRencontreGrandPubliqueJeunePublique = new PaysRencontreGrandPubliqueJeunePubliqueVo();
            this.createPaysRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysRencontreGrandPubliqueJeunePublique(paysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo){
       const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays rencontre grand publique jeune publique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysRencontreGrandPubliqueJeunePubliqueService.delete(paysRencontreGrandPubliqueJeunePublique).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysRencontreGrandPubliqueJeunePubliques.indexOf(paysRencontreGrandPubliqueJeunePublique);
                          position > -1 ? this.paysRencontreGrandPubliqueJeunePubliques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays rencontre grand publique jeune publique Supprimé',
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

public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRencontreGrandPubliqueJeunePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysRencontreGrandPubliqueJeunePublique(paysRencontreGrandPubliqueJeunePublique: PaysRencontreGrandPubliqueJeunePubliqueVo) {

     this.paysRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysRencontreGrandPubliqueJeunePublique).subscribe(
	 res => {
	       this.initDuplicatePaysRencontreGrandPubliqueJeunePublique(res);
	       this.selectedPaysRencontreGrandPubliqueJeunePublique = res;
	       this.selectedPaysRencontreGrandPubliqueJeunePublique.id = null;
            this.createPaysRencontreGrandPubliqueJeunePubliqueDialog = true;

});

	}

	initDuplicatePaysRencontreGrandPubliqueJeunePublique(res: PaysRencontreGrandPubliqueJeunePubliqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysRencontreGrandPubliqueJeunePubliques.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchPaysRencontreGrandPubliqueJeunePublique.paysVo?.libelle ? this.searchPaysRencontreGrandPubliqueJeunePublique.paysVo?.libelle : environment.emptyForExport ,
        'Rencontre grand publique jeune publique': this.searchPaysRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchPaysRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysRencontreGrandPubliqueJeunePubliques(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques;
       }
    set paysRencontreGrandPubliqueJeunePubliques(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques = value;
       }

    get paysRencontreGrandPubliqueJeunePubliqueSelections(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliqueSelections;
       }
    set paysRencontreGrandPubliqueJeunePubliqueSelections(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliqueSelections = value;
       }
   
     


    get selectedPaysRencontreGrandPubliqueJeunePublique():PaysRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique = value;
       }
    
    get createPaysRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.createPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set createPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.createPaysRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    
    get editPaysRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.editPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set editPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.editPaysRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    get viewPaysRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.viewPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set viewPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.viewPaysRencontreGrandPubliqueJeunePubliqueDialog = value;
       }
       
     get searchPaysRencontreGrandPubliqueJeunePublique(): PaysRencontreGrandPubliqueJeunePubliqueVo {
        return this.paysRencontreGrandPubliqueJeunePubliqueService.searchPaysRencontreGrandPubliqueJeunePublique;
       }
    set searchPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.searchPaysRencontreGrandPubliqueJeunePublique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

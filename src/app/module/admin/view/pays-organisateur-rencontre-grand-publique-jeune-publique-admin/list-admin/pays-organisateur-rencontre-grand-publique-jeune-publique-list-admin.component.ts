import {Component, OnInit} from '@angular/core';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysOrganisateurRencontreGrandPubliqueJeunePublique.service';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-organisateur-rencontre-grand-publique-jeune-publique-list-admin',
  templateUrl: './pays-organisateur-rencontre-grand-publique-jeune-publique-list-admin.component.html',
  styleUrls: ['./pays-organisateur-rencontre-grand-publique-jeune-publique-list-admin.component.css']
})
export class PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysOrganisateurRencontreGrandPubliqueJeunePublique';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private paysOrganisateurRencontreGrandPubliqueJeunePubliqueService: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadPaysOrganisateurRencontreGrandPubliqueJeunePubliques();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
      this.loadPays();
    }
    
    // methods
      public async loadPaysOrganisateurRencontreGrandPubliqueJeunePubliques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'list');
        isPermistted ? this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(paysOrganisateurRencontreGrandPubliqueJeunePubliques => this.paysOrganisateurRencontreGrandPubliqueJeunePubliques = paysOrganisateurRencontreGrandPubliqueJeunePubliques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.findByCriteria(this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique).subscribe(paysOrganisateurRencontreGrandPubliqueJeunePubliques=>{
            
            this.paysOrganisateurRencontreGrandPubliqueJeunePubliques = paysOrganisateurRencontreGrandPubliqueJeunePubliques;
           // this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editPaysOrganisateurRencontreGrandPubliqueJeunePublique(paysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'edit');
         if(isPermistted){
          this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysOrganisateurRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = res;
            this.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysOrganisateurRencontreGrandPubliqueJeunePublique(paysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'view');
        if(isPermistted){
           this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysOrganisateurRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = res;
            this.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysOrganisateurRencontreGrandPubliqueJeunePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
            this.createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysOrganisateurRencontreGrandPubliqueJeunePublique(paysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo){
       const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays organisateur rencontre grand publique jeune publique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.delete(paysOrganisateurRencontreGrandPubliqueJeunePublique).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysOrganisateurRencontreGrandPubliqueJeunePubliques.indexOf(paysOrganisateurRencontreGrandPubliqueJeunePublique);
                          position > -1 ? this.paysOrganisateurRencontreGrandPubliqueJeunePubliques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays organisateur rencontre grand publique jeune publique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysOrganisateurRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysOrganisateurRencontreGrandPubliqueJeunePublique(paysOrganisateurRencontreGrandPubliqueJeunePublique: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {

     this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(paysOrganisateurRencontreGrandPubliqueJeunePublique).subscribe(
	 res => {
	       this.initDuplicatePaysOrganisateurRencontreGrandPubliqueJeunePublique(res);
	       this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = res;
	       this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique.id = null;
            this.createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = true;

});

	}

	initDuplicatePaysOrganisateurRencontreGrandPubliqueJeunePublique(res: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysOrganisateurRencontreGrandPubliqueJeunePubliques.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
        'Pays': this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique.paysVo?.libelle ? this.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysOrganisateurRencontreGrandPubliqueJeunePubliques(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques;
       }
    set paysOrganisateurRencontreGrandPubliqueJeunePubliques(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliques = value;
       }

    get paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections;
       }
    set paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections = value;
       }
   
     


    get selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique():PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }
    
    get createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    
    get editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    get viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = value;
       }
       
     get searchPaysOrganisateurRencontreGrandPubliqueJeunePublique(): PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
        return this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique;
       }
    set searchPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysOrganisateurRencontreGrandPubliqueJeunePubliqueService.searchPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

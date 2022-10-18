import {Component, OnInit} from '@angular/core';
import {StructureOganisatriceService} from '../../../../../controller/service/StructureOganisatrice.service';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-structure-oganisatrice-list-admin',
  templateUrl: './structure-oganisatrice-list-admin.component.html',
  styleUrls: ['./structure-oganisatrice-list-admin.component.css']
})
export class StructureOganisatriceListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'StructureOganisatrice';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;
    etablissements :Array<EtablissementVo>;


    constructor(private datePipe: DatePipe, private structureOganisatriceService: StructureOganisatriceService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
        , private etablissementService: EtablissementService
) { }

    ngOnInit(): void {
      this.loadStructureOganisatrices();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
      this.loadEtablissement();
    }
    
    // methods
      public async loadStructureOganisatrices(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'list');
        isPermistted ? this.structureOganisatriceService.findAll().subscribe(structureOganisatrices => this.structureOganisatrices = structureOganisatrices,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.structureOganisatriceService.findByCriteria(this.searchStructureOganisatrice).subscribe(structureOganisatrices=>{
            
            this.structureOganisatrices = structureOganisatrices;
           // this.searchStructureOganisatrice = new StructureOganisatriceVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
        ];
    }
    
    public async editStructureOganisatrice(structureOganisatrice:StructureOganisatriceVo){
        const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'edit');
         if(isPermistted){
          this.structureOganisatriceService.findByIdWithAssociatedList(structureOganisatrice).subscribe(res => {
           this.selectedStructureOganisatrice = res;
            this.editStructureOganisatriceDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewStructureOganisatrice(structureOganisatrice:StructureOganisatriceVo){
        const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'view');
        if(isPermistted){
           this.structureOganisatriceService.findByIdWithAssociatedList(structureOganisatrice).subscribe(res => {
           this.selectedStructureOganisatrice = res;
            this.viewStructureOganisatriceDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateStructureOganisatrice(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedStructureOganisatrice = new StructureOganisatriceVo();
            this.createStructureOganisatriceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteStructureOganisatrice(structureOganisatrice:StructureOganisatriceVo){
       const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Structure oganisatrice) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.structureOganisatriceService.delete(structureOganisatrice).subscribe(status=>{
                          if(status > 0){
                          const position = this.structureOganisatrices.indexOf(structureOganisatrice);
                          position > -1 ? this.structureOganisatrices.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Structure oganisatrice Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('StructureOganisatrice', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateStructureOganisatrice(structureOganisatrice: StructureOganisatriceVo) {

     this.structureOganisatriceService.findByIdWithAssociatedList(structureOganisatrice).subscribe(
	 res => {
	       this.initDuplicateStructureOganisatrice(res);
	       this.selectedStructureOganisatrice = res;
	       this.selectedStructureOganisatrice.id = null;
            this.createStructureOganisatriceDialog = true;

});

	}

	initDuplicateStructureOganisatrice(res: StructureOganisatriceVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.structureOganisatrices.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
            'Etablissement': e.etablissementVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchStructureOganisatrice.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchStructureOganisatrice.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
        'Etablissement': this.searchStructureOganisatrice.etablissementVo?.libelle ? this.searchStructureOganisatrice.etablissementVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get structureOganisatrices(): Array<StructureOganisatriceVo> {
           return this.structureOganisatriceService.structureOganisatrices;
       }
    set structureOganisatrices(value: Array<StructureOganisatriceVo>) {
        this.structureOganisatriceService.structureOganisatrices = value;
       }

    get structureOganisatriceSelections(): Array<StructureOganisatriceVo> {
           return this.structureOganisatriceService.structureOganisatriceSelections;
       }
    set structureOganisatriceSelections(value: Array<StructureOganisatriceVo>) {
        this.structureOganisatriceService.structureOganisatriceSelections = value;
       }
   
     


    get selectedStructureOganisatrice():StructureOganisatriceVo {
           return this.structureOganisatriceService.selectedStructureOganisatrice;
       }
    set selectedStructureOganisatrice(value: StructureOganisatriceVo) {
        this.structureOganisatriceService.selectedStructureOganisatrice = value;
       }
    
    get createStructureOganisatriceDialog():boolean {
           return this.structureOganisatriceService.createStructureOganisatriceDialog;
       }
    set createStructureOganisatriceDialog(value: boolean) {
        this.structureOganisatriceService.createStructureOganisatriceDialog= value;
       }
    
    get editStructureOganisatriceDialog():boolean {
           return this.structureOganisatriceService.editStructureOganisatriceDialog;
       }
    set editStructureOganisatriceDialog(value: boolean) {
        this.structureOganisatriceService.editStructureOganisatriceDialog= value;
       }
    get viewStructureOganisatriceDialog():boolean {
           return this.structureOganisatriceService.viewStructureOganisatriceDialog;
       }
    set viewStructureOganisatriceDialog(value: boolean) {
        this.structureOganisatriceService.viewStructureOganisatriceDialog = value;
       }
       
     get searchStructureOganisatrice(): StructureOganisatriceVo {
        return this.structureOganisatriceService.searchStructureOganisatrice;
       }
    set searchStructureOganisatrice(value: StructureOganisatriceVo) {
        this.structureOganisatriceService.searchStructureOganisatrice = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

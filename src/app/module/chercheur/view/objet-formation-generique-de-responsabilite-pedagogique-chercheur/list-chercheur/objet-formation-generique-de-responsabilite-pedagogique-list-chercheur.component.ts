import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueService} from '../../../../../controller/service/ObjetFormationGeneriqueDeResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo} from '../../../../../controller/model/ObjetFormationGeneriqueDeResponsabilitePedagogique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ObjetFormationGeneriqueService } from '../../../../../controller/service/ObjetFormationGenerique.service';
import { ResponsabilitePedagogiqueService } from '../../../../../controller/service/ResponsabilitePedagogique.service';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-objet-formation-generique-de-responsabilite-pedagogique-list-chercheur',
  templateUrl: './objet-formation-generique-de-responsabilite-pedagogique-list-chercheur.component.html',
  styleUrls: ['./objet-formation-generique-de-responsabilite-pedagogique-list-chercheur.component.css']
})
export class ObjetFormationGeneriqueDeResponsabilitePedagogiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ObjetFormationGeneriqueDeResponsabilitePedagogique';
    objetFormationGeneriques :Array<ObjetFormationGeneriqueVo>;
    responsabilitePedagogiques :Array<ResponsabilitePedagogiqueVo>;


    constructor(private datePipe: DatePipe, private objetFormationGeneriqueDeResponsabilitePedagogiqueService: ObjetFormationGeneriqueDeResponsabilitePedagogiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private objetFormationGeneriqueService: ObjetFormationGeneriqueService
        , private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
) { }

    ngOnInit(): void {
      this.loadObjetFormationGeneriqueDeResponsabilitePedagogiques();
      this.initExport();
      this.initCol();
      this.loadObjetFormationGenerique();
      this.loadResponsabilitePedagogique();
    }
    
    // methods
      public async loadObjetFormationGeneriqueDeResponsabilitePedagogiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'list');
        isPermistted ? this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.findAll().subscribe(objetFormationGeneriqueDeResponsabilitePedagogiques => this.objetFormationGeneriqueDeResponsabilitePedagogiques = objetFormationGeneriqueDeResponsabilitePedagogiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.findByCriteria(this.searchObjetFormationGeneriqueDeResponsabilitePedagogique).subscribe(objetFormationGeneriqueDeResponsabilitePedagogiques=>{
            
            this.objetFormationGeneriqueDeResponsabilitePedagogiques = objetFormationGeneriqueDeResponsabilitePedagogiques;
           // this.searchObjetFormationGeneriqueDeResponsabilitePedagogique = new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'objetFormationGenerique?.libelle', header: 'Objet formation generique'},
                        {field: 'responsabilitePedagogique?.id', header: 'Responsabilite pedagogique'},
        ];
    }
    
    public async editObjetFormationGeneriqueDeResponsabilitePedagogique(objetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'edit');
         if(isPermistted){
          this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.findByIdWithAssociatedList(objetFormationGeneriqueDeResponsabilitePedagogique).subscribe(res => {
           this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = res;
            this.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewObjetFormationGeneriqueDeResponsabilitePedagogique(objetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'view');
        if(isPermistted){
           this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.findByIdWithAssociatedList(objetFormationGeneriqueDeResponsabilitePedagogique).subscribe(res => {
           this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = res;
            this.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateObjetFormationGeneriqueDeResponsabilitePedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = new ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo();
            this.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteObjetFormationGeneriqueDeResponsabilitePedagogique(objetFormationGeneriqueDeResponsabilitePedagogique:ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo){
       const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Objet formation generique de responsabilite pedagogique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.delete(objetFormationGeneriqueDeResponsabilitePedagogique).subscribe(status=>{
                          if(status > 0){
                          const position = this.objetFormationGeneriqueDeResponsabilitePedagogiques.indexOf(objetFormationGeneriqueDeResponsabilitePedagogique);
                          position > -1 ? this.objetFormationGeneriqueDeResponsabilitePedagogiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Objet formation generique de responsabilite pedagogique Supprimé',
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

public async loadObjetFormationGenerique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'list');
    isPermistted ? this.objetFormationGeneriqueService.findAll().subscribe(objetFormationGeneriques => this.objetFormationGeneriques = objetFormationGeneriques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadResponsabilitePedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ObjetFormationGeneriqueDeResponsabilitePedagogique', 'list');
    isPermistted ? this.responsabilitePedagogiqueService.findAll().subscribe(responsabilitePedagogiques => this.responsabilitePedagogiques = responsabilitePedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateObjetFormationGeneriqueDeResponsabilitePedagogique(objetFormationGeneriqueDeResponsabilitePedagogique: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {

     this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.findByIdWithAssociatedList(objetFormationGeneriqueDeResponsabilitePedagogique).subscribe(
	 res => {
	       this.initDuplicateObjetFormationGeneriqueDeResponsabilitePedagogique(res);
	       this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = res;
	       this.selectedObjetFormationGeneriqueDeResponsabilitePedagogique.id = null;
            this.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = true;

});

	}

	initDuplicateObjetFormationGeneriqueDeResponsabilitePedagogique(res: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.objetFormationGeneriqueDeResponsabilitePedagogiques.map(e => {
    return {
            'Objet formation generique': e.objetFormationGeneriqueVo?.libelle ,
            'Responsabilite pedagogique': e.responsabilitePedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Objet formation generique': this.searchObjetFormationGeneriqueDeResponsabilitePedagogique.objetFormationGeneriqueVo?.libelle ? this.searchObjetFormationGeneriqueDeResponsabilitePedagogique.objetFormationGeneriqueVo?.libelle : environment.emptyForExport ,
        'Responsabilite pedagogique': this.searchObjetFormationGeneriqueDeResponsabilitePedagogique.responsabilitePedagogiqueVo?.id ? this.searchObjetFormationGeneriqueDeResponsabilitePedagogique.responsabilitePedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get objetFormationGeneriqueDeResponsabilitePedagogiques(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques;
       }
    set objetFormationGeneriqueDeResponsabilitePedagogiques(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques = value;
       }

    get objetFormationGeneriqueDeResponsabilitePedagogiqueSelections(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiqueSelections;
       }
    set objetFormationGeneriqueDeResponsabilitePedagogiqueSelections(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiqueSelections = value;
       }
   
     


    get selectedObjetFormationGeneriqueDeResponsabilitePedagogique():ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
       }
    set selectedObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }
    
    get createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog():boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }
    set createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.createObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog= value;
       }
    
    get editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog():boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }
    set editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.editObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog= value;
       }
    get viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog():boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;
       }
    set viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog = value;
       }
       
     get searchObjetFormationGeneriqueDeResponsabilitePedagogique(): ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
        return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.searchObjetFormationGeneriqueDeResponsabilitePedagogique;
       }
    set searchObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.searchObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

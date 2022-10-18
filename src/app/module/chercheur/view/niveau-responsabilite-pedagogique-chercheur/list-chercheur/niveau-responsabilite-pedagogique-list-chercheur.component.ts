import {Component, OnInit} from '@angular/core';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-niveau-responsabilite-pedagogique-list-chercheur',
  templateUrl: './niveau-responsabilite-pedagogique-list-chercheur.component.html',
  styleUrls: ['./niveau-responsabilite-pedagogique-list-chercheur.component.css']
})
export class NiveauResponsabilitePedagogiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'NiveauResponsabilitePedagogique';


    constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadNiveauResponsabilitePedagogiques();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadNiveauResponsabilitePedagogiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'list');
        isPermistted ? this.niveauResponsabilitePedagogiqueService.findAll().subscribe(niveauResponsabilitePedagogiques => this.niveauResponsabilitePedagogiques = niveauResponsabilitePedagogiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.niveauResponsabilitePedagogiqueService.findByCriteria(this.searchNiveauResponsabilitePedagogique).subscribe(niveauResponsabilitePedagogiques=>{
            
            this.niveauResponsabilitePedagogiques = niveauResponsabilitePedagogiques;
           // this.searchNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'edit');
         if(isPermistted){
          this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(res => {
           this.selectedNiveauResponsabilitePedagogique = res;
            this.editNiveauResponsabilitePedagogiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'view');
        if(isPermistted){
           this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(res => {
           this.selectedNiveauResponsabilitePedagogique = res;
            this.viewNiveauResponsabilitePedagogiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateNiveauResponsabilitePedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();
            this.createNiveauResponsabilitePedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo){
       const isPermistted = await this.roleService.isPermitted('NiveauResponsabilitePedagogique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Niveau responsabilite pedagogique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.niveauResponsabilitePedagogiqueService.delete(niveauResponsabilitePedagogique).subscribe(status=>{
                          if(status > 0){
                          const position = this.niveauResponsabilitePedagogiques.indexOf(niveauResponsabilitePedagogique);
                          position > -1 ? this.niveauResponsabilitePedagogiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Niveau responsabilite pedagogique Supprimé',
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


public async duplicateNiveauResponsabilitePedagogique(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {

     this.niveauResponsabilitePedagogiqueService.findByIdWithAssociatedList(niveauResponsabilitePedagogique).subscribe(
	 res => {
	       this.initDuplicateNiveauResponsabilitePedagogique(res);
	       this.selectedNiveauResponsabilitePedagogique = res;
	       this.selectedNiveauResponsabilitePedagogique.id = null;
            this.createNiveauResponsabilitePedagogiqueDialog = true;

});

	}

	initDuplicateNiveauResponsabilitePedagogique(res: NiveauResponsabilitePedagogiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.niveauResponsabilitePedagogiques.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchNiveauResponsabilitePedagogique.libelle ? this.searchNiveauResponsabilitePedagogique.libelle : environment.emptyForExport ,
            'Code': this.searchNiveauResponsabilitePedagogique.code ? this.searchNiveauResponsabilitePedagogique.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
    set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }

    get niveauResponsabilitePedagogiqueSelections(): Array<NiveauResponsabilitePedagogiqueVo> {
           return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiqueSelections;
       }
    set niveauResponsabilitePedagogiqueSelections(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiqueSelections = value;
       }
   
     


    get selectedNiveauResponsabilitePedagogique():NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }
    
    get createNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog;
       }
    set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.createNiveauResponsabilitePedagogiqueDialog= value;
       }
    
    get editNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;
       }
    set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog= value;
       }
    get viewNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog;
       }
    set viewNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog = value;
       }
       
     get searchNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
        return this.niveauResponsabilitePedagogiqueService.searchNiveauResponsabilitePedagogique;
       }
    set searchNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.searchNiveauResponsabilitePedagogique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

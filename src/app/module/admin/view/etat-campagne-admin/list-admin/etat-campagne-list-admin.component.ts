import {Component, OnInit} from '@angular/core';
import {EtatCampagneService} from '../../../../../controller/service/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../controller/model/EtatCampagne.model';
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
  selector: 'app-etat-campagne-list-admin',
  templateUrl: './etat-campagne-list-admin.component.html',
  styleUrls: ['./etat-campagne-list-admin.component.css']
})
export class EtatCampagneListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatCampagne';


    constructor(private datePipe: DatePipe, private etatCampagneService: EtatCampagneService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadEtatCampagnes();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatCampagnes(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'list');
        isPermistted ? this.etatCampagneService.findAll().subscribe(etatCampagnes => this.etatCampagnes = etatCampagnes,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatCampagneService.findByCriteria(this.searchEtatCampagne).subscribe(etatCampagnes=>{
            
            this.etatCampagnes = etatCampagnes;
           // this.searchEtatCampagne = new EtatCampagneVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
                            {field: 'ordre', header: 'Ordre'},
        ];
    }
    
    public async editEtatCampagne(etatCampagne:EtatCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'edit');
         if(isPermistted){
          this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(res => {
           this.selectedEtatCampagne = res;
            this.editEtatCampagneDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatCampagne(etatCampagne:EtatCampagneVo){
        const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'view');
        if(isPermistted){
           this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(res => {
           this.selectedEtatCampagne = res;
            this.viewEtatCampagneDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatCampagne(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatCampagne = new EtatCampagneVo();
            this.createEtatCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatCampagne(etatCampagne:EtatCampagneVo){
       const isPermistted = await this.roleService.isPermitted('EtatCampagne', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat campagne) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatCampagneService.delete(etatCampagne).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatCampagnes.indexOf(etatCampagne);
                          position > -1 ? this.etatCampagnes.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat campagne Supprimé',
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


public async duplicateEtatCampagne(etatCampagne: EtatCampagneVo) {

     this.etatCampagneService.findByIdWithAssociatedList(etatCampagne).subscribe(
	 res => {
	       this.initDuplicateEtatCampagne(res);
	       this.selectedEtatCampagne = res;
	       this.selectedEtatCampagne.id = null;
            this.createEtatCampagneDialog = true;

});

	}

	initDuplicateEtatCampagne(res: EtatCampagneVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.etatCampagnes.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
                    'Ordre': e.ordre ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatCampagne.libelle ? this.searchEtatCampagne.libelle : environment.emptyForExport ,
            'Code': this.searchEtatCampagne.code ? this.searchEtatCampagne.code : environment.emptyForExport ,
            'Ordre Min': this.searchEtatCampagne.ordreMin ? this.searchEtatCampagne.ordreMin : environment.emptyForExport ,
            'Ordre Max': this.searchEtatCampagne.ordreMax ? this.searchEtatCampagne.ordreMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatCampagnes(): Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagnes;
       }
    set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

    get etatCampagneSelections(): Array<EtatCampagneVo> {
           return this.etatCampagneService.etatCampagneSelections;
       }
    set etatCampagneSelections(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagneSelections = value;
       }
   
     


    get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }
    
    get createEtatCampagneDialog():boolean {
           return this.etatCampagneService.createEtatCampagneDialog;
       }
    set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog= value;
       }
    
    get editEtatCampagneDialog():boolean {
           return this.etatCampagneService.editEtatCampagneDialog;
       }
    set editEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.editEtatCampagneDialog= value;
       }
    get viewEtatCampagneDialog():boolean {
           return this.etatCampagneService.viewEtatCampagneDialog;
       }
    set viewEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.viewEtatCampagneDialog = value;
       }
       
     get searchEtatCampagne(): EtatCampagneVo {
        return this.etatCampagneService.searchEtatCampagne;
       }
    set searchEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.searchEtatCampagne = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

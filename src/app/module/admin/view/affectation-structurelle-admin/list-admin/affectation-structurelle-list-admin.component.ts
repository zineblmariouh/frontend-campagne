import {Component, OnInit} from '@angular/core';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
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
  selector: 'app-affectation-structurelle-list-admin',
  templateUrl: './affectation-structurelle-list-admin.component.html',
  styleUrls: ['./affectation-structurelle-list-admin.component.css']
})
export class AffectationStructurelleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'AffectationStructurelle';


    constructor(private datePipe: DatePipe, private affectationStructurelleService: AffectationStructurelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadAffectationStructurelles();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadAffectationStructurelles(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'list');
        isPermistted ? this.affectationStructurelleService.findAll().subscribe(affectationStructurelles => this.affectationStructurelles = affectationStructurelles,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.affectationStructurelleService.findByCriteria(this.searchAffectationStructurelle).subscribe(affectationStructurelles=>{
            
            this.affectationStructurelles = affectationStructurelles;
           // this.searchAffectationStructurelle = new AffectationStructurelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'code', header: 'Code'},
                            {field: 'libelleCourt', header: 'Libelle court'},
                            {field: 'libelleLong', header: 'Libelle long'},
        ];
    }
    
    public async editAffectationStructurelle(affectationStructurelle:AffectationStructurelleVo){
        const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'edit');
         if(isPermistted){
          this.affectationStructurelleService.findByIdWithAssociatedList(affectationStructurelle).subscribe(res => {
           this.selectedAffectationStructurelle = res;
            this.editAffectationStructurelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewAffectationStructurelle(affectationStructurelle:AffectationStructurelleVo){
        const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'view');
        if(isPermistted){
           this.affectationStructurelleService.findByIdWithAssociatedList(affectationStructurelle).subscribe(res => {
           this.selectedAffectationStructurelle = res;
            this.viewAffectationStructurelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateAffectationStructurelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedAffectationStructurelle = new AffectationStructurelleVo();
            this.createAffectationStructurelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteAffectationStructurelle(affectationStructurelle:AffectationStructurelleVo){
       const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Affectation structurelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.affectationStructurelleService.delete(affectationStructurelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.affectationStructurelles.indexOf(affectationStructurelle);
                          position > -1 ? this.affectationStructurelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Affectation structurelle Supprimé',
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


public async duplicateAffectationStructurelle(affectationStructurelle: AffectationStructurelleVo) {

     this.affectationStructurelleService.findByIdWithAssociatedList(affectationStructurelle).subscribe(
	 res => {
	       this.initDuplicateAffectationStructurelle(res);
	       this.selectedAffectationStructurelle = res;
	       this.selectedAffectationStructurelle.id = null;
            this.createAffectationStructurelleDialog = true;

});

	}

	initDuplicateAffectationStructurelle(res: AffectationStructurelleVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.affectationStructurelles.map(e => {
    return {
                    'Code': e.code ,
                    'Libelle court': e.libelleCourt ,
                    'Libelle long': e.libelleLong ,
     }
      });

      this.criteriaData = [{
            'Code': this.searchAffectationStructurelle.code ? this.searchAffectationStructurelle.code : environment.emptyForExport ,
            'Libelle court': this.searchAffectationStructurelle.libelleCourt ? this.searchAffectationStructurelle.libelleCourt : environment.emptyForExport ,
            'Libelle long': this.searchAffectationStructurelle.libelleLong ? this.searchAffectationStructurelle.libelleLong : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get affectationStructurelles(): Array<AffectationStructurelleVo> {
           return this.affectationStructurelleService.affectationStructurelles;
       }
    set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }

    get affectationStructurelleSelections(): Array<AffectationStructurelleVo> {
           return this.affectationStructurelleService.affectationStructurelleSelections;
       }
    set affectationStructurelleSelections(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelleSelections = value;
       }
   
     


    get selectedAffectationStructurelle():AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
    set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }
    
    get createAffectationStructurelleDialog():boolean {
           return this.affectationStructurelleService.createAffectationStructurelleDialog;
       }
    set createAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.createAffectationStructurelleDialog= value;
       }
    
    get editAffectationStructurelleDialog():boolean {
           return this.affectationStructurelleService.editAffectationStructurelleDialog;
       }
    set editAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.editAffectationStructurelleDialog= value;
       }
    get viewAffectationStructurelleDialog():boolean {
           return this.affectationStructurelleService.viewAffectationStructurelleDialog;
       }
    set viewAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.viewAffectationStructurelleDialog = value;
       }
       
     get searchAffectationStructurelle(): AffectationStructurelleVo {
        return this.affectationStructurelleService.searchAffectationStructurelle;
       }
    set searchAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.searchAffectationStructurelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

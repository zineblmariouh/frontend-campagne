import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EncadrementEtudiantService } from '../../../../../controller/service/EncadrementEtudiant.service';
import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-encadrement-etudiant-enjeux-ird-list-chercheur',
  templateUrl: './encadrement-etudiant-enjeux-ird-list-chercheur.component.html',
  styleUrls: ['./encadrement-etudiant-enjeux-ird-list-chercheur.component.css']
})
export class EncadrementEtudiantEnjeuxIrdListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EncadrementEtudiantEnjeuxIrd';
    encadrementEtudiants :Array<EncadrementEtudiantVo>;
    enjeuxIrds :Array<EnjeuxIrdVo>;


    constructor(private datePipe: DatePipe, private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private encadrementEtudiantService: EncadrementEtudiantService
        , private enjeuxIrdService: EnjeuxIrdService
) { }

    ngOnInit(): void {
      this.loadEncadrementEtudiantEnjeuxIrds();
      this.initExport();
      this.initCol();
      this.loadEncadrementEtudiant();
      this.loadEnjeuxIrd();
    }
    
    // methods
      public async loadEncadrementEtudiantEnjeuxIrds(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'list');
        isPermistted ? this.encadrementEtudiantEnjeuxIrdService.findAll().subscribe(encadrementEtudiantEnjeuxIrds => this.encadrementEtudiantEnjeuxIrds = encadrementEtudiantEnjeuxIrds,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.encadrementEtudiantEnjeuxIrdService.findByCriteria(this.searchEncadrementEtudiantEnjeuxIrd).subscribe(encadrementEtudiantEnjeuxIrds=>{
            
            this.encadrementEtudiantEnjeuxIrds = encadrementEtudiantEnjeuxIrds;
           // this.searchEncadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'encadrementEtudiant?.id', header: 'Encadrement etudiant'},
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
        ];
    }
    
    public async editEncadrementEtudiantEnjeuxIrd(encadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'edit');
         if(isPermistted){
          this.encadrementEtudiantEnjeuxIrdService.findByIdWithAssociatedList(encadrementEtudiantEnjeuxIrd).subscribe(res => {
           this.selectedEncadrementEtudiantEnjeuxIrd = res;
            this.editEncadrementEtudiantEnjeuxIrdDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEncadrementEtudiantEnjeuxIrd(encadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'view');
        if(isPermistted){
           this.encadrementEtudiantEnjeuxIrdService.findByIdWithAssociatedList(encadrementEtudiantEnjeuxIrd).subscribe(res => {
           this.selectedEncadrementEtudiantEnjeuxIrd = res;
            this.viewEncadrementEtudiantEnjeuxIrdDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEncadrementEtudiantEnjeuxIrd(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEncadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();
            this.createEncadrementEtudiantEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEncadrementEtudiantEnjeuxIrd(encadrementEtudiantEnjeuxIrd:EncadrementEtudiantEnjeuxIrdVo){
       const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Encadrement etudiant enjeux ird) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.encadrementEtudiantEnjeuxIrdService.delete(encadrementEtudiantEnjeuxIrd).subscribe(status=>{
                          if(status > 0){
                          const position = this.encadrementEtudiantEnjeuxIrds.indexOf(encadrementEtudiantEnjeuxIrd);
                          position > -1 ? this.encadrementEtudiantEnjeuxIrds.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Encadrement etudiant enjeux ird Supprimé',
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

public async loadEncadrementEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'list');
    isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiantEnjeuxIrd', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEncadrementEtudiantEnjeuxIrd(encadrementEtudiantEnjeuxIrd: EncadrementEtudiantEnjeuxIrdVo) {

     this.encadrementEtudiantEnjeuxIrdService.findByIdWithAssociatedList(encadrementEtudiantEnjeuxIrd).subscribe(
	 res => {
	       this.initDuplicateEncadrementEtudiantEnjeuxIrd(res);
	       this.selectedEncadrementEtudiantEnjeuxIrd = res;
	       this.selectedEncadrementEtudiantEnjeuxIrd.id = null;
            this.createEncadrementEtudiantEnjeuxIrdDialog = true;

});

	}

	initDuplicateEncadrementEtudiantEnjeuxIrd(res: EncadrementEtudiantEnjeuxIrdVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.encadrementEtudiantEnjeuxIrds.map(e => {
    return {
            'Encadrement etudiant': e.encadrementEtudiantVo?.id ,
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Encadrement etudiant': this.searchEncadrementEtudiantEnjeuxIrd.encadrementEtudiantVo?.id ? this.searchEncadrementEtudiantEnjeuxIrd.encadrementEtudiantVo?.id : environment.emptyForExport ,
        'Enjeux ird': this.searchEncadrementEtudiantEnjeuxIrd.enjeuxIrdVo?.libelle ? this.searchEncadrementEtudiantEnjeuxIrd.enjeuxIrdVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get encadrementEtudiantEnjeuxIrds(): Array<EncadrementEtudiantEnjeuxIrdVo> {
           return this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds;
       }
    set encadrementEtudiantEnjeuxIrds(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds = value;
       }

    get encadrementEtudiantEnjeuxIrdSelections(): Array<EncadrementEtudiantEnjeuxIrdVo> {
           return this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrdSelections;
       }
    set encadrementEtudiantEnjeuxIrdSelections(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrdSelections = value;
       }
   
     


    get selectedEncadrementEtudiantEnjeuxIrd():EncadrementEtudiantEnjeuxIrdVo {
           return this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd;
       }
    set selectedEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd = value;
       }
    
    get createEncadrementEtudiantEnjeuxIrdDialog():boolean {
           return this.encadrementEtudiantEnjeuxIrdService.createEncadrementEtudiantEnjeuxIrdDialog;
       }
    set createEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.createEncadrementEtudiantEnjeuxIrdDialog= value;
       }
    
    get editEncadrementEtudiantEnjeuxIrdDialog():boolean {
           return this.encadrementEtudiantEnjeuxIrdService.editEncadrementEtudiantEnjeuxIrdDialog;
       }
    set editEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.editEncadrementEtudiantEnjeuxIrdDialog= value;
       }
    get viewEncadrementEtudiantEnjeuxIrdDialog():boolean {
           return this.encadrementEtudiantEnjeuxIrdService.viewEncadrementEtudiantEnjeuxIrdDialog;
       }
    set viewEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.viewEncadrementEtudiantEnjeuxIrdDialog = value;
       }
       
     get searchEncadrementEtudiantEnjeuxIrd(): EncadrementEtudiantEnjeuxIrdVo {
        return this.encadrementEtudiantEnjeuxIrdService.searchEncadrementEtudiantEnjeuxIrd;
       }
    set searchEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this.encadrementEtudiantEnjeuxIrdService.searchEncadrementEtudiantEnjeuxIrd = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EnjeuxIrdService } from '../../../../../controller/service/EnjeuxIrd.service';
import { EncadrementDoctorantService } from '../../../../../controller/service/EncadrementDoctorant.service';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enjeux-ird-encadrement-doctorant-list-chercheur',
  templateUrl: './enjeux-ird-encadrement-doctorant-list-chercheur.component.html',
  styleUrls: ['./enjeux-ird-encadrement-doctorant-list-chercheur.component.css']
})
export class EnjeuxIrdEncadrementDoctorantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnjeuxIrdEncadrementDoctorant';
    enjeuxIrds :Array<EnjeuxIrdVo>;
    encadrementDoctorants :Array<EncadrementDoctorantVo>;


    constructor(private datePipe: DatePipe, private enjeuxIrdEncadrementDoctorantService: EnjeuxIrdEncadrementDoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private enjeuxIrdService: EnjeuxIrdService
        , private encadrementDoctorantService: EncadrementDoctorantService
) { }

    ngOnInit(): void {
      this.loadEnjeuxIrdEncadrementDoctorants();
      this.initExport();
      this.initCol();
      this.loadEnjeuxIrd();
      this.loadEncadrementDoctorant();
    }
    
    // methods
      public async loadEnjeuxIrdEncadrementDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'list');
        isPermistted ? this.enjeuxIrdEncadrementDoctorantService.findAll().subscribe(enjeuxIrdEncadrementDoctorants => this.enjeuxIrdEncadrementDoctorants = enjeuxIrdEncadrementDoctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enjeuxIrdEncadrementDoctorantService.findByCriteria(this.searchEnjeuxIrdEncadrementDoctorant).subscribe(enjeuxIrdEncadrementDoctorants=>{
            
            this.enjeuxIrdEncadrementDoctorants = enjeuxIrdEncadrementDoctorants;
           // this.searchEnjeuxIrdEncadrementDoctorant = new EnjeuxIrdEncadrementDoctorantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'enjeuxIrd?.libelle', header: 'Enjeux ird'},
                        {field: 'encadrementDoctorant?.id', header: 'Encadrement doctorant'},
        ];
    }
    
    public async editEnjeuxIrdEncadrementDoctorant(enjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'edit');
         if(isPermistted){
          this.enjeuxIrdEncadrementDoctorantService.findByIdWithAssociatedList(enjeuxIrdEncadrementDoctorant).subscribe(res => {
           this.selectedEnjeuxIrdEncadrementDoctorant = res;
            this.editEnjeuxIrdEncadrementDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnjeuxIrdEncadrementDoctorant(enjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'view');
        if(isPermistted){
           this.enjeuxIrdEncadrementDoctorantService.findByIdWithAssociatedList(enjeuxIrdEncadrementDoctorant).subscribe(res => {
           this.selectedEnjeuxIrdEncadrementDoctorant = res;
            this.viewEnjeuxIrdEncadrementDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnjeuxIrdEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnjeuxIrdEncadrementDoctorant = new EnjeuxIrdEncadrementDoctorantVo();
            this.createEnjeuxIrdEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnjeuxIrdEncadrementDoctorant(enjeuxIrdEncadrementDoctorant:EnjeuxIrdEncadrementDoctorantVo){
       const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enjeux ird encadrement doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enjeuxIrdEncadrementDoctorantService.delete(enjeuxIrdEncadrementDoctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.enjeuxIrdEncadrementDoctorants.indexOf(enjeuxIrdEncadrementDoctorant);
                          position > -1 ? this.enjeuxIrdEncadrementDoctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enjeux ird encadrement doctorant Supprimé',
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

public async loadEnjeuxIrd(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'list');
    isPermistted ? this.enjeuxIrdService.findAll().subscribe(enjeuxIrds => this.enjeuxIrds = enjeuxIrds,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrementDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnjeuxIrdEncadrementDoctorant', 'list');
    isPermistted ? this.encadrementDoctorantService.findAll().subscribe(encadrementDoctorants => this.encadrementDoctorants = encadrementDoctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnjeuxIrdEncadrementDoctorant(enjeuxIrdEncadrementDoctorant: EnjeuxIrdEncadrementDoctorantVo) {

     this.enjeuxIrdEncadrementDoctorantService.findByIdWithAssociatedList(enjeuxIrdEncadrementDoctorant).subscribe(
	 res => {
	       this.initDuplicateEnjeuxIrdEncadrementDoctorant(res);
	       this.selectedEnjeuxIrdEncadrementDoctorant = res;
	       this.selectedEnjeuxIrdEncadrementDoctorant.id = null;
            this.createEnjeuxIrdEncadrementDoctorantDialog = true;

});

	}

	initDuplicateEnjeuxIrdEncadrementDoctorant(res: EnjeuxIrdEncadrementDoctorantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enjeuxIrdEncadrementDoctorants.map(e => {
    return {
            'Enjeux ird': e.enjeuxIrdVo?.libelle ,
            'Encadrement doctorant': e.encadrementDoctorantVo?.id ,
     }
      });

      this.criteriaData = [{
        'Enjeux ird': this.searchEnjeuxIrdEncadrementDoctorant.enjeuxIrdVo?.libelle ? this.searchEnjeuxIrdEncadrementDoctorant.enjeuxIrdVo?.libelle : environment.emptyForExport ,
        'Encadrement doctorant': this.searchEnjeuxIrdEncadrementDoctorant.encadrementDoctorantVo?.id ? this.searchEnjeuxIrdEncadrementDoctorant.encadrementDoctorantVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enjeuxIrdEncadrementDoctorants(): Array<EnjeuxIrdEncadrementDoctorantVo> {
           return this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants;
       }
    set enjeuxIrdEncadrementDoctorants(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants = value;
       }

    get enjeuxIrdEncadrementDoctorantSelections(): Array<EnjeuxIrdEncadrementDoctorantVo> {
           return this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorantSelections;
       }
    set enjeuxIrdEncadrementDoctorantSelections(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorantSelections = value;
       }
   
     


    get selectedEnjeuxIrdEncadrementDoctorant():EnjeuxIrdEncadrementDoctorantVo {
           return this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant;
       }
    set selectedEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant = value;
       }
    
    get createEnjeuxIrdEncadrementDoctorantDialog():boolean {
           return this.enjeuxIrdEncadrementDoctorantService.createEnjeuxIrdEncadrementDoctorantDialog;
       }
    set createEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this.enjeuxIrdEncadrementDoctorantService.createEnjeuxIrdEncadrementDoctorantDialog= value;
       }
    
    get editEnjeuxIrdEncadrementDoctorantDialog():boolean {
           return this.enjeuxIrdEncadrementDoctorantService.editEnjeuxIrdEncadrementDoctorantDialog;
       }
    set editEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this.enjeuxIrdEncadrementDoctorantService.editEnjeuxIrdEncadrementDoctorantDialog= value;
       }
    get viewEnjeuxIrdEncadrementDoctorantDialog():boolean {
           return this.enjeuxIrdEncadrementDoctorantService.viewEnjeuxIrdEncadrementDoctorantDialog;
       }
    set viewEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this.enjeuxIrdEncadrementDoctorantService.viewEnjeuxIrdEncadrementDoctorantDialog = value;
       }
       
     get searchEnjeuxIrdEncadrementDoctorant(): EnjeuxIrdEncadrementDoctorantVo {
        return this.enjeuxIrdEncadrementDoctorantService.searchEnjeuxIrdEncadrementDoctorant;
       }
    set searchEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this.enjeuxIrdEncadrementDoctorantService.searchEnjeuxIrdEncadrementDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

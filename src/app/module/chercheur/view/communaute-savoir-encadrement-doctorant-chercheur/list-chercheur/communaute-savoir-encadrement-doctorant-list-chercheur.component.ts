import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { EncadrementDoctorantService } from '../../../../../controller/service/EncadrementDoctorant.service';

import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-encadrement-doctorant-list-chercheur',
  templateUrl: './communaute-savoir-encadrement-doctorant-list-chercheur.component.html',
  styleUrls: ['./communaute-savoir-encadrement-doctorant-list-chercheur.component.css']
})
export class CommunauteSavoirEncadrementDoctorantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirEncadrementDoctorant';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    encadrementDoctorants :Array<EncadrementDoctorantVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirEncadrementDoctorantService: CommunauteSavoirEncadrementDoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private encadrementDoctorantService: EncadrementDoctorantService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirEncadrementDoctorants();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadEncadrementDoctorant();
    }
    
    // methods
      public async loadCommunauteSavoirEncadrementDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'list');
        isPermistted ? this.communauteSavoirEncadrementDoctorantService.findAll().subscribe(communauteSavoirEncadrementDoctorants => this.communauteSavoirEncadrementDoctorants = communauteSavoirEncadrementDoctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirEncadrementDoctorantService.findByCriteria(this.searchCommunauteSavoirEncadrementDoctorant).subscribe(communauteSavoirEncadrementDoctorants=>{
            
            this.communauteSavoirEncadrementDoctorants = communauteSavoirEncadrementDoctorants;
           // this.searchCommunauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'encadrementDoctorant?.id', header: 'Encadrement doctorant'},
        ];
    }
    
    public async editCommunauteSavoirEncadrementDoctorant(communauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'edit');
         if(isPermistted){
          this.communauteSavoirEncadrementDoctorantService.findByIdWithAssociatedList(communauteSavoirEncadrementDoctorant).subscribe(res => {
           this.selectedCommunauteSavoirEncadrementDoctorant = res;
            this.editCommunauteSavoirEncadrementDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirEncadrementDoctorant(communauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'view');
        if(isPermistted){
           this.communauteSavoirEncadrementDoctorantService.findByIdWithAssociatedList(communauteSavoirEncadrementDoctorant).subscribe(res => {
           this.selectedCommunauteSavoirEncadrementDoctorant = res;
            this.viewCommunauteSavoirEncadrementDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();
            this.createCommunauteSavoirEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirEncadrementDoctorant(communauteSavoirEncadrementDoctorant:CommunauteSavoirEncadrementDoctorantVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir encadrement doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirEncadrementDoctorantService.delete(communauteSavoirEncadrementDoctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirEncadrementDoctorants.indexOf(communauteSavoirEncadrementDoctorant);
                          position > -1 ? this.communauteSavoirEncadrementDoctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir encadrement doctorant Supprimé',
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

public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrementDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementDoctorant', 'list');
    isPermistted ? this.encadrementDoctorantService.findAll().subscribe(encadrementDoctorants => this.encadrementDoctorants = encadrementDoctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirEncadrementDoctorant(communauteSavoirEncadrementDoctorant: CommunauteSavoirEncadrementDoctorantVo) {

     this.communauteSavoirEncadrementDoctorantService.findByIdWithAssociatedList(communauteSavoirEncadrementDoctorant).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirEncadrementDoctorant(res);
	       this.selectedCommunauteSavoirEncadrementDoctorant = res;
	       this.selectedCommunauteSavoirEncadrementDoctorant.id = null;
            this.createCommunauteSavoirEncadrementDoctorantDialog = true;

});

	}

	initDuplicateCommunauteSavoirEncadrementDoctorant(res: CommunauteSavoirEncadrementDoctorantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirEncadrementDoctorants.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Encadrement doctorant': e.encadrementDoctorantVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchCommunauteSavoirEncadrementDoctorant.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirEncadrementDoctorant.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Encadrement doctorant': this.searchCommunauteSavoirEncadrementDoctorant.encadrementDoctorantVo?.id ? this.searchCommunauteSavoirEncadrementDoctorant.encadrementDoctorantVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirEncadrementDoctorants(): Array<CommunauteSavoirEncadrementDoctorantVo> {
           return this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants;
       }
    set communauteSavoirEncadrementDoctorants(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants = value;
       }

    get communauteSavoirEncadrementDoctorantSelections(): Array<CommunauteSavoirEncadrementDoctorantVo> {
           return this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorantSelections;
       }
    set communauteSavoirEncadrementDoctorantSelections(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorantSelections = value;
       }
   
     


    get selectedCommunauteSavoirEncadrementDoctorant():CommunauteSavoirEncadrementDoctorantVo {
           return this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant;
       }
    set selectedCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant = value;
       }
    
    get createCommunauteSavoirEncadrementDoctorantDialog():boolean {
           return this.communauteSavoirEncadrementDoctorantService.createCommunauteSavoirEncadrementDoctorantDialog;
       }
    set createCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.createCommunauteSavoirEncadrementDoctorantDialog= value;
       }
    
    get editCommunauteSavoirEncadrementDoctorantDialog():boolean {
           return this.communauteSavoirEncadrementDoctorantService.editCommunauteSavoirEncadrementDoctorantDialog;
       }
    set editCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.editCommunauteSavoirEncadrementDoctorantDialog= value;
       }
    get viewCommunauteSavoirEncadrementDoctorantDialog():boolean {
           return this.communauteSavoirEncadrementDoctorantService.viewCommunauteSavoirEncadrementDoctorantDialog;
       }
    set viewCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.viewCommunauteSavoirEncadrementDoctorantDialog = value;
       }
       
     get searchCommunauteSavoirEncadrementDoctorant(): CommunauteSavoirEncadrementDoctorantVo {
        return this.communauteSavoirEncadrementDoctorantService.searchCommunauteSavoirEncadrementDoctorant;
       }
    set searchCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this.communauteSavoirEncadrementDoctorantService.searchCommunauteSavoirEncadrementDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {PaysRencontreMediaService} from '../../../../../controller/service/PaysRencontreMedia.service';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { PaysService } from '../../../../../controller/service/Pays.service';
import { RencontreMediaService } from '../../../../../controller/service/RencontreMedia.service';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-pays-rencontre-media-list-admin',
  templateUrl: './pays-rencontre-media-list-admin.component.html',
  styleUrls: ['./pays-rencontre-media-list-admin.component.css']
})
export class PaysRencontreMediaListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PaysRencontreMedia';
    payss :Array<PaysVo>;
    rencontreMedias :Array<RencontreMediaVo>;


    constructor(private datePipe: DatePipe, private paysRencontreMediaService: PaysRencontreMediaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private paysService: PaysService
        , private rencontreMediaService: RencontreMediaService
) { }

    ngOnInit(): void {
      this.loadPaysRencontreMedias();
      this.initExport();
      this.initCol();
      this.loadPays();
      this.loadRencontreMedia();
    }
    
    // methods
      public async loadPaysRencontreMedias(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'list');
        isPermistted ? this.paysRencontreMediaService.findAll().subscribe(paysRencontreMedias => this.paysRencontreMedias = paysRencontreMedias,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.paysRencontreMediaService.findByCriteria(this.searchPaysRencontreMedia).subscribe(paysRencontreMedias=>{
            
            this.paysRencontreMedias = paysRencontreMedias;
           // this.searchPaysRencontreMedia = new PaysRencontreMediaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'rencontreMedia?.id', header: 'Rencontre media'},
        ];
    }
    
    public async editPaysRencontreMedia(paysRencontreMedia:PaysRencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'edit');
         if(isPermistted){
          this.paysRencontreMediaService.findByIdWithAssociatedList(paysRencontreMedia).subscribe(res => {
           this.selectedPaysRencontreMedia = res;
            this.editPaysRencontreMediaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPaysRencontreMedia(paysRencontreMedia:PaysRencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'view');
        if(isPermistted){
           this.paysRencontreMediaService.findByIdWithAssociatedList(paysRencontreMedia).subscribe(res => {
           this.selectedPaysRencontreMedia = res;
            this.viewPaysRencontreMediaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePaysRencontreMedia(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPaysRencontreMedia = new PaysRencontreMediaVo();
            this.createPaysRencontreMediaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePaysRencontreMedia(paysRencontreMedia:PaysRencontreMediaVo){
       const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Pays rencontre media) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.paysRencontreMediaService.delete(paysRencontreMedia).subscribe(status=>{
                          if(status > 0){
                          const position = this.paysRencontreMedias.indexOf(paysRencontreMedia);
                          position > -1 ? this.paysRencontreMedias.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Pays rencontre media Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRencontreMedia(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaysRencontreMedia', 'list');
    isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePaysRencontreMedia(paysRencontreMedia: PaysRencontreMediaVo) {

     this.paysRencontreMediaService.findByIdWithAssociatedList(paysRencontreMedia).subscribe(
	 res => {
	       this.initDuplicatePaysRencontreMedia(res);
	       this.selectedPaysRencontreMedia = res;
	       this.selectedPaysRencontreMedia.id = null;
            this.createPaysRencontreMediaDialog = true;

});

	}

	initDuplicatePaysRencontreMedia(res: PaysRencontreMediaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.paysRencontreMedias.map(e => {
    return {
            'Pays': e.paysVo?.libelle ,
            'Rencontre media': e.rencontreMediaVo?.id ,
     }
      });

      this.criteriaData = [{
        'Pays': this.searchPaysRencontreMedia.paysVo?.libelle ? this.searchPaysRencontreMedia.paysVo?.libelle : environment.emptyForExport ,
        'Rencontre media': this.searchPaysRencontreMedia.rencontreMediaVo?.id ? this.searchPaysRencontreMedia.rencontreMediaVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get paysRencontreMedias(): Array<PaysRencontreMediaVo> {
           return this.paysRencontreMediaService.paysRencontreMedias;
       }
    set paysRencontreMedias(value: Array<PaysRencontreMediaVo>) {
        this.paysRencontreMediaService.paysRencontreMedias = value;
       }

    get paysRencontreMediaSelections(): Array<PaysRencontreMediaVo> {
           return this.paysRencontreMediaService.paysRencontreMediaSelections;
       }
    set paysRencontreMediaSelections(value: Array<PaysRencontreMediaVo>) {
        this.paysRencontreMediaService.paysRencontreMediaSelections = value;
       }
   
     


    get selectedPaysRencontreMedia():PaysRencontreMediaVo {
           return this.paysRencontreMediaService.selectedPaysRencontreMedia;
       }
    set selectedPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this.paysRencontreMediaService.selectedPaysRencontreMedia = value;
       }
    
    get createPaysRencontreMediaDialog():boolean {
           return this.paysRencontreMediaService.createPaysRencontreMediaDialog;
       }
    set createPaysRencontreMediaDialog(value: boolean) {
        this.paysRencontreMediaService.createPaysRencontreMediaDialog= value;
       }
    
    get editPaysRencontreMediaDialog():boolean {
           return this.paysRencontreMediaService.editPaysRencontreMediaDialog;
       }
    set editPaysRencontreMediaDialog(value: boolean) {
        this.paysRencontreMediaService.editPaysRencontreMediaDialog= value;
       }
    get viewPaysRencontreMediaDialog():boolean {
           return this.paysRencontreMediaService.viewPaysRencontreMediaDialog;
       }
    set viewPaysRencontreMediaDialog(value: boolean) {
        this.paysRencontreMediaService.viewPaysRencontreMediaDialog = value;
       }
       
     get searchPaysRencontreMedia(): PaysRencontreMediaVo {
        return this.paysRencontreMediaService.searchPaysRencontreMedia;
       }
    set searchPaysRencontreMedia(value: PaysRencontreMediaVo) {
        this.paysRencontreMediaService.searchPaysRencontreMedia = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

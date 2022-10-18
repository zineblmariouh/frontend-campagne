import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreMediaService} from '../../../../../controller/service/TypePubliqueRencontreMedia.service';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypePubliqueService } from '../../../../../controller/service/TypePublique.service';
import { RencontreMediaService } from '../../../../../controller/service/RencontreMedia.service';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-publique-rencontre-media-list-admin',
  templateUrl: './type-publique-rencontre-media-list-admin.component.html',
  styleUrls: ['./type-publique-rencontre-media-list-admin.component.css']
})
export class TypePubliqueRencontreMediaListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePubliqueRencontreMedia';
    typePubliques :Array<TypePubliqueVo>;
    rencontreMedias :Array<RencontreMediaVo>;


    constructor(private datePipe: DatePipe, private typePubliqueRencontreMediaService: TypePubliqueRencontreMediaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typePubliqueService: TypePubliqueService
        , private rencontreMediaService: RencontreMediaService
) { }

    ngOnInit(): void {
      this.loadTypePubliqueRencontreMedias();
      this.initExport();
      this.initCol();
      this.loadTypePublique();
      this.loadRencontreMedia();
    }
    
    // methods
      public async loadTypePubliqueRencontreMedias(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'list');
        isPermistted ? this.typePubliqueRencontreMediaService.findAll().subscribe(typePubliqueRencontreMedias => this.typePubliqueRencontreMedias = typePubliqueRencontreMedias,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePubliqueRencontreMediaService.findByCriteria(this.searchTypePubliqueRencontreMedia).subscribe(typePubliqueRencontreMedias=>{
            
            this.typePubliqueRencontreMedias = typePubliqueRencontreMedias;
           // this.searchTypePubliqueRencontreMedia = new TypePubliqueRencontreMediaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typePublique?.libelle', header: 'Type publique'},
                        {field: 'rencontreMedia?.id', header: 'Rencontre media'},
        ];
    }
    
    public async editTypePubliqueRencontreMedia(typePubliqueRencontreMedia:TypePubliqueRencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'edit');
         if(isPermistted){
          this.typePubliqueRencontreMediaService.findByIdWithAssociatedList(typePubliqueRencontreMedia).subscribe(res => {
           this.selectedTypePubliqueRencontreMedia = res;
            this.editTypePubliqueRencontreMediaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePubliqueRencontreMedia(typePubliqueRencontreMedia:TypePubliqueRencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'view');
        if(isPermistted){
           this.typePubliqueRencontreMediaService.findByIdWithAssociatedList(typePubliqueRencontreMedia).subscribe(res => {
           this.selectedTypePubliqueRencontreMedia = res;
            this.viewTypePubliqueRencontreMediaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePubliqueRencontreMedia(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePubliqueRencontreMedia = new TypePubliqueRencontreMediaVo();
            this.createTypePubliqueRencontreMediaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypePubliqueRencontreMedia(typePubliqueRencontreMedia:TypePubliqueRencontreMediaVo){
       const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type publique rencontre media) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePubliqueRencontreMediaService.delete(typePubliqueRencontreMedia).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePubliqueRencontreMedias.indexOf(typePubliqueRencontreMedia);
                          position > -1 ? this.typePubliqueRencontreMedias.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type publique rencontre media Supprimé',
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

public async loadTypePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'list');
    isPermistted ? this.typePubliqueService.findAll().subscribe(typePubliques => this.typePubliques = typePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadRencontreMedia(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreMedia', 'list');
    isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypePubliqueRencontreMedia(typePubliqueRencontreMedia: TypePubliqueRencontreMediaVo) {

     this.typePubliqueRencontreMediaService.findByIdWithAssociatedList(typePubliqueRencontreMedia).subscribe(
	 res => {
	       this.initDuplicateTypePubliqueRencontreMedia(res);
	       this.selectedTypePubliqueRencontreMedia = res;
	       this.selectedTypePubliqueRencontreMedia.id = null;
            this.createTypePubliqueRencontreMediaDialog = true;

});

	}

	initDuplicateTypePubliqueRencontreMedia(res: TypePubliqueRencontreMediaVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typePubliqueRencontreMedias.map(e => {
    return {
            'Type publique': e.typePubliqueVo?.libelle ,
            'Rencontre media': e.rencontreMediaVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type publique': this.searchTypePubliqueRencontreMedia.typePubliqueVo?.libelle ? this.searchTypePubliqueRencontreMedia.typePubliqueVo?.libelle : environment.emptyForExport ,
        'Rencontre media': this.searchTypePubliqueRencontreMedia.rencontreMediaVo?.id ? this.searchTypePubliqueRencontreMedia.rencontreMediaVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePubliqueRencontreMedias(): Array<TypePubliqueRencontreMediaVo> {
           return this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias;
       }
    set typePubliqueRencontreMedias(value: Array<TypePubliqueRencontreMediaVo>) {
        this.typePubliqueRencontreMediaService.typePubliqueRencontreMedias = value;
       }

    get typePubliqueRencontreMediaSelections(): Array<TypePubliqueRencontreMediaVo> {
           return this.typePubliqueRencontreMediaService.typePubliqueRencontreMediaSelections;
       }
    set typePubliqueRencontreMediaSelections(value: Array<TypePubliqueRencontreMediaVo>) {
        this.typePubliqueRencontreMediaService.typePubliqueRencontreMediaSelections = value;
       }
   
     


    get selectedTypePubliqueRencontreMedia():TypePubliqueRencontreMediaVo {
           return this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia;
       }
    set selectedTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this.typePubliqueRencontreMediaService.selectedTypePubliqueRencontreMedia = value;
       }
    
    get createTypePubliqueRencontreMediaDialog():boolean {
           return this.typePubliqueRencontreMediaService.createTypePubliqueRencontreMediaDialog;
       }
    set createTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.createTypePubliqueRencontreMediaDialog= value;
       }
    
    get editTypePubliqueRencontreMediaDialog():boolean {
           return this.typePubliqueRencontreMediaService.editTypePubliqueRencontreMediaDialog;
       }
    set editTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.editTypePubliqueRencontreMediaDialog= value;
       }
    get viewTypePubliqueRencontreMediaDialog():boolean {
           return this.typePubliqueRencontreMediaService.viewTypePubliqueRencontreMediaDialog;
       }
    set viewTypePubliqueRencontreMediaDialog(value: boolean) {
        this.typePubliqueRencontreMediaService.viewTypePubliqueRencontreMediaDialog = value;
       }
       
     get searchTypePubliqueRencontreMedia(): TypePubliqueRencontreMediaVo {
        return this.typePubliqueRencontreMediaService.searchTypePubliqueRencontreMedia;
       }
    set searchTypePubliqueRencontreMedia(value: TypePubliqueRencontreMediaVo) {
        this.typePubliqueRencontreMediaService.searchTypePubliqueRencontreMedia = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

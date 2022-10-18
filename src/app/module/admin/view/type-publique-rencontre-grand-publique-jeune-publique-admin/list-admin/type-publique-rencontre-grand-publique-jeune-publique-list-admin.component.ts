import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import { TypePubliqueService } from '../../../../../controller/service/TypePublique.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-publique-rencontre-grand-publique-jeune-publique-list-admin',
  templateUrl: './type-publique-rencontre-grand-publique-jeune-publique-list-admin.component.html',
  styleUrls: ['./type-publique-rencontre-grand-publique-jeune-publique-list-admin.component.css']
})
export class TypePubliqueRencontreGrandPubliqueJeunePubliqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePubliqueRencontreGrandPubliqueJeunePublique';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;
    typePubliques :Array<TypePubliqueVo>;


    constructor(private datePipe: DatePipe, private typePubliqueRencontreGrandPubliqueJeunePubliqueService: TypePubliqueRencontreGrandPubliqueJeunePubliqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
        , private typePubliqueService: TypePubliqueService
) { }

    ngOnInit(): void {
      this.loadTypePubliqueRencontreGrandPubliqueJeunePubliques();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
      this.loadTypePublique();
    }
    
    // methods
      public async loadTypePubliqueRencontreGrandPubliqueJeunePubliques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'list');
        isPermistted ? this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(typePubliqueRencontreGrandPubliqueJeunePubliques => this.typePubliqueRencontreGrandPubliqueJeunePubliques = typePubliqueRencontreGrandPubliqueJeunePubliques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.findByCriteria(this.searchTypePubliqueRencontreGrandPubliqueJeunePublique).subscribe(typePubliqueRencontreGrandPubliqueJeunePubliques=>{
            
            this.typePubliqueRencontreGrandPubliqueJeunePubliques = typePubliqueRencontreGrandPubliqueJeunePubliques;
           // this.searchTypePubliqueRencontreGrandPubliqueJeunePublique = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                        {field: 'typePublique?.libelle', header: 'Type publique'},
        ];
    }
    
    public async editTypePubliqueRencontreGrandPubliqueJeunePublique(typePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'edit');
         if(isPermistted){
          this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(typePubliqueRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = res;
            this.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePubliqueRencontreGrandPubliqueJeunePublique(typePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'view');
        if(isPermistted){
           this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(typePubliqueRencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = res;
            this.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePubliqueRencontreGrandPubliqueJeunePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
            this.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypePubliqueRencontreGrandPubliqueJeunePublique(typePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo){
       const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type publique rencontre grand publique jeune publique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.delete(typePubliqueRencontreGrandPubliqueJeunePublique).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePubliqueRencontreGrandPubliqueJeunePubliques.indexOf(typePubliqueRencontreGrandPubliqueJeunePublique);
                          position > -1 ? this.typePubliqueRencontreGrandPubliqueJeunePubliques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type publique rencontre grand publique jeune publique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypePubliqueRencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.typePubliqueService.findAll().subscribe(typePubliques => this.typePubliques = typePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypePubliqueRencontreGrandPubliqueJeunePublique(typePubliqueRencontreGrandPubliqueJeunePublique: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {

     this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(typePubliqueRencontreGrandPubliqueJeunePublique).subscribe(
	 res => {
	       this.initDuplicateTypePubliqueRencontreGrandPubliqueJeunePublique(res);
	       this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = res;
	       this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique.id = null;
            this.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = true;

});

	}

	initDuplicateTypePubliqueRencontreGrandPubliqueJeunePublique(res: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typePubliqueRencontreGrandPubliqueJeunePubliques.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
            'Type publique': e.typePubliqueVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchTypePubliqueRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchTypePubliqueRencontreGrandPubliqueJeunePublique.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
        'Type publique': this.searchTypePubliqueRencontreGrandPubliqueJeunePublique.typePubliqueVo?.libelle ? this.searchTypePubliqueRencontreGrandPubliqueJeunePublique.typePubliqueVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePubliqueRencontreGrandPubliqueJeunePubliques(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques;
       }
    set typePubliqueRencontreGrandPubliqueJeunePubliques(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques = value;
       }

    get typePubliqueRencontreGrandPubliqueJeunePubliqueSelections(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliqueSelections;
       }
    set typePubliqueRencontreGrandPubliqueJeunePubliqueSelections(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliqueSelections = value;
       }
   
     


    get selectedTypePubliqueRencontreGrandPubliqueJeunePublique():TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
       }
    set selectedTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }
    
    get createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    
    get editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    get viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = value;
       }
       
     get searchTypePubliqueRencontreGrandPubliqueJeunePublique(): TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
        return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.searchTypePubliqueRencontreGrandPubliqueJeunePublique;
       }
    set searchTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.searchTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

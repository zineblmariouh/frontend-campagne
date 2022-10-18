import {Component, OnInit} from '@angular/core';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeOutilService } from '../../../../../controller/service/TypeOutil.service';
import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';

import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-outil-pedagogique-list-chercheur',
  templateUrl: './type-outil-pedagogique-list-chercheur.component.html',
  styleUrls: ['./type-outil-pedagogique-list-chercheur.component.css']
})
export class TypeOutilPedagogiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeOutilPedagogique';
    typeOutils :Array<TypeOutilVo>;
    outilPedagogiques :Array<OutilPedagogiqueVo>;


    constructor(private datePipe: DatePipe, private typeOutilPedagogiqueService: TypeOutilPedagogiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeOutilService: TypeOutilService
        , private outilPedagogiqueService: OutilPedagogiqueService
) { }

    ngOnInit(): void {
      this.loadTypeOutilPedagogiques();
      this.initExport();
      this.initCol();
      this.loadTypeOutil();
      this.loadOutilPedagogique();
    }
    
    // methods
      public async loadTypeOutilPedagogiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'list');
        isPermistted ? this.typeOutilPedagogiqueService.findAll().subscribe(typeOutilPedagogiques => this.typeOutilPedagogiques = typeOutilPedagogiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeOutilPedagogiqueService.findByCriteria(this.searchTypeOutilPedagogique).subscribe(typeOutilPedagogiques=>{
            
            this.typeOutilPedagogiques = typeOutilPedagogiques;
           // this.searchTypeOutilPedagogique = new TypeOutilPedagogiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeOutil?.libelle', header: 'Type outil'},
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
        ];
    }
    
    public async editTypeOutilPedagogique(typeOutilPedagogique:TypeOutilPedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'edit');
         if(isPermistted){
          this.typeOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilPedagogique).subscribe(res => {
           this.selectedTypeOutilPedagogique = res;
            this.editTypeOutilPedagogiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeOutilPedagogique(typeOutilPedagogique:TypeOutilPedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'view');
        if(isPermistted){
           this.typeOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilPedagogique).subscribe(res => {
           this.selectedTypeOutilPedagogique = res;
            this.viewTypeOutilPedagogiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeOutilPedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeOutilPedagogique = new TypeOutilPedagogiqueVo();
            this.createTypeOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeOutilPedagogique(typeOutilPedagogique:TypeOutilPedagogiqueVo){
       const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type outil pedagogique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeOutilPedagogiqueService.delete(typeOutilPedagogique).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeOutilPedagogiques.indexOf(typeOutilPedagogique);
                          position > -1 ? this.typeOutilPedagogiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type outil pedagogique Supprimé',
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

public async loadTypeOutil(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'list');
    isPermistted ? this.typeOutilService.findAll().subscribe(typeOutils => this.typeOutils = typeOutils,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeOutilPedagogique', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeOutilPedagogique(typeOutilPedagogique: TypeOutilPedagogiqueVo) {

     this.typeOutilPedagogiqueService.findByIdWithAssociatedList(typeOutilPedagogique).subscribe(
	 res => {
	       this.initDuplicateTypeOutilPedagogique(res);
	       this.selectedTypeOutilPedagogique = res;
	       this.selectedTypeOutilPedagogique.id = null;
            this.createTypeOutilPedagogiqueDialog = true;

});

	}

	initDuplicateTypeOutilPedagogique(res: TypeOutilPedagogiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeOutilPedagogiques.map(e => {
    return {
            'Type outil': e.typeOutilVo?.libelle ,
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type outil': this.searchTypeOutilPedagogique.typeOutilVo?.libelle ? this.searchTypeOutilPedagogique.typeOutilVo?.libelle : environment.emptyForExport ,
        'Outil pedagogique': this.searchTypeOutilPedagogique.outilPedagogiqueVo?.id ? this.searchTypeOutilPedagogique.outilPedagogiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeOutilPedagogiques(): Array<TypeOutilPedagogiqueVo> {
           return this.typeOutilPedagogiqueService.typeOutilPedagogiques;
       }
    set typeOutilPedagogiques(value: Array<TypeOutilPedagogiqueVo>) {
        this.typeOutilPedagogiqueService.typeOutilPedagogiques = value;
       }

    get typeOutilPedagogiqueSelections(): Array<TypeOutilPedagogiqueVo> {
           return this.typeOutilPedagogiqueService.typeOutilPedagogiqueSelections;
       }
    set typeOutilPedagogiqueSelections(value: Array<TypeOutilPedagogiqueVo>) {
        this.typeOutilPedagogiqueService.typeOutilPedagogiqueSelections = value;
       }
   
     


    get selectedTypeOutilPedagogique():TypeOutilPedagogiqueVo {
           return this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique;
       }
    set selectedTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique = value;
       }
    
    get createTypeOutilPedagogiqueDialog():boolean {
           return this.typeOutilPedagogiqueService.createTypeOutilPedagogiqueDialog;
       }
    set createTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.createTypeOutilPedagogiqueDialog= value;
       }
    
    get editTypeOutilPedagogiqueDialog():boolean {
           return this.typeOutilPedagogiqueService.editTypeOutilPedagogiqueDialog;
       }
    set editTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.editTypeOutilPedagogiqueDialog= value;
       }
    get viewTypeOutilPedagogiqueDialog():boolean {
           return this.typeOutilPedagogiqueService.viewTypeOutilPedagogiqueDialog;
       }
    set viewTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.viewTypeOutilPedagogiqueDialog = value;
       }
       
     get searchTypeOutilPedagogique(): TypeOutilPedagogiqueVo {
        return this.typeOutilPedagogiqueService.searchTypeOutilPedagogique;
       }
    set searchTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this.typeOutilPedagogiqueService.searchTypeOutilPedagogique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

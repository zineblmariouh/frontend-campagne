import {Component, OnInit} from '@angular/core';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
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
  selector: 'app-type-publique-list-chercheur',
  templateUrl: './type-publique-list-chercheur.component.html',
  styleUrls: ['./type-publique-list-chercheur.component.css']
})
export class TypePubliqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypePublique';


    constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadTypePubliques();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadTypePubliques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'list');
        isPermistted ? this.typePubliqueService.findAll().subscribe(typePubliques => this.typePubliques = typePubliques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typePubliqueService.findByCriteria(this.searchTypePublique).subscribe(typePubliques=>{
            
            this.typePubliques = typePubliques;
           // this.searchTypePublique = new TypePubliqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editTypePublique(typePublique:TypePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'edit');
         if(isPermistted){
          this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(res => {
           this.selectedTypePublique = res;
            this.editTypePubliqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypePublique(typePublique:TypePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('TypePublique', 'view');
        if(isPermistted){
           this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(res => {
           this.selectedTypePublique = res;
            this.viewTypePubliqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypePublique = new TypePubliqueVo();
            this.createTypePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypePublique(typePublique:TypePubliqueVo){
       const isPermistted = await this.roleService.isPermitted('TypePublique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type publique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typePubliqueService.delete(typePublique).subscribe(status=>{
                          if(status > 0){
                          const position = this.typePubliques.indexOf(typePublique);
                          position > -1 ? this.typePubliques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type publique Supprimé',
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


public async duplicateTypePublique(typePublique: TypePubliqueVo) {

     this.typePubliqueService.findByIdWithAssociatedList(typePublique).subscribe(
	 res => {
	       this.initDuplicateTypePublique(res);
	       this.selectedTypePublique = res;
	       this.selectedTypePublique.id = null;
            this.createTypePubliqueDialog = true;

});

	}

	initDuplicateTypePublique(res: TypePubliqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typePubliques.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchTypePublique.libelle ? this.searchTypePublique.libelle : environment.emptyForExport ,
            'Code': this.searchTypePublique.code ? this.searchTypePublique.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typePubliques(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
    set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }

    get typePubliqueSelections(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliqueSelections;
       }
    set typePubliqueSelections(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliqueSelections = value;
       }
   
     


    get selectedTypePublique():TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
    
    get createTypePubliqueDialog():boolean {
           return this.typePubliqueService.createTypePubliqueDialog;
       }
    set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
       }
    
    get editTypePubliqueDialog():boolean {
           return this.typePubliqueService.editTypePubliqueDialog;
       }
    set editTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.editTypePubliqueDialog= value;
       }
    get viewTypePubliqueDialog():boolean {
           return this.typePubliqueService.viewTypePubliqueDialog;
       }
    set viewTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.viewTypePubliqueDialog = value;
       }
       
     get searchTypePublique(): TypePubliqueVo {
        return this.typePubliqueService.searchTypePublique;
       }
    set searchTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.searchTypePublique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

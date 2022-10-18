import {Component, OnInit} from '@angular/core';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import { TypeSavoirService } from '../../../../../controller/service/TypeSavoir.service';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-savoir-developpement-de-savoir-et-innovation-scientifique-list-admin',
  templateUrl: './type-savoir-developpement-de-savoir-et-innovation-scientifique-list-admin.component.html',
  styleUrls: ['./type-savoir-developpement-de-savoir-et-innovation-scientifique-list-admin.component.css']
})
export class TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeSavoirDeveloppementDeSavoirEtInnovationScientifique';
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;
    typeSavoirs :Array<TypeSavoirVo>;


    constructor(private datePipe: DatePipe, private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
        , private typeSavoirService: TypeSavoirService
) { }

    ngOnInit(): void {
      this.loadTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques();
      this.initExport();
      this.initCol();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
      this.loadTypeSavoir();
    }
    
    // methods
      public async loadTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(typeSavoirDeveloppementDeSavoirEtInnovationScientifiques => this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = typeSavoirDeveloppementDeSavoirEtInnovationScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.findByCriteria(this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique).subscribe(typeSavoirDeveloppementDeSavoirEtInnovationScientifiques=>{
            
            this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = typeSavoirDeveloppementDeSavoirEtInnovationScientifiques;
           // this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
                        {field: 'typeSavoir?.libelle', header: 'Type savoir'},
        ];
    }
    
    public async editTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(typeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'edit');
         if(isPermistted){
          this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(typeSavoirDeveloppementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = res;
            this.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(typeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'view');
        if(isPermistted){
           this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(typeSavoirDeveloppementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = res;
            this.viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
            this.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(typeSavoirDeveloppementDeSavoirEtInnovationScientifique:TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type savoir developpement de savoir et innovation scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.delete(typeSavoirDeveloppementDeSavoirEtInnovationScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.indexOf(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
                          position > -1 ? this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type savoir developpement de savoir et innovation scientifique Supprimé',
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

public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeSavoirDeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.typeSavoirService.findAll().subscribe(typeSavoirs => this.typeSavoirs = typeSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(typeSavoirDeveloppementDeSavoirEtInnovationScientifique: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {

     this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(typeSavoirDeveloppementDeSavoirEtInnovationScientifique).subscribe(
	 res => {
	       this.initDuplicateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(res);
	       this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = res;
	       this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.id = null;
            this.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;

});

	}

	initDuplicateTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(res: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.map(e => {
    return {
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
            'Type savoir': e.typeSavoirVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Developpement de savoir et innovation scientifique': this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
        'Type savoir': this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.typeSavoirVo?.libelle ? this.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.typeSavoirVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques;
       }
    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections;
       }
    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueSelections = value;
       }
   
     


    get selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique():TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }
    
    get createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.createTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    
    get editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    get viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.viewTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }
       
     get searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(): TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
       }
    set searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.searchTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

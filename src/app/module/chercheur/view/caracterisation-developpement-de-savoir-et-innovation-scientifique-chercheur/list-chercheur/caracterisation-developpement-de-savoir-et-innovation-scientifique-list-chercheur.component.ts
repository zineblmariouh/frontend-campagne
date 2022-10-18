import {Component, OnInit} from '@angular/core';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.service';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CaracterisationService } from '../../../../../controller/service/Caracterisation.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-caracterisation-developpement-de-savoir-et-innovation-scientifique-list-chercheur',
  templateUrl: './caracterisation-developpement-de-savoir-et-innovation-scientifique-list-chercheur.component.html',
  styleUrls: ['./caracterisation-developpement-de-savoir-et-innovation-scientifique-list-chercheur.component.css']
})
export class CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CaracterisationDeveloppementDeSavoirEtInnovationScientifique';
    caracterisations :Array<CaracterisationVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private caracterisationService: CaracterisationService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadCaracterisationDeveloppementDeSavoirEtInnovationScientifiques();
      this.initExport();
      this.initCol();
      this.loadCaracterisation();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadCaracterisationDeveloppementDeSavoirEtInnovationScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(caracterisationDeveloppementDeSavoirEtInnovationScientifiques => this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques = caracterisationDeveloppementDeSavoirEtInnovationScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.findByCriteria(this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique).subscribe(caracterisationDeveloppementDeSavoirEtInnovationScientifiques=>{
            
            this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques = caracterisationDeveloppementDeSavoirEtInnovationScientifiques;
           // this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique = new CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'caracterisation?.libelle', header: 'Caracterisation'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editCaracterisationDeveloppementDeSavoirEtInnovationScientifique(caracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'edit');
         if(isPermistted){
          this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(caracterisationDeveloppementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = res;
            this.editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCaracterisationDeveloppementDeSavoirEtInnovationScientifique(caracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'view');
        if(isPermistted){
           this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(caracterisationDeveloppementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = res;
            this.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCaracterisationDeveloppementDeSavoirEtInnovationScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = new CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo();
            this.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCaracterisationDeveloppementDeSavoirEtInnovationScientifique(caracterisationDeveloppementDeSavoirEtInnovationScientifique:CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Caracterisation developpement de savoir et innovation scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.delete(caracterisationDeveloppementDeSavoirEtInnovationScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques.indexOf(caracterisationDeveloppementDeSavoirEtInnovationScientifique);
                          position > -1 ? this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Caracterisation developpement de savoir et innovation scientifique Supprimé',
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

public async loadCaracterisation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.caracterisationService.findAll().subscribe(caracterisations => this.caracterisations = caracterisations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CaracterisationDeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCaracterisationDeveloppementDeSavoirEtInnovationScientifique(caracterisationDeveloppementDeSavoirEtInnovationScientifique: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {

     this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(caracterisationDeveloppementDeSavoirEtInnovationScientifique).subscribe(
	 res => {
	       this.initDuplicateCaracterisationDeveloppementDeSavoirEtInnovationScientifique(res);
	       this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = res;
	       this.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique.id = null;
            this.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;

});

	}

	initDuplicateCaracterisationDeveloppementDeSavoirEtInnovationScientifique(res: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.caracterisationDeveloppementDeSavoirEtInnovationScientifiques.map(e => {
    return {
            'Caracterisation': e.caracterisationVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Caracterisation': this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique.caracterisationVo?.libelle ? this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique.caracterisationVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get caracterisationDeveloppementDeSavoirEtInnovationScientifiques(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques;
       }
    set caracterisationDeveloppementDeSavoirEtInnovationScientifiques(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

    get caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections;
       }
    set caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueSelections = value;
       }
   
     


    get selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique():CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }
    
    get createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.createCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    
    get editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.editCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    get viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }
       
     get searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique(): CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
       }
    set searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.searchCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

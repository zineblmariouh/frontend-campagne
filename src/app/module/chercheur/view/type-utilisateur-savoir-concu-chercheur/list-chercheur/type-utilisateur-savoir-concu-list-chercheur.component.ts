import {Component, OnInit} from '@angular/core';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { TypeUtilisateurService } from '../../../../../controller/service/TypeUtilisateur.service';
import { DeveloppementDeSavoirEtInnovationScientifiqueService } from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-type-utilisateur-savoir-concu-list-chercheur',
  templateUrl: './type-utilisateur-savoir-concu-list-chercheur.component.html',
  styleUrls: ['./type-utilisateur-savoir-concu-list-chercheur.component.css']
})
export class TypeUtilisateurSavoirConcuListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeUtilisateurSavoirConcu';
    typeUtilisateurs :Array<TypeUtilisateurVo>;
    developpementDeSavoirEtInnovationScientifiques :Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>;


    constructor(private datePipe: DatePipe, private typeUtilisateurSavoirConcuService: TypeUtilisateurSavoirConcuService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private typeUtilisateurService: TypeUtilisateurService
        , private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) { }

    ngOnInit(): void {
      this.loadTypeUtilisateurSavoirConcus();
      this.initExport();
      this.initCol();
      this.loadTypeUtilisateur();
      this.loadDeveloppementDeSavoirEtInnovationScientifique();
    }
    
    // methods
      public async loadTypeUtilisateurSavoirConcus(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'list');
        isPermistted ? this.typeUtilisateurSavoirConcuService.findAll().subscribe(typeUtilisateurSavoirConcus => this.typeUtilisateurSavoirConcus = typeUtilisateurSavoirConcus,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.typeUtilisateurSavoirConcuService.findByCriteria(this.searchTypeUtilisateurSavoirConcu).subscribe(typeUtilisateurSavoirConcus=>{
            
            this.typeUtilisateurSavoirConcus = typeUtilisateurSavoirConcus;
           // this.searchTypeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'typeUtilisateur?.libelle', header: 'Type utilisateur'},
                        {field: 'developpementDeSavoirEtInnovationScientifique?.id', header: 'Developpement de savoir et innovation scientifique'},
        ];
    }
    
    public async editTypeUtilisateurSavoirConcu(typeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo){
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'edit');
         if(isPermistted){
          this.typeUtilisateurSavoirConcuService.findByIdWithAssociatedList(typeUtilisateurSavoirConcu).subscribe(res => {
           this.selectedTypeUtilisateurSavoirConcu = res;
            this.editTypeUtilisateurSavoirConcuDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewTypeUtilisateurSavoirConcu(typeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo){
        const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'view');
        if(isPermistted){
           this.typeUtilisateurSavoirConcuService.findByIdWithAssociatedList(typeUtilisateurSavoirConcu).subscribe(res => {
           this.selectedTypeUtilisateurSavoirConcu = res;
            this.viewTypeUtilisateurSavoirConcuDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateTypeUtilisateurSavoirConcu(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedTypeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();
            this.createTypeUtilisateurSavoirConcuDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteTypeUtilisateurSavoirConcu(typeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo){
       const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Type utilisateur savoir concu) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.typeUtilisateurSavoirConcuService.delete(typeUtilisateurSavoirConcu).subscribe(status=>{
                          if(status > 0){
                          const position = this.typeUtilisateurSavoirConcus.indexOf(typeUtilisateurSavoirConcu);
                          position > -1 ? this.typeUtilisateurSavoirConcus.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Type utilisateur savoir concu Supprimé',
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

public async loadTypeUtilisateur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'list');
    isPermistted ? this.typeUtilisateurService.findAll().subscribe(typeUtilisateurs => this.typeUtilisateurs = typeUtilisateurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDeveloppementDeSavoirEtInnovationScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('TypeUtilisateurSavoirConcu', 'list');
    isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateTypeUtilisateurSavoirConcu(typeUtilisateurSavoirConcu: TypeUtilisateurSavoirConcuVo) {

     this.typeUtilisateurSavoirConcuService.findByIdWithAssociatedList(typeUtilisateurSavoirConcu).subscribe(
	 res => {
	       this.initDuplicateTypeUtilisateurSavoirConcu(res);
	       this.selectedTypeUtilisateurSavoirConcu = res;
	       this.selectedTypeUtilisateurSavoirConcu.id = null;
            this.createTypeUtilisateurSavoirConcuDialog = true;

});

	}

	initDuplicateTypeUtilisateurSavoirConcu(res: TypeUtilisateurSavoirConcuVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.typeUtilisateurSavoirConcus.map(e => {
    return {
            'Type utilisateur': e.typeUtilisateurVo?.libelle ,
            'Developpement de savoir et innovation scientifique': e.developpementDeSavoirEtInnovationScientifiqueVo?.id ,
     }
      });

      this.criteriaData = [{
        'Type utilisateur': this.searchTypeUtilisateurSavoirConcu.typeUtilisateurVo?.libelle ? this.searchTypeUtilisateurSavoirConcu.typeUtilisateurVo?.libelle : environment.emptyForExport ,
        'Developpement de savoir et innovation scientifique': this.searchTypeUtilisateurSavoirConcu.developpementDeSavoirEtInnovationScientifiqueVo?.id ? this.searchTypeUtilisateurSavoirConcu.developpementDeSavoirEtInnovationScientifiqueVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get typeUtilisateurSavoirConcus(): Array<TypeUtilisateurSavoirConcuVo> {
           return this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus;
       }
    set typeUtilisateurSavoirConcus(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcus = value;
       }

    get typeUtilisateurSavoirConcuSelections(): Array<TypeUtilisateurSavoirConcuVo> {
           return this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcuSelections;
       }
    set typeUtilisateurSavoirConcuSelections(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this.typeUtilisateurSavoirConcuService.typeUtilisateurSavoirConcuSelections = value;
       }
   
     


    get selectedTypeUtilisateurSavoirConcu():TypeUtilisateurSavoirConcuVo {
           return this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu;
       }
    set selectedTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this.typeUtilisateurSavoirConcuService.selectedTypeUtilisateurSavoirConcu = value;
       }
    
    get createTypeUtilisateurSavoirConcuDialog():boolean {
           return this.typeUtilisateurSavoirConcuService.createTypeUtilisateurSavoirConcuDialog;
       }
    set createTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.createTypeUtilisateurSavoirConcuDialog= value;
       }
    
    get editTypeUtilisateurSavoirConcuDialog():boolean {
           return this.typeUtilisateurSavoirConcuService.editTypeUtilisateurSavoirConcuDialog;
       }
    set editTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.editTypeUtilisateurSavoirConcuDialog= value;
       }
    get viewTypeUtilisateurSavoirConcuDialog():boolean {
           return this.typeUtilisateurSavoirConcuService.viewTypeUtilisateurSavoirConcuDialog;
       }
    set viewTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this.typeUtilisateurSavoirConcuService.viewTypeUtilisateurSavoirConcuDialog = value;
       }
       
     get searchTypeUtilisateurSavoirConcu(): TypeUtilisateurSavoirConcuVo {
        return this.typeUtilisateurSavoirConcuService.searchTypeUtilisateurSavoirConcu;
       }
    set searchTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this.typeUtilisateurSavoirConcuService.searchTypeUtilisateurSavoirConcu = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RoleDeveloppementDeSavoirService } from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import { SavoirEtInnovationService } from '../../../../../controller/service/SavoirEtInnovation.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-list-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-list-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-list-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DeveloppementDeSavoirEtInnovationScientifique';
    roleDeveloppementDeSavoirs :Array<RoleDeveloppementDeSavoirVo>;
    savoirEtInnovations :Array<SavoirEtInnovationVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
        , private savoirEtInnovationService: SavoirEtInnovationService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadDeveloppementDeSavoirEtInnovationScientifiques();
      this.initExport();
      this.initCol();
      this.loadRoleDeveloppementDeSavoir();
      this.loadSavoirEtInnovation();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadDeveloppementDeSavoirEtInnovationScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
        isPermistted ? this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe(developpementDeSavoirEtInnovationScientifiques => this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.developpementDeSavoirEtInnovationScientifiqueService.findByCriteria(this.searchDeveloppementDeSavoirEtInnovationScientifique).subscribe(developpementDeSavoirEtInnovationScientifiques=>{
            
            this.developpementDeSavoirEtInnovationScientifiques = developpementDeSavoirEtInnovationScientifiques;
           // this.searchDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'titreInstrument', header: 'Titre instrument'},
                        {field: 'roleDeveloppementDeSavoir?.libelle', header: 'Role developpement de savoir'},
                            {field: 'anneeMiseEnOeuvre', header: 'Annee mise en oeuvre'},
                            {field: 'lienWeb', header: 'Lien web'},
                        {field: 'savoirEtInnovation?.id', header: 'Savoir et innovation'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique:DeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'edit');
         if(isPermistted){
          this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
            this.editDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique:DeveloppementDeSavoirEtInnovationScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'view');
        if(isPermistted){
           this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(res => {
           this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
            this.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDeveloppementDeSavoirEtInnovationScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique:DeveloppementDeSavoirEtInnovationScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Developpement de savoir et innovation scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.developpementDeSavoirEtInnovationScientifiqueService.delete(developpementDeSavoirEtInnovationScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.developpementDeSavoirEtInnovationScientifiques.indexOf(developpementDeSavoirEtInnovationScientifique);
                          position > -1 ? this.developpementDeSavoirEtInnovationScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Developpement de savoir et innovation scientifique Supprimé',
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

public async loadRoleDeveloppementDeSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.roleDeveloppementDeSavoirService.findAll().subscribe(roleDeveloppementDeSavoirs => this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadSavoirEtInnovation(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.savoirEtInnovationService.findAll().subscribe(savoirEtInnovations => this.savoirEtInnovations = savoirEtInnovations,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: DeveloppementDeSavoirEtInnovationScientifiqueVo) {

     this.developpementDeSavoirEtInnovationScientifiqueService.findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifique).subscribe(
	 res => {
	       this.initDuplicateDeveloppementDeSavoirEtInnovationScientifique(res);
	       this.selectedDeveloppementDeSavoirEtInnovationScientifique = res;
	       this.selectedDeveloppementDeSavoirEtInnovationScientifique.id = null;
            this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;

});

	}

	initDuplicateDeveloppementDeSavoirEtInnovationScientifique(res: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        if (res.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo != null) {
             res.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.typeUtilisateurSavoirConcusVo != null) {
             res.typeUtilisateurSavoirConcusVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo != null) {
             res.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo != null) {
             res.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo != null) {
             res.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo != null) {
             res.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiquePayssVo != null) {
             res.developpementDeSavoirEtInnovationScientifiquePayssVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }
        if (res.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo != null) {
             res.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.forEach(d => { d.developpementDeSavoirEtInnovationScientifiqueVo = null; d.id = null; });
                }


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.developpementDeSavoirEtInnovationScientifiques.map(e => {
    return {
                    'Titre instrument': e.titreInstrument ,
            'Role developpement de savoir': e.roleDeveloppementDeSavoirVo?.libelle ,
                    'Annee mise en oeuvre': e.anneeMiseEnOeuvre ,
                    'Lien web': e.lienWeb ,
            'Savoir et innovation': e.savoirEtInnovationVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Titre instrument': this.searchDeveloppementDeSavoirEtInnovationScientifique.titreInstrument ? this.searchDeveloppementDeSavoirEtInnovationScientifique.titreInstrument : environment.emptyForExport ,
        'Role developpement de savoir': this.searchDeveloppementDeSavoirEtInnovationScientifique.roleDeveloppementDeSavoirVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifique.roleDeveloppementDeSavoirVo?.libelle : environment.emptyForExport ,
            'Annee mise en oeuvre Min': this.searchDeveloppementDeSavoirEtInnovationScientifique.anneeMiseEnOeuvreMin ? this.searchDeveloppementDeSavoirEtInnovationScientifique.anneeMiseEnOeuvreMin : environment.emptyForExport ,
            'Annee mise en oeuvre Max': this.searchDeveloppementDeSavoirEtInnovationScientifique.anneeMiseEnOeuvreMax ? this.searchDeveloppementDeSavoirEtInnovationScientifique.anneeMiseEnOeuvreMax : environment.emptyForExport ,
            'Lien web': this.searchDeveloppementDeSavoirEtInnovationScientifique.lienWeb ? this.searchDeveloppementDeSavoirEtInnovationScientifique.lienWeb : environment.emptyForExport ,
        'Savoir et innovation': this.searchDeveloppementDeSavoirEtInnovationScientifique.savoirEtInnovationVo?.id ? this.searchDeveloppementDeSavoirEtInnovationScientifique.savoirEtInnovationVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchDeveloppementDeSavoirEtInnovationScientifique.etatEtapeCampagneVo?.libelle ? this.searchDeveloppementDeSavoirEtInnovationScientifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
    set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiqueSelections;
       }
    set developpementDeSavoirEtInnovationScientifiqueSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiqueSelections = value;
       }
   
     


    get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
    
    get createDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    
    get editDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }
    get viewDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }
       
     get searchDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
        return this.developpementDeSavoirEtInnovationScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifique;
       }
    set searchDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.searchDeveloppementDeSavoirEtInnovationScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

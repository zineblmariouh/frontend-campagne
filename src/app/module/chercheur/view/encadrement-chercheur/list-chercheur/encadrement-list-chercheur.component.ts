import {Component, OnInit} from '@angular/core';
import {EncadrementService} from '../../../../../controller/service/Encadrement.service';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CampagneService } from '../../../../../controller/service/Campagne.service';
import { ChercheurService } from '../../../../../controller/service/Chercheur.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-encadrement-list-chercheur',
  templateUrl: './encadrement-list-chercheur.component.html',
  styleUrls: ['./encadrement-list-chercheur.component.css']
})
export class EncadrementListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Encadrement';
    campagnes :Array<CampagneVo>;
    chercheurs :Array<ChercheurVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private encadrementService: EncadrementService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadEncadrements();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadChercheur();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadEncadrements(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Encadrement', 'list');
        isPermistted ? this.encadrementService.findAll().subscribe(encadrements => this.encadrements = encadrements,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToEncadrementCreate(){
this.router.navigate(['/app/chercheur/encadrement/create']);
}


  public searchRequest(){
        this.encadrementService.findByCriteria(this.searchEncadrement).subscribe(encadrements=>{
            
            this.encadrements = encadrements;
           // this.searchEncadrement = new EncadrementVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'annee', header: 'Annee'},
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editEncadrement(encadrement:EncadrementVo){
        const isPermistted = await this.roleService.isPermitted('Encadrement', 'edit');
         if(isPermistted){
          this.encadrementService.findByIdWithAssociatedList(encadrement).subscribe(res => {
           this.selectedEncadrement = res;
            this.navigateToEncadrementCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEncadrement(encadrement:EncadrementVo){
        const isPermistted = await this.roleService.isPermitted('Encadrement', 'view');
        if(isPermistted){
           this.encadrementService.findByIdWithAssociatedList(encadrement).subscribe(res => {
           this.selectedEncadrement = res;
            this.viewEncadrementDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEncadrement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEncadrement = new EncadrementVo();
            this.navigateToEncadrementCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEncadrement(encadrement:EncadrementVo){
       const isPermistted = await this.roleService.isPermitted('Encadrement', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Encadrement) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.encadrementService.delete(encadrement).subscribe(status=>{
                          if(status > 0){
                          const position = this.encadrements.indexOf(encadrement);
                          position > -1 ? this.encadrements.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Encadrement Supprimé',
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

public async loadCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Encadrement', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Encadrement', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Encadrement', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEncadrement(encadrement: EncadrementVo) {

     this.encadrementService.findByIdWithAssociatedList(encadrement).subscribe(
	 res => {
	       this.initDuplicateEncadrement(res);
	       this.selectedEncadrement = res;
	       this.selectedEncadrement.id = null;
            this.navigateToEncadrementCreate() ;

});

	}

	initDuplicateEncadrement(res: EncadrementVo) {
        if (res.encadrementEtudiantsVo != null) {
             res.encadrementEtudiantsVo.forEach(d => { d.encadrementVo = null; d.id = null; });
                }
        if (res.encadrementDoctorantsVo != null) {
             res.encadrementDoctorantsVo.forEach(d => { d.encadrementVo = null; d.id = null; });
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
    this.exportData = this.encadrements.map(e => {
    return {
                    'Annee': e.annee ,
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Campagne': e.campagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Annee Min': this.searchEncadrement.anneeMin ? this.searchEncadrement.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchEncadrement.anneeMax ? this.searchEncadrement.anneeMax : environment.emptyForExport ,
            'Temps estime pour cette annne Min': this.searchEncadrement.tempsEstimePourCetteAnnneMin ? this.searchEncadrement.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchEncadrement.tempsEstimePourCetteAnnneMax ? this.searchEncadrement.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Campagne': this.searchEncadrement.campagneVo?.libelle ? this.searchEncadrement.campagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchEncadrement.chercheurVo?.numeroMatricule ? this.searchEncadrement.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Etat etape campagne': this.searchEncadrement.etatEtapeCampagneVo?.libelle ? this.searchEncadrement.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get encadrements(): Array<EncadrementVo> {
           return this.encadrementService.encadrements;
       }
    set encadrements(value: Array<EncadrementVo>) {
        this.encadrementService.encadrements = value;
       }

    get encadrementSelections(): Array<EncadrementVo> {
           return this.encadrementService.encadrementSelections;
       }
    set encadrementSelections(value: Array<EncadrementVo>) {
        this.encadrementService.encadrementSelections = value;
       }
   
     


    get selectedEncadrement():EncadrementVo {
           return this.encadrementService.selectedEncadrement;
       }
    set selectedEncadrement(value: EncadrementVo) {
        this.encadrementService.selectedEncadrement = value;
       }
    
    get createEncadrementDialog():boolean {
           return this.encadrementService.createEncadrementDialog;
       }
    set createEncadrementDialog(value: boolean) {
        this.encadrementService.createEncadrementDialog= value;
       }
    
    get editEncadrementDialog():boolean {
           return this.encadrementService.editEncadrementDialog;
       }
    set editEncadrementDialog(value: boolean) {
        this.encadrementService.editEncadrementDialog= value;
       }
    get viewEncadrementDialog():boolean {
           return this.encadrementService.viewEncadrementDialog;
       }
    set viewEncadrementDialog(value: boolean) {
        this.encadrementService.viewEncadrementDialog = value;
       }
       
     get searchEncadrement(): EncadrementVo {
        return this.encadrementService.searchEncadrement;
       }
    set searchEncadrement(value: EncadrementVo) {
        this.encadrementService.searchEncadrement = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

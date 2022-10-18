import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleService} from '../../../../../controller/service/VieInstitutionnelle.service';
import {VieInstitutionnelleVo} from '../../../../../controller/model/VieInstitutionnelle.model';
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

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-vie-institutionnelle-list-admin',
  templateUrl: './vie-institutionnelle-list-admin.component.html',
  styleUrls: ['./vie-institutionnelle-list-admin.component.css']
})
export class VieInstitutionnelleListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'VieInstitutionnelle';
    campagnes :Array<CampagneVo>;
    chercheurs :Array<ChercheurVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private vieInstitutionnelleService: VieInstitutionnelleService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadVieInstitutionnelles();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadChercheur();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
    public async loadVieInstitutionnelles(){
       const chercheur = this.authService.authenticatedUserByAdmin();
        await this.roleService.findAll();
        if (chercheur !== null){
            const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
            isPermistted ? this.vieInstitutionnelleService.findByChercheurId(chercheur.id).subscribe(vieInstitutionnelles => this.vieInstitutionnelles = vieInstitutionnelles,error => console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});}
        else{
            const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
            isPermistted ? this.vieInstitutionnelleService.findAll().subscribe(vieInstitutionnelles => this.vieInstitutionnelles = vieInstitutionnelles,error=>console.log(error))
                : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        }
    }


  public searchRequest(){
        this.vieInstitutionnelleService.findByCriteria(this.searchVieInstitutionnelle).subscribe(vieInstitutionnelles=>{
            
            this.vieInstitutionnelles = vieInstitutionnelles;
           // this.searchVieInstitutionnelle = new VieInstitutionnelleVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'tempsEstime', header: 'Temps estime'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                            {field: 'annee', header: 'Annee'},
        ];
    }
    
    public async editVieInstitutionnelle(vieInstitutionnelle:VieInstitutionnelleVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'edit');
         if(isPermistted){
          this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(res => {
           this.selectedVieInstitutionnelle = res;
            this.editVieInstitutionnelleDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewVieInstitutionnelle(vieInstitutionnelle:VieInstitutionnelleVo){
        const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'view');
        if(isPermistted){
           this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(res => {
           this.selectedVieInstitutionnelle = res;
            this.viewVieInstitutionnelleDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateVieInstitutionnelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedVieInstitutionnelle = new VieInstitutionnelleVo();
            this.createVieInstitutionnelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteVieInstitutionnelle(vieInstitutionnelle:VieInstitutionnelleVo){
       const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Vie institutionnelle) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.vieInstitutionnelleService.delete(vieInstitutionnelle).subscribe(status=>{
                          if(status > 0){
                          const position = this.vieInstitutionnelles.indexOf(vieInstitutionnelle);
                          position > -1 ? this.vieInstitutionnelles.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Vie institutionnelle Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('VieInstitutionnelle', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateVieInstitutionnelle(vieInstitutionnelle: VieInstitutionnelleVo) {

     this.vieInstitutionnelleService.findByIdWithAssociatedList(vieInstitutionnelle).subscribe(
	 res => {
	       this.initDuplicateVieInstitutionnelle(res);
	       this.selectedVieInstitutionnelle = res;
	       this.selectedVieInstitutionnelle.id = null;
            this.createVieInstitutionnelleDialog = true;

});

	}

	initDuplicateVieInstitutionnelle(res: VieInstitutionnelleVo) {
        if (res.vieInstitutionnelleDetailsVo != null) {
             res.vieInstitutionnelleDetailsVo.forEach(d => { d.vieInstitutionnelleVo = null; d.id = null; });
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
    this.exportData = this.vieInstitutionnelles.map(e => {
    return {
                    'Temps estime': e.tempsEstime ,
            'Campagne': e.campagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
                    'Annee': e.annee ,
     }
      });

      this.criteriaData = [{
            'Temps estime Min': this.searchVieInstitutionnelle.tempsEstimeMin ? this.searchVieInstitutionnelle.tempsEstimeMin : environment.emptyForExport ,
            'Temps estime Max': this.searchVieInstitutionnelle.tempsEstimeMax ? this.searchVieInstitutionnelle.tempsEstimeMax : environment.emptyForExport ,
        'Campagne': this.searchVieInstitutionnelle.campagneVo?.libelle ? this.searchVieInstitutionnelle.campagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchVieInstitutionnelle.chercheurVo?.numeroMatricule ? this.searchVieInstitutionnelle.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Etat etape campagne': this.searchVieInstitutionnelle.etatEtapeCampagneVo?.libelle ? this.searchVieInstitutionnelle.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
            'Annee Min': this.searchVieInstitutionnelle.anneeMin ? this.searchVieInstitutionnelle.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchVieInstitutionnelle.anneeMax ? this.searchVieInstitutionnelle.anneeMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get vieInstitutionnelles(): Array<VieInstitutionnelleVo> {
           return this.vieInstitutionnelleService.vieInstitutionnelles;
       }
    set vieInstitutionnelles(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelles = value;
       }

    get vieInstitutionnelleSelections(): Array<VieInstitutionnelleVo> {
           return this.vieInstitutionnelleService.vieInstitutionnelleSelections;
       }
    set vieInstitutionnelleSelections(value: Array<VieInstitutionnelleVo>) {
        this.vieInstitutionnelleService.vieInstitutionnelleSelections = value;
       }
   
     


    get selectedVieInstitutionnelle():VieInstitutionnelleVo {
           return this.vieInstitutionnelleService.selectedVieInstitutionnelle;
       }
    set selectedVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.selectedVieInstitutionnelle = value;
       }
    
    get createVieInstitutionnelleDialog():boolean {
           return this.vieInstitutionnelleService.createVieInstitutionnelleDialog;
       }
    set createVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.createVieInstitutionnelleDialog= value;
       }
    
    get editVieInstitutionnelleDialog():boolean {
           return this.vieInstitutionnelleService.editVieInstitutionnelleDialog;
       }
    set editVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.editVieInstitutionnelleDialog= value;
       }
    get viewVieInstitutionnelleDialog():boolean {
           return this.vieInstitutionnelleService.viewVieInstitutionnelleDialog;
       }
    set viewVieInstitutionnelleDialog(value: boolean) {
        this.vieInstitutionnelleService.viewVieInstitutionnelleDialog = value;
       }
       
     get searchVieInstitutionnelle(): VieInstitutionnelleVo {
        return this.vieInstitutionnelleService.searchVieInstitutionnelle;
       }
    set searchVieInstitutionnelle(value: VieInstitutionnelleVo) {
        this.vieInstitutionnelleService.searchVieInstitutionnelle = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CultureScientifiqueService } from '../../../../../controller/service/CultureScientifique.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-list-admin',
  templateUrl: './outil-pedagogique-list-admin.component.html',
  styleUrls: ['./outil-pedagogique-list-admin.component.css']
})
export class OutilPedagogiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogique';
     yesOrNoDisponnibleNumerique :any[] =[];
     yesOrNoLienInstrumentIrd :any[] =[];
    cultureScientifiques :Array<CultureScientifiqueVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueService: OutilPedagogiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private cultureScientifiqueService: CultureScientifiqueService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiques();
      this.initExport();
      this.initCol();
      this.loadCultureScientifique();
      this.loadEtatEtapeCampagne();
    this.yesOrNoDisponnibleNumerique =  [{label: 'DisponnibleNumerique', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoLienInstrumentIrd =  [{label: 'LienInstrumentIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadOutilPedagogiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'list');
        isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueService.findByCriteria(this.searchOutilPedagogique).subscribe(outilPedagogiques=>{
            
            this.outilPedagogiques = outilPedagogiques;
           // this.searchOutilPedagogique = new OutilPedagogiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'nom', header: 'Nom'},
                            {field: 'roleOutilPedagogique', header: 'Role outil pedagogique'},
                            {field: 'dateDiffusion', header: 'Date diffusion'},
                            {field: 'disponnibleNumerique', header: 'Disponnible numerique'},
                            {field: 'lienWeb', header: 'Lien web'},
                            {field: 'lienInstrumentIrd', header: 'Lien instrument ird'},
                            {field: 'partenaireEventuel', header: 'Partenaire eventuel'},
                        {field: 'cultureScientifique?.id', header: 'Culture scientifique'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editOutilPedagogique(outilPedagogique:OutilPedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'edit');
         if(isPermistted){
          this.outilPedagogiqueService.findByIdWithAssociatedList(outilPedagogique).subscribe(res => {
           this.selectedOutilPedagogique = res;
            this.selectedOutilPedagogique.dateDiffusion = new Date(outilPedagogique.dateDiffusion);
            this.editOutilPedagogiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogique(outilPedagogique:OutilPedagogiqueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'view');
        if(isPermistted){
           this.outilPedagogiqueService.findByIdWithAssociatedList(outilPedagogique).subscribe(res => {
           this.selectedOutilPedagogique = res;
            this.selectedOutilPedagogique.dateDiffusion = new Date(outilPedagogique.dateDiffusion);
            this.viewOutilPedagogiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
            this.createOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogique(outilPedagogique:OutilPedagogiqueVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueService.delete(outilPedagogique).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiques.indexOf(outilPedagogique);
                          position > -1 ? this.outilPedagogiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique Supprimé',
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

public async loadCultureScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'list');
    isPermistted ? this.cultureScientifiqueService.findAll().subscribe(cultureScientifiques => this.cultureScientifiques = cultureScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogique(outilPedagogique: OutilPedagogiqueVo) {

     this.outilPedagogiqueService.findByIdWithAssociatedList(outilPedagogique).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogique(res);
	       this.selectedOutilPedagogique = res;
	       this.selectedOutilPedagogique.id = null;
            this.createOutilPedagogiqueDialog = true;

});

	}

	initDuplicateOutilPedagogique(res: OutilPedagogiqueVo) {
        if (res.outilPedagogiqueEnjeuxIrdsVo != null) {
             res.outilPedagogiqueEnjeuxIrdsVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiqueDisciplineScientifiquesVo != null) {
             res.outilPedagogiqueDisciplineScientifiquesVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiquePubliqueCiblesVo != null) {
             res.outilPedagogiquePubliqueCiblesVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.typeOutilPedagogiquesVo != null) {
             res.typeOutilPedagogiquesVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiqueLanguesVo != null) {
             res.outilPedagogiqueLanguesVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiquePaysConceptionsVo != null) {
             res.outilPedagogiquePaysConceptionsVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiquePaysDiffusionsVo != null) {
             res.outilPedagogiquePaysDiffusionsVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiqueInstrumentIrdsVo != null) {
             res.outilPedagogiqueInstrumentIrdsVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiqueTypeInstrumentIrdsVo != null) {
             res.outilPedagogiqueTypeInstrumentIrdsVo.forEach(d => { d.outilPedagogiqueVo = null; d.id = null; });
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
    this.exportData = this.outilPedagogiques.map(e => {
    return {
                    'Nom': e.nom ,
                    'Role outil pedagogique': e.roleOutilPedagogique ,
                    'Date diffusion': this.datePipe.transform(e.dateDiffusion , 'dd-MM-yyyy'),
                    'Disponnible numerique': e.disponnibleNumerique? 'Vrai' : 'Faux' ,
                    'Lien web': e.lienWeb ,
                    'Lien instrument ird': e.lienInstrumentIrd? 'Vrai' : 'Faux' ,
                    'Partenaire eventuel': e.partenaireEventuel ,
                    'Remarque': e.remarque ,
            'Culture scientifique': e.cultureScientifiqueVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Nom': this.searchOutilPedagogique.nom ? this.searchOutilPedagogique.nom : environment.emptyForExport ,
            'Role outil pedagogique': this.searchOutilPedagogique.roleOutilPedagogique ? this.searchOutilPedagogique.roleOutilPedagogique : environment.emptyForExport ,
            'Date diffusion Min': this.searchOutilPedagogique.dateDiffusionMin ? this.datePipe.transform(this.searchOutilPedagogique.dateDiffusionMin , this.dateFormat) : environment.emptyForExport ,
            'Date diffusion Max': this.searchOutilPedagogique.dateDiffusionMax ? this.datePipe.transform(this.searchOutilPedagogique.dateDiffusionMax , this.dateFormat) : environment.emptyForExport ,
            'Disponnible numerique': this.searchOutilPedagogique.disponnibleNumerique ? (this.searchOutilPedagogique.disponnibleNumerique ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Lien web': this.searchOutilPedagogique.lienWeb ? this.searchOutilPedagogique.lienWeb : environment.emptyForExport ,
            'Lien instrument ird': this.searchOutilPedagogique.lienInstrumentIrd ? (this.searchOutilPedagogique.lienInstrumentIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Partenaire eventuel': this.searchOutilPedagogique.partenaireEventuel ? this.searchOutilPedagogique.partenaireEventuel : environment.emptyForExport ,
            'Remarque': this.searchOutilPedagogique.remarque ? this.searchOutilPedagogique.remarque : environment.emptyForExport ,
        'Culture scientifique': this.searchOutilPedagogique.cultureScientifiqueVo?.id ? this.searchOutilPedagogique.cultureScientifiqueVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchOutilPedagogique.etatEtapeCampagneVo?.libelle ? this.searchOutilPedagogique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
    set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }

    get outilPedagogiqueSelections(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiqueSelections;
       }
    set outilPedagogiqueSelections(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiqueSelections = value;
       }
   
     


    get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
    set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
    
    get createOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
    set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
       }
    
    get editOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.editOutilPedagogiqueDialog;
       }
    set editOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.editOutilPedagogiqueDialog= value;
       }
    get viewOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.viewOutilPedagogiqueDialog;
       }
    set viewOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.viewOutilPedagogiqueDialog = value;
       }
       
     get searchOutilPedagogique(): OutilPedagogiqueVo {
        return this.outilPedagogiqueService.searchOutilPedagogique;
       }
    set searchOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.searchOutilPedagogique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormatRencontreService } from '../../../../../controller/service/FormatRencontre.service';
import { ContexteService } from '../../../../../controller/service/Contexte.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { CultureScientifiqueService } from '../../../../../controller/service/CultureScientifique.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {StructureOganisatriceVo} from '../../../../../controller/model/StructureOganisatrice.model';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-list-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-list-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-list-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePublique';
     yesOrNoLienInstrumentIrd :any[] =[];
    formatRencontres :Array<FormatRencontreVo>;
    contextes :Array<ContexteVo>;
    payss :Array<PaysVo>;
    cultureScientifiques :Array<CultureScientifiqueVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formatRencontreService: FormatRencontreService
        , private contexteService: ContexteService
        , private paysService: PaysService
        , private cultureScientifiqueService: CultureScientifiqueService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliques();
      this.initExport();
      this.initCol();
      this.loadFormatRencontre();
      this.loadContexte();
      this.loadPays();
      this.loadCultureScientifique();
      this.loadEtatEtapeCampagne();
    this.yesOrNoLienInstrumentIrd =  [{label: 'LienInstrumentIrd', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliqueService.findByCriteria(this.searchRencontreGrandPubliqueJeunePublique).subscribe(rencontreGrandPubliqueJeunePubliques=>{
            
            this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques;
           // this.searchRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formatRencontre?.libelle', header: 'Format rencontre'},
                            {field: 'intituleSujet', header: 'Intitule sujet'},
                            {field: 'nombrePersonneEstime', header: 'Nombre personne estime'},
                        {field: 'contexte?.libelle', header: 'Contexte'},
                            {field: 'lienInstrumentIrd', header: 'Lien instrument ird'},
                        {field: 'pays?.libelle', header: 'Pays'},
                            {field: 'lienWeb', header: 'Lien web'},
                        {field: 'cultureScientifique?.id', header: 'Culture scientifique'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePublique = res;
            this.editRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePublique).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePublique = res;
            this.viewRencontreGrandPubliqueJeunePubliqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePublique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
            this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique:RencontreGrandPubliqueJeunePubliqueVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliqueService.delete(rencontreGrandPubliqueJeunePublique).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliques.indexOf(rencontreGrandPubliqueJeunePublique);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique Supprimé',
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

public async loadFormatRencontre(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.formatRencontreService.findAll().subscribe(formatRencontres => this.formatRencontres = formatRencontres,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadContexte(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.contexteService.findAll().subscribe(contextes => this.contextes = contextes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCultureScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.cultureScientifiqueService.findAll().subscribe(cultureScientifiques => this.cultureScientifiques = cultureScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: RencontreGrandPubliqueJeunePubliqueVo) {

     this.rencontreGrandPubliqueJeunePubliqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePublique).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePublique(res);
	       this.selectedRencontreGrandPubliqueJeunePublique = res;
	       this.selectedRencontreGrandPubliqueJeunePublique.id = null;
            this.createRencontreGrandPubliqueJeunePubliqueDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePublique(res: RencontreGrandPubliqueJeunePubliqueVo) {
        if (res.typePubliqueRencontreGrandPubliqueJeunePubliquesVo != null) {
             res.typePubliqueRencontreGrandPubliqueJeunePubliquesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo != null) {
             res.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdsVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo != null) {
             res.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiquesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.rencontreGrandPubliqueJeunePubliquePeriodesVo != null) {
             res.rencontreGrandPubliqueJeunePubliquePeriodesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.structureOganisatricesVo != null) {
             res.structureOganisatricesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.paysRencontreGrandPubliqueJeunePubliquesVo != null) {
             res.paysRencontreGrandPubliqueJeunePubliquesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo != null) {
             res.paysOrganisateurRencontreGrandPubliqueJeunePubliquesVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo != null) {
             res.rencontreGrandPubliqueJeunePubliqueInstrumentIrdsVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
                }
        if (res.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo != null) {
             res.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdsVo.forEach(d => { d.rencontreGrandPubliqueJeunePubliqueVo = null; d.id = null; });
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
    this.exportData = this.rencontreGrandPubliqueJeunePubliques.map(e => {
    return {
            'Format rencontre': e.formatRencontreVo?.libelle ,
                    'Intitule sujet': e.intituleSujet ,
                    'Nombre personne estime': e.nombrePersonneEstime ,
            'Contexte': e.contexteVo?.libelle ,
                    'Lien instrument ird': e.lienInstrumentIrd? 'Vrai' : 'Faux' ,
            'Pays': e.paysVo?.libelle ,
                    'Lien web': e.lienWeb ,
                    'Remarque': e.remarque ,
            'Culture scientifique': e.cultureScientifiqueVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Format rencontre': this.searchRencontreGrandPubliqueJeunePublique.formatRencontreVo?.libelle ? this.searchRencontreGrandPubliqueJeunePublique.formatRencontreVo?.libelle : environment.emptyForExport ,
            'Intitule sujet': this.searchRencontreGrandPubliqueJeunePublique.intituleSujet ? this.searchRencontreGrandPubliqueJeunePublique.intituleSujet : environment.emptyForExport ,
            'Nombre personne estime Min': this.searchRencontreGrandPubliqueJeunePublique.nombrePersonneEstimeMin ? this.searchRencontreGrandPubliqueJeunePublique.nombrePersonneEstimeMin : environment.emptyForExport ,
            'Nombre personne estime Max': this.searchRencontreGrandPubliqueJeunePublique.nombrePersonneEstimeMax ? this.searchRencontreGrandPubliqueJeunePublique.nombrePersonneEstimeMax : environment.emptyForExport ,
        'Contexte': this.searchRencontreGrandPubliqueJeunePublique.contexteVo?.libelle ? this.searchRencontreGrandPubliqueJeunePublique.contexteVo?.libelle : environment.emptyForExport ,
            'Lien instrument ird': this.searchRencontreGrandPubliqueJeunePublique.lienInstrumentIrd ? (this.searchRencontreGrandPubliqueJeunePublique.lienInstrumentIrd ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
        'Pays': this.searchRencontreGrandPubliqueJeunePublique.paysVo?.libelle ? this.searchRencontreGrandPubliqueJeunePublique.paysVo?.libelle : environment.emptyForExport ,
            'Lien web': this.searchRencontreGrandPubliqueJeunePublique.lienWeb ? this.searchRencontreGrandPubliqueJeunePublique.lienWeb : environment.emptyForExport ,
            'Remarque': this.searchRencontreGrandPubliqueJeunePublique.remarque ? this.searchRencontreGrandPubliqueJeunePublique.remarque : environment.emptyForExport ,
        'Culture scientifique': this.searchRencontreGrandPubliqueJeunePublique.cultureScientifiqueVo?.id ? this.searchRencontreGrandPubliqueJeunePublique.cultureScientifiqueVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchRencontreGrandPubliqueJeunePublique.etatEtapeCampagneVo?.libelle ? this.searchRencontreGrandPubliqueJeunePublique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
    set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }

    get rencontreGrandPubliqueJeunePubliqueSelections(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliqueSelections;
       }
    set rencontreGrandPubliqueJeunePubliqueSelections(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliqueSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePublique():RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
    set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.viewRencontreGrandPubliqueJeunePubliqueDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.viewRencontreGrandPubliqueJeunePubliqueDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
        return this.rencontreGrandPubliqueJeunePubliqueService.searchRencontreGrandPubliqueJeunePublique;
       }
    set searchRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.searchRencontreGrandPubliqueJeunePublique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

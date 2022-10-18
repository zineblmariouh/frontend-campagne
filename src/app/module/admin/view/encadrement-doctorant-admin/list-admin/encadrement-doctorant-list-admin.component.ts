import {Component, OnInit} from '@angular/core';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { ResponsabiliteEncadrementDoctorantService } from '../../../../../controller/service/ResponsabiliteEncadrementDoctorant.service';
import { FinancementDoctorantService } from '../../../../../controller/service/FinancementDoctorant.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { DoctorantService } from '../../../../../controller/service/Doctorant.service';
import { EncadrementService } from '../../../../../controller/service/Encadrement.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {DoctorantVo} from '../../../../../controller/model/Doctorant.model';
import {ResponsabiliteEncadrementDoctorantVo} from '../../../../../controller/model/ResponsabiliteEncadrementDoctorant.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-encadrement-doctorant-list-admin',
  templateUrl: './encadrement-doctorant-list-admin.component.html',
  styleUrls: ['./encadrement-doctorant-list-admin.component.css']
})
export class EncadrementDoctorantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EncadrementDoctorant';
     yesOrNoCodirectionInternationale :any[] =[];
     yesOrNoCursus :any[] =[];
    responsabiliteEncadrementDoctorants :Array<ResponsabiliteEncadrementDoctorantVo>;
    financementDoctorants :Array<FinancementDoctorantVo>;
    etablissements :Array<EtablissementVo>;
    payss :Array<PaysVo>;
    doctorants :Array<DoctorantVo>;
    encadrements :Array<EncadrementVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private encadrementDoctorantService: EncadrementDoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private responsabiliteEncadrementDoctorantService: ResponsabiliteEncadrementDoctorantService
        , private financementDoctorantService: FinancementDoctorantService
        , private etablissementService: EtablissementService
        , private paysService: PaysService
        , private doctorantService: DoctorantService
        , private encadrementService: EncadrementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadEncadrementDoctorants();
      this.initExport();
      this.initCol();
      this.loadResponsabiliteEncadrementDoctorant();
      this.loadFinancementDoctorant();
      this.loadEtablissement();
      this.loadPays();
      this.loadDoctorant();
      this.loadEncadrement();
      this.loadEtatEtapeCampagne();
    this.yesOrNoCodirectionInternationale =  [{label: 'CodirectionInternationale', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoCursus =  [{label: 'Cursus', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadEncadrementDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
        isPermistted ? this.encadrementDoctorantService.findAll().subscribe(encadrementDoctorants => this.encadrementDoctorants = encadrementDoctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.encadrementDoctorantService.findByCriteria(this.searchEncadrementDoctorant).subscribe(encadrementDoctorants=>{
            
            this.encadrementDoctorants = encadrementDoctorants;
           // this.searchEncadrementDoctorant = new EncadrementDoctorantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'responsabiliteEncadrementDoctorant?.libelle', header: 'Responsabilite encadrement doctorant'},
                            {field: 'codirectionInternationale', header: 'Codirection internationale'},
                            {field: 'cursus', header: 'Cursus'},
                            {field: 'sujetThese', header: 'Sujet these'},
                            {field: 'dateDebutThese', header: 'Date debut these'},
                            {field: 'datePrevuSoutenanceThese', header: 'Date prevu soutenance these'},
                            {field: 'intituleEcoleDoctorale', header: 'Intitule ecole doctorale'},
                        {field: 'financementDoctorant?.libelle', header: 'Financement doctorant'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'doctorant?.id', header: 'Doctorant'},
                        {field: 'encadrement?.id', header: 'Encadrement'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editEncadrementDoctorant(encadrementDoctorant:EncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'edit');
         if(isPermistted){
          this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(res => {
           this.selectedEncadrementDoctorant = res;
            this.selectedEncadrementDoctorant.dateDebutThese = new Date(encadrementDoctorant.dateDebutThese);
            this.selectedEncadrementDoctorant.datePrevuSoutenanceThese = new Date(encadrementDoctorant.datePrevuSoutenanceThese);
            this.editEncadrementDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEncadrementDoctorant(encadrementDoctorant:EncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'view');
        if(isPermistted){
           this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(res => {
           this.selectedEncadrementDoctorant = res;
            this.selectedEncadrementDoctorant.dateDebutThese = new Date(encadrementDoctorant.dateDebutThese);
            this.selectedEncadrementDoctorant.datePrevuSoutenanceThese = new Date(encadrementDoctorant.datePrevuSoutenanceThese);
            this.viewEncadrementDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
            this.createEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEncadrementDoctorant(encadrementDoctorant:EncadrementDoctorantVo){
       const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Encadrement doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.encadrementDoctorantService.delete(encadrementDoctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.encadrementDoctorants.indexOf(encadrementDoctorant);
                          position > -1 ? this.encadrementDoctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Encadrement doctorant Supprimé',
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

public async loadResponsabiliteEncadrementDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.responsabiliteEncadrementDoctorantService.findAll().subscribe(responsabiliteEncadrementDoctorants => this.responsabiliteEncadrementDoctorants = responsabiliteEncadrementDoctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFinancementDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.financementDoctorantService.findAll().subscribe(financementDoctorants => this.financementDoctorants = financementDoctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.doctorantService.findAll().subscribe(doctorants => this.doctorants = doctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.encadrementService.findAll().subscribe(encadrements => this.encadrements = encadrements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEncadrementDoctorant(encadrementDoctorant: EncadrementDoctorantVo) {

     this.encadrementDoctorantService.findByIdWithAssociatedList(encadrementDoctorant).subscribe(
	 res => {
	       this.initDuplicateEncadrementDoctorant(res);
	       this.selectedEncadrementDoctorant = res;
	       this.selectedEncadrementDoctorant.id = null;
            this.createEncadrementDoctorantDialog = true;

});

	}

	initDuplicateEncadrementDoctorant(res: EncadrementDoctorantVo) {
        if (res.enjeuxIrdEncadrementDoctorantsVo != null) {
             res.enjeuxIrdEncadrementDoctorantsVo.forEach(d => { d.encadrementDoctorantVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueEncadrementDoctorantsVo != null) {
             res.disciplineScientifiqueEncadrementDoctorantsVo.forEach(d => { d.encadrementDoctorantVo = null; d.id = null; });
                }
        if (res.communauteSavoirEncadrementDoctorantsVo != null) {
             res.communauteSavoirEncadrementDoctorantsVo.forEach(d => { d.encadrementDoctorantVo = null; d.id = null; });
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
    this.exportData = this.encadrementDoctorants.map(e => {
    return {
            'Responsabilite encadrement doctorant': e.responsabiliteEncadrementDoctorantVo?.libelle ,
                    'Codirection internationale': e.codirectionInternationale? 'Vrai' : 'Faux' ,
                    'Cursus': e.cursus? 'Vrai' : 'Faux' ,
                    'Sujet these': e.sujetThese ,
                    'Date debut these': this.datePipe.transform(e.dateDebutThese , 'dd-MM-yyyy'),
                    'Date prevu soutenance these': this.datePipe.transform(e.datePrevuSoutenanceThese , 'dd-MM-yyyy'),
                    'Intitule ecole doctorale': e.intituleEcoleDoctorale ,
            'Financement doctorant': e.financementDoctorantVo?.libelle ,
            'Etablissement': e.etablissementVo?.libelle ,
            'Pays': e.paysVo?.libelle ,
            'Doctorant': e.doctorantVo?.id ,
            'Encadrement': e.encadrementVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Responsabilite encadrement doctorant': this.searchEncadrementDoctorant.responsabiliteEncadrementDoctorantVo?.libelle ? this.searchEncadrementDoctorant.responsabiliteEncadrementDoctorantVo?.libelle : environment.emptyForExport ,
            'Codirection internationale': this.searchEncadrementDoctorant.codirectionInternationale ? (this.searchEncadrementDoctorant.codirectionInternationale ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Cursus': this.searchEncadrementDoctorant.cursus ? (this.searchEncadrementDoctorant.cursus ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Sujet these': this.searchEncadrementDoctorant.sujetThese ? this.searchEncadrementDoctorant.sujetThese : environment.emptyForExport ,
            'Date debut these Min': this.searchEncadrementDoctorant.dateDebutTheseMin ? this.datePipe.transform(this.searchEncadrementDoctorant.dateDebutTheseMin , this.dateFormat) : environment.emptyForExport ,
            'Date debut these Max': this.searchEncadrementDoctorant.dateDebutTheseMax ? this.datePipe.transform(this.searchEncadrementDoctorant.dateDebutTheseMax , this.dateFormat) : environment.emptyForExport ,
            'Date prevu soutenance these Min': this.searchEncadrementDoctorant.datePrevuSoutenanceTheseMin ? this.datePipe.transform(this.searchEncadrementDoctorant.datePrevuSoutenanceTheseMin , this.dateFormat) : environment.emptyForExport ,
            'Date prevu soutenance these Max': this.searchEncadrementDoctorant.datePrevuSoutenanceTheseMax ? this.datePipe.transform(this.searchEncadrementDoctorant.datePrevuSoutenanceTheseMax , this.dateFormat) : environment.emptyForExport ,
            'Intitule ecole doctorale': this.searchEncadrementDoctorant.intituleEcoleDoctorale ? this.searchEncadrementDoctorant.intituleEcoleDoctorale : environment.emptyForExport ,
        'Financement doctorant': this.searchEncadrementDoctorant.financementDoctorantVo?.libelle ? this.searchEncadrementDoctorant.financementDoctorantVo?.libelle : environment.emptyForExport ,
        'Etablissement': this.searchEncadrementDoctorant.etablissementVo?.libelle ? this.searchEncadrementDoctorant.etablissementVo?.libelle : environment.emptyForExport ,
        'Pays': this.searchEncadrementDoctorant.paysVo?.libelle ? this.searchEncadrementDoctorant.paysVo?.libelle : environment.emptyForExport ,
        'Doctorant': this.searchEncadrementDoctorant.doctorantVo?.id ? this.searchEncadrementDoctorant.doctorantVo?.id : environment.emptyForExport ,
        'Encadrement': this.searchEncadrementDoctorant.encadrementVo?.id ? this.searchEncadrementDoctorant.encadrementVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchEncadrementDoctorant.etatEtapeCampagneVo?.libelle ? this.searchEncadrementDoctorant.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
    set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }

    get encadrementDoctorantSelections(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorantSelections;
       }
    set encadrementDoctorantSelections(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorantSelections = value;
       }
   
     


    get selectedEncadrementDoctorant():EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
    set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
    
    get createEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
       }
    set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
       }
    
    get editEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.editEncadrementDoctorantDialog;
       }
    set editEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.editEncadrementDoctorantDialog= value;
       }
    get viewEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.viewEncadrementDoctorantDialog;
       }
    set viewEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.viewEncadrementDoctorantDialog = value;
       }
       
     get searchEncadrementDoctorant(): EncadrementDoctorantVo {
        return this.encadrementDoctorantService.searchEncadrementDoctorant;
       }
    set searchEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.searchEncadrementDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

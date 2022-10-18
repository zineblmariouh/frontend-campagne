import {Component, OnInit} from '@angular/core';
import {CultureScientifiqueService} from '../../../../../controller/service/CultureScientifique.service';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
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
import { NatureActiviteGrandPubliqueService } from '../../../../../controller/service/NatureActiviteGrandPublique.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {NatureActiviteGrandPubliqueVo} from '../../../../../controller/model/NatureActiviteGrandPublique.model';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-culture-scientifique-list-chercheur',
  templateUrl: './culture-scientifique-list-chercheur.component.html',
  styleUrls: ['./culture-scientifique-list-chercheur.component.css']
})
export class CultureScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CultureScientifique';
    campagnes :Array<CampagneVo>;
    chercheurs :Array<ChercheurVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;
    natureActiviteGrandPubliques :Array<NatureActiviteGrandPubliqueVo>;


    constructor(private datePipe: DatePipe, private cultureScientifiqueService: CultureScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private campagneService: CampagneService
        , private chercheurService: ChercheurService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
        , private natureActiviteGrandPubliqueService: NatureActiviteGrandPubliqueService
) { }

    ngOnInit(): void {
      this.loadCultureScientifiques();
      this.initExport();
      this.initCol();
      this.loadCampagne();
      this.loadChercheur();
      this.loadEtatEtapeCampagne();
      this.loadNatureActiviteGrandPublique();
    }
    
    // methods
      public async loadCultureScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'list');
        isPermistted ? this.cultureScientifiqueService.findAll().subscribe(cultureScientifiques => this.cultureScientifiques = cultureScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }
navigateToCultureScientifiqueCreate(){
this.router.navigate(['/app/chercheur/cultureScientifique/create']);
}


  public searchRequest(){
        this.cultureScientifiqueService.findByCriteria(this.searchCultureScientifique).subscribe(cultureScientifiques=>{
            
            this.cultureScientifiques = cultureScientifiques;
           // this.searchCultureScientifique = new CultureScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'annee', header: 'Annee'},
                            {field: 'tempsEstimePourCetteAnnne', header: 'Temps estime pour cette annne'},
                        {field: 'campagne?.libelle', header: 'Campagne'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
                        {field: 'natureActiviteGrandPublique?.libelle', header: 'Nature activite grand publique'},
        ];
    }
    
    public async editCultureScientifique(cultureScientifique:CultureScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'edit');
         if(isPermistted){
          this.cultureScientifiqueService.findByIdWithAssociatedList(cultureScientifique).subscribe(res => {
           this.selectedCultureScientifique = res;
            this.navigateToCultureScientifiqueCreate() ;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCultureScientifique(cultureScientifique:CultureScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'view');
        if(isPermistted){
           this.cultureScientifiqueService.findByIdWithAssociatedList(cultureScientifique).subscribe(res => {
           this.selectedCultureScientifique = res;
            this.viewCultureScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCultureScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCultureScientifique = new CultureScientifiqueVo();
            this.navigateToCultureScientifiqueCreate() ;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCultureScientifique(cultureScientifique:CultureScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Culture scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.cultureScientifiqueService.delete(cultureScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.cultureScientifiques.indexOf(cultureScientifique);
                          position > -1 ? this.cultureScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Culture scientifique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'list');
    isPermistted ? this.campagneService.findAll().subscribe(campagnes => this.campagnes = campagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadNatureActiviteGrandPublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CultureScientifique', 'list');
    isPermistted ? this.natureActiviteGrandPubliqueService.findAll().subscribe(natureActiviteGrandPubliques => this.natureActiviteGrandPubliques = natureActiviteGrandPubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCultureScientifique(cultureScientifique: CultureScientifiqueVo) {

     this.cultureScientifiqueService.findByIdWithAssociatedList(cultureScientifique).subscribe(
	 res => {
	       this.initDuplicateCultureScientifique(res);
	       this.selectedCultureScientifique = res;
	       this.selectedCultureScientifique.id = null;
            this.navigateToCultureScientifiqueCreate() ;

});

	}

	initDuplicateCultureScientifique(res: CultureScientifiqueVo) {
        if (res.rencontreGrandPubliqueJeunePubliquesVo != null) {
             res.rencontreGrandPubliqueJeunePubliquesVo.forEach(d => { d.cultureScientifiqueVo = null; d.id = null; });
                }
        if (res.rencontreMediasVo != null) {
             res.rencontreMediasVo.forEach(d => { d.cultureScientifiqueVo = null; d.id = null; });
                }
        if (res.outilPedagogiquesVo != null) {
             res.outilPedagogiquesVo.forEach(d => { d.cultureScientifiqueVo = null; d.id = null; });
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
    this.exportData = this.cultureScientifiques.map(e => {
    return {
                    'Annee': e.annee ,
                    'Temps estime pour cette annne': e.tempsEstimePourCetteAnnne ,
            'Campagne': e.campagneVo?.libelle ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
            'Nature activite grand publique': e.natureActiviteGrandPubliqueVo?.libelle ,
     }
      });

      this.criteriaData = [{
            'Annee Min': this.searchCultureScientifique.anneeMin ? this.searchCultureScientifique.anneeMin : environment.emptyForExport ,
            'Annee Max': this.searchCultureScientifique.anneeMax ? this.searchCultureScientifique.anneeMax : environment.emptyForExport ,
            'Temps estime pour cette annne Min': this.searchCultureScientifique.tempsEstimePourCetteAnnneMin ? this.searchCultureScientifique.tempsEstimePourCetteAnnneMin : environment.emptyForExport ,
            'Temps estime pour cette annne Max': this.searchCultureScientifique.tempsEstimePourCetteAnnneMax ? this.searchCultureScientifique.tempsEstimePourCetteAnnneMax : environment.emptyForExport ,
        'Campagne': this.searchCultureScientifique.campagneVo?.libelle ? this.searchCultureScientifique.campagneVo?.libelle : environment.emptyForExport ,
        'Chercheur': this.searchCultureScientifique.chercheurVo?.numeroMatricule ? this.searchCultureScientifique.chercheurVo?.numeroMatricule : environment.emptyForExport ,
        'Etat etape campagne': this.searchCultureScientifique.etatEtapeCampagneVo?.libelle ? this.searchCultureScientifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
        'Nature activite grand publique': this.searchCultureScientifique.natureActiviteGrandPubliqueVo?.libelle ? this.searchCultureScientifique.natureActiviteGrandPubliqueVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get cultureScientifiques(): Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiques;
       }
    set cultureScientifiques(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiques = value;
       }

    get cultureScientifiqueSelections(): Array<CultureScientifiqueVo> {
           return this.cultureScientifiqueService.cultureScientifiqueSelections;
       }
    set cultureScientifiqueSelections(value: Array<CultureScientifiqueVo>) {
        this.cultureScientifiqueService.cultureScientifiqueSelections = value;
       }
   
     


    get selectedCultureScientifique():CultureScientifiqueVo {
           return this.cultureScientifiqueService.selectedCultureScientifique;
       }
    set selectedCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.selectedCultureScientifique = value;
       }
    
    get createCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.createCultureScientifiqueDialog;
       }
    set createCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.createCultureScientifiqueDialog= value;
       }
    
    get editCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.editCultureScientifiqueDialog;
       }
    set editCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.editCultureScientifiqueDialog= value;
       }
    get viewCultureScientifiqueDialog():boolean {
           return this.cultureScientifiqueService.viewCultureScientifiqueDialog;
       }
    set viewCultureScientifiqueDialog(value: boolean) {
        this.cultureScientifiqueService.viewCultureScientifiqueDialog = value;
       }
       
     get searchCultureScientifique(): CultureScientifiqueVo {
        return this.cultureScientifiqueService.searchCultureScientifique;
       }
    set searchCultureScientifique(value: CultureScientifiqueVo) {
        this.cultureScientifiqueService.searchCultureScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

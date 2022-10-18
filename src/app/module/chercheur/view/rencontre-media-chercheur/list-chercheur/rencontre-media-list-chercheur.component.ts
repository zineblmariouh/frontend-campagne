import {Component, OnInit} from '@angular/core';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormatRencontreService } from '../../../../../controller/service/FormatRencontre.service';
import { CultureScientifiqueService } from '../../../../../controller/service/CultureScientifique.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {RencontreMediaPeriodeVo} from '../../../../../controller/model/RencontreMediaPeriode.model';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {PaysRencontreMediaVo} from '../../../../../controller/model/PaysRencontreMedia.model';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaEnjeuxIrdVo} from '../../../../../controller/model/RencontreMediaEnjeuxIrd.model';
import {TypePubliqueRencontreMediaVo} from '../../../../../controller/model/TypePubliqueRencontreMedia.model';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {CultureScientifiqueVo} from '../../../../../controller/model/CultureScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-media-list-chercheur',
  templateUrl: './rencontre-media-list-chercheur.component.html',
  styleUrls: ['./rencontre-media-list-chercheur.component.css']
})
export class RencontreMediaListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreMedia';
    formatRencontres :Array<FormatRencontreVo>;
    cultureScientifiques :Array<CultureScientifiqueVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private rencontreMediaService: RencontreMediaService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formatRencontreService: FormatRencontreService
        , private cultureScientifiqueService: CultureScientifiqueService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadRencontreMedias();
      this.initExport();
      this.initCol();
      this.loadFormatRencontre();
      this.loadCultureScientifique();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadRencontreMedias(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'list');
        isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreMediaService.findByCriteria(this.searchRencontreMedia).subscribe(rencontreMedias=>{
            
            this.rencontreMedias = rencontreMedias;
           // this.searchRencontreMedia = new RencontreMediaVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formatRencontre?.libelle', header: 'Format rencontre'},
                            {field: 'intituleSujet', header: 'Intitule sujet'},
                            {field: 'lienWeb', header: 'Lien web'},
                        {field: 'cultureScientifique?.id', header: 'Culture scientifique'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editRencontreMedia(rencontreMedia:RencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'edit');
         if(isPermistted){
          this.rencontreMediaService.findByIdWithAssociatedList(rencontreMedia).subscribe(res => {
           this.selectedRencontreMedia = res;
            this.editRencontreMediaDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreMedia(rencontreMedia:RencontreMediaVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'view');
        if(isPermistted){
           this.rencontreMediaService.findByIdWithAssociatedList(rencontreMedia).subscribe(res => {
           this.selectedRencontreMedia = res;
            this.viewRencontreMediaDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreMedia(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreMedia = new RencontreMediaVo();
            this.createRencontreMediaDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreMedia(rencontreMedia:RencontreMediaVo){
       const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre media) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreMediaService.delete(rencontreMedia).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreMedias.indexOf(rencontreMedia);
                          position > -1 ? this.rencontreMedias.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre media Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'list');
    isPermistted ? this.formatRencontreService.findAll().subscribe(formatRencontres => this.formatRencontres = formatRencontres,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCultureScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'list');
    isPermistted ? this.cultureScientifiqueService.findAll().subscribe(cultureScientifiques => this.cultureScientifiques = cultureScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreMedia(rencontreMedia: RencontreMediaVo) {

     this.rencontreMediaService.findByIdWithAssociatedList(rencontreMedia).subscribe(
	 res => {
	       this.initDuplicateRencontreMedia(res);
	       this.selectedRencontreMedia = res;
	       this.selectedRencontreMedia.id = null;
            this.createRencontreMediaDialog = true;

});

	}

	initDuplicateRencontreMedia(res: RencontreMediaVo) {
        if (res.typePubliqueRencontreMediasVo != null) {
             res.typePubliqueRencontreMediasVo.forEach(d => { d.rencontreMediaVo = null; d.id = null; });
                }
        if (res.rencontreMediaEnjeuxIrdsVo != null) {
             res.rencontreMediaEnjeuxIrdsVo.forEach(d => { d.rencontreMediaVo = null; d.id = null; });
                }
        if (res.rencontreMediaDisciplineScientifiquesVo != null) {
             res.rencontreMediaDisciplineScientifiquesVo.forEach(d => { d.rencontreMediaVo = null; d.id = null; });
                }
        if (res.rencontreMediaPeriodesVo != null) {
             res.rencontreMediaPeriodesVo.forEach(d => { d.rencontreMediaVo = null; d.id = null; });
                }
        if (res.paysRencontreMediasVo != null) {
             res.paysRencontreMediasVo.forEach(d => { d.rencontreMediaVo = null; d.id = null; });
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
    this.exportData = this.rencontreMedias.map(e => {
    return {
            'Format rencontre': e.formatRencontreVo?.libelle ,
                    'Intitule sujet': e.intituleSujet ,
                    'Lien web': e.lienWeb ,
                    'Remarque': e.remarque ,
            'Culture scientifique': e.cultureScientifiqueVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Format rencontre': this.searchRencontreMedia.formatRencontreVo?.libelle ? this.searchRencontreMedia.formatRencontreVo?.libelle : environment.emptyForExport ,
            'Intitule sujet': this.searchRencontreMedia.intituleSujet ? this.searchRencontreMedia.intituleSujet : environment.emptyForExport ,
            'Lien web': this.searchRencontreMedia.lienWeb ? this.searchRencontreMedia.lienWeb : environment.emptyForExport ,
            'Remarque': this.searchRencontreMedia.remarque ? this.searchRencontreMedia.remarque : environment.emptyForExport ,
        'Culture scientifique': this.searchRencontreMedia.cultureScientifiqueVo?.id ? this.searchRencontreMedia.cultureScientifiqueVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchRencontreMedia.etatEtapeCampagneVo?.libelle ? this.searchRencontreMedia.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreMedias(): Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
    set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }

    get rencontreMediaSelections(): Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMediaSelections;
       }
    set rencontreMediaSelections(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMediaSelections = value;
       }
   
     


    get selectedRencontreMedia():RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
    set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
    
    get createRencontreMediaDialog():boolean {
           return this.rencontreMediaService.createRencontreMediaDialog;
       }
    set createRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.createRencontreMediaDialog= value;
       }
    
    get editRencontreMediaDialog():boolean {
           return this.rencontreMediaService.editRencontreMediaDialog;
       }
    set editRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.editRencontreMediaDialog= value;
       }
    get viewRencontreMediaDialog():boolean {
           return this.rencontreMediaService.viewRencontreMediaDialog;
       }
    set viewRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.viewRencontreMediaDialog = value;
       }
       
     get searchRencontreMedia(): RencontreMediaVo {
        return this.rencontreMediaService.searchRencontreMedia;
       }
    set searchRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.searchRencontreMedia = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

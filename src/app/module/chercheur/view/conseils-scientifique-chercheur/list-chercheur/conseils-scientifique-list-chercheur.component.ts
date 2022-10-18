import {Component, OnInit} from '@angular/core';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NatureExpertiseService } from '../../../../../controller/service/NatureExpertise.service';
import { TypeExpertiseService } from '../../../../../controller/service/TypeExpertise.service';
import { ExpertiseService } from '../../../../../controller/service/Expertise.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {TypeExpertiseVo} from '../../../../../controller/model/TypeExpertise.model';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-conseils-scientifique-list-chercheur',
  templateUrl: './conseils-scientifique-list-chercheur.component.html',
  styleUrls: ['./conseils-scientifique-list-chercheur.component.css']
})
export class ConseilsScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ConseilsScientifique';
    natureExpertises :Array<NatureExpertiseVo>;
    typeExpertises :Array<TypeExpertiseVo>;
    expertises :Array<ExpertiseVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private conseilsScientifiqueService: ConseilsScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private natureExpertiseService: NatureExpertiseService
        , private typeExpertiseService: TypeExpertiseService
        , private expertiseService: ExpertiseService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadConseilsScientifiques();
      this.initExport();
      this.initCol();
      this.loadNatureExpertise();
      this.loadTypeExpertise();
      this.loadExpertise();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadConseilsScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'list');
        isPermistted ? this.conseilsScientifiqueService.findAll().subscribe(conseilsScientifiques => this.conseilsScientifiques = conseilsScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.conseilsScientifiqueService.findByCriteria(this.searchConseilsScientifique).subscribe(conseilsScientifiques=>{
            
            this.conseilsScientifiques = conseilsScientifiques;
           // this.searchConseilsScientifique = new ConseilsScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'natureExpertise?.libelle', header: 'Nature expertise'},
                            {field: 'intitule', header: 'Intitule'},
                        {field: 'typeExpertise?.libelle', header: 'Type expertise'},
                            {field: 'nombreJoursConsacres', header: 'Nombre jours consacres'},
                        {field: 'expertise?.id', header: 'Expertise'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editConseilsScientifique(conseilsScientifique:ConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'edit');
         if(isPermistted){
          this.conseilsScientifiqueService.findByIdWithAssociatedList(conseilsScientifique).subscribe(res => {
           this.selectedConseilsScientifique = res;
            this.editConseilsScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewConseilsScientifique(conseilsScientifique:ConseilsScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'view');
        if(isPermistted){
           this.conseilsScientifiqueService.findByIdWithAssociatedList(conseilsScientifique).subscribe(res => {
           this.selectedConseilsScientifique = res;
            this.viewConseilsScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateConseilsScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
            this.createConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteConseilsScientifique(conseilsScientifique:ConseilsScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Conseils scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.conseilsScientifiqueService.delete(conseilsScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.conseilsScientifiques.indexOf(conseilsScientifique);
                          position > -1 ? this.conseilsScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Conseils scientifique Supprimé',
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

public async loadNatureExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'list');
    isPermistted ? this.natureExpertiseService.findAll().subscribe(natureExpertises => this.natureExpertises = natureExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'list');
    isPermistted ? this.typeExpertiseService.findAll().subscribe(typeExpertises => this.typeExpertises = typeExpertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadExpertise(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'list');
    isPermistted ? this.expertiseService.findAll().subscribe(expertises => this.expertises = expertises,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateConseilsScientifique(conseilsScientifique: ConseilsScientifiqueVo) {

     this.conseilsScientifiqueService.findByIdWithAssociatedList(conseilsScientifique).subscribe(
	 res => {
	       this.initDuplicateConseilsScientifique(res);
	       this.selectedConseilsScientifique = res;
	       this.selectedConseilsScientifique.id = null;
            this.createConseilsScientifiqueDialog = true;

});

	}

	initDuplicateConseilsScientifique(res: ConseilsScientifiqueVo) {
        if (res.etablissementConseilsScientifiquesVo != null) {
             res.etablissementConseilsScientifiquesVo.forEach(d => { d.conseilsScientifiqueVo = null; d.id = null; });
                }
        if (res.zoneGeographiqueConseilsScientifiquesVo != null) {
             res.zoneGeographiqueConseilsScientifiquesVo.forEach(d => { d.conseilsScientifiqueVo = null; d.id = null; });
                }
        if (res.enjeuxIrdConseilsScientifiquesVo != null) {
             res.enjeuxIrdConseilsScientifiquesVo.forEach(d => { d.conseilsScientifiqueVo = null; d.id = null; });
                }
        if (res.disciplineScientifiqueConseilsScientifiquesVo != null) {
             res.disciplineScientifiqueConseilsScientifiquesVo.forEach(d => { d.conseilsScientifiqueVo = null; d.id = null; });
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
    this.exportData = this.conseilsScientifiques.map(e => {
    return {
            'Nature expertise': e.natureExpertiseVo?.libelle ,
                    'Intitule': e.intitule ,
            'Type expertise': e.typeExpertiseVo?.libelle ,
                    'Nombre jours consacres': e.nombreJoursConsacres ,
            'Expertise': e.expertiseVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Nature expertise': this.searchConseilsScientifique.natureExpertiseVo?.libelle ? this.searchConseilsScientifique.natureExpertiseVo?.libelle : environment.emptyForExport ,
            'Intitule': this.searchConseilsScientifique.intitule ? this.searchConseilsScientifique.intitule : environment.emptyForExport ,
        'Type expertise': this.searchConseilsScientifique.typeExpertiseVo?.libelle ? this.searchConseilsScientifique.typeExpertiseVo?.libelle : environment.emptyForExport ,
            'Nombre jours consacres Min': this.searchConseilsScientifique.nombreJoursConsacresMin ? this.searchConseilsScientifique.nombreJoursConsacresMin : environment.emptyForExport ,
            'Nombre jours consacres Max': this.searchConseilsScientifique.nombreJoursConsacresMax ? this.searchConseilsScientifique.nombreJoursConsacresMax : environment.emptyForExport ,
        'Expertise': this.searchConseilsScientifique.expertiseVo?.id ? this.searchConseilsScientifique.expertiseVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchConseilsScientifique.etatEtapeCampagneVo?.libelle ? this.searchConseilsScientifique.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
    set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }

    get conseilsScientifiqueSelections(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiqueSelections;
       }
    set conseilsScientifiqueSelections(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiqueSelections = value;
       }
   
     


    get selectedConseilsScientifique():ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
    set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
    
    get createConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
    set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
       }
    
    get editConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.editConseilsScientifiqueDialog;
       }
    set editConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.editConseilsScientifiqueDialog= value;
       }
    get viewConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.viewConseilsScientifiqueDialog;
       }
    set viewConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.viewConseilsScientifiqueDialog = value;
       }
       
     get searchConseilsScientifique(): ConseilsScientifiqueVo {
        return this.conseilsScientifiqueService.searchConseilsScientifique;
       }
    set searchConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.searchConseilsScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

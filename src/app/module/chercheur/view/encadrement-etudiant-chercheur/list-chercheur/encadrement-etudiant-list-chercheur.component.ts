import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NiveauFormationPostBacService } from '../../../../../controller/service/NiveauFormationPostBac.service';
import { ResponsabiliteDirectionEncadrementEtudiantService } from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import { EtudiantService } from '../../../../../controller/service/Etudiant.service';
import { EtablissementService } from '../../../../../controller/service/Etablissement.service';
import { PaysService } from '../../../../../controller/service/Pays.service';
import { EncadrementService } from '../../../../../controller/service/Encadrement.service';
import { EtatEtapeCampagneService } from '../../../../../controller/service/EtatEtapeCampagne.service';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtudiantVo} from '../../../../../controller/model/Etudiant.model';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {EncadrementVo} from '../../../../../controller/model/Encadrement.model';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {NiveauFormationPostBacVo} from '../../../../../controller/model/NiveauFormationPostBac.model';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-encadrement-etudiant-list-chercheur',
  templateUrl: './encadrement-etudiant-list-chercheur.component.html',
  styleUrls: ['./encadrement-etudiant-list-chercheur.component.css']
})
export class EncadrementEtudiantListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EncadrementEtudiant';
    niveauFormationPostBacs :Array<NiveauFormationPostBacVo>;
    responsabiliteDirectionEncadrementEtudiants :Array<ResponsabiliteDirectionEncadrementEtudiantVo>;
    etudiants :Array<EtudiantVo>;
    etablissements :Array<EtablissementVo>;
    payss :Array<PaysVo>;
    encadrements :Array<EncadrementVo>;
    etatEtapeCampagnes :Array<EtatEtapeCampagneVo>;


    constructor(private datePipe: DatePipe, private encadrementEtudiantService: EncadrementEtudiantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private niveauFormationPostBacService: NiveauFormationPostBacService
        , private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
        , private etudiantService: EtudiantService
        , private etablissementService: EtablissementService
        , private paysService: PaysService
        , private encadrementService: EncadrementService
        , private etatEtapeCampagneService: EtatEtapeCampagneService
) { }

    ngOnInit(): void {
      this.loadEncadrementEtudiants();
      this.initExport();
      this.initCol();
      this.loadNiveauFormationPostBac();
      this.loadResponsabiliteDirectionEncadrementEtudiant();
      this.loadEtudiant();
      this.loadEtablissement();
      this.loadPays();
      this.loadEncadrement();
      this.loadEtatEtapeCampagne();
    }
    
    // methods
      public async loadEncadrementEtudiants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
        isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.encadrementEtudiantService.findByCriteria(this.searchEncadrementEtudiant).subscribe(encadrementEtudiants=>{
            
            this.encadrementEtudiants = encadrementEtudiants;
           // this.searchEncadrementEtudiant = new EncadrementEtudiantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'niveauFormationPostBac?.libelle', header: 'Niveau formation post bac'},
                        {field: 'responsabiliteDirectionEncadrementEtudiant?.libelle', header: 'Responsabilite direction encadrement etudiant'},
                            {field: 'sujetEtude', header: 'Sujet etude'},
                        {field: 'etudiant?.id', header: 'Etudiant'},
                        {field: 'etablissement?.libelle', header: 'Etablissement'},
                            {field: 'cursus', header: 'Cursus'},
                        {field: 'pays?.libelle', header: 'Pays'},
                        {field: 'encadrement?.id', header: 'Encadrement'},
                        {field: 'etatEtapeCampagne?.libelle', header: 'Etat etape campagne'},
        ];
    }
    
    public async editEncadrementEtudiant(encadrementEtudiant:EncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'edit');
         if(isPermistted){
          this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(res => {
           this.selectedEncadrementEtudiant = res;
            this.editEncadrementEtudiantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEncadrementEtudiant(encadrementEtudiant:EncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'view');
        if(isPermistted){
           this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(res => {
           this.selectedEncadrementEtudiant = res;
            this.viewEncadrementEtudiantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
            this.createEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEncadrementEtudiant(encadrementEtudiant:EncadrementEtudiantVo){
       const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Encadrement etudiant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.encadrementEtudiantService.delete(encadrementEtudiant).subscribe(status=>{
                          if(status > 0){
                          const position = this.encadrementEtudiants.indexOf(encadrementEtudiant);
                          position > -1 ? this.encadrementEtudiants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Encadrement etudiant Supprimé',
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

public async loadNiveauFormationPostBac(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.niveauFormationPostBacService.findAll().subscribe(niveauFormationPostBacs => this.niveauFormationPostBacs = niveauFormationPostBacs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadResponsabiliteDirectionEncadrementEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.responsabiliteDirectionEncadrementEtudiantService.findAll().subscribe(responsabiliteDirectionEncadrementEtudiants => this.responsabiliteDirectionEncadrementEtudiants = responsabiliteDirectionEncadrementEtudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.etudiantService.findAll().subscribe(etudiants => this.etudiants = etudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtablissement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.etablissementService.findAll().subscribe(etablissements => this.etablissements = etablissements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.encadrementService.findAll().subscribe(encadrements => this.encadrements = encadrements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatEtapeCampagne(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'list');
    isPermistted ? this.etatEtapeCampagneService.findAll().subscribe(etatEtapeCampagnes => this.etatEtapeCampagnes = etatEtapeCampagnes,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEncadrementEtudiant(encadrementEtudiant: EncadrementEtudiantVo) {

     this.encadrementEtudiantService.findByIdWithAssociatedList(encadrementEtudiant).subscribe(
	 res => {
	       this.initDuplicateEncadrementEtudiant(res);
	       this.selectedEncadrementEtudiant = res;
	       this.selectedEncadrementEtudiant.id = null;
            this.createEncadrementEtudiantDialog = true;

});

	}

	initDuplicateEncadrementEtudiant(res: EncadrementEtudiantVo) {
        if (res.encadrementEtudiantEnjeuxIrdsVo != null) {
             res.encadrementEtudiantEnjeuxIrdsVo.forEach(d => { d.encadrementEtudiantVo = null; d.id = null; });
                }
        if (res.encadrementEtudiantDisciplineScientifiquesVo != null) {
             res.encadrementEtudiantDisciplineScientifiquesVo.forEach(d => { d.encadrementEtudiantVo = null; d.id = null; });
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
    this.exportData = this.encadrementEtudiants.map(e => {
    return {
            'Niveau formation post bac': e.niveauFormationPostBacVo?.libelle ,
            'Responsabilite direction encadrement etudiant': e.responsabiliteDirectionEncadrementEtudiantVo?.libelle ,
                    'Sujet etude': e.sujetEtude ,
            'Etudiant': e.etudiantVo?.id ,
            'Etablissement': e.etablissementVo?.libelle ,
                    'Cursus': e.cursus ,
            'Pays': e.paysVo?.libelle ,
            'Encadrement': e.encadrementVo?.id ,
            'Etat etape campagne': e.etatEtapeCampagneVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Niveau formation post bac': this.searchEncadrementEtudiant.niveauFormationPostBacVo?.libelle ? this.searchEncadrementEtudiant.niveauFormationPostBacVo?.libelle : environment.emptyForExport ,
        'Responsabilite direction encadrement etudiant': this.searchEncadrementEtudiant.responsabiliteDirectionEncadrementEtudiantVo?.libelle ? this.searchEncadrementEtudiant.responsabiliteDirectionEncadrementEtudiantVo?.libelle : environment.emptyForExport ,
            'Sujet etude': this.searchEncadrementEtudiant.sujetEtude ? this.searchEncadrementEtudiant.sujetEtude : environment.emptyForExport ,
        'Etudiant': this.searchEncadrementEtudiant.etudiantVo?.id ? this.searchEncadrementEtudiant.etudiantVo?.id : environment.emptyForExport ,
        'Etablissement': this.searchEncadrementEtudiant.etablissementVo?.libelle ? this.searchEncadrementEtudiant.etablissementVo?.libelle : environment.emptyForExport ,
            'Cursus': this.searchEncadrementEtudiant.cursus ? this.searchEncadrementEtudiant.cursus : environment.emptyForExport ,
        'Pays': this.searchEncadrementEtudiant.paysVo?.libelle ? this.searchEncadrementEtudiant.paysVo?.libelle : environment.emptyForExport ,
        'Encadrement': this.searchEncadrementEtudiant.encadrementVo?.id ? this.searchEncadrementEtudiant.encadrementVo?.id : environment.emptyForExport ,
        'Etat etape campagne': this.searchEncadrementEtudiant.etatEtapeCampagneVo?.libelle ? this.searchEncadrementEtudiant.etatEtapeCampagneVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiants;
       }
    set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }

    get encadrementEtudiantSelections(): Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiantSelections;
       }
    set encadrementEtudiantSelections(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiantSelections = value;
       }
   
     


    get selectedEncadrementEtudiant():EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
    set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }
    
    get createEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.createEncadrementEtudiantDialog;
       }
    set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog= value;
       }
    
    get editEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.editEncadrementEtudiantDialog;
       }
    set editEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.editEncadrementEtudiantDialog= value;
       }
    get viewEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.viewEncadrementEtudiantDialog;
       }
    set viewEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.viewEncadrementEtudiantDialog = value;
       }
       
     get searchEncadrementEtudiant(): EncadrementEtudiantVo {
        return this.encadrementEtudiantService.searchEncadrementEtudiant;
       }
    set searchEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.searchEncadrementEtudiant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

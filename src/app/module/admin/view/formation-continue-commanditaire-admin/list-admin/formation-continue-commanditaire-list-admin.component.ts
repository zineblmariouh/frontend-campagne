import {Component, OnInit} from '@angular/core';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommanditaireService } from '../../../../../controller/service/Commanditaire.service';
import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';
import { PaysService } from '../../../../../controller/service/Pays.service';

import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-formation-continue-commanditaire-list-admin',
  templateUrl: './formation-continue-commanditaire-list-admin.component.html',
  styleUrls: ['./formation-continue-commanditaire-list-admin.component.css']
})
export class FormationContinueCommanditaireListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinueCommanditaire';
    commanditaires :Array<CommanditaireVo>;
    formationContinues :Array<FormationContinueVo>;
    payss :Array<PaysVo>;


    constructor(private datePipe: DatePipe, private formationContinueCommanditaireService: FormationContinueCommanditaireService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private commanditaireService: CommanditaireService
        , private formationContinueService: FormationContinueService
        , private paysService: PaysService
) { }

    ngOnInit(): void {
      this.loadFormationContinueCommanditaires();
      this.initExport();
      this.initCol();
      this.loadCommanditaire();
      this.loadFormationContinue();
      this.loadPays();
    }
    
    // methods
      public async loadFormationContinueCommanditaires(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'list');
        isPermistted ? this.formationContinueCommanditaireService.findAll().subscribe(formationContinueCommanditaires => this.formationContinueCommanditaires = formationContinueCommanditaires,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formationContinueCommanditaireService.findByCriteria(this.searchFormationContinueCommanditaire).subscribe(formationContinueCommanditaires=>{
            
            this.formationContinueCommanditaires = formationContinueCommanditaires;
           // this.searchFormationContinueCommanditaire = new FormationContinueCommanditaireVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'commanditaire?.libelle', header: 'Commanditaire'},
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
                        {field: 'pays?.libelle', header: 'Pays'},
        ];
    }
    
    public async editFormationContinueCommanditaire(formationContinueCommanditaire:FormationContinueCommanditaireVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'edit');
         if(isPermistted){
          this.formationContinueCommanditaireService.findByIdWithAssociatedList(formationContinueCommanditaire).subscribe(res => {
           this.selectedFormationContinueCommanditaire = res;
            this.editFormationContinueCommanditaireDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormationContinueCommanditaire(formationContinueCommanditaire:FormationContinueCommanditaireVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'view');
        if(isPermistted){
           this.formationContinueCommanditaireService.findByIdWithAssociatedList(formationContinueCommanditaire).subscribe(res => {
           this.selectedFormationContinueCommanditaire = res;
            this.viewFormationContinueCommanditaireDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormationContinueCommanditaire(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormationContinueCommanditaire = new FormationContinueCommanditaireVo();
            this.createFormationContinueCommanditaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormationContinueCommanditaire(formationContinueCommanditaire:FormationContinueCommanditaireVo){
       const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Formation continue commanditaire) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formationContinueCommanditaireService.delete(formationContinueCommanditaire).subscribe(status=>{
                          if(status > 0){
                          const position = this.formationContinueCommanditaires.indexOf(formationContinueCommanditaire);
                          position > -1 ? this.formationContinueCommanditaires.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Formation continue commanditaire Supprimé',
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

public async loadCommanditaire(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'list');
    isPermistted ? this.commanditaireService.findAll().subscribe(commanditaires => this.commanditaires = commanditaires,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPays(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinueCommanditaire', 'list');
    isPermistted ? this.paysService.findAll().subscribe(payss => this.payss = payss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFormationContinueCommanditaire(formationContinueCommanditaire: FormationContinueCommanditaireVo) {

     this.formationContinueCommanditaireService.findByIdWithAssociatedList(formationContinueCommanditaire).subscribe(
	 res => {
	       this.initDuplicateFormationContinueCommanditaire(res);
	       this.selectedFormationContinueCommanditaire = res;
	       this.selectedFormationContinueCommanditaire.id = null;
            this.createFormationContinueCommanditaireDialog = true;

});

	}

	initDuplicateFormationContinueCommanditaire(res: FormationContinueCommanditaireVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formationContinueCommanditaires.map(e => {
    return {
            'Commanditaire': e.commanditaireVo?.libelle ,
            'Formation continue': e.formationContinueVo?.intitule ,
            'Pays': e.paysVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Commanditaire': this.searchFormationContinueCommanditaire.commanditaireVo?.libelle ? this.searchFormationContinueCommanditaire.commanditaireVo?.libelle : environment.emptyForExport ,
        'Formation continue': this.searchFormationContinueCommanditaire.formationContinueVo?.intitule ? this.searchFormationContinueCommanditaire.formationContinueVo?.intitule : environment.emptyForExport ,
        'Pays': this.searchFormationContinueCommanditaire.paysVo?.libelle ? this.searchFormationContinueCommanditaire.paysVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formationContinueCommanditaires(): Array<FormationContinueCommanditaireVo> {
           return this.formationContinueCommanditaireService.formationContinueCommanditaires;
       }
    set formationContinueCommanditaires(value: Array<FormationContinueCommanditaireVo>) {
        this.formationContinueCommanditaireService.formationContinueCommanditaires = value;
       }

    get formationContinueCommanditaireSelections(): Array<FormationContinueCommanditaireVo> {
           return this.formationContinueCommanditaireService.formationContinueCommanditaireSelections;
       }
    set formationContinueCommanditaireSelections(value: Array<FormationContinueCommanditaireVo>) {
        this.formationContinueCommanditaireService.formationContinueCommanditaireSelections = value;
       }
   
     


    get selectedFormationContinueCommanditaire():FormationContinueCommanditaireVo {
           return this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire;
       }
    set selectedFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire = value;
       }
    
    get createFormationContinueCommanditaireDialog():boolean {
           return this.formationContinueCommanditaireService.createFormationContinueCommanditaireDialog;
       }
    set createFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.createFormationContinueCommanditaireDialog= value;
       }
    
    get editFormationContinueCommanditaireDialog():boolean {
           return this.formationContinueCommanditaireService.editFormationContinueCommanditaireDialog;
       }
    set editFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.editFormationContinueCommanditaireDialog= value;
       }
    get viewFormationContinueCommanditaireDialog():boolean {
           return this.formationContinueCommanditaireService.viewFormationContinueCommanditaireDialog;
       }
    set viewFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.viewFormationContinueCommanditaireDialog = value;
       }
       
     get searchFormationContinueCommanditaire(): FormationContinueCommanditaireVo {
        return this.formationContinueCommanditaireService.searchFormationContinueCommanditaire;
       }
    set searchFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this.formationContinueCommanditaireService.searchFormationContinueCommanditaire = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

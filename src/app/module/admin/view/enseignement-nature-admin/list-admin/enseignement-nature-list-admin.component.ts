import {Component, OnInit} from '@angular/core';
import {EnseignementNatureService} from '../../../../../controller/service/EnseignementNature.service';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { NatureEnseignementService } from '../../../../../controller/service/NatureEnseignement.service';
import { EnseignementService } from '../../../../../controller/service/Enseignement.service';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-enseignement-nature-list-admin',
  templateUrl: './enseignement-nature-list-admin.component.html',
  styleUrls: ['./enseignement-nature-list-admin.component.css']
})
export class EnseignementNatureListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EnseignementNature';
    natureEnseignements :Array<NatureEnseignementVo>;
    enseignements :Array<EnseignementVo>;


    constructor(private datePipe: DatePipe, private enseignementNatureService: EnseignementNatureService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private natureEnseignementService: NatureEnseignementService
        , private enseignementService: EnseignementService
) { }

    ngOnInit(): void {
      this.loadEnseignementNatures();
      this.initExport();
      this.initCol();
      this.loadNatureEnseignement();
      this.loadEnseignement();
    }
    
    // methods
      public async loadEnseignementNatures(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'list');
        isPermistted ? this.enseignementNatureService.findAll().subscribe(enseignementNatures => this.enseignementNatures = enseignementNatures,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.enseignementNatureService.findByCriteria(this.searchEnseignementNature).subscribe(enseignementNatures=>{
            
            this.enseignementNatures = enseignementNatures;
           // this.searchEnseignementNature = new EnseignementNatureVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'natureEnseignement?.libelle', header: 'Nature enseignement'},
                        {field: 'enseignement?.id', header: 'Enseignement'},
        ];
    }
    
    public async editEnseignementNature(enseignementNature:EnseignementNatureVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'edit');
         if(isPermistted){
          this.enseignementNatureService.findByIdWithAssociatedList(enseignementNature).subscribe(res => {
           this.selectedEnseignementNature = res;
            this.editEnseignementNatureDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEnseignementNature(enseignementNature:EnseignementNatureVo){
        const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'view');
        if(isPermistted){
           this.enseignementNatureService.findByIdWithAssociatedList(enseignementNature).subscribe(res => {
           this.selectedEnseignementNature = res;
            this.viewEnseignementNatureDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEnseignementNature(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEnseignementNature = new EnseignementNatureVo();
            this.createEnseignementNatureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEnseignementNature(enseignementNature:EnseignementNatureVo){
       const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Enseignement nature) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.enseignementNatureService.delete(enseignementNature).subscribe(status=>{
                          if(status > 0){
                          const position = this.enseignementNatures.indexOf(enseignementNature);
                          position > -1 ? this.enseignementNatures.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Enseignement nature Supprimé',
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

public async loadNatureEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'list');
    isPermistted ? this.natureEnseignementService.findAll().subscribe(natureEnseignements => this.natureEnseignements = natureEnseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEnseignement(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('EnseignementNature', 'list');
    isPermistted ? this.enseignementService.findAll().subscribe(enseignements => this.enseignements = enseignements,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateEnseignementNature(enseignementNature: EnseignementNatureVo) {

     this.enseignementNatureService.findByIdWithAssociatedList(enseignementNature).subscribe(
	 res => {
	       this.initDuplicateEnseignementNature(res);
	       this.selectedEnseignementNature = res;
	       this.selectedEnseignementNature.id = null;
            this.createEnseignementNatureDialog = true;

});

	}

	initDuplicateEnseignementNature(res: EnseignementNatureVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.enseignementNatures.map(e => {
    return {
            'Nature enseignement': e.natureEnseignementVo?.libelle ,
            'Enseignement': e.enseignementVo?.id ,
     }
      });

      this.criteriaData = [{
        'Nature enseignement': this.searchEnseignementNature.natureEnseignementVo?.libelle ? this.searchEnseignementNature.natureEnseignementVo?.libelle : environment.emptyForExport ,
        'Enseignement': this.searchEnseignementNature.enseignementVo?.id ? this.searchEnseignementNature.enseignementVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get enseignementNatures(): Array<EnseignementNatureVo> {
           return this.enseignementNatureService.enseignementNatures;
       }
    set enseignementNatures(value: Array<EnseignementNatureVo>) {
        this.enseignementNatureService.enseignementNatures = value;
       }

    get enseignementNatureSelections(): Array<EnseignementNatureVo> {
           return this.enseignementNatureService.enseignementNatureSelections;
       }
    set enseignementNatureSelections(value: Array<EnseignementNatureVo>) {
        this.enseignementNatureService.enseignementNatureSelections = value;
       }
   
     


    get selectedEnseignementNature():EnseignementNatureVo {
           return this.enseignementNatureService.selectedEnseignementNature;
       }
    set selectedEnseignementNature(value: EnseignementNatureVo) {
        this.enseignementNatureService.selectedEnseignementNature = value;
       }
    
    get createEnseignementNatureDialog():boolean {
           return this.enseignementNatureService.createEnseignementNatureDialog;
       }
    set createEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.createEnseignementNatureDialog= value;
       }
    
    get editEnseignementNatureDialog():boolean {
           return this.enseignementNatureService.editEnseignementNatureDialog;
       }
    set editEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.editEnseignementNatureDialog= value;
       }
    get viewEnseignementNatureDialog():boolean {
           return this.enseignementNatureService.viewEnseignementNatureDialog;
       }
    set viewEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.viewEnseignementNatureDialog = value;
       }
       
     get searchEnseignementNature(): EnseignementNatureVo {
        return this.enseignementNatureService.searchEnseignementNature;
       }
    set searchEnseignementNature(value: EnseignementNatureVo) {
        this.enseignementNatureService.searchEnseignementNature = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

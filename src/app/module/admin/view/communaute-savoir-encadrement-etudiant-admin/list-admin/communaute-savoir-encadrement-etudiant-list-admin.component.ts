import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEncadrementEtudiantService} from '../../../../../controller/service/CommunauteSavoirEncadrementEtudiant.service';
import {CommunauteSavoirEncadrementEtudiantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementEtudiant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CommunauteSavoirService } from '../../../../../controller/service/CommunauteSavoir.service';
import { EncadrementEtudiantService } from '../../../../../controller/service/EncadrementEtudiant.service';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-communaute-savoir-encadrement-etudiant-list-admin',
  templateUrl: './communaute-savoir-encadrement-etudiant-list-admin.component.html',
  styleUrls: ['./communaute-savoir-encadrement-etudiant-list-admin.component.css']
})
export class CommunauteSavoirEncadrementEtudiantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CommunauteSavoirEncadrementEtudiant';
    communauteSavoirs :Array<CommunauteSavoirVo>;
    encadrementEtudiants :Array<EncadrementEtudiantVo>;


    constructor(private datePipe: DatePipe, private communauteSavoirEncadrementEtudiantService: CommunauteSavoirEncadrementEtudiantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private communauteSavoirService: CommunauteSavoirService
        , private encadrementEtudiantService: EncadrementEtudiantService
) { }

    ngOnInit(): void {
      this.loadCommunauteSavoirEncadrementEtudiants();
      this.initExport();
      this.initCol();
      this.loadCommunauteSavoir();
      this.loadEncadrementEtudiant();
    }
    
    // methods
      public async loadCommunauteSavoirEncadrementEtudiants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'list');
        isPermistted ? this.communauteSavoirEncadrementEtudiantService.findAll().subscribe(communauteSavoirEncadrementEtudiants => this.communauteSavoirEncadrementEtudiants = communauteSavoirEncadrementEtudiants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.communauteSavoirEncadrementEtudiantService.findByCriteria(this.searchCommunauteSavoirEncadrementEtudiant).subscribe(communauteSavoirEncadrementEtudiants=>{
            
            this.communauteSavoirEncadrementEtudiants = communauteSavoirEncadrementEtudiants;
           // this.searchCommunauteSavoirEncadrementEtudiant = new CommunauteSavoirEncadrementEtudiantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'communauteSavoir?.libelle', header: 'Communaute savoir'},
                        {field: 'encadrementEtudiant?.id', header: 'Encadrement etudiant'},
        ];
    }
    
    public async editCommunauteSavoirEncadrementEtudiant(communauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'edit');
         if(isPermistted){
          this.communauteSavoirEncadrementEtudiantService.findByIdWithAssociatedList(communauteSavoirEncadrementEtudiant).subscribe(res => {
           this.selectedCommunauteSavoirEncadrementEtudiant = res;
            this.editCommunauteSavoirEncadrementEtudiantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCommunauteSavoirEncadrementEtudiant(communauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo){
        const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'view');
        if(isPermistted){
           this.communauteSavoirEncadrementEtudiantService.findByIdWithAssociatedList(communauteSavoirEncadrementEtudiant).subscribe(res => {
           this.selectedCommunauteSavoirEncadrementEtudiant = res;
            this.viewCommunauteSavoirEncadrementEtudiantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCommunauteSavoirEncadrementEtudiant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCommunauteSavoirEncadrementEtudiant = new CommunauteSavoirEncadrementEtudiantVo();
            this.createCommunauteSavoirEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCommunauteSavoirEncadrementEtudiant(communauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo){
       const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Communaute savoir encadrement etudiant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.communauteSavoirEncadrementEtudiantService.delete(communauteSavoirEncadrementEtudiant).subscribe(status=>{
                          if(status > 0){
                          const position = this.communauteSavoirEncadrementEtudiants.indexOf(communauteSavoirEncadrementEtudiant);
                          position > -1 ? this.communauteSavoirEncadrementEtudiants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Communaute savoir encadrement etudiant Supprimé',
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

public async loadCommunauteSavoir(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'list');
    isPermistted ? this.communauteSavoirService.findAll().subscribe(communauteSavoirs => this.communauteSavoirs = communauteSavoirs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEncadrementEtudiant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CommunauteSavoirEncadrementEtudiant', 'list');
    isPermistted ? this.encadrementEtudiantService.findAll().subscribe(encadrementEtudiants => this.encadrementEtudiants = encadrementEtudiants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCommunauteSavoirEncadrementEtudiant(communauteSavoirEncadrementEtudiant: CommunauteSavoirEncadrementEtudiantVo) {

     this.communauteSavoirEncadrementEtudiantService.findByIdWithAssociatedList(communauteSavoirEncadrementEtudiant).subscribe(
	 res => {
	       this.initDuplicateCommunauteSavoirEncadrementEtudiant(res);
	       this.selectedCommunauteSavoirEncadrementEtudiant = res;
	       this.selectedCommunauteSavoirEncadrementEtudiant.id = null;
            this.createCommunauteSavoirEncadrementEtudiantDialog = true;

});

	}

	initDuplicateCommunauteSavoirEncadrementEtudiant(res: CommunauteSavoirEncadrementEtudiantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.communauteSavoirEncadrementEtudiants.map(e => {
    return {
            'Communaute savoir': e.communauteSavoirVo?.libelle ,
            'Encadrement etudiant': e.encadrementEtudiantVo?.id ,
     }
      });

      this.criteriaData = [{
        'Communaute savoir': this.searchCommunauteSavoirEncadrementEtudiant.communauteSavoirVo?.libelle ? this.searchCommunauteSavoirEncadrementEtudiant.communauteSavoirVo?.libelle : environment.emptyForExport ,
        'Encadrement etudiant': this.searchCommunauteSavoirEncadrementEtudiant.encadrementEtudiantVo?.id ? this.searchCommunauteSavoirEncadrementEtudiant.encadrementEtudiantVo?.id : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get communauteSavoirEncadrementEtudiants(): Array<CommunauteSavoirEncadrementEtudiantVo> {
           return this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiants;
       }
    set communauteSavoirEncadrementEtudiants(value: Array<CommunauteSavoirEncadrementEtudiantVo>) {
        this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiants = value;
       }

    get communauteSavoirEncadrementEtudiantSelections(): Array<CommunauteSavoirEncadrementEtudiantVo> {
           return this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiantSelections;
       }
    set communauteSavoirEncadrementEtudiantSelections(value: Array<CommunauteSavoirEncadrementEtudiantVo>) {
        this.communauteSavoirEncadrementEtudiantService.communauteSavoirEncadrementEtudiantSelections = value;
       }
   
     


    get selectedCommunauteSavoirEncadrementEtudiant():CommunauteSavoirEncadrementEtudiantVo {
           return this.communauteSavoirEncadrementEtudiantService.selectedCommunauteSavoirEncadrementEtudiant;
       }
    set selectedCommunauteSavoirEncadrementEtudiant(value: CommunauteSavoirEncadrementEtudiantVo) {
        this.communauteSavoirEncadrementEtudiantService.selectedCommunauteSavoirEncadrementEtudiant = value;
       }
    
    get createCommunauteSavoirEncadrementEtudiantDialog():boolean {
           return this.communauteSavoirEncadrementEtudiantService.createCommunauteSavoirEncadrementEtudiantDialog;
       }
    set createCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this.communauteSavoirEncadrementEtudiantService.createCommunauteSavoirEncadrementEtudiantDialog= value;
       }
    
    get editCommunauteSavoirEncadrementEtudiantDialog():boolean {
           return this.communauteSavoirEncadrementEtudiantService.editCommunauteSavoirEncadrementEtudiantDialog;
       }
    set editCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this.communauteSavoirEncadrementEtudiantService.editCommunauteSavoirEncadrementEtudiantDialog= value;
       }
    get viewCommunauteSavoirEncadrementEtudiantDialog():boolean {
           return this.communauteSavoirEncadrementEtudiantService.viewCommunauteSavoirEncadrementEtudiantDialog;
       }
    set viewCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this.communauteSavoirEncadrementEtudiantService.viewCommunauteSavoirEncadrementEtudiantDialog = value;
       }
       
     get searchCommunauteSavoirEncadrementEtudiant(): CommunauteSavoirEncadrementEtudiantVo {
        return this.communauteSavoirEncadrementEtudiantService.searchCommunauteSavoirEncadrementEtudiant;
       }
    set searchCommunauteSavoirEncadrementEtudiant(value: CommunauteSavoirEncadrementEtudiantVo) {
        this.communauteSavoirEncadrementEtudiantService.searchCommunauteSavoirEncadrementEtudiant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

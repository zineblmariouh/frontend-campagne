import {Component, OnInit} from '@angular/core';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { FormationContinueService } from '../../../../../controller/service/FormationContinue.service';
import { PubliqueProfessionelService } from '../../../../../controller/service/PubliqueProfessionel.service';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-formation-continue-publique-professionel-list-admin',
  templateUrl: './formation-continue-publique-professionel-list-admin.component.html',
  styleUrls: ['./formation-continue-publique-professionel-list-admin.component.css']
})
export class FormationContinuePubliqueProfessionelListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'FormationContinuePubliqueProfessionel';
    formationContinues :Array<FormationContinueVo>;
    publiqueProfessionels :Array<PubliqueProfessionelVo>;


    constructor(private datePipe: DatePipe, private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private formationContinueService: FormationContinueService
        , private publiqueProfessionelService: PubliqueProfessionelService
) { }

    ngOnInit(): void {
      this.loadFormationContinuePubliqueProfessionels();
      this.initExport();
      this.initCol();
      this.loadFormationContinue();
      this.loadPubliqueProfessionel();
    }
    
    // methods
      public async loadFormationContinuePubliqueProfessionels(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'list');
        isPermistted ? this.formationContinuePubliqueProfessionelService.findAll().subscribe(formationContinuePubliqueProfessionels => this.formationContinuePubliqueProfessionels = formationContinuePubliqueProfessionels,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.formationContinuePubliqueProfessionelService.findByCriteria(this.searchFormationContinuePubliqueProfessionel).subscribe(formationContinuePubliqueProfessionels=>{
            
            this.formationContinuePubliqueProfessionels = formationContinuePubliqueProfessionels;
           // this.searchFormationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'formationContinue?.intitule', header: 'Formation continue'},
                        {field: 'publiqueProfessionel?.libelle', header: 'Publique professionel'},
        ];
    }
    
    public async editFormationContinuePubliqueProfessionel(formationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'edit');
         if(isPermistted){
          this.formationContinuePubliqueProfessionelService.findByIdWithAssociatedList(formationContinuePubliqueProfessionel).subscribe(res => {
           this.selectedFormationContinuePubliqueProfessionel = res;
            this.editFormationContinuePubliqueProfessionelDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFormationContinuePubliqueProfessionel(formationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo){
        const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'view');
        if(isPermistted){
           this.formationContinuePubliqueProfessionelService.findByIdWithAssociatedList(formationContinuePubliqueProfessionel).subscribe(res => {
           this.selectedFormationContinuePubliqueProfessionel = res;
            this.viewFormationContinuePubliqueProfessionelDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFormationContinuePubliqueProfessionel(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFormationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();
            this.createFormationContinuePubliqueProfessionelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFormationContinuePubliqueProfessionel(formationContinuePubliqueProfessionel:FormationContinuePubliqueProfessionelVo){
       const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Formation continue publique professionel) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.formationContinuePubliqueProfessionelService.delete(formationContinuePubliqueProfessionel).subscribe(status=>{
                          if(status > 0){
                          const position = this.formationContinuePubliqueProfessionels.indexOf(formationContinuePubliqueProfessionel);
                          position > -1 ? this.formationContinuePubliqueProfessionels.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Formation continue publique professionel Supprimé',
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

public async loadFormationContinue(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'list');
    isPermistted ? this.formationContinueService.findAll().subscribe(formationContinues => this.formationContinues = formationContinues,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadPubliqueProfessionel(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('FormationContinuePubliqueProfessionel', 'list');
    isPermistted ? this.publiqueProfessionelService.findAll().subscribe(publiqueProfessionels => this.publiqueProfessionels = publiqueProfessionels,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFormationContinuePubliqueProfessionel(formationContinuePubliqueProfessionel: FormationContinuePubliqueProfessionelVo) {

     this.formationContinuePubliqueProfessionelService.findByIdWithAssociatedList(formationContinuePubliqueProfessionel).subscribe(
	 res => {
	       this.initDuplicateFormationContinuePubliqueProfessionel(res);
	       this.selectedFormationContinuePubliqueProfessionel = res;
	       this.selectedFormationContinuePubliqueProfessionel.id = null;
            this.createFormationContinuePubliqueProfessionelDialog = true;

});

	}

	initDuplicateFormationContinuePubliqueProfessionel(res: FormationContinuePubliqueProfessionelVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.formationContinuePubliqueProfessionels.map(e => {
    return {
            'Formation continue': e.formationContinueVo?.intitule ,
            'Publique professionel': e.publiqueProfessionelVo?.libelle ,
     }
      });

      this.criteriaData = [{
        'Formation continue': this.searchFormationContinuePubliqueProfessionel.formationContinueVo?.intitule ? this.searchFormationContinuePubliqueProfessionel.formationContinueVo?.intitule : environment.emptyForExport ,
        'Publique professionel': this.searchFormationContinuePubliqueProfessionel.publiqueProfessionelVo?.libelle ? this.searchFormationContinuePubliqueProfessionel.publiqueProfessionelVo?.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get formationContinuePubliqueProfessionels(): Array<FormationContinuePubliqueProfessionelVo> {
           return this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels;
       }
    set formationContinuePubliqueProfessionels(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels = value;
       }

    get formationContinuePubliqueProfessionelSelections(): Array<FormationContinuePubliqueProfessionelVo> {
           return this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionelSelections;
       }
    set formationContinuePubliqueProfessionelSelections(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionelSelections = value;
       }
   
     


    get selectedFormationContinuePubliqueProfessionel():FormationContinuePubliqueProfessionelVo {
           return this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel;
       }
    set selectedFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel = value;
       }
    
    get createFormationContinuePubliqueProfessionelDialog():boolean {
           return this.formationContinuePubliqueProfessionelService.createFormationContinuePubliqueProfessionelDialog;
       }
    set createFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.createFormationContinuePubliqueProfessionelDialog= value;
       }
    
    get editFormationContinuePubliqueProfessionelDialog():boolean {
           return this.formationContinuePubliqueProfessionelService.editFormationContinuePubliqueProfessionelDialog;
       }
    set editFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.editFormationContinuePubliqueProfessionelDialog= value;
       }
    get viewFormationContinuePubliqueProfessionelDialog():boolean {
           return this.formationContinuePubliqueProfessionelService.viewFormationContinuePubliqueProfessionelDialog;
       }
    set viewFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.viewFormationContinuePubliqueProfessionelDialog = value;
       }
       
     get searchFormationContinuePubliqueProfessionel(): FormationContinuePubliqueProfessionelVo {
        return this.formationContinuePubliqueProfessionelService.searchFormationContinuePubliqueProfessionel;
       }
    set searchFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this.formationContinuePubliqueProfessionelService.searchFormationContinuePubliqueProfessionel = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

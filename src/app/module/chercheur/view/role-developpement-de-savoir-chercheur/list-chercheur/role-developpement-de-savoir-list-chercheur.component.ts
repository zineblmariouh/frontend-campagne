import {Component, OnInit} from '@angular/core';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';


import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-role-developpement-de-savoir-list-chercheur',
  templateUrl: './role-developpement-de-savoir-list-chercheur.component.html',
  styleUrls: ['./role-developpement-de-savoir-list-chercheur.component.css']
})
export class RoleDeveloppementDeSavoirListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RoleDeveloppementDeSavoir';


    constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

) { }

    ngOnInit(): void {
      this.loadRoleDeveloppementDeSavoirs();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadRoleDeveloppementDeSavoirs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'list');
        isPermistted ? this.roleDeveloppementDeSavoirService.findAll().subscribe(roleDeveloppementDeSavoirs => this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.roleDeveloppementDeSavoirService.findByCriteria(this.searchRoleDeveloppementDeSavoir).subscribe(roleDeveloppementDeSavoirs=>{
            
            this.roleDeveloppementDeSavoirs = roleDeveloppementDeSavoirs;
           // this.searchRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
                            {field: 'code', header: 'Code'},
        ];
    }
    
    public async editRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'edit');
         if(isPermistted){
          this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(res => {
           this.selectedRoleDeveloppementDeSavoir = res;
            this.editRoleDeveloppementDeSavoirDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo){
        const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'view');
        if(isPermistted){
           this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(res => {
           this.selectedRoleDeveloppementDeSavoir = res;
            this.viewRoleDeveloppementDeSavoirDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRoleDeveloppementDeSavoir(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
            this.createRoleDeveloppementDeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir:RoleDeveloppementDeSavoirVo){
       const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Role developpement de savoir) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.roleDeveloppementDeSavoirService.delete(roleDeveloppementDeSavoir).subscribe(status=>{
                          if(status > 0){
                          const position = this.roleDeveloppementDeSavoirs.indexOf(roleDeveloppementDeSavoir);
                          position > -1 ? this.roleDeveloppementDeSavoirs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Role developpement de savoir Supprimé',
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


public async duplicateRoleDeveloppementDeSavoir(roleDeveloppementDeSavoir: RoleDeveloppementDeSavoirVo) {

     this.roleDeveloppementDeSavoirService.findByIdWithAssociatedList(roleDeveloppementDeSavoir).subscribe(
	 res => {
	       this.initDuplicateRoleDeveloppementDeSavoir(res);
	       this.selectedRoleDeveloppementDeSavoir = res;
	       this.selectedRoleDeveloppementDeSavoir.id = null;
            this.createRoleDeveloppementDeSavoirDialog = true;

});

	}

	initDuplicateRoleDeveloppementDeSavoir(res: RoleDeveloppementDeSavoirVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.roleDeveloppementDeSavoirs.map(e => {
    return {
                    'Libelle': e.libelle ,
                    'Code': e.code ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchRoleDeveloppementDeSavoir.libelle ? this.searchRoleDeveloppementDeSavoir.libelle : environment.emptyForExport ,
            'Code': this.searchRoleDeveloppementDeSavoir.code ? this.searchRoleDeveloppementDeSavoir.code : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
    set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }

    get roleDeveloppementDeSavoirSelections(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirSelections;
       }
    set roleDeveloppementDeSavoirSelections(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirSelections = value;
       }
   
     


    get selectedRoleDeveloppementDeSavoir():RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
    
    get createRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
       }
    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
       }
    
    get editRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;
       }
    set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog= value;
       }
    get viewRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog;
       }
    set viewRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.viewRoleDeveloppementDeSavoirDialog = value;
       }
       
     get searchRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
        return this.roleDeveloppementDeSavoirService.searchRoleDeveloppementDeSavoir;
       }
    set searchRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.searchRoleDeveloppementDeSavoir = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

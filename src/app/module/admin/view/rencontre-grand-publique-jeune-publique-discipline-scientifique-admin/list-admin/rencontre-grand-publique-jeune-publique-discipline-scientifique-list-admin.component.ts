import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreGrandPubliqueJeunePubliqueService } from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-discipline-scientifique-list-admin',
  templateUrl: './rencontre-grand-publique-jeune-publique-discipline-scientifique-list-admin.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-discipline-scientifique-list-admin.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreGrandPubliqueJeunePubliqueDisciplineScientifique';
    rencontreGrandPubliqueJeunePubliques :Array<RencontreGrandPubliqueJeunePubliqueVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadRencontreGrandPubliqueJeunePublique();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadRencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'list');
        isPermistted ? this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques => this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.findByCriteria(this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique).subscribe(rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques=>{
            
            this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
           // this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreGrandPubliqueJeunePublique?.id', header: 'Rencontre grand publique jeune publique'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'edit');
         if(isPermistted){
          this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = res;
            this.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'view');
        if(isPermistted){
           this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique).subscribe(res => {
           this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = res;
            this.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
            this.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre grand publique jeune publique discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.delete(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.indexOf(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique);
                          position > -1 ? this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre grand publique jeune publique discipline scientifique Supprimé',
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

public async loadRencontreGrandPubliqueJeunePublique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'list');
    isPermistted ? this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe(rencontreGrandPubliqueJeunePubliques => this.rencontreGrandPubliqueJeunePubliques = rencontreGrandPubliqueJeunePubliques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePubliqueDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {

     this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(res);
	       this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = res;
	       this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.id = null;
            this.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(res: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.map(e => {
    return {
            'Rencontre grand publique jeune publique': e.rencontreGrandPubliqueJeunePubliqueVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Rencontre grand publique jeune publique': this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.rencontreGrandPubliqueJeunePubliqueVo?.id ? this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.rencontreGrandPubliqueJeunePubliqueVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
       }
    set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = value;
       }

    get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections;
       }
    set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique():RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }
    
    get createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }
    set createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog= value;
       }
    
    get editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }
    set editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog= value;
       }
    get viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }
    set viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = value;
       }
       
     get searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(): RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
        return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }
    set searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

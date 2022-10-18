import {Component, OnInit} from '@angular/core';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { RencontreMediaService } from '../../../../../controller/service/RencontreMedia.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-rencontre-media-discipline-scientifique-list-chercheur',
  templateUrl: './rencontre-media-discipline-scientifique-list-chercheur.component.html',
  styleUrls: ['./rencontre-media-discipline-scientifique-list-chercheur.component.css']
})
export class RencontreMediaDisciplineScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'RencontreMediaDisciplineScientifique';
    rencontreMedias :Array<RencontreMediaVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private rencontreMediaDisciplineScientifiqueService: RencontreMediaDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private rencontreMediaService: RencontreMediaService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadRencontreMediaDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadRencontreMedia();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadRencontreMediaDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'list');
        isPermistted ? this.rencontreMediaDisciplineScientifiqueService.findAll().subscribe(rencontreMediaDisciplineScientifiques => this.rencontreMediaDisciplineScientifiques = rencontreMediaDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.rencontreMediaDisciplineScientifiqueService.findByCriteria(this.searchRencontreMediaDisciplineScientifique).subscribe(rencontreMediaDisciplineScientifiques=>{
            
            this.rencontreMediaDisciplineScientifiques = rencontreMediaDisciplineScientifiques;
           // this.searchRencontreMediaDisciplineScientifique = new RencontreMediaDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'rencontreMedia?.id', header: 'Rencontre media'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editRencontreMediaDisciplineScientifique(rencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'edit');
         if(isPermistted){
          this.rencontreMediaDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreMediaDisciplineScientifique).subscribe(res => {
           this.selectedRencontreMediaDisciplineScientifique = res;
            this.editRencontreMediaDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewRencontreMediaDisciplineScientifique(rencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'view');
        if(isPermistted){
           this.rencontreMediaDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreMediaDisciplineScientifique).subscribe(res => {
           this.selectedRencontreMediaDisciplineScientifique = res;
            this.viewRencontreMediaDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateRencontreMediaDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedRencontreMediaDisciplineScientifique = new RencontreMediaDisciplineScientifiqueVo();
            this.createRencontreMediaDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteRencontreMediaDisciplineScientifique(rencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Rencontre media discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.rencontreMediaDisciplineScientifiqueService.delete(rencontreMediaDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.rencontreMediaDisciplineScientifiques.indexOf(rencontreMediaDisciplineScientifique);
                          position > -1 ? this.rencontreMediaDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Rencontre media discipline scientifique Supprimé',
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

public async loadRencontreMedia(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'list');
    isPermistted ? this.rencontreMediaService.findAll().subscribe(rencontreMedias => this.rencontreMedias = rencontreMedias,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('RencontreMediaDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateRencontreMediaDisciplineScientifique(rencontreMediaDisciplineScientifique: RencontreMediaDisciplineScientifiqueVo) {

     this.rencontreMediaDisciplineScientifiqueService.findByIdWithAssociatedList(rencontreMediaDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateRencontreMediaDisciplineScientifique(res);
	       this.selectedRencontreMediaDisciplineScientifique = res;
	       this.selectedRencontreMediaDisciplineScientifique.id = null;
            this.createRencontreMediaDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateRencontreMediaDisciplineScientifique(res: RencontreMediaDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.rencontreMediaDisciplineScientifiques.map(e => {
    return {
            'Rencontre media': e.rencontreMediaVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Rencontre media': this.searchRencontreMediaDisciplineScientifique.rencontreMediaVo?.id ? this.searchRencontreMediaDisciplineScientifique.rencontreMediaVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchRencontreMediaDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchRencontreMediaDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get rencontreMediaDisciplineScientifiques(): Array<RencontreMediaDisciplineScientifiqueVo> {
           return this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques;
       }
    set rencontreMediaDisciplineScientifiques(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques = value;
       }

    get rencontreMediaDisciplineScientifiqueSelections(): Array<RencontreMediaDisciplineScientifiqueVo> {
           return this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiqueSelections;
       }
    set rencontreMediaDisciplineScientifiqueSelections(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedRencontreMediaDisciplineScientifique():RencontreMediaDisciplineScientifiqueVo {
           return this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique;
       }
    set selectedRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique = value;
       }
    
    get createRencontreMediaDisciplineScientifiqueDialog():boolean {
           return this.rencontreMediaDisciplineScientifiqueService.createRencontreMediaDisciplineScientifiqueDialog;
       }
    set createRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.createRencontreMediaDisciplineScientifiqueDialog= value;
       }
    
    get editRencontreMediaDisciplineScientifiqueDialog():boolean {
           return this.rencontreMediaDisciplineScientifiqueService.editRencontreMediaDisciplineScientifiqueDialog;
       }
    set editRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.editRencontreMediaDisciplineScientifiqueDialog= value;
       }
    get viewRencontreMediaDisciplineScientifiqueDialog():boolean {
           return this.rencontreMediaDisciplineScientifiqueService.viewRencontreMediaDisciplineScientifiqueDialog;
       }
    set viewRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.viewRencontreMediaDisciplineScientifiqueDialog = value;
       }
       
     get searchRencontreMediaDisciplineScientifique(): RencontreMediaDisciplineScientifiqueVo {
        return this.rencontreMediaDisciplineScientifiqueService.searchRencontreMediaDisciplineScientifique;
       }
    set searchRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this.rencontreMediaDisciplineScientifiqueService.searchRencontreMediaDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

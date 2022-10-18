import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { OutilPedagogiqueService } from '../../../../../controller/service/OutilPedagogique.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-outil-pedagogique-discipline-scientifique-list-chercheur',
  templateUrl: './outil-pedagogique-discipline-scientifique-list-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-discipline-scientifique-list-chercheur.component.css']
})
export class OutilPedagogiqueDisciplineScientifiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'OutilPedagogiqueDisciplineScientifique';
    outilPedagogiques :Array<OutilPedagogiqueVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private outilPedagogiqueDisciplineScientifiqueService: OutilPedagogiqueDisciplineScientifiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private outilPedagogiqueService: OutilPedagogiqueService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadOutilPedagogiqueDisciplineScientifiques();
      this.initExport();
      this.initCol();
      this.loadOutilPedagogique();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadOutilPedagogiqueDisciplineScientifiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'list');
        isPermistted ? this.outilPedagogiqueDisciplineScientifiqueService.findAll().subscribe(outilPedagogiqueDisciplineScientifiques => this.outilPedagogiqueDisciplineScientifiques = outilPedagogiqueDisciplineScientifiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.outilPedagogiqueDisciplineScientifiqueService.findByCriteria(this.searchOutilPedagogiqueDisciplineScientifique).subscribe(outilPedagogiqueDisciplineScientifiques=>{
            
            this.outilPedagogiqueDisciplineScientifiques = outilPedagogiqueDisciplineScientifiques;
           // this.searchOutilPedagogiqueDisciplineScientifique = new OutilPedagogiqueDisciplineScientifiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'outilPedagogique?.id', header: 'Outil pedagogique'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editOutilPedagogiqueDisciplineScientifique(outilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'edit');
         if(isPermistted){
          this.outilPedagogiqueDisciplineScientifiqueService.findByIdWithAssociatedList(outilPedagogiqueDisciplineScientifique).subscribe(res => {
           this.selectedOutilPedagogiqueDisciplineScientifique = res;
            this.editOutilPedagogiqueDisciplineScientifiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewOutilPedagogiqueDisciplineScientifique(outilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo){
        const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'view');
        if(isPermistted){
           this.outilPedagogiqueDisciplineScientifiqueService.findByIdWithAssociatedList(outilPedagogiqueDisciplineScientifique).subscribe(res => {
           this.selectedOutilPedagogiqueDisciplineScientifique = res;
            this.viewOutilPedagogiqueDisciplineScientifiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateOutilPedagogiqueDisciplineScientifique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedOutilPedagogiqueDisciplineScientifique = new OutilPedagogiqueDisciplineScientifiqueVo();
            this.createOutilPedagogiqueDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteOutilPedagogiqueDisciplineScientifique(outilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo){
       const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Outil pedagogique discipline scientifique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.outilPedagogiqueDisciplineScientifiqueService.delete(outilPedagogiqueDisciplineScientifique).subscribe(status=>{
                          if(status > 0){
                          const position = this.outilPedagogiqueDisciplineScientifiques.indexOf(outilPedagogiqueDisciplineScientifique);
                          position > -1 ? this.outilPedagogiqueDisciplineScientifiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Outil pedagogique discipline scientifique Supprimé',
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

public async loadOutilPedagogique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'list');
    isPermistted ? this.outilPedagogiqueService.findAll().subscribe(outilPedagogiques => this.outilPedagogiques = outilPedagogiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('OutilPedagogiqueDisciplineScientifique', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateOutilPedagogiqueDisciplineScientifique(outilPedagogiqueDisciplineScientifique: OutilPedagogiqueDisciplineScientifiqueVo) {

     this.outilPedagogiqueDisciplineScientifiqueService.findByIdWithAssociatedList(outilPedagogiqueDisciplineScientifique).subscribe(
	 res => {
	       this.initDuplicateOutilPedagogiqueDisciplineScientifique(res);
	       this.selectedOutilPedagogiqueDisciplineScientifique = res;
	       this.selectedOutilPedagogiqueDisciplineScientifique.id = null;
            this.createOutilPedagogiqueDisciplineScientifiqueDialog = true;

});

	}

	initDuplicateOutilPedagogiqueDisciplineScientifique(res: OutilPedagogiqueDisciplineScientifiqueVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.outilPedagogiqueDisciplineScientifiques.map(e => {
    return {
            'Outil pedagogique': e.outilPedagogiqueVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Outil pedagogique': this.searchOutilPedagogiqueDisciplineScientifique.outilPedagogiqueVo?.id ? this.searchOutilPedagogiqueDisciplineScientifique.outilPedagogiqueVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchOutilPedagogiqueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng ? this.searchOutilPedagogiqueDisciplineScientifique.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get outilPedagogiqueDisciplineScientifiques(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
           return this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques;
       }
    set outilPedagogiqueDisciplineScientifiques(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques = value;
       }

    get outilPedagogiqueDisciplineScientifiqueSelections(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
           return this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiqueSelections;
       }
    set outilPedagogiqueDisciplineScientifiqueSelections(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiqueSelections = value;
       }
   
     


    get selectedOutilPedagogiqueDisciplineScientifique():OutilPedagogiqueDisciplineScientifiqueVo {
           return this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique;
       }
    set selectedOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique = value;
       }
    
    get createOutilPedagogiqueDisciplineScientifiqueDialog():boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.createOutilPedagogiqueDisciplineScientifiqueDialog;
       }
    set createOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.createOutilPedagogiqueDisciplineScientifiqueDialog= value;
       }
    
    get editOutilPedagogiqueDisciplineScientifiqueDialog():boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.editOutilPedagogiqueDisciplineScientifiqueDialog;
       }
    set editOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.editOutilPedagogiqueDisciplineScientifiqueDialog= value;
       }
    get viewOutilPedagogiqueDisciplineScientifiqueDialog():boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.viewOutilPedagogiqueDisciplineScientifiqueDialog;
       }
    set viewOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.viewOutilPedagogiqueDisciplineScientifiqueDialog = value;
       }
       
     get searchOutilPedagogiqueDisciplineScientifique(): OutilPedagogiqueDisciplineScientifiqueVo {
        return this.outilPedagogiqueDisciplineScientifiqueService.searchOutilPedagogiqueDisciplineScientifique;
       }
    set searchOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.outilPedagogiqueDisciplineScientifiqueService.searchOutilPedagogiqueDisciplineScientifique = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

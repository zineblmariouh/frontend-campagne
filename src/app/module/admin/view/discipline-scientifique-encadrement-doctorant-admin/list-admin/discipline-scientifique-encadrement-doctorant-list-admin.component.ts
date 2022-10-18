import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { EncadrementDoctorantService } from '../../../../../controller/service/EncadrementDoctorant.service';
import { DisciplineScientifiqueService } from '../../../../../controller/service/DisciplineScientifique.service';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-encadrement-doctorant-list-admin',
  templateUrl: './discipline-scientifique-encadrement-doctorant-list-admin.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-doctorant-list-admin.component.css']
})
export class DisciplineScientifiqueEncadrementDoctorantListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueEncadrementDoctorant';
    encadrementDoctorants :Array<EncadrementDoctorantVo>;
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementDoctorantService: DisciplineScientifiqueEncadrementDoctorantService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private encadrementDoctorantService: EncadrementDoctorantService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
) { }

    ngOnInit(): void {
      this.loadDisciplineScientifiqueEncadrementDoctorants();
      this.initExport();
      this.initCol();
      this.loadEncadrementDoctorant();
      this.loadDisciplineScientifique();
    }
    
    // methods
      public async loadDisciplineScientifiqueEncadrementDoctorants(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'list');
        isPermistted ? this.disciplineScientifiqueEncadrementDoctorantService.findAll().subscribe(disciplineScientifiqueEncadrementDoctorants => this.disciplineScientifiqueEncadrementDoctorants = disciplineScientifiqueEncadrementDoctorants,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueEncadrementDoctorantService.findByCriteria(this.searchDisciplineScientifiqueEncadrementDoctorant).subscribe(disciplineScientifiqueEncadrementDoctorants=>{
            
            this.disciplineScientifiqueEncadrementDoctorants = disciplineScientifiqueEncadrementDoctorants;
           // this.searchDisciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'encadrementDoctorant?.id', header: 'Encadrement doctorant'},
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
        ];
    }
    
    public async editDisciplineScientifiqueEncadrementDoctorant(disciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueEncadrementDoctorantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementDoctorant).subscribe(res => {
           this.selectedDisciplineScientifiqueEncadrementDoctorant = res;
            this.editDisciplineScientifiqueEncadrementDoctorantDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueEncadrementDoctorant(disciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'view');
        if(isPermistted){
           this.disciplineScientifiqueEncadrementDoctorantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementDoctorant).subscribe(res => {
           this.selectedDisciplineScientifiqueEncadrementDoctorant = res;
            this.viewDisciplineScientifiqueEncadrementDoctorantDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueEncadrementDoctorant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();
            this.createDisciplineScientifiqueEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueEncadrementDoctorant(disciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique encadrement doctorant) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueEncadrementDoctorantService.delete(disciplineScientifiqueEncadrementDoctorant).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueEncadrementDoctorants.indexOf(disciplineScientifiqueEncadrementDoctorant);
                          position > -1 ? this.disciplineScientifiqueEncadrementDoctorants.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique encadrement doctorant Supprimé',
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

public async loadEncadrementDoctorant(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'list');
    isPermistted ? this.encadrementDoctorantService.findAll().subscribe(encadrementDoctorants => this.encadrementDoctorants = encadrementDoctorants,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueEncadrementDoctorant', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueEncadrementDoctorant(disciplineScientifiqueEncadrementDoctorant: DisciplineScientifiqueEncadrementDoctorantVo) {

     this.disciplineScientifiqueEncadrementDoctorantService.findByIdWithAssociatedList(disciplineScientifiqueEncadrementDoctorant).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueEncadrementDoctorant(res);
	       this.selectedDisciplineScientifiqueEncadrementDoctorant = res;
	       this.selectedDisciplineScientifiqueEncadrementDoctorant.id = null;
            this.createDisciplineScientifiqueEncadrementDoctorantDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueEncadrementDoctorant(res: DisciplineScientifiqueEncadrementDoctorantVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.disciplineScientifiqueEncadrementDoctorants.map(e => {
    return {
            'Encadrement doctorant': e.encadrementDoctorantVo?.id ,
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
     }
      });

      this.criteriaData = [{
        'Encadrement doctorant': this.searchDisciplineScientifiqueEncadrementDoctorant.encadrementDoctorantVo?.id ? this.searchDisciplineScientifiqueEncadrementDoctorant.encadrementDoctorantVo?.id : environment.emptyForExport ,
        'Discipline scientifique': this.searchDisciplineScientifiqueEncadrementDoctorant.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueEncadrementDoctorant.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueEncadrementDoctorants(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
           return this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants;
       }
    set disciplineScientifiqueEncadrementDoctorants(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants = value;
       }

    get disciplineScientifiqueEncadrementDoctorantSelections(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
           return this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorantSelections;
       }
    set disciplineScientifiqueEncadrementDoctorantSelections(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorantSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueEncadrementDoctorant():DisciplineScientifiqueEncadrementDoctorantVo {
           return this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant;
       }
    set selectedDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant = value;
       }
    
    get createDisciplineScientifiqueEncadrementDoctorantDialog():boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.createDisciplineScientifiqueEncadrementDoctorantDialog;
       }
    set createDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.createDisciplineScientifiqueEncadrementDoctorantDialog= value;
       }
    
    get editDisciplineScientifiqueEncadrementDoctorantDialog():boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.editDisciplineScientifiqueEncadrementDoctorantDialog;
       }
    set editDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.editDisciplineScientifiqueEncadrementDoctorantDialog= value;
       }
    get viewDisciplineScientifiqueEncadrementDoctorantDialog():boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.viewDisciplineScientifiqueEncadrementDoctorantDialog;
       }
    set viewDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.viewDisciplineScientifiqueEncadrementDoctorantDialog = value;
       }
       
     get searchDisciplineScientifiqueEncadrementDoctorant(): DisciplineScientifiqueEncadrementDoctorantVo {
        return this.disciplineScientifiqueEncadrementDoctorantService.searchDisciplineScientifiqueEncadrementDoctorant;
       }
    set searchDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.disciplineScientifiqueEncadrementDoctorantService.searchDisciplineScientifiqueEncadrementDoctorant = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

import {Component, OnInit} from '@angular/core';
import {KeyWordDisciplineScientifiqueErcService} from '../../../../../controller/service/KeyWordDisciplineScientifiqueErc.service';
import {KeyWordDisciplineScientifiqueErcVo} from '../../../../../controller/model/KeyWordDisciplineScientifiqueErc.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { KeyWordService } from '../../../../../controller/service/KeyWord.service';
import { DisciplineScientifiqueErcService } from '../../../../../controller/service/DisciplineScientifiqueErc.service';

import {KeyWordVo} from '../../../../../controller/model/KeyWord.model';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-key-word-discipline-scientifique-erc-list-chercheur',
  templateUrl: './key-word-discipline-scientifique-erc-list-chercheur.component.html',
  styleUrls: ['./key-word-discipline-scientifique-erc-list-chercheur.component.css']
})
export class KeyWordDisciplineScientifiqueErcListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'KeyWordDisciplineScientifiqueErc';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    keyWords :Array<KeyWordVo>;
    disciplineScientifiqueErcs :Array<DisciplineScientifiqueErcVo>;


    constructor(private datePipe: DatePipe, private keyWordDisciplineScientifiqueErcService: KeyWordDisciplineScientifiqueErcService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private keyWordService: KeyWordService
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
) { }

    ngOnInit(): void {
      this.loadKeyWordDisciplineScientifiqueErcs();
      this.initExport();
      this.initCol();
      this.loadKeyWord();
      this.loadDisciplineScientifiqueErc();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadKeyWordDisciplineScientifiqueErcs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
        isPermistted ? this.keyWordDisciplineScientifiqueErcService.findAll().subscribe(keyWordDisciplineScientifiqueErcs => this.keyWordDisciplineScientifiqueErcs = keyWordDisciplineScientifiqueErcs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.keyWordDisciplineScientifiqueErcService.findByCriteria(this.searchKeyWordDisciplineScientifiqueErc).subscribe(keyWordDisciplineScientifiqueErcs=>{
            
            this.keyWordDisciplineScientifiqueErcs = keyWordDisciplineScientifiqueErcs;
           // this.searchKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'keyWord?.libelleEng', header: 'Key word'},
                        {field: 'disciplineScientifiqueErc?.libelleEng', header: 'Discipline scientifique erc'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc:KeyWordDisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'edit');
         if(isPermistted){
          this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(res => {
           this.selectedKeyWordDisciplineScientifiqueErc = res;
            this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage = new Date(keyWordDisciplineScientifiqueErc.dateArchivage);
            this.selectedKeyWordDisciplineScientifiqueErc.dateCreation = new Date(keyWordDisciplineScientifiqueErc.dateCreation);
            this.editKeyWordDisciplineScientifiqueErcDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc:KeyWordDisciplineScientifiqueErcVo){
        const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'view');
        if(isPermistted){
           this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(res => {
           this.selectedKeyWordDisciplineScientifiqueErc = res;
            this.selectedKeyWordDisciplineScientifiqueErc.dateArchivage = new Date(keyWordDisciplineScientifiqueErc.dateArchivage);
            this.selectedKeyWordDisciplineScientifiqueErc.dateCreation = new Date(keyWordDisciplineScientifiqueErc.dateCreation);
            this.viewKeyWordDisciplineScientifiqueErcDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateKeyWordDisciplineScientifiqueErc(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedKeyWordDisciplineScientifiqueErc = new KeyWordDisciplineScientifiqueErcVo();
            this.createKeyWordDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc:KeyWordDisciplineScientifiqueErcVo){
       const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Key word discipline scientifique erc) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.keyWordDisciplineScientifiqueErcService.delete(keyWordDisciplineScientifiqueErc).subscribe(status=>{
                          if(status > 0){
                          const position = this.keyWordDisciplineScientifiqueErcs.indexOf(keyWordDisciplineScientifiqueErc);
                          position > -1 ? this.keyWordDisciplineScientifiqueErcs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Key word discipline scientifique erc Supprimé',
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

public async loadKeyWord(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
    isPermistted ? this.keyWordService.findAll().subscribe(keyWords => this.keyWords = keyWords,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifiqueErc(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('KeyWordDisciplineScientifiqueErc', 'list');
    isPermistted ? this.disciplineScientifiqueErcService.findAll().subscribe(disciplineScientifiqueErcs => this.disciplineScientifiqueErcs = disciplineScientifiqueErcs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateKeyWordDisciplineScientifiqueErc(keyWordDisciplineScientifiqueErc: KeyWordDisciplineScientifiqueErcVo) {

     this.keyWordDisciplineScientifiqueErcService.findByIdWithAssociatedList(keyWordDisciplineScientifiqueErc).subscribe(
	 res => {
	       this.initDuplicateKeyWordDisciplineScientifiqueErc(res);
	       this.selectedKeyWordDisciplineScientifiqueErc = res;
	       this.selectedKeyWordDisciplineScientifiqueErc.id = null;
            this.createKeyWordDisciplineScientifiqueErcDialog = true;

});

	}

	initDuplicateKeyWordDisciplineScientifiqueErc(res: KeyWordDisciplineScientifiqueErcVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.keyWordDisciplineScientifiqueErcs.map(e => {
    return {
            'Key word': e.keyWordVo?.libelleEng ,
            'Discipline scientifique erc': e.disciplineScientifiqueErcVo?.libelleEng ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
        'Key word': this.searchKeyWordDisciplineScientifiqueErc.keyWordVo?.libelleEng ? this.searchKeyWordDisciplineScientifiqueErc.keyWordVo?.libelleEng : environment.emptyForExport ,
        'Discipline scientifique erc': this.searchKeyWordDisciplineScientifiqueErc.disciplineScientifiqueErcVo?.libelleEng ? this.searchKeyWordDisciplineScientifiqueErc.disciplineScientifiqueErcVo?.libelleEng : environment.emptyForExport ,
            'Archive': this.searchKeyWordDisciplineScientifiqueErc.archive ? (this.searchKeyWordDisciplineScientifiqueErc.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMin ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMax ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchKeyWordDisciplineScientifiqueErc.dateCreationMin ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchKeyWordDisciplineScientifiqueErc.dateCreationMax ? this.datePipe.transform(this.searchKeyWordDisciplineScientifiqueErc.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchKeyWordDisciplineScientifiqueErc.admin ? (this.searchKeyWordDisciplineScientifiqueErc.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchKeyWordDisciplineScientifiqueErc.visible ? (this.searchKeyWordDisciplineScientifiqueErc.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchKeyWordDisciplineScientifiqueErc.username ? this.searchKeyWordDisciplineScientifiqueErc.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get keyWordDisciplineScientifiqueErcs(): Array<KeyWordDisciplineScientifiqueErcVo> {
           return this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs;
       }
    set keyWordDisciplineScientifiqueErcs(value: Array<KeyWordDisciplineScientifiqueErcVo>) {
        this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcs = value;
       }

    get keyWordDisciplineScientifiqueErcSelections(): Array<KeyWordDisciplineScientifiqueErcVo> {
           return this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcSelections;
       }
    set keyWordDisciplineScientifiqueErcSelections(value: Array<KeyWordDisciplineScientifiqueErcVo>) {
        this.keyWordDisciplineScientifiqueErcService.keyWordDisciplineScientifiqueErcSelections = value;
       }
   
     


    get selectedKeyWordDisciplineScientifiqueErc():KeyWordDisciplineScientifiqueErcVo {
           return this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc;
       }
    set selectedKeyWordDisciplineScientifiqueErc(value: KeyWordDisciplineScientifiqueErcVo) {
        this.keyWordDisciplineScientifiqueErcService.selectedKeyWordDisciplineScientifiqueErc = value;
       }
    
    get createKeyWordDisciplineScientifiqueErcDialog():boolean {
           return this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog;
       }
    set createKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.createKeyWordDisciplineScientifiqueErcDialog= value;
       }
    
    get editKeyWordDisciplineScientifiqueErcDialog():boolean {
           return this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog;
       }
    set editKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.editKeyWordDisciplineScientifiqueErcDialog= value;
       }
    get viewKeyWordDisciplineScientifiqueErcDialog():boolean {
           return this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog;
       }
    set viewKeyWordDisciplineScientifiqueErcDialog(value: boolean) {
        this.keyWordDisciplineScientifiqueErcService.viewKeyWordDisciplineScientifiqueErcDialog = value;
       }
       
     get searchKeyWordDisciplineScientifiqueErc(): KeyWordDisciplineScientifiqueErcVo {
        return this.keyWordDisciplineScientifiqueErcService.searchKeyWordDisciplineScientifiqueErc;
       }
    set searchKeyWordDisciplineScientifiqueErc(value: KeyWordDisciplineScientifiqueErcVo) {
        this.keyWordDisciplineScientifiqueErcService.searchKeyWordDisciplineScientifiqueErc = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

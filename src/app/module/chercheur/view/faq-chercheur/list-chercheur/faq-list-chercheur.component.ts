import {Component, OnInit} from '@angular/core';
import {FaqService} from '../../../../../controller/service/Faq.service';
import {FaqVo} from '../../../../../controller/model/Faq.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { CategorieFaqService } from '../../../../../controller/service/CategorieFaq.service';

import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../controller/service/Export.service';

@Component({
  selector: 'app-faq-list-chercheur',
  templateUrl: './faq-list-chercheur.component.html',
  styleUrls: ['./faq-list-chercheur.component.css']
})
export class FaqListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Faq';
     yesOrNoArchive :any[] =[];
    categorieFaqs :Array<CategorieFaqVo>;


    constructor(private datePipe: DatePipe, private faqService: FaqService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService

        , private categorieFaqService: CategorieFaqService
) { }

    ngOnInit(): void {
      this.loadFaqs();
      this.initExport();
      this.initCol();
      this.loadCategorieFaq();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadFaqs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Faq', 'list');
        isPermistted ? this.faqService.findAll().subscribe(faqs => this.faqs = faqs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.faqService.findByCriteria(this.searchFaq).subscribe(faqs=>{
            
            this.faqs = faqs;
           // this.searchFaq = new FaqVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'question', header: 'Question'},
                            {field: 'contact', header: 'Contact'},
                        {field: 'categorieFaq?.libelle', header: 'Categorie faq'},
                            {field: 'ordre', header: 'Ordre'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'lien', header: 'Lien'},
                            {field: 'dernierMisAJour', header: 'Dernier mis a jour'},
        ];
    }
    
    public async editFaq(faq:FaqVo){
        const isPermistted = await this.roleService.isPermitted('Faq', 'edit');
         if(isPermistted){
          this.faqService.findByIdWithAssociatedList(faq).subscribe(res => {
           this.selectedFaq = res;
            this.selectedFaq.dernierMisAJour = new Date(faq.dernierMisAJour);
            this.editFaqDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewFaq(faq:FaqVo){
        const isPermistted = await this.roleService.isPermitted('Faq', 'view');
        if(isPermistted){
           this.faqService.findByIdWithAssociatedList(faq).subscribe(res => {
           this.selectedFaq = res;
            this.selectedFaq.dernierMisAJour = new Date(faq.dernierMisAJour);
            this.viewFaqDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateFaq(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedFaq = new FaqVo();
            this.createFaqDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteFaq(faq:FaqVo){
       const isPermistted = await this.roleService.isPermitted('Faq', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Faq) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.faqService.delete(faq).subscribe(status=>{
                          if(status > 0){
                          const position = this.faqs.indexOf(faq);
                          position > -1 ? this.faqs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Faq Supprimé',
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

public async loadCategorieFaq(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Faq', 'list');
    isPermistted ? this.categorieFaqService.findAll().subscribe(categorieFaqs => this.categorieFaqs = categorieFaqs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateFaq(faq: FaqVo) {

     this.faqService.findByIdWithAssociatedList(faq).subscribe(
	 res => {
	       this.initDuplicateFaq(res);
	       this.selectedFaq = res;
	       this.selectedFaq.id = null;
            this.createFaqDialog = true;

});

	}

	initDuplicateFaq(res: FaqVo) {


	}

  initExport(): void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport(): void {
    this.exportData = this.faqs.map(e => {
    return {
                    'Question': e.question ,
                    'Reponse': e.reponse ,
                    'Contact': e.contact ,
            'Categorie faq': e.categorieFaqVo?.libelle ,
                    'Ordre': e.ordre ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Lien': e.lien ,
                    'Dernier mis a jour': this.datePipe.transform(e.dernierMisAJour , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Question': this.searchFaq.question ? this.searchFaq.question : environment.emptyForExport ,
            'Reponse': this.searchFaq.reponse ? this.searchFaq.reponse : environment.emptyForExport ,
            'Contact': this.searchFaq.contact ? this.searchFaq.contact : environment.emptyForExport ,
        'Categorie faq': this.searchFaq.categorieFaqVo?.libelle ? this.searchFaq.categorieFaqVo?.libelle : environment.emptyForExport ,
            'Ordre Min': this.searchFaq.ordreMin ? this.searchFaq.ordreMin : environment.emptyForExport ,
            'Ordre Max': this.searchFaq.ordreMax ? this.searchFaq.ordreMax : environment.emptyForExport ,
            'Archive': this.searchFaq.archive ? (this.searchFaq.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Lien': this.searchFaq.lien ? this.searchFaq.lien : environment.emptyForExport ,
            'Dernier mis a jour Min': this.searchFaq.dernierMisAJourMin ? this.datePipe.transform(this.searchFaq.dernierMisAJourMin , this.dateFormat) : environment.emptyForExport ,
            'Dernier mis a jour Max': this.searchFaq.dernierMisAJourMax ? this.datePipe.transform(this.searchFaq.dernierMisAJourMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get faqs(): Array<FaqVo> {
           return this.faqService.faqs;
       }
    set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
       }

    get faqSelections(): Array<FaqVo> {
           return this.faqService.faqSelections;
       }
    set faqSelections(value: Array<FaqVo>) {
        this.faqService.faqSelections = value;
       }
   
     


    get selectedFaq():FaqVo {
           return this.faqService.selectedFaq;
       }
    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
       }
    
    get createFaqDialog():boolean {
           return this.faqService.createFaqDialog;
       }
    set createFaqDialog(value: boolean) {
        this.faqService.createFaqDialog= value;
       }
    
    get editFaqDialog():boolean {
           return this.faqService.editFaqDialog;
       }
    set editFaqDialog(value: boolean) {
        this.faqService.editFaqDialog= value;
       }
    get viewFaqDialog():boolean {
           return this.faqService.viewFaqDialog;
       }
    set viewFaqDialog(value: boolean) {
        this.faqService.viewFaqDialog = value;
       }
       
     get searchFaq(): FaqVo {
        return this.faqService.searchFaq;
       }
    set searchFaq(value: FaqVo) {
        this.faqService.searchFaq = value;
       }

    get dateFormat(){
            return environment.dateFormatList;
    }


}

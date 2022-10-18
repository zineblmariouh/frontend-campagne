import {Component, OnInit} from '@angular/core';
import {FaqService} from '../../../../../controller/service/Faq.service';
import {FaqVo} from '../../../../../controller/model/Faq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';

@Component({
  selector: 'app-faq-edit-admin',
  templateUrl: './faq-edit-admin.component.html',
  styleUrls: ['./faq-edit-admin.component.css']
})
export class FaqEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private faqService: FaqService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private categorieFaqService: CategorieFaqService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategorieFaq = new CategorieFaqVo();
    this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedFaq.dernierMisAJour = DateUtils.toDate(this.selectedFaq.dernierMisAJour);
    this.faqService.edit().subscribe(faq=>{
    const myIndex = this.faqs.findIndex(e => e.id === this.selectedFaq.id);
    this.faqs[myIndex] = this.selectedFaq;
    this.editFaqDialog = false;
    this.selectedFaq = new FaqVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecategorieFaq(categorieFaq: string) {
                      const isPermistted = await this.roleService.isPermitted('CategorieFaq', 'add');
                       if(isPermistted){
         this.selectedCategorieFaq = new CategorieFaqVo();
        this.createCategorieFaqDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editFaqDialog  = false;
}

// getters and setters

get faqs(): Array<FaqVo> {
    return this.faqService.faqs;
       }
set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
       }

 get selectedFaq(): FaqVo {
           return this.faqService.selectedFaq;
       }
    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
       }

   get editFaqDialog(): boolean {
           return this.faqService.editFaqDialog;

       }
    set editFaqDialog(value: boolean) {
        this.faqService.editFaqDialog = value;
       }

       get selectedCategorieFaq(): CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
      set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }
       get categorieFaqs(): Array<CategorieFaqVo> {
           return this.categorieFaqService.categorieFaqs;
       }
       set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }
       get createCategorieFaqDialog(): boolean {
           return this.categorieFaqService.createCategorieFaqDialog;
       }
      set createCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.createCategorieFaqDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

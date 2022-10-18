import {Component, OnInit} from '@angular/core';
import {FaqService} from '../../../../../controller/service/Faq.service';
import {FaqVo} from '../../../../../controller/model/Faq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';

@Component({
  selector: 'app-faq-view-chercheur',
  templateUrl: './faq-view-chercheur.component.html',
  styleUrls: ['./faq-view-chercheur.component.css']
})
export class FaqViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private faqService: FaqService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categorieFaqService :CategorieFaqService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategorieFaq = new CategorieFaqVo();
    this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
}

hideViewDialog(){
    this.viewFaqDialog  = false;
}

// getters and setters

get faqs(): Array<FaqVo> {
    return this.faqService.faqs;
       }
set faqs(value: Array<FaqVo>) {
        this.faqService.faqs = value;
       }

 get selectedFaq():FaqVo {
           return this.faqService.selectedFaq;
       }
    set selectedFaq(value: FaqVo) {
        this.faqService.selectedFaq = value;
       }

   get viewFaqDialog():boolean {
           return this.faqService.viewFaqDialog;

       }
    set viewFaqDialog(value: boolean) {
        this.faqService.viewFaqDialog= value;
       }

       get selectedCategorieFaq():CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
      set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }
       get categorieFaqs():Array<CategorieFaqVo> {
           return this.categorieFaqService.categorieFaqs;
       }
       set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }
       get editCategorieFaqDialog():boolean {
           return this.categorieFaqService.editCategorieFaqDialog;
       }
      set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

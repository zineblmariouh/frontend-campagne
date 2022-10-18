import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';
import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-faq-view-chercheur',
  templateUrl: './categorie-faq-view-chercheur.component.html',
  styleUrls: ['./categorie-faq-view-chercheur.component.css']
})
export class CategorieFaqViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieFaqService: CategorieFaqService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCategorieFaqDialog  = false;
}

// getters and setters

get categorieFaqs(): Array<CategorieFaqVo> {
    return this.categorieFaqService.categorieFaqs;
       }
set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }

 get selectedCategorieFaq():CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }

   get viewCategorieFaqDialog():boolean {
           return this.categorieFaqService.viewCategorieFaqDialog;

       }
    set viewCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.viewCategorieFaqDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

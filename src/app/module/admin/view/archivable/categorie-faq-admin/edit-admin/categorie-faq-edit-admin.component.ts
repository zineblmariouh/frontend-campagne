import {Component, OnInit} from '@angular/core';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';
import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-categorie-faq-edit-admin',
  templateUrl: './categorie-faq-edit-admin.component.html',
  styleUrls: ['./categorie-faq-edit-admin.component.css']
})
export class CategorieFaqEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private categorieFaqService: CategorieFaqService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCategorieFaq.dateArchivage = DateUtils.toDate(this.selectedCategorieFaq.dateArchivage);
            this.selectedCategorieFaq.dateCreation = DateUtils.toDate(this.selectedCategorieFaq.dateCreation);
    this.categorieFaqService.edit().subscribe(categorieFaq=>{
    const myIndex = this.categorieFaqs.findIndex(e => e.id === this.selectedCategorieFaq.id);
    this.categorieFaqs[myIndex] = this.selectedCategorieFaq;
    this.editCategorieFaqDialog = false;
    this.selectedCategorieFaq = new CategorieFaqVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCategorieFaqDialog  = false;
}

// getters and setters

get categorieFaqs(): Array<CategorieFaqVo> {
    return this.categorieFaqService.categorieFaqs;
       }
set categorieFaqs(value: Array<CategorieFaqVo>) {
        this.categorieFaqService.categorieFaqs = value;
       }

 get selectedCategorieFaq(): CategorieFaqVo {
           return this.categorieFaqService.selectedCategorieFaq;
       }
    set selectedCategorieFaq(value: CategorieFaqVo) {
        this.categorieFaqService.selectedCategorieFaq = value;
       }

   get editCategorieFaqDialog(): boolean {
           return this.categorieFaqService.editCategorieFaqDialog;

       }
    set editCategorieFaqDialog(value: boolean) {
        this.categorieFaqService.editCategorieFaqDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

import {Component, OnInit, Input} from '@angular/core';
import {FaqService} from '../../../../../controller/service/Faq.service';
import {FaqVo} from '../../../../../controller/model/Faq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';
@Component({
  selector: 'app-faq-create-admin',
  templateUrl: './faq-create-admin.component.html',
  styleUrls: ['./faq-create-admin.component.css']
})
export class FaqCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCategorieFaqLibelle = true;



constructor(private datePipe: DatePipe, private faqService: FaqService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private categorieFaqService :CategorieFaqService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategorieFaq = new CategorieFaqVo();
    this.categorieFaqService.findAll().subscribe((data) => this.categorieFaqs = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.faqService.save().subscribe(faq=>{
       this.faqs.push({...faq});
       this.createFaqDialog = false;
       this.submitted = false;
       this.selectedFaq = new FaqVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }













//openPopup
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

hideCreateDialog(){
    this.createFaqDialog  = false;
    this.setValidation(true);
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

   get createFaqDialog(): boolean {
           return this.faqService.createFaqDialog;

       }
    set createFaqDialog(value: boolean) {
        this.faqService.createFaqDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCategorieFaqLibelle(): boolean {
    return this._validCategorieFaqLibelle;
    }

    set validCategorieFaqLibelle(value: boolean) {
    this._validCategorieFaqLibelle = value;
    }

}

import {Component, OnInit, Input} from '@angular/core';
import {CategorieFaqService} from '../../../../../controller/service/CategorieFaq.service';
import {CategorieFaqVo} from '../../../../../controller/model/CategorieFaq.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-categorie-faq-create-chercheur',
  templateUrl: './categorie-faq-create-chercheur.component.html',
  styleUrls: ['./categorie-faq-create-chercheur.component.css']
})
export class CategorieFaqCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCategorieFaqLibelle = true;




constructor(private datePipe: DatePipe, private categorieFaqService: CategorieFaqService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validCategorieFaqLibelle = value;
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
     this.categorieFaqService.save().subscribe(categorieFaq=>{
       this.categorieFaqs.push({...categorieFaq});
       this.createCategorieFaqDialog = false;
       this.submitted = false;
       this.selectedCategorieFaq = new CategorieFaqVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCategorieFaqLibelle();

    }

private validateCategorieFaqLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCategorieFaq.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCategorieFaqLibelle = false;
        } else {
            this.validCategorieFaqLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createCategorieFaqDialog  = false;
    this.setValidation(true);
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

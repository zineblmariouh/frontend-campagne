import {Component, OnInit, Input} from '@angular/core';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-nature-expertise-create-chercheur',
  templateUrl: './nature-expertise-create-chercheur.component.html',
  styleUrls: ['./nature-expertise-create-chercheur.component.css']
})
export class NatureExpertiseCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNatureExpertiseLibelle = true;
   _validNatureExpertiseCode = true;




constructor(private datePipe: DatePipe, private natureExpertiseService: NatureExpertiseService
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
    this.validNatureExpertiseLibelle = value;
    this.validNatureExpertiseCode = value;
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
     this.natureExpertiseService.save().subscribe(natureExpertise=>{
       this.natureExpertises.push({...natureExpertise});
       this.createNatureExpertiseDialog = false;
       this.submitted = false;
       this.selectedNatureExpertise = new NatureExpertiseVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNatureExpertiseLibelle();
this.validateNatureExpertiseCode();

    }

private validateNatureExpertiseLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNatureExpertise.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureExpertiseLibelle = false;
        } else {
            this.validNatureExpertiseLibelle = true;
        }
    }
private validateNatureExpertiseCode(){
        if (this.stringUtilService.isEmpty(this.selectedNatureExpertise.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureExpertiseCode = false;
        } else {
            this.validNatureExpertiseCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createNatureExpertiseDialog  = false;
    this.setValidation(true);
}

// getters and setters

get natureExpertises(): Array<NatureExpertiseVo> {
    return this.natureExpertiseService.natureExpertises;
       }
set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }

 get selectedNatureExpertise():NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
    set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }

   get createNatureExpertiseDialog(): boolean {
           return this.natureExpertiseService.createNatureExpertiseDialog;

       }
    set createNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.createNatureExpertiseDialog= value;
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

    get validNatureExpertiseLibelle(): boolean {
    return this._validNatureExpertiseLibelle;
    }

    set validNatureExpertiseLibelle(value: boolean) {
    this._validNatureExpertiseLibelle = value;
    }
    get validNatureExpertiseCode(): boolean {
    return this._validNatureExpertiseCode;
    }

    set validNatureExpertiseCode(value: boolean) {
    this._validNatureExpertiseCode = value;
    }


}

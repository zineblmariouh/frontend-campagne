import {Component, OnInit, Input} from '@angular/core';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-responsabilite-direction-encadrement-etudiant-create-chercheur',
  templateUrl: './responsabilite-direction-encadrement-etudiant-create-chercheur.component.html',
  styleUrls: ['./responsabilite-direction-encadrement-etudiant-create-chercheur.component.css']
})
export class ResponsabiliteDirectionEncadrementEtudiantCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validResponsabiliteDirectionEncadrementEtudiantLibelle = true;




constructor(private datePipe: DatePipe, private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
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
    this.validResponsabiliteDirectionEncadrementEtudiantLibelle = value;
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
     this.responsabiliteDirectionEncadrementEtudiantService.save().subscribe(responsabiliteDirectionEncadrementEtudiant=>{
       this.responsabiliteDirectionEncadrementEtudiants.push({...responsabiliteDirectionEncadrementEtudiant});
       this.createResponsabiliteDirectionEncadrementEtudiantDialog = false;
       this.submitted = false;
       this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateResponsabiliteDirectionEncadrementEtudiantLibelle();

    }

private validateResponsabiliteDirectionEncadrementEtudiantLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedResponsabiliteDirectionEncadrementEtudiant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validResponsabiliteDirectionEncadrementEtudiantLibelle = false;
        } else {
            this.validResponsabiliteDirectionEncadrementEtudiantLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createResponsabiliteDirectionEncadrementEtudiantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
    return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }

 get selectedResponsabiliteDirectionEncadrementEtudiant():ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
    set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }

   get createResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog;

       }
    set createResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.createResponsabiliteDirectionEncadrementEtudiantDialog= value;
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

    get validResponsabiliteDirectionEncadrementEtudiantLibelle(): boolean {
    return this._validResponsabiliteDirectionEncadrementEtudiantLibelle;
    }

    set validResponsabiliteDirectionEncadrementEtudiantLibelle(value: boolean) {
    this._validResponsabiliteDirectionEncadrementEtudiantLibelle = value;
    }


}

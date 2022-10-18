import {Component, OnInit, Input} from '@angular/core';
import {EnseignementNatureService} from '../../../../../controller/service/EnseignementNature.service';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
@Component({
  selector: 'app-enseignement-nature-create-chercheur',
  templateUrl: './enseignement-nature-create-chercheur.component.html',
  styleUrls: ['./enseignement-nature-create-chercheur.component.css']
})
export class EnseignementNatureCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validNatureEnseignementLibelle = true;
    _validNatureEnseignementCode = true;
    _validEnseignementIntitule = true;
    _validEnseignementNombreHeure = true;
    _validEnseignementModaliteEtude = true;
    _validEnseignementTypeEtudeEnseignements = true;
    _validEnseignementNiveauEtudeEnseignements = true;
    _validEnseignementEtablissementEnseignements = true;
    _validEnseignementEnseignementZoneGeographiques = true;
    _validEnseignementEnseignementEnjeuxIrds = true;



constructor(private datePipe: DatePipe, private enseignementNatureService: EnseignementNatureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private enseignementService :EnseignementService
,       private natureEnseignementService :NatureEnseignementService
) {

}


// methods
ngOnInit(): void {

    this.selectedNatureEnseignement = new NatureEnseignementVo();
    this.natureEnseignementService.findAll().subscribe((data) => this.natureEnseignements = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
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
     this.enseignementNatureService.save().subscribe(enseignementNature=>{
       this.enseignementNatures.push({...enseignementNature});
       this.createEnseignementNatureDialog = false;
       this.submitted = false;
       this.selectedEnseignementNature = new EnseignementNatureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatenatureEnseignement(natureEnseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'add');
                       if(isPermistted){
         this.selectedNatureEnseignement = new NatureEnseignementVo();
        this.createNatureEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createEnseignementNatureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get enseignementNatures(): Array<EnseignementNatureVo> {
    return this.enseignementNatureService.enseignementNatures;
       }
set enseignementNatures(value: Array<EnseignementNatureVo>) {
        this.enseignementNatureService.enseignementNatures = value;
       }

 get selectedEnseignementNature():EnseignementNatureVo {
           return this.enseignementNatureService.selectedEnseignementNature;
       }
    set selectedEnseignementNature(value: EnseignementNatureVo) {
        this.enseignementNatureService.selectedEnseignementNature = value;
       }

   get createEnseignementNatureDialog(): boolean {
           return this.enseignementNatureService.createEnseignementNatureDialog;

       }
    set createEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.createEnseignementNatureDialog= value;
       }

       get selectedNatureEnseignement(): NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get createNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;
       }
      set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
       }
       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
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


    get validNatureEnseignementLibelle(): boolean {
    return this._validNatureEnseignementLibelle;
    }

    set validNatureEnseignementLibelle(value: boolean) {
    this._validNatureEnseignementLibelle = value;
    }
    get validNatureEnseignementCode(): boolean {
    return this._validNatureEnseignementCode;
    }

    set validNatureEnseignementCode(value: boolean) {
    this._validNatureEnseignementCode = value;
    }
    get validEnseignementIntitule(): boolean {
    return this._validEnseignementIntitule;
    }

    set validEnseignementIntitule(value: boolean) {
    this._validEnseignementIntitule = value;
    }
    get validEnseignementNombreHeure(): boolean {
    return this._validEnseignementNombreHeure;
    }

    set validEnseignementNombreHeure(value: boolean) {
    this._validEnseignementNombreHeure = value;
    }
    get validEnseignementModaliteEtude(): boolean {
    return this._validEnseignementModaliteEtude;
    }

    set validEnseignementModaliteEtude(value: boolean) {
    this._validEnseignementModaliteEtude = value;
    }
    get validEnseignementTypeEtudeEnseignements(): boolean {
    return this._validEnseignementTypeEtudeEnseignements;
    }

    set validEnseignementTypeEtudeEnseignements(value: boolean) {
    this._validEnseignementTypeEtudeEnseignements = value;
    }
    get validEnseignementNiveauEtudeEnseignements(): boolean {
    return this._validEnseignementNiveauEtudeEnseignements;
    }

    set validEnseignementNiveauEtudeEnseignements(value: boolean) {
    this._validEnseignementNiveauEtudeEnseignements = value;
    }
    get validEnseignementEtablissementEnseignements(): boolean {
    return this._validEnseignementEtablissementEnseignements;
    }

    set validEnseignementEtablissementEnseignements(value: boolean) {
    this._validEnseignementEtablissementEnseignements = value;
    }
    get validEnseignementEnseignementZoneGeographiques(): boolean {
    return this._validEnseignementEnseignementZoneGeographiques;
    }

    set validEnseignementEnseignementZoneGeographiques(value: boolean) {
    this._validEnseignementEnseignementZoneGeographiques = value;
    }
    get validEnseignementEnseignementEnjeuxIrds(): boolean {
    return this._validEnseignementEnseignementEnjeuxIrds;
    }

    set validEnseignementEnseignementEnjeuxIrds(value: boolean) {
    this._validEnseignementEnseignementEnjeuxIrds = value;
    }

}

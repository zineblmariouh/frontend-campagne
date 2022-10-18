import {Component, OnInit, Input} from '@angular/core';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
@Component({
  selector: 'app-pays-rencontre-grand-publique-jeune-publique-create-chercheur',
  templateUrl: './pays-rencontre-grand-publique-jeune-publique-create-chercheur.component.html',
  styleUrls: ['./pays-rencontre-grand-publique-jeune-publique-create-chercheur.component.css']
})
export class PaysRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;



constructor(private datePipe: DatePipe, private paysRencontreGrandPubliqueJeunePubliqueService: PaysRencontreGrandPubliqueJeunePubliqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
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
     this.paysRencontreGrandPubliqueJeunePubliqueService.save().subscribe(paysRencontreGrandPubliqueJeunePublique=>{
       this.paysRencontreGrandPubliqueJeunePubliques.push({...paysRencontreGrandPubliqueJeunePublique});
       this.createPaysRencontreGrandPubliqueJeunePubliqueDialog = false;
       this.submitted = false;
       this.selectedPaysRencontreGrandPubliqueJeunePublique = new PaysRencontreGrandPubliqueJeunePubliqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaysRencontreGrandPubliqueJeunePubliqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paysRencontreGrandPubliqueJeunePubliques(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    return this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques;
       }
set paysRencontreGrandPubliqueJeunePubliques(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedPaysRencontreGrandPubliqueJeunePublique():PaysRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique = value;
       }

   get createPaysRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.createPaysRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set createPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.createPaysRencontreGrandPubliqueJeunePubliqueDialog= value;
       }

       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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


    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }

}

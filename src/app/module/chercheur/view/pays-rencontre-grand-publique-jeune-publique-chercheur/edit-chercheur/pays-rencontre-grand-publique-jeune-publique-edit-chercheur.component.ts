import {Component, OnInit} from '@angular/core';
import {PaysRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/PaysRencontreGrandPubliqueJeunePublique.service';
import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/PaysRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-rencontre-grand-publique-jeune-publique-edit-chercheur',
  templateUrl: './pays-rencontre-grand-publique-jeune-publique-edit-chercheur.component.html',
  styleUrls: ['./pays-rencontre-grand-publique-jeune-publique-edit-chercheur.component.css']
})
export class PaysRencontreGrandPubliqueJeunePubliqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysRencontreGrandPubliqueJeunePubliqueService: PaysRencontreGrandPubliqueJeunePubliqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysRencontreGrandPubliqueJeunePubliqueService.edit().subscribe(paysRencontreGrandPubliqueJeunePublique=>{
    const myIndex = this.paysRencontreGrandPubliqueJeunePubliques.findIndex(e => e.id === this.selectedPaysRencontreGrandPubliqueJeunePublique.id);
    this.paysRencontreGrandPubliqueJeunePubliques[myIndex] = this.selectedPaysRencontreGrandPubliqueJeunePublique;
    this.editPaysRencontreGrandPubliqueJeunePubliqueDialog = false;
    this.selectedPaysRencontreGrandPubliqueJeunePublique = new PaysRencontreGrandPubliqueJeunePubliqueVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editPaysRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get paysRencontreGrandPubliqueJeunePubliques(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    return this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques;
       }
set paysRencontreGrandPubliqueJeunePubliques(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.paysRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedPaysRencontreGrandPubliqueJeunePublique(): PaysRencontreGrandPubliqueJeunePubliqueVo {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique;
       }
    set selectedPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.selectedPaysRencontreGrandPubliqueJeunePublique = value;
       }

   get editPaysRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.paysRencontreGrandPubliqueJeunePubliqueService.editPaysRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set editPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.paysRencontreGrandPubliqueJeunePubliqueService.editPaysRencontreGrandPubliqueJeunePubliqueDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

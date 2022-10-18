import {Component, OnInit} from '@angular/core';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-commanditaire-edit-chercheur',
  templateUrl: './commanditaire-edit-chercheur.component.html',
  styleUrls: ['./commanditaire-edit-chercheur.component.css']
})
export class CommanditaireEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private commanditaireService: CommanditaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCommanditaire.dateArchivage = DateUtils.toDate(this.selectedCommanditaire.dateArchivage);
            this.selectedCommanditaire.dateCreation = DateUtils.toDate(this.selectedCommanditaire.dateCreation);
    this.commanditaireService.edit().subscribe(commanditaire=>{
    const myIndex = this.commanditaires.findIndex(e => e.id === this.selectedCommanditaire.id);
    this.commanditaires[myIndex] = this.selectedCommanditaire;
    this.editCommanditaireDialog = false;
    this.selectedCommanditaire = new CommanditaireVo();


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
// methods

hideEditDialog(){
    this.editCommanditaireDialog  = false;
}

// getters and setters

get commanditaires(): Array<CommanditaireVo> {
    return this.commanditaireService.commanditaires;
       }
set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }

 get selectedCommanditaire(): CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
    set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }

   get editCommanditaireDialog(): boolean {
           return this.commanditaireService.editCommanditaireDialog;

       }
    set editCommanditaireDialog(value: boolean) {
        this.commanditaireService.editCommanditaireDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

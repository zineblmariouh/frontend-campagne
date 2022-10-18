import {Component, OnInit} from '@angular/core';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-commanditaire-view-chercheur',
  templateUrl: './commanditaire-view-chercheur.component.html',
  styleUrls: ['./commanditaire-view-chercheur.component.css']
})
export class CommanditaireViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private commanditaireService: CommanditaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewCommanditaireDialog  = false;
}

// getters and setters

get commanditaires(): Array<CommanditaireVo> {
    return this.commanditaireService.commanditaires;
       }
set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }

 get selectedCommanditaire():CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
    set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }

   get viewCommanditaireDialog():boolean {
           return this.commanditaireService.viewCommanditaireDialog;

       }
    set viewCommanditaireDialog(value: boolean) {
        this.commanditaireService.viewCommanditaireDialog= value;
       }

       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

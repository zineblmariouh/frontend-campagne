import {Component, OnInit} from '@angular/core';
import {EtablissementPartenaireService} from '../../../../../controller/service/EtablissementPartenaire.service';
import {EtablissementPartenaireVo} from '../../../../../controller/model/EtablissementPartenaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etablissement-partenaire-view-chercheur',
  templateUrl: './etablissement-partenaire-view-chercheur.component.html',
  styleUrls: ['./etablissement-partenaire-view-chercheur.component.css']
})
export class EtablissementPartenaireViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementPartenaireService: EtablissementPartenaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtablissementPartenaireDialog  = false;
}

// getters and setters

get etablissementPartenaires(): Array<EtablissementPartenaireVo> {
    return this.etablissementPartenaireService.etablissementPartenaires;
       }
set etablissementPartenaires(value: Array<EtablissementPartenaireVo>) {
        this.etablissementPartenaireService.etablissementPartenaires = value;
       }

 get selectedEtablissementPartenaire():EtablissementPartenaireVo {
           return this.etablissementPartenaireService.selectedEtablissementPartenaire;
       }
    set selectedEtablissementPartenaire(value: EtablissementPartenaireVo) {
        this.etablissementPartenaireService.selectedEtablissementPartenaire = value;
       }

   get viewEtablissementPartenaireDialog():boolean {
           return this.etablissementPartenaireService.viewEtablissementPartenaireDialog;

       }
    set viewEtablissementPartenaireDialog(value: boolean) {
        this.etablissementPartenaireService.viewEtablissementPartenaireDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

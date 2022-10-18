import {Component, OnInit} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-campagne-chercheur-view-chercheur',
  templateUrl: './etat-campagne-chercheur-view-chercheur.component.html',
  styleUrls: ['./etat-campagne-chercheur-view-chercheur.component.css']
})
export class EtatCampagneChercheurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatCampagneChercheurService: EtatCampagneChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatCampagneChercheurDialog  = false;
}

// getters and setters

get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
    return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

 get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }

   get viewEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog;

       }
    set viewEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.viewEtatCampagneChercheurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

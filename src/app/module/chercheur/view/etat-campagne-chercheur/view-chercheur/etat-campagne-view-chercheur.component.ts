import {Component, OnInit} from '@angular/core';
import {EtatCampagneService} from '../../../../../controller/service/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../controller/model/EtatCampagne.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-etat-campagne-view-chercheur',
  templateUrl: './etat-campagne-view-chercheur.component.html',
  styleUrls: ['./etat-campagne-view-chercheur.component.css']
})
export class EtatCampagneViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatCampagneService: EtatCampagneService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatCampagneDialog  = false;
}

// getters and setters

get etatCampagnes(): Array<EtatCampagneVo> {
    return this.etatCampagneService.etatCampagnes;
       }
set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

 get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }

   get viewEtatCampagneDialog():boolean {
           return this.etatCampagneService.viewEtatCampagneDialog;

       }
    set viewEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.viewEtatCampagneDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

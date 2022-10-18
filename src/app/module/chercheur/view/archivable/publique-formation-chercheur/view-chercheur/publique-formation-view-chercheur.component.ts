import {Component, OnInit} from '@angular/core';
import {PubliqueFormationService} from '../../../../../controller/service/PubliqueFormation.service';
import {PubliqueFormationVo} from '../../../../../controller/model/PubliqueFormation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publique-formation-view-chercheur',
  templateUrl: './publique-formation-view-chercheur.component.html',
  styleUrls: ['./publique-formation-view-chercheur.component.css']
})
export class PubliqueFormationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private publiqueFormationService: PubliqueFormationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPubliqueFormationDialog  = false;
}

// getters and setters

get publiqueFormations(): Array<PubliqueFormationVo> {
    return this.publiqueFormationService.publiqueFormations;
       }
set publiqueFormations(value: Array<PubliqueFormationVo>) {
        this.publiqueFormationService.publiqueFormations = value;
       }

 get selectedPubliqueFormation():PubliqueFormationVo {
           return this.publiqueFormationService.selectedPubliqueFormation;
       }
    set selectedPubliqueFormation(value: PubliqueFormationVo) {
        this.publiqueFormationService.selectedPubliqueFormation = value;
       }

   get viewPubliqueFormationDialog():boolean {
           return this.publiqueFormationService.viewPubliqueFormationDialog;

       }
    set viewPubliqueFormationDialog(value: boolean) {
        this.publiqueFormationService.viewPubliqueFormationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

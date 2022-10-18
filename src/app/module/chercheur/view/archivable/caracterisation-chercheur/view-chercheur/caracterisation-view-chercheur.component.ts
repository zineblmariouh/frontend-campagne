import {Component, OnInit} from '@angular/core';
import {CaracterisationService} from '../../../../../controller/service/Caracterisation.service';
import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-caracterisation-view-chercheur',
  templateUrl: './caracterisation-view-chercheur.component.html',
  styleUrls: ['./caracterisation-view-chercheur.component.css']
})
export class CaracterisationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private caracterisationService: CaracterisationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCaracterisationDialog  = false;
}

// getters and setters

get caracterisations(): Array<CaracterisationVo> {
    return this.caracterisationService.caracterisations;
       }
set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }

 get selectedCaracterisation():CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
    set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }

   get viewCaracterisationDialog():boolean {
           return this.caracterisationService.viewCaracterisationDialog;

       }
    set viewCaracterisationDialog(value: boolean) {
        this.caracterisationService.viewCaracterisationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

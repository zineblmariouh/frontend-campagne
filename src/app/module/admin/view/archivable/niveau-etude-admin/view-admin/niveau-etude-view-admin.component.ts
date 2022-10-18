import {Component, OnInit} from '@angular/core';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-etude-view-admin',
  templateUrl: './niveau-etude-view-admin.component.html',
  styleUrls: ['./niveau-etude-view-admin.component.css']
})
export class NiveauEtudeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauEtudeService: NiveauEtudeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNiveauEtudeDialog  = false;
}

// getters and setters

get niveauEtudes(): Array<NiveauEtudeVo> {
    return this.niveauEtudeService.niveauEtudes;
       }
set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }

 get selectedNiveauEtude():NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
    set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }

   get viewNiveauEtudeDialog():boolean {
           return this.niveauEtudeService.viewNiveauEtudeDialog;

       }
    set viewNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.viewNiveauEtudeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

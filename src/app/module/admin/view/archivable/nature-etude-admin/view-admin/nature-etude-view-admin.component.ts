import {Component, OnInit} from '@angular/core';
import {NatureEtudeService} from '../../../../../controller/service/NatureEtude.service';
import {NatureEtudeVo} from '../../../../../controller/model/NatureEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-etude-view-admin',
  templateUrl: './nature-etude-view-admin.component.html',
  styleUrls: ['./nature-etude-view-admin.component.css']
})
export class NatureEtudeViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNatureEtudeDialog  = false;
}

// getters and setters

get natureEtudes(): Array<NatureEtudeVo> {
    return this.natureEtudeService.natureEtudes;
       }
set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

 get selectedNatureEtude():NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }

   get viewNatureEtudeDialog():boolean {
           return this.natureEtudeService.viewNatureEtudeDialog;

       }
    set viewNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.viewNatureEtudeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

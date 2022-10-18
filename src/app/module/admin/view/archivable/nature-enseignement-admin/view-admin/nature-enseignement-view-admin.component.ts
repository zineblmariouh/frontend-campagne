import {Component, OnInit} from '@angular/core';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-nature-enseignement-view-admin',
  templateUrl: './nature-enseignement-view-admin.component.html',
  styleUrls: ['./nature-enseignement-view-admin.component.css']
})
export class NatureEnseignementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private natureEnseignementService: NatureEnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNatureEnseignementDialog  = false;
}

// getters and setters

get natureEnseignements(): Array<NatureEnseignementVo> {
    return this.natureEnseignementService.natureEnseignements;
       }
set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }

 get selectedNatureEnseignement():NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
    set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }

   get viewNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.viewNatureEnseignementDialog;

       }
    set viewNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.viewNatureEnseignementDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

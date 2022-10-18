import {Component, OnInit} from '@angular/core';
import {MasterInternationalService} from '../../../../../controller/service/MasterInternational.service';
import {MasterInternationalVo} from '../../../../../controller/model/MasterInternational.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-master-international-view-chercheur',
  templateUrl: './master-international-view-chercheur.component.html',
  styleUrls: ['./master-international-view-chercheur.component.css']
})
export class MasterInternationalViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewMasterInternationalDialog  = false;
}

// getters and setters

get masterInternationals(): Array<MasterInternationalVo> {
    return this.masterInternationalService.masterInternationals;
       }
set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

 get selectedMasterInternational():MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }

   get viewMasterInternationalDialog():boolean {
           return this.masterInternationalService.viewMasterInternationalDialog;

       }
    set viewMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.viewMasterInternationalDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

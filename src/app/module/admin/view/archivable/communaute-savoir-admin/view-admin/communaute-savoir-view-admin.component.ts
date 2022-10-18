import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-communaute-savoir-view-admin',
  templateUrl: './communaute-savoir-view-admin.component.html',
  styleUrls: ['./communaute-savoir-view-admin.component.css']
})
export class CommunauteSavoirViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirService: CommunauteSavoirService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCommunauteSavoirDialog  = false;
}

// getters and setters

get communauteSavoirs(): Array<CommunauteSavoirVo> {
    return this.communauteSavoirService.communauteSavoirs;
       }
set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }

 get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }

   get viewCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.viewCommunauteSavoirDialog;

       }
    set viewCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.viewCommunauteSavoirDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

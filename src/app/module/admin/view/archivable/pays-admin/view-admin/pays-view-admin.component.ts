import {Component, OnInit} from '@angular/core';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-pays-view-admin',
  templateUrl: './pays-view-admin.component.html',
  styleUrls: ['./pays-view-admin.component.css']
})
export class PaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysService: PaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewPaysDialog  = false;
}

// getters and setters

get payss(): Array<PaysVo> {
    return this.paysService.payss;
       }
set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

 get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }

   get viewPaysDialog():boolean {
           return this.paysService.viewPaysDialog;

       }
    set viewPaysDialog(value: boolean) {
        this.paysService.viewPaysDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

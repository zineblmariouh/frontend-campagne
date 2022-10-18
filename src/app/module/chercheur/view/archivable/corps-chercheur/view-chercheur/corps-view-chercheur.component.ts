import {Component, OnInit} from '@angular/core';
import {CorpsService} from '../../../../../controller/service/Corps.service';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-corps-view-chercheur',
  templateUrl: './corps-view-chercheur.component.html',
  styleUrls: ['./corps-view-chercheur.component.css']
})
export class CorpsViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private corpsService: CorpsService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCorpsDialog  = false;
}

// getters and setters

get corpss(): Array<CorpsVo> {
    return this.corpsService.corpss;
       }
set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }

 get selectedCorps():CorpsVo {
           return this.corpsService.selectedCorps;
       }
    set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }

   get viewCorpsDialog():boolean {
           return this.corpsService.viewCorpsDialog;

       }
    set viewCorpsDialog(value: boolean) {
        this.corpsService.viewCorpsDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

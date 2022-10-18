import {Component, OnInit} from '@angular/core';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-contexte-view-admin',
  templateUrl: './contexte-view-admin.component.html',
  styleUrls: ['./contexte-view-admin.component.css']
})
export class ContexteViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private contexteService: ContexteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewContexteDialog  = false;
}

// getters and setters

get contextes(): Array<ContexteVo> {
    return this.contexteService.contextes;
       }
set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }

 get selectedContexte():ContexteVo {
           return this.contexteService.selectedContexte;
       }
    set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }

   get viewContexteDialog():boolean {
           return this.contexteService.viewContexteDialog;

       }
    set viewContexteDialog(value: boolean) {
        this.contexteService.viewContexteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

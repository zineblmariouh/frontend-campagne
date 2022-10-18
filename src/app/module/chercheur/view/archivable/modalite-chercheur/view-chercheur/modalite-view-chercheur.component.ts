import {Component, OnInit} from '@angular/core';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-view-chercheur',
  templateUrl: './modalite-view-chercheur.component.html',
  styleUrls: ['./modalite-view-chercheur.component.css']
})
export class ModaliteViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteService: ModaliteService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteDialog  = false;
}

// getters and setters

get modalites(): Array<ModaliteVo> {
    return this.modaliteService.modalites;
       }
set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

 get selectedModalite():ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }

   get viewModaliteDialog():boolean {
           return this.modaliteService.viewModaliteDialog;

       }
    set viewModaliteDialog(value: boolean) {
        this.modaliteService.viewModaliteDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

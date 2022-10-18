import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-etude-view-chercheur',
  templateUrl: './modalite-etude-view-chercheur.component.html',
  styleUrls: ['./modalite-etude-view-chercheur.component.css']
})
export class ModaliteEtudeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteEtudeDialog  = false;
}

// getters and setters

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude():ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get viewModaliteEtudeDialog():boolean {
           return this.modaliteEtudeService.viewModaliteEtudeDialog;

       }
    set viewModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.viewModaliteEtudeDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

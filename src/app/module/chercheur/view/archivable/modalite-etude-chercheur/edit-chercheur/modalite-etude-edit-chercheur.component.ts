import {Component, OnInit} from '@angular/core';
import {ModaliteEtudeService} from '../../../../../controller/service/ModaliteEtude.service';
import {ModaliteEtudeVo} from '../../../../../controller/model/ModaliteEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-etude-edit-chercheur',
  templateUrl: './modalite-etude-edit-chercheur.component.html',
  styleUrls: ['./modalite-etude-edit-chercheur.component.css']
})
export class ModaliteEtudeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteEtudeService: ModaliteEtudeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedModaliteEtude.dateArchivage = DateUtils.toDate(this.selectedModaliteEtude.dateArchivage);
            this.selectedModaliteEtude.dateCreation = DateUtils.toDate(this.selectedModaliteEtude.dateCreation);
    this.modaliteEtudeService.edit().subscribe(modaliteEtude=>{
    const myIndex = this.modaliteEtudes.findIndex(e => e.id === this.selectedModaliteEtude.id);
    this.modaliteEtudes[myIndex] = this.selectedModaliteEtude;
    this.editModaliteEtudeDialog = false;
    this.selectedModaliteEtude = new ModaliteEtudeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editModaliteEtudeDialog  = false;
}

// getters and setters

get modaliteEtudes(): Array<ModaliteEtudeVo> {
    return this.modaliteEtudeService.modaliteEtudes;
       }
set modaliteEtudes(value: Array<ModaliteEtudeVo>) {
        this.modaliteEtudeService.modaliteEtudes = value;
       }

 get selectedModaliteEtude(): ModaliteEtudeVo {
           return this.modaliteEtudeService.selectedModaliteEtude;
       }
    set selectedModaliteEtude(value: ModaliteEtudeVo) {
        this.modaliteEtudeService.selectedModaliteEtude = value;
       }

   get editModaliteEtudeDialog(): boolean {
           return this.modaliteEtudeService.editModaliteEtudeDialog;

       }
    set editModaliteEtudeDialog(value: boolean) {
        this.modaliteEtudeService.editModaliteEtudeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

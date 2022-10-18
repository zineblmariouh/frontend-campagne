import {Component, OnInit} from '@angular/core';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-edit-chercheur',
  templateUrl: './modalite-edit-chercheur.component.html',
  styleUrls: ['./modalite-edit-chercheur.component.css']
})
export class ModaliteEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteService: ModaliteService
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
            this.selectedModalite.dateArchivage = DateUtils.toDate(this.selectedModalite.dateArchivage);
            this.selectedModalite.dateCreation = DateUtils.toDate(this.selectedModalite.dateCreation);
    this.modaliteService.edit().subscribe(modalite=>{
    const myIndex = this.modalites.findIndex(e => e.id === this.selectedModalite.id);
    this.modalites[myIndex] = this.selectedModalite;
    this.editModaliteDialog = false;
    this.selectedModalite = new ModaliteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editModaliteDialog  = false;
}

// getters and setters

get modalites(): Array<ModaliteVo> {
    return this.modaliteService.modalites;
       }
set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }

 get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
    set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }

   get editModaliteDialog(): boolean {
           return this.modaliteService.editModaliteDialog;

       }
    set editModaliteDialog(value: boolean) {
        this.modaliteService.editModaliteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

import {Component, OnInit} from '@angular/core';
import {SexeService} from '../../../../../controller/service/Sexe.service';
import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-sexe-edit-chercheur',
  templateUrl: './sexe-edit-chercheur.component.html',
  styleUrls: ['./sexe-edit-chercheur.component.css']
})
export class SexeEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private sexeService: SexeService
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
            this.selectedSexe.dateArchivage = DateUtils.toDate(this.selectedSexe.dateArchivage);
            this.selectedSexe.dateCreation = DateUtils.toDate(this.selectedSexe.dateCreation);
    this.sexeService.edit().subscribe(sexe=>{
    const myIndex = this.sexes.findIndex(e => e.id === this.selectedSexe.id);
    this.sexes[myIndex] = this.selectedSexe;
    this.editSexeDialog = false;
    this.selectedSexe = new SexeVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editSexeDialog  = false;
}

// getters and setters

get sexes(): Array<SexeVo> {
    return this.sexeService.sexes;
       }
set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }

 get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }

   get editSexeDialog(): boolean {
           return this.sexeService.editSexeDialog;

       }
    set editSexeDialog(value: boolean) {
        this.sexeService.editSexeDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

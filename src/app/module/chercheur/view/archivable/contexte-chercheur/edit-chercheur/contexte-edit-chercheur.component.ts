import {Component, OnInit} from '@angular/core';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-contexte-edit-chercheur',
  templateUrl: './contexte-edit-chercheur.component.html',
  styleUrls: ['./contexte-edit-chercheur.component.css']
})
export class ContexteEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private contexteService: ContexteService
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
            this.selectedContexte.dateArchivage = DateUtils.toDate(this.selectedContexte.dateArchivage);
            this.selectedContexte.dateCreation = DateUtils.toDate(this.selectedContexte.dateCreation);
    this.contexteService.edit().subscribe(contexte=>{
    const myIndex = this.contextes.findIndex(e => e.id === this.selectedContexte.id);
    this.contextes[myIndex] = this.selectedContexte;
    this.editContexteDialog = false;
    this.selectedContexte = new ContexteVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editContexteDialog  = false;
}

// getters and setters

get contextes(): Array<ContexteVo> {
    return this.contexteService.contextes;
       }
set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }

 get selectedContexte(): ContexteVo {
           return this.contexteService.selectedContexte;
       }
    set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }

   get editContexteDialog(): boolean {
           return this.contexteService.editContexteDialog;

       }
    set editContexteDialog(value: boolean) {
        this.contexteService.editContexteDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

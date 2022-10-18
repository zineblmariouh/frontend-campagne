import {Component, OnInit} from '@angular/core';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-outil-edit-chercheur',
  templateUrl: './type-outil-edit-chercheur.component.html',
  styleUrls: ['./type-outil-edit-chercheur.component.css']
})
export class TypeOutilEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOutilService: TypeOutilService
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
            this.selectedTypeOutil.dateArchivage = DateUtils.toDate(this.selectedTypeOutil.dateArchivage);
            this.selectedTypeOutil.dateCreation = DateUtils.toDate(this.selectedTypeOutil.dateCreation);
    this.typeOutilService.edit().subscribe(typeOutil=>{
    const myIndex = this.typeOutils.findIndex(e => e.id === this.selectedTypeOutil.id);
    this.typeOutils[myIndex] = this.selectedTypeOutil;
    this.editTypeOutilDialog = false;
    this.selectedTypeOutil = new TypeOutilVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeOutilDialog  = false;
}

// getters and setters

get typeOutils(): Array<TypeOutilVo> {
    return this.typeOutilService.typeOutils;
       }
set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }

 get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
    set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }

   get editTypeOutilDialog(): boolean {
           return this.typeOutilService.editTypeOutilDialog;

       }
    set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

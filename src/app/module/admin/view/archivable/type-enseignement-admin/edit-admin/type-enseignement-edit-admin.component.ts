import {Component, OnInit} from '@angular/core';
import {TypeEnseignementService} from '../../../../../controller/service/TypeEnseignement.service';
import {TypeEnseignementVo} from '../../../../../controller/model/TypeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-enseignement-edit-admin',
  templateUrl: './type-enseignement-edit-admin.component.html',
  styleUrls: ['./type-enseignement-edit-admin.component.css']
})
export class TypeEnseignementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEnseignementService: TypeEnseignementService
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
            this.selectedTypeEnseignement.dateArchivage = DateUtils.toDate(this.selectedTypeEnseignement.dateArchivage);
            this.selectedTypeEnseignement.dateCreation = DateUtils.toDate(this.selectedTypeEnseignement.dateCreation);
    this.typeEnseignementService.edit().subscribe(typeEnseignement=>{
    const myIndex = this.typeEnseignements.findIndex(e => e.id === this.selectedTypeEnseignement.id);
    this.typeEnseignements[myIndex] = this.selectedTypeEnseignement;
    this.editTypeEnseignementDialog = false;
    this.selectedTypeEnseignement = new TypeEnseignementVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeEnseignementDialog  = false;
}

// getters and setters

get typeEnseignements(): Array<TypeEnseignementVo> {
    return this.typeEnseignementService.typeEnseignements;
       }
set typeEnseignements(value: Array<TypeEnseignementVo>) {
        this.typeEnseignementService.typeEnseignements = value;
       }

 get selectedTypeEnseignement(): TypeEnseignementVo {
           return this.typeEnseignementService.selectedTypeEnseignement;
       }
    set selectedTypeEnseignement(value: TypeEnseignementVo) {
        this.typeEnseignementService.selectedTypeEnseignement = value;
       }

   get editTypeEnseignementDialog(): boolean {
           return this.typeEnseignementService.editTypeEnseignementDialog;

       }
    set editTypeEnseignementDialog(value: boolean) {
        this.typeEnseignementService.editTypeEnseignementDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

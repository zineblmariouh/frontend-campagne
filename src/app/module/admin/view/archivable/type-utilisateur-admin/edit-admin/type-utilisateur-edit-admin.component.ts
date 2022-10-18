import {Component, OnInit} from '@angular/core';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-utilisateur-edit-admin',
  templateUrl: './type-utilisateur-edit-admin.component.html',
  styleUrls: ['./type-utilisateur-edit-admin.component.css']
})
export class TypeUtilisateurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService
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
            this.selectedTypeUtilisateur.dateArchivage = DateUtils.toDate(this.selectedTypeUtilisateur.dateArchivage);
            this.selectedTypeUtilisateur.dateCreation = DateUtils.toDate(this.selectedTypeUtilisateur.dateCreation);
    this.typeUtilisateurService.edit().subscribe(typeUtilisateur=>{
    const myIndex = this.typeUtilisateurs.findIndex(e => e.id === this.selectedTypeUtilisateur.id);
    this.typeUtilisateurs[myIndex] = this.selectedTypeUtilisateur;
    this.editTypeUtilisateurDialog = false;
    this.selectedTypeUtilisateur = new TypeUtilisateurVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeUtilisateurDialog  = false;
}

// getters and setters

get typeUtilisateurs(): Array<TypeUtilisateurVo> {
    return this.typeUtilisateurService.typeUtilisateurs;
       }
set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }

 get selectedTypeUtilisateur(): TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }

   get editTypeUtilisateurDialog(): boolean {
           return this.typeUtilisateurService.editTypeUtilisateurDialog;

       }
    set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

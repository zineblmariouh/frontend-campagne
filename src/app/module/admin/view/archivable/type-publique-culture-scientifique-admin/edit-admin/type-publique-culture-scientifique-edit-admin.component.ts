import {Component, OnInit} from '@angular/core';
import {TypePubliqueCultureScientifiqueService} from '../../../../../controller/service/TypePubliqueCultureScientifique.service';
import {TypePubliqueCultureScientifiqueVo} from '../../../../../controller/model/TypePubliqueCultureScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-publique-culture-scientifique-edit-admin',
  templateUrl: './type-publique-culture-scientifique-edit-admin.component.html',
  styleUrls: ['./type-publique-culture-scientifique-edit-admin.component.css']
})
export class TypePubliqueCultureScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueCultureScientifiqueService: TypePubliqueCultureScientifiqueService
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
            this.selectedTypePubliqueCultureScientifique.dateArchivage = DateUtils.toDate(this.selectedTypePubliqueCultureScientifique.dateArchivage);
            this.selectedTypePubliqueCultureScientifique.dateCreation = DateUtils.toDate(this.selectedTypePubliqueCultureScientifique.dateCreation);
    this.typePubliqueCultureScientifiqueService.edit().subscribe(typePubliqueCultureScientifique=>{
    const myIndex = this.typePubliqueCultureScientifiques.findIndex(e => e.id === this.selectedTypePubliqueCultureScientifique.id);
    this.typePubliqueCultureScientifiques[myIndex] = this.selectedTypePubliqueCultureScientifique;
    this.editTypePubliqueCultureScientifiqueDialog = false;
    this.selectedTypePubliqueCultureScientifique = new TypePubliqueCultureScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypePubliqueCultureScientifiqueDialog  = false;
}

// getters and setters

get typePubliqueCultureScientifiques(): Array<TypePubliqueCultureScientifiqueVo> {
    return this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques;
       }
set typePubliqueCultureScientifiques(value: Array<TypePubliqueCultureScientifiqueVo>) {
        this.typePubliqueCultureScientifiqueService.typePubliqueCultureScientifiques = value;
       }

 get selectedTypePubliqueCultureScientifique(): TypePubliqueCultureScientifiqueVo {
           return this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique;
       }
    set selectedTypePubliqueCultureScientifique(value: TypePubliqueCultureScientifiqueVo) {
        this.typePubliqueCultureScientifiqueService.selectedTypePubliqueCultureScientifique = value;
       }

   get editTypePubliqueCultureScientifiqueDialog(): boolean {
           return this.typePubliqueCultureScientifiqueService.editTypePubliqueCultureScientifiqueDialog;

       }
    set editTypePubliqueCultureScientifiqueDialog(value: boolean) {
        this.typePubliqueCultureScientifiqueService.editTypePubliqueCultureScientifiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

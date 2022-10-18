import {Component, OnInit} from '@angular/core';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-departement-scientifique-edit-chercheur',
  templateUrl: './departement-scientifique-edit-chercheur.component.html',
  styleUrls: ['./departement-scientifique-edit-chercheur.component.css']
})
export class DepartementScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private departementScientifiqueService: DepartementScientifiqueService
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
            this.selectedDepartementScientifique.dateArchivage = DateUtils.toDate(this.selectedDepartementScientifique.dateArchivage);
            this.selectedDepartementScientifique.dateCreation = DateUtils.toDate(this.selectedDepartementScientifique.dateCreation);
    this.departementScientifiqueService.edit().subscribe(departementScientifique=>{
    const myIndex = this.departementScientifiques.findIndex(e => e.id === this.selectedDepartementScientifique.id);
    this.departementScientifiques[myIndex] = this.selectedDepartementScientifique;
    this.editDepartementScientifiqueDialog = false;
    this.selectedDepartementScientifique = new DepartementScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editDepartementScientifiqueDialog  = false;
}

// getters and setters

get departementScientifiques(): Array<DepartementScientifiqueVo> {
    return this.departementScientifiqueService.departementScientifiques;
       }
set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }

 get selectedDepartementScientifique(): DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }

   get editDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.editDepartementScientifiqueDialog;

       }
    set editDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.editDepartementScientifiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

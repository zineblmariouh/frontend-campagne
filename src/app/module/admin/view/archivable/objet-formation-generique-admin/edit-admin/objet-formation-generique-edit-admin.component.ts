import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-objet-formation-generique-edit-admin',
  templateUrl: './objet-formation-generique-edit-admin.component.html',
  styleUrls: ['./objet-formation-generique-edit-admin.component.css']
})
export class ObjetFormationGeneriqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService
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
            this.selectedObjetFormationGenerique.dateArchivage = DateUtils.toDate(this.selectedObjetFormationGenerique.dateArchivage);
            this.selectedObjetFormationGenerique.dateCreation = DateUtils.toDate(this.selectedObjetFormationGenerique.dateCreation);
    this.objetFormationGeneriqueService.edit().subscribe(objetFormationGenerique=>{
    const myIndex = this.objetFormationGeneriques.findIndex(e => e.id === this.selectedObjetFormationGenerique.id);
    this.objetFormationGeneriques[myIndex] = this.selectedObjetFormationGenerique;
    this.editObjetFormationGeneriqueDialog = false;
    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editObjetFormationGeneriqueDialog  = false;
}

// getters and setters

get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
    return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }

 get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }

   get editObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;

       }
    set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

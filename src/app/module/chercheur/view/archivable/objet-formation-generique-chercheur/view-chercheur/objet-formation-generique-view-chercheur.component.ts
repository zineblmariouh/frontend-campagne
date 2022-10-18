import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-objet-formation-generique-view-chercheur',
  templateUrl: './objet-formation-generique-view-chercheur.component.html',
  styleUrls: ['./objet-formation-generique-view-chercheur.component.css']
})
export class ObjetFormationGeneriqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewObjetFormationGeneriqueDialog  = false;
}

// getters and setters

get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
    return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }

 get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }

   get viewObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog;

       }
    set viewObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.viewObjetFormationGeneriqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

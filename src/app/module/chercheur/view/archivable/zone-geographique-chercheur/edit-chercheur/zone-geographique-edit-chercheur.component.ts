import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-zone-geographique-edit-chercheur',
  templateUrl: './zone-geographique-edit-chercheur.component.html',
  styleUrls: ['./zone-geographique-edit-chercheur.component.css']
})
export class ZoneGeographiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueService: ZoneGeographiqueService
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
            this.selectedZoneGeographique.dateArchivage = DateUtils.toDate(this.selectedZoneGeographique.dateArchivage);
            this.selectedZoneGeographique.dateCreation = DateUtils.toDate(this.selectedZoneGeographique.dateCreation);
    this.zoneGeographiqueService.edit().subscribe(zoneGeographique=>{
    const myIndex = this.zoneGeographiques.findIndex(e => e.id === this.selectedZoneGeographique.id);
    this.zoneGeographiques[myIndex] = this.selectedZoneGeographique;
    this.editZoneGeographiqueDialog = false;
    this.selectedZoneGeographique = new ZoneGeographiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editZoneGeographiqueDialog  = false;
}

// getters and setters

get zoneGeographiques(): Array<ZoneGeographiqueVo> {
    return this.zoneGeographiqueService.zoneGeographiques;
       }
set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }

 get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }

   get editZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.editZoneGeographiqueDialog;

       }
    set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

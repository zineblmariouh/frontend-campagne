import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-zone-geographique-view-admin',
  templateUrl: './zone-geographique-view-admin.component.html',
  styleUrls: ['./zone-geographique-view-admin.component.css']
})
export class ZoneGeographiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueService: ZoneGeographiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewZoneGeographiqueDialog  = false;
}

// getters and setters

get zoneGeographiques(): Array<ZoneGeographiqueVo> {
    return this.zoneGeographiqueService.zoneGeographiques;
       }
set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }

 get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }

   get viewZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.viewZoneGeographiqueDialog;

       }
    set viewZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.viewZoneGeographiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

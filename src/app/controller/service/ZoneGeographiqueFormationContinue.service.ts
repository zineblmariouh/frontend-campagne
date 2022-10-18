import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ZoneGeographiqueFormationContinueVo} from '../model/ZoneGeographiqueFormationContinue.model';
import {FormationContinueVo} from '../model/FormationContinue.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ZoneGeographiqueFormationContinueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/zoneGeographiqueFormationContinue/';
        })
    }
     private _zoneGeographiqueFormationContinues: Array<ZoneGeographiqueFormationContinueVo> ;
     private _selectedZoneGeographiqueFormationContinue: ZoneGeographiqueFormationContinueVo;
     private _zoneGeographiqueFormationContinueSelections: Array<ZoneGeographiqueFormationContinueVo>;
     private _createZoneGeographiqueFormationContinueDialog: boolean;
     private _editZoneGeographiqueFormationContinueDialog: boolean;
     private _viewZoneGeographiqueFormationContinueDialog: boolean;
     public editZoneGeographiqueFormationContinue$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchZoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ZoneGeographiqueFormationContinueVo>>(this.API);
    }

    public save(): Observable<ZoneGeographiqueFormationContinueVo> {
         return this.http.post<ZoneGeographiqueFormationContinueVo>(this.API, this.selectedZoneGeographiqueFormationContinue);
    }

    delete(zoneGeographiqueFormationContinue: ZoneGeographiqueFormationContinueVo) {
         return this.http.delete<number>(this.API + 'id/' + zoneGeographiqueFormationContinue.id);
    }


    public edit(): Observable<ZoneGeographiqueFormationContinueVo> {
        return this.http.put<ZoneGeographiqueFormationContinueVo>(this.API, this.selectedZoneGeographiqueFormationContinue);
    }


     public findByCriteria(zoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo):Observable<Array<ZoneGeographiqueFormationContinueVo>>{
           return this.http.post<Array<ZoneGeographiqueFormationContinueVo>>(this.API +'search', zoneGeographiqueFormationContinue);
    }

   public findByIdWithAssociatedList(zoneGeographiqueFormationContinue:ZoneGeographiqueFormationContinueVo):Observable<ZoneGeographiqueFormationContinueVo>{
         return this.http.get<ZoneGeographiqueFormationContinueVo>(this.API + 'detail/id/' +zoneGeographiqueFormationContinue.id);
    }

    // getters and setters


    get zoneGeographiqueFormationContinues(): Array<ZoneGeographiqueFormationContinueVo> {
    if(this._zoneGeographiqueFormationContinues==null){
    this._zoneGeographiqueFormationContinues=new Array<ZoneGeographiqueFormationContinueVo>();
    }
return this._zoneGeographiqueFormationContinues;
       }

    set zoneGeographiqueFormationContinues(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this._zoneGeographiqueFormationContinues = value;
       }

    get selectedZoneGeographiqueFormationContinue(): ZoneGeographiqueFormationContinueVo {
    if(this._selectedZoneGeographiqueFormationContinue==null){
    this._selectedZoneGeographiqueFormationContinue=new ZoneGeographiqueFormationContinueVo();
    }
           return this._selectedZoneGeographiqueFormationContinue;
       }

    set selectedZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this._selectedZoneGeographiqueFormationContinue = value;
       }

    get zoneGeographiqueFormationContinueSelections(): Array<ZoneGeographiqueFormationContinueVo> {
    if(this._zoneGeographiqueFormationContinueSelections==null){
    this._zoneGeographiqueFormationContinueSelections=new Array<ZoneGeographiqueFormationContinueVo>();
    }
        return this._zoneGeographiqueFormationContinueSelections;
       }


    set zoneGeographiqueFormationContinueSelections(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this._zoneGeographiqueFormationContinueSelections = value;
       }

    get createZoneGeographiqueFormationContinueDialog(): boolean {
        return this._createZoneGeographiqueFormationContinueDialog;
       }

    set createZoneGeographiqueFormationContinueDialog(value: boolean) {
        this._createZoneGeographiqueFormationContinueDialog = value;
       }

    get editZoneGeographiqueFormationContinueDialog(): boolean {
        return this._editZoneGeographiqueFormationContinueDialog;
       }

    set editZoneGeographiqueFormationContinueDialog(value: boolean) {
        this._editZoneGeographiqueFormationContinueDialog = value;
       }

    get viewZoneGeographiqueFormationContinueDialog(): boolean {
        return this._viewZoneGeographiqueFormationContinueDialog;
       }

    set viewZoneGeographiqueFormationContinueDialog(value: boolean) {
        this._viewZoneGeographiqueFormationContinueDialog = value;
       }

     get searchZoneGeographiqueFormationContinue(): ZoneGeographiqueFormationContinueVo {
     if(this._searchZoneGeographiqueFormationContinue==null){
    this._searchZoneGeographiqueFormationContinue=new ZoneGeographiqueFormationContinueVo();
    }
        return this._searchZoneGeographiqueFormationContinue;
    }

    set searchZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this._searchZoneGeographiqueFormationContinue = value;
       }

}

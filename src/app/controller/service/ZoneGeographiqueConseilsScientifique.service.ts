import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ZoneGeographiqueConseilsScientifiqueVo} from '../model/ZoneGeographiqueConseilsScientifique.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ZoneGeographiqueConseilsScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/zoneGeographiqueConseilsScientifique/';
        })
    }
     private _zoneGeographiqueConseilsScientifiques: Array<ZoneGeographiqueConseilsScientifiqueVo> ;
     private _selectedZoneGeographiqueConseilsScientifique: ZoneGeographiqueConseilsScientifiqueVo;
     private _zoneGeographiqueConseilsScientifiqueSelections: Array<ZoneGeographiqueConseilsScientifiqueVo>;
     private _createZoneGeographiqueConseilsScientifiqueDialog: boolean;
     private _editZoneGeographiqueConseilsScientifiqueDialog: boolean;
     private _viewZoneGeographiqueConseilsScientifiqueDialog: boolean;
     public editZoneGeographiqueConseilsScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchZoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ZoneGeographiqueConseilsScientifiqueVo>>(this.API);
    }

    public save(): Observable<ZoneGeographiqueConseilsScientifiqueVo> {
         return this.http.post<ZoneGeographiqueConseilsScientifiqueVo>(this.API, this.selectedZoneGeographiqueConseilsScientifique);
    }

    delete(zoneGeographiqueConseilsScientifique: ZoneGeographiqueConseilsScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + zoneGeographiqueConseilsScientifique.id);
    }


    public edit(): Observable<ZoneGeographiqueConseilsScientifiqueVo> {
        return this.http.put<ZoneGeographiqueConseilsScientifiqueVo>(this.API, this.selectedZoneGeographiqueConseilsScientifique);
    }


     public findByCriteria(zoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo):Observable<Array<ZoneGeographiqueConseilsScientifiqueVo>>{
           return this.http.post<Array<ZoneGeographiqueConseilsScientifiqueVo>>(this.API +'search', zoneGeographiqueConseilsScientifique);
    }

   public findByIdWithAssociatedList(zoneGeographiqueConseilsScientifique:ZoneGeographiqueConseilsScientifiqueVo):Observable<ZoneGeographiqueConseilsScientifiqueVo>{
         return this.http.get<ZoneGeographiqueConseilsScientifiqueVo>(this.API + 'detail/id/' +zoneGeographiqueConseilsScientifique.id);
    }

    // getters and setters


    get zoneGeographiqueConseilsScientifiques(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
    if(this._zoneGeographiqueConseilsScientifiques==null){
    this._zoneGeographiqueConseilsScientifiques=new Array<ZoneGeographiqueConseilsScientifiqueVo>();
    }
return this._zoneGeographiqueConseilsScientifiques;
       }

    set zoneGeographiqueConseilsScientifiques(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this._zoneGeographiqueConseilsScientifiques = value;
       }

    get selectedZoneGeographiqueConseilsScientifique(): ZoneGeographiqueConseilsScientifiqueVo {
    if(this._selectedZoneGeographiqueConseilsScientifique==null){
    this._selectedZoneGeographiqueConseilsScientifique=new ZoneGeographiqueConseilsScientifiqueVo();
    }
           return this._selectedZoneGeographiqueConseilsScientifique;
       }

    set selectedZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this._selectedZoneGeographiqueConseilsScientifique = value;
       }

    get zoneGeographiqueConseilsScientifiqueSelections(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
    if(this._zoneGeographiqueConseilsScientifiqueSelections==null){
    this._zoneGeographiqueConseilsScientifiqueSelections=new Array<ZoneGeographiqueConseilsScientifiqueVo>();
    }
        return this._zoneGeographiqueConseilsScientifiqueSelections;
       }


    set zoneGeographiqueConseilsScientifiqueSelections(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this._zoneGeographiqueConseilsScientifiqueSelections = value;
       }

    get createZoneGeographiqueConseilsScientifiqueDialog(): boolean {
        return this._createZoneGeographiqueConseilsScientifiqueDialog;
       }

    set createZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this._createZoneGeographiqueConseilsScientifiqueDialog = value;
       }

    get editZoneGeographiqueConseilsScientifiqueDialog(): boolean {
        return this._editZoneGeographiqueConseilsScientifiqueDialog;
       }

    set editZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this._editZoneGeographiqueConseilsScientifiqueDialog = value;
       }

    get viewZoneGeographiqueConseilsScientifiqueDialog(): boolean {
        return this._viewZoneGeographiqueConseilsScientifiqueDialog;
       }

    set viewZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this._viewZoneGeographiqueConseilsScientifiqueDialog = value;
       }

     get searchZoneGeographiqueConseilsScientifique(): ZoneGeographiqueConseilsScientifiqueVo {
     if(this._searchZoneGeographiqueConseilsScientifique==null){
    this._searchZoneGeographiqueConseilsScientifique=new ZoneGeographiqueConseilsScientifiqueVo();
    }
        return this._searchZoneGeographiqueConseilsScientifique;
    }

    set searchZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this._searchZoneGeographiqueConseilsScientifique = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';


@Injectable({
  providedIn: 'root'
})
export class ZoneGeographiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/zoneGeographique/';
        })
    }
     private _zoneGeographiques: Array<ZoneGeographiqueVo> ;
     private _selectedZoneGeographique: ZoneGeographiqueVo;
     private _zoneGeographiqueSelections: Array<ZoneGeographiqueVo>;
     private _createZoneGeographiqueDialog: boolean;
     private _editZoneGeographiqueDialog: boolean;
     private _viewZoneGeographiqueDialog: boolean;
     public editZoneGeographique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchZoneGeographique:ZoneGeographiqueVo ;

    // methods
    public archiver(zoneGeographique: ZoneGeographiqueVo): Observable<ZoneGeographiqueVo> {
        return this.http.put<ZoneGeographiqueVo>(this.API + 'archiver/' ,zoneGeographique);
    }
    public desarchiver(zoneGeographique: ZoneGeographiqueVo): Observable<ZoneGeographiqueVo> {
    return this.http.put<ZoneGeographiqueVo>(this.API + 'desarchiver/' ,zoneGeographique);
    }

    public findAll(){
     return this.http.get<Array<ZoneGeographiqueVo>>(this.API);
    }

    public save(): Observable<ZoneGeographiqueVo> {
           return this.http.post<ZoneGeographiqueVo>(this.API, {...this.selectedZoneGeographique,dateCreation: moment(this.selectedZoneGeographique.dateCreation).format("YYYY-MM-DD")});
    }

    delete(zoneGeographique: ZoneGeographiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + zoneGeographique.id);
    }


    public edit(): Observable<ZoneGeographiqueVo> {
        return this.http.put<ZoneGeographiqueVo>(this.API, this.selectedZoneGeographique);
    }


     public findByCriteria(zoneGeographique:ZoneGeographiqueVo):Observable<Array<ZoneGeographiqueVo>>{
           return this.http.post<Array<ZoneGeographiqueVo>>(this.API +'search', zoneGeographique);
    }

   public findByIdWithAssociatedList(zoneGeographique:ZoneGeographiqueVo):Observable<ZoneGeographiqueVo>{
         return this.http.get<ZoneGeographiqueVo>(this.API + 'detail/id/' +zoneGeographique.id);
    }

    // getters and setters


    get zoneGeographiques(): Array<ZoneGeographiqueVo> {
    if(this._zoneGeographiques==null){
    this._zoneGeographiques=new Array<ZoneGeographiqueVo>();
    }
return this._zoneGeographiques;
       }

    set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this._zoneGeographiques = value;
       }

    get selectedZoneGeographique(): ZoneGeographiqueVo {
    if(this._selectedZoneGeographique==null){
    this._selectedZoneGeographique=new ZoneGeographiqueVo();
    }
           return this._selectedZoneGeographique;
       }

    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this._selectedZoneGeographique = value;
       }

    get zoneGeographiqueSelections(): Array<ZoneGeographiqueVo> {
    if(this._zoneGeographiqueSelections==null){
    this._zoneGeographiqueSelections=new Array<ZoneGeographiqueVo>();
    }
        return this._zoneGeographiqueSelections;
       }


    set zoneGeographiqueSelections(value: Array<ZoneGeographiqueVo>) {
        this._zoneGeographiqueSelections = value;
       }

    get createZoneGeographiqueDialog(): boolean {
        return this._createZoneGeographiqueDialog;
       }

    set createZoneGeographiqueDialog(value: boolean) {
        this._createZoneGeographiqueDialog = value;
       }

    get editZoneGeographiqueDialog(): boolean {
        return this._editZoneGeographiqueDialog;
       }

    set editZoneGeographiqueDialog(value: boolean) {
        this._editZoneGeographiqueDialog = value;
       }

    get viewZoneGeographiqueDialog(): boolean {
        return this._viewZoneGeographiqueDialog;
       }

    set viewZoneGeographiqueDialog(value: boolean) {
        this._viewZoneGeographiqueDialog = value;
       }

     get searchZoneGeographique(): ZoneGeographiqueVo {
     if(this._searchZoneGeographique==null){
    this._searchZoneGeographique=new ZoneGeographiqueVo();
    }
        return this._searchZoneGeographique;
    }

    set searchZoneGeographique(value: ZoneGeographiqueVo) {
        this._searchZoneGeographique = value;
       }

}

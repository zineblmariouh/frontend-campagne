import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class ZoneGeographiqueConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/zoneGeographiqueConsultanceScientifiquePonctuelle/';
        })
    }
     private _zoneGeographiqueConsultanceScientifiquePonctuelles: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> ;
     private _selectedZoneGeographiqueConsultanceScientifiquePonctuelle: ZoneGeographiqueConsultanceScientifiquePonctuelleVo;
     private _zoneGeographiqueConsultanceScientifiquePonctuelleSelections: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>;
     private _createZoneGeographiqueConsultanceScientifiquePonctuelleDialog: boolean;
     private _editZoneGeographiqueConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog: boolean;
     public editZoneGeographiqueConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchZoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
         return this.http.post<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>(this.API, this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle);
    }

    delete(zoneGeographiqueConsultanceScientifiquePonctuelle: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + zoneGeographiqueConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
        return this.http.put<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>(this.API, this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(zoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo):Observable<Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>>(this.API +'search', zoneGeographiqueConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(zoneGeographiqueConsultanceScientifiquePonctuelle:ZoneGeographiqueConsultanceScientifiquePonctuelleVo):Observable<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>{
         return this.http.get<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +zoneGeographiqueConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get zoneGeographiqueConsultanceScientifiquePonctuelles(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
    if(this._zoneGeographiqueConsultanceScientifiquePonctuelles==null){
    this._zoneGeographiqueConsultanceScientifiquePonctuelles=new Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>();
    }
return this._zoneGeographiqueConsultanceScientifiquePonctuelles;
       }

    set zoneGeographiqueConsultanceScientifiquePonctuelles(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this._zoneGeographiqueConsultanceScientifiquePonctuelles = value;
       }

    get selectedZoneGeographiqueConsultanceScientifiquePonctuelle(): ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
    if(this._selectedZoneGeographiqueConsultanceScientifiquePonctuelle==null){
    this._selectedZoneGeographiqueConsultanceScientifiquePonctuelle=new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
       }

    set selectedZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this._selectedZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

    get zoneGeographiqueConsultanceScientifiquePonctuelleSelections(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
    if(this._zoneGeographiqueConsultanceScientifiquePonctuelleSelections==null){
    this._zoneGeographiqueConsultanceScientifiquePonctuelleSelections=new Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>();
    }
        return this._zoneGeographiqueConsultanceScientifiquePonctuelleSelections;
       }


    set zoneGeographiqueConsultanceScientifiquePonctuelleSelections(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this._zoneGeographiqueConsultanceScientifiquePonctuelleSelections = value;
       }

    get createZoneGeographiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }

    set createZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createZoneGeographiqueConsultanceScientifiquePonctuelleDialog = value;
       }

    get editZoneGeographiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }

    set editZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editZoneGeographiqueConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog;
       }

    set viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchZoneGeographiqueConsultanceScientifiquePonctuelle(): ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
     if(this._searchZoneGeographiqueConsultanceScientifiquePonctuelle==null){
    this._searchZoneGeographiqueConsultanceScientifiquePonctuelle=new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();
    }
        return this._searchZoneGeographiqueConsultanceScientifiquePonctuelle;
    }

    set searchZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this._searchZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

}

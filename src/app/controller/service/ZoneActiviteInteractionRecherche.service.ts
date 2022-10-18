import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ZoneActiviteInteractionRechercheVo} from '../model/ZoneActiviteInteractionRecherche.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {PaysVo} from '../model/Pays.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class ZoneActiviteInteractionRechercheService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/zoneActiviteInteractionRecherche/';
        })
    }
     private _zoneActiviteInteractionRecherches: Array<ZoneActiviteInteractionRechercheVo> ;
     private _selectedZoneActiviteInteractionRecherche: ZoneActiviteInteractionRechercheVo;
     private _zoneActiviteInteractionRechercheSelections: Array<ZoneActiviteInteractionRechercheVo>;
     private _createZoneActiviteInteractionRechercheDialog: boolean;
     private _editZoneActiviteInteractionRechercheDialog: boolean;
     private _viewZoneActiviteInteractionRechercheDialog: boolean;
     public editZoneActiviteInteractionRecherche$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchZoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ZoneActiviteInteractionRechercheVo>>(this.API);
    }

    public save(): Observable<ZoneActiviteInteractionRechercheVo> {
         return this.http.post<ZoneActiviteInteractionRechercheVo>(this.API, this.selectedZoneActiviteInteractionRecherche);
    }

    delete(zoneActiviteInteractionRecherche: ZoneActiviteInteractionRechercheVo) {
         return this.http.delete<number>(this.API + 'id/' + zoneActiviteInteractionRecherche.id);
    }


    public edit(): Observable<ZoneActiviteInteractionRechercheVo> {
        return this.http.put<ZoneActiviteInteractionRechercheVo>(this.API, this.selectedZoneActiviteInteractionRecherche);
    }


     public findByCriteria(zoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo):Observable<Array<ZoneActiviteInteractionRechercheVo>>{
           return this.http.post<Array<ZoneActiviteInteractionRechercheVo>>(this.API +'search', zoneActiviteInteractionRecherche);
    }

   public findByIdWithAssociatedList(zoneActiviteInteractionRecherche:ZoneActiviteInteractionRechercheVo):Observable<ZoneActiviteInteractionRechercheVo>{
         return this.http.get<ZoneActiviteInteractionRechercheVo>(this.API + 'detail/id/' +zoneActiviteInteractionRecherche.id);
    }

    // getters and setters


    get zoneActiviteInteractionRecherches(): Array<ZoneActiviteInteractionRechercheVo> {
    if(this._zoneActiviteInteractionRecherches==null){
    this._zoneActiviteInteractionRecherches=new Array<ZoneActiviteInteractionRechercheVo>();
    }
return this._zoneActiviteInteractionRecherches;
       }

    set zoneActiviteInteractionRecherches(value: Array<ZoneActiviteInteractionRechercheVo>) {
        this._zoneActiviteInteractionRecherches = value;
       }

    get selectedZoneActiviteInteractionRecherche(): ZoneActiviteInteractionRechercheVo {
    if(this._selectedZoneActiviteInteractionRecherche==null){
    this._selectedZoneActiviteInteractionRecherche=new ZoneActiviteInteractionRechercheVo();
    }
           return this._selectedZoneActiviteInteractionRecherche;
       }

    set selectedZoneActiviteInteractionRecherche(value: ZoneActiviteInteractionRechercheVo) {
        this._selectedZoneActiviteInteractionRecherche = value;
       }

    get zoneActiviteInteractionRechercheSelections(): Array<ZoneActiviteInteractionRechercheVo> {
    if(this._zoneActiviteInteractionRechercheSelections==null){
    this._zoneActiviteInteractionRechercheSelections=new Array<ZoneActiviteInteractionRechercheVo>();
    }
        return this._zoneActiviteInteractionRechercheSelections;
       }


    set zoneActiviteInteractionRechercheSelections(value: Array<ZoneActiviteInteractionRechercheVo>) {
        this._zoneActiviteInteractionRechercheSelections = value;
       }

    get createZoneActiviteInteractionRechercheDialog(): boolean {
        return this._createZoneActiviteInteractionRechercheDialog;
       }

    set createZoneActiviteInteractionRechercheDialog(value: boolean) {
        this._createZoneActiviteInteractionRechercheDialog = value;
       }

    get editZoneActiviteInteractionRechercheDialog(): boolean {
        return this._editZoneActiviteInteractionRechercheDialog;
       }

    set editZoneActiviteInteractionRechercheDialog(value: boolean) {
        this._editZoneActiviteInteractionRechercheDialog = value;
       }

    get viewZoneActiviteInteractionRechercheDialog(): boolean {
        return this._viewZoneActiviteInteractionRechercheDialog;
       }

    set viewZoneActiviteInteractionRechercheDialog(value: boolean) {
        this._viewZoneActiviteInteractionRechercheDialog = value;
       }

     get searchZoneActiviteInteractionRecherche(): ZoneActiviteInteractionRechercheVo {
     if(this._searchZoneActiviteInteractionRecherche==null){
    this._searchZoneActiviteInteractionRecherche=new ZoneActiviteInteractionRechercheVo();
    }
        return this._searchZoneActiviteInteractionRecherche;
    }

    set searchZoneActiviteInteractionRecherche(value: ZoneActiviteInteractionRechercheVo) {
        this._searchZoneActiviteInteractionRecherche = value;
       }

}

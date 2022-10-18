import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiquePaysConceptionVo} from '../model/OutilPedagogiquePaysConception.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiquePaysConceptionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiquePaysConception/';
        })
    }
     private _outilPedagogiquePaysConceptions: Array<OutilPedagogiquePaysConceptionVo> ;
     private _selectedOutilPedagogiquePaysConception: OutilPedagogiquePaysConceptionVo;
     private _outilPedagogiquePaysConceptionSelections: Array<OutilPedagogiquePaysConceptionVo>;
     private _createOutilPedagogiquePaysConceptionDialog: boolean;
     private _editOutilPedagogiquePaysConceptionDialog: boolean;
     private _viewOutilPedagogiquePaysConceptionDialog: boolean;
     public editOutilPedagogiquePaysConception$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiquePaysConceptionVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiquePaysConceptionVo> {
         return this.http.post<OutilPedagogiquePaysConceptionVo>(this.API, this.selectedOutilPedagogiquePaysConception);
    }

    delete(outilPedagogiquePaysConception: OutilPedagogiquePaysConceptionVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiquePaysConception.id);
    }


    public edit(): Observable<OutilPedagogiquePaysConceptionVo> {
        return this.http.put<OutilPedagogiquePaysConceptionVo>(this.API, this.selectedOutilPedagogiquePaysConception);
    }


     public findByCriteria(outilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo):Observable<Array<OutilPedagogiquePaysConceptionVo>>{
           return this.http.post<Array<OutilPedagogiquePaysConceptionVo>>(this.API +'search', outilPedagogiquePaysConception);
    }

   public findByIdWithAssociatedList(outilPedagogiquePaysConception:OutilPedagogiquePaysConceptionVo):Observable<OutilPedagogiquePaysConceptionVo>{
         return this.http.get<OutilPedagogiquePaysConceptionVo>(this.API + 'detail/id/' +outilPedagogiquePaysConception.id);
    }

    // getters and setters


    get outilPedagogiquePaysConceptions(): Array<OutilPedagogiquePaysConceptionVo> {
    if(this._outilPedagogiquePaysConceptions==null){
    this._outilPedagogiquePaysConceptions=new Array<OutilPedagogiquePaysConceptionVo>();
    }
return this._outilPedagogiquePaysConceptions;
       }

    set outilPedagogiquePaysConceptions(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this._outilPedagogiquePaysConceptions = value;
       }

    get selectedOutilPedagogiquePaysConception(): OutilPedagogiquePaysConceptionVo {
    if(this._selectedOutilPedagogiquePaysConception==null){
    this._selectedOutilPedagogiquePaysConception=new OutilPedagogiquePaysConceptionVo();
    }
           return this._selectedOutilPedagogiquePaysConception;
       }

    set selectedOutilPedagogiquePaysConception(value: OutilPedagogiquePaysConceptionVo) {
        this._selectedOutilPedagogiquePaysConception = value;
       }

    get outilPedagogiquePaysConceptionSelections(): Array<OutilPedagogiquePaysConceptionVo> {
    if(this._outilPedagogiquePaysConceptionSelections==null){
    this._outilPedagogiquePaysConceptionSelections=new Array<OutilPedagogiquePaysConceptionVo>();
    }
        return this._outilPedagogiquePaysConceptionSelections;
       }


    set outilPedagogiquePaysConceptionSelections(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this._outilPedagogiquePaysConceptionSelections = value;
       }

    get createOutilPedagogiquePaysConceptionDialog(): boolean {
        return this._createOutilPedagogiquePaysConceptionDialog;
       }

    set createOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this._createOutilPedagogiquePaysConceptionDialog = value;
       }

    get editOutilPedagogiquePaysConceptionDialog(): boolean {
        return this._editOutilPedagogiquePaysConceptionDialog;
       }

    set editOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this._editOutilPedagogiquePaysConceptionDialog = value;
       }

    get viewOutilPedagogiquePaysConceptionDialog(): boolean {
        return this._viewOutilPedagogiquePaysConceptionDialog;
       }

    set viewOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this._viewOutilPedagogiquePaysConceptionDialog = value;
       }

     get searchOutilPedagogiquePaysConception(): OutilPedagogiquePaysConceptionVo {
     if(this._searchOutilPedagogiquePaysConception==null){
    this._searchOutilPedagogiquePaysConception=new OutilPedagogiquePaysConceptionVo();
    }
        return this._searchOutilPedagogiquePaysConception;
    }

    set searchOutilPedagogiquePaysConception(value: OutilPedagogiquePaysConceptionVo) {
        this._searchOutilPedagogiquePaysConception = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueEnjeuxIrdVo} from '../model/OutilPedagogiqueEnjeuxIrd.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiqueEnjeuxIrd/';
        })
    }
     private _outilPedagogiqueEnjeuxIrds: Array<OutilPedagogiqueEnjeuxIrdVo> ;
     private _selectedOutilPedagogiqueEnjeuxIrd: OutilPedagogiqueEnjeuxIrdVo;
     private _outilPedagogiqueEnjeuxIrdSelections: Array<OutilPedagogiqueEnjeuxIrdVo>;
     private _createOutilPedagogiqueEnjeuxIrdDialog: boolean;
     private _editOutilPedagogiqueEnjeuxIrdDialog: boolean;
     private _viewOutilPedagogiqueEnjeuxIrdDialog: boolean;
     public editOutilPedagogiqueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueEnjeuxIrdVo> {
         return this.http.post<OutilPedagogiqueEnjeuxIrdVo>(this.API, this.selectedOutilPedagogiqueEnjeuxIrd);
    }

    delete(outilPedagogiqueEnjeuxIrd: OutilPedagogiqueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiqueEnjeuxIrd.id);
    }


    public edit(): Observable<OutilPedagogiqueEnjeuxIrdVo> {
        return this.http.put<OutilPedagogiqueEnjeuxIrdVo>(this.API, this.selectedOutilPedagogiqueEnjeuxIrd);
    }


     public findByCriteria(outilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo):Observable<Array<OutilPedagogiqueEnjeuxIrdVo>>{
           return this.http.post<Array<OutilPedagogiqueEnjeuxIrdVo>>(this.API +'search', outilPedagogiqueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(outilPedagogiqueEnjeuxIrd:OutilPedagogiqueEnjeuxIrdVo):Observable<OutilPedagogiqueEnjeuxIrdVo>{
         return this.http.get<OutilPedagogiqueEnjeuxIrdVo>(this.API + 'detail/id/' +outilPedagogiqueEnjeuxIrd.id);
    }

    // getters and setters


    get outilPedagogiqueEnjeuxIrds(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    if(this._outilPedagogiqueEnjeuxIrds==null){
    this._outilPedagogiqueEnjeuxIrds=new Array<OutilPedagogiqueEnjeuxIrdVo>();
    }
return this._outilPedagogiqueEnjeuxIrds;
       }

    set outilPedagogiqueEnjeuxIrds(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this._outilPedagogiqueEnjeuxIrds = value;
       }

    get selectedOutilPedagogiqueEnjeuxIrd(): OutilPedagogiqueEnjeuxIrdVo {
    if(this._selectedOutilPedagogiqueEnjeuxIrd==null){
    this._selectedOutilPedagogiqueEnjeuxIrd=new OutilPedagogiqueEnjeuxIrdVo();
    }
           return this._selectedOutilPedagogiqueEnjeuxIrd;
       }

    set selectedOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this._selectedOutilPedagogiqueEnjeuxIrd = value;
       }

    get outilPedagogiqueEnjeuxIrdSelections(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    if(this._outilPedagogiqueEnjeuxIrdSelections==null){
    this._outilPedagogiqueEnjeuxIrdSelections=new Array<OutilPedagogiqueEnjeuxIrdVo>();
    }
        return this._outilPedagogiqueEnjeuxIrdSelections;
       }


    set outilPedagogiqueEnjeuxIrdSelections(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this._outilPedagogiqueEnjeuxIrdSelections = value;
       }

    get createOutilPedagogiqueEnjeuxIrdDialog(): boolean {
        return this._createOutilPedagogiqueEnjeuxIrdDialog;
       }

    set createOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._createOutilPedagogiqueEnjeuxIrdDialog = value;
       }

    get editOutilPedagogiqueEnjeuxIrdDialog(): boolean {
        return this._editOutilPedagogiqueEnjeuxIrdDialog;
       }

    set editOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._editOutilPedagogiqueEnjeuxIrdDialog = value;
       }

    get viewOutilPedagogiqueEnjeuxIrdDialog(): boolean {
        return this._viewOutilPedagogiqueEnjeuxIrdDialog;
       }

    set viewOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this._viewOutilPedagogiqueEnjeuxIrdDialog = value;
       }

     get searchOutilPedagogiqueEnjeuxIrd(): OutilPedagogiqueEnjeuxIrdVo {
     if(this._searchOutilPedagogiqueEnjeuxIrd==null){
    this._searchOutilPedagogiqueEnjeuxIrd=new OutilPedagogiqueEnjeuxIrdVo();
    }
        return this._searchOutilPedagogiqueEnjeuxIrd;
    }

    set searchOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this._searchOutilPedagogiqueEnjeuxIrd = value;
       }

}

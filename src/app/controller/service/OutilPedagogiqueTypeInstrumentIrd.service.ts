import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueTypeInstrumentIrdVo} from '../model/OutilPedagogiqueTypeInstrumentIrd.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueTypeInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiqueTypeInstrumentIrd/';
        })
    }
     private _outilPedagogiqueTypeInstrumentIrds: Array<OutilPedagogiqueTypeInstrumentIrdVo> ;
     private _selectedOutilPedagogiqueTypeInstrumentIrd: OutilPedagogiqueTypeInstrumentIrdVo;
     private _outilPedagogiqueTypeInstrumentIrdSelections: Array<OutilPedagogiqueTypeInstrumentIrdVo>;
     private _createOutilPedagogiqueTypeInstrumentIrdDialog: boolean;
     private _editOutilPedagogiqueTypeInstrumentIrdDialog: boolean;
     private _viewOutilPedagogiqueTypeInstrumentIrdDialog: boolean;
     public editOutilPedagogiqueTypeInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueTypeInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueTypeInstrumentIrdVo> {
         return this.http.post<OutilPedagogiqueTypeInstrumentIrdVo>(this.API, this.selectedOutilPedagogiqueTypeInstrumentIrd);
    }

    delete(outilPedagogiqueTypeInstrumentIrd: OutilPedagogiqueTypeInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiqueTypeInstrumentIrd.id);
    }


    public edit(): Observable<OutilPedagogiqueTypeInstrumentIrdVo> {
        return this.http.put<OutilPedagogiqueTypeInstrumentIrdVo>(this.API, this.selectedOutilPedagogiqueTypeInstrumentIrd);
    }


     public findByCriteria(outilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo):Observable<Array<OutilPedagogiqueTypeInstrumentIrdVo>>{
           return this.http.post<Array<OutilPedagogiqueTypeInstrumentIrdVo>>(this.API +'search', outilPedagogiqueTypeInstrumentIrd);
    }

   public findByIdWithAssociatedList(outilPedagogiqueTypeInstrumentIrd:OutilPedagogiqueTypeInstrumentIrdVo):Observable<OutilPedagogiqueTypeInstrumentIrdVo>{
         return this.http.get<OutilPedagogiqueTypeInstrumentIrdVo>(this.API + 'detail/id/' +outilPedagogiqueTypeInstrumentIrd.id);
    }

    // getters and setters


    get outilPedagogiqueTypeInstrumentIrds(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
    if(this._outilPedagogiqueTypeInstrumentIrds==null){
    this._outilPedagogiqueTypeInstrumentIrds=new Array<OutilPedagogiqueTypeInstrumentIrdVo>();
    }
return this._outilPedagogiqueTypeInstrumentIrds;
       }

    set outilPedagogiqueTypeInstrumentIrds(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this._outilPedagogiqueTypeInstrumentIrds = value;
       }

    get selectedOutilPedagogiqueTypeInstrumentIrd(): OutilPedagogiqueTypeInstrumentIrdVo {
    if(this._selectedOutilPedagogiqueTypeInstrumentIrd==null){
    this._selectedOutilPedagogiqueTypeInstrumentIrd=new OutilPedagogiqueTypeInstrumentIrdVo();
    }
           return this._selectedOutilPedagogiqueTypeInstrumentIrd;
       }

    set selectedOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this._selectedOutilPedagogiqueTypeInstrumentIrd = value;
       }

    get outilPedagogiqueTypeInstrumentIrdSelections(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
    if(this._outilPedagogiqueTypeInstrumentIrdSelections==null){
    this._outilPedagogiqueTypeInstrumentIrdSelections=new Array<OutilPedagogiqueTypeInstrumentIrdVo>();
    }
        return this._outilPedagogiqueTypeInstrumentIrdSelections;
       }


    set outilPedagogiqueTypeInstrumentIrdSelections(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this._outilPedagogiqueTypeInstrumentIrdSelections = value;
       }

    get createOutilPedagogiqueTypeInstrumentIrdDialog(): boolean {
        return this._createOutilPedagogiqueTypeInstrumentIrdDialog;
       }

    set createOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this._createOutilPedagogiqueTypeInstrumentIrdDialog = value;
       }

    get editOutilPedagogiqueTypeInstrumentIrdDialog(): boolean {
        return this._editOutilPedagogiqueTypeInstrumentIrdDialog;
       }

    set editOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this._editOutilPedagogiqueTypeInstrumentIrdDialog = value;
       }

    get viewOutilPedagogiqueTypeInstrumentIrdDialog(): boolean {
        return this._viewOutilPedagogiqueTypeInstrumentIrdDialog;
       }

    set viewOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this._viewOutilPedagogiqueTypeInstrumentIrdDialog = value;
       }

     get searchOutilPedagogiqueTypeInstrumentIrd(): OutilPedagogiqueTypeInstrumentIrdVo {
     if(this._searchOutilPedagogiqueTypeInstrumentIrd==null){
    this._searchOutilPedagogiqueTypeInstrumentIrd=new OutilPedagogiqueTypeInstrumentIrdVo();
    }
        return this._searchOutilPedagogiqueTypeInstrumentIrd;
    }

    set searchOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this._searchOutilPedagogiqueTypeInstrumentIrd = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueInstrumentIrdVo} from '../model/OutilPedagogiqueInstrumentIrd.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiqueInstrumentIrd/';
        })
    }
     private _outilPedagogiqueInstrumentIrds: Array<OutilPedagogiqueInstrumentIrdVo> ;
     private _selectedOutilPedagogiqueInstrumentIrd: OutilPedagogiqueInstrumentIrdVo;
     private _outilPedagogiqueInstrumentIrdSelections: Array<OutilPedagogiqueInstrumentIrdVo>;
     private _createOutilPedagogiqueInstrumentIrdDialog: boolean;
     private _editOutilPedagogiqueInstrumentIrdDialog: boolean;
     private _viewOutilPedagogiqueInstrumentIrdDialog: boolean;
     public editOutilPedagogiqueInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueInstrumentIrdVo> {
         return this.http.post<OutilPedagogiqueInstrumentIrdVo>(this.API, this.selectedOutilPedagogiqueInstrumentIrd);
    }

    delete(outilPedagogiqueInstrumentIrd: OutilPedagogiqueInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiqueInstrumentIrd.id);
    }


    public edit(): Observable<OutilPedagogiqueInstrumentIrdVo> {
        return this.http.put<OutilPedagogiqueInstrumentIrdVo>(this.API, this.selectedOutilPedagogiqueInstrumentIrd);
    }


     public findByCriteria(outilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo):Observable<Array<OutilPedagogiqueInstrumentIrdVo>>{
           return this.http.post<Array<OutilPedagogiqueInstrumentIrdVo>>(this.API +'search', outilPedagogiqueInstrumentIrd);
    }

   public findByIdWithAssociatedList(outilPedagogiqueInstrumentIrd:OutilPedagogiqueInstrumentIrdVo):Observable<OutilPedagogiqueInstrumentIrdVo>{
         return this.http.get<OutilPedagogiqueInstrumentIrdVo>(this.API + 'detail/id/' +outilPedagogiqueInstrumentIrd.id);
    }

    // getters and setters


    get outilPedagogiqueInstrumentIrds(): Array<OutilPedagogiqueInstrumentIrdVo> {
    if(this._outilPedagogiqueInstrumentIrds==null){
    this._outilPedagogiqueInstrumentIrds=new Array<OutilPedagogiqueInstrumentIrdVo>();
    }
return this._outilPedagogiqueInstrumentIrds;
       }

    set outilPedagogiqueInstrumentIrds(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this._outilPedagogiqueInstrumentIrds = value;
       }

    get selectedOutilPedagogiqueInstrumentIrd(): OutilPedagogiqueInstrumentIrdVo {
    if(this._selectedOutilPedagogiqueInstrumentIrd==null){
    this._selectedOutilPedagogiqueInstrumentIrd=new OutilPedagogiqueInstrumentIrdVo();
    }
           return this._selectedOutilPedagogiqueInstrumentIrd;
       }

    set selectedOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this._selectedOutilPedagogiqueInstrumentIrd = value;
       }

    get outilPedagogiqueInstrumentIrdSelections(): Array<OutilPedagogiqueInstrumentIrdVo> {
    if(this._outilPedagogiqueInstrumentIrdSelections==null){
    this._outilPedagogiqueInstrumentIrdSelections=new Array<OutilPedagogiqueInstrumentIrdVo>();
    }
        return this._outilPedagogiqueInstrumentIrdSelections;
       }


    set outilPedagogiqueInstrumentIrdSelections(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this._outilPedagogiqueInstrumentIrdSelections = value;
       }

    get createOutilPedagogiqueInstrumentIrdDialog(): boolean {
        return this._createOutilPedagogiqueInstrumentIrdDialog;
       }

    set createOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this._createOutilPedagogiqueInstrumentIrdDialog = value;
       }

    get editOutilPedagogiqueInstrumentIrdDialog(): boolean {
        return this._editOutilPedagogiqueInstrumentIrdDialog;
       }

    set editOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this._editOutilPedagogiqueInstrumentIrdDialog = value;
       }

    get viewOutilPedagogiqueInstrumentIrdDialog(): boolean {
        return this._viewOutilPedagogiqueInstrumentIrdDialog;
       }

    set viewOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this._viewOutilPedagogiqueInstrumentIrdDialog = value;
       }

     get searchOutilPedagogiqueInstrumentIrd(): OutilPedagogiqueInstrumentIrdVo {
     if(this._searchOutilPedagogiqueInstrumentIrd==null){
    this._searchOutilPedagogiqueInstrumentIrd=new OutilPedagogiqueInstrumentIrdVo();
    }
        return this._searchOutilPedagogiqueInstrumentIrd;
    }

    set searchOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this._searchOutilPedagogiqueInstrumentIrd = value;
       }

}

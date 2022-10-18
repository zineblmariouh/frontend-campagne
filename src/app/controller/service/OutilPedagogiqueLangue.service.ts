import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueLangueVo} from '../model/OutilPedagogiqueLangue.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {LangueVo} from '../model/Langue.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueLangueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiqueLangue/';
        })
    }
     private _outilPedagogiqueLangues: Array<OutilPedagogiqueLangueVo> ;
     private _selectedOutilPedagogiqueLangue: OutilPedagogiqueLangueVo;
     private _outilPedagogiqueLangueSelections: Array<OutilPedagogiqueLangueVo>;
     private _createOutilPedagogiqueLangueDialog: boolean;
     private _editOutilPedagogiqueLangueDialog: boolean;
     private _viewOutilPedagogiqueLangueDialog: boolean;
     public editOutilPedagogiqueLangue$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiqueLangue:OutilPedagogiqueLangueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueLangueVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueLangueVo> {
         return this.http.post<OutilPedagogiqueLangueVo>(this.API, this.selectedOutilPedagogiqueLangue);
    }

    delete(outilPedagogiqueLangue: OutilPedagogiqueLangueVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiqueLangue.id);
    }


    public edit(): Observable<OutilPedagogiqueLangueVo> {
        return this.http.put<OutilPedagogiqueLangueVo>(this.API, this.selectedOutilPedagogiqueLangue);
    }


     public findByCriteria(outilPedagogiqueLangue:OutilPedagogiqueLangueVo):Observable<Array<OutilPedagogiqueLangueVo>>{
           return this.http.post<Array<OutilPedagogiqueLangueVo>>(this.API +'search', outilPedagogiqueLangue);
    }

   public findByIdWithAssociatedList(outilPedagogiqueLangue:OutilPedagogiqueLangueVo):Observable<OutilPedagogiqueLangueVo>{
         return this.http.get<OutilPedagogiqueLangueVo>(this.API + 'detail/id/' +outilPedagogiqueLangue.id);
    }

    // getters and setters


    get outilPedagogiqueLangues(): Array<OutilPedagogiqueLangueVo> {
    if(this._outilPedagogiqueLangues==null){
    this._outilPedagogiqueLangues=new Array<OutilPedagogiqueLangueVo>();
    }
return this._outilPedagogiqueLangues;
       }

    set outilPedagogiqueLangues(value: Array<OutilPedagogiqueLangueVo>) {
        this._outilPedagogiqueLangues = value;
       }

    get selectedOutilPedagogiqueLangue(): OutilPedagogiqueLangueVo {
    if(this._selectedOutilPedagogiqueLangue==null){
    this._selectedOutilPedagogiqueLangue=new OutilPedagogiqueLangueVo();
    }
           return this._selectedOutilPedagogiqueLangue;
       }

    set selectedOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this._selectedOutilPedagogiqueLangue = value;
       }

    get outilPedagogiqueLangueSelections(): Array<OutilPedagogiqueLangueVo> {
    if(this._outilPedagogiqueLangueSelections==null){
    this._outilPedagogiqueLangueSelections=new Array<OutilPedagogiqueLangueVo>();
    }
        return this._outilPedagogiqueLangueSelections;
       }


    set outilPedagogiqueLangueSelections(value: Array<OutilPedagogiqueLangueVo>) {
        this._outilPedagogiqueLangueSelections = value;
       }

    get createOutilPedagogiqueLangueDialog(): boolean {
        return this._createOutilPedagogiqueLangueDialog;
       }

    set createOutilPedagogiqueLangueDialog(value: boolean) {
        this._createOutilPedagogiqueLangueDialog = value;
       }

    get editOutilPedagogiqueLangueDialog(): boolean {
        return this._editOutilPedagogiqueLangueDialog;
       }

    set editOutilPedagogiqueLangueDialog(value: boolean) {
        this._editOutilPedagogiqueLangueDialog = value;
       }

    get viewOutilPedagogiqueLangueDialog(): boolean {
        return this._viewOutilPedagogiqueLangueDialog;
       }

    set viewOutilPedagogiqueLangueDialog(value: boolean) {
        this._viewOutilPedagogiqueLangueDialog = value;
       }

     get searchOutilPedagogiqueLangue(): OutilPedagogiqueLangueVo {
     if(this._searchOutilPedagogiqueLangue==null){
    this._searchOutilPedagogiqueLangue=new OutilPedagogiqueLangueVo();
    }
        return this._searchOutilPedagogiqueLangue;
    }

    set searchOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this._searchOutilPedagogiqueLangue = value;
       }

}

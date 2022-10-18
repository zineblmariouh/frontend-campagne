import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiquePaysDiffusionVo} from '../model/OutilPedagogiquePaysDiffusion.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiquePaysDiffusionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiquePaysDiffusion/';
        })
    }
     private _outilPedagogiquePaysDiffusions: Array<OutilPedagogiquePaysDiffusionVo> ;
     private _selectedOutilPedagogiquePaysDiffusion: OutilPedagogiquePaysDiffusionVo;
     private _outilPedagogiquePaysDiffusionSelections: Array<OutilPedagogiquePaysDiffusionVo>;
     private _createOutilPedagogiquePaysDiffusionDialog: boolean;
     private _editOutilPedagogiquePaysDiffusionDialog: boolean;
     private _viewOutilPedagogiquePaysDiffusionDialog: boolean;
     public editOutilPedagogiquePaysDiffusion$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiquePaysDiffusionVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiquePaysDiffusionVo> {
         return this.http.post<OutilPedagogiquePaysDiffusionVo>(this.API, this.selectedOutilPedagogiquePaysDiffusion);
    }

    delete(outilPedagogiquePaysDiffusion: OutilPedagogiquePaysDiffusionVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiquePaysDiffusion.id);
    }


    public edit(): Observable<OutilPedagogiquePaysDiffusionVo> {
        return this.http.put<OutilPedagogiquePaysDiffusionVo>(this.API, this.selectedOutilPedagogiquePaysDiffusion);
    }


     public findByCriteria(outilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo):Observable<Array<OutilPedagogiquePaysDiffusionVo>>{
           return this.http.post<Array<OutilPedagogiquePaysDiffusionVo>>(this.API +'search', outilPedagogiquePaysDiffusion);
    }

   public findByIdWithAssociatedList(outilPedagogiquePaysDiffusion:OutilPedagogiquePaysDiffusionVo):Observable<OutilPedagogiquePaysDiffusionVo>{
         return this.http.get<OutilPedagogiquePaysDiffusionVo>(this.API + 'detail/id/' +outilPedagogiquePaysDiffusion.id);
    }

    // getters and setters


    get outilPedagogiquePaysDiffusions(): Array<OutilPedagogiquePaysDiffusionVo> {
    if(this._outilPedagogiquePaysDiffusions==null){
    this._outilPedagogiquePaysDiffusions=new Array<OutilPedagogiquePaysDiffusionVo>();
    }
return this._outilPedagogiquePaysDiffusions;
       }

    set outilPedagogiquePaysDiffusions(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this._outilPedagogiquePaysDiffusions = value;
       }

    get selectedOutilPedagogiquePaysDiffusion(): OutilPedagogiquePaysDiffusionVo {
    if(this._selectedOutilPedagogiquePaysDiffusion==null){
    this._selectedOutilPedagogiquePaysDiffusion=new OutilPedagogiquePaysDiffusionVo();
    }
           return this._selectedOutilPedagogiquePaysDiffusion;
       }

    set selectedOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this._selectedOutilPedagogiquePaysDiffusion = value;
       }

    get outilPedagogiquePaysDiffusionSelections(): Array<OutilPedagogiquePaysDiffusionVo> {
    if(this._outilPedagogiquePaysDiffusionSelections==null){
    this._outilPedagogiquePaysDiffusionSelections=new Array<OutilPedagogiquePaysDiffusionVo>();
    }
        return this._outilPedagogiquePaysDiffusionSelections;
       }


    set outilPedagogiquePaysDiffusionSelections(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this._outilPedagogiquePaysDiffusionSelections = value;
       }

    get createOutilPedagogiquePaysDiffusionDialog(): boolean {
        return this._createOutilPedagogiquePaysDiffusionDialog;
       }

    set createOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this._createOutilPedagogiquePaysDiffusionDialog = value;
       }

    get editOutilPedagogiquePaysDiffusionDialog(): boolean {
        return this._editOutilPedagogiquePaysDiffusionDialog;
       }

    set editOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this._editOutilPedagogiquePaysDiffusionDialog = value;
       }

    get viewOutilPedagogiquePaysDiffusionDialog(): boolean {
        return this._viewOutilPedagogiquePaysDiffusionDialog;
       }

    set viewOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this._viewOutilPedagogiquePaysDiffusionDialog = value;
       }

     get searchOutilPedagogiquePaysDiffusion(): OutilPedagogiquePaysDiffusionVo {
     if(this._searchOutilPedagogiquePaysDiffusion==null){
    this._searchOutilPedagogiquePaysDiffusion=new OutilPedagogiquePaysDiffusionVo();
    }
        return this._searchOutilPedagogiquePaysDiffusion;
    }

    set searchOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this._searchOutilPedagogiquePaysDiffusion = value;
       }

}

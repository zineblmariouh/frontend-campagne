import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {VieInstitutionnelleDetailInstrumentIrdVo} from '../model/VieInstitutionnelleDetailInstrumentIrd.model';
import {VieInstitutionnelleDetailVo} from '../model/VieInstitutionnelleDetail.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class VieInstitutionnelleDetailInstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/vieInstitutionnelleDetailInstrumentIrd/';
        })
    }
     private _vieInstitutionnelleDetailInstrumentIrds: Array<VieInstitutionnelleDetailInstrumentIrdVo> ;
     private _selectedVieInstitutionnelleDetailInstrumentIrd: VieInstitutionnelleDetailInstrumentIrdVo;
     private _vieInstitutionnelleDetailInstrumentIrdSelections: Array<VieInstitutionnelleDetailInstrumentIrdVo>;
     private _createVieInstitutionnelleDetailInstrumentIrdDialog: boolean;
     private _editVieInstitutionnelleDetailInstrumentIrdDialog: boolean;
     private _viewVieInstitutionnelleDetailInstrumentIrdDialog: boolean;
     public editVieInstitutionnelleDetailInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchVieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<VieInstitutionnelleDetailInstrumentIrdVo>>(this.API);
    }

    public save(): Observable<VieInstitutionnelleDetailInstrumentIrdVo> {
         return this.http.post<VieInstitutionnelleDetailInstrumentIrdVo>(this.API, this.selectedVieInstitutionnelleDetailInstrumentIrd);
    }

    delete(vieInstitutionnelleDetailInstrumentIrd: VieInstitutionnelleDetailInstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + vieInstitutionnelleDetailInstrumentIrd.id);
    }


    public edit(): Observable<VieInstitutionnelleDetailInstrumentIrdVo> {
        return this.http.put<VieInstitutionnelleDetailInstrumentIrdVo>(this.API, this.selectedVieInstitutionnelleDetailInstrumentIrd);
    }


     public findByCriteria(vieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo):Observable<Array<VieInstitutionnelleDetailInstrumentIrdVo>>{
           return this.http.post<Array<VieInstitutionnelleDetailInstrumentIrdVo>>(this.API +'search', vieInstitutionnelleDetailInstrumentIrd);
    }

   public findByIdWithAssociatedList(vieInstitutionnelleDetailInstrumentIrd:VieInstitutionnelleDetailInstrumentIrdVo):Observable<VieInstitutionnelleDetailInstrumentIrdVo>{
         return this.http.get<VieInstitutionnelleDetailInstrumentIrdVo>(this.API + 'detail/id/' +vieInstitutionnelleDetailInstrumentIrd.id);
    }

    // getters and setters


    get vieInstitutionnelleDetailInstrumentIrds(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    if(this._vieInstitutionnelleDetailInstrumentIrds==null){
    this._vieInstitutionnelleDetailInstrumentIrds=new Array<VieInstitutionnelleDetailInstrumentIrdVo>();
    }
return this._vieInstitutionnelleDetailInstrumentIrds;
       }

    set vieInstitutionnelleDetailInstrumentIrds(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this._vieInstitutionnelleDetailInstrumentIrds = value;
       }

    get selectedVieInstitutionnelleDetailInstrumentIrd(): VieInstitutionnelleDetailInstrumentIrdVo {
    if(this._selectedVieInstitutionnelleDetailInstrumentIrd==null){
    this._selectedVieInstitutionnelleDetailInstrumentIrd=new VieInstitutionnelleDetailInstrumentIrdVo();
    }
           return this._selectedVieInstitutionnelleDetailInstrumentIrd;
       }

    set selectedVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this._selectedVieInstitutionnelleDetailInstrumentIrd = value;
       }

    get vieInstitutionnelleDetailInstrumentIrdSelections(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    if(this._vieInstitutionnelleDetailInstrumentIrdSelections==null){
    this._vieInstitutionnelleDetailInstrumentIrdSelections=new Array<VieInstitutionnelleDetailInstrumentIrdVo>();
    }
        return this._vieInstitutionnelleDetailInstrumentIrdSelections;
       }


    set vieInstitutionnelleDetailInstrumentIrdSelections(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this._vieInstitutionnelleDetailInstrumentIrdSelections = value;
       }

    get createVieInstitutionnelleDetailInstrumentIrdDialog(): boolean {
        return this._createVieInstitutionnelleDetailInstrumentIrdDialog;
       }

    set createVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this._createVieInstitutionnelleDetailInstrumentIrdDialog = value;
       }

    get editVieInstitutionnelleDetailInstrumentIrdDialog(): boolean {
        return this._editVieInstitutionnelleDetailInstrumentIrdDialog;
       }

    set editVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this._editVieInstitutionnelleDetailInstrumentIrdDialog = value;
       }

    get viewVieInstitutionnelleDetailInstrumentIrdDialog(): boolean {
        return this._viewVieInstitutionnelleDetailInstrumentIrdDialog;
       }

    set viewVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this._viewVieInstitutionnelleDetailInstrumentIrdDialog = value;
       }

     get searchVieInstitutionnelleDetailInstrumentIrd(): VieInstitutionnelleDetailInstrumentIrdVo {
     if(this._searchVieInstitutionnelleDetailInstrumentIrd==null){
    this._searchVieInstitutionnelleDetailInstrumentIrd=new VieInstitutionnelleDetailInstrumentIrdVo();
    }
        return this._searchVieInstitutionnelleDetailInstrumentIrd;
    }

    set searchVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this._searchVieInstitutionnelleDetailInstrumentIrd = value;
       }

}

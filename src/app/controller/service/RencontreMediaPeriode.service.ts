import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreMediaPeriodeVo} from '../model/RencontreMediaPeriode.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreMediaPeriodeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreMediaPeriode/';
        })
    }
     private _rencontreMediaPeriodes: Array<RencontreMediaPeriodeVo> ;
     private _selectedRencontreMediaPeriode: RencontreMediaPeriodeVo;
     private _rencontreMediaPeriodeSelections: Array<RencontreMediaPeriodeVo>;
     private _createRencontreMediaPeriodeDialog: boolean;
     private _editRencontreMediaPeriodeDialog: boolean;
     private _viewRencontreMediaPeriodeDialog: boolean;
     public editRencontreMediaPeriode$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreMediaPeriode:RencontreMediaPeriodeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreMediaPeriodeVo>>(this.API);
    }

    public save(): Observable<RencontreMediaPeriodeVo> {
           return this.http.post<RencontreMediaPeriodeVo>(this.API, {...this.selectedRencontreMediaPeriode,dateRencontre: moment(this.selectedRencontreMediaPeriode.dateRencontre).format("YYYY-MM-DD")});
    }

    delete(rencontreMediaPeriode: RencontreMediaPeriodeVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreMediaPeriode.id);
    }


    public edit(): Observable<RencontreMediaPeriodeVo> {
        return this.http.put<RencontreMediaPeriodeVo>(this.API, this.selectedRencontreMediaPeriode);
    }


     public findByCriteria(rencontreMediaPeriode:RencontreMediaPeriodeVo):Observable<Array<RencontreMediaPeriodeVo>>{
           return this.http.post<Array<RencontreMediaPeriodeVo>>(this.API +'search', rencontreMediaPeriode);
    }

   public findByIdWithAssociatedList(rencontreMediaPeriode:RencontreMediaPeriodeVo):Observable<RencontreMediaPeriodeVo>{
         return this.http.get<RencontreMediaPeriodeVo>(this.API + 'detail/id/' +rencontreMediaPeriode.id);
    }

    // getters and setters


    get rencontreMediaPeriodes(): Array<RencontreMediaPeriodeVo> {
    if(this._rencontreMediaPeriodes==null){
    this._rencontreMediaPeriodes=new Array<RencontreMediaPeriodeVo>();
    }
return this._rencontreMediaPeriodes;
       }

    set rencontreMediaPeriodes(value: Array<RencontreMediaPeriodeVo>) {
        this._rencontreMediaPeriodes = value;
       }

    get selectedRencontreMediaPeriode(): RencontreMediaPeriodeVo {
    if(this._selectedRencontreMediaPeriode==null){
    this._selectedRencontreMediaPeriode=new RencontreMediaPeriodeVo();
    }
           return this._selectedRencontreMediaPeriode;
       }

    set selectedRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this._selectedRencontreMediaPeriode = value;
       }

    get rencontreMediaPeriodeSelections(): Array<RencontreMediaPeriodeVo> {
    if(this._rencontreMediaPeriodeSelections==null){
    this._rencontreMediaPeriodeSelections=new Array<RencontreMediaPeriodeVo>();
    }
        return this._rencontreMediaPeriodeSelections;
       }


    set rencontreMediaPeriodeSelections(value: Array<RencontreMediaPeriodeVo>) {
        this._rencontreMediaPeriodeSelections = value;
       }

    get createRencontreMediaPeriodeDialog(): boolean {
        return this._createRencontreMediaPeriodeDialog;
       }

    set createRencontreMediaPeriodeDialog(value: boolean) {
        this._createRencontreMediaPeriodeDialog = value;
       }

    get editRencontreMediaPeriodeDialog(): boolean {
        return this._editRencontreMediaPeriodeDialog;
       }

    set editRencontreMediaPeriodeDialog(value: boolean) {
        this._editRencontreMediaPeriodeDialog = value;
       }

    get viewRencontreMediaPeriodeDialog(): boolean {
        return this._viewRencontreMediaPeriodeDialog;
       }

    set viewRencontreMediaPeriodeDialog(value: boolean) {
        this._viewRencontreMediaPeriodeDialog = value;
       }

     get searchRencontreMediaPeriode(): RencontreMediaPeriodeVo {
     if(this._searchRencontreMediaPeriode==null){
    this._searchRencontreMediaPeriode=new RencontreMediaPeriodeVo();
    }
        return this._searchRencontreMediaPeriode;
    }

    set searchRencontreMediaPeriode(value: RencontreMediaPeriodeVo) {
        this._searchRencontreMediaPeriode = value;
       }

}

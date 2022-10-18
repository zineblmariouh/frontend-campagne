import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliquePeriodeVo} from '../model/RencontreGrandPubliqueJeunePubliquePeriode.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliquePeriodeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePubliquePeriode/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliquePeriodes: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> ;
     private _selectedRencontreGrandPubliqueJeunePubliquePeriode: RencontreGrandPubliqueJeunePubliquePeriodeVo;
     private _rencontreGrandPubliqueJeunePubliquePeriodeSelections: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>;
     private _createRencontreGrandPubliqueJeunePubliquePeriodeDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliquePeriodeDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliquePeriodeDialog: boolean;
     public editRencontreGrandPubliqueJeunePubliquePeriode$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
           return this.http.post<RencontreGrandPubliqueJeunePubliquePeriodeVo>(this.API, {...this.selectedRencontreGrandPubliqueJeunePubliquePeriode,dateRencontre: moment(this.selectedRencontreGrandPubliqueJeunePubliquePeriode.dateRencontre).format("YYYY-MM-DD")});
    }

    delete(rencontreGrandPubliqueJeunePubliquePeriode: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePubliquePeriode.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliquePeriodeVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliquePeriode);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo):Observable<Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>>(this.API +'search', rencontreGrandPubliqueJeunePubliquePeriode);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliquePeriode:RencontreGrandPubliqueJeunePubliquePeriodeVo):Observable<RencontreGrandPubliqueJeunePubliquePeriodeVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliquePeriodeVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePubliquePeriode.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliquePeriodes(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
    if(this._rencontreGrandPubliqueJeunePubliquePeriodes==null){
    this._rencontreGrandPubliqueJeunePubliquePeriodes=new Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>();
    }
return this._rencontreGrandPubliqueJeunePubliquePeriodes;
       }

    set rencontreGrandPubliqueJeunePubliquePeriodes(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this._rencontreGrandPubliqueJeunePubliquePeriodes = value;
       }

    get selectedRencontreGrandPubliqueJeunePubliquePeriode(): RencontreGrandPubliqueJeunePubliquePeriodeVo {
    if(this._selectedRencontreGrandPubliqueJeunePubliquePeriode==null){
    this._selectedRencontreGrandPubliqueJeunePubliquePeriode=new RencontreGrandPubliqueJeunePubliquePeriodeVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePubliquePeriode;
       }

    set selectedRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this._selectedRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

    get rencontreGrandPubliqueJeunePubliquePeriodeSelections(): Array<RencontreGrandPubliqueJeunePubliquePeriodeVo> {
    if(this._rencontreGrandPubliqueJeunePubliquePeriodeSelections==null){
    this._rencontreGrandPubliqueJeunePubliquePeriodeSelections=new Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliquePeriodeSelections;
       }


    set rencontreGrandPubliqueJeunePubliquePeriodeSelections(value: Array<RencontreGrandPubliqueJeunePubliquePeriodeVo>) {
        this._rencontreGrandPubliqueJeunePubliquePeriodeSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliquePeriodeDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }

    set createRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliquePeriodeDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliquePeriodeDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }

    set editRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliquePeriodeDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliquePeriodeDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliquePeriodeDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliquePeriodeDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliquePeriodeDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePubliquePeriode(): RencontreGrandPubliqueJeunePubliquePeriodeVo {
     if(this._searchRencontreGrandPubliqueJeunePubliquePeriode==null){
    this._searchRencontreGrandPubliqueJeunePubliquePeriode=new RencontreGrandPubliqueJeunePubliquePeriodeVo();
    }
        return this._searchRencontreGrandPubliqueJeunePubliquePeriode;
    }

    set searchRencontreGrandPubliqueJeunePubliquePeriode(value: RencontreGrandPubliqueJeunePubliquePeriodeVo) {
        this._searchRencontreGrandPubliqueJeunePubliquePeriode = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';
import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';


@Injectable({
  providedIn: 'root'
})
export class EvenementColloqueScienntifiqueEnjeuxIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/evenementColloqueScienntifiqueEnjeuxIrd/';
        })
    }
     private _evenementColloqueScienntifiqueEnjeuxIrds: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> ;
     private _selectedEvenementColloqueScienntifiqueEnjeuxIrd: EvenementColloqueScienntifiqueEnjeuxIrdVo;
     private _evenementColloqueScienntifiqueEnjeuxIrdSelections: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>;
     private _createEvenementColloqueScienntifiqueEnjeuxIrdDialog: boolean;
     private _editEvenementColloqueScienntifiqueEnjeuxIrdDialog: boolean;
     private _viewEvenementColloqueScienntifiqueEnjeuxIrdDialog: boolean;
     public editEvenementColloqueScienntifiqueEnjeuxIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEvenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>>(this.API);
    }

    public save(): Observable<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
         return this.http.post<EvenementColloqueScienntifiqueEnjeuxIrdVo>(this.API, this.selectedEvenementColloqueScienntifiqueEnjeuxIrd);
    }

    delete(evenementColloqueScienntifiqueEnjeuxIrd: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + evenementColloqueScienntifiqueEnjeuxIrd.id);
    }


    public edit(): Observable<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
        return this.http.put<EvenementColloqueScienntifiqueEnjeuxIrdVo>(this.API, this.selectedEvenementColloqueScienntifiqueEnjeuxIrd);
    }


     public findByCriteria(evenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo):Observable<Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>>{
           return this.http.post<Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>>(this.API +'search', evenementColloqueScienntifiqueEnjeuxIrd);
    }

   public findByIdWithAssociatedList(evenementColloqueScienntifiqueEnjeuxIrd:EvenementColloqueScienntifiqueEnjeuxIrdVo):Observable<EvenementColloqueScienntifiqueEnjeuxIrdVo>{
         return this.http.get<EvenementColloqueScienntifiqueEnjeuxIrdVo>(this.API + 'detail/id/' +evenementColloqueScienntifiqueEnjeuxIrd.id);
    }

    // getters and setters


    get evenementColloqueScienntifiqueEnjeuxIrds(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    if(this._evenementColloqueScienntifiqueEnjeuxIrds==null){
    this._evenementColloqueScienntifiqueEnjeuxIrds=new Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>();
    }
return this._evenementColloqueScienntifiqueEnjeuxIrds;
       }

    set evenementColloqueScienntifiqueEnjeuxIrds(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this._evenementColloqueScienntifiqueEnjeuxIrds = value;
       }

    get selectedEvenementColloqueScienntifiqueEnjeuxIrd(): EvenementColloqueScienntifiqueEnjeuxIrdVo {
    if(this._selectedEvenementColloqueScienntifiqueEnjeuxIrd==null){
    this._selectedEvenementColloqueScienntifiqueEnjeuxIrd=new EvenementColloqueScienntifiqueEnjeuxIrdVo();
    }
           return this._selectedEvenementColloqueScienntifiqueEnjeuxIrd;
       }

    set selectedEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this._selectedEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }

    get evenementColloqueScienntifiqueEnjeuxIrdSelections(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    if(this._evenementColloqueScienntifiqueEnjeuxIrdSelections==null){
    this._evenementColloqueScienntifiqueEnjeuxIrdSelections=new Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>();
    }
        return this._evenementColloqueScienntifiqueEnjeuxIrdSelections;
       }


    set evenementColloqueScienntifiqueEnjeuxIrdSelections(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this._evenementColloqueScienntifiqueEnjeuxIrdSelections = value;
       }

    get createEvenementColloqueScienntifiqueEnjeuxIrdDialog(): boolean {
        return this._createEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }

    set createEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this._createEvenementColloqueScienntifiqueEnjeuxIrdDialog = value;
       }

    get editEvenementColloqueScienntifiqueEnjeuxIrdDialog(): boolean {
        return this._editEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }

    set editEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this._editEvenementColloqueScienntifiqueEnjeuxIrdDialog = value;
       }

    get viewEvenementColloqueScienntifiqueEnjeuxIrdDialog(): boolean {
        return this._viewEvenementColloqueScienntifiqueEnjeuxIrdDialog;
       }

    set viewEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this._viewEvenementColloqueScienntifiqueEnjeuxIrdDialog = value;
       }

     get searchEvenementColloqueScienntifiqueEnjeuxIrd(): EvenementColloqueScienntifiqueEnjeuxIrdVo {
     if(this._searchEvenementColloqueScienntifiqueEnjeuxIrd==null){
    this._searchEvenementColloqueScienntifiqueEnjeuxIrd=new EvenementColloqueScienntifiqueEnjeuxIrdVo();
    }
        return this._searchEvenementColloqueScienntifiqueEnjeuxIrd;
    }

    set searchEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this._searchEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }

}

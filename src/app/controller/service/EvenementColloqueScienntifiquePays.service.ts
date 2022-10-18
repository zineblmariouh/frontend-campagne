import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EvenementColloqueScienntifiquePaysVo} from '../model/EvenementColloqueScienntifiquePays.model';
import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EvenementColloqueScienntifiquePaysService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/evenementColloqueScienntifiquePays/';
        })
    }
     private _evenementColloqueScienntifiquePayss: Array<EvenementColloqueScienntifiquePaysVo> ;
     private _selectedEvenementColloqueScienntifiquePays: EvenementColloqueScienntifiquePaysVo;
     private _evenementColloqueScienntifiquePaysSelections: Array<EvenementColloqueScienntifiquePaysVo>;
     private _createEvenementColloqueScienntifiquePaysDialog: boolean;
     private _editEvenementColloqueScienntifiquePaysDialog: boolean;
     private _viewEvenementColloqueScienntifiquePaysDialog: boolean;
     public editEvenementColloqueScienntifiquePays$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEvenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EvenementColloqueScienntifiquePaysVo>>(this.API);
    }

    public save(): Observable<EvenementColloqueScienntifiquePaysVo> {
         return this.http.post<EvenementColloqueScienntifiquePaysVo>(this.API, this.selectedEvenementColloqueScienntifiquePays);
    }

    delete(evenementColloqueScienntifiquePays: EvenementColloqueScienntifiquePaysVo) {
         return this.http.delete<number>(this.API + 'id/' + evenementColloqueScienntifiquePays.id);
    }


    public edit(): Observable<EvenementColloqueScienntifiquePaysVo> {
        return this.http.put<EvenementColloqueScienntifiquePaysVo>(this.API, this.selectedEvenementColloqueScienntifiquePays);
    }


     public findByCriteria(evenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo):Observable<Array<EvenementColloqueScienntifiquePaysVo>>{
           return this.http.post<Array<EvenementColloqueScienntifiquePaysVo>>(this.API +'search', evenementColloqueScienntifiquePays);
    }

   public findByIdWithAssociatedList(evenementColloqueScienntifiquePays:EvenementColloqueScienntifiquePaysVo):Observable<EvenementColloqueScienntifiquePaysVo>{
         return this.http.get<EvenementColloqueScienntifiquePaysVo>(this.API + 'detail/id/' +evenementColloqueScienntifiquePays.id);
    }

    // getters and setters


    get evenementColloqueScienntifiquePayss(): Array<EvenementColloqueScienntifiquePaysVo> {
    if(this._evenementColloqueScienntifiquePayss==null){
    this._evenementColloqueScienntifiquePayss=new Array<EvenementColloqueScienntifiquePaysVo>();
    }
return this._evenementColloqueScienntifiquePayss;
       }

    set evenementColloqueScienntifiquePayss(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this._evenementColloqueScienntifiquePayss = value;
       }

    get selectedEvenementColloqueScienntifiquePays(): EvenementColloqueScienntifiquePaysVo {
    if(this._selectedEvenementColloqueScienntifiquePays==null){
    this._selectedEvenementColloqueScienntifiquePays=new EvenementColloqueScienntifiquePaysVo();
    }
           return this._selectedEvenementColloqueScienntifiquePays;
       }

    set selectedEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this._selectedEvenementColloqueScienntifiquePays = value;
       }

    get evenementColloqueScienntifiquePaysSelections(): Array<EvenementColloqueScienntifiquePaysVo> {
    if(this._evenementColloqueScienntifiquePaysSelections==null){
    this._evenementColloqueScienntifiquePaysSelections=new Array<EvenementColloqueScienntifiquePaysVo>();
    }
        return this._evenementColloqueScienntifiquePaysSelections;
       }


    set evenementColloqueScienntifiquePaysSelections(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this._evenementColloqueScienntifiquePaysSelections = value;
       }

    get createEvenementColloqueScienntifiquePaysDialog(): boolean {
        return this._createEvenementColloqueScienntifiquePaysDialog;
       }

    set createEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this._createEvenementColloqueScienntifiquePaysDialog = value;
       }

    get editEvenementColloqueScienntifiquePaysDialog(): boolean {
        return this._editEvenementColloqueScienntifiquePaysDialog;
       }

    set editEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this._editEvenementColloqueScienntifiquePaysDialog = value;
       }

    get viewEvenementColloqueScienntifiquePaysDialog(): boolean {
        return this._viewEvenementColloqueScienntifiquePaysDialog;
       }

    set viewEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this._viewEvenementColloqueScienntifiquePaysDialog = value;
       }

     get searchEvenementColloqueScienntifiquePays(): EvenementColloqueScienntifiquePaysVo {
     if(this._searchEvenementColloqueScienntifiquePays==null){
    this._searchEvenementColloqueScienntifiquePays=new EvenementColloqueScienntifiquePaysVo();
    }
        return this._searchEvenementColloqueScienntifiquePays;
    }

    set searchEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this._searchEvenementColloqueScienntifiquePays = value;
       }

}

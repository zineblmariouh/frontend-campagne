import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstrumentsEtDispositifsIrdVo} from '../model/InstrumentsEtDispositifsIrd.model';
import {CampagneVo} from '../model/Campagne.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class InstrumentsEtDispositifsIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/instrumentsEtDispositifsIrd/';
        })
    }
     private _instrumentsEtDispositifsIrds: Array<InstrumentsEtDispositifsIrdVo> ;
     private _selectedInstrumentsEtDispositifsIrd: InstrumentsEtDispositifsIrdVo;
     private _instrumentsEtDispositifsIrdSelections: Array<InstrumentsEtDispositifsIrdVo>;
     private _createInstrumentsEtDispositifsIrdDialog: boolean;
     private _editInstrumentsEtDispositifsIrdDialog: boolean;
     private _viewInstrumentsEtDispositifsIrdDialog: boolean;
     public editInstrumentsEtDispositifsIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo ;

    // methods

    public findAll(){
     return this.http.get<Array<InstrumentsEtDispositifsIrdVo>>(this.API);
    }

    public save(): Observable<InstrumentsEtDispositifsIrdVo> {
         return this.http.post<InstrumentsEtDispositifsIrdVo>(this.API, this.selectedInstrumentsEtDispositifsIrd);
    }

    delete(instrumentsEtDispositifsIrd: InstrumentsEtDispositifsIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + instrumentsEtDispositifsIrd.id);
    }


    public edit(): Observable<InstrumentsEtDispositifsIrdVo> {
        return this.http.put<InstrumentsEtDispositifsIrdVo>(this.API, this.selectedInstrumentsEtDispositifsIrd);
    }


     public findByCriteria(instrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo):Observable<Array<InstrumentsEtDispositifsIrdVo>>{
           return this.http.post<Array<InstrumentsEtDispositifsIrdVo>>(this.API +'search', instrumentsEtDispositifsIrd);
    }

   public findByIdWithAssociatedList(instrumentsEtDispositifsIrd:InstrumentsEtDispositifsIrdVo):Observable<InstrumentsEtDispositifsIrdVo>{
         return this.http.get<InstrumentsEtDispositifsIrdVo>(this.API + 'detail/id/' +instrumentsEtDispositifsIrd.id);
    }

    // getters and setters


    get instrumentsEtDispositifsIrds(): Array<InstrumentsEtDispositifsIrdVo> {
    if(this._instrumentsEtDispositifsIrds==null){
    this._instrumentsEtDispositifsIrds=new Array<InstrumentsEtDispositifsIrdVo>();
    }
return this._instrumentsEtDispositifsIrds;
       }

    set instrumentsEtDispositifsIrds(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this._instrumentsEtDispositifsIrds = value;
       }

    get selectedInstrumentsEtDispositifsIrd(): InstrumentsEtDispositifsIrdVo {
    if(this._selectedInstrumentsEtDispositifsIrd==null){
    this._selectedInstrumentsEtDispositifsIrd=new InstrumentsEtDispositifsIrdVo();
    }
           return this._selectedInstrumentsEtDispositifsIrd;
       }

    set selectedInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this._selectedInstrumentsEtDispositifsIrd = value;
       }

    get instrumentsEtDispositifsIrdSelections(): Array<InstrumentsEtDispositifsIrdVo> {
    if(this._instrumentsEtDispositifsIrdSelections==null){
    this._instrumentsEtDispositifsIrdSelections=new Array<InstrumentsEtDispositifsIrdVo>();
    }
        return this._instrumentsEtDispositifsIrdSelections;
       }


    set instrumentsEtDispositifsIrdSelections(value: Array<InstrumentsEtDispositifsIrdVo>) {
        this._instrumentsEtDispositifsIrdSelections = value;
       }

    get createInstrumentsEtDispositifsIrdDialog(): boolean {
        return this._createInstrumentsEtDispositifsIrdDialog;
       }

    set createInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this._createInstrumentsEtDispositifsIrdDialog = value;
       }

    get editInstrumentsEtDispositifsIrdDialog(): boolean {
        return this._editInstrumentsEtDispositifsIrdDialog;
       }

    set editInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this._editInstrumentsEtDispositifsIrdDialog = value;
       }

    get viewInstrumentsEtDispositifsIrdDialog(): boolean {
        return this._viewInstrumentsEtDispositifsIrdDialog;
       }

    set viewInstrumentsEtDispositifsIrdDialog(value: boolean) {
        this._viewInstrumentsEtDispositifsIrdDialog = value;
       }

     get searchInstrumentsEtDispositifsIrd(): InstrumentsEtDispositifsIrdVo {
     if(this._searchInstrumentsEtDispositifsIrd==null){
    this._searchInstrumentsEtDispositifsIrd=new InstrumentsEtDispositifsIrdVo();
    }
        return this._searchInstrumentsEtDispositifsIrd;
    }

    set searchInstrumentsEtDispositifsIrd(value: InstrumentsEtDispositifsIrdVo) {
        this._searchInstrumentsEtDispositifsIrd = value;
       }

}

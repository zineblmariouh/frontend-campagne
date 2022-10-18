import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstrumentIrdVo} from '../model/InstrumentIrd.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class InstrumentIrdService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/instrumentIrd/';
        })
    }
     private _instrumentIrds: Array<InstrumentIrdVo> ;
     private _selectedInstrumentIrd: InstrumentIrdVo;
     private _instrumentIrdSelections: Array<InstrumentIrdVo>;
     private _createInstrumentIrdDialog: boolean;
     private _editInstrumentIrdDialog: boolean;
     private _viewInstrumentIrdDialog: boolean;
     public editInstrumentIrd$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstrumentIrd:InstrumentIrdVo ;

    // methods
    public archiver(instrumentIrd: InstrumentIrdVo): Observable<InstrumentIrdVo> {
        return this.http.put<InstrumentIrdVo>(this.API + 'archiver/' ,instrumentIrd);
    }
    public desarchiver(instrumentIrd: InstrumentIrdVo): Observable<InstrumentIrdVo> {
    return this.http.put<InstrumentIrdVo>(this.API + 'desarchiver/' ,instrumentIrd);
    }

    public findAll(){
     return this.http.get<Array<InstrumentIrdVo>>(this.API);
    }

    public save(): Observable<InstrumentIrdVo> {
           return this.http.post<InstrumentIrdVo>(this.API, {...this.selectedInstrumentIrd,dateCreation: moment(this.selectedInstrumentIrd.dateCreation).format("YYYY-MM-DD")});
    }

    delete(instrumentIrd: InstrumentIrdVo) {
         return this.http.delete<number>(this.API + 'id/' + instrumentIrd.id);
    }


    public edit(): Observable<InstrumentIrdVo> {
        return this.http.put<InstrumentIrdVo>(this.API, this.selectedInstrumentIrd);
    }


     public findByCriteria(instrumentIrd:InstrumentIrdVo):Observable<Array<InstrumentIrdVo>>{
           return this.http.post<Array<InstrumentIrdVo>>(this.API +'search', instrumentIrd);
    }

   public findByIdWithAssociatedList(instrumentIrd:InstrumentIrdVo):Observable<InstrumentIrdVo>{
         return this.http.get<InstrumentIrdVo>(this.API + 'detail/id/' +instrumentIrd.id);
    }

    // getters and setters


    get instrumentIrds(): Array<InstrumentIrdVo> {
    if(this._instrumentIrds==null){
    this._instrumentIrds=new Array<InstrumentIrdVo>();
    }
return this._instrumentIrds;
       }

    set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this._instrumentIrds = value;
       }

    get selectedInstrumentIrd(): InstrumentIrdVo {
    if(this._selectedInstrumentIrd==null){
    this._selectedInstrumentIrd=new InstrumentIrdVo();
    }
           return this._selectedInstrumentIrd;
       }

    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this._selectedInstrumentIrd = value;
       }

    get instrumentIrdSelections(): Array<InstrumentIrdVo> {
    if(this._instrumentIrdSelections==null){
    this._instrumentIrdSelections=new Array<InstrumentIrdVo>();
    }
        return this._instrumentIrdSelections;
       }


    set instrumentIrdSelections(value: Array<InstrumentIrdVo>) {
        this._instrumentIrdSelections = value;
       }

    get createInstrumentIrdDialog(): boolean {
        return this._createInstrumentIrdDialog;
       }

    set createInstrumentIrdDialog(value: boolean) {
        this._createInstrumentIrdDialog = value;
       }

    get editInstrumentIrdDialog(): boolean {
        return this._editInstrumentIrdDialog;
       }

    set editInstrumentIrdDialog(value: boolean) {
        this._editInstrumentIrdDialog = value;
       }

    get viewInstrumentIrdDialog(): boolean {
        return this._viewInstrumentIrdDialog;
       }

    set viewInstrumentIrdDialog(value: boolean) {
        this._viewInstrumentIrdDialog = value;
       }

     get searchInstrumentIrd(): InstrumentIrdVo {
     if(this._searchInstrumentIrd==null){
    this._searchInstrumentIrd=new InstrumentIrdVo();
    }
        return this._searchInstrumentIrd;
    }

    set searchInstrumentIrd(value: InstrumentIrdVo) {
        this._searchInstrumentIrd = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class InstrumentIrdConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/instrumentIrdConsultanceScientifiquePonctuelle/';
        })
    }
     private _instrumentIrdConsultanceScientifiquePonctuelles: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> ;
     private _selectedInstrumentIrdConsultanceScientifiquePonctuelle: InstrumentIrdConsultanceScientifiquePonctuelleVo;
     private _instrumentIrdConsultanceScientifiquePonctuelleSelections: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>;
     private _createInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _editInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     public editInstrumentIrdConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
         return this.http.post<InstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedInstrumentIrdConsultanceScientifiquePonctuelle);
    }

    delete(instrumentIrdConsultanceScientifiquePonctuelle: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + instrumentIrdConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
        return this.http.put<InstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedInstrumentIrdConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(instrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo):Observable<Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>>(this.API +'search', instrumentIrdConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(instrumentIrdConsultanceScientifiquePonctuelle:InstrumentIrdConsultanceScientifiquePonctuelleVo):Observable<InstrumentIrdConsultanceScientifiquePonctuelleVo>{
         return this.http.get<InstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +instrumentIrdConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get instrumentIrdConsultanceScientifiquePonctuelles(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
    if(this._instrumentIrdConsultanceScientifiquePonctuelles==null){
    this._instrumentIrdConsultanceScientifiquePonctuelles=new Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>();
    }
return this._instrumentIrdConsultanceScientifiquePonctuelles;
       }

    set instrumentIrdConsultanceScientifiquePonctuelles(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this._instrumentIrdConsultanceScientifiquePonctuelles = value;
       }

    get selectedInstrumentIrdConsultanceScientifiquePonctuelle(): InstrumentIrdConsultanceScientifiquePonctuelleVo {
    if(this._selectedInstrumentIrdConsultanceScientifiquePonctuelle==null){
    this._selectedInstrumentIrdConsultanceScientifiquePonctuelle=new InstrumentIrdConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedInstrumentIrdConsultanceScientifiquePonctuelle;
       }

    set selectedInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this._selectedInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

    get instrumentIrdConsultanceScientifiquePonctuelleSelections(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
    if(this._instrumentIrdConsultanceScientifiquePonctuelleSelections==null){
    this._instrumentIrdConsultanceScientifiquePonctuelleSelections=new Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>();
    }
        return this._instrumentIrdConsultanceScientifiquePonctuelleSelections;
       }


    set instrumentIrdConsultanceScientifiquePonctuelleSelections(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this._instrumentIrdConsultanceScientifiquePonctuelleSelections = value;
       }

    get createInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set createInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get editInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set editInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set viewInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchInstrumentIrdConsultanceScientifiquePonctuelle(): InstrumentIrdConsultanceScientifiquePonctuelleVo {
     if(this._searchInstrumentIrdConsultanceScientifiquePonctuelle==null){
    this._searchInstrumentIrdConsultanceScientifiquePonctuelle=new InstrumentIrdConsultanceScientifiquePonctuelleVo();
    }
        return this._searchInstrumentIrdConsultanceScientifiquePonctuelle;
    }

    set searchInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this._searchInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

}

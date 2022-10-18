import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstrumentIrdChercheurVo} from '../model/InstrumentIrdChercheur.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class InstrumentIrdChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/instrumentIrdChercheur/';
        })
    }
     private _instrumentIrdChercheurs: Array<InstrumentIrdChercheurVo> ;
     private _selectedInstrumentIrdChercheur: InstrumentIrdChercheurVo;
     private _instrumentIrdChercheurSelections: Array<InstrumentIrdChercheurVo>;
     private _createInstrumentIrdChercheurDialog: boolean;
     private _editInstrumentIrdChercheurDialog: boolean;
     private _viewInstrumentIrdChercheurDialog: boolean;
     public editInstrumentIrdChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstrumentIrdChercheur:InstrumentIrdChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<InstrumentIrdChercheurVo>>(this.API);
    }

    public save(): Observable<InstrumentIrdChercheurVo> {
         return this.http.post<InstrumentIrdChercheurVo>(this.API, this.selectedInstrumentIrdChercheur);
    }

    delete(instrumentIrdChercheur: InstrumentIrdChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + instrumentIrdChercheur.id);
    }


    public edit(): Observable<InstrumentIrdChercheurVo> {
        return this.http.put<InstrumentIrdChercheurVo>(this.API, this.selectedInstrumentIrdChercheur);
    }


     public findByCriteria(instrumentIrdChercheur:InstrumentIrdChercheurVo):Observable<Array<InstrumentIrdChercheurVo>>{
           return this.http.post<Array<InstrumentIrdChercheurVo>>(this.API +'search', instrumentIrdChercheur);
    }

   public findByIdWithAssociatedList(instrumentIrdChercheur:InstrumentIrdChercheurVo):Observable<InstrumentIrdChercheurVo>{
         return this.http.get<InstrumentIrdChercheurVo>(this.API + 'detail/id/' +instrumentIrdChercheur.id);
    }

    // getters and setters


    get instrumentIrdChercheurs(): Array<InstrumentIrdChercheurVo> {
    if(this._instrumentIrdChercheurs==null){
    this._instrumentIrdChercheurs=new Array<InstrumentIrdChercheurVo>();
    }
return this._instrumentIrdChercheurs;
       }

    set instrumentIrdChercheurs(value: Array<InstrumentIrdChercheurVo>) {
        this._instrumentIrdChercheurs = value;
       }

    get selectedInstrumentIrdChercheur(): InstrumentIrdChercheurVo {
    if(this._selectedInstrumentIrdChercheur==null){
    this._selectedInstrumentIrdChercheur=new InstrumentIrdChercheurVo();
    }
           return this._selectedInstrumentIrdChercheur;
       }

    set selectedInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this._selectedInstrumentIrdChercheur = value;
       }

    get instrumentIrdChercheurSelections(): Array<InstrumentIrdChercheurVo> {
    if(this._instrumentIrdChercheurSelections==null){
    this._instrumentIrdChercheurSelections=new Array<InstrumentIrdChercheurVo>();
    }
        return this._instrumentIrdChercheurSelections;
       }


    set instrumentIrdChercheurSelections(value: Array<InstrumentIrdChercheurVo>) {
        this._instrumentIrdChercheurSelections = value;
       }

    get createInstrumentIrdChercheurDialog(): boolean {
        return this._createInstrumentIrdChercheurDialog;
       }

    set createInstrumentIrdChercheurDialog(value: boolean) {
        this._createInstrumentIrdChercheurDialog = value;
       }

    get editInstrumentIrdChercheurDialog(): boolean {
        return this._editInstrumentIrdChercheurDialog;
       }

    set editInstrumentIrdChercheurDialog(value: boolean) {
        this._editInstrumentIrdChercheurDialog = value;
       }

    get viewInstrumentIrdChercheurDialog(): boolean {
        return this._viewInstrumentIrdChercheurDialog;
       }

    set viewInstrumentIrdChercheurDialog(value: boolean) {
        this._viewInstrumentIrdChercheurDialog = value;
       }

     get searchInstrumentIrdChercheur(): InstrumentIrdChercheurVo {
     if(this._searchInstrumentIrdChercheur==null){
    this._searchInstrumentIrdChercheur=new InstrumentIrdChercheurVo();
    }
        return this._searchInstrumentIrdChercheur;
    }

    set searchInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this._searchInstrumentIrdChercheur = value;
       }

}

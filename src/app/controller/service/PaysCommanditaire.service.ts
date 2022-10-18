import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysCommanditaireVo} from '../model/PaysCommanditaire.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysCommanditaireService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paysCommanditaire/';
        })
    }
     private _paysCommanditaires: Array<PaysCommanditaireVo> ;
     private _selectedPaysCommanditaire: PaysCommanditaireVo;
     private _paysCommanditaireSelections: Array<PaysCommanditaireVo>;
     private _createPaysCommanditaireDialog: boolean;
     private _editPaysCommanditaireDialog: boolean;
     private _viewPaysCommanditaireDialog: boolean;
     public editPaysCommanditaire$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaysCommanditaire:PaysCommanditaireVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaysCommanditaireVo>>(this.API);
    }

    public save(): Observable<PaysCommanditaireVo> {
         return this.http.post<PaysCommanditaireVo>(this.API, this.selectedPaysCommanditaire);
    }

    delete(paysCommanditaire: PaysCommanditaireVo) {
         return this.http.delete<number>(this.API + 'id/' + paysCommanditaire.id);
    }


    public edit(): Observable<PaysCommanditaireVo> {
        return this.http.put<PaysCommanditaireVo>(this.API, this.selectedPaysCommanditaire);
    }


     public findByCriteria(paysCommanditaire:PaysCommanditaireVo):Observable<Array<PaysCommanditaireVo>>{
           return this.http.post<Array<PaysCommanditaireVo>>(this.API +'search', paysCommanditaire);
    }

   public findByIdWithAssociatedList(paysCommanditaire:PaysCommanditaireVo):Observable<PaysCommanditaireVo>{
         return this.http.get<PaysCommanditaireVo>(this.API + 'detail/id/' +paysCommanditaire.id);
    }

    // getters and setters


    get paysCommanditaires(): Array<PaysCommanditaireVo> {
    if(this._paysCommanditaires==null){
    this._paysCommanditaires=new Array<PaysCommanditaireVo>();
    }
return this._paysCommanditaires;
       }

    set paysCommanditaires(value: Array<PaysCommanditaireVo>) {
        this._paysCommanditaires = value;
       }

    get selectedPaysCommanditaire(): PaysCommanditaireVo {
    if(this._selectedPaysCommanditaire==null){
    this._selectedPaysCommanditaire=new PaysCommanditaireVo();
    }
           return this._selectedPaysCommanditaire;
       }

    set selectedPaysCommanditaire(value: PaysCommanditaireVo) {
        this._selectedPaysCommanditaire = value;
       }

    get paysCommanditaireSelections(): Array<PaysCommanditaireVo> {
    if(this._paysCommanditaireSelections==null){
    this._paysCommanditaireSelections=new Array<PaysCommanditaireVo>();
    }
        return this._paysCommanditaireSelections;
       }


    set paysCommanditaireSelections(value: Array<PaysCommanditaireVo>) {
        this._paysCommanditaireSelections = value;
       }

    get createPaysCommanditaireDialog(): boolean {
        return this._createPaysCommanditaireDialog;
       }

    set createPaysCommanditaireDialog(value: boolean) {
        this._createPaysCommanditaireDialog = value;
       }

    get editPaysCommanditaireDialog(): boolean {
        return this._editPaysCommanditaireDialog;
       }

    set editPaysCommanditaireDialog(value: boolean) {
        this._editPaysCommanditaireDialog = value;
       }

    get viewPaysCommanditaireDialog(): boolean {
        return this._viewPaysCommanditaireDialog;
       }

    set viewPaysCommanditaireDialog(value: boolean) {
        this._viewPaysCommanditaireDialog = value;
       }

     get searchPaysCommanditaire(): PaysCommanditaireVo {
     if(this._searchPaysCommanditaire==null){
    this._searchPaysCommanditaire=new PaysCommanditaireVo();
    }
        return this._searchPaysCommanditaire;
    }

    set searchPaysCommanditaire(value: PaysCommanditaireVo) {
        this._searchPaysCommanditaire = value;
       }

}

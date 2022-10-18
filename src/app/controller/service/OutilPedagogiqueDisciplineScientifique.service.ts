import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OutilPedagogiqueDisciplineScientifiqueVo} from '../model/OutilPedagogiqueDisciplineScientifique.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class OutilPedagogiqueDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/outilPedagogiqueDisciplineScientifique/';
        })
    }
     private _outilPedagogiqueDisciplineScientifiques: Array<OutilPedagogiqueDisciplineScientifiqueVo> ;
     private _selectedOutilPedagogiqueDisciplineScientifique: OutilPedagogiqueDisciplineScientifiqueVo;
     private _outilPedagogiqueDisciplineScientifiqueSelections: Array<OutilPedagogiqueDisciplineScientifiqueVo>;
     private _createOutilPedagogiqueDisciplineScientifiqueDialog: boolean;
     private _editOutilPedagogiqueDisciplineScientifiqueDialog: boolean;
     private _viewOutilPedagogiqueDisciplineScientifiqueDialog: boolean;
     public editOutilPedagogiqueDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOutilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<OutilPedagogiqueDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<OutilPedagogiqueDisciplineScientifiqueVo> {
         return this.http.post<OutilPedagogiqueDisciplineScientifiqueVo>(this.API, this.selectedOutilPedagogiqueDisciplineScientifique);
    }

    delete(outilPedagogiqueDisciplineScientifique: OutilPedagogiqueDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + outilPedagogiqueDisciplineScientifique.id);
    }


    public edit(): Observable<OutilPedagogiqueDisciplineScientifiqueVo> {
        return this.http.put<OutilPedagogiqueDisciplineScientifiqueVo>(this.API, this.selectedOutilPedagogiqueDisciplineScientifique);
    }


     public findByCriteria(outilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo):Observable<Array<OutilPedagogiqueDisciplineScientifiqueVo>>{
           return this.http.post<Array<OutilPedagogiqueDisciplineScientifiqueVo>>(this.API +'search', outilPedagogiqueDisciplineScientifique);
    }

   public findByIdWithAssociatedList(outilPedagogiqueDisciplineScientifique:OutilPedagogiqueDisciplineScientifiqueVo):Observable<OutilPedagogiqueDisciplineScientifiqueVo>{
         return this.http.get<OutilPedagogiqueDisciplineScientifiqueVo>(this.API + 'detail/id/' +outilPedagogiqueDisciplineScientifique.id);
    }

    // getters and setters


    get outilPedagogiqueDisciplineScientifiques(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    if(this._outilPedagogiqueDisciplineScientifiques==null){
    this._outilPedagogiqueDisciplineScientifiques=new Array<OutilPedagogiqueDisciplineScientifiqueVo>();
    }
return this._outilPedagogiqueDisciplineScientifiques;
       }

    set outilPedagogiqueDisciplineScientifiques(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this._outilPedagogiqueDisciplineScientifiques = value;
       }

    get selectedOutilPedagogiqueDisciplineScientifique(): OutilPedagogiqueDisciplineScientifiqueVo {
    if(this._selectedOutilPedagogiqueDisciplineScientifique==null){
    this._selectedOutilPedagogiqueDisciplineScientifique=new OutilPedagogiqueDisciplineScientifiqueVo();
    }
           return this._selectedOutilPedagogiqueDisciplineScientifique;
       }

    set selectedOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this._selectedOutilPedagogiqueDisciplineScientifique = value;
       }

    get outilPedagogiqueDisciplineScientifiqueSelections(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    if(this._outilPedagogiqueDisciplineScientifiqueSelections==null){
    this._outilPedagogiqueDisciplineScientifiqueSelections=new Array<OutilPedagogiqueDisciplineScientifiqueVo>();
    }
        return this._outilPedagogiqueDisciplineScientifiqueSelections;
       }


    set outilPedagogiqueDisciplineScientifiqueSelections(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this._outilPedagogiqueDisciplineScientifiqueSelections = value;
       }

    get createOutilPedagogiqueDisciplineScientifiqueDialog(): boolean {
        return this._createOutilPedagogiqueDisciplineScientifiqueDialog;
       }

    set createOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this._createOutilPedagogiqueDisciplineScientifiqueDialog = value;
       }

    get editOutilPedagogiqueDisciplineScientifiqueDialog(): boolean {
        return this._editOutilPedagogiqueDisciplineScientifiqueDialog;
       }

    set editOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this._editOutilPedagogiqueDisciplineScientifiqueDialog = value;
       }

    get viewOutilPedagogiqueDisciplineScientifiqueDialog(): boolean {
        return this._viewOutilPedagogiqueDisciplineScientifiqueDialog;
       }

    set viewOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this._viewOutilPedagogiqueDisciplineScientifiqueDialog = value;
       }

     get searchOutilPedagogiqueDisciplineScientifique(): OutilPedagogiqueDisciplineScientifiqueVo {
     if(this._searchOutilPedagogiqueDisciplineScientifique==null){
    this._searchOutilPedagogiqueDisciplineScientifique=new OutilPedagogiqueDisciplineScientifiqueVo();
    }
        return this._searchOutilPedagogiqueDisciplineScientifique;
    }

    set searchOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this._searchOutilPedagogiqueDisciplineScientifique = value;
       }

}

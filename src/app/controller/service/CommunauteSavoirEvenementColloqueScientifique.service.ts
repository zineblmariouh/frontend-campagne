import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../model/CommunauteSavoirEvenementColloqueScientifique.model';
import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirEvenementColloqueScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirEvenementColloqueScientifique/';
        })
    }
     private _communauteSavoirEvenementColloqueScientifiques: Array<CommunauteSavoirEvenementColloqueScientifiqueVo> ;
     private _selectedCommunauteSavoirEvenementColloqueScientifique: CommunauteSavoirEvenementColloqueScientifiqueVo;
     private _communauteSavoirEvenementColloqueScientifiqueSelections: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>;
     private _createCommunauteSavoirEvenementColloqueScientifiqueDialog: boolean;
     private _editCommunauteSavoirEvenementColloqueScientifiqueDialog: boolean;
     private _viewCommunauteSavoirEvenementColloqueScientifiqueDialog: boolean;
     public editCommunauteSavoirEvenementColloqueScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirEvenementColloqueScientifiqueVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirEvenementColloqueScientifiqueVo> {
         return this.http.post<CommunauteSavoirEvenementColloqueScientifiqueVo>(this.API, this.selectedCommunauteSavoirEvenementColloqueScientifique);
    }

    delete(communauteSavoirEvenementColloqueScientifique: CommunauteSavoirEvenementColloqueScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirEvenementColloqueScientifique.id);
    }


    public edit(): Observable<CommunauteSavoirEvenementColloqueScientifiqueVo> {
        return this.http.put<CommunauteSavoirEvenementColloqueScientifiqueVo>(this.API, this.selectedCommunauteSavoirEvenementColloqueScientifique);
    }


     public findByCriteria(communauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo):Observable<Array<CommunauteSavoirEvenementColloqueScientifiqueVo>>{
           return this.http.post<Array<CommunauteSavoirEvenementColloqueScientifiqueVo>>(this.API +'search', communauteSavoirEvenementColloqueScientifique);
    }

   public findByIdWithAssociatedList(communauteSavoirEvenementColloqueScientifique:CommunauteSavoirEvenementColloqueScientifiqueVo):Observable<CommunauteSavoirEvenementColloqueScientifiqueVo>{
         return this.http.get<CommunauteSavoirEvenementColloqueScientifiqueVo>(this.API + 'detail/id/' +communauteSavoirEvenementColloqueScientifique.id);
    }

    // getters and setters


    get communauteSavoirEvenementColloqueScientifiques(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    if(this._communauteSavoirEvenementColloqueScientifiques==null){
    this._communauteSavoirEvenementColloqueScientifiques=new Array<CommunauteSavoirEvenementColloqueScientifiqueVo>();
    }
return this._communauteSavoirEvenementColloqueScientifiques;
       }

    set communauteSavoirEvenementColloqueScientifiques(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this._communauteSavoirEvenementColloqueScientifiques = value;
       }

    get selectedCommunauteSavoirEvenementColloqueScientifique(): CommunauteSavoirEvenementColloqueScientifiqueVo {
    if(this._selectedCommunauteSavoirEvenementColloqueScientifique==null){
    this._selectedCommunauteSavoirEvenementColloqueScientifique=new CommunauteSavoirEvenementColloqueScientifiqueVo();
    }
           return this._selectedCommunauteSavoirEvenementColloqueScientifique;
       }

    set selectedCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this._selectedCommunauteSavoirEvenementColloqueScientifique = value;
       }

    get communauteSavoirEvenementColloqueScientifiqueSelections(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    if(this._communauteSavoirEvenementColloqueScientifiqueSelections==null){
    this._communauteSavoirEvenementColloqueScientifiqueSelections=new Array<CommunauteSavoirEvenementColloqueScientifiqueVo>();
    }
        return this._communauteSavoirEvenementColloqueScientifiqueSelections;
       }


    set communauteSavoirEvenementColloqueScientifiqueSelections(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this._communauteSavoirEvenementColloqueScientifiqueSelections = value;
       }

    get createCommunauteSavoirEvenementColloqueScientifiqueDialog(): boolean {
        return this._createCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }

    set createCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this._createCommunauteSavoirEvenementColloqueScientifiqueDialog = value;
       }

    get editCommunauteSavoirEvenementColloqueScientifiqueDialog(): boolean {
        return this._editCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }

    set editCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this._editCommunauteSavoirEvenementColloqueScientifiqueDialog = value;
       }

    get viewCommunauteSavoirEvenementColloqueScientifiqueDialog(): boolean {
        return this._viewCommunauteSavoirEvenementColloqueScientifiqueDialog;
       }

    set viewCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this._viewCommunauteSavoirEvenementColloqueScientifiqueDialog = value;
       }

     get searchCommunauteSavoirEvenementColloqueScientifique(): CommunauteSavoirEvenementColloqueScientifiqueVo {
     if(this._searchCommunauteSavoirEvenementColloqueScientifique==null){
    this._searchCommunauteSavoirEvenementColloqueScientifique=new CommunauteSavoirEvenementColloqueScientifiqueVo();
    }
        return this._searchCommunauteSavoirEvenementColloqueScientifique;
    }

    set searchCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this._searchCommunauteSavoirEvenementColloqueScientifique = value;
       }

}

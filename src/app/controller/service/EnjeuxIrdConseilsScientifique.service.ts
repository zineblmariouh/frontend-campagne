import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnjeuxIrdConseilsScientifiqueVo} from '../model/EnjeuxIrdConseilsScientifique.model';
import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class EnjeuxIrdConseilsScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enjeuxIrdConseilsScientifique/';
        })
    }
     private _enjeuxIrdConseilsScientifiques: Array<EnjeuxIrdConseilsScientifiqueVo> ;
     private _selectedEnjeuxIrdConseilsScientifique: EnjeuxIrdConseilsScientifiqueVo;
     private _enjeuxIrdConseilsScientifiqueSelections: Array<EnjeuxIrdConseilsScientifiqueVo>;
     private _createEnjeuxIrdConseilsScientifiqueDialog: boolean;
     private _editEnjeuxIrdConseilsScientifiqueDialog: boolean;
     private _viewEnjeuxIrdConseilsScientifiqueDialog: boolean;
     public editEnjeuxIrdConseilsScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnjeuxIrdConseilsScientifiqueVo>>(this.API);
    }

    public save(): Observable<EnjeuxIrdConseilsScientifiqueVo> {
         return this.http.post<EnjeuxIrdConseilsScientifiqueVo>(this.API, this.selectedEnjeuxIrdConseilsScientifique);
    }

    delete(enjeuxIrdConseilsScientifique: EnjeuxIrdConseilsScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + enjeuxIrdConseilsScientifique.id);
    }


    public edit(): Observable<EnjeuxIrdConseilsScientifiqueVo> {
        return this.http.put<EnjeuxIrdConseilsScientifiqueVo>(this.API, this.selectedEnjeuxIrdConseilsScientifique);
    }


     public findByCriteria(enjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo):Observable<Array<EnjeuxIrdConseilsScientifiqueVo>>{
           return this.http.post<Array<EnjeuxIrdConseilsScientifiqueVo>>(this.API +'search', enjeuxIrdConseilsScientifique);
    }

   public findByIdWithAssociatedList(enjeuxIrdConseilsScientifique:EnjeuxIrdConseilsScientifiqueVo):Observable<EnjeuxIrdConseilsScientifiqueVo>{
         return this.http.get<EnjeuxIrdConseilsScientifiqueVo>(this.API + 'detail/id/' +enjeuxIrdConseilsScientifique.id);
    }

    // getters and setters


    get enjeuxIrdConseilsScientifiques(): Array<EnjeuxIrdConseilsScientifiqueVo> {
    if(this._enjeuxIrdConseilsScientifiques==null){
    this._enjeuxIrdConseilsScientifiques=new Array<EnjeuxIrdConseilsScientifiqueVo>();
    }
return this._enjeuxIrdConseilsScientifiques;
       }

    set enjeuxIrdConseilsScientifiques(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this._enjeuxIrdConseilsScientifiques = value;
       }

    get selectedEnjeuxIrdConseilsScientifique(): EnjeuxIrdConseilsScientifiqueVo {
    if(this._selectedEnjeuxIrdConseilsScientifique==null){
    this._selectedEnjeuxIrdConseilsScientifique=new EnjeuxIrdConseilsScientifiqueVo();
    }
           return this._selectedEnjeuxIrdConseilsScientifique;
       }

    set selectedEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this._selectedEnjeuxIrdConseilsScientifique = value;
       }

    get enjeuxIrdConseilsScientifiqueSelections(): Array<EnjeuxIrdConseilsScientifiqueVo> {
    if(this._enjeuxIrdConseilsScientifiqueSelections==null){
    this._enjeuxIrdConseilsScientifiqueSelections=new Array<EnjeuxIrdConseilsScientifiqueVo>();
    }
        return this._enjeuxIrdConseilsScientifiqueSelections;
       }


    set enjeuxIrdConseilsScientifiqueSelections(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this._enjeuxIrdConseilsScientifiqueSelections = value;
       }

    get createEnjeuxIrdConseilsScientifiqueDialog(): boolean {
        return this._createEnjeuxIrdConseilsScientifiqueDialog;
       }

    set createEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this._createEnjeuxIrdConseilsScientifiqueDialog = value;
       }

    get editEnjeuxIrdConseilsScientifiqueDialog(): boolean {
        return this._editEnjeuxIrdConseilsScientifiqueDialog;
       }

    set editEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this._editEnjeuxIrdConseilsScientifiqueDialog = value;
       }

    get viewEnjeuxIrdConseilsScientifiqueDialog(): boolean {
        return this._viewEnjeuxIrdConseilsScientifiqueDialog;
       }

    set viewEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this._viewEnjeuxIrdConseilsScientifiqueDialog = value;
       }

     get searchEnjeuxIrdConseilsScientifique(): EnjeuxIrdConseilsScientifiqueVo {
     if(this._searchEnjeuxIrdConseilsScientifique==null){
    this._searchEnjeuxIrdConseilsScientifique=new EnjeuxIrdConseilsScientifiqueVo();
    }
        return this._searchEnjeuxIrdConseilsScientifique;
    }

    set searchEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this._searchEnjeuxIrdConseilsScientifique = value;
       }

}

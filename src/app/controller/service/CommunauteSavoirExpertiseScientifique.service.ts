import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirExpertiseScientifiqueVo} from '../model/CommunauteSavoirExpertiseScientifique.model';
import {ExpertiseScientifiqueVo} from '../model/ExpertiseScientifique.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirExpertiseScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirExpertiseScientifique/';
        })
    }
     private _communauteSavoirExpertiseScientifiques: Array<CommunauteSavoirExpertiseScientifiqueVo> ;
     private _selectedCommunauteSavoirExpertiseScientifique: CommunauteSavoirExpertiseScientifiqueVo;
     private _communauteSavoirExpertiseScientifiqueSelections: Array<CommunauteSavoirExpertiseScientifiqueVo>;
     private _createCommunauteSavoirExpertiseScientifiqueDialog: boolean;
     private _editCommunauteSavoirExpertiseScientifiqueDialog: boolean;
     private _viewCommunauteSavoirExpertiseScientifiqueDialog: boolean;
     public editCommunauteSavoirExpertiseScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirExpertiseScientifiqueVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirExpertiseScientifiqueVo> {
         return this.http.post<CommunauteSavoirExpertiseScientifiqueVo>(this.API, this.selectedCommunauteSavoirExpertiseScientifique);
    }

    delete(communauteSavoirExpertiseScientifique: CommunauteSavoirExpertiseScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirExpertiseScientifique.id);
    }


    public edit(): Observable<CommunauteSavoirExpertiseScientifiqueVo> {
        return this.http.put<CommunauteSavoirExpertiseScientifiqueVo>(this.API, this.selectedCommunauteSavoirExpertiseScientifique);
    }


     public findByCriteria(communauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo):Observable<Array<CommunauteSavoirExpertiseScientifiqueVo>>{
           return this.http.post<Array<CommunauteSavoirExpertiseScientifiqueVo>>(this.API +'search', communauteSavoirExpertiseScientifique);
    }

   public findByIdWithAssociatedList(communauteSavoirExpertiseScientifique:CommunauteSavoirExpertiseScientifiqueVo):Observable<CommunauteSavoirExpertiseScientifiqueVo>{
         return this.http.get<CommunauteSavoirExpertiseScientifiqueVo>(this.API + 'detail/id/' +communauteSavoirExpertiseScientifique.id);
    }

    // getters and setters


    get communauteSavoirExpertiseScientifiques(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
    if(this._communauteSavoirExpertiseScientifiques==null){
    this._communauteSavoirExpertiseScientifiques=new Array<CommunauteSavoirExpertiseScientifiqueVo>();
    }
return this._communauteSavoirExpertiseScientifiques;
       }

    set communauteSavoirExpertiseScientifiques(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this._communauteSavoirExpertiseScientifiques = value;
       }

    get selectedCommunauteSavoirExpertiseScientifique(): CommunauteSavoirExpertiseScientifiqueVo {
    if(this._selectedCommunauteSavoirExpertiseScientifique==null){
    this._selectedCommunauteSavoirExpertiseScientifique=new CommunauteSavoirExpertiseScientifiqueVo();
    }
           return this._selectedCommunauteSavoirExpertiseScientifique;
       }

    set selectedCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this._selectedCommunauteSavoirExpertiseScientifique = value;
       }

    get communauteSavoirExpertiseScientifiqueSelections(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
    if(this._communauteSavoirExpertiseScientifiqueSelections==null){
    this._communauteSavoirExpertiseScientifiqueSelections=new Array<CommunauteSavoirExpertiseScientifiqueVo>();
    }
        return this._communauteSavoirExpertiseScientifiqueSelections;
       }


    set communauteSavoirExpertiseScientifiqueSelections(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this._communauteSavoirExpertiseScientifiqueSelections = value;
       }

    get createCommunauteSavoirExpertiseScientifiqueDialog(): boolean {
        return this._createCommunauteSavoirExpertiseScientifiqueDialog;
       }

    set createCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this._createCommunauteSavoirExpertiseScientifiqueDialog = value;
       }

    get editCommunauteSavoirExpertiseScientifiqueDialog(): boolean {
        return this._editCommunauteSavoirExpertiseScientifiqueDialog;
       }

    set editCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this._editCommunauteSavoirExpertiseScientifiqueDialog = value;
       }

    get viewCommunauteSavoirExpertiseScientifiqueDialog(): boolean {
        return this._viewCommunauteSavoirExpertiseScientifiqueDialog;
       }

    set viewCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this._viewCommunauteSavoirExpertiseScientifiqueDialog = value;
       }

     get searchCommunauteSavoirExpertiseScientifique(): CommunauteSavoirExpertiseScientifiqueVo {
     if(this._searchCommunauteSavoirExpertiseScientifique==null){
    this._searchCommunauteSavoirExpertiseScientifique=new CommunauteSavoirExpertiseScientifiqueVo();
    }
        return this._searchCommunauteSavoirExpertiseScientifique;
    }

    set searchCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this._searchCommunauteSavoirExpertiseScientifique = value;
       }

}

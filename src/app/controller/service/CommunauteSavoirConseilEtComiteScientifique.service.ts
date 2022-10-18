import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirConseilEtComiteScientifiqueVo} from '../model/CommunauteSavoirConseilEtComiteScientifique.model';
import {ConseilEtComiteScientifiqueVo} from '../model/ConseilEtComiteScientifique.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirConseilEtComiteScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirConseilEtComiteScientifique/';
        })
    }
     private _communauteSavoirConseilEtComiteScientifiques: Array<CommunauteSavoirConseilEtComiteScientifiqueVo> ;
     private _selectedCommunauteSavoirConseilEtComiteScientifique: CommunauteSavoirConseilEtComiteScientifiqueVo;
     private _communauteSavoirConseilEtComiteScientifiqueSelections: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>;
     private _createCommunauteSavoirConseilEtComiteScientifiqueDialog: boolean;
     private _editCommunauteSavoirConseilEtComiteScientifiqueDialog: boolean;
     private _viewCommunauteSavoirConseilEtComiteScientifiqueDialog: boolean;
     public editCommunauteSavoirConseilEtComiteScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirConseilEtComiteScientifiqueVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirConseilEtComiteScientifiqueVo> {
         return this.http.post<CommunauteSavoirConseilEtComiteScientifiqueVo>(this.API, this.selectedCommunauteSavoirConseilEtComiteScientifique);
    }

    delete(communauteSavoirConseilEtComiteScientifique: CommunauteSavoirConseilEtComiteScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirConseilEtComiteScientifique.id);
    }


    public edit(): Observable<CommunauteSavoirConseilEtComiteScientifiqueVo> {
        return this.http.put<CommunauteSavoirConseilEtComiteScientifiqueVo>(this.API, this.selectedCommunauteSavoirConseilEtComiteScientifique);
    }


     public findByCriteria(communauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo):Observable<Array<CommunauteSavoirConseilEtComiteScientifiqueVo>>{
           return this.http.post<Array<CommunauteSavoirConseilEtComiteScientifiqueVo>>(this.API +'search', communauteSavoirConseilEtComiteScientifique);
    }

   public findByIdWithAssociatedList(communauteSavoirConseilEtComiteScientifique:CommunauteSavoirConseilEtComiteScientifiqueVo):Observable<CommunauteSavoirConseilEtComiteScientifiqueVo>{
         return this.http.get<CommunauteSavoirConseilEtComiteScientifiqueVo>(this.API + 'detail/id/' +communauteSavoirConseilEtComiteScientifique.id);
    }

    // getters and setters


    get communauteSavoirConseilEtComiteScientifiques(): Array<CommunauteSavoirConseilEtComiteScientifiqueVo> {
    if(this._communauteSavoirConseilEtComiteScientifiques==null){
    this._communauteSavoirConseilEtComiteScientifiques=new Array<CommunauteSavoirConseilEtComiteScientifiqueVo>();
    }
return this._communauteSavoirConseilEtComiteScientifiques;
       }

    set communauteSavoirConseilEtComiteScientifiques(value: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>) {
        this._communauteSavoirConseilEtComiteScientifiques = value;
       }

    get selectedCommunauteSavoirConseilEtComiteScientifique(): CommunauteSavoirConseilEtComiteScientifiqueVo {
    if(this._selectedCommunauteSavoirConseilEtComiteScientifique==null){
    this._selectedCommunauteSavoirConseilEtComiteScientifique=new CommunauteSavoirConseilEtComiteScientifiqueVo();
    }
           return this._selectedCommunauteSavoirConseilEtComiteScientifique;
       }

    set selectedCommunauteSavoirConseilEtComiteScientifique(value: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this._selectedCommunauteSavoirConseilEtComiteScientifique = value;
       }

    get communauteSavoirConseilEtComiteScientifiqueSelections(): Array<CommunauteSavoirConseilEtComiteScientifiqueVo> {
    if(this._communauteSavoirConseilEtComiteScientifiqueSelections==null){
    this._communauteSavoirConseilEtComiteScientifiqueSelections=new Array<CommunauteSavoirConseilEtComiteScientifiqueVo>();
    }
        return this._communauteSavoirConseilEtComiteScientifiqueSelections;
       }


    set communauteSavoirConseilEtComiteScientifiqueSelections(value: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>) {
        this._communauteSavoirConseilEtComiteScientifiqueSelections = value;
       }

    get createCommunauteSavoirConseilEtComiteScientifiqueDialog(): boolean {
        return this._createCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }

    set createCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this._createCommunauteSavoirConseilEtComiteScientifiqueDialog = value;
       }

    get editCommunauteSavoirConseilEtComiteScientifiqueDialog(): boolean {
        return this._editCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }

    set editCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this._editCommunauteSavoirConseilEtComiteScientifiqueDialog = value;
       }

    get viewCommunauteSavoirConseilEtComiteScientifiqueDialog(): boolean {
        return this._viewCommunauteSavoirConseilEtComiteScientifiqueDialog;
       }

    set viewCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this._viewCommunauteSavoirConseilEtComiteScientifiqueDialog = value;
       }

     get searchCommunauteSavoirConseilEtComiteScientifique(): CommunauteSavoirConseilEtComiteScientifiqueVo {
     if(this._searchCommunauteSavoirConseilEtComiteScientifique==null){
    this._searchCommunauteSavoirConseilEtComiteScientifique=new CommunauteSavoirConseilEtComiteScientifiqueVo();
    }
        return this._searchCommunauteSavoirConseilEtComiteScientifique;
    }

    set searchCommunauteSavoirConseilEtComiteScientifique(value: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this._searchCommunauteSavoirConseilEtComiteScientifique = value;
       }

}

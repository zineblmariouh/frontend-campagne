import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementConseilsScientifiqueVo} from '../model/EtablissementConseilsScientifique.model';
import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementConseilsScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementConseilsScientifique/';
        })
    }
     private _etablissementConseilsScientifiques: Array<EtablissementConseilsScientifiqueVo> ;
     private _selectedEtablissementConseilsScientifique: EtablissementConseilsScientifiqueVo;
     private _etablissementConseilsScientifiqueSelections: Array<EtablissementConseilsScientifiqueVo>;
     private _createEtablissementConseilsScientifiqueDialog: boolean;
     private _editEtablissementConseilsScientifiqueDialog: boolean;
     private _viewEtablissementConseilsScientifiqueDialog: boolean;
     public editEtablissementConseilsScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementConseilsScientifique:EtablissementConseilsScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtablissementConseilsScientifiqueVo>>(this.API);
    }

    public save(): Observable<EtablissementConseilsScientifiqueVo> {
         return this.http.post<EtablissementConseilsScientifiqueVo>(this.API, this.selectedEtablissementConseilsScientifique);
    }

    delete(etablissementConseilsScientifique: EtablissementConseilsScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementConseilsScientifique.id);
    }


    public edit(): Observable<EtablissementConseilsScientifiqueVo> {
        return this.http.put<EtablissementConseilsScientifiqueVo>(this.API, this.selectedEtablissementConseilsScientifique);
    }


     public findByCriteria(etablissementConseilsScientifique:EtablissementConseilsScientifiqueVo):Observable<Array<EtablissementConseilsScientifiqueVo>>{
           return this.http.post<Array<EtablissementConseilsScientifiqueVo>>(this.API +'search', etablissementConseilsScientifique);
    }

   public findByIdWithAssociatedList(etablissementConseilsScientifique:EtablissementConseilsScientifiqueVo):Observable<EtablissementConseilsScientifiqueVo>{
         return this.http.get<EtablissementConseilsScientifiqueVo>(this.API + 'detail/id/' +etablissementConseilsScientifique.id);
    }

    // getters and setters


    get etablissementConseilsScientifiques(): Array<EtablissementConseilsScientifiqueVo> {
    if(this._etablissementConseilsScientifiques==null){
    this._etablissementConseilsScientifiques=new Array<EtablissementConseilsScientifiqueVo>();
    }
return this._etablissementConseilsScientifiques;
       }

    set etablissementConseilsScientifiques(value: Array<EtablissementConseilsScientifiqueVo>) {
        this._etablissementConseilsScientifiques = value;
       }

    get selectedEtablissementConseilsScientifique(): EtablissementConseilsScientifiqueVo {
    if(this._selectedEtablissementConseilsScientifique==null){
    this._selectedEtablissementConseilsScientifique=new EtablissementConseilsScientifiqueVo();
    }
           return this._selectedEtablissementConseilsScientifique;
       }

    set selectedEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this._selectedEtablissementConseilsScientifique = value;
       }

    get etablissementConseilsScientifiqueSelections(): Array<EtablissementConseilsScientifiqueVo> {
    if(this._etablissementConseilsScientifiqueSelections==null){
    this._etablissementConseilsScientifiqueSelections=new Array<EtablissementConseilsScientifiqueVo>();
    }
        return this._etablissementConseilsScientifiqueSelections;
       }


    set etablissementConseilsScientifiqueSelections(value: Array<EtablissementConseilsScientifiqueVo>) {
        this._etablissementConseilsScientifiqueSelections = value;
       }

    get createEtablissementConseilsScientifiqueDialog(): boolean {
        return this._createEtablissementConseilsScientifiqueDialog;
       }

    set createEtablissementConseilsScientifiqueDialog(value: boolean) {
        this._createEtablissementConseilsScientifiqueDialog = value;
       }

    get editEtablissementConseilsScientifiqueDialog(): boolean {
        return this._editEtablissementConseilsScientifiqueDialog;
       }

    set editEtablissementConseilsScientifiqueDialog(value: boolean) {
        this._editEtablissementConseilsScientifiqueDialog = value;
       }

    get viewEtablissementConseilsScientifiqueDialog(): boolean {
        return this._viewEtablissementConseilsScientifiqueDialog;
       }

    set viewEtablissementConseilsScientifiqueDialog(value: boolean) {
        this._viewEtablissementConseilsScientifiqueDialog = value;
       }

     get searchEtablissementConseilsScientifique(): EtablissementConseilsScientifiqueVo {
     if(this._searchEtablissementConseilsScientifique==null){
    this._searchEtablissementConseilsScientifique=new EtablissementConseilsScientifiqueVo();
    }
        return this._searchEtablissementConseilsScientifique;
    }

    set searchEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this._searchEtablissementConseilsScientifique = value;
       }

}

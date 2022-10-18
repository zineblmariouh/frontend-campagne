import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo;
     private _developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
    }

    delete(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique:DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo):Observable<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques==null){
    this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques=new Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
       }

    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique=new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections==null){
    this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections;
       }


    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique=new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

}

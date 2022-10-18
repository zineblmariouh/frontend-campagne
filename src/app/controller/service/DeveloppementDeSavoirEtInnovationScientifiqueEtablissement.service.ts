import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/developpementDeSavoirEtInnovationScientifiqueEtablissement/';
        })
    }
     private _developpementDeSavoirEtInnovationScientifiqueEtablissements: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> ;
     private _selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo;
     private _developpementDeSavoirEtInnovationScientifiqueEtablissementSelections: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>;
     private _createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog: boolean;
     private _editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog: boolean;
     private _viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog: boolean;
     public editDeveloppementDeSavoirEtInnovationScientifiqueEtablissement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>>(this.API);
    }

    public save(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
         return this.http.post<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement);
    }

    delete(developpementDeSavoirEtInnovationScientifiqueEtablissement: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
         return this.http.delete<number>(this.API + 'id/' + developpementDeSavoirEtInnovationScientifiqueEtablissement.id);
    }


    public edit(): Observable<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
        return this.http.put<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>(this.API, this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement);
    }


     public findByCriteria(developpementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo):Observable<Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>>{
           return this.http.post<Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>>(this.API +'search', developpementDeSavoirEtInnovationScientifiqueEtablissement);
    }

   public findByIdWithAssociatedList(developpementDeSavoirEtInnovationScientifiqueEtablissement:DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo):Observable<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>{
         return this.http.get<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>(this.API + 'detail/id/' +developpementDeSavoirEtInnovationScientifiqueEtablissement.id);
    }

    // getters and setters


    get developpementDeSavoirEtInnovationScientifiqueEtablissements(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueEtablissements==null){
    this._developpementDeSavoirEtInnovationScientifiqueEtablissements=new Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>();
    }
return this._developpementDeSavoirEtInnovationScientifiqueEtablissements;
       }

    set developpementDeSavoirEtInnovationScientifiqueEtablissements(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEtablissements = value;
       }

    get selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(): DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
    if(this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement==null){
    this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement=new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
    }
           return this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }

    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this._selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

    get developpementDeSavoirEtInnovationScientifiqueEtablissementSelections(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    if(this._developpementDeSavoirEtInnovationScientifiqueEtablissementSelections==null){
    this._developpementDeSavoirEtInnovationScientifiqueEtablissementSelections=new Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>();
    }
        return this._developpementDeSavoirEtInnovationScientifiqueEtablissementSelections;
       }


    set developpementDeSavoirEtInnovationScientifiqueEtablissementSelections(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEtablissementSelections = value;
       }

    get createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(): boolean {
        return this._createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }

    set createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this._createDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = value;
       }

    get editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(): boolean {
        return this._editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }

    set editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this._editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = value;
       }

    get viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(): boolean {
        return this._viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;
       }

    set viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this._viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = value;
       }

     get searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(): DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
     if(this._searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement==null){
    this._searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement=new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
    }
        return this._searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
    }

    set searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this._searchDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

}

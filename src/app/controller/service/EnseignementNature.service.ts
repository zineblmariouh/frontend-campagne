import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementNatureVo} from '../model/EnseignementNature.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {NatureEnseignementVo} from '../model/NatureEnseignement.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementNatureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignementNature/';
        })
    }
     private _enseignementNatures: Array<EnseignementNatureVo> ;
     private _selectedEnseignementNature: EnseignementNatureVo;
     private _enseignementNatureSelections: Array<EnseignementNatureVo>;
     private _createEnseignementNatureDialog: boolean;
     private _editEnseignementNatureDialog: boolean;
     private _viewEnseignementNatureDialog: boolean;
     public editEnseignementNature$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignementNature:EnseignementNatureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnseignementNatureVo>>(this.API);
    }

    public save(): Observable<EnseignementNatureVo> {
         return this.http.post<EnseignementNatureVo>(this.API, this.selectedEnseignementNature);
    }

    delete(enseignementNature: EnseignementNatureVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignementNature.id);
    }


    public edit(): Observable<EnseignementNatureVo> {
        return this.http.put<EnseignementNatureVo>(this.API, this.selectedEnseignementNature);
    }


     public findByCriteria(enseignementNature:EnseignementNatureVo):Observable<Array<EnseignementNatureVo>>{
           return this.http.post<Array<EnseignementNatureVo>>(this.API +'search', enseignementNature);
    }

   public findByIdWithAssociatedList(enseignementNature:EnseignementNatureVo):Observable<EnseignementNatureVo>{
         return this.http.get<EnseignementNatureVo>(this.API + 'detail/id/' +enseignementNature.id);
    }

    // getters and setters


    get enseignementNatures(): Array<EnseignementNatureVo> {
    if(this._enseignementNatures==null){
    this._enseignementNatures=new Array<EnseignementNatureVo>();
    }
return this._enseignementNatures;
       }

    set enseignementNatures(value: Array<EnseignementNatureVo>) {
        this._enseignementNatures = value;
       }

    get selectedEnseignementNature(): EnseignementNatureVo {
    if(this._selectedEnseignementNature==null){
    this._selectedEnseignementNature=new EnseignementNatureVo();
    }
           return this._selectedEnseignementNature;
       }

    set selectedEnseignementNature(value: EnseignementNatureVo) {
        this._selectedEnseignementNature = value;
       }

    get enseignementNatureSelections(): Array<EnseignementNatureVo> {
    if(this._enseignementNatureSelections==null){
    this._enseignementNatureSelections=new Array<EnseignementNatureVo>();
    }
        return this._enseignementNatureSelections;
       }


    set enseignementNatureSelections(value: Array<EnseignementNatureVo>) {
        this._enseignementNatureSelections = value;
       }

    get createEnseignementNatureDialog(): boolean {
        return this._createEnseignementNatureDialog;
       }

    set createEnseignementNatureDialog(value: boolean) {
        this._createEnseignementNatureDialog = value;
       }

    get editEnseignementNatureDialog(): boolean {
        return this._editEnseignementNatureDialog;
       }

    set editEnseignementNatureDialog(value: boolean) {
        this._editEnseignementNatureDialog = value;
       }

    get viewEnseignementNatureDialog(): boolean {
        return this._viewEnseignementNatureDialog;
       }

    set viewEnseignementNatureDialog(value: boolean) {
        this._viewEnseignementNatureDialog = value;
       }

     get searchEnseignementNature(): EnseignementNatureVo {
     if(this._searchEnseignementNature==null){
    this._searchEnseignementNature=new EnseignementNatureVo();
    }
        return this._searchEnseignementNature;
    }

    set searchEnseignementNature(value: EnseignementNatureVo) {
        this._searchEnseignementNature = value;
       }

}

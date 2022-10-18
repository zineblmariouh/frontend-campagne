import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NiveauEtudeEnseignementVo} from '../model/NiveauEtudeEnseignement.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {NiveauEtudeVo} from '../model/NiveauEtude.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauEtudeEnseignementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/niveauEtudeEnseignement/';
        })
    }
     private _niveauEtudeEnseignements: Array<NiveauEtudeEnseignementVo> ;
     private _selectedNiveauEtudeEnseignement: NiveauEtudeEnseignementVo;
     private _niveauEtudeEnseignementSelections: Array<NiveauEtudeEnseignementVo>;
     private _createNiveauEtudeEnseignementDialog: boolean;
     private _editNiveauEtudeEnseignementDialog: boolean;
     private _viewNiveauEtudeEnseignementDialog: boolean;
     public editNiveauEtudeEnseignement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNiveauEtudeEnseignement:NiveauEtudeEnseignementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<NiveauEtudeEnseignementVo>>(this.API);
    }

    public save(): Observable<NiveauEtudeEnseignementVo> {
         return this.http.post<NiveauEtudeEnseignementVo>(this.API, this.selectedNiveauEtudeEnseignement);
    }

    delete(niveauEtudeEnseignement: NiveauEtudeEnseignementVo) {
         return this.http.delete<number>(this.API + 'id/' + niveauEtudeEnseignement.id);
    }


    public edit(): Observable<NiveauEtudeEnseignementVo> {
        return this.http.put<NiveauEtudeEnseignementVo>(this.API, this.selectedNiveauEtudeEnseignement);
    }


     public findByCriteria(niveauEtudeEnseignement:NiveauEtudeEnseignementVo):Observable<Array<NiveauEtudeEnseignementVo>>{
           return this.http.post<Array<NiveauEtudeEnseignementVo>>(this.API +'search', niveauEtudeEnseignement);
    }

   public findByIdWithAssociatedList(niveauEtudeEnseignement:NiveauEtudeEnseignementVo):Observable<NiveauEtudeEnseignementVo>{
         return this.http.get<NiveauEtudeEnseignementVo>(this.API + 'detail/id/' +niveauEtudeEnseignement.id);
    }

    // getters and setters


    get niveauEtudeEnseignements(): Array<NiveauEtudeEnseignementVo> {
    if(this._niveauEtudeEnseignements==null){
    this._niveauEtudeEnseignements=new Array<NiveauEtudeEnseignementVo>();
    }
return this._niveauEtudeEnseignements;
       }

    set niveauEtudeEnseignements(value: Array<NiveauEtudeEnseignementVo>) {
        this._niveauEtudeEnseignements = value;
       }

    get selectedNiveauEtudeEnseignement(): NiveauEtudeEnseignementVo {
    if(this._selectedNiveauEtudeEnseignement==null){
    this._selectedNiveauEtudeEnseignement=new NiveauEtudeEnseignementVo();
    }
           return this._selectedNiveauEtudeEnseignement;
       }

    set selectedNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this._selectedNiveauEtudeEnseignement = value;
       }

    get niveauEtudeEnseignementSelections(): Array<NiveauEtudeEnseignementVo> {
    if(this._niveauEtudeEnseignementSelections==null){
    this._niveauEtudeEnseignementSelections=new Array<NiveauEtudeEnseignementVo>();
    }
        return this._niveauEtudeEnseignementSelections;
       }


    set niveauEtudeEnseignementSelections(value: Array<NiveauEtudeEnseignementVo>) {
        this._niveauEtudeEnseignementSelections = value;
       }

    get createNiveauEtudeEnseignementDialog(): boolean {
        return this._createNiveauEtudeEnseignementDialog;
       }

    set createNiveauEtudeEnseignementDialog(value: boolean) {
        this._createNiveauEtudeEnseignementDialog = value;
       }

    get editNiveauEtudeEnseignementDialog(): boolean {
        return this._editNiveauEtudeEnseignementDialog;
       }

    set editNiveauEtudeEnseignementDialog(value: boolean) {
        this._editNiveauEtudeEnseignementDialog = value;
       }

    get viewNiveauEtudeEnseignementDialog(): boolean {
        return this._viewNiveauEtudeEnseignementDialog;
       }

    set viewNiveauEtudeEnseignementDialog(value: boolean) {
        this._viewNiveauEtudeEnseignementDialog = value;
       }

     get searchNiveauEtudeEnseignement(): NiveauEtudeEnseignementVo {
     if(this._searchNiveauEtudeEnseignement==null){
    this._searchNiveauEtudeEnseignement=new NiveauEtudeEnseignementVo();
    }
        return this._searchNiveauEtudeEnseignement;
    }

    set searchNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this._searchNiveauEtudeEnseignement = value;
       }

}

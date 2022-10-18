import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NiveauFormationVo} from '../model/NiveauFormation.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauFormationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/niveauFormation/';
        })
    }
     private _niveauFormations: Array<NiveauFormationVo> ;
     private _selectedNiveauFormation: NiveauFormationVo;
     private _niveauFormationSelections: Array<NiveauFormationVo>;
     private _createNiveauFormationDialog: boolean;
     private _editNiveauFormationDialog: boolean;
     private _viewNiveauFormationDialog: boolean;
     public editNiveauFormation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNiveauFormation:NiveauFormationVo ;

    // methods
    public archiver(niveauFormation: NiveauFormationVo): Observable<NiveauFormationVo> {
        return this.http.put<NiveauFormationVo>(this.API + 'archiver/' ,niveauFormation);
    }
    public desarchiver(niveauFormation: NiveauFormationVo): Observable<NiveauFormationVo> {
    return this.http.put<NiveauFormationVo>(this.API + 'desarchiver/' ,niveauFormation);
    }

    public findAll(){
     return this.http.get<Array<NiveauFormationVo>>(this.API);
    }

    public save(): Observable<NiveauFormationVo> {
           return this.http.post<NiveauFormationVo>(this.API, {...this.selectedNiveauFormation,dateCreation: moment(this.selectedNiveauFormation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(niveauFormation: NiveauFormationVo) {
         return this.http.delete<number>(this.API + 'id/' + niveauFormation.id);
    }


    public edit(): Observable<NiveauFormationVo> {
        return this.http.put<NiveauFormationVo>(this.API, this.selectedNiveauFormation);
    }


     public findByCriteria(niveauFormation:NiveauFormationVo):Observable<Array<NiveauFormationVo>>{
           return this.http.post<Array<NiveauFormationVo>>(this.API +'search', niveauFormation);
    }

   public findByIdWithAssociatedList(niveauFormation:NiveauFormationVo):Observable<NiveauFormationVo>{
         return this.http.get<NiveauFormationVo>(this.API + 'detail/id/' +niveauFormation.id);
    }

    // getters and setters


    get niveauFormations(): Array<NiveauFormationVo> {
    if(this._niveauFormations==null){
    this._niveauFormations=new Array<NiveauFormationVo>();
    }
return this._niveauFormations;
       }

    set niveauFormations(value: Array<NiveauFormationVo>) {
        this._niveauFormations = value;
       }

    get selectedNiveauFormation(): NiveauFormationVo {
    if(this._selectedNiveauFormation==null){
    this._selectedNiveauFormation=new NiveauFormationVo();
    }
           return this._selectedNiveauFormation;
       }

    set selectedNiveauFormation(value: NiveauFormationVo) {
        this._selectedNiveauFormation = value;
       }

    get niveauFormationSelections(): Array<NiveauFormationVo> {
    if(this._niveauFormationSelections==null){
    this._niveauFormationSelections=new Array<NiveauFormationVo>();
    }
        return this._niveauFormationSelections;
       }


    set niveauFormationSelections(value: Array<NiveauFormationVo>) {
        this._niveauFormationSelections = value;
       }

    get createNiveauFormationDialog(): boolean {
        return this._createNiveauFormationDialog;
       }

    set createNiveauFormationDialog(value: boolean) {
        this._createNiveauFormationDialog = value;
       }

    get editNiveauFormationDialog(): boolean {
        return this._editNiveauFormationDialog;
       }

    set editNiveauFormationDialog(value: boolean) {
        this._editNiveauFormationDialog = value;
       }

    get viewNiveauFormationDialog(): boolean {
        return this._viewNiveauFormationDialog;
       }

    set viewNiveauFormationDialog(value: boolean) {
        this._viewNiveauFormationDialog = value;
       }

     get searchNiveauFormation(): NiveauFormationVo {
     if(this._searchNiveauFormation==null){
    this._searchNiveauFormation=new NiveauFormationVo();
    }
        return this._searchNiveauFormation;
    }

    set searchNiveauFormation(value: NiveauFormationVo) {
        this._searchNiveauFormation = value;
       }

}

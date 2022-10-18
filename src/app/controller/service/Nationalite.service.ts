import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NationaliteVo} from '../model/Nationalite.model';


@Injectable({
  providedIn: 'root'
})
export class NationaliteService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/nationalite/';
        })
    }
     private _nationalites: Array<NationaliteVo> ;
     private _selectedNationalite: NationaliteVo;
     private _nationaliteSelections: Array<NationaliteVo>;
     private _createNationaliteDialog: boolean;
     private _editNationaliteDialog: boolean;
     private _viewNationaliteDialog: boolean;
     public editNationalite$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNationalite:NationaliteVo ;

    // methods
    public archiver(nationalite: NationaliteVo): Observable<NationaliteVo> {
        return this.http.put<NationaliteVo>(this.API + 'archiver/' ,nationalite);
    }
    public desarchiver(nationalite: NationaliteVo): Observable<NationaliteVo> {
    return this.http.put<NationaliteVo>(this.API + 'desarchiver/' ,nationalite);
    }

    public findAll(){
     return this.http.get<Array<NationaliteVo>>(this.API);
    }

    public save(): Observable<NationaliteVo> {
           return this.http.post<NationaliteVo>(this.API, {...this.selectedNationalite,dateCreation: moment(this.selectedNationalite.dateCreation).format("YYYY-MM-DD")});
    }

    delete(nationalite: NationaliteVo) {
         return this.http.delete<number>(this.API + 'id/' + nationalite.id);
    }


    public edit(): Observable<NationaliteVo> {
        return this.http.put<NationaliteVo>(this.API, this.selectedNationalite);
    }


     public findByCriteria(nationalite:NationaliteVo):Observable<Array<NationaliteVo>>{
           return this.http.post<Array<NationaliteVo>>(this.API +'search', nationalite);
    }

   public findByIdWithAssociatedList(nationalite:NationaliteVo):Observable<NationaliteVo>{
         return this.http.get<NationaliteVo>(this.API + 'detail/id/' +nationalite.id);
    }

    // getters and setters


    get nationalites(): Array<NationaliteVo> {
    if(this._nationalites==null){
    this._nationalites=new Array<NationaliteVo>();
    }
return this._nationalites;
       }

    set nationalites(value: Array<NationaliteVo>) {
        this._nationalites = value;
       }

    get selectedNationalite(): NationaliteVo {
    if(this._selectedNationalite==null){
    this._selectedNationalite=new NationaliteVo();
    }
           return this._selectedNationalite;
       }

    set selectedNationalite(value: NationaliteVo) {
        this._selectedNationalite = value;
       }

    get nationaliteSelections(): Array<NationaliteVo> {
    if(this._nationaliteSelections==null){
    this._nationaliteSelections=new Array<NationaliteVo>();
    }
        return this._nationaliteSelections;
       }


    set nationaliteSelections(value: Array<NationaliteVo>) {
        this._nationaliteSelections = value;
       }

    get createNationaliteDialog(): boolean {
        return this._createNationaliteDialog;
       }

    set createNationaliteDialog(value: boolean) {
        this._createNationaliteDialog = value;
       }

    get editNationaliteDialog(): boolean {
        return this._editNationaliteDialog;
       }

    set editNationaliteDialog(value: boolean) {
        this._editNationaliteDialog = value;
       }

    get viewNationaliteDialog(): boolean {
        return this._viewNationaliteDialog;
       }

    set viewNationaliteDialog(value: boolean) {
        this._viewNationaliteDialog = value;
       }

     get searchNationalite(): NationaliteVo {
     if(this._searchNationalite==null){
    this._searchNationalite=new NationaliteVo();
    }
        return this._searchNationalite;
    }

    set searchNationalite(value: NationaliteVo) {
        this._searchNationalite = value;
       }

}

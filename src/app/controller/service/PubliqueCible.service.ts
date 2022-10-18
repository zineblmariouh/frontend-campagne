import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PubliqueCibleVo} from '../model/PubliqueCible.model';


@Injectable({
  providedIn: 'root'
})
export class PubliqueCibleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/publiqueCible/';
        })
    }
     private _publiqueCibles: Array<PubliqueCibleVo> ;
     private _selectedPubliqueCible: PubliqueCibleVo;
     private _publiqueCibleSelections: Array<PubliqueCibleVo>;
     private _createPubliqueCibleDialog: boolean;
     private _editPubliqueCibleDialog: boolean;
     private _viewPubliqueCibleDialog: boolean;
     public editPubliqueCible$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPubliqueCible:PubliqueCibleVo ;

    // methods
    public archiver(publiqueCible: PubliqueCibleVo): Observable<PubliqueCibleVo> {
        return this.http.put<PubliqueCibleVo>(this.API + 'archiver/' ,publiqueCible);
    }
    public desarchiver(publiqueCible: PubliqueCibleVo): Observable<PubliqueCibleVo> {
    return this.http.put<PubliqueCibleVo>(this.API + 'desarchiver/' ,publiqueCible);
    }

    public findAll(){
     return this.http.get<Array<PubliqueCibleVo>>(this.API);
    }

    public save(): Observable<PubliqueCibleVo> {
           return this.http.post<PubliqueCibleVo>(this.API, {...this.selectedPubliqueCible,dateCreation: moment(this.selectedPubliqueCible.dateCreation).format("YYYY-MM-DD")});
    }

    delete(publiqueCible: PubliqueCibleVo) {
         return this.http.delete<number>(this.API + 'id/' + publiqueCible.id);
    }


    public edit(): Observable<PubliqueCibleVo> {
        return this.http.put<PubliqueCibleVo>(this.API, this.selectedPubliqueCible);
    }


     public findByCriteria(publiqueCible:PubliqueCibleVo):Observable<Array<PubliqueCibleVo>>{
           return this.http.post<Array<PubliqueCibleVo>>(this.API +'search', publiqueCible);
    }

   public findByIdWithAssociatedList(publiqueCible:PubliqueCibleVo):Observable<PubliqueCibleVo>{
         return this.http.get<PubliqueCibleVo>(this.API + 'detail/id/' +publiqueCible.id);
    }

    // getters and setters


    get publiqueCibles(): Array<PubliqueCibleVo> {
    if(this._publiqueCibles==null){
    this._publiqueCibles=new Array<PubliqueCibleVo>();
    }
return this._publiqueCibles;
       }

    set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this._publiqueCibles = value;
       }

    get selectedPubliqueCible(): PubliqueCibleVo {
    if(this._selectedPubliqueCible==null){
    this._selectedPubliqueCible=new PubliqueCibleVo();
    }
           return this._selectedPubliqueCible;
       }

    set selectedPubliqueCible(value: PubliqueCibleVo) {
        this._selectedPubliqueCible = value;
       }

    get publiqueCibleSelections(): Array<PubliqueCibleVo> {
    if(this._publiqueCibleSelections==null){
    this._publiqueCibleSelections=new Array<PubliqueCibleVo>();
    }
        return this._publiqueCibleSelections;
       }


    set publiqueCibleSelections(value: Array<PubliqueCibleVo>) {
        this._publiqueCibleSelections = value;
       }

    get createPubliqueCibleDialog(): boolean {
        return this._createPubliqueCibleDialog;
       }

    set createPubliqueCibleDialog(value: boolean) {
        this._createPubliqueCibleDialog = value;
       }

    get editPubliqueCibleDialog(): boolean {
        return this._editPubliqueCibleDialog;
       }

    set editPubliqueCibleDialog(value: boolean) {
        this._editPubliqueCibleDialog = value;
       }

    get viewPubliqueCibleDialog(): boolean {
        return this._viewPubliqueCibleDialog;
       }

    set viewPubliqueCibleDialog(value: boolean) {
        this._viewPubliqueCibleDialog = value;
       }

     get searchPubliqueCible(): PubliqueCibleVo {
     if(this._searchPubliqueCible==null){
    this._searchPubliqueCible=new PubliqueCibleVo();
    }
        return this._searchPubliqueCible;
    }

    set searchPubliqueCible(value: PubliqueCibleVo) {
        this._searchPubliqueCible = value;
       }

}

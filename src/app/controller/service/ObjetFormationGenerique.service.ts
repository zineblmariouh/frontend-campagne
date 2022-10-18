import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ObjetFormationGeneriqueVo} from '../model/ObjetFormationGenerique.model';


@Injectable({
  providedIn: 'root'
})
export class ObjetFormationGeneriqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/objetFormationGenerique/';
        })
    }
     private _objetFormationGeneriques: Array<ObjetFormationGeneriqueVo> ;
     private _selectedObjetFormationGenerique: ObjetFormationGeneriqueVo;
     private _objetFormationGeneriqueSelections: Array<ObjetFormationGeneriqueVo>;
     private _createObjetFormationGeneriqueDialog: boolean;
     private _editObjetFormationGeneriqueDialog: boolean;
     private _viewObjetFormationGeneriqueDialog: boolean;
     public editObjetFormationGenerique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchObjetFormationGenerique:ObjetFormationGeneriqueVo ;

    // methods
    public archiver(objetFormationGenerique: ObjetFormationGeneriqueVo): Observable<ObjetFormationGeneriqueVo> {
        return this.http.put<ObjetFormationGeneriqueVo>(this.API + 'archiver/' ,objetFormationGenerique);
    }
    public desarchiver(objetFormationGenerique: ObjetFormationGeneriqueVo): Observable<ObjetFormationGeneriqueVo> {
    return this.http.put<ObjetFormationGeneriqueVo>(this.API + 'desarchiver/' ,objetFormationGenerique);
    }

    public findAll(){
     return this.http.get<Array<ObjetFormationGeneriqueVo>>(this.API);
    }

    public save(): Observable<ObjetFormationGeneriqueVo> {
           return this.http.post<ObjetFormationGeneriqueVo>(this.API, {...this.selectedObjetFormationGenerique,dateCreation: moment(this.selectedObjetFormationGenerique.dateCreation).format("YYYY-MM-DD")});
    }

    delete(objetFormationGenerique: ObjetFormationGeneriqueVo) {
         return this.http.delete<number>(this.API + 'id/' + objetFormationGenerique.id);
    }


    public edit(): Observable<ObjetFormationGeneriqueVo> {
        return this.http.put<ObjetFormationGeneriqueVo>(this.API, this.selectedObjetFormationGenerique);
    }


     public findByCriteria(objetFormationGenerique:ObjetFormationGeneriqueVo):Observable<Array<ObjetFormationGeneriqueVo>>{
           return this.http.post<Array<ObjetFormationGeneriqueVo>>(this.API +'search', objetFormationGenerique);
    }

   public findByIdWithAssociatedList(objetFormationGenerique:ObjetFormationGeneriqueVo):Observable<ObjetFormationGeneriqueVo>{
         return this.http.get<ObjetFormationGeneriqueVo>(this.API + 'detail/id/' +objetFormationGenerique.id);
    }

    // getters and setters


    get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
    if(this._objetFormationGeneriques==null){
    this._objetFormationGeneriques=new Array<ObjetFormationGeneriqueVo>();
    }
return this._objetFormationGeneriques;
       }

    set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this._objetFormationGeneriques = value;
       }

    get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
    if(this._selectedObjetFormationGenerique==null){
    this._selectedObjetFormationGenerique=new ObjetFormationGeneriqueVo();
    }
           return this._selectedObjetFormationGenerique;
       }

    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this._selectedObjetFormationGenerique = value;
       }

    get objetFormationGeneriqueSelections(): Array<ObjetFormationGeneriqueVo> {
    if(this._objetFormationGeneriqueSelections==null){
    this._objetFormationGeneriqueSelections=new Array<ObjetFormationGeneriqueVo>();
    }
        return this._objetFormationGeneriqueSelections;
       }


    set objetFormationGeneriqueSelections(value: Array<ObjetFormationGeneriqueVo>) {
        this._objetFormationGeneriqueSelections = value;
       }

    get createObjetFormationGeneriqueDialog(): boolean {
        return this._createObjetFormationGeneriqueDialog;
       }

    set createObjetFormationGeneriqueDialog(value: boolean) {
        this._createObjetFormationGeneriqueDialog = value;
       }

    get editObjetFormationGeneriqueDialog(): boolean {
        return this._editObjetFormationGeneriqueDialog;
       }

    set editObjetFormationGeneriqueDialog(value: boolean) {
        this._editObjetFormationGeneriqueDialog = value;
       }

    get viewObjetFormationGeneriqueDialog(): boolean {
        return this._viewObjetFormationGeneriqueDialog;
       }

    set viewObjetFormationGeneriqueDialog(value: boolean) {
        this._viewObjetFormationGeneriqueDialog = value;
       }

     get searchObjetFormationGenerique(): ObjetFormationGeneriqueVo {
     if(this._searchObjetFormationGenerique==null){
    this._searchObjetFormationGenerique=new ObjetFormationGeneriqueVo();
    }
        return this._searchObjetFormationGenerique;
    }

    set searchObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this._searchObjetFormationGenerique = value;
       }

}

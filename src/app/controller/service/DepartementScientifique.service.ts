import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DepartementScientifiqueVo} from '../model/DepartementScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DepartementScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/departementScientifique/';
        })
    }
     private _departementScientifiques: Array<DepartementScientifiqueVo> ;
     private _selectedDepartementScientifique: DepartementScientifiqueVo;
     private _departementScientifiqueSelections: Array<DepartementScientifiqueVo>;
     private _createDepartementScientifiqueDialog: boolean;
     private _editDepartementScientifiqueDialog: boolean;
     private _viewDepartementScientifiqueDialog: boolean;
     public editDepartementScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDepartementScientifique:DepartementScientifiqueVo ;

    // methods
    public archiver(departementScientifique: DepartementScientifiqueVo): Observable<DepartementScientifiqueVo> {
        return this.http.put<DepartementScientifiqueVo>(this.API + 'archiver/' ,departementScientifique);
    }
    public desarchiver(departementScientifique: DepartementScientifiqueVo): Observable<DepartementScientifiqueVo> {
    return this.http.put<DepartementScientifiqueVo>(this.API + 'desarchiver/' ,departementScientifique);
    }

    public findAll(){
     return this.http.get<Array<DepartementScientifiqueVo>>(this.API);
    }

    public save(): Observable<DepartementScientifiqueVo> {
           return this.http.post<DepartementScientifiqueVo>(this.API, {...this.selectedDepartementScientifique,dateCreation: moment(this.selectedDepartementScientifique.dateCreation).format("YYYY-MM-DD")});
    }

    delete(departementScientifique: DepartementScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + departementScientifique.id);
    }


    public edit(): Observable<DepartementScientifiqueVo> {
        return this.http.put<DepartementScientifiqueVo>(this.API, this.selectedDepartementScientifique);
    }


     public findByCriteria(departementScientifique:DepartementScientifiqueVo):Observable<Array<DepartementScientifiqueVo>>{
           return this.http.post<Array<DepartementScientifiqueVo>>(this.API +'search', departementScientifique);
    }

   public findByIdWithAssociatedList(departementScientifique:DepartementScientifiqueVo):Observable<DepartementScientifiqueVo>{
         return this.http.get<DepartementScientifiqueVo>(this.API + 'detail/id/' +departementScientifique.id);
    }

    // getters and setters


    get departementScientifiques(): Array<DepartementScientifiqueVo> {
    if(this._departementScientifiques==null){
    this._departementScientifiques=new Array<DepartementScientifiqueVo>();
    }
return this._departementScientifiques;
       }

    set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this._departementScientifiques = value;
       }

    get selectedDepartementScientifique(): DepartementScientifiqueVo {
    if(this._selectedDepartementScientifique==null){
    this._selectedDepartementScientifique=new DepartementScientifiqueVo();
    }
           return this._selectedDepartementScientifique;
       }

    set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this._selectedDepartementScientifique = value;
       }

    get departementScientifiqueSelections(): Array<DepartementScientifiqueVo> {
    if(this._departementScientifiqueSelections==null){
    this._departementScientifiqueSelections=new Array<DepartementScientifiqueVo>();
    }
        return this._departementScientifiqueSelections;
       }


    set departementScientifiqueSelections(value: Array<DepartementScientifiqueVo>) {
        this._departementScientifiqueSelections = value;
       }

    get createDepartementScientifiqueDialog(): boolean {
        return this._createDepartementScientifiqueDialog;
       }

    set createDepartementScientifiqueDialog(value: boolean) {
        this._createDepartementScientifiqueDialog = value;
       }

    get editDepartementScientifiqueDialog(): boolean {
        return this._editDepartementScientifiqueDialog;
       }

    set editDepartementScientifiqueDialog(value: boolean) {
        this._editDepartementScientifiqueDialog = value;
       }

    get viewDepartementScientifiqueDialog(): boolean {
        return this._viewDepartementScientifiqueDialog;
       }

    set viewDepartementScientifiqueDialog(value: boolean) {
        this._viewDepartementScientifiqueDialog = value;
       }

     get searchDepartementScientifique(): DepartementScientifiqueVo {
     if(this._searchDepartementScientifique==null){
    this._searchDepartementScientifique=new DepartementScientifiqueVo();
    }
        return this._searchDepartementScientifique;
    }

    set searchDepartementScientifique(value: DepartementScientifiqueVo) {
        this._searchDepartementScientifique = value;
       }

}

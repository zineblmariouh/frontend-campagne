import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NatureActiviteGrandPubliqueVo} from '../model/NatureActiviteGrandPublique.model';


@Injectable({
  providedIn: 'root'
})
export class NatureActiviteGrandPubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/natureActiviteGrandPublique/';
        })
    }
     private _natureActiviteGrandPubliques: Array<NatureActiviteGrandPubliqueVo> ;
     private _selectedNatureActiviteGrandPublique: NatureActiviteGrandPubliqueVo;
     private _natureActiviteGrandPubliqueSelections: Array<NatureActiviteGrandPubliqueVo>;
     private _createNatureActiviteGrandPubliqueDialog: boolean;
     private _editNatureActiviteGrandPubliqueDialog: boolean;
     private _viewNatureActiviteGrandPubliqueDialog: boolean;
     public editNatureActiviteGrandPublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNatureActiviteGrandPublique:NatureActiviteGrandPubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<NatureActiviteGrandPubliqueVo>>(this.API);
    }

    public save(): Observable<NatureActiviteGrandPubliqueVo> {
         return this.http.post<NatureActiviteGrandPubliqueVo>(this.API, this.selectedNatureActiviteGrandPublique);
    }

    delete(natureActiviteGrandPublique: NatureActiviteGrandPubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + natureActiviteGrandPublique.id);
    }


    public edit(): Observable<NatureActiviteGrandPubliqueVo> {
        return this.http.put<NatureActiviteGrandPubliqueVo>(this.API, this.selectedNatureActiviteGrandPublique);
    }


     public findByCriteria(natureActiviteGrandPublique:NatureActiviteGrandPubliqueVo):Observable<Array<NatureActiviteGrandPubliqueVo>>{
           return this.http.post<Array<NatureActiviteGrandPubliqueVo>>(this.API +'search', natureActiviteGrandPublique);
    }

   public findByIdWithAssociatedList(natureActiviteGrandPublique:NatureActiviteGrandPubliqueVo):Observable<NatureActiviteGrandPubliqueVo>{
         return this.http.get<NatureActiviteGrandPubliqueVo>(this.API + 'detail/id/' +natureActiviteGrandPublique.id);
    }

    // getters and setters


    get natureActiviteGrandPubliques(): Array<NatureActiviteGrandPubliqueVo> {
    if(this._natureActiviteGrandPubliques==null){
    this._natureActiviteGrandPubliques=new Array<NatureActiviteGrandPubliqueVo>();
    }
return this._natureActiviteGrandPubliques;
       }

    set natureActiviteGrandPubliques(value: Array<NatureActiviteGrandPubliqueVo>) {
        this._natureActiviteGrandPubliques = value;
       }

    get selectedNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
    if(this._selectedNatureActiviteGrandPublique==null){
    this._selectedNatureActiviteGrandPublique=new NatureActiviteGrandPubliqueVo();
    }
           return this._selectedNatureActiviteGrandPublique;
       }

    set selectedNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this._selectedNatureActiviteGrandPublique = value;
       }

    get natureActiviteGrandPubliqueSelections(): Array<NatureActiviteGrandPubliqueVo> {
    if(this._natureActiviteGrandPubliqueSelections==null){
    this._natureActiviteGrandPubliqueSelections=new Array<NatureActiviteGrandPubliqueVo>();
    }
        return this._natureActiviteGrandPubliqueSelections;
       }


    set natureActiviteGrandPubliqueSelections(value: Array<NatureActiviteGrandPubliqueVo>) {
        this._natureActiviteGrandPubliqueSelections = value;
       }

    get createNatureActiviteGrandPubliqueDialog(): boolean {
        return this._createNatureActiviteGrandPubliqueDialog;
       }

    set createNatureActiviteGrandPubliqueDialog(value: boolean) {
        this._createNatureActiviteGrandPubliqueDialog = value;
       }

    get editNatureActiviteGrandPubliqueDialog(): boolean {
        return this._editNatureActiviteGrandPubliqueDialog;
       }

    set editNatureActiviteGrandPubliqueDialog(value: boolean) {
        this._editNatureActiviteGrandPubliqueDialog = value;
       }

    get viewNatureActiviteGrandPubliqueDialog(): boolean {
        return this._viewNatureActiviteGrandPubliqueDialog;
       }

    set viewNatureActiviteGrandPubliqueDialog(value: boolean) {
        this._viewNatureActiviteGrandPubliqueDialog = value;
       }

     get searchNatureActiviteGrandPublique(): NatureActiviteGrandPubliqueVo {
     if(this._searchNatureActiviteGrandPublique==null){
    this._searchNatureActiviteGrandPublique=new NatureActiviteGrandPubliqueVo();
    }
        return this._searchNatureActiviteGrandPublique;
    }

    set searchNatureActiviteGrandPublique(value: NatureActiviteGrandPubliqueVo) {
        this._searchNatureActiviteGrandPublique = value;
       }

}

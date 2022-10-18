import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysRencontreGrandPubliqueJeunePubliqueVo} from '../model/PaysRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysRencontreGrandPubliqueJeunePubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paysRencontreGrandPubliqueJeunePublique/';
        })
    }
     private _paysRencontreGrandPubliqueJeunePubliques: Array<PaysRencontreGrandPubliqueJeunePubliqueVo> ;
     private _selectedPaysRencontreGrandPubliqueJeunePublique: PaysRencontreGrandPubliqueJeunePubliqueVo;
     private _paysRencontreGrandPubliqueJeunePubliqueSelections: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>;
     private _createPaysRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _editPaysRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _viewPaysRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     public editPaysRencontreGrandPubliqueJeunePublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaysRencontreGrandPubliqueJeunePubliqueVo>>(this.API);
    }

    public save(): Observable<PaysRencontreGrandPubliqueJeunePubliqueVo> {
         return this.http.post<PaysRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedPaysRencontreGrandPubliqueJeunePublique);
    }

    delete(paysRencontreGrandPubliqueJeunePublique: PaysRencontreGrandPubliqueJeunePubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + paysRencontreGrandPubliqueJeunePublique.id);
    }


    public edit(): Observable<PaysRencontreGrandPubliqueJeunePubliqueVo> {
        return this.http.put<PaysRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedPaysRencontreGrandPubliqueJeunePublique);
    }


     public findByCriteria(paysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo):Observable<Array<PaysRencontreGrandPubliqueJeunePubliqueVo>>{
           return this.http.post<Array<PaysRencontreGrandPubliqueJeunePubliqueVo>>(this.API +'search', paysRencontreGrandPubliqueJeunePublique);
    }

   public findByIdWithAssociatedList(paysRencontreGrandPubliqueJeunePublique:PaysRencontreGrandPubliqueJeunePubliqueVo):Observable<PaysRencontreGrandPubliqueJeunePubliqueVo>{
         return this.http.get<PaysRencontreGrandPubliqueJeunePubliqueVo>(this.API + 'detail/id/' +paysRencontreGrandPubliqueJeunePublique.id);
    }

    // getters and setters


    get paysRencontreGrandPubliqueJeunePubliques(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._paysRencontreGrandPubliqueJeunePubliques==null){
    this._paysRencontreGrandPubliqueJeunePubliques=new Array<PaysRencontreGrandPubliqueJeunePubliqueVo>();
    }
return this._paysRencontreGrandPubliqueJeunePubliques;
       }

    set paysRencontreGrandPubliqueJeunePubliques(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysRencontreGrandPubliqueJeunePubliques = value;
       }

    get selectedPaysRencontreGrandPubliqueJeunePublique(): PaysRencontreGrandPubliqueJeunePubliqueVo {
    if(this._selectedPaysRencontreGrandPubliqueJeunePublique==null){
    this._selectedPaysRencontreGrandPubliqueJeunePublique=new PaysRencontreGrandPubliqueJeunePubliqueVo();
    }
           return this._selectedPaysRencontreGrandPubliqueJeunePublique;
       }

    set selectedPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this._selectedPaysRencontreGrandPubliqueJeunePublique = value;
       }

    get paysRencontreGrandPubliqueJeunePubliqueSelections(): Array<PaysRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._paysRencontreGrandPubliqueJeunePubliqueSelections==null){
    this._paysRencontreGrandPubliqueJeunePubliqueSelections=new Array<PaysRencontreGrandPubliqueJeunePubliqueVo>();
    }
        return this._paysRencontreGrandPubliqueJeunePubliqueSelections;
       }


    set paysRencontreGrandPubliqueJeunePubliqueSelections(value: Array<PaysRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysRencontreGrandPubliqueJeunePubliqueSelections = value;
       }

    get createPaysRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._createPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set createPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._createPaysRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get editPaysRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._editPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set editPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._editPaysRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get viewPaysRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._viewPaysRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set viewPaysRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._viewPaysRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

     get searchPaysRencontreGrandPubliqueJeunePublique(): PaysRencontreGrandPubliqueJeunePubliqueVo {
     if(this._searchPaysRencontreGrandPubliqueJeunePublique==null){
    this._searchPaysRencontreGrandPubliqueJeunePublique=new PaysRencontreGrandPubliqueJeunePubliqueVo();
    }
        return this._searchPaysRencontreGrandPubliqueJeunePublique;
    }

    set searchPaysRencontreGrandPubliqueJeunePublique(value: PaysRencontreGrandPubliqueJeunePubliqueVo) {
        this._searchPaysRencontreGrandPubliqueJeunePublique = value;
       }

}

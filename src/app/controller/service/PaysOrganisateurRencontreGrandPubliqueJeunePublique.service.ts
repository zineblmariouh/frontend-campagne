import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo} from '../model/PaysOrganisateurRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysOrganisateurRencontreGrandPubliqueJeunePubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paysOrganisateurRencontreGrandPubliqueJeunePublique/';
        })
    }
     private _paysOrganisateurRencontreGrandPubliqueJeunePubliques: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> ;
     private _selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo;
     private _paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>;
     private _createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     public editPaysOrganisateurRencontreGrandPubliqueJeunePublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>>(this.API);
    }

    public save(): Observable<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
         return this.http.post<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique);
    }

    delete(paysOrganisateurRencontreGrandPubliqueJeunePublique: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + paysOrganisateurRencontreGrandPubliqueJeunePublique.id);
    }


    public edit(): Observable<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
        return this.http.put<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique);
    }


     public findByCriteria(paysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo):Observable<Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>>{
           return this.http.post<Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>>(this.API +'search', paysOrganisateurRencontreGrandPubliqueJeunePublique);
    }

   public findByIdWithAssociatedList(paysOrganisateurRencontreGrandPubliqueJeunePublique:PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo):Observable<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>{
         return this.http.get<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>(this.API + 'detail/id/' +paysOrganisateurRencontreGrandPubliqueJeunePublique.id);
    }

    // getters and setters


    get paysOrganisateurRencontreGrandPubliqueJeunePubliques(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._paysOrganisateurRencontreGrandPubliqueJeunePubliques==null){
    this._paysOrganisateurRencontreGrandPubliqueJeunePubliques=new Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>();
    }
return this._paysOrganisateurRencontreGrandPubliqueJeunePubliques;
       }

    set paysOrganisateurRencontreGrandPubliqueJeunePubliques(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysOrganisateurRencontreGrandPubliqueJeunePubliques = value;
       }

    get selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(): PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
    if(this._selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique==null){
    this._selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique=new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
    }
           return this._selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique;
       }

    set selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this._selectedPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }

    get paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections(): Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections==null){
    this._paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections=new Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>();
    }
        return this._paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections;
       }


    set paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections(value: Array<PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo>) {
        this._paysOrganisateurRencontreGrandPubliqueJeunePubliqueSelections = value;
       }

    get createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._createPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._editPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._viewPaysOrganisateurRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

     get searchPaysOrganisateurRencontreGrandPubliqueJeunePublique(): PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo {
     if(this._searchPaysOrganisateurRencontreGrandPubliqueJeunePublique==null){
    this._searchPaysOrganisateurRencontreGrandPubliqueJeunePublique=new PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo();
    }
        return this._searchPaysOrganisateurRencontreGrandPubliqueJeunePublique;
    }

    set searchPaysOrganisateurRencontreGrandPubliqueJeunePublique(value: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueVo) {
        this._searchPaysOrganisateurRencontreGrandPubliqueJeunePublique = value;
       }

}

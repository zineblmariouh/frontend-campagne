import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreGrandPubliqueJeunePubliqueDisciplineScientifique/';
        })
    }
     private _rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> ;
     private _selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo;
     private _rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>;
     private _createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog: boolean;
     private _editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog: boolean;
     private _viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog: boolean;
     public editRencontreGrandPubliqueJeunePubliqueDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
         return this.http.post<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique);
    }

    delete(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreGrandPubliqueJeunePubliqueDisciplineScientifique.id);
    }


    public edit(): Observable<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
        return this.http.put<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>(this.API, this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique);
    }


     public findByCriteria(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo):Observable<Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>>{
           return this.http.post<Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>>(this.API +'search', rencontreGrandPubliqueJeunePubliqueDisciplineScientifique);
    }

   public findByIdWithAssociatedList(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique:RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo):Observable<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>{
         return this.http.get<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>(this.API + 'detail/id/' +rencontreGrandPubliqueJeunePubliqueDisciplineScientifique.id);
    }

    // getters and setters


    get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques==null){
    this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques=new Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>();
    }
return this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
       }

    set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = value;
       }

    get selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(): RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
    if(this._selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique==null){
    this._selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique=new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
    }
           return this._selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }

    set selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this._selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

    get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    if(this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections==null){
    this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections=new Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>();
    }
        return this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections;
       }


    set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this._rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueSelections = value;
       }

    get createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(): boolean {
        return this._createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }

    set createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this._createRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = value;
       }

    get editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(): boolean {
        return this._editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }

    set editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this._editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = value;
       }

    get viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(): boolean {
        return this._viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;
       }

    set viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this._viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = value;
       }

     get searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(): RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
     if(this._searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique==null){
    this._searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique=new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();
    }
        return this._searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
    }

    set searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this._searchRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

}

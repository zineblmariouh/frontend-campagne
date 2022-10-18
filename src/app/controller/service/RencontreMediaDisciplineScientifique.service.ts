import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RencontreMediaDisciplineScientifiqueVo} from '../model/RencontreMediaDisciplineScientifique.model';
import {RencontreMediaVo} from '../model/RencontreMedia.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class RencontreMediaDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/rencontreMediaDisciplineScientifique/';
        })
    }
     private _rencontreMediaDisciplineScientifiques: Array<RencontreMediaDisciplineScientifiqueVo> ;
     private _selectedRencontreMediaDisciplineScientifique: RencontreMediaDisciplineScientifiqueVo;
     private _rencontreMediaDisciplineScientifiqueSelections: Array<RencontreMediaDisciplineScientifiqueVo>;
     private _createRencontreMediaDisciplineScientifiqueDialog: boolean;
     private _editRencontreMediaDisciplineScientifiqueDialog: boolean;
     private _viewRencontreMediaDisciplineScientifiqueDialog: boolean;
     public editRencontreMediaDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RencontreMediaDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<RencontreMediaDisciplineScientifiqueVo> {
         return this.http.post<RencontreMediaDisciplineScientifiqueVo>(this.API, this.selectedRencontreMediaDisciplineScientifique);
    }

    delete(rencontreMediaDisciplineScientifique: RencontreMediaDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + rencontreMediaDisciplineScientifique.id);
    }


    public edit(): Observable<RencontreMediaDisciplineScientifiqueVo> {
        return this.http.put<RencontreMediaDisciplineScientifiqueVo>(this.API, this.selectedRencontreMediaDisciplineScientifique);
    }


     public findByCriteria(rencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo):Observable<Array<RencontreMediaDisciplineScientifiqueVo>>{
           return this.http.post<Array<RencontreMediaDisciplineScientifiqueVo>>(this.API +'search', rencontreMediaDisciplineScientifique);
    }

   public findByIdWithAssociatedList(rencontreMediaDisciplineScientifique:RencontreMediaDisciplineScientifiqueVo):Observable<RencontreMediaDisciplineScientifiqueVo>{
         return this.http.get<RencontreMediaDisciplineScientifiqueVo>(this.API + 'detail/id/' +rencontreMediaDisciplineScientifique.id);
    }

    // getters and setters


    get rencontreMediaDisciplineScientifiques(): Array<RencontreMediaDisciplineScientifiqueVo> {
    if(this._rencontreMediaDisciplineScientifiques==null){
    this._rencontreMediaDisciplineScientifiques=new Array<RencontreMediaDisciplineScientifiqueVo>();
    }
return this._rencontreMediaDisciplineScientifiques;
       }

    set rencontreMediaDisciplineScientifiques(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this._rencontreMediaDisciplineScientifiques = value;
       }

    get selectedRencontreMediaDisciplineScientifique(): RencontreMediaDisciplineScientifiqueVo {
    if(this._selectedRencontreMediaDisciplineScientifique==null){
    this._selectedRencontreMediaDisciplineScientifique=new RencontreMediaDisciplineScientifiqueVo();
    }
           return this._selectedRencontreMediaDisciplineScientifique;
       }

    set selectedRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this._selectedRencontreMediaDisciplineScientifique = value;
       }

    get rencontreMediaDisciplineScientifiqueSelections(): Array<RencontreMediaDisciplineScientifiqueVo> {
    if(this._rencontreMediaDisciplineScientifiqueSelections==null){
    this._rencontreMediaDisciplineScientifiqueSelections=new Array<RencontreMediaDisciplineScientifiqueVo>();
    }
        return this._rencontreMediaDisciplineScientifiqueSelections;
       }


    set rencontreMediaDisciplineScientifiqueSelections(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this._rencontreMediaDisciplineScientifiqueSelections = value;
       }

    get createRencontreMediaDisciplineScientifiqueDialog(): boolean {
        return this._createRencontreMediaDisciplineScientifiqueDialog;
       }

    set createRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this._createRencontreMediaDisciplineScientifiqueDialog = value;
       }

    get editRencontreMediaDisciplineScientifiqueDialog(): boolean {
        return this._editRencontreMediaDisciplineScientifiqueDialog;
       }

    set editRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this._editRencontreMediaDisciplineScientifiqueDialog = value;
       }

    get viewRencontreMediaDisciplineScientifiqueDialog(): boolean {
        return this._viewRencontreMediaDisciplineScientifiqueDialog;
       }

    set viewRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this._viewRencontreMediaDisciplineScientifiqueDialog = value;
       }

     get searchRencontreMediaDisciplineScientifique(): RencontreMediaDisciplineScientifiqueVo {
     if(this._searchRencontreMediaDisciplineScientifique==null){
    this._searchRencontreMediaDisciplineScientifique=new RencontreMediaDisciplineScientifiqueVo();
    }
        return this._searchRencontreMediaDisciplineScientifique;
    }

    set searchRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this._searchRencontreMediaDisciplineScientifique = value;
       }

}

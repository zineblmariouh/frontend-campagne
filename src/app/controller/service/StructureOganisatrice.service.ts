import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StructureOganisatriceVo} from '../model/StructureOganisatrice.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class StructureOganisatriceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/structureOganisatrice/';
        })
    }
     private _structureOganisatrices: Array<StructureOganisatriceVo> ;
     private _selectedStructureOganisatrice: StructureOganisatriceVo;
     private _structureOganisatriceSelections: Array<StructureOganisatriceVo>;
     private _createStructureOganisatriceDialog: boolean;
     private _editStructureOganisatriceDialog: boolean;
     private _viewStructureOganisatriceDialog: boolean;
     public editStructureOganisatrice$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStructureOganisatrice:StructureOganisatriceVo ;

    // methods

    public findAll(){
     return this.http.get<Array<StructureOganisatriceVo>>(this.API);
    }

    public save(): Observable<StructureOganisatriceVo> {
         return this.http.post<StructureOganisatriceVo>(this.API, this.selectedStructureOganisatrice);
    }

    delete(structureOganisatrice: StructureOganisatriceVo) {
         return this.http.delete<number>(this.API + 'id/' + structureOganisatrice.id);
    }


    public edit(): Observable<StructureOganisatriceVo> {
        return this.http.put<StructureOganisatriceVo>(this.API, this.selectedStructureOganisatrice);
    }


     public findByCriteria(structureOganisatrice:StructureOganisatriceVo):Observable<Array<StructureOganisatriceVo>>{
           return this.http.post<Array<StructureOganisatriceVo>>(this.API +'search', structureOganisatrice);
    }

   public findByIdWithAssociatedList(structureOganisatrice:StructureOganisatriceVo):Observable<StructureOganisatriceVo>{
         return this.http.get<StructureOganisatriceVo>(this.API + 'detail/id/' +structureOganisatrice.id);
    }

    // getters and setters


    get structureOganisatrices(): Array<StructureOganisatriceVo> {
    if(this._structureOganisatrices==null){
    this._structureOganisatrices=new Array<StructureOganisatriceVo>();
    }
return this._structureOganisatrices;
       }

    set structureOganisatrices(value: Array<StructureOganisatriceVo>) {
        this._structureOganisatrices = value;
       }

    get selectedStructureOganisatrice(): StructureOganisatriceVo {
    if(this._selectedStructureOganisatrice==null){
    this._selectedStructureOganisatrice=new StructureOganisatriceVo();
    }
           return this._selectedStructureOganisatrice;
       }

    set selectedStructureOganisatrice(value: StructureOganisatriceVo) {
        this._selectedStructureOganisatrice = value;
       }

    get structureOganisatriceSelections(): Array<StructureOganisatriceVo> {
    if(this._structureOganisatriceSelections==null){
    this._structureOganisatriceSelections=new Array<StructureOganisatriceVo>();
    }
        return this._structureOganisatriceSelections;
       }


    set structureOganisatriceSelections(value: Array<StructureOganisatriceVo>) {
        this._structureOganisatriceSelections = value;
       }

    get createStructureOganisatriceDialog(): boolean {
        return this._createStructureOganisatriceDialog;
       }

    set createStructureOganisatriceDialog(value: boolean) {
        this._createStructureOganisatriceDialog = value;
       }

    get editStructureOganisatriceDialog(): boolean {
        return this._editStructureOganisatriceDialog;
       }

    set editStructureOganisatriceDialog(value: boolean) {
        this._editStructureOganisatriceDialog = value;
       }

    get viewStructureOganisatriceDialog(): boolean {
        return this._viewStructureOganisatriceDialog;
       }

    set viewStructureOganisatriceDialog(value: boolean) {
        this._viewStructureOganisatriceDialog = value;
       }

     get searchStructureOganisatrice(): StructureOganisatriceVo {
     if(this._searchStructureOganisatrice==null){
    this._searchStructureOganisatrice=new StructureOganisatriceVo();
    }
        return this._searchStructureOganisatrice;
    }

    set searchStructureOganisatrice(value: StructureOganisatriceVo) {
        this._searchStructureOganisatrice = value;
       }

}

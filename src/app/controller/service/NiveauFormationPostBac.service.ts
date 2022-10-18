import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NiveauFormationPostBacVo} from '../model/NiveauFormationPostBac.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauFormationPostBacService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/niveauFormationPostBac/';
        })
    }
     private _niveauFormationPostBacs: Array<NiveauFormationPostBacVo> ;
     private _selectedNiveauFormationPostBac: NiveauFormationPostBacVo;
     private _niveauFormationPostBacSelections: Array<NiveauFormationPostBacVo>;
     private _createNiveauFormationPostBacDialog: boolean;
     private _editNiveauFormationPostBacDialog: boolean;
     private _viewNiveauFormationPostBacDialog: boolean;
     public editNiveauFormationPostBac$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNiveauFormationPostBac:NiveauFormationPostBacVo ;

    // methods
    public archiver(niveauFormationPostBac: NiveauFormationPostBacVo): Observable<NiveauFormationPostBacVo> {
        return this.http.put<NiveauFormationPostBacVo>(this.API + 'archiver/' ,niveauFormationPostBac);
    }
    public desarchiver(niveauFormationPostBac: NiveauFormationPostBacVo): Observable<NiveauFormationPostBacVo> {
    return this.http.put<NiveauFormationPostBacVo>(this.API + 'desarchiver/' ,niveauFormationPostBac);
    }

    public findAll(){
     return this.http.get<Array<NiveauFormationPostBacVo>>(this.API);
    }

    public save(): Observable<NiveauFormationPostBacVo> {
           return this.http.post<NiveauFormationPostBacVo>(this.API, {...this.selectedNiveauFormationPostBac,dateCreation: moment(this.selectedNiveauFormationPostBac.dateCreation).format("YYYY-MM-DD")});
    }

    delete(niveauFormationPostBac: NiveauFormationPostBacVo) {
         return this.http.delete<number>(this.API + 'id/' + niveauFormationPostBac.id);
    }


    public edit(): Observable<NiveauFormationPostBacVo> {
        return this.http.put<NiveauFormationPostBacVo>(this.API, this.selectedNiveauFormationPostBac);
    }


     public findByCriteria(niveauFormationPostBac:NiveauFormationPostBacVo):Observable<Array<NiveauFormationPostBacVo>>{
           return this.http.post<Array<NiveauFormationPostBacVo>>(this.API +'search', niveauFormationPostBac);
    }

   public findByIdWithAssociatedList(niveauFormationPostBac:NiveauFormationPostBacVo):Observable<NiveauFormationPostBacVo>{
         return this.http.get<NiveauFormationPostBacVo>(this.API + 'detail/id/' +niveauFormationPostBac.id);
    }

    // getters and setters


    get niveauFormationPostBacs(): Array<NiveauFormationPostBacVo> {
    if(this._niveauFormationPostBacs==null){
    this._niveauFormationPostBacs=new Array<NiveauFormationPostBacVo>();
    }
return this._niveauFormationPostBacs;
       }

    set niveauFormationPostBacs(value: Array<NiveauFormationPostBacVo>) {
        this._niveauFormationPostBacs = value;
       }

    get selectedNiveauFormationPostBac(): NiveauFormationPostBacVo {
    if(this._selectedNiveauFormationPostBac==null){
    this._selectedNiveauFormationPostBac=new NiveauFormationPostBacVo();
    }
           return this._selectedNiveauFormationPostBac;
       }

    set selectedNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this._selectedNiveauFormationPostBac = value;
       }

    get niveauFormationPostBacSelections(): Array<NiveauFormationPostBacVo> {
    if(this._niveauFormationPostBacSelections==null){
    this._niveauFormationPostBacSelections=new Array<NiveauFormationPostBacVo>();
    }
        return this._niveauFormationPostBacSelections;
       }


    set niveauFormationPostBacSelections(value: Array<NiveauFormationPostBacVo>) {
        this._niveauFormationPostBacSelections = value;
       }

    get createNiveauFormationPostBacDialog(): boolean {
        return this._createNiveauFormationPostBacDialog;
       }

    set createNiveauFormationPostBacDialog(value: boolean) {
        this._createNiveauFormationPostBacDialog = value;
       }

    get editNiveauFormationPostBacDialog(): boolean {
        return this._editNiveauFormationPostBacDialog;
       }

    set editNiveauFormationPostBacDialog(value: boolean) {
        this._editNiveauFormationPostBacDialog = value;
       }

    get viewNiveauFormationPostBacDialog(): boolean {
        return this._viewNiveauFormationPostBacDialog;
       }

    set viewNiveauFormationPostBacDialog(value: boolean) {
        this._viewNiveauFormationPostBacDialog = value;
       }

     get searchNiveauFormationPostBac(): NiveauFormationPostBacVo {
     if(this._searchNiveauFormationPostBac==null){
    this._searchNiveauFormationPostBac=new NiveauFormationPostBacVo();
    }
        return this._searchNiveauFormationPostBac;
    }

    set searchNiveauFormationPostBac(value: NiveauFormationPostBacVo) {
        this._searchNiveauFormationPostBac = value;
       }

}

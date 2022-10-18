import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirEncadrementEtudiantVo} from '../model/CommunauteSavoirEncadrementEtudiant.model';
import {EncadrementEtudiantVo} from '../model/EncadrementEtudiant.model';
import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirEncadrementEtudiantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoirEncadrementEtudiant/';
        })
    }
     private _communauteSavoirEncadrementEtudiants: Array<CommunauteSavoirEncadrementEtudiantVo> ;
     private _selectedCommunauteSavoirEncadrementEtudiant: CommunauteSavoirEncadrementEtudiantVo;
     private _communauteSavoirEncadrementEtudiantSelections: Array<CommunauteSavoirEncadrementEtudiantVo>;
     private _createCommunauteSavoirEncadrementEtudiantDialog: boolean;
     private _editCommunauteSavoirEncadrementEtudiantDialog: boolean;
     private _viewCommunauteSavoirEncadrementEtudiantDialog: boolean;
     public editCommunauteSavoirEncadrementEtudiant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CommunauteSavoirEncadrementEtudiantVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirEncadrementEtudiantVo> {
         return this.http.post<CommunauteSavoirEncadrementEtudiantVo>(this.API, this.selectedCommunauteSavoirEncadrementEtudiant);
    }

    delete(communauteSavoirEncadrementEtudiant: CommunauteSavoirEncadrementEtudiantVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoirEncadrementEtudiant.id);
    }


    public edit(): Observable<CommunauteSavoirEncadrementEtudiantVo> {
        return this.http.put<CommunauteSavoirEncadrementEtudiantVo>(this.API, this.selectedCommunauteSavoirEncadrementEtudiant);
    }


     public findByCriteria(communauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo):Observable<Array<CommunauteSavoirEncadrementEtudiantVo>>{
           return this.http.post<Array<CommunauteSavoirEncadrementEtudiantVo>>(this.API +'search', communauteSavoirEncadrementEtudiant);
    }

   public findByIdWithAssociatedList(communauteSavoirEncadrementEtudiant:CommunauteSavoirEncadrementEtudiantVo):Observable<CommunauteSavoirEncadrementEtudiantVo>{
         return this.http.get<CommunauteSavoirEncadrementEtudiantVo>(this.API + 'detail/id/' +communauteSavoirEncadrementEtudiant.id);
    }

    // getters and setters


    get communauteSavoirEncadrementEtudiants(): Array<CommunauteSavoirEncadrementEtudiantVo> {
    if(this._communauteSavoirEncadrementEtudiants==null){
    this._communauteSavoirEncadrementEtudiants=new Array<CommunauteSavoirEncadrementEtudiantVo>();
    }
return this._communauteSavoirEncadrementEtudiants;
       }

    set communauteSavoirEncadrementEtudiants(value: Array<CommunauteSavoirEncadrementEtudiantVo>) {
        this._communauteSavoirEncadrementEtudiants = value;
       }

    get selectedCommunauteSavoirEncadrementEtudiant(): CommunauteSavoirEncadrementEtudiantVo {
    if(this._selectedCommunauteSavoirEncadrementEtudiant==null){
    this._selectedCommunauteSavoirEncadrementEtudiant=new CommunauteSavoirEncadrementEtudiantVo();
    }
           return this._selectedCommunauteSavoirEncadrementEtudiant;
       }

    set selectedCommunauteSavoirEncadrementEtudiant(value: CommunauteSavoirEncadrementEtudiantVo) {
        this._selectedCommunauteSavoirEncadrementEtudiant = value;
       }

    get communauteSavoirEncadrementEtudiantSelections(): Array<CommunauteSavoirEncadrementEtudiantVo> {
    if(this._communauteSavoirEncadrementEtudiantSelections==null){
    this._communauteSavoirEncadrementEtudiantSelections=new Array<CommunauteSavoirEncadrementEtudiantVo>();
    }
        return this._communauteSavoirEncadrementEtudiantSelections;
       }


    set communauteSavoirEncadrementEtudiantSelections(value: Array<CommunauteSavoirEncadrementEtudiantVo>) {
        this._communauteSavoirEncadrementEtudiantSelections = value;
       }

    get createCommunauteSavoirEncadrementEtudiantDialog(): boolean {
        return this._createCommunauteSavoirEncadrementEtudiantDialog;
       }

    set createCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this._createCommunauteSavoirEncadrementEtudiantDialog = value;
       }

    get editCommunauteSavoirEncadrementEtudiantDialog(): boolean {
        return this._editCommunauteSavoirEncadrementEtudiantDialog;
       }

    set editCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this._editCommunauteSavoirEncadrementEtudiantDialog = value;
       }

    get viewCommunauteSavoirEncadrementEtudiantDialog(): boolean {
        return this._viewCommunauteSavoirEncadrementEtudiantDialog;
       }

    set viewCommunauteSavoirEncadrementEtudiantDialog(value: boolean) {
        this._viewCommunauteSavoirEncadrementEtudiantDialog = value;
       }

     get searchCommunauteSavoirEncadrementEtudiant(): CommunauteSavoirEncadrementEtudiantVo {
     if(this._searchCommunauteSavoirEncadrementEtudiant==null){
    this._searchCommunauteSavoirEncadrementEtudiant=new CommunauteSavoirEncadrementEtudiantVo();
    }
        return this._searchCommunauteSavoirEncadrementEtudiant;
    }

    set searchCommunauteSavoirEncadrementEtudiant(value: CommunauteSavoirEncadrementEtudiantVo) {
        this._searchCommunauteSavoirEncadrementEtudiant = value;
       }

}

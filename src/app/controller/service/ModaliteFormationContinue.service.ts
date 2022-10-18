import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ModaliteFormationContinueVo} from '../model/ModaliteFormationContinue.model';


@Injectable({
  providedIn: 'root'
})
export class ModaliteFormationContinueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/modaliteFormationContinue/';
        })
    }
     private _modaliteFormationContinues: Array<ModaliteFormationContinueVo> ;
     private _selectedModaliteFormationContinue: ModaliteFormationContinueVo;
     private _modaliteFormationContinueSelections: Array<ModaliteFormationContinueVo>;
     private _createModaliteFormationContinueDialog: boolean;
     private _editModaliteFormationContinueDialog: boolean;
     private _viewModaliteFormationContinueDialog: boolean;
     public editModaliteFormationContinue$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchModaliteFormationContinue:ModaliteFormationContinueVo ;

    // methods
    public archiver(modaliteFormationContinue: ModaliteFormationContinueVo): Observable<ModaliteFormationContinueVo> {
        return this.http.put<ModaliteFormationContinueVo>(this.API + 'archiver/' ,modaliteFormationContinue);
    }
    public desarchiver(modaliteFormationContinue: ModaliteFormationContinueVo): Observable<ModaliteFormationContinueVo> {
    return this.http.put<ModaliteFormationContinueVo>(this.API + 'desarchiver/' ,modaliteFormationContinue);
    }

    public findAll(){
     return this.http.get<Array<ModaliteFormationContinueVo>>(this.API);
    }

    public save(): Observable<ModaliteFormationContinueVo> {
           return this.http.post<ModaliteFormationContinueVo>(this.API, {...this.selectedModaliteFormationContinue,dateCreation: moment(this.selectedModaliteFormationContinue.dateCreation).format("YYYY-MM-DD")});
    }

    delete(modaliteFormationContinue: ModaliteFormationContinueVo) {
         return this.http.delete<number>(this.API + 'id/' + modaliteFormationContinue.id);
    }


    public edit(): Observable<ModaliteFormationContinueVo> {
        return this.http.put<ModaliteFormationContinueVo>(this.API, this.selectedModaliteFormationContinue);
    }


     public findByCriteria(modaliteFormationContinue:ModaliteFormationContinueVo):Observable<Array<ModaliteFormationContinueVo>>{
           return this.http.post<Array<ModaliteFormationContinueVo>>(this.API +'search', modaliteFormationContinue);
    }

   public findByIdWithAssociatedList(modaliteFormationContinue:ModaliteFormationContinueVo):Observable<ModaliteFormationContinueVo>{
         return this.http.get<ModaliteFormationContinueVo>(this.API + 'detail/id/' +modaliteFormationContinue.id);
    }

    // getters and setters


    get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
    if(this._modaliteFormationContinues==null){
    this._modaliteFormationContinues=new Array<ModaliteFormationContinueVo>();
    }
return this._modaliteFormationContinues;
       }

    set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this._modaliteFormationContinues = value;
       }

    get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
    if(this._selectedModaliteFormationContinue==null){
    this._selectedModaliteFormationContinue=new ModaliteFormationContinueVo();
    }
           return this._selectedModaliteFormationContinue;
       }

    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this._selectedModaliteFormationContinue = value;
       }

    get modaliteFormationContinueSelections(): Array<ModaliteFormationContinueVo> {
    if(this._modaliteFormationContinueSelections==null){
    this._modaliteFormationContinueSelections=new Array<ModaliteFormationContinueVo>();
    }
        return this._modaliteFormationContinueSelections;
       }


    set modaliteFormationContinueSelections(value: Array<ModaliteFormationContinueVo>) {
        this._modaliteFormationContinueSelections = value;
       }

    get createModaliteFormationContinueDialog(): boolean {
        return this._createModaliteFormationContinueDialog;
       }

    set createModaliteFormationContinueDialog(value: boolean) {
        this._createModaliteFormationContinueDialog = value;
       }

    get editModaliteFormationContinueDialog(): boolean {
        return this._editModaliteFormationContinueDialog;
       }

    set editModaliteFormationContinueDialog(value: boolean) {
        this._editModaliteFormationContinueDialog = value;
       }

    get viewModaliteFormationContinueDialog(): boolean {
        return this._viewModaliteFormationContinueDialog;
       }

    set viewModaliteFormationContinueDialog(value: boolean) {
        this._viewModaliteFormationContinueDialog = value;
       }

     get searchModaliteFormationContinue(): ModaliteFormationContinueVo {
     if(this._searchModaliteFormationContinue==null){
    this._searchModaliteFormationContinue=new ModaliteFormationContinueVo();
    }
        return this._searchModaliteFormationContinue;
    }

    set searchModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this._searchModaliteFormationContinue = value;
       }

}

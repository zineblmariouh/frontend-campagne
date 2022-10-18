import {Component, OnInit, Input} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-create-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-create-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-create-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent implements OnInit {

        selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        selectedTypeUtilisateurSavoirConcus: TypeUtilisateurSavoirConcuVo = new TypeUtilisateurSavoirConcuVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiquePayss: DeveloppementDeSavoirEtInnovationScientifiquePaysVo = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validRoleDeveloppementDeSavoirLibelle = true;
    _validRoleDeveloppementDeSavoirCode = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> = [];
private _typeUtilisateurSavoirConcusVo: Array<TypeUtilisateurSavoirConcuVo> = [];
private _developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> = [];
private _developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> = [];
private _developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> = [];
private _developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> = [];
private _developpementDeSavoirEtInnovationScientifiquePayssVo: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> = [];
private _developpementDeSavoirEtInnovationScientifiqueEtablissementsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> = [];

constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private developpementDeSavoirEtInnovationScientifiquePaysService :DeveloppementDeSavoirEtInnovationScientifiquePaysService
,       private developpementDeSavoirEtInnovationScientifiqueEtablissementService :DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
,       private typeSavoirService :TypeSavoirService
,       private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService :DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
,       private modeDiffusionService :ModeDiffusionService
,       private developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService :DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService
,       private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService :TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
,       private enjeuxIrdService :EnjeuxIrdService
,       private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService :DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
,       private etablissementService :EtablissementService
,       private roleDeveloppementDeSavoirService :RoleDeveloppementDeSavoirService
,       private typeUtilisateurSavoirConcuService :TypeUtilisateurSavoirConcuService
,       private communauteSavoirService :CommunauteSavoirService
,       private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
,       private typeUtilisateurService :TypeUtilisateurService
,       private paysService :PaysService
,       private savoirEtInnovationService :SavoirEtInnovationService
) {

}


// methods
ngOnInit(): void {

            this.typeSavoirService.findAll().subscribe(data => this.prepareTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(data));

                this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.typeSavoirVo = new TypeSavoirVo();
                this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);


            this.typeUtilisateurService.findAll().subscribe(data => this.prepareTypeUtilisateurSavoirConcus(data));

                this.selectedTypeUtilisateurSavoirConcus.typeUtilisateurVo = new TypeUtilisateurVo();
                this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);


            this.modeDiffusionService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.modeDiffusionVo = new ModeDiffusionVo();
                this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.communauteSavoirService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);


            this.communauteSavoirService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);


            this.paysService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiquePayss(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);


            this.etablissementService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(data));

                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


    this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
    this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(typeSavoirs: Array<TypeSavoirVo>): void{
        if( typeSavoirs != null){
        typeSavoirs.forEach(e => {
        const typeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        typeSavoirDeveloppementDeSavoirEtInnovationScientifique.typeSavoirVo = e;
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.push(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
        });
        }
    }
         prepareTypeUtilisateurSavoirConcus(typeUtilisateurs: Array<TypeUtilisateurVo>): void{
        if( typeUtilisateurs != null){
        typeUtilisateurs.forEach(e => {
        const typeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();
        typeUtilisateurSavoirConcu.typeUtilisateurVo = e;
        this.typeUtilisateurSavoirConcusVo.push(typeUtilisateurSavoirConcu);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(modeDiffusions: Array<ModeDiffusionVo>): void{
        if( modeDiffusions != null){
        modeDiffusions.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        developpementDeSavoirEtInnovationScientifiqueModeDiffusion.modeDiffusionVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.push(developpementDeSavoirEtInnovationScientifiqueModeDiffusion);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.push(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.communauteSavoirVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.push(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir.communauteSavoirVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.push(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        developpementDeSavoirEtInnovationScientifiquePays.paysVo = e;
        this.developpementDeSavoirEtInnovationScientifiquePayssVo.push(developpementDeSavoirEtInnovationScientifiquePays);
        });
        }
    }
         prepareDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        developpementDeSavoirEtInnovationScientifiqueEtablissement.etablissementVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.push(developpementDeSavoirEtInnovationScientifiqueEtablissement);
        });
        }
    }



private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.developpementDeSavoirEtInnovationScientifiqueService.save().subscribe(developpementDeSavoirEtInnovationScientifique=>{
       this.developpementDeSavoirEtInnovationScientifiques.push({...developpementDeSavoirEtInnovationScientifique});
       this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
       this.submitted = false;
       this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }



















































//openPopup
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeSavoir(typeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
                       if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
        this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesavoirEtInnovation(savoirEtInnovation: string) {
                      const isPermistted = await this.roleService.isPermitted('SavoirEtInnovation', 'add');
                       if(isPermistted){
         this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
        this.createSavoirEtInnovationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemodeDiffusion(modeDiffusion: string) {
                      const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'add');
                       if(isPermistted){
         this.selectedModeDiffusion = new ModeDiffusionVo();
        this.createModeDiffusionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleDeveloppementDeSavoir(roleDeveloppementDeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'add');
                       if(isPermistted){
         this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.createRoleDeveloppementDeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeUtilisateur(typeUtilisateur: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeUtilisateur', 'add');
                       if(isPermistted){
         this.selectedTypeUtilisateur = new TypeUtilisateurVo();
        this.createTypeUtilisateurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedSavoirEtInnovation(): SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;
       }
      set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
       }
       get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;
       }
      set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get createRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
       }
      set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
       }
       get selectedTypeUtilisateur(): TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
      set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }
       get typeUtilisateurs(): Array<TypeUtilisateurVo> {
           return this.typeUtilisateurService.typeUtilisateurs;
       }
       set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }
       get createTypeUtilisateurDialog(): boolean {
           return this.typeUtilisateurService.createTypeUtilisateurDialog;
       }
      set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if( this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo == null )
    this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = new Array();
    return this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo;
    }

    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
    this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = value;
    }
    get typeUtilisateurSavoirConcusVo(): Array<TypeUtilisateurSavoirConcuVo> {
    if( this._typeUtilisateurSavoirConcusVo == null )
    this._typeUtilisateurSavoirConcusVo = new Array();
    return this._typeUtilisateurSavoirConcusVo;
    }

    set typeUtilisateurSavoirConcusVo(value: Array<TypeUtilisateurSavoirConcuVo>) {
    this._typeUtilisateurSavoirConcusVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
    this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
    this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
    this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
    this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiquePayssVo(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    if( this._developpementDeSavoirEtInnovationScientifiquePayssVo == null )
    this._developpementDeSavoirEtInnovationScientifiquePayssVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiquePayssVo;
    }

    set developpementDeSavoirEtInnovationScientifiquePayssVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
    this._developpementDeSavoirEtInnovationScientifiquePayssVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueEtablissementsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo = new Array();
    return this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueEtablissementsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
    this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validRoleDeveloppementDeSavoirLibelle(): boolean {
    return this._validRoleDeveloppementDeSavoirLibelle;
    }

    set validRoleDeveloppementDeSavoirLibelle(value: boolean) {
    this._validRoleDeveloppementDeSavoirLibelle = value;
    }
    get validRoleDeveloppementDeSavoirCode(): boolean {
    return this._validRoleDeveloppementDeSavoirCode;
    }

    set validRoleDeveloppementDeSavoirCode(value: boolean) {
    this._validRoleDeveloppementDeSavoirCode = value;
    }
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }

}

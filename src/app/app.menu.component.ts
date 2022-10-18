import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modelchercheur : any[];
  modeladmin : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modelchercheur =
      [
              {
                label: 'Fournisseur appel projet recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Fournisseur appel projet recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/fournisseur-appel-projet-recherche/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Zone geographique formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/zone-geographique-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Key word discipline scientifique erc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Key word discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/key-word-discipline-scientifique-erc/list']
                    },
                ]
              },
              {
                label: 'Key word',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Key word',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/key-word/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Corps',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Corps',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/corps/list']
                    },
                ]
              },
              {
                label: 'Instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Enseignement nature',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement nature',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-nature/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Modalite intervention',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite intervention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/modalite-intervention/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique evenement colloque scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique evenement colloque scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-evenement-colloque-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type outil',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type outil',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-outil/list']
                    },
                ]
              },
              {
                label: 'Formation continue objet formation generique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue objet formation generique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue-objet-formation-generique/list']
                    },
                ]
              },
              {
                label: 'Niveau formation post bac',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau formation post bac',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/niveau-formation-post-bac/list']
                    },
                ]
              },
              {
                label: 'Pays rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Distinction',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/distinction/list']
                    },
                    {
                      label: 'Nouveau Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/distinction/create']
                    },
                ]
              },
              {
                label: 'Objet formation generique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Objet formation generique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/objet-formation-generique/list']
                    },
                ]
              },
              {
                label: 'Etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etudiant/list']
                    },
                ]
              },
              {
                label: 'Langue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Langue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/langue/list']
                    },
                ]
              },
              {
                label: 'Zone geographique conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/zone-geographique-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Contrat et convention ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Contrat et convention ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/contrat-et-convention-ird/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Status projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/status-projet/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique pays conception',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique pays conception',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-pays-conception/list']
                    },
                ]
              },
              {
                label: 'Etablissement partenaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement partenaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-partenaire/list']
                    },
                ]
              },
              {
                label: 'Campagne relance chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne relance chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-relance-chercheur/list']
                    },
                ]
              },
              {
                label: 'Commission scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commission scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/commission-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type instance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-instance/list']
                    },
                ]
              },
              {
                label: 'Publique formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/publique-formation/list']
                    },
                ]
              },
              {
                label: 'Status contrat et convention',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status contrat et convention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/status-contrat-et-convention/list']
                    },
                ]
              },
              {
                label: 'Publique cible',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique cible',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/publique-cible/list']
                    },
                ]
              },
              {
                label: 'Categorie faq',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Categorie faq',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/categorie-faq/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail institution co contractant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail institution co contractant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail-institution-co-contractant/list']
                    },
                ]
              },
              {
                label: 'Caracterisation developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Caracterisation developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-expertise-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite direction encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite direction encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-direction-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/vie-institutionnelle-detail-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Type etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-etude/list']
                    },
                ]
              },
              {
                label: 'Formation continue enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Structure ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Structure ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/structure-ird/list']
                    },
                ]
              },
              {
                label: 'Template ouverture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template ouverture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/template-ouverture/list']
                    },
                ]
              },
              {
                label: 'Rencontre media enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-media-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Notification',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Notification',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/notification/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Modalite',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/modalite/list']
                    },
                ]
              },
              {
                label: 'Doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/doctorant/list']
                    },
                ]
              },
              {
                label: 'Publique professionel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique professionel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/publique-professionel/list']
                    },
                ]
              },
              {
                label: 'Format rencontre',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Format rencontre',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/format-rencontre/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail etablissement lanceur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail etablissement lanceur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail-etablissement-lanceur/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/evenement-colloque-scienntifique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Departement scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Departement scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/departement-scientifique/list']
                    },
                ]
              },
              {
                label: 'Etat reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etat-reclamation/list']
                    },
                ]
              },
              {
                label: 'Zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Type savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-savoir/list']
                    },
                ]
              },
              {
                label: 'Niveau etude enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau etude enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/niveau-etude-enseignement/list']
                    },
                ]
              },
              {
                label: 'Nature expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/nature-expertise/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique mode diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique mode diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion/list']
                    },
                ]
              },
              {
                label: 'Mode diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Mode diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/mode-diffusion/list']
                    },
                ]
              },
              {
                label: 'Type expertise evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-expertise-evaluation/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-pedagogique-pays/list']
                    },
                ]
              },
              {
                label: 'Niveau responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/niveau-responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Pays commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-commanditaire/list']
                    },
                ]
              },
              {
                label: 'Expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/expertise/list']
                    },
                    {
                      label: 'Nouveau Expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/expertise/create']
                    },
                ]
              },
              {
                label: 'Campagne rappel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne rappel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-rappel/list']
                    },
                ]
              },
              {
                label: 'Categorie notification',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Categorie notification',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/categorie-notification/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-instrument-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Distinction etablissement pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Distinction etablissement pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/distinction-etablissement-pays/list']
                    },
                ]
              },
              {
                label: 'Structure oganisatrice',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Structure oganisatrice',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/structure-oganisatrice/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Zone geographique consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/zone-geographique-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Etat campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etat-campagne/list']
                    },
                ]
              },
              {
                label: 'Type entite administrative',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type entite administrative',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-entite-administrative/list']
                    },
                ]
              },
              {
                label: 'Rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique langue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique langue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-langue/list']
                    },
                ]
              },
              {
                label: 'Enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement/list']
                    },
                ]
              },
              {
                label: 'Role evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/role-evaluation/list']
                    },
                ]
              },
              {
                label: 'Encadrement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement/list']
                    },
                    {
                      label: 'Nouveau Encadrement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement/create']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-pays/list']
                    },
                ]
              },
              {
                label: 'Chercheur email',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur email',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/chercheur-email/list']
                    },
                ]
              },
              {
                label: 'Expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/expertise-scientifique/list']
                    },
                    {
                      label: 'Nouveau Expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/expertise-scientifique/create']
                    },
                ]
              },
              {
                label: 'Communaute savoir evenement colloque scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir evenement colloque scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-evenement-colloque-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type savoir developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type savoir developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/reclamation/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement/list']
                    },
                ]
              },
              {
                label: 'Pays rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Objet formation generique de responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Objet formation generique de responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/objet-formation-generique-de-responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Contexte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Contexte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/contexte/list']
                    },
                ]
              },
              {
                label: 'Formation continue discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Template cloture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template cloture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/template-cloture/list']
                    },
                ]
              },
              {
                label: 'Type expert',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-expert/list']
                    },
                ]
              },
              {
                label: 'Pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays/list']
                    },
                ]
              },
              {
                label: 'Type outil pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type outil pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-outil-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Semantic relationship',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Semantic relationship',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/semantic-relationship/list']
                    },
                ]
              },
              {
                label: 'Pays formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Type utilisateur savoir concu',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type utilisateur savoir concu',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-utilisateur-savoir-concu/list']
                    },
                ]
              },
              {
                label: 'Gestion equipe',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Gestion equipe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/gestion-equipe/list']
                    },
                    {
                      label: 'Nouveau Gestion equipe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/gestion-equipe/create']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Template relance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template relance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/template-relance/list']
                    },
                ]
              },
              {
                label: 'Nature etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/nature-etude/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche/list']
                    },
                    {
                      label: 'Nouveau Projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche/create']
                    },
                ]
              },
              {
                label: 'Discipline scientifique encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Entite administrative',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Entite administrative',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/entite-administrative/list']
                    },
                ]
              },
              {
                label: 'Enseignement zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/chercheur/list']
                    },
                ]
              },
              {
                label: 'Role developpement de savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role developpement de savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/role-developpement-de-savoir/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Financement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Financement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/financement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Faq',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Faq',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/faq/list']
                    },
                ]
              },
              {
                label: 'Zone activite interaction recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone activite interaction recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/zone-activite-interaction-recherche/list']
                    },
                ]
              },
              {
                label: 'Sexe',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Sexe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/sexe/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique publique cible',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique publique cible',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-publique-cible/list']
                    },
                ]
              },
              {
                label: 'Type publique culture scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-publique-culture-scientifique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement-etudiant-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Gestion equipe detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Gestion equipe detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/gestion-equipe-detail/list']
                    },
                ]
              },
              {
                label: 'Institution',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Institution',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/institution/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/vie-institutionnelle-detail-etablissement/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-erc/list']
                    },
                ]
              },
              {
                label: 'Enseignement et formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement et formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-et-formation/list']
                    },
                    {
                      label: 'Nouveau Enseignement et formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-et-formation/create']
                    },
                ]
              },
              {
                label: 'Etablissement comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Identifiant auteur expert',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Identifiant auteur expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/identifiant-auteur-expert/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique parent',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-parent/list']
                    },
                ]
              },
              {
                label: 'Identifiant recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Identifiant recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/identifiant-recherche/list']
                    },
                ]
              },
              {
                label: 'Type utilisateur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type utilisateur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-utilisateur/list']
                    },
                ]
              },
              {
                label: 'Campagne chercheur ouverture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne chercheur ouverture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-chercheur-ouverture/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Culture scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/culture-scientifique/list']
                    },
                    {
                      label: 'Nouveau Culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/culture-scientifique/create']
                    },
                ]
              },
              {
                label: 'Niveau etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/niveau-etude/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement-etudiant-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Rencontre media periode',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media periode',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-media-periode/list']
                    },
                ]
              },
              {
                label: 'Type expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-expertise/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/evenement-colloque-scienntifique/list']
                    },
                ]
              },
              {
                label: 'Instrument ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/instrument-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Role comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/role-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc parent',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-erc-parent/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir projet activite recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-projet-activite-recherche/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-pedagogique-etablissement/list']
                    },
                ]
              },
              {
                label: 'Conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Pays organisateur rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays organisateur rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-expertise-scientifique/list']
                    },
                ]
              },
              {
                label: 'Modalite etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/modalite-etude/list']
                    },
                ]
              },
              {
                label: 'Status cursus',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status cursus',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/status-cursus/list']
                    },
                ]
              },
              {
                label: 'Type etude enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type etude enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-etude-enseignement/list']
                    },
                ]
              },
              {
                label: 'Instruments et dispositifs ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instruments et dispositifs ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/instruments-et-dispositifs-ird/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/vie-institutionnelle-detail/list']
                    },
                ]
              },
              {
                label: 'Caracterisation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Caracterisation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/caracterisation/list']
                    },
                ]
              },
              {
                label: 'Nationalite',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nationalite',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/nationalite/list']
                    },
                ]
              },
              {
                label: 'Modalite formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/modalite-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Type expertise evaluation comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise evaluation comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-expertise-evaluation-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Instrument ird comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/instrument-ird-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir/list']
                    },
                ]
              },
              {
                label: 'Nature enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/nature-enseignement/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/evenement-colloque-scienntifique-pays/list']
                    },
                ]
              },
              {
                label: 'Instrument ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/instrument-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Campagne chercheur fermeture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne chercheur fermeture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-chercheur-fermeture/list']
                    },
                ]
              },
              {
                label: 'Template rappel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template rappel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/template-rappel/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique periode',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique periode',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique-periode/list']
                    },
                ]
              },
              {
                label: 'Type publique rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-publique-rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Savoir et innovation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Savoir et innovation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/savoir-et-innovation/list']
                    },
                    {
                      label: 'Nouveau Savoir et innovation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/savoir-et-innovation/create']
                    },
                ]
              },
              {
                label: 'Etat etape campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat etape campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etat-etape-campagne/list']
                    },
                ]
              },
              {
                label: 'Rencontre media discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-media-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/commanditaire/list']
                    },
                ]
              },
              {
                label: 'Grade',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Grade',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/grade/list']
                    },
                ]
              },
              {
                label: 'Etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement/list']
                    },
                ]
              },
              {
                label: 'Type enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-enseignement/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/communaute-savoir-chercheur/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Type reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-reclamation/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc association',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc association',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-erc-association/list']
                    },
                ]
              },
              {
                label: 'Affectation structurelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Affectation structurelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/affectation-structurelle/list']
                    },
                ]
              },
              {
                label: 'Role projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/role-projet/list']
                    },
                ]
              },
              {
                label: 'Master international',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Master international',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/master-international/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail-pays/list']
                    },
                ]
              },
              {
                label: 'Type participation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type participation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-participation/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/projet-activite-recherche-detail/list']
                    },
                ]
              },
              {
                label: 'Type publique rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-publique-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Enseignement enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-instrument-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique pays diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique pays diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/outil-pedagogique-pays-diffusion/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-chercheur/list']
                    },
                ]
              },
              {
                label: 'Encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique communaute savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique communaute savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir/list']
                    },
                ]
              },
              {
                label: 'Campagne rappel chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne rappel chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-rappel-chercheur/list']
                    },
                ]
              },
              {
                label: 'Pays zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/pays-zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Niveau formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/niveau-formation/list']
                    },
                ]
              },
              {
                label: 'Responsabilite encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Enseignement discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enseignement-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/vie-institutionnelle/list']
                    },
                    {
                      label: 'Nouveau Vie institutionnelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/vie-institutionnelle/create']
                    },
                ]
              },
              {
                label: 'Campagne relance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne relance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne-relance/list']
                    },
                ]
              },
              {
                label: 'Ville',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Ville',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/ville/list']
                    },
                ]
              },
              {
                label: 'Formation continue publique professionel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue publique professionel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue-publique-professionel/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/enjeux-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Etat campagne chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat campagne chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etat-campagne-chercheur/list']
                    },
                ]
              },
              {
                label: 'Formation continue commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue-commanditaire/list']
                    },
                ]
              },
              {
                label: 'Etablissement enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-enseignement/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/discipline-scientifique-conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/type-publique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Etablissement conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/responsabilite-pedagogique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Etablissement projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-projet/list']
                    },
                ]
              },
              {
                label: 'Nature activite grand publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature activite grand publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/nature-activite-grand-publique/list']
                    },
                ]
              },
              {
                label: 'Consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Etablissement consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/etablissement-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/campagne/list']
                    },
                ]
              },
              {
                label: 'Comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formation-continue/list']
                    },
                ]
              },
    ]
    this.modeladmin =
      [
              {
                label: 'Fournisseur appel projet recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Fournisseur appel projet recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/fournisseur-appel-projet-recherche/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Zone geographique formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/zone-geographique-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Key word discipline scientifique erc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Key word discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/key-word-discipline-scientifique-erc/list']
                    },
                ]
              },
              {
                label: 'Key word',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Key word',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/key-word/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Corps',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Corps',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/corps/list']
                    },
                ]
              },
              {
                label: 'Instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Enseignement nature',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement nature',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-nature/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Modalite intervention',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite intervention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/modalite-intervention/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique evenement colloque scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique evenement colloque scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-evenement-colloque-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type outil',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type outil',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-outil/list']
                    },
                ]
              },
              {
                label: 'Formation continue objet formation generique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue objet formation generique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue-objet-formation-generique/list']
                    },
                ]
              },
              {
                label: 'Niveau formation post bac',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau formation post bac',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/niveau-formation-post-bac/list']
                    },
                ]
              },
              {
                label: 'Pays rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Distinction',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/distinction/list']
                    },
                    {
                      label: 'Nouveau Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/distinction/create']
                    },
                ]
              },
              {
                label: 'Objet formation generique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Objet formation generique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/objet-formation-generique/list']
                    },
                ]
              },
              {
                label: 'Etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etudiant/list']
                    },
                ]
              },
              {
                label: 'Langue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Langue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/langue/list']
                    },
                ]
              },
              {
                label: 'Zone geographique conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/zone-geographique-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Contrat et convention ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Contrat et convention ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/contrat-et-convention-ird/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Status projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/status-projet/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique pays conception',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique pays conception',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-pays-conception/list']
                    },
                ]
              },
              {
                label: 'Etablissement partenaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement partenaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-partenaire/list']
                    },
                ]
              },
              {
                label: 'Campagne relance chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne relance chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-relance-chercheur/list']
                    },
                ]
              },
              {
                label: 'Commission scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commission scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/commission-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type instance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-instance/list']
                    },
                ]
              },
              {
                label: 'Publique formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/publique-formation/list']
                    },
                ]
              },
              {
                label: 'Status contrat et convention',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status contrat et convention',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/status-contrat-et-convention/list']
                    },
                ]
              },
              {
                label: 'Publique cible',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique cible',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/publique-cible/list']
                    },
                ]
              },
              {
                label: 'Categorie faq',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Categorie faq',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/categorie-faq/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail institution co contractant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail institution co contractant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail-institution-co-contractant/list']
                    },
                ]
              },
              {
                label: 'Caracterisation developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Caracterisation developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/caracterisation-developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-expertise-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite direction encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite direction encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-direction-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/vie-institutionnelle-detail-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Type etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-etude/list']
                    },
                ]
              },
              {
                label: 'Formation continue enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Structure ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Structure ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/structure-ird/list']
                    },
                ]
              },
              {
                label: 'Template ouverture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template ouverture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/template-ouverture/list']
                    },
                ]
              },
              {
                label: 'Rencontre media enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-media-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Notification',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Notification',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/notification/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Modalite',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/modalite/list']
                    },
                ]
              },
              {
                label: 'Doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/doctorant/list']
                    },
                ]
              },
              {
                label: 'Publique professionel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Publique professionel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/publique-professionel/list']
                    },
                ]
              },
              {
                label: 'Format rencontre',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Format rencontre',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/format-rencontre/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail etablissement lanceur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail etablissement lanceur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail-etablissement-lanceur/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/evenement-colloque-scienntifique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Departement scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Departement scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/departement-scientifique/list']
                    },
                ]
              },
              {
                label: 'Etat reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etat-reclamation/list']
                    },
                ]
              },
              {
                label: 'Zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Type savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-savoir/list']
                    },
                ]
              },
              {
                label: 'Niveau etude enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau etude enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/niveau-etude-enseignement/list']
                    },
                ]
              },
              {
                label: 'Nature expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/nature-expertise/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique mode diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique mode diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion/list']
                    },
                ]
              },
              {
                label: 'Mode diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Mode diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/mode-diffusion/list']
                    },
                ]
              },
              {
                label: 'Type expertise evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-expertise-evaluation/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-pedagogique-pays/list']
                    },
                ]
              },
              {
                label: 'Niveau responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/niveau-responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Pays commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-commanditaire/list']
                    },
                ]
              },
              {
                label: 'Expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/expertise/list']
                    },
                    {
                      label: 'Nouveau Expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/expertise/create']
                    },
                ]
              },
              {
                label: 'Campagne rappel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne rappel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-rappel/list']
                    },
                ]
              },
              {
                label: 'Categorie notification',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Categorie notification',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/categorie-notification/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-instrument-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Distinction etablissement pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Distinction etablissement pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/distinction-etablissement-pays/list']
                    },
                ]
              },
              {
                label: 'Structure oganisatrice',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Structure oganisatrice',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/structure-oganisatrice/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Zone geographique consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone geographique consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/zone-geographique-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Etat campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etat-campagne/list']
                    },
                ]
              },
              {
                label: 'Type entite administrative',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type entite administrative',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-entite-administrative/list']
                    },
                ]
              },
              {
                label: 'Rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique langue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique langue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-langue/list']
                    },
                ]
              },
              {
                label: 'Enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement/list']
                    },
                ]
              },
              {
                label: 'Role evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/role-evaluation/list']
                    },
                ]
              },
              {
                label: 'Encadrement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement/list']
                    },
                    {
                      label: 'Nouveau Encadrement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement/create']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-pays/list']
                    },
                ]
              },
              {
                label: 'Chercheur email',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur email',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/chercheur-email/list']
                    },
                ]
              },
              {
                label: 'Expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/expertise-scientifique/list']
                    },
                    {
                      label: 'Nouveau Expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/expertise-scientifique/create']
                    },
                ]
              },
              {
                label: 'Communaute savoir evenement colloque scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir evenement colloque scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-evenement-colloque-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type savoir developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type savoir developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-savoir-developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/reclamation/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-etablissement/list']
                    },
                ]
              },
              {
                label: 'Pays rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Objet formation generique de responsabilite pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Objet formation generique de responsabilite pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/objet-formation-generique-de-responsabilite-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Contexte',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Contexte',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/contexte/list']
                    },
                ]
              },
              {
                label: 'Formation continue discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Template cloture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template cloture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/template-cloture/list']
                    },
                ]
              },
              {
                label: 'Type expert',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-expert/list']
                    },
                ]
              },
              {
                label: 'Pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays/list']
                    },
                ]
              },
              {
                label: 'Type outil pedagogique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type outil pedagogique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-outil-pedagogique/list']
                    },
                ]
              },
              {
                label: 'Semantic relationship',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Semantic relationship',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/semantic-relationship/list']
                    },
                ]
              },
              {
                label: 'Pays formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Type utilisateur savoir concu',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type utilisateur savoir concu',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-utilisateur-savoir-concu/list']
                    },
                ]
              },
              {
                label: 'Gestion equipe',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Gestion equipe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/gestion-equipe/list']
                    },
                    {
                      label: 'Nouveau Gestion equipe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/gestion-equipe/create']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Template relance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template relance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/template-relance/list']
                    },
                ]
              },
              {
                label: 'Nature etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/nature-etude/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche/list']
                    },
                    {
                      label: 'Nouveau Projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche/create']
                    },
                ]
              },
              {
                label: 'Discipline scientifique encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Entite administrative',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Entite administrative',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/entite-administrative/list']
                    },
                ]
              },
              {
                label: 'Enseignement zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/chercheur/list']
                    },
                ]
              },
              {
                label: 'Role developpement de savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role developpement de savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/role-developpement-de-savoir/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir encadrement etudiant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir encadrement etudiant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-encadrement-etudiant/list']
                    },
                ]
              },
              {
                label: 'Financement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Financement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/financement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Faq',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Faq',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/faq/list']
                    },
                ]
              },
              {
                label: 'Zone activite interaction recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Zone activite interaction recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/zone-activite-interaction-recherche/list']
                    },
                ]
              },
              {
                label: 'Sexe',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Sexe',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/sexe/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique publique cible',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique publique cible',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-publique-cible/list']
                    },
                ]
              },
              {
                label: 'Type publique culture scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-publique-culture-scientifique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement-etudiant-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Gestion equipe detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Gestion equipe detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/gestion-equipe-detail/list']
                    },
                ]
              },
              {
                label: 'Institution',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Institution',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/institution/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/vie-institutionnelle-detail-etablissement/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-erc/list']
                    },
                ]
              },
              {
                label: 'Enseignement et formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement et formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-et-formation/list']
                    },
                    {
                      label: 'Nouveau Enseignement et formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-et-formation/create']
                    },
                ]
              },
              {
                label: 'Etablissement comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Identifiant auteur expert',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Identifiant auteur expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/identifiant-auteur-expert/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique parent',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-parent/list']
                    },
                ]
              },
              {
                label: 'Identifiant recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Identifiant recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/identifiant-recherche/list']
                    },
                ]
              },
              {
                label: 'Type utilisateur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type utilisateur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-utilisateur/list']
                    },
                ]
              },
              {
                label: 'Campagne chercheur ouverture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne chercheur ouverture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-chercheur-ouverture/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Culture scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/culture-scientifique/list']
                    },
                    {
                      label: 'Nouveau Culture scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/culture-scientifique/create']
                    },
                ]
              },
              {
                label: 'Niveau etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/niveau-etude/list']
                    },
                ]
              },
              {
                label: 'Encadrement etudiant enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement etudiant enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement-etudiant-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Rencontre media periode',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media periode',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-media-periode/list']
                    },
                ]
              },
              {
                label: 'Type expertise',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-expertise/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/evenement-colloque-scienntifique/list']
                    },
                ]
              },
              {
                label: 'Instrument ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/instrument-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Role comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/role-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc parent',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-erc-parent/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir projet activite recherche',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir projet activite recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-projet-activite-recherche/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-pedagogique-etablissement/list']
                    },
                ]
              },
              {
                label: 'Conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Pays organisateur rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays organisateur rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-organisateur-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir expertise scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir expertise scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-expertise-scientifique/list']
                    },
                ]
              },
              {
                label: 'Modalite etude',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite etude',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/modalite-etude/list']
                    },
                ]
              },
              {
                label: 'Status cursus',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Status cursus',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/status-cursus/list']
                    },
                ]
              },
              {
                label: 'Type etude enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type etude enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-etude-enseignement/list']
                    },
                ]
              },
              {
                label: 'Instruments et dispositifs ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instruments et dispositifs ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/instruments-et-dispositifs-ird/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/vie-institutionnelle-detail/list']
                    },
                ]
              },
              {
                label: 'Caracterisation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Caracterisation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/caracterisation/list']
                    },
                ]
              },
              {
                label: 'Nationalite',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nationalite',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/nationalite/list']
                    },
                ]
              },
              {
                label: 'Modalite formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Modalite formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/modalite-formation-continue/list']
                    },
                ]
              },
              {
                label: 'Type expertise evaluation comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type expertise evaluation comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-expertise-evaluation-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Instrument ird comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/instrument-ird-comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir/list']
                    },
                ]
              },
              {
                label: 'Nature enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/nature-enseignement/list']
                    },
                ]
              },
              {
                label: 'Evenement colloque scienntifique pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Evenement colloque scienntifique pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/evenement-colloque-scienntifique-pays/list']
                    },
                ]
              },
              {
                label: 'Instrument ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Instrument ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/instrument-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Campagne chercheur fermeture',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne chercheur fermeture',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-chercheur-fermeture/list']
                    },
                ]
              },
              {
                label: 'Template rappel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Template rappel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/template-rappel/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique periode',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique periode',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique-periode/list']
                    },
                ]
              },
              {
                label: 'Type publique rencontre media',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique rencontre media',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-publique-rencontre-media/list']
                    },
                ]
              },
              {
                label: 'Savoir et innovation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Savoir et innovation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/savoir-et-innovation/list']
                    },
                    {
                      label: 'Nouveau Savoir et innovation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/savoir-et-innovation/create']
                    },
                ]
              },
              {
                label: 'Etat etape campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat etape campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etat-etape-campagne/list']
                    },
                ]
              },
              {
                label: 'Rencontre media discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre media discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-media-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/commanditaire/list']
                    },
                ]
              },
              {
                label: 'Grade',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Grade',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/grade/list']
                    },
                ]
              },
              {
                label: 'Etablissement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement/list']
                    },
                ]
              },
              {
                label: 'Type enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-enseignement/list']
                    },
                ]
              },
              {
                label: 'Communaute savoir chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Communaute savoir chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/communaute-savoir-chercheur/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Type reclamation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type reclamation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-reclamation/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique erc association',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique erc association',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-erc-association/list']
                    },
                ]
              },
              {
                label: 'Affectation structurelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Affectation structurelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/affectation-structurelle/list']
                    },
                ]
              },
              {
                label: 'Role projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Role projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/role-projet/list']
                    },
                ]
              },
              {
                label: 'Master international',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Master international',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/master-international/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail pays',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail pays',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail-pays/list']
                    },
                ]
              },
              {
                label: 'Type participation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type participation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-participation/list']
                    },
                ]
              },
              {
                label: 'Projet activite recherche detail',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Projet activite recherche detail',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/projet-activite-recherche-detail/list']
                    },
                ]
              },
              {
                label: 'Type publique rencontre grand publique jeune publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique rencontre grand publique jeune publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-publique-rencontre-grand-publique-jeune-publique/list']
                    },
                ]
              },
              {
                label: 'Enseignement enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Type instrument ird consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type instrument ird consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-instrument-ird-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Outil pedagogique pays diffusion',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Outil pedagogique pays diffusion',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/outil-pedagogique-pays-diffusion/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-chercheur/list']
                    },
                ]
              },
              {
                label: 'Encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Developpement de savoir et innovation scientifique communaute savoir',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Developpement de savoir et innovation scientifique communaute savoir',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir/list']
                    },
                ]
              },
              {
                label: 'Campagne rappel chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne rappel chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-rappel-chercheur/list']
                    },
                ]
              },
              {
                label: 'Pays zone geographique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Pays zone geographique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/pays-zone-geographique/list']
                    },
                ]
              },
              {
                label: 'Niveau formation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Niveau formation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/niveau-formation/list']
                    },
                ]
              },
              {
                label: 'Responsabilite encadrement doctorant',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite encadrement doctorant',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-encadrement-doctorant/list']
                    },
                ]
              },
              {
                label: 'Enseignement discipline scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enseignement discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enseignement-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'Vie institutionnelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Vie institutionnelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/vie-institutionnelle/list']
                    },
                    {
                      label: 'Nouveau Vie institutionnelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/vie-institutionnelle/create']
                    },
                ]
              },
              {
                label: 'Campagne relance',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne relance',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne-relance/list']
                    },
                ]
              },
              {
                label: 'Ville',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Ville',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/ville/list']
                    },
                ]
              },
              {
                label: 'Formation continue publique professionel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue publique professionel',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue-publique-professionel/list']
                    },
                ]
              },
              {
                label: 'Enjeux ird chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/enjeux-ird-chercheur/list']
                    },
                ]
              },
              {
                label: 'Etat campagne chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etat campagne chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etat-campagne-chercheur/list']
                    },
                ]
              },
              {
                label: 'Formation continue commanditaire',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue commanditaire',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue-commanditaire/list']
                    },
                ]
              },
              {
                label: 'Etablissement enseignement',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement enseignement',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-enseignement/list']
                    },
                ]
              },
              {
                label: 'Discipline scientifique conseil et comite scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Discipline scientifique conseil et comite scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/discipline-scientifique-conseil-et-comite-scientifique/list']
                    },
                ]
              },
              {
                label: 'Type publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Type publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/type-publique/list']
                    },
                ]
              },
              {
                label: 'Rencontre grand publique jeune publique type instrument ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Rencontre grand publique jeune publique type instrument ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/rencontre-grand-publique-jeune-publique-type-instrument-ird/list']
                    },
                ]
              },
              {
                label: 'Etablissement conseils scientifique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement conseils scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-conseils-scientifique/list']
                    },
                ]
              },
              {
                label: 'Responsabilite pedagogique enjeux ird',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Responsabilite pedagogique enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/responsabilite-pedagogique-enjeux-ird/list']
                    },
                ]
              },
              {
                label: 'Etablissement projet',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement projet',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-projet/list']
                    },
                ]
              },
              {
                label: 'Nature activite grand publique',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Nature activite grand publique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/nature-activite-grand-publique/list']
                    },
                ]
              },
              {
                label: 'Consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Etablissement consultance scientifique ponctuelle',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Etablissement consultance scientifique ponctuelle',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/etablissement-consultance-scientifique-ponctuelle/list']
                    },
                ]
              },
              {
                label: 'Campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/campagne/list']
                    },
                ]
              },
              {
                label: 'Comite et commission evaluation',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Comite et commission evaluation',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/comite-et-commission-evaluation/list']
                    },
                ]
              },
              {
                label: 'Formation continue',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Formation continue',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/admin/formation-continue/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}

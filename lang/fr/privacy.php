<?php

declare(strict_types=1);

return [
    'page_title' => 'Politique de Confidentialité',

    'last_updated' => 'Dernière mise à jour : 5 août 2026',

    'intro' => 'Cette Politique de Confidentialité décrit comment Ai Digiweb SARL (« nous », « notre ») collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre plateforme TryPost (le « Service »).',

    'sections' => [

        'data_collection' => [
            'title' => '1. Quelles Données Nous Collectons',
            'content' => 'Nous collectons les types de données suivants :',
            'items' => [
                'Informations de compte : Nom, adresse e-mail et mot de passe lors de la création de votre compte.',
                'Comptes de réseaux sociaux : Jetons OAuth et identifiants de comptes lorsque vous connectez des plateformes de réseaux sociaux (Instagram, Facebook, X/Twitter, TikTok, LinkedIn, YouTube, Pinterest, Telegram, Discord, Mastodon, Bluesky, Threads).',
                'Données de contenu : Publications, légendes, images, vidéos et autres médias que vous créez ou téléchargez via le Service.',
                'Données d\'utilisation : Pages visitées, fonctionnalités utilisées, horodatages et schémas d\'interaction au sein du Service.',
                'Informations sur l\'appareil : Type de navigateur, système d\'exploitation, adresse IP et identifiants de l\'appareil.',
                'Données d\'utilisation de l\'IA : Prompts, contenu généré et métriques de consommation des services IA.',
                'Informations de facturation : Détails de paiement traités par Stripe (nous ne stockons pas les numéros de carte de crédit complets).',
                'Données de communication : Demandes de support et commentaires que vous nous envoyez.',
            ],
        ],

        'data_use' => [
            'title' => '2. Pourquoi Nous Les Collectons',
            'content' => 'Nous collectons vos données pour :',
            'items' => [
                'Fournir, exploiter et maintenir le Service.',
                'Planifier et publier du contenu sur vos comptes de réseaux sociaux connectés.',
                'Générer du contenu, des images et des vidéos alimentés par l\'IA en votre nom.',
                'Traiter la facturation et gérer votre abonnement.',
                'Envoyer des notifications liées au service (statut des publications, alertes de compte).',
                'Améliorer et optimiser le Service.',
                'Se conformer aux obligations légales.',
            ],
        ],

        'data_usage' => [
            'title' => '3. Comment Nous Les Utilisons',
            'content' => 'Vos données sont utilisées uniquement aux fins décrites dans cette politique. Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager les données uniquement avec :',
            'items' => [
                'Plateformes de réseaux sociaux : Pour publier du contenu en votre nom lorsque vous nous y autorisez.',
                'Fournisseurs de services IA : Pour générer du contenu lorsque vous utilisez les fonctionnalités IA.',
                'Processeur de paiement (Stripe) : Pour gérer les abonnements et la facturation.',
                'Fournisseurs d\'infrastructure : Pour l\'hébergement, le stockage et la fourniture du service.',
            ],
        ],

        'data_retention' => [
            'title' => '4. Conservation des Données',
            'content' => 'Nous conservons vos données personnelles tant que votre compte est actif. Lorsque vous supprimez votre compte, nous supprimons définitivement vos données personnelles dans les 30 jours, sauf si la conservation est requise par la loi. Le contenu généré par l\'IA et les journaux d\'utilisation peuvent être conservés jusqu\'à 90 jours à des fins d\'amélioration du service.',
        ],

        'data_deletion' => [
            'title' => '5. Demande de Suppression des Données',
            'content' => 'Vous avez le droit de demander la suppression de vos données personnelles à tout moment. Pour ce faire :',
            'items' => [
                'Envoyez-nous un e-mail à contact@mail.nishe.com avec l\'objet « Demande de suppression de données ».',
                'Incluez l\'adresse e-mail de votre compte et une demande claire de suppression des données.',
                'Nous traiterons votre demande dans les 30 jours et confirmerons la suppression par e-mail.',
                'Vous pouvez également supprimer votre compte directement depuis la page Paramètres du Service.',
            ],
        ],

        'data_security' => [
            'title' => '6. Sécurité des Données',
            'content' => 'Nous mettons en œuvre des mesures de sécurité conformes aux normes de l\'industrie pour protéger vos données, notamment le chiffrement en transit (TLS/SSL), le chiffrement au repos, les contrôles d\'accès et des audits de sécurité réguliers. Cependant, aucune méthode de transmission sur Internet n\'est sécurisée à 100 %.',
        ],

        'cookies' => [
            'title' => '7. Cookies',
            'content' => 'Nous utilisons des cookies essentiels pour maintenir votre session et vos préférences. Nous n\'utilisons pas de cookies de suivi ou de publicité. Vous pouvez gérer les paramètres des cookies via votre navigateur.',
        ],

        'children' => [
            'title' => '8. Confidentialité des Enfants',
            'content' => 'Le Service n\'est pas destiné aux utilisateurs de moins de 16 ans. Nous ne collectons pas sciemment de données auprès des enfants.',
        ],

        'changes' => [
            'title' => '9. Modifications de Cette Politique',
            'content' => 'Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons des changements importants en publiant la nouvelle politique sur cette page et en mettant à jour la date de « Dernière mise à jour ».',
        ],

        'contact' => [
            'title' => '10. Coordonnées',
            'content' => 'Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter :',
            'company' => 'Ai Digiweb SARL',
            'rc' => 'Registre du Commerce (RC) : 146891',
            'if' => 'Identifiant Fiscal (I.F) : 60284126',
            'tp' => 'Taxe Professionnelle (T.P) : 46490826',
            'address' => 'Houmte Lamwarid, Tamslouhte, Al Haouz, Marrakech',
            'email' => 'contact@mail.nishe.com',
            'phone' => '+212 636347318',
        ],
    ],
];

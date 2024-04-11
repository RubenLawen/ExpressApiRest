# Express API REST

## Toutes les routes

#### GET

* /personnage

#### POST

* /register
* /login

## Fonctionnement

#### /personnage

Renvoi un personnage au hasard depuis la base de donnée

| Field |  Type  | Description |
| ----- | ------ |-------------|
| Token | String | Token généré par l'api après le login.


#### /register

Permet de crée un compte

| Field |  Type  | Description |
| ----- | ------ |-------------|
| pseudo | String | Pseudo de l'utilisateur du compte, doit être plus entre 4 et 25 caractère
| email  | String | Email de l'utilisateur du compte.
| password | String | Mot de passe de l'utilisateur du compte, doit contenir un caractère spécial, une majuscule et être plus grand que 4 

#### /login

Permet de se connecter et générer un token

| Field |  Type  | Description |
| ----- | ------ |-------------|
| email  | String | Email de l'utilisateur du compte.
| password | String | mot de passe du compte.

#### /deleteUser

Permet de supprimer de la base de donnée un compte si il a les accès.

| Field |  Type  | Description |
| ----- | ------ |-------------.|
| email  | String | Email ciblé
| token | String | Token généré par l'api après le login.


## Pour lancer les tests

Ouvre le cmd et tapez:

```
npm run test
```
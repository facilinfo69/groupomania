Projet Test Groupomania - openclassrooms


Dossier Central
Créez un dossier nommé groupomania. 
Cloner le projet suivant :  https://github.com/facilinfo69/groupomania.git

Dossier Backend
Installation
•	Installer Node.js sur votre machine
•	Cd backend :
	o	Installer les packages nécessaires :npm install 
		(express, multer, mongoose, mongoose-unique-validator, bcrypt, jsonwebtoken, dotenv, helmet, password-validator)

Configuration de la base de données MongoDb Atlas :
Dupliquer le fichier .env en le renommant .env.local
Dans le fichier .env.local, ajoutez vos variables d'environnement comme ci-dessous :
_USER="PhilippeS"
_PASSWORD="PhilTest"

Et enfin :
•	lancez le serveur: nodemon server
•	Exécution de l’api sur http://localhost:3000


Dossier Frontend
Ouvrez un terminal dans le dossier groupomania/frontend

•	Installer react : npm install 
•	Lancer la commande npm start

Le serveur est accessible en local via le port 3200 : http://localhost:3200/



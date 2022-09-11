Dossier Central
Créez un dossier nommé groupomania. 
Cloner le projet suivant :  https://github.com/facilinfo69/groupomania.git

Dossier Backend

Installation
•	Installer Node.js sur votre machine
•	Cd backend :
	o	Chargez le package nodemon : npm install -g nodemon
	o	Installer Express.js : npm install --save express
	o	Pour le téléchargement de fichiers, installez  Multer : npm install --save multer
	o	Pour accéder à la BDD, Installer mongoose : npm install mongoose

	Pour la sécurité de l'application, installez:
			npm install mongoose-unique-validator 
			npm install bcrypt 
			npm install jsonwebtoken 
			npm install dotenv –save 
			npm install helmet 
			npm install password-validator 

Configuration de la base de données :
Dans le fichier .env, ajoutez vos variables d'environnement comme ci-dessous :
_USER="PhilippeS"
_PASSWORD="PhilTest"

Dans le dossier backend, pour stocker les images, ajouter un dossier images.

Et enfin :
•	lancez le serveur: nodemon server
•	Exécution de l’api sur http://localhost:3000


Dossier Frontend
Ouvrez un terminal dans le dossier groupomania/frontend

•	Installer react : npm install -g create-react-app.
•	Installer react rooter : npm install react-router-dom@6
•	Lancer la commande npm start

Le serveur est accessible en local via le port 3200 : http://localhost :3200/



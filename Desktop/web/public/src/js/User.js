import { Ajax } from './Ajax.js';

export class User {

    constructor() {
        this.ajax = new Ajax();
    }
    choice(name){

        if (name === "btn-signUp"){
            this.signUp(name)
        }
        if (name === "btn-signIn"){
            this.signIn(name)
        }
    }
    signUp(button) {
        this.getButton = document.getElementById(button);
        this.getButton.addEventListener('click', (event) => {
            event.preventDefault();
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            let formData = JSON.stringify({
                email: email,
                password: password
            });

            this.ajax.post(formData,"../../../api/index.php?route=post_user").then((data) => {
                if(data === 0){
                    console.log('Utilisateur existant')
                    let avertElement = document.getElementById("avert");
                    avertElement.hidden = false;
                }else{
                    console.log('Utilisateur crée')
                    window.location.href = "../html/connexion.html"

                }
            });
        });
    }

    signIn(button) {
        this.getButton = document.getElementById(button);
        this.getButton.addEventListener('click', (event) => {
            event.preventDefault();
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            let url = "../../../api/index.php?route=verify_user&email="+email+"&password="+password
            this.ajax.get(url).then((data) => {
                console.log(data)

               if(data === -1){
                   let avertElement = document.getElementById("avert");
                   avertElement.hidden = false;
               }else{
                   window.location.href = window.location.origin+ "/public/src/html/index.html"

               }
            });
        });
    }
}
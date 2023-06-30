import {Ajax} from "./Ajax";

export class Component {
    constructor() {
        this.ajax = new Ajax();
        console.log('Component initié')
    }

    addHeader() {
        this.ajax.get("../../../api/index.php?route=getId_user").then((data) => {
            console.log('SESSION : '+data)
            if(data === -1){
                let headerElement = document.querySelector('header');
                headerElement.innerHTML = "<header class=\"  bg-white\">\n" +
                    "\n" +
                    "    <div class=\"flex flex-row justify-between  pb-1\">\n" +
                    "        <div class=\"flex flex-row \">\n" +
                    "            <div class=\"ml-2 pt-1\">\n" +
                    "                <img alt='' width=\"40\" height=\"40\" src=\"/public/assets/images/logo.svg\">\n" +
                    "            </div>\n" +
                    "            <div class=\"flex flex-col\">\n" +
                    "            <div class=\"text-2xl mt-1 ml-1\">\n" +
                    "                RiskAnalyzer\n" +
                    "            </div>\n" +
                    "            <div class=\"text-sm pl-1 italic\">\n" +
                    "                <div>Analyser</div>\n" +
                    "                <div>Prédire</div>\n" +
                    "                <div>Prévenir</div>\n" +
                    "            </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "        <button class=\"mr-4 btn-red hidden-md\">Déconnecté</button>\n" +
                    "    </div>\n" +
                    "\n" +
                    "    <div  class=\"header-2\">\n" +
                    "        <div  class=\"pt-2 pb-2 hover-blue flex flex-row gap-1\">" +
                    "<img width=\"20\" height=\"20\"  src=\"https://img.icons8.com/ios/50/create-new.png\" alt=\"create-new\"/>\n" +
                    "<a href=\"connexion.html\">Ajouter accident</a>\n" +
                    "        </div>\n" +
                    "        <div class=\"pt-2 pb-2 hover-blue flex flex-row gap-1\">" +
                    "<div><img width=\"20\" height=\"20\" src=\"https://img.icons8.com/ios/50/view-delivery.png\" alt=\"view-delivery\"/></div>\n" +
                    "\n\n" +
                    "            <div><a href=\"connexion.html\">Visualisation</a></div>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</header>"
            }else{
                let headerElement = document.querySelector('header');
                headerElement.innerHTML = "<header class=\"  bg-white\">\n" +
                    "\n" +
                    "    <div class=\"flex flex-row justify-between  pb-1\">\n" +
                    "        <div class=\"flex flex-row \">\n" +
                    "            <div class=\"ml-2 pt-1\">\n" +
                    "                <a href='index.html'><img alt='image' width=\"40\" height=\"40\" src=\"/public/assets/images/logo.svg\"></a>\n" +
                    "            </div>\n" +
                    "            <div class=\"flex flex-col\">\n" +
                    "            <div class=\"text-2xl mt-1 ml-1\">\n" +
                    "                <a href='index.html'>RiskAnalyzer</a>\n" +
                    "            </div>\n" +
                    "            <div class=\"text-sm pl-1 italic\">\n" +
                    "                <div>Analyser</div>\n" +
                    "                <div>Prédire</div>\n" +
                    "                <div>Prévenir</div>\n" +
                    "            </div>\n" +
                    "            </div>\n" +
                    "        </div>\n" +
                    "" +
                    " <button class=\"mr-4 btn-green hidden-md\">"+'Connecté'+"</button>   </div>\n" +
                    "\n" +
                    "    <div  class=\"header-2\">\n" +
                    "        <div  class=\"pt-2 pb-2 hover-blue flex flex-row gap-1\">" +
                                "<div><img width=\"20\" height=\"20\"  src=\"https://img.icons8.com/ios/50/create-new.png\" alt=\"create-new\"/></div>\n" +
                                "<div><a href=\"add.html\">Ajouter accident</a></div>\n" +
                    "        </div>\n" +
                    "        <div class=\"pt-2 pb-2 hover-blue flex flex-row gap-1\">" +
                    "<img width=\"20\" height=\"20\" src=\"https://img.icons8.com/ios/50/view-delivery.png\" alt=\"view-delivery\"/>\n" +
                    "\n\n" +
                    "            <a href=\"visualisation.html\">Visualisation</a>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</header>"
            }
        });
    }
}
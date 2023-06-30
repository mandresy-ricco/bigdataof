import {Ajax} from "./Ajax";

export class Accidents{

    constructor() {
        this.ajax = new Ajax();
    }

    choice(name){

        if (name === "btn-add"){
            this.addAccident(name)
        }
        if (name === "auto-get"){
            this.getAccident()
        }
        if (name === "prediction-list"){
            this.predictionList()
        }



    }

    predictionList(){
        let params = new URLSearchParams(window.location.search);
        let id = params.get('idaccident');
        let url = "../../../api/index.php?route=get_prediction&id="+id

        this.ajax.get(url).then((data) => {
            const conversion = {
                1: 'Indemne',
                2: 'Blessé léger',
                3: 'Blessé hospitalisé',
                4: 'Mort'
            };
            let dataN = JSON.parse(data)
            let dataNTwo = dataN.map(item => JSON.parse(item));
            console.log(dataNTwo)

            let dataTree = dataNTwo.map(item => {
                let key = Object.keys(item)[0];
                let value = conversion[item[key]];
                return {[key]: value};
            });
            console.log(dataTree)

            document.getElementById('table_predict').innerHTML = `
                <thead>
                    <tr>
                        <th>Modèle d'IA</th>
                        <th>Gravité prédite</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>KNN</td>
                        <td>${dataTree[3].knn}</td>
                    </tr>
                    <tr>
                        <td>SVM</td>
                        <td>${dataTree[1].svm}</td>
                    </tr>
                    <tr>
                        <td>Random Forest</td>
                        <td>${dataTree[2].random}</td>
                    </tr>
                    <tr>
                        <td>MLP</td>
                        <td>${dataTree[0].mlp}</td>
                    </tr>
                </tbody>
`;

        })

    }

    getAccident(){
            let url = "../../../api/index.php?route=get_accidents"
            this.ajax.get(url).then((data) => {
                console.log(data)
                let table = document.getElementById("myTable");

                for (let i = 0; i < data.length; i++) {
                    let row = `
            <tr>
                <td data-th="Type de véhicule">${data[i].category_name}</td>
                <td data-th="Type de collision">${data[i].collision_name}</td>
                <td data-th="Localisation">${data[i].aglo}</td>
                <td data-th="Ville">${data[i].ville}</td>
                <td data-th="Latitude">${data[i].latitude}</td>
                <td data-th="Longitude">${data[i].longitude}</td>
                <td data-th="Lumière">${data[i].brightness_name}</td>
                <td data-th="age">${data[i].age}</td>
                <td data-th="Dispositif de sécurité">${data[i].security_name}</td>
                <td data-th="Condition atmosphérique">${data[i].condition_name}</td>
                <td data-th="Etat route">${data[i].road_name}</td>
                <td data-th="Date/heure">${data[i].hours_date}</td>
                <td data-th="Prédiction"><button class="mr-4 btn-predict hidden-md"> 
                <a href="prediction.html?idaccident=${data[i].num_acc}">Prédire</a></button></td>
            </tr>
    `;
                    table.insertAdjacentHTML('beforeend', row);
                }
        });
    }
    addAccident(button){
            this.getButton = document.getElementById(button);
            this.getButton.addEventListener('click', (event) => {
                event.preventDefault();

                let ageInput = document.getElementById('age');
                let dateInput = document.getElementById('date');
                let heureInput = document.getElementById('heure');
                let villeInput = document.getElementById('ville');
                let latitudeInput = document.getElementById('latitude');
                let longitudeInput = document.getElementById('longitude');
                let descr_athmoInput = document.getElementById('descr_athmo');
                let descr_lumInput = document.getElementById('descr_lum');
                let descr_etat_surfInput = document.getElementById('descr_etat_surf');
                let descr_dispo_secuInput = document.getElementById('descr_dispo_secu');
                let descr_cat_vehInput = document.getElementById('descr_cat_veh');
                let descr_aggloInput = document.getElementById('descr_agglo');
                let descr_type_colInput = document.getElementById('descr_type_col');

                let formData = {
                    age: ageInput.value,
                    date : dateInput.value,
                    heure : heureInput.value,
                    ville: villeInput.value,
                    latitude: latitudeInput.value,
                    longitude: longitudeInput.value,
                    descrathmo: descr_athmoInput.value,
                    descrlum: descr_lumInput.value,
                    descretatsurf: descr_etat_surfInput.value,
                    descrdispo_secu: descr_dispo_secuInput.value,
                    descrcat_veh: descr_cat_vehInput.value,
                    descragglo: descr_aggloInput.value,
                    descrtypecol: descr_type_colInput.value
                };
                console.log(formData)

                this.ajax.post(formData,"../../../api/index.php?route=post_accident").then((data) => {
                    window.location.href = window.location.origin+ "/public/src/html/index.html"
                });
            });
        }


}
import { Ajax } from './Ajax.js';

export class Maps{
    constructor() {
        this.ajax = new Ajax();
    }
    choice(name){

        if (name === "mapslist"){
            this.mapList()
        }
        if (name === "mapscluster"){
            this.mapCluster()
        }
    }

    mapCluster(){

        let url = "../../../api/index.php?route=get_accidents"
        this.ajax.get(url).then((data) => {

            mapboxgl.accessToken = 'pk.eyJ1IjoicmljY28tbWFuZHJlc3kiLCJhIjoiY2xqZDE4MW03MDhsZzNrbW9kNmpoeGt2MiJ9.YjWMBIH1XQSAXJYkrSFReA'; // Remplacez par votre jeton d'accès Mapbox
            let points = []
            let list = []
            var colors = [
                '#e6194B',   // Rouge vif
                '#3cb44b',   // Vert émeraude
                '#4363d8',   // Bleu électrique
                '#f58231',   // Orange vif
                '#911eb4',   // Violet profond
                '#42d4f4',   // Bleu ciel
                '#f032e6',   // Rose vibrant
                '#bfef45',   // Jaune citron
                '#fabed4',   // Rose pâle
                '#469990',   // Vert sarcelle
                '#dcbeff',   // Lilas
                '#9A6324',   // Marron
                '#fffac8'    // Jaune pâle
            ];
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [2.35, 48.85],
                zoom: 4
            });

            for(let i = 0 ;i <  data.length ; i++){
                points.push({ lat: data[i].latitude, lng: data[i].longitude});
                let url = "../../../api/index.php?route=get_cluster&latitude="+data[i].latitude+"&longitude="+data[i].longitude
                this.ajax.get(url).then((response) => {
                    let dataParse = JSON.parse(response)
                    console.log(dataParse)
                    let el = document.createElement('div');
                    el.style.backgroundColor = colors[dataParse.cluster-1];
                    el.style.width = '10px';
                    el.style.height = '10px';
                    el.style.borderRadius = '50px'
                    let marker = new mapboxgl.Marker(el)
                        .setLngLat([data[i].longitude, data[i].latitude])
                        .addTo(map)
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                            .setHTML('<p>' + 'Ville : ' + data[i].ville +'</p>'));
                });
            }

        });

    }

    mapList(){

        let url = "../../../api/index.php?route=get_accidents"
        this.ajax.get(url).then((data) => {

            mapboxgl.accessToken = 'pk.eyJ1IjoicmljY28tbWFuZHJlc3kiLCJhIjoiY2xqZDE4MW03MDhsZzNrbW9kNmpoeGt2MiJ9.YjWMBIH1XQSAXJYkrSFReA'; // Remplacez par votre jeton d'accès Mapbox
            let points = []
            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [2.35, 48.85],
                zoom: 5
            });

            for(let i = 0 ;i <  data.length ; i++){
                points.push({ lat: data[i].latitude, lng: data[i].longitude});
            }

            let j = 0
            points.forEach(function(point) {
                let marker = new mapboxgl.Marker()
                    .setLngLat([point.lng, point.lat])
                    .addTo(map)
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML('<p>' + 'Ville : ' + data[j++].ville +'</p>'));
            });
        });

    }


}
import { EventFactory } from './EventFactory.js';
let origin = window.location.origin
let pathname = window.location.pathname
let link = window.location.origin + window.location.pathname


const user = EventFactory.CreateInstance('user');
const accident = EventFactory.CreateInstance('accident');
const component = EventFactory.CreateInstance('component');
const maps = EventFactory.CreateInstance('maps');

component.addHeader()

if(link ===  origin + "/public/src/html/connexion.html"){
    console.log('connexion')
    user.choice('btn-signIn')
}
if(link ===  origin + "/public/src/html/inscription.html"){
    console.log('inscription')
    user.choice('btn-signUp')
}

if(link ===  origin + "/public/src/html/add.html"){
    console.log('add')
    accident.choice('btn-add')
}

if(link ===  origin + "/public/src/html/visualisation.html"){
    console.log('visulisation & maps')
    accident.choice('auto-get')
    maps.choice('mapslist')

}

if(link ===  origin + "/public/src/html/prediction.html"){
    console.log('prediction')
    accident.choice('prediction-list')
}

if(link ===  origin + "/public/src/html/cluster.html"){
    console.log('cluster')
    maps.choice('mapscluster')
}



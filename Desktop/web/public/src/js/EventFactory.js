import { Accidents } from './Accidents.js';
import { User } from './User.js';
import { Component } from './Component.js';
import { Maps } from './Maps.js';

export class EventFactory {
    static CreateInstance(name) {
        if (name === 'accident') {
            return new Accidents();
        }
        if (name === 'user') {
            return new User();
        }
        if (name === 'component') {
            return new Component();
        }
        if (name === 'maps') {
            return new Maps();
        }
        throw new Error('Invalide');
    }
}

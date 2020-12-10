import Component from '@ember/component';
import { action } from '@ember/object';

export default class FormLoginComponent extends Component {

    model() {
        this.userName = '';
        this.password = '';
    }

    @action
    registration(){

    }

    @action
    login(){

    }
}
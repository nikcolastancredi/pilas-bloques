import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('setup', {
      nombre: 'don pepito',
    });
  }
});

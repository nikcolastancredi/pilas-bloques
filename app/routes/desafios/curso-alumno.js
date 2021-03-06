import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';


/* Esta ruta es una especialización de la ruta Nombre,
 * ya que hace algo muy similar, pero esconde elementos
 * de la interfaz y permite guardar la solución en un
 * backend de datos.
 */
export default Route.extend({
  cursoAPI: service(),

  model(params) {
    params.nombre = this.decodificarHash(params.hash).actividad;

    return this.store.findAll("desafio").then((data) => {
      // TODO: reemplazar la linea anterior (findAll) y la siguiente
      //       por una consulta a ember-data más específica, como la que
      //       realiza findRecord, que solo debería traer un solo registro.
      //
      //       (esto está así ahora porque se debe corregir mirage antes).
      let model = data.findBy('nombre', params.nombre);

      if (!model) {
        throw new Error(`No existe una actividad con el nombre ${params.nombre}`);
      }

      return model;
    });
  },


  /* Agrega los parámetros decodificados del hash al modelo. */
  afterModel(model, transition) {
    let hash = this.obtener_hash_desde_transition(transition);
    let valores = this.decodificarHash(hash);

    model.idAlumno = valores.idAlumno;
    model.hash = valores.hashCompleto;

    return this.cursoAPI.obtener_solucion_xml_desde_hash(model.hash).
      then((solucion_xml) => {
        model.set("solucion", btoa(solucion_xml));
      }).
      catch(() => {
        console.warn("Ha fallado solicitar la solución al servidor, esto es porque el alumno no hay guardado nunca.");
        return null;
      });
  },

  obtener_hash_desde_transition(transition) {
    return transition.params[this.routeName].hash;
  },

  decodificarHash(hash) {
    let hashString = atob(hash);
    let valores = hashString.split("-");

    if (valores.length !== 3) {
      throw Error(`Hash con formato de piezas incorrecto: ${hashString}`);
    }

    return {
      actividad: valores[0],
      idAlumno: valores[1],
      hashMoodle: valores[2],
      hashCompleto: hash
    };
  },

  activate() {
    this.ocultarLayout();
  },

  ocultarLayout() {
    this.controllerFor('application').set('layout', false);
  },

  actions: {
    cuandoEjecuta(codigoXML) {
      let nombre = this.get('currentModel.nombre');
      let hash = this.get('currentModel.hash');
      let idAlumno = this.get('currentModel.idAlumno');

      let parametros = {actividad: nombre, hash, idAlumno, codigo_xml: codigoXML};

      this.cursoAPI.guardar(parametros).
        catch((reason) => {
          console.error(reason);
          alert("Se a producido un error al guardar, por favor volvé a intentar.");
        });
    },

  }


});

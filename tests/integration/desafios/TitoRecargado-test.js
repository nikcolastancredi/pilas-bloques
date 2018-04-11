import {moduloActividad, actividadTest} from '../../helpers/actividadTest';

const nombre = 'TitoRecargado';

moduloActividad(nombre);

actividadTest(nombre, {
	solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="repetir" id="13" inline="true"><value name="count"><block type="math_number" id="14"><field name="NUM">6</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="25"><mutation name="Prender si es luz"></mutation><next><block type="MoverACasillaAbajo" id="22"></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="4" x="445" y="11"><mutation></mutation><field name="NAME">Prender si es luz</field><statement name="STACK"><block type="si" id="9" inline="true"><value name="condition"><block type="tocandoLuz" id="16"></block></value><statement name="block"><block type="EncenderLuz" id="19"></block></statement></block></statement></block></xml>',
});

actividadTest(nombre, {
	descripcionAdicional: 'La actividad no está resuelta si no estoy al final',
	solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="60"><mutation name="Prender luz si esta apagada"></mutation><next><block type="repetir" id="45" inline="true"><value name="count"><block type="math_number" id="46"><field name="NUM">5</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="24"><next><block type="procedures_callnoreturn" id="38"><mutation name="Prender luz si esta apagada"></mutation></block></next></block></statement></block></next></block></statement></block><block type="procedures_defnoreturn" id="13" x="0" y="194"><mutation></mutation><field name="NAME">Prender luz si esta apagada</field><statement name="STACK"><block type="si" id="35" inline="true"><value name="condition"><block type="tocandoLuz" id="30"></block></value><statement name="block"><block type="EncenderLuz" id="5"></block></statement></block></statement></block></xml>',
	resuelveDesafio: false,
});
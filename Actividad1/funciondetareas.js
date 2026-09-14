const fs = require('fs');

let archivo = {
    leer: function() {
        try {
            const data = fs.readFileSync('./tareas.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    },

    guardar: function(tareas) {
        fs.writeFileSync('./tareas.json', JSON.stringify(tareas, null, 2));
    },

    crear: function(tarea) {
        let t = this.leer();
        t.push(tarea);
        this.guardar(t);
        return 'Tarea creada exitosamente';
    },

    filtrarPorEstado: function(estado) {
        let tareas = this.leer();
        return tareas.filter(t => t.estado.toLowerCase() === estado.toLowerCase());
    },

    cambiarEstado: function(titulo, nuevoEstado) {
        let tareas = this.leer();
        let encontrada = false;

        tareas = tareas.map(t => {
            if (t.titulo.toLowerCase() === titulo.toLowerCase()) {
                t.estado = nuevoEstado;
                encontrada = true;
            }
            return t;
        });

        if (encontrada) {
            this.guardar(tareas);
            return `Estado de la tarea "${titulo}" cambiado a "${nuevoEstado}".`;
        }
        return `No se encontró la tarea "${titulo}".`;
    },

    eliminarPorEstado: function(estado) {
        let tareas = this.leer();
        let tareasRestantes = tareas.filter(t => t.estado.toLowerCase() !== estado.toLowerCase());
        
        if (tareas.length === tareasRestantes.length) {
            return `No se encontraron tareas con el estado "${estado}".`;
        }

        this.guardar(tareasRestantes);
        return `Se eliminaron las tareas con el estado "${estado}".`;
    }
};

module.exports = archivo;
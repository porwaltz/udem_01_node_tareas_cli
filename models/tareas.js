const Tarea = require('./tarea')
require('colors')

class Tareas{
    _listado = {}

    get listadoArr(){
        const listado = []
        Object.keys(this._listado).forEach(k => {
            listado.push(this._listado[k])
        })
        return listado
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea(id = '') {
        if (this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(t => {
            this._listado[t.id] = t
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
        console.log()
        this.listadoArr.forEach( (t, i) => {
            const idx = `${i + 1}`.green
            const {desc, completadoEn} = t
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red
            console.log(`${idx}. ${desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true){
        console.log()
        let contador = 0

        this.listadoArr.forEach(t => {
            const {desc, completadoEn} = t
            const estado = 'Pendiente'.red
            if (completadas){
                if(completadoEn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`)
                }
            }
            else{
                if(!completadoEn){
                    contador += 1
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }
          })
    }

    toggleCompletadas( ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })
        this.listadoArr.forEach( t => {
            if( !ids.includes(t.id)){
                const tarea = this._listado[t.id]
                tarea.completadoEn = null
            }
        })
    }
}

module.exports = Tareas
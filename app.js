require('colors')

const { 
    mostrarListadoChecklist, 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listadoTareasBorrar, 
    confirmar 
} = require('./helpers/inquirer')
//const tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')

const main = async() => {
    console.clear()
    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()

    if(tareasDB){
        //establecer tareas
        tareas.cargarTareasFromArray(tareasDB)
    }

    do{
        opt = await inquirerMenu()
        console.log({opt})

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                console.log(desc)
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendientesCompletadas()
                break;
            case '4':
                tareas.listarPendientesCompletadas(false)
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0'){
                    const ok = await confirmar('Estas seguro?')
                    console.log(ok)
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('tarea borrada')
                    }
                }

                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr)

        await pausa()
    } while( opt !== '0')

    
}

main()
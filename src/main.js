// Problema: Se requiere escribir un algoritmo que pueda leer y escribir valores en un 
// cierto path determinado de un objeto cuya estructura es desconocida.

// Tareas:
// Definir e implementar unit tests
// Escribir el algoritmo

// Signature:
// deepGet(object, path) : any


// Ejemplo: 
// deepGet(object, ‘sons[1].grandsons[0].name’)

function isValidPath(path) {
    // const reg = new RegExp('[^a-Z0-9]', 'g');
    // return reg.test(path)
    return true
}

export default function deepGet(ob, path) {
    if (!ob) {
        throw errObjectInvalid
    }

    if (!isValidPath(path)) {
        throw errPathInvalid
    }

    return getDeepProperty(ob, path)
}

function getNextPathProperty(path) {
    let newPath = ''
    let property = ''
    let isArray = false
    for (let index = 0; index < path.length; index++) {
        const char = path[index];
        if (char == '.') {
            newPath = path.substring(index+1, -1)
            property = path.substring(0, index)
            break
        }

        if (char == '[') {
            let numberIndex = -1
            isArray = true
            for (let i2 = index; i2 < path.length; i2++) {
                const char2 = path[i2];
                if (char2 == ']') {
                    numberIndex = i2
                    break
                }
            }
            property = path.substring(index+1, numberIndex)
            newPath =  path.substring(numberIndex+1, -1)
            console.log('property', property, 'path', newPath)
            break
        }
    }

    return {newPath, property, isArray}
}

function getDeepProperty(ob, path) {
    if (path.length == 0) {
        return ob
    }

    let {newPath, isArray, property} = getNextPathProperty(path)
    if (isArray) {
        property = parseInt(property)
    }

    const newObject = ob[property]
    console.log(newObject)
    return getDeepProperty(ob, newPath)
}

export const errObjectInvalid = 'object param is invalid'
export const errPathInvalid = 'path param is invalid'
export const errPropertyNotExists = 'property doenst exists'
export const errArrayIndexNotExists = 'array index doesnt exists'
import './style.css'
import { createForm, ingresarOtroTexto, perdirIndices } from './ui';
import { getErrorMessage } from './utilities';

/* - **Editor de texto** Hacer un programa que sea un mini editor de texto. El programa debe inicialmente pedir para ingresar un texto, luego debe preguntar qué es lo que queremos hacer. Opciones:
    * "h4ck3r 5p34k": convierte el texto en "Hacker Speak"

Al elegir la opción debe mostrar el texto modificado y permitir seguir realizando acciones. Investigar métodos `toUpperCase`, `toLowerCase`, `replace`, `includes`, `slice`, `substring`. */

export class EditorDeTexto {
    texto: string;

    constructor(texto : string = '') {
        this.texto = texto;
    }

    // Método privado para validar el texto ingresado
    private validarTexto(entrada : string) : void {
        if(entrada === '') throw new Error('Debe ingresar un texto');
    }

    // Método privado para validar una entrada
    private validarEntrada(entrada : string | number) : void {
        if(entrada === '') throw new Error('Debe ingresar un caracter');

        if(typeof entrada !== 'string') throw new Error('Debe ingresar una palabra, número o carácter especial'); 
    }

    // Método privado para validar un número
    private validarNumero(entrada : number) : void {
        if(isNaN(entrada)) throw new Error('Debe ingresar sólo números');

        if(entrada < 0) throw new Error('Debe ingresar un número mayor o igual a 0');
    }

    // Método privado para validar si es sólo una palabra
    private esPalabra(entrada : string) : void {
        if(!(/^[A-Za-z]+$/.test(entrada))) throw new Error('Debe ingresar una palabra');
    }

    // * "duplicar": duplicar el texto
    duplicar(textoIngresado : string) {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado.concat(" ", textoIngresado);

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    // * "reemplazar": reemplaza un string por otro en el texto
    async reemplazar(textoIngresado : string) : Promise<string> {
        try {
            
            this.validarTexto(textoIngresado);

            let [palabraNueva, palabraVieja] = await createForm();
            
            palabraNueva = palabraNueva.trim();
            palabraVieja = palabraVieja.trim();

            this.validarEntrada(palabraNueva);
            this.validarEntrada(palabraVieja);

            this.texto = textoIngresado.split(' ').join(' ');
            this.texto = this.texto.replace(new RegExp(`\\b${palabraVieja}\\b`, 'i'), palabraNueva);

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);            
        }
    }

    //  * "agregar": agregar texto
    async agregar(textoIngresado : string) : Promise<string> {
        try {
            this.validarTexto(textoIngresado);

            const otroTexto = await ingresarOtroTexto();

            this.validarTexto(otroTexto);

            this.texto = textoIngresado;

            this.texto = this.texto.concat(" ", otroTexto);

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    // * "cortar": pide dos números de índice entre los cuáles recortar el texto
    async cortar(textoIngresado : string) : Promise<string> {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            const [indice1, indice2] = await perdirIndices();

            // Se valida que sean número los índices
            this.validarNumero(indice1);
            this.validarNumero(indice2);

            const longitud = this.texto.length;

            // Se valida que los indices cumplan con ciertos criterios para poder hacer la búsqueda
            if(indice1 > longitud) throw new Error(`El índice ${indice1} es mayor que el tamaño de la cadena`);
            if(indice2 > longitud) throw new Error(`El índice ${indice2} es mayor que el tamaño de la cadena`);
            if(indice1 === indice2) throw new Error(`Los índices ingresados no pueden ser iguales`);
            if(indice1 > indice2) throw new Error(`El índice ${indice1} no puede ser mayor que el índice ${indice2}`);
            
            this.texto = this.texto.slice(indice1, indice2).trim();

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "eliminar palabra": elimina una palabra del texto
    async eliminarPalabra(textoIngresado : string) : Promise<string> {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            let palabra = (await ingresarOtroTexto()).trim();

            this.esPalabra(palabra); // Verifica si la entrada es una palabra

            this.texto = this.texto.replace(new RegExp(`\\b${palabra}\\b`, 'gi'), '');

            this.texto = this.texto.replace(/\s+/g, ' ').trim();

            return this.texto;

        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "buscar subtexto": busca un string dentro del texto y devuelve un mensaje diciendo si lo encontró o no
    async buscarSubtexto(textoIngresado : string) : Promise<string> {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            const subtexto = await ingresarOtroTexto();

            this.validarTexto(subtexto);

            const subtextoRevisado = subtexto.split(/\s+/g).join(' ').trim().toLowerCase();

            return this.texto.toLowerCase().includes(subtextoRevisado) ? 
                `Sí se encuentra '${subtextoRevisado}' dentro del texto` : 
                `No se encuentra '${subtextoRevisado}' dentro del texto`;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "buscar palabra": busca una palabra dentro del texto y devuelve un mensaje diciendo si lo encontró o no
    async buscarPalabra(textoIngresado : string) : Promise<string> {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            const palabra = (await ingresarOtroTexto()).trim();

            this.esPalabra(palabra);

            const palabraRevisada = palabra.trim().toLowerCase();
            return this.texto.toLowerCase().includes(palabraRevisada) ? 
                `Sí se encuentra '${palabraRevisada}' dentro del texto` : 
                `No se encuentra '${palabraRevisada}' dentro del texto`;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "mayusculas": poner todo el texto a mayusculas
    mayuscula(textoIngresado : string) : string {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado.toLocaleUpperCase();

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "minusculas": poner todo el texto en minusculas
    minuscula(textoIngresado : string) : string {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado.toLowerCase();

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "contar letras": mostrar cuántas letras tiene el texto sin espacios
    contarLetras(textoIngresado : string) : string {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            const textoSinEspacios = this.texto.split(/\s+/g).join('').trim();

            return `El texto tiene ${textoSinEspacios.length} letras`;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    //  * "contar palabras": mostrar cuántas palabras tiene el texto
    contarPalabras(textoIngresado : string) : string {
        try {
            this.validarTexto(textoIngresado);

            this.texto = textoIngresado;

            const arrayPalabras = this.texto.trim().split(/\s+/g);

            return `El texto tiene ${arrayPalabras.length} palabras en total`;
        } catch (error) {
            return getErrorMessage(error);
        }
    }

    // Este método aún no está habilitado
    convertirAlfanumerico(textoIngresado : string): string {
        try {
            this.validarTexto(textoIngresado);

            const mapa: Record<string, string> = {
                "4": "a",
                "3": "e",
                "0": "o",
                "5": "s",
                "1": "i",
            };

            this.texto = textoIngresado.replace(/[43051]/g, (char) => mapa[char] ?? char);

            return this.texto;
        } catch (error) {
            return getErrorMessage(error);
        }
    }
}

// caso de uso






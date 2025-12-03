// DOM
export const texto = document.querySelector<HTMLTextAreaElement>('#texto')!;
export let salida = document.querySelector<HTMLParagraphElement>('#salida')!;

// Botones
export const btnDuplicar = document.getElementById('btnDuplicar') as HTMLButtonElement;
export const btnReemplazar = document.getElementById('btnReemplazar') as HTMLButtonElement;
export const btnAgregar = document.getElementById('btnAgregar') as HTMLButtonElement;
export const btnCortar = document.getElementById('btnCortar') as HTMLButtonElement;
export const btnEliminar = document.getElementById('btnEliminar') as HTMLButtonElement;
export const btnBuscarSubtexto = document.getElementById('btnBuscarSubtexto') as HTMLButtonElement;
export const btnBuscarPalabra = document.getElementById('btnBuscarPalabra') as HTMLButtonElement;
export const btnMayuscula = document.getElementById('btnMayuscula') as HTMLButtonElement;
export const btnMinuscula = document.getElementById('btnMinuscula') as HTMLButtonElement;
export const btnContarLetras = document.getElementById('btnContarLetras') as HTMLButtonElement;
export const btnContarPalabras = document.getElementById('btnContarPalabras') as HTMLButtonElement;

// Variables
export let nueva : string;
export let vieja : string;

export function actualizarSalida() : string {
    let textoIngresado = texto.value;
    return textoIngresado;
}

export function crearEntrada(id : string, placeholder : string) : HTMLInputElement {
    const input = document.createElement('input') as HTMLInputElement;
    input.id = id;
    input.placeholder = placeholder;

    return input;
}

export function createForm() : Promise<[string, string]> { 
    return new Promise((resolve) => {
        // Form
        const form = document.createElement('form') as HTMLFormElement;
        form.id = 'contenedorEntrada';

        // Input
        const inputPalabraNueva = crearEntrada('palabraReemplazo', 'Ingrese la nueva palabra');
        const inputPalabraVieja = crearEntrada('palabrareemplazada', 'Ingrese la palabra que desea reemplazar');

        // Botón para aceptar el ingreso de la palabra
        const btnAceptar = document.createElement('button') as HTMLButtonElement;
        btnAceptar.type = 'button';
        btnAceptar.textContent = 'Aceptar';

        texto.after(form);
        form.append(inputPalabraNueva, inputPalabraVieja, btnAceptar);

        btnAceptar.addEventListener('click', () => {
            nueva = inputPalabraNueva.value.toLocaleLowerCase();
            vieja = inputPalabraVieja.value.toLocaleLowerCase();
            form.remove();
            resolve([nueva, vieja]);
        })
    })
}

// Esta función sirve para ingresar una cadena de caracteres que puede servir desde una palabra hasta un texto
export function ingresarOtroTexto() : Promise<string> {
    return new Promise((resolve) => {
        // Form
        const form = document.createElement('form') as HTMLFormElement;
        form.id = 'contenedorEntrada';

        // Input
        const input = document.createElement('input') as HTMLInputElement;
        input.id = 'otroTexto';
        input.placeholder = 'Ingrese el texto que desea agregar';

        // Botón para aceptar el ingreso del otro texto
        const btnAceptar = document.createElement('button') as HTMLButtonElement;
        btnAceptar.type = 'button';
        btnAceptar.textContent = 'Aceptar';

        texto.after(form);
        form.append(input, btnAceptar);

        btnAceptar.addEventListener('click', () => {
            const nuevoTexto = input.value;
            form.remove();
            resolve(nuevoTexto);
        })
    })
}

export function perdirIndices() : Promise<[number, number]> {
    return new Promise((resolve) => {
        // Form
        const form = document.createElement('form') as HTMLFormElement;
        form.id = 'contenedorEntrada';

        // Input
        const input1 = crearEntrada('indice1', 'Ingresa el primer índice');
        const input2 = crearEntrada('indice2', 'Ingresa el segundo índice');

        // Botón para aceptar el ingreso del otro texto
        const btnAceptar = document.createElement('button') as HTMLButtonElement;
        btnAceptar.type = 'button';
        btnAceptar.textContent = 'Aceptar';

        texto.after(form);
        form.append(input1, input2, btnAceptar);

        btnAceptar.addEventListener('click', () => {
            const indice1 = Number(input1.value);
            const indice2 = Number(input2.value);
            form.remove();
            resolve([indice1, indice2]);
        })
    })
}

import './style.css'
import {EditorDeTexto} from './editor';
import { 
  actualizarSalida, texto, salida, btnDuplicar, 
  btnReemplazar, btnAgregar, btnCortar, btnEliminar, 
  btnBuscarSubtexto, btnBuscarPalabra, btnMayuscula,
  btnMinuscula, btnContarLetras, btnContarPalabras,
} from './ui';

let textoIngresado : string = '';

// Instancia
const editor = new EditorDeTexto();

// Eventos
texto.addEventListener('input', () => { 
  salida.textContent = '';
  textoIngresado = actualizarSalida()
});

btnDuplicar.addEventListener('click', () => {
  salida.textContent = editor.duplicar(textoIngresado);
});

btnReemplazar.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.reemplazar(textoIngresado);
});

btnAgregar.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.agregar(textoIngresado);
});

btnCortar.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.cortar(textoIngresado);
});

btnEliminar.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.eliminarPalabra(textoIngresado);
});

btnBuscarSubtexto.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.buscarSubtexto(textoIngresado);
});

btnBuscarPalabra.addEventListener('click', async () => {
  salida.textContent = '';
  salida.textContent = await editor.buscarPalabra(textoIngresado);
})

btnMayuscula.addEventListener('click', () => {
  salida.textContent = '';
  salida.textContent = editor.mayuscula(textoIngresado)
});

btnMinuscula.addEventListener('click', () => {
  salida.textContent = '';
  salida.textContent = editor.minuscula(textoIngresado)
});

btnContarLetras.addEventListener('click', () => {
  salida.textContent = '';
  salida.textContent = editor.contarLetras(textoIngresado);
})

btnContarPalabras.addEventListener('click', () => {
  salida.textContent = '';
  salida.textContent = editor.contarPalabras(textoIngresado);
})

// Activación modo oscuro
const btnTheme = document.querySelector("#toggleTheme") as HTMLButtonElement;

btnTheme?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

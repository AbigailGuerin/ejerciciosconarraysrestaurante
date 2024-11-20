// Inicia con las mesas con valores aleatorios entre 0 y 4
let mesas = Array.from({ length: 10 }, () => Math.floor(Math.random() * 5));
const contenedorMesas = document.getElementById('mesas');
const resultado = document.getElementById('resultado');

//Estado actual de las mesas
function mostrarMesas() {
    contenedorMesas.innerHTML = '';
    mesas.forEach((mesa, indice) => {
        const mesaDiv = document.createElement('div');
        mesaDiv.className = `mesa ${mesa === 0 ? 'vacia' : 'llena'}`;
        mesaDiv.textContent = mesa;
        contenedorMesas.appendChild(mesaDiv);
    });
}

// Asignar comensales a una mesa
function asignarMesa() {
    const comensales = parseInt(document.getElementById('comensales').value);
    resultado.textContent = '';

    if (isNaN(comensales) || comensales < 1 || comensales > 4) {
        resultado.textContent = 'Número de comensales inválido. Deben ser entre 1 y 4.';
        return;
    }

    let mesaVacia = -1;
    let mesaHueco = -1;

    // Buscar una mesa o hueco para los comensales
    for (let i = 0; i < mesas.length; i++) {
        if (mesas[i] === 0 && mesaVacia === -1) {
            mesaVacia = i;
        }
        if (mesas[i] >= 1 && mesas[i] + comensales <= 4 && mesaHueco === -1) {
            mesaHueco = i;
        }
    }

    // Asigna los comensales a la mesa
    if (mesaVacia !== -1) {
        mesas[mesaVacia] = comensales;
        resultado.textContent = `Siéntense en la mesa número ${mesaVacia + 1}.`;
    } else if (mesaHueco !== -1) {
        mesas[mesaHueco] += comensales;
        resultado.textContent = `Siéntense en la mesa número ${mesaHueco + 1}.`;
    } else {
        resultado.textContent = 'No hay mesa disponible para su grupo.';
    }

    mostrarMesas();
}

mostrarMesas();
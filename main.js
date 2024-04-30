let libros = [];

function obtenerLibrosDelLocalStorage() {
    const librosEnLocalStorage = localStorage.getItem('librosCarrito');
    return librosEnLocalStorage ? JSON.parse(librosEnLocalStorage) : [];
}

function guardarLibrosEnLocalStorage(libros) {
    localStorage.setItem('librosCarrito', JSON.stringify(libros));
}

function mostrarLibrosEnCarrito() {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');

    listaCarrito.innerHTML = '';
    let total = 0;

    const librosEnCarrito = obtenerLibrosDelLocalStorage();
    librosEnCarrito.forEach(libro => {
        const elementoCarrito = document.createElement('li');
        elementoCarrito.innerHTML = `${libro.titulo} - $${libro.precio} <button onclick="eliminarDelCarrito(${libro.id})">Eliminar</button>`;
        listaCarrito.appendChild(elementoCarrito);
        total += libro.precio;
    });

    totalCarrito.innerText = total.toFixed(2);
}

function mostrarLibros() {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const libroElemento = document.createElement('div');
        libroElemento.classList.add('libro');
        libroElemento.innerHTML = `
            <h2>${libro.titulo}</h2>
            <p>Autor: ${libro.autor}</p>
            <p>Categoria: ${libro.categoria}</p>
            <p>Precio: $${libro.precio}</p>
            <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
        `;
        listaLibros.appendChild(libroElemento);
    });

    mostrarLibrosEnCarrito(); 
}

function agregarAlCarrito(id) {
    const libro = libros.find(libro => libro.id === id);
    if (libro) {
        const librosEnCarrito = obtenerLibrosDelLocalStorage();
        librosEnCarrito.push(libro);
        guardarLibrosEnLocalStorage(librosEnCarrito);

        mostrarLibrosEnCarrito();

        let comprarCarrito = document.getElementById('comprarCarrito');
        comprarCarrito.onclick = () => Swal.fire('¡Compra realizada!', '¡Muchas gracias por comprar en nuestra página, nos vemos pronto!', 'success');
    }
}

function eliminarDelCarrito(id) {
    const librosEnCarrito = obtenerLibrosDelLocalStorage();
    const librosActualizados = librosEnCarrito.filter(libro => libro.id !== id);
    guardarLibrosEnLocalStorage(librosActualizados);
    mostrarLibrosEnCarrito();
}


fetch('libros.json')
    .then(response => response.json())
    .then(data => {
        libros = data.libros;
        mostrarLibros();
    })
    .catch(error => {
        console.error('Error al cargar los libros:', error);
    })
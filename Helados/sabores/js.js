document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Filtro de búsqueda para helados
    const inputBusqueda = document.getElementById('busqueda-helado');
    const helados = document.querySelectorAll('.helado');
    const sugerenciasDiv = document.getElementById('sugerencias-helado');

    // Lista de nombres de helados
    const nombresHelados = Array.from(helados).map(h => h.querySelector('h2').textContent);

    // Solo muestra sugerencias al escribir, NO filtra helados
    inputBusqueda.addEventListener('input', function() {
        const valor = this.value.trim().toLowerCase();

        // Mostrar todos los helados si el input está vacío
        if (valor.length === 0) {
            helados.forEach(helado => {
                helado.style.display = '';
            });
            if (sugerenciasDiv) sugerenciasDiv.style.display = 'none';
            return;
        }

        // Sugerencias
        if (sugerenciasDiv) {
            const sugerencias = nombresHelados.filter(nombre =>
                nombre.toLowerCase().startsWith(valor)
            );
            if (sugerencias.length > 0) {
                sugerenciasDiv.innerHTML = sugerencias.map(s =>
                    `<div class="sugerencia-item">${s}</div>`
                ).join('');
                sugerenciasDiv.style.display = 'block';
            } else {
                sugerenciasDiv.style.display = 'none';
            }
        }
    });

    // Click en sugerencia: autocompleta y filtra exacto
    if (sugerenciasDiv) {
        sugerenciasDiv.addEventListener('mousedown', function(e) {
            if (e.target.classList.contains('sugerencia-item')) {
                const saborSeleccionado = e.target.textContent.trim().toLowerCase();
                inputBusqueda.value = e.target.textContent.trim();

                helados.forEach(helado => {
                    const nombre = helado.querySelector('h2').textContent.trim().toLowerCase();
                    if (nombre === saborSeleccionado) {
                        helado.style.display = '';
                    } else {
                        helado.style.display = 'none';
                    }
                });

                sugerenciasDiv.style.display = 'none';
            }
        });

        // Oculta sugerencias si el input pierde foco
        inputBusqueda.addEventListener('blur', function() {
            setTimeout(() => sugerenciasDiv.style.display = 'none', 100);
        });
    }
});
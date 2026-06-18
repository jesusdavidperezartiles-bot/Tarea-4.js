const products = document.querySelector("#products")
const categoriaFiltro = document.querySelector("#categoriaFiltro")
let pesitos = new Intl.NumberFormat('es-MX',{
   style:'currency',
   currency: 'MXN',
})

let categorias = [...new Set(ProductosData.map(p => p.categoría))]
categorias.forEach(cat => {
   let option = document.createElement("option")
   option.value = cat
   option.textContent = cat
   categoriaFiltro.appendChild(option)
})

function renderProductos(filtro) {
   let productRow = ``
   let filtrados = filtro && filtro !== "Todas"
       ? ProductosData.filter(p => p.categoría === filtro)
       : ProductosData
   for (let index = 0; index < filtrados.length; index++) {
       let total = filtrados[index].precio * filtrados[index].stock
       productRow += `
       <tr>
           <td>${filtrados[index].id}</td>
           <td>${filtrados[index].nombre}</td>
           <td>${pesitos.format(filtrados[index].precio)}</td>
           <td>${filtrados[index].categoría}</td>
           <td>${filtrados[index].stock}</td>
           <td>${pesitos.format(total)}</td>
       </tr>
       `
   }
   products.innerHTML = productRow
}

document.addEventListener("DOMContentLoaded", e =>{
   renderProductos("Todas")
})

categoriaFiltro.addEventListener("change", e =>{
   renderProductos(e.target.value)
})
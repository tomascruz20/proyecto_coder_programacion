const lista= JSON.parse(localStorage.getItem("listado"))|| [] 
const user_list=JSON.parse(localStorage.getItem("user-info"))
const btn_guardar=document.getElementById("btn-guardar")
const btn_borrar_datos=document.getElementById("btn-eliminar-datos")
const btn_delete_tabla=document.getElementById("boton-delete")
const btn_calc=document.getElementById("btn-calc")

const btn_get_coment=document.getElementById("btn-comentarios")
const comentarios=document.getElementById("comentarios")

const render=(lista)=>{

console.table(lista)  
  comentarios.innerHTML=""
  lista.forEach(comentario=>{

    comentarios.innerHTML+=`
    <div class="coments">

<h4>${comentario.email}</h4>
<p>${comentario.body}</p>
</div>
    `

  })
}

btn_get_coment.addEventListener("click",()=>{

  let timerInterval;
  Swal.fire({
    title: "cargando comentarios",
    html: "esto cerrara <b></b> en unos segundos.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
console.log("click")

const endpoint="https://jsonplaceholder.typicode.com/comments";

fetch(endpoint).then(respuesta=>respuesta.json())
.then(respJSON=>{console.log(respJSON)

  render(respJSON ).catch(error=>{

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "fallo en el servidor, reintente mas tarde",
    });
  })
})
})

const btn_dolar=document.getElementById("btn-dolar")
const valor_dolar=document.getElementById("cont_dolar")


const render2=(lista2)=>{

  console.log(lista2)  
    valor_dolar.innerHTML=""

    console.log( lista2.oficial.value_sell)

    valor_dolar.innerHTML=`
    <div class="coments2">

<p>dolar oficial venta $${lista2.oficial.value_sell}</p>
<p>dolar oficial compra $${lista2.oficial.value_buy}</p>
<p>dolar blue compra $${lista2.blue.value_sell}</p>
<p>dolar blue venta $${lista2.blue.value_buy}</p>
<p> euro compra$${lista2.oficial_euro.value_sell}</p>
<p> euro compra$${lista2.oficial_euro.value_buy}</p>
</div>
    `





    lista2.forEach(comentario2=>{
  
      valor_dolar.innerHTML+=`
      <div class="coments2">

      <h4>${comentario2.oficial.value_sell}</h4>

      `
  
    })
}

btn_dolar.addEventListener("click",()=>{

  let timerInterval;
  Swal.fire({
    title: "valores del dolar hoy",
    html: "esto cerrara <b></b> en unos segundos.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
console.log("click")

const endpoint2="https://api.bluelytics.com.ar/v2/latest";

fetch(endpoint2).then(respuesta2=>respuesta2.json())
.then(respJSON2=>{console.log(respJSON2)

  render2(respJSON2 ).catch(error=>{

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "fallo en el servidor, reintente mas tarde",
    });
  })
})
})


btn_borrar_datos.addEventListener("click",()=>{
localStorage.removeItem("user-name")
welcome_mod=document.getElementById("user-welcome");
mensaje="bienvenido usuario  👨‍💻​";
welcome_mod.innerHTML=mensaje;
})
btn_calc.addEventListener("click",inflacion)

btn_guardar.addEventListener("click",user)

btn_delete_tabla.addEventListener("click",delete_table)

function user() {
  
user_name=JSON.parse(localStorage.getItem ("user-name")) ||  document.getElementById("user-name").value 

localStorage.setItem("user-name",JSON.stringify(user_name))

welcome_mod=document.getElementById("user-welcome");

mensaje="bienvenido  "+ user_name+" 👨‍💻​";

welcome_mod.innerHTML=mensaje;
}

function loadtable() {
  
  tabla=document.getElementById("historial");
  tabla.innerHTML=" ";
  
  lista.forEach(item => {
   tabla=document.getElementById("historial")
   tabla.innerHTML+=
   `
  <tr>
  <td>${item.nombre}</td>
  <td>${item.monto_i}</td>
  <td>${item.monto_f }</td>
  <td>${item.interes }</td>
  <td>${item.inflacion }</td>
  <td>${item.agregado}</td>
  <td>${item.clave_id}</td>

  </tr>
   `
  });


}

loadtable()

function delete_table() {
  Swal.fire({
    title: "¿estas seguro?",
    text: "eliminaras los datos de tu tabla",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "si,eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {

      localStorage.clear("listado")

      Swal.fire({
        title: "datos eliminados!",
        text: "deberas actualizar la pagina",
        icon: "success"
      });
    }
  });




}


function generarid() {
  let a=Math.random()
return a
}

function inflacion() {

  Swal.fire({
    title: "operacion exitosa!",
    text: "mira los detalles en la ventana",
    icon: "success"
  });



   const _monto=parseInt(document.getElementById("monto").value)
   const _interes= parseInt(document.getElementById("interes").value)
  const _meses= parseInt(document.getElementById("meses").value)
  const _agregar=parseInt(document.getElementById("agregar").value)
const _inflacion=parseInt(document.getElementById("inflacion").value)
const _nombre=document.getElementById("nombre").value;


    
    let Total=_monto;
    let Agregar=_agregar;
    let perdida=0
    let Pinflacion=0;
    let ficticio=0;
let id=generarid();
   
    for (let i= 0; i<_meses; i++) {
        
        Total= Total+(_interes*Total/100);
        Total=Total+Agregar;

        ficticio= Total-(_inflacion*Total/100);
        perdida=(_inflacion*Total/100);
        Pinflacion=_interes-_inflacion;

    }


    const respuesta =document.getElementById("p");
    respuesta.innerHTML = 
    "monto final " +Total+ "<br>"
+    "perdiste " + perdida +" de tu moneda" +"<br>"
  +  "interes real "+ Pinflacion +" % " +"<br>"
  +"ganancia real " +ficticio;  +"<br>"+
  "<br>";



let obj={
monto_i:_monto,
monto_f:Total,
nombre:_nombre,
meses:_meses,
agregado:_agregar,
inflacion:_inflacion,
interes:_interes,
clave: id,
}


lista.push(obj)
  

  


localStorage.setItem("listado" ,JSON.stringify(lista))
JSON.parse(localStorage.getItem(lista))

 _monto.value=" ";
 _interes.value=" ";
 _meses.value= " ";
 _agregar.value=" " ;
 _inflacion.value=" ";



 tabla=document.getElementById("historial");
 tabla.innerHTML=" ";
 
 lista.forEach(item => {
  tabla=document.getElementById("historial")
  tabla.innerHTML+=
  `
 <tr>
 <td>${item.nombre}</td>
 <td>${item.monto_i}</td>
 <td>${item.monto_f }</td>
 <td>${item.interes }</td>
 <td>${item.inflacion }</td>
 <td>${item.agregado}</td>
 <td>${item.clave}</td>
 <td><button class="btn btn-danger btn-sm" onclick="deleteobj(${item.clave})"> x </button> </td>
 </tr>
  `
 });





}

function deleteobj(valor) {

const index=lista.findIndex((element) =>{

    return lista.clave== valor
} )

console.log(lista[index.value])
}


setTimeout(()=>{
  Swal.fire("¡bienvenido disfruta el simulador!😄")

},8000)























/*

function search() {

buscando=document.getElementById("buscador").value

const resultado= lista.filter((el) => el.nombre===buscando)

 if (resultado) {
  
  resultado.innerHTML+="el resultado es"+ resultado}
else{ resultado.innerHTML+="no se encontro resultado" }


}
*/




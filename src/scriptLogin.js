/* PROTOTIPO BASE */
function Users() {
  this.user = 'usuario';
  this.completeName = "Nombre Completo";
  this.email = "usuario@usuario.com";
  this.phone = 542964123456;
  this.address = "San Martin 1000";
  this.pass = "123";
};

function Products(){
  this.name = "Nombre del Plato";
  this.price = 100;
  this.foto = "foto_del_Producto";
};

// Objeto Instanciado de Products
const bagelSalmon = new Products();
bagelSalmon.name = "Bagel de Salmón";
bagelSalmon.price = 425;


// Objeto Instanciado de Users
const juanita = new Users();
juanita.user = "Juanita3000";
juanita.completeName = "Juanita de los Angeles Ortega";
juanita.email = "juanita@gmail.com";
juanita.phone = "542964454545";
juanita.address = "Santa Maria 123";
juanita.pass = "1233";

const btnResultados = document.getElementById("enviar");
let db = [["javier", "123"],["federico", "123"]];

    btnResultados.addEventListener('click', function () {
      let user = document.getElementById("Usuario").value;
      let pass = document.getElementById("Contrasennia").value;

      i = 0;
      j= 0;
      while (i < db.length){
        if (db[i][0] === user) {
          if (db[i][1] === pass){
            console.log("es exitoso"); 
            window.location.href = "./index.html";     
          }else{
            alert('El usuario y/o la contraseña no son correcto Acceso Denegado');
          };}else{
            alert('El usuario y/o la contraseña no son correcto Acceso Denegado');
          };
        i++;
      };

    }); 
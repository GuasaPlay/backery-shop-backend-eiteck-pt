<h1 align="center">Backery Shop EITECK - API</h1>

Esta es una rest API, desarrollada con Node.js, MongoDB y AWS S3 para el almacenamiento de recursos.

La siguente lista enumera los principales paquetes que utilice para poder realizar este proyecto:

-  **Express.js**: Framemork para la creacion del servidor y la gestion de la estructura del proyecto.
-  **jsonwebtoken**: Para es intercambio seguro de datos entre el backend y frontend.
-  **passport.js**: Middleware para la autenticación.
-  **mongoose**: Nos ayuda con las consultas a MongoDB y la definición de los esquemas.
-  **Babel**: Ayuda con la compilacion o (trasnpilación) de código para poder utilizar las ultimas caracteristicas de Javascript.

## Enfoque

Para realizar este API utilice el enfoque de capas el cual tenemos diferentes módulos para abordar diferentes preocupaciones pertinentes a nuestra aplicación. Es decir nuestro servidor tiene los diferentes módulos (o capas) que deben asumir la responsabilidad de atender a diferentes aspectos del procesamiento de una respuesta para una solicitud del cliente.

Estos aspectos se pueden manejar programando tres capas diferentes como se muestra a continuación:

-  **Controlador**
   (Rutas de API y puntos finales)
-  **Capa de servicio**
   (para lógica de negocios)
-  **Capa de acceso a datos**
   (para trabajar con una base de datos)

## Metodología

Utilice SCRUM como metodologpia ya que es agil y flexible, de esta manera se trabajó en cada una de las iteraciones en las mismas que se mejorando cada vez mas la aplicación. Esto lo se puede comprobar en los commits del proyecto.

## Posibles mejoras

Hay muchas mejoras que se puede realizar en la aplicación, las mismas que no pude realizar por que no me alcanzó el tiempo. En el siguiente listado menciono algunas de estas mejoras:

-  En este caso por honor al tiempo estoy utilizando una sola colección para los tres tipos de usuarios, lo correcto seria agregar una colección para `clientes` y otra para `empleados`.
-  Para la colección de productos se debería agregar un endpoint para actualizar solo el `stock` de los productos, en este caso estoy utilizando un endpoint para actualizar toda las información del producto incluido el stock.
-  Para esta API estoy utilizando `cors` para que cualquiera pueda conectarse a la API, lo correcto seria agregar solo las IP que pueden tener acceso a la API.

## ¿Cómo probar la aplicación?

Actualmente la aplicación esta deplegada en Heroku, puede ingresar desde el siguente enlace y podrá observar una consulta a los productos que ya estan ingresados: [https://backery-shop-backend-eiteck-pt.herokuapp.com/api/v1/product/get-products](https://backery-shop-backend-eiteck-pt.herokuapp.com/api/v1/product/get-products)

**Nota:** Cuando abra el enlace pueda que tarde un poco en cargar, esto debido a que Heroku duerme el servidor para ahorrar recursos ya que esta alojado en versión gratuita.

Para probar los endpoint que estan disponibles en la API, he creado una colección en [Postman](https://www.postman.com/) que los podemos descargar haciendo click aqui [aqui](https://gist.github.com/GuasaPlay/ac120c342eae08fe3f3381147a216801), luego podemos importar dicha colección a Postman para hacer uso de ella y asi facilite hacer las pruebas.

Para saber cuales son los endpoint y como hacer las peticiones le pido de favor que revise el siguente video donde se explica toda la API en detalle haciendo click en el siguente enlace:
[https://www.youtube.com/](https://www.youtube.com/)

## Ejecutar el proyecto en local

Primero clonamos el repositorio

Luego en la raiz del proyecto creamos un archivo `.env` donde debemos agregar las siguentes variables de entorno para que funcione correctamente la aplicación:

```bash
# Puerto donde se ejecutara el servidor
PORT=

# URI para la conexion a la base de datos de mongoDB
MONGO_URI=

# Token para poder validar los JWT (Json Web Token)
TOKEN_KEY=

# Variables de entorno para AWS para poder utilizar S3
AWS_REGION=
AWS_ID=
AWS_SECRET=
AWS_BUCKET_NAME=
```

Finalmente ejecutamos los siguentes comando con `npm`:

```bash
# Instalar las dependencias
$ npm install

# Ejecutar el proyecto en modo de desarrollo.
$ npm run dev

# Construir los directorio para producción y lanzar el servidor.
$ npm run build
$ npm run start

```

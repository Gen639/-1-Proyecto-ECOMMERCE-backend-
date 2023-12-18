
# Proyecto Backend - Tienda en Línea (E-commerce)



![Banner  verduras](https://st3.depositphotos.com/1585135/13580/i/1600/depositphotos_135800676-stock-photo-fresh-colorful-vegetables-banner.jpg)


## Introducción

Este proyecto de backend fusiona habilidades en Node.js, Express y MySQL/Sequelize. El enfoque principal es crear una API REST para una tienda en línea (e-commerce).

## Descripción

Desarrollar una API REST que cumpla con los siguientes criterios:

- Registro de usuarios con cifrado de contraseñas utilizando Bcrypt.

- Autenticación de usuarios mediante token y middleware.

- Implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

- Al menos una relación Many-to-Many y otra One-to-Many en la base de datos.

- Uso de seeders para poblar la base de datos con datos de prueba.


## Tecnologías Utilizadas

- Node.js
- Express
- MySQL con Sequelize
- Bcrypt para cifrado de contraseñas
- Git (uso de ramas, commits legibles)
- Seeders para inicialización de datos



## Instrucciones de Configuración

1. Clona el repositorio en tu máquina local.

2. Instala las dependencias utilizando npm install.

3. Configura la base de datos en el archivo de configuración (config/config.json) de Sequelize.

4. Ejecuta las migraciones para establecer la estructura de la base de datos.

5. Utiliza seeders para poblar la base de datos con datos de prueba.

## Ejecución del Proyecto

1. Inicia el servidor con el comando npm start.

2. Accede a la API mediante la URL especificada en la documentación.


## Endpoints

#### Asegúrate de configurar las rutas en tu archivo main.js para que la aplicación pueda manejar las solicitudes correctamente. Agrega las siguientes líneas al archivo main.js:
#### app.use("/users", require("./routes/users"));
#### app.use("/products", require("./routes/products"));
#### app.use("/categories", require("./routes/categories"));
#### app.use("/orders", require("./routes/orders"));
#### Esto asegurará que las rutas relacionadas con usuarios, productos, categorías y pedidos estén correctamente enlazadas y puedan ser accedidas a través de las URL correspondientes.

### Usuarios
- Este endpoint se utiliza para recuperar información detallada de un usuario especifico en nuestra api.

#### Crear Usuario

- **Ruta:** `POST /users` 
- **Controlador:** `UserController.create`

#### Obtener Todos los Usuarios

- **Ruta:** `GET /users`
- **Controlador:** `UserController.getAll`

#### Iniciar Sesión

- **Ruta:** `POST /users / login`
- **Controlador:** `UserController.login`

#### Obtener Órdenes del Usuario

- **Ruta:** `GET /users / getUserOrders/:id`
- **Parámetro:** `id` (Identificador del Usuario)
- **Controlador:** `UserController.getUserInfo`

#### Cerrar Sesión

- **Ruta:** `DELETE / users `
- **Middleware:** `authentication` (Middleware de autenticación)
- **Controlador:** `UserController.logout`


### Categorias




### Productos 

Endpoints Products
Crear un Nuevo Producto

Método: POST
Ruta: /
Middleware: authentication, isAdmin
Método del Controlador: ProductController.create
Descripción: Este endpoint permite la creación de un nuevo producto. Solo los usuarios autenticados con privilegios de administrador pueden acceder a esta ruta.
Obtener Todos los Productos

Método: GET
Ruta: /
Método del Controlador: ProductController.getAll
Descripción: Recupera todos los productos disponibles en el sistema.
Obtener Producto con Categoría

Método: GET
Ruta: /withCategory/:id
Método del Controlador: ProductController.getByIdCateg
Descripción: Recupera productos junto con la categoría o categorías a las que pertenecen, según el ID de categoría especificado.
Obtener Producto por ID

Método: GET
Ruta: /id/:id
Método del Controlador: ProductController.getById
Descripción: Recupera un producto específico según su ID.
Filtrar Productos - Precio de Mayor a Menor

Método: GET
Ruta: /filter/highToLowPrice
Método del Controlador: ProductController.highToLow
Descripción: Aplica un filtro para recuperar productos ordenados de mayor a menor precio.
Actualizar Producto por ID

Método: PUT
Ruta: /id/:id
Middleware: authentication, isAdmin
Método del Controlador: ProductController.updateById
Descripción: Actualiza los detalles de un producto específico. Solo los usuarios autenticados con privilegios de administrador pueden acceder a esta ruta.
Eliminar Producto por ID

Método: DELETE
Ruta: /id/:id
Middleware: authentication, isAdmin
Método del Controlador: ProductController.delete
Descripción: Elimina un producto específico del sistema. Solo los usuarios autenticados con privilegios de administrador pueden acceder a esta ruta.


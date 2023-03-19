# GR82-100451032-P2

En este caso práctico queremos desarrollar una simple aplicación que nos permite organizar una lista de tareas, implementando las siguientes funcionalidades básicas: añadir tareas, marcar tareas como completadas, eliminar tareas.

La aplicación estará estructurada en los siguientes ficheros:

- ``index.js``, contendrá la lógica para ejecutar nuestro servidor Web HTTPS.
- ``tasks.json``, contendrá la lista de tareas.
- ``www/index.html``, contendrá la interfaz gráfica para nuestra aplicación.
- ``www/script.js``, contendrá el código JavaScript con las funciones a implementar para proporcionar las funcionalidades deseadas.
Las lista de tareas en nuestra aplicación será un Array de objetos. Cada objeto representa una tarea y contiene las siguientes propiedades:

- ``id``, el índice de la tarea en el Array;
- ``title``, el nombre o descripción del elemento;
- ``done``, un valor boolean que indica si la tarea se ha completado o no.
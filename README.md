# PACKET SENDER NODE JS

- [PACKET SENDER NODE JS](#packet-sender-node-js)
  - [Primeros pasos](#primeros-pasos)
    - [Versiones](#versiones)
  - [Comandos](#comandos)
  - [Dependencias](#dependencias)
## Primeros pasos

[Versiones](#versiones) necesarias para el correcto funcionamiento

1. Ejecuta `npm install` en la raiz de la carpeta para instalar dependencias.
2. Ejecuta `node ./index.js` para ejecutar PSN.
### Versiones 

`node -v` : 12.12.0

`npm -v` : 6.11.3

## Comandos 

Al ingresar mensajes, para enviar un mensaje y luego escuchar en el puerto `0.0.0.0` ingresar `-l` al final.

```bash
$ mensaje a enviar por UDP -l
```

El intervalo de actualizacion esta por defecto en 1000ms.

## Dependencias 

* [easy-table](https://www.npmjs.com/package/easy-table)
* [inquirer](https://www.npmjs.com/package/inquirer)
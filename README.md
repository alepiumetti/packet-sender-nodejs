# CLI - PACKET SENDER NODE JS

CLI para envíar y recibir paquetes UDP. 


- [CLI - PACKET SENDER NODE JS](#cli---packet-sender-node-js)
  - [Primeros pasos](#primeros-pasos)
    - [Versiones](#versiones)
  - [Comandos](#comandos)
    - [De ejecución](#de-ejecución)
    - [Dentro de CLI](#dentro-de-cli)
  - [Dependencias](#dependencias)
  - [Roadmap](#roadmap)
## Primeros pasos

[Versiones](#versiones) necesarias para el correcto funcionamiento

1. Ejecuta `npm install` en la raiz de la carpeta para instalar dependencias.
2. Ejecuta `npm run start` para ejecutar PSN. 
### Versiones 

`node -v` : 12.12.0

`npm -v` : 6.11.3

## Comandos 

### De ejecución 


**Ejecuta el programa**: 

```bash
npm start
```

**Escuchar directamente en una ip y puerto**:

```bash
npm start -- -l [ip] [puerto] || npm start -- --listen [ip] [puerto]
```
**Muestra ayuda**:

```bash
npm start -- -h || npm start -- --help || npm run help
```

**Muestra la versión**:

```bash 
npm start -- -v || npm start -- --version
```

**Envía un mensaje a un determinado ip y puerto**

```bash
npm start -- -s [ip] [puerto] [intervalo] [mensaje] || npm start -- --send [ip] [puerto] [intervalo] [mensaje]
```

**Envía mensajes a un determinado ip y puerto cada determinado tiempo**:

El intervalo es en milisegundos y debe ser mayor o igual a 1000.

```bash
npm start -- -sr [ip] [puerto] [intervalo] [mensaje] || npm start -- --sendRepeat [ip] [puerto] [intervalo] [mensaje]
```


### Dentro de CLI


Al ingresar mensajes, para enviar un mensaje y luego escuchar en el puerto `0.0.0.0` ingresar `-l` al final.

```bash
$ mensaje a enviar por UDP -l
```

El intervalo de actualizacion esta por defecto en 1000ms.

## Dependencias 

* [easy-table](https://www.npmjs.com/package/easy-table)
* [inquirer](https://www.npmjs.com/package/inquirer)

## Roadmap

- [x] Recepcion de paquetes UDP
  - [x] eliminar el CTRL + S 
  - [x] Que muestre los mensajes cada vez que se reciba
  - [ ] permitir decidir que cantidad de lineas mostrar
  - [x] guardar logs localmente en .csv
- [x] Envio de paquetes UDP
  - [x] Comando -l para escuchar luego de enviar un paquete
  - [ ] Comando -sr para enviar paquetes continuamente
- [x] Crear scripts de ejecucion rapidos
  - [x] -l || --listen para escuchar directo a una ip y puerto
  - [x] -h || --help para ver la ayuda
  - [x] -v || --help para ver la  versión
  - [x] -s || --send para enviar directo a una ip y puerto
  - [x] -sr || --sendRepeat para enviar mensajes continuamente
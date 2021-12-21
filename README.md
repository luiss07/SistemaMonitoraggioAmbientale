# SistemaMonitoraggioAmbientale
Questa repository contiene il progetto per il corso di Ingegneria del software @Unitn

Questo progetto consiste in un API RestFul scritta in linguaggio Javascript, html, css con l'utilizzo di JQuery e Bootstrap.

# Guida all'avvio
Per testare in locale l'applicazione per prima cosa clonare la repository.

``` git clone https://github.com/luiss07/SistemaMonitoraggioAmbientale.git ```

In un terminale spostarsi nella cartella api ed eseguire il server

``` cd api ```

``` npm start ```

Per avviare l'applicazione è consigliato utilizzare l'estensione ``` live server ``` di vscode per aprire il file ``` index.html ```

La documentazione API è raggiungibile all'indirizzo ``` http://localhost:49146/api-docs ```

Per eseguire i test lanciare ``` npm test ``` all'interno della cartella ``` api ```

# Note 
All'interno dell'applicazione è presente uno script js (``` simulatePecentage.js ```) che simula le percentuali di rischio ambientale aggiornandole ogni 10 minuti. Per vedere in tempo reale l'aggiornamento è consigliato impostare il tempo di esecuzione dello script a ``` 5 sec (5000) riga 45 ```.
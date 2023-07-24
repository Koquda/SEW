var cliente = new Object();

cliente.nombre = navigator.appName;
cliente.idioma = navigator.language;
cliente.version = navigator.appVersion;
cliente.plataforma = navigator.platform;
cliente.vendedor = navigator.vendor;
cliente.agente = navigator.userAgent;
cliente.javaActivo = navigator.javaEnabled();
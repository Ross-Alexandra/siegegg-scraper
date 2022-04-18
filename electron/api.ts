const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    test: 'does it work?'
});
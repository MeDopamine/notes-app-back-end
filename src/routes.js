const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler   } = require('./handler');
const routes = [
    {
        method: 'Post',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'Get',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'Get',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'Put',
        path: '/notes/{id}',
        handler: editNoteByIdHandler ,
    },
    {
        method: 'Delete',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler  ,
    },
    
];

module.exports = routes;
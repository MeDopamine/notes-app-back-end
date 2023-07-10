const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);
    console.log(notes);

    const isSuccess = notes.some((note) => note.id === id);
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
})

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.find((note) => note.id === id);
    if (note !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                note,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const note = notes.find((note) => note.id === id);

    if (note !== undefined) {
        Object.assign(note, {
            title,
            tags,
            body,
            updatedAt,
        });
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;

}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1); // Menghapus catatan dari array

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
};


module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
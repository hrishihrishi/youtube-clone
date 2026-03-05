const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');

// Custom multer storage engine that REUSES the existing Mongoose connection
// instead of creating a new one (which caused the "connection must be open" error)
const gridFsStorage = {
    _handleFile(req, file, cb) {
        // Use the connection that is already open from db.js / server.js
        const db = mongoose.connection.db;

        if (!db) {
            return cb(new Error('Mongoose connection is not open yet'));
        }

        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        // Generate a random unique filename
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const filename = buf.toString('hex') + path.extname(file.originalname);
            const uploadStream = bucket.openUploadStream(filename);

            // Pipe the incoming file into GridFS
            file.stream.pipe(uploadStream)
                .on('error', cb)
                .on('finish', () => {
                    cb(null, {
                        filename: filename,
                        id: uploadStream.id,
                        size: uploadStream.length,
                    });
                });
        });
    },

    _removeFile(req, file, cb) {
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
        bucket.delete(file.id, cb);
    }
};

const upload = multer({
    storage: gridFsStorage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

module.exports = { upload };
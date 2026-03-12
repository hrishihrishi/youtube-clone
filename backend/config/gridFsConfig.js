import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';

/**
 * Custom Multer storage engine that reuses the existing Mongoose connection.
 * This ensures file uploads are streamed directly into MongoDB's GridFS System.
 */
const gridFsStorage = {
    // Principal method for handling incoming files from a form
    _handleFile(req, file, cb) {
        // Retrieve the database instance from the established Mongoose connection
        const db = mongoose.connection.db;

        if (!db) {
            return cb(new Error('Mongoose connection is not open yet'));
        }

        // Initialize a GridFSBucket to manage 'uploads' in the database
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

        // Generate a cryptographically secure 16-character unique filename
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            // Combine the random string with the original file's extension
            const filename = buf.toString('hex') + path.extname(file.originalname);
            // Open a write stream to GridFS to begin storing the file
            const uploadStream = bucket.openUploadStream(filename);

            // Pipe the incoming binary stream from the request into the MongoDB bucket
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

    // Method to handle file cleanup if an error occurs during processing
    _removeFile(req, file, cb) {
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
        bucket.delete(file.id, cb);
    }
};

// Initialize Multer with the custom GridFS storage engine.
export const upload = multer({
    storage: gridFsStorage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});
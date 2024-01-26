const mongoose = require('mongoose');
const { Schema } = mongoose;

const CertificationRequestSchema = new Schema({
    certificationType: {
        type: String,
        required: true,
        enum: ['Φοιτητικής Ιδιότητας', 'Φορολογικής Χρήσης', 'Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς', 'Στρατολογική χρήση (Συνοπτικό)', 'Στρατολογική χρήση (Αναλυτικό)']
    },
    numberOfCopies: {
        type: Number,
        required: true,
        min: 1
    },
    requestDate: {
        type: Date,
        required: true
    },
    // Assuming you have user IDs, you may want to link the request to a specific user
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // or whatever your user model is called
        required: true
    }
    // You can add other fields as necessary
});

const CertificationRequest = mongoose.model('CertificationRequest', CertificationRequestSchema);

module.exports = CertificationRequest;
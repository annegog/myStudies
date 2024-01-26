const mongoose = require('mongoose');
const { Schema } = mongoose;

const CertificationRequestSchema = new Schema({
    certificationType: { type: String, required: true, enum: ['Φοιτητικής Ιδιότητας', 'Φορολογικής Χρήσης', 'Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς', 'Στρατολογική χρήση (Συνοπτικό)', 'Στρατολογική χρήση (Αναλυτικό)'] },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    numberOfCopies: { type: Number, required: true, min: 1 },
    requestDate: { type: Date, required: true }
});

const CertificationRequest = mongoose.model('CertificationRequest', CertificationRequestSchema);

module.exports = CertificationRequest;
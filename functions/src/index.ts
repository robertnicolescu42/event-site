/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from 'firebase-functions/v2/https';
 * import {onDocumentWritten} from 'firebase-functions/v2/firestore';
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const db = admin.firestore();
const allowedLocations = ['pitesti', 'bucuresti'];
const allowedOrigins = ['http://localhost:4200'];
const corsHandler = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

export const getLatestEvent = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const location = req.query.location as string;

      if (!location) {
        res.status(400).json({ error: 'Location parameter is required' });
        return;
      }

      if (!allowedLocations.includes(location.toLowerCase())) {
        res.status(403).json({ error: 'Unauthorized location' });
        return;
      }

      const eventsRef = db.collection('events');
      const querySnapshot = await eventsRef
        .where('location', '==', location)
        .orderBy('date', 'desc')
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        res.status(404).json({ message: 'No events found for this location' });
        return;
      }

      const eventDoc = querySnapshot.docs[0];
      const eventData = eventDoc.data();

      const attendeesRef = eventDoc.ref.collection('attendees');
      const countSnapshot = await attendeesRef.count().get();
      const attendeeCount = countSnapshot.data()?.count || 0;

      // Return the event data with the attendee count
      res.status(200).json({ ...eventData, attendeeCount });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

export const registerForEvent = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    // maybe autogenerate an ID instead of using the email
    try {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
      }

      const { eventId, name, email, phone, message, newsletter } = req.body;

      if (!eventId || !name || !email) {
        res
          .status(400)
          .json({ error: 'eventId, name, and email are required' });
        return;
      }

      const userRef = db.collection('users').doc(email);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) {
        await userRef.set({
          name,
          email,
          phone: phone || null,
          newsletter: newsletter || false,
        });
      }

      if (newsletter) {
        const newsletterRef = db.collection('newsletter').doc(email);
        const newsletterSnapshot = await newsletterRef.get();

        if (!newsletterSnapshot.exists) {
          await newsletterRef.set({ name, email });
        }
      }

      const attendeeRef = db
        .collection(`events/${eventId}/attendees`)
        .doc(email);
      await attendeeRef.set({
        name,
        email,
        phone: phone || null,
        message: message || null,
      });

      res
        .status(200)
        .json({ message: 'User successfully registered for the event' });
    } catch (error) {
      console.error('Error registering for event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

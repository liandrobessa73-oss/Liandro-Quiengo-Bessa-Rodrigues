import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { Provider, Publication } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyD9Kr3wLF93VyzdeJl36AJuARyDAmaSHlQ",
  authDomain: "gleaming-seat-wqk4z.firebaseapp.com",
  projectId: "gleaming-seat-wqk4z",
  storageBucket: "gleaming-seat-wqk4z.firebasestorage.app",
  messagingSenderId: "481471747411",
  appId: "1:481471747411:web:2bebbb3dcd3bfcf3d7fda6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Helper to sanitize object for Firestore (eliminating undefined values)
function sanitizeForFirestore(obj: any): any {
  return JSON.parse(JSON.stringify(obj, (key, value) => {
    return value === undefined ? null : value;
  }));
}

// 1. Providers Collection
export async function getFirestoreProviders(fallback: Provider[]): Promise<Provider[]> {
  try {
    const colRef = collection(db, 'providers');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log('No providers found in Firestore, seeding database...');
      // Seed database with mock providers
      for (const provider of fallback) {
        const docRef = doc(db, 'providers', provider.id);
        await setDoc(docRef, sanitizeForFirestore(provider));
      }
      return fallback;
    }
    const providers: Provider[] = [];
    snapshot.forEach((docSnap) => {
      providers.push(docSnap.data() as Provider);
    });
    return providers;
  } catch (error) {
    console.error('Error fetching providers from Firestore:', error);
    return fallback;
  }
}

export async function saveFirestoreProvider(provider: Provider): Promise<void> {
  try {
    const docRef = doc(db, 'providers', provider.id);
    await setDoc(docRef, sanitizeForFirestore(provider));
  } catch (error) {
    console.error(`Error saving provider ${provider.id} to Firestore:`, error);
  }
}

// 2. Publications (Mural) Collection
export async function getFirestorePublications(fallback: Publication[]): Promise<Publication[]> {
  try {
    const colRef = collection(db, 'publications');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log('No publications found in Firestore, seeding database...');
      // Seed database with initial publications
      for (const pub of fallback) {
        const docRef = doc(db, 'publications', pub.id);
        await setDoc(docRef, sanitizeForFirestore(pub));
      }
      return fallback;
    }
    const publications: Publication[] = [];
    snapshot.forEach((docSnap) => {
      publications.push(docSnap.data() as Publication);
    });
    // Sort publications by date or id descending if needed, let's keep them as they are
    return publications;
  } catch (error) {
    console.error('Error fetching publications from Firestore:', error);
    return fallback;
  }
}

export async function saveFirestorePublication(publication: Publication): Promise<void> {
  try {
    const docRef = doc(db, 'publications', publication.id);
    await setDoc(docRef, sanitizeForFirestore(publication));
  } catch (error) {
    console.error(`Error saving publication ${publication.id} to Firestore:`, error);
  }
}

// 3. Bookings (Agendamentos) Collection
export async function getFirestoreBookings(): Promise<any[]> {
  try {
    const colRef = collection(db, 'bookings');
    const snapshot = await getDocs(colRef);
    const bookings: any[] = [];
    snapshot.forEach((docSnap) => {
      bookings.push(docSnap.data());
    });
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings from Firestore:', error);
    return [];
  }
}

export async function saveFirestoreBooking(booking: any): Promise<void> {
  try {
    const docRef = doc(db, 'bookings', booking.id);
    await setDoc(docRef, sanitizeForFirestore(booking));
  } catch (error) {
    console.error(`Error saving booking ${booking.id} to Firestore:`, error);
  }
}

export async function deleteFirestoreBooking(bookingId: string): Promise<void> {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting booking ${bookingId} from Firestore:`, error);
  }
}

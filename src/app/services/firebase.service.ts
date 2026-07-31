import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;
  isMockMode = true;

  constructor() {
    this.initFirebase();
  }

  private initFirebase() {
    const cfg = environment.firebase;
    // Check if configuration is a dummy placeholder or missing
    const isMock = !cfg || 
                  cfg.apiKey === 'YOUR_API_KEY' || 
                  cfg.projectId === 'YOUR_PROJECT_ID' ||
                  !cfg.apiKey;

    if (isMock) {
      console.log('Firebase running in MOCK mode. Submissions will be stored in LocalStorage.');
      this.isMockMode = true;
      return;
    }

    try {
      this.app = getApps().length ? getApps()[0] : initializeApp(cfg);
      this.db = getFirestore(this.app);
      this.isMockMode = false;
      console.log('Firebase successfully initialized in real-time mode.');
    } catch (e) {
      console.warn('Firebase initialization failed. Falling back to local MOCK mode.', e);
      this.isMockMode = true;
    }
  }

  async submitContactForm(message: ContactMessage): Promise<void> {
    if (this.isMockMode || !this.db) {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const savedMessages = localStorage.getItem('portfolio_contacts');
      const messagesList = savedMessages ? JSON.parse(savedMessages) : [];
      
      const mockMessage = {
        ...message,
        id: 'msg_' + Date.now(),
        timestamp: new Date().toISOString()
      };
      
      messagesList.push(mockMessage);
      localStorage.setItem('portfolio_contacts', JSON.stringify(messagesList));
      console.log('Mock stored contact message successfully:', mockMessage);
      return;
    }

    try {
      const messagesRef = collection(this.db, 'contacts');
      await addDoc(messagesRef, {
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
        timestamp: serverTimestamp()
      });
      console.log('Stored contact message in Firebase Firestore successfully!');
    } catch (error) {
      console.error('Failed to store message in Firestore. Trying local storage fallback.', error);
      // Fallback
      const savedMessages = localStorage.getItem('portfolio_contacts');
      const messagesList = savedMessages ? JSON.parse(savedMessages) : [];
      messagesList.push({
        ...message,
        id: 'msg_' + Date.now(),
        timestamp: new Date().toISOString(),
        error: 'Failed to write to firestore: ' + (error as Error).message
      });
      localStorage.setItem('portfolio_contacts', JSON.stringify(messagesList));
    }
  }
}

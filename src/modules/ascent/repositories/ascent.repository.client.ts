import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';
import type { NewsletterIssue } from '@/types/newsletter';
export function subscribeToNewsletters(onData:(items:Array<NewsletterIssue & {createdAt?:unknown}>)=>void,onError?:(error:Error)=>void){
 if(!db){onData([]);return()=>undefined;} const q=query(collection(db,'newsletters'),orderBy('createdAt','desc'));
 return onSnapshot(q,(snapshot)=>onData(snapshot.docs.map(d=>({id:d.id,...(d.data() as Omit<NewsletterIssue,'id'>)}))),e=>onError?.(e));
}
export async function saveNewsletter(id:string,payload:Omit<NewsletterIssue,'id'>,isExisting:boolean){ if(!db)throw new Error('Firebase is not configured'); await setDoc(doc(db,'newsletters',id),{...payload,updatedAt:serverTimestamp(),...(isExisting?{}:{createdAt:serverTimestamp()})},{merge:true}); }
export async function removeNewsletter(id:string){if(!db)throw new Error('Firebase is not configured');await deleteDoc(doc(db,'newsletters',id));}

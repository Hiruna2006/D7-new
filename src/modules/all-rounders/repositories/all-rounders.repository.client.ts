import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/src/core/firebase/client';
import type { MonthHighlight } from '@/types/all-rounder';
export function subscribeToAllRounders(onData:(items:MonthHighlight[])=>void,onError?:(error:Error)=>void){ if(!db){onData([]);return()=>undefined;} const q=query(collection(db,'allRoundersHighlights'),orderBy('monthIndex','asc')); return onSnapshot(q,(snapshot)=>onData(snapshot.docs.map(d=>({...(d.data() as MonthHighlight),id:d.id}))),e=>onError?.(e)); }
export async function saveAllRounderHighlight(id:string,payload:Record<string,unknown>,isExisting:boolean){if(!db)throw new Error('Firebase is not configured');await setDoc(doc(db,'allRoundersHighlights',id),{...payload,updatedAt:serverTimestamp(),...(isExisting?{}:{createdAt:serverTimestamp()})},{merge:true});}
export async function removeAllRounderHighlight(id:string){if(!db)throw new Error('Firebase is not configured');await deleteDoc(doc(db,'allRoundersHighlights',id));}

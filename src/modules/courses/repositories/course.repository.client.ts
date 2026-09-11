import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase/client';
import type { Course } from '../../../../types/course';
export function subscribeToCourses(onData:(items:Array<Partial<Course>&{id:string}>)=>void,onError?:(error:Error)=>void){if(!db){onData([]);return()=>undefined;}const q=query(collection(db,'courses'),orderBy('title','asc'));return onSnapshot(q,(snapshot)=>onData(snapshot.docs.map(d=>({id:d.id,...(d.data() as Partial<Course>)}))),e=>onError?.(e));}
export async function getCourses(){if(!db)return[];const q=query(collection(db,'courses'),orderBy('title','asc'));const snapshot=await getDocs(q);return snapshot.docs.map(d=>({id:d.id,...(d.data() as Partial<Course>)}));}
export async function saveCourse(id:string,payload:Record<string,unknown>,isExisting:boolean){if(!db)throw new Error('Firebase is not configured');await setDoc(doc(db,'courses',id),{...payload,updatedAt:serverTimestamp(),...(isExisting?{}:{createdAt:serverTimestamp()})},{merge:true});}
export async function removeCourse(id:string){if(!db)throw new Error('Firebase is not configured');await deleteDoc(doc(db,'courses',id));}

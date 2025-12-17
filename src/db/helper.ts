import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  QueryConstraint,
  type FirestoreDataConverter,
  type DocumentData,
  Timestamp,
  FieldValue,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { logger, LogId } from "../services/logger";

export interface BaseEntity {
  id: string;
  createdAt: Timestamp | FieldValue | null;
  updatedAt: Timestamp | FieldValue | null;
}
export type DbInput<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export const createCollection = <T extends BaseEntity>(
  collectionName: string
) => {
  const converter: FirestoreDataConverter<T> = {
    toFirestore: (data: T) => {
      const { id: _id, ...rest } = data;
      return rest as DocumentData;
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options)!;
      return {
        id: snapshot.id,
        ...data,
      } as T;
    },
  };

  const colRef = collection(db, collectionName).withConverter(converter);

  const handleDbError = (action: string, error: unknown) => {
    const errObj = error instanceof Error ? error : new Error(String(error));
    logger.error(errObj, {
      componentStack: `[DB Helper] ${collectionName}.${action}`,
    } as any);
  };

  return {
    getAll: async (constraints: QueryConstraint[] = []): Promise<T[]> => {
      try {
        const q = query(colRef, ...constraints);
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data());
      } catch (e) {
        handleDbError("getAll", e);
        throw e;
      }
    },

    getById: async (id: string): Promise<T | null> => {
      try {
        const docRef = doc(colRef, id);
        const snap = await getDoc(docRef);
        return snap.exists() ? snap.data() : null;
      } catch (e) {
        handleDbError("getById", e);
        throw e;
      }
    },

    add: async (data: DbInput<T>): Promise<string> => {
      try {
        const payload = {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        } as unknown as T;

        const docRef = await addDoc(colRef, payload);

        logger.action({
          logId: LogId.DB_CREATE,
          params: { collection: collectionName, docId: docRef.id },
        });

        return docRef.id;
      } catch (e) {
        handleDbError("add", e);
        throw e;
      }
    },

    update: async (id: string, data: Partial<DbInput<T>>): Promise<void> => {
      try {
        const docRef = doc(colRef, id);
        const payload = { ...data, updatedAt: serverTimestamp() };

        await updateDoc(docRef, payload as DocumentData);

        logger.action({
          logId: LogId.DB_UPDATE,
          params: { collection: collectionName, docId: id },
        });
      } catch (e) {
        handleDbError("update", e);
        throw e;
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(colRef, id));

        logger.action({
          logId: LogId.DB_DELETE,
          params: { collection: collectionName, docId: id },
        });
      } catch (e) {
        handleDbError("delete", e);
        throw e;
      }
    },
  };
};

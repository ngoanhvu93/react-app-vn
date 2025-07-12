import {
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface WeddingInvitation {
  id?: string;
  userId: string;
  slug: string;
  groomName: string;
  brideName: string;
  groomFamily: {
    father: string;
    mother: string;
    address: string;
  };
  brideFamily: {
    father: string;
    mother: string;
    address: string;
  };
  eventDate: string;
  eventTime: string;
  venue: {
    name: string;
    address: string;
  };
  bankAccounts: {
    groom: {
      bankName: string;
      accountName: string;
      accountNumber: string;
    };
    bride: {
      bankName: string;
      accountName: string;
      accountNumber: string;
    };
  };
  images: {
    hero: string;
    groom: string;
    bride: string;
    gallery: string[];
  };
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class WeddingInvitationService {
  private collectionName = "wedding-invitations";

  // Tạo thiệp cưới mới
  async createInvitation(
    invitation: Omit<WeddingInvitation, "id" | "createdAt" | "updatedAt">,
    userId: string
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...invitation,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating invitation:", error);
      throw error;
    }
  }

  // Lấy tất cả thiệp cưới của một user
  async getInvitationsByUserId(userId: string): Promise<WeddingInvitation[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as WeddingInvitation[];
    } catch (error) {
      console.error("Error getting invitations by userId:", error);
      throw error;
    }
  }

  // Lấy thiệp cưới theo ID và kiểm tra quyền sở hữu
  async getInvitationById(
    id: string,
    userId: string
  ): Promise<WeddingInvitation | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as WeddingInvitation;
        // Kiểm tra xem user có quyền truy cập thiệp cưới này không
        if (data.userId === userId) {
          return { id: docSnap.id, ...data };
        }
        return null; // Không có quyền truy cập
      }
      return null;
    } catch (error) {
      console.error("Error getting invitation by id:", error);
      throw error;
    }
  }

  // Lấy thiệp cưới theo slug
  async getInvitationBySlug(slug: string): Promise<WeddingInvitation | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("slug", "==", slug),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as WeddingInvitation;
      }
      return null;
    } catch (error) {
      console.error("Error getting invitation:", error);
      throw error;
    }
  }

  // Cập nhật thiệp cưới
  async updateInvitation(
    id: string,
    updates: Partial<WeddingInvitation>,
    userId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Invitation not found");
      }

      const data = docSnap.data() as WeddingInvitation;
      if (data.userId !== userId) {
        throw new Error(
          "Unauthorized: You can only update your own invitations"
        );
      }

      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating invitation:", error);
      throw error;
    }
  }

  // Xóa thiệp cưới
  async deleteInvitation(id: string, userId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Invitation not found");
      }

      const data = docSnap.data() as WeddingInvitation;
      if (data.userId !== userId) {
        throw new Error(
          "Unauthorized: You can only delete your own invitations"
        );
      }

      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting invitation:", error);
      throw error;
    }
  }

  // Upload ảnh lên Firebase Storage
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  // Tạo slug từ tên cô dâu và chú rể
  generateSlug(groomName: string, brideName: string): string {
    const cleanGroom = groomName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanBride = brideName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return `${cleanGroom}-${cleanBride}-${Date.now()}`;
  }
}

export const weddingInvitationService = new WeddingInvitationService();

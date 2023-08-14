"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "@/components/ui/modal";

const StoreModal = () => {
  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create a new store"
      description="Add a new store to manage your orders and products"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future form
    </Modal>
  );
};

export default StoreModal;

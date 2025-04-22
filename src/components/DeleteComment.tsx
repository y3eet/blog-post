"use client";

import { deleteComment } from "@/app/actions";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function handleDelete() {
    setDisabled(true);
    try {
      await deleteComment(commentId);
      router.refresh();
      setOpen(false);
    } catch (e) {
      alert(e);
    }
    setDisabled(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-xs btn-soft btn-error ml-2"
      >
        <Trash size={15} />
      </button>
      <Modal open={open}>
        <h3 className="font-bold text-lg">Delete Blog Comment</h3>
        <p className="py-4"> Are you sure you want to delete this comment?</p>
        <div className="flex justify-end w-full gap-2">
          <button
            disabled={disabled}
            className="btn btn-soft"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            onClick={() => handleDelete()}
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteComment;

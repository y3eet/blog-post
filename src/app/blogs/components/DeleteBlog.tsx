"use client";

import Modal from "@/components/Modal";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { deletePost } from "../../actions";
import { useRouter } from "next/navigation";

const DeleteBlog = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function handleDelete() {
    setDisabled(true);
    try {
      await deletePost(postId);
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
        className="btn btn-sm btn-error btn-circle mr-2"
      >
        <Trash size={18} />
      </button>
      <Modal open={open}>
        <h3 className="font-bold text-lg">Delete Blog Post</h3>
        <p className="py-4"> Are you sure you want to delete this post?</p>
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

export default DeleteBlog;

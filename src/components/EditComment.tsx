"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { updateComment } from "@/app/actions";
import { Pencil } from "lucide-react";

const EditComment = ({
  commentId,
  commentContent,
}: {
  commentId: string;
  commentContent: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [content, setContent] = useState(commentContent);

  async function handleUpdateComment() {
    setDisabled(true);
    try {
      await updateComment(commentId, content);
      setOpen(false);
    } catch (e) {
      alert(e);
    }
    setDisabled(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-xs btn-soft btn-success"
      >
        <Pencil size={15} />
      </button>
      <Modal open={open}>
        <h3 className="font-bold text-lg">Edit Comment</h3>
        {content}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered h-24 w-full my-4"
        ></textarea>

        <div className="flex justify-end w-full gap-2">
          <button
            disabled={disabled}
            className="btn btn-soft"
            onClick={() => {
              setOpen(false);
              setContent(commentContent);
            }}
          >
            Cancel
          </button>
          <button
            disabled={disabled || commentContent === content}
            className="btn btn-success"
            onClick={handleUpdateComment}
          >
            Update Comment
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditComment;

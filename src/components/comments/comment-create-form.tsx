"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button, Textarea } from "@heroui/react";
import { useActionState, useEffect, useRef, useState } from "react";

interface CommentCreateFormProps {
  locationId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  locationId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { locationId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton isLoading={isPending}>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}

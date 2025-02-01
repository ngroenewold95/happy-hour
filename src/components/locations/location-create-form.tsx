"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import {
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";
import { startTransition, useActionState } from "react";

interface LocationCreateFormProps {
  slug: string;
}

export default function LocationCreateForm({ slug }: LocationCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createLocation.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Location</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Location</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

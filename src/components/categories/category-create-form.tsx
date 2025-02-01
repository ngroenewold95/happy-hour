"use client";

import { startTransition, useActionState } from "react";

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

export default function CategoryCreateForm() {
  const [formState, action, isPending] = useActionState(
    actions.createCategory,
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
        <Button color="primary">Create a Category</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Category</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your category"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
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

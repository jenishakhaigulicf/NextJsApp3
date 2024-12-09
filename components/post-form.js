"use client";
import FormSubmit from "@/components/form-submit";
import { useFormState } from "react-dom";

import React from "react";

const PostForm = ({ action }) => {
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p>
          {state?.errors?.find((error) => error.title === "title")?.content}
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p>
          {state?.errors?.find((error) => error.title === "image")?.content}
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p>
          {state?.errors?.find((error) => error.title === "content")?.content}
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((error) => (
              <li key={error}>{error.content}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default PostForm;

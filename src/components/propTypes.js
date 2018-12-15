import { string, shape } from "prop-types";

export const coursePropType = shape({
  id: string,
  title: string,
  authorId: string,
  length: string,
  category: string
});

export const authorPropType = shape({
  id: string,
  firstName: string,
  lastName: string
});

import { string, number, shape } from "prop-types";

export const coursePropType = shape({
  id: number,
  title: string,
  authorId: number,
  category: string
});

export const authorPropType = shape({
  id: number,
  firstName: string,
  lastName: string
});

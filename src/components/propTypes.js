import { string, shape } from "prop-types";

export const coursePropType = shape({
  id: string,
  title: string,
  authorId: string,
  length: string,
  category: string
});

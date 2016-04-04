import * as types from '../constants/actionTypes';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}

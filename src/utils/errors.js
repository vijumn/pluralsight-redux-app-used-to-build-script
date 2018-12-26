import { toast } from "react-toastify";

export function toastError(message, error) {
  toast.error(message + error.message, {
    autoClose: false
  });
}

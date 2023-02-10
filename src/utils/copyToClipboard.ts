import toast from "react-hot-toast";

export const copyToClipBoard = (text = "", message = "Copy to clipboard successfully") => {
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
  toast.success(message);
};

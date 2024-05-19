export const copyToClipBoard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error(error);
  }
};

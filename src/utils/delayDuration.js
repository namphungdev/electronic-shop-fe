import { delay } from "./delay";

export const delayDuration = async (startTime, limitDuration) => {
  const endTime = Date.now();
  if (!!limitDuration) {
    const timeout = endTime - startTime;
    if (timeout < limitDuration) {
      await delay(limitDuration - timeout);
    }
  }
};

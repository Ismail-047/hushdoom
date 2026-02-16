export const formatRemainingSnooze = (until) => {
   const left = until - Date.now();
   if (left <= 0) return null;

   const totalSeconds = Math.floor(left / 1000);
   const seconds = totalSeconds % 60;
   const minutes = Math.floor(totalSeconds / 60);
   const hours = Math.floor(minutes / 60);

   const parts = [];
   if (hours >= 1) parts.push(`${hours}h`);
   if (minutes > 0 || hours >= 1) parts.push(`${minutes % 60}m`);
   parts.push(`${seconds}s`);

   return parts.join(" ");
};
// function minJumps(arr, start=0, end=arr.length-1) {
//   // base case: when start and end are at the same spot
//   if (start === end) {
//     return 0;
//   }
//   // when nothing is reachable, return infinity
//   if (arr[start] === 0) {
//     return Infinity;
//   }
//   // traverse through all the spots reachable by
//   // arr[start], recursively getting the min number
//   // of jumps needed to reach arr[end]
//   let min = Infinity;
//   for (let i = start + 1; i <= end && i <= start + arr[start]; i++) {
//     const jumps = minJumps(arr, start, end);
//     if (jumps !== Infinity && jumps + 1 < min) {
//       min = jumps + 1;
//     }
//   }
//   return min;
// }

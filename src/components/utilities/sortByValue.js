/**
 * Use in Array .sort() calls
 * returns 1, 0, -1 depending on numeric comparison of val1 and val2
 * if a tie is made uses the tieBreaker (optional) value or returns 0
 *
 * @param {*} val1 string (unicode compare) or number
 * @param {*} val2 string (unicode compare) or number
 * @param {*} tieBreaker [optional] value derived from a tiebreaker sort function
 *
 * @example
 * const sortByTitle = (project1, project2) => {
 * const title1 = project1.title;
 * const title2 = project2.title;
 *  // no tieBreaker defined, accepts default 0 value for ties
 * return sortByValue(title1, title2);
 * };
*
 * const sortByTier = (project1, project2) => {
 *   const tier1 = project1.tier.level;
 *   const tier2 = project2.tier.level;
 *   // tieBreaker derived from sortByTitle used if tier values are equal
 *   return sortByValue(tier1, tier2, sortByTitle(project1, project2));
 * };
*/
const sortByValue = (val1, val2, tieBreaker) => {
  if (val1 > val2) return 1;
  if (val1 < val2) return -1;
  return tieBreaker !== undefined
    ? tieBreaker
    : 0;
};

export default sortByValue;

import SplitType from "split-type";

export function splitIntoLetters(textElementToSplit) {
  const splitText = new SplitType(textElementToSplit);
  return splitText;
}

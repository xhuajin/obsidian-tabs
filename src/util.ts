export function createCodeBlock(code: string, language: string = "") : string {
  let backquoteNum = 3;
  if (code.includes("```")) {
    for (let i = 0, count = 0; i < code.length; i++) {
      if (code[i] === "`") {
        count++;
        backquoteNum = Math.max(backquoteNum, count);
      } else {
        count = 0;
      }
    }
  }
  if (code.contains("~~~")) {
    for (let i = 0, count = 0; i < code.length; i++) {
      if (code[i] === "~") {
        count++;
        backquoteNum = Math.max(backquoteNum, count);
      } else {
        count = 0;
      }
    }
  }
  return "`".repeat(backquoteNum) + language + "\n" + 
    code + "\n" + 
    "`".repeat(backquoteNum);
}

export function getFormattedContent(rowStr: string, format: string, tail?: string): string {
  tail = tail || format;
  if (rowStr.length <= format.length + tail.length) {
    return format + rowStr + tail;
  }
  if (rowStr.substring(0, format.length) == format && rowStr.substring(rowStr.length - tail.length) == tail) {
    return rowStr.substring(format.length, rowStr.length - tail.length);
  }
  return format + rowStr + tail;
}
function main(input) {
  let index = 0;
  function findA(c) {
    index++;

    console.log("findA", c);
    if (c === "a") {
      // console.log(index);
      return findB;
    }
    // index++;
    return findA;
  }

  function findB(c) {
    index++;

    console.log("findB", c);
    if (c === "b") {
      // console.log(index);
      return findA1;
    }
    // index++;
    return findA;
  }

  function findA1(c) {
    index++;

    console.log("findA1", c);
    if (c === "a") {
      // console.log(index);
      return findB1;
    }
    // index++;
    return findA;
  }

  function findB1(c) {
    index++;

    console.log("findB1", c);
    if (c === "b") {
      // console.log(index);
      return findD;
    }
    // index++;
    return findA;
  }

  function findD(c) {
    index++;

    console.log("findD", c);
    if (c === "d") {
      // console.log(index);
      return end;
    } else if (c === "a") {
      return findB1;
    }
    // index++;
    return findA;
  }

  function end() {
    return end;
  }

  let state = findA;
  for (const c of input.split("")) {
    state = state(c);
  }
  if (state === end) {
    console.log(index);
  }
}

main("abababd");
// ababd

regexp("ababd", "abababd");

function regexp(target, source) {
  const states = generateStateFn(target);

  function end() {
    return end;
  }

  let state = findA;
  for (const c of input.split("")) {
    state = state(c);
  }
  if (state === end) {
    return index;
  }

  return -1;
  function generateStateFn(target) {}
}

const ALL_TYPES = [
  {
    tag: "number",
    type: "declaration",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      numberTagVerification(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "string",
    type: "declaration",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      stringTagVerification(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "boolean",
    type: "declaration",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      booleanTagVerification(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "=",
    type: "asignation",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      assignValidation(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "+",
    type: "operation",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
        validateSumOperation(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "-",
    type: "operation",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      validateRestOperation(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "/",
    type: "operation",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      validateDivisionOperation(i, p, iSimbolo, iInstruccion, program);
    },
  },
  {
    tag: "*",
    type: "operation",
    rule: (i, p, iSimbolo, iInstruccion, program) => {
      validateMultiplyOperation(i, p, iSimbolo, iInstruccion, program);
    },
  },
  { tag: ";", type: "break", rule: () => {} },
];

let lexicStructure = [];
let symbolsMatched = [];
let output = [];
const ERROR_LINE = "Error, linea ";
const ERROR_ALPHANUMERIC = ": El nombre de la variable no es alfanumerico";
const ERROR_NAME_VARIABLE = ": La variable tiene que tener un nombre";

const numberTagVerification = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  if (parts[0] !== "number") {
    output.push(
      ERROR_LINE +
        (indexInstruccion + 1) +
        ": El tag number no esta al principio de la instruccion"
    );
    return;
  }
  if (!parts[1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (symbolsMatched.find((symbol) => symbol.tag === parts[1])) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (!parts[1].match(/^[a-zA-Z0-9]+$/)) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_ALPHANUMERIC);
    return;
  }

  alreadyDeclared(parts[1], "number", indexSimbolo, indexInstruccion, program);

  return false;
};

const stringTagVerification = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  if (parts[0] !== "string") {
    output.push(
      ERROR_LINE +
        (indexInstruccion + 1) +
        ": El tag string no esta al principio de la instruccion"
    );
    return;
  }
  if (!parts[1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (symbolsMatched.find((symbol) => symbol.tag === parts[1])) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (!parts[1].match(/^[a-zA-Z0-9]+$/)) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_ALPHANUMERIC);
    return;
  }

  alreadyDeclared(parts[1], "string", indexSimbolo, indexInstruccion, program);

  return false;
};

const booleanTagVerification = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  if (parts[0] !== "boolean") {
    output.push(
      ERROR_LINE +
        (indexInstruccion + 1) +
        ": El tag boolean no esta al principio de la instruccion"
    );
    return;
  }
  if (!parts[1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (symbolsMatched.find((symbol) => symbol.tag === parts[1])) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_NAME_VARIABLE);
    return;
  }
  if (!parts[1].match(/^[a-zA-Z0-9]+$/)) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ERROR_ALPHANUMERIC);
    return;
  }

  alreadyDeclared(parts[1], "boolean", indexSimbolo, indexInstruccion, program);

  return false;
};

const assignValidation = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  if (parts[1] !== "=" && parts[2] !== "=") {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ": Error de asigancion");
    return;
  }

  if (parts[2] === "=") {
    if (!parts[3]) {
      output.push(
        ERROR_LINE + (indexInstruccion + 1) + ": Error de asigancion"
      );
      return;
    }
    switch (parts[0]) {
      case "number":
        if (parts[3] && (!parts[3].match(/^[0-9]+$/) || parts[4])) {
          if (parts[3] && parts[4] && parts[5]) {
            parts[4] = parts[4].trim();
            if (
              parts[4] === "+" ||
              parts[4] === "-" ||
              parts[4] === "*" ||
              parts[4] === "/"
            ) {
              if (parts[3].match(/^[0-9]+$/) && parts[5].match(/^[0-9]+$/)) {
                return;
              }

              searchExistence(
                parts[3],
                "number",
                indexSimbolo,
                indexInstruccion,
                program
              );
              searchExistence(
                parts[5],
                "number",
                indexSimbolo,
                indexInstruccion,
                program
              );
              return;
            }
          }
          output.push(
            ERROR_LINE +
              (indexInstruccion + 1) +
              ": El valor de la variable no es numerico"
          );
          return;
        }
        break;
      case "string":
        const text = instruccion.substring(
          instruccion.indexOf('"'),
          instruccion.lastIndexOf('"') + 1
        );

        if (text === "") {
          output.push(
            ERROR_LINE +
              (indexInstruccion + 1) +
              ": El valor de la variable no es alfanumerico"
          );
          return;
        }

        if (
          instruccion.indexOf('"', instruccion.indexOf('"') + 1) !==
          instruccion.lastIndexOf('"')
        ) {
          output.push(
            "Error la linea " + (indexInstruccion + 1) + ": string mal formado"
          );
          return;
        }
        if (parts[3] && !text.match(/(?:"[^"]*"|^[^"]*$)/)) {
          output.push(
            ERROR_LINE +
              (indexInstruccion + 1) +
              ": El valor de la variable no es alfanumerico"
          );
          return;
        }
        break;
      case "boolean":
        if (parts[3] && parts[3] !== "true" && parts[3] !== "false") {
          output.push(
            ERROR_LINE +
              (indexInstruccion + 1) +
              ": El valor de la variable no es booleana"
          );
          return;
        }
        break;
      default:
        output.push(
          ERROR_LINE +
            (indexInstruccion + 1) +
            ": El valor de la variable no es alfanumerico"
        );
        return;
    }
  }

  if (parts[1] === "=") {
    if (!parts[0] || !parts[2]) {
      output.push(
        ERROR_LINE + (indexInstruccion + 1) + ": Error de asigancion"
      );
      return;
    }
  }

  return false;
};

const validateSumOperation = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  let indexSuma = parts.findIndex((part) => part === "+");

  if (!parts[indexSuma - 1] || !parts[indexSuma + 1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ": Error de operacion");
    return;
  }

  if (
    !parts[indexSuma - 1].match(/^[0-9]+$/) &&
    !parts[indexSuma - 1].trim().match(/^"[a-zA-Z0-9]+"$/)
  ) {
    let existaA = false;
    existaA = searchExistence(
      parts[indexSuma - 1],
      "",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }

  if (
    !parts[indexSuma + 1].match(/^[0-9]+$/) &&
    !parts[indexSuma + 1].trim().match(/^"[a-zA-Z0-9]+"$/)
  ) {
    let existaB = false;
    existaB = searchExistence(
      parts[indexSuma + 1],
      "",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }
};

const validateRestOperation = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  let indexSuma = parts.findIndex((part) => part === "-");

  if (!parts[indexSuma - 1] || !parts[indexSuma + 1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ": Error de operacion");
    return;
  }

  if (!parts[indexSuma - 1].match(/^[0-9]+$/)) {
    let existaA = false;
    existaA = searchExistence(
      parts[indexSuma - 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }

  if (!parts[indexSuma + 1].match(/^[0-9]+$/)) {
    let existaB = false;
    existaB = searchExistence(
      parts[indexSuma + 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }
};

const validateDivisionOperation = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  let indexSuma = parts.findIndex((part) => part === "/");

  if (!parts[indexSuma - 1] || !parts[indexSuma + 1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ": Error de operacion");
    return;
  }

  if (!parts[indexSuma - 1].match(/^[0-9]+$/)) {
    let existaA = false;
    existaA = searchExistence(
      parts[indexSuma - 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }

  if (!parts[indexSuma + 1].match(/^[0-9]+$/)) {
    let existaB = false;
    existaB = searchExistence(
      parts[indexSuma + 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }
};

const validateMultiplyOperation = (
  instruccion,
  parts,
  indexSimbolo,
  indexInstruccion,
  program
) => {
  let indexSuma = parts.findIndex((part) => part === "*");

  if (!parts[indexSuma - 1] || !parts[indexSuma + 1]) {
    output.push(ERROR_LINE + (indexInstruccion + 1) + ": Error de operacion");
    return;
  }

  if (!parts[indexSuma - 1].match(/^[0-9]+$/)) {
    let existaA = false;
    existaA = searchExistence(
      parts[indexSuma - 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }

  if (!parts[indexSuma + 1].match(/^[0-9]+$/)) {
    let existaB = false;
    existaB = searchExistence(
      parts[indexSuma + 1],
      "number",
      indexSimbolo,
      indexInstruccion,
      program
    );
  }
};

const noDuplicateSymbols = (parts, indexInstruccion, program) => {
  let matches = [];
  ALL_TYPES.forEach((symbol) => {
    matches[symbol.tag] = 0;
    parts.forEach((part) => {
      if (part === symbol.tag) {
        matches[symbol.tag] += 1;
      }
    });
  });
  const failed = ALL_TYPES.find((symbol) => matches[symbol.tag] > 1);
  if (failed) {
    output.push(
      ERROR_LINE + (indexInstruccion + 1) + ": La instruccion no es monica"
    );
  }
};

const alreadyDeclared = (nombreVariable, tipo, indexUso, linea, program) => {
  const trimedProgram = program.trim();
  const declarationNumber = trimedProgram.indexOf("number " + nombreVariable);
  const declarationString = trimedProgram.indexOf("string " + nombreVariable);
  const declarationBoolean = trimedProgram.indexOf("boolean " + nombreVariable);

  if (
    (declarationNumber !== -1 && declarationNumber < indexUso) ||
    (declarationString !== -1 && declarationString < indexUso) ||
    (declarationBoolean !== -1 && declarationBoolean < indexUso)
  ) {
    output.push(
      ERROR_LINE +
        (linea + 1) +
        ": La variable " +
        nombreVariable +
        " ya fue declarada"
    );
    return true;
  }
};

const searchExistence = (nombreVariable, tipo, indexUso, linea, program) => {
  const declarationNumber = program.indexOf("number " + nombreVariable);
  const declarationString = program.indexOf("string " + nombreVariable);
  const declarationBoolean = program.indexOf("boolean " + nombreVariable);

  switch (tipo) {
    case "number":
      if (declarationNumber === -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      if (declarationString !== -1 || declarationBoolean !== -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no es del tipo " +
            tipo
        );
      }
      if (declarationNumber !== -1 && indexUso < declarationNumber) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      break;
    case "string":
      if (declarationString === -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      if (declarationNumber !== -1 || declarationBoolean !== -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no es del tipo " +
            tipo
        );
      }
      if (declarationString !== -1 && indexUso < declarationString) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      break;
    case "boolean":
      if (declarationBoolean === -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      if (declarationNumber !== -1 || declarationString !== -1) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no es del tipo " +
            tipo
        );
      }
      if (declarationBoolean !== -1 && indexUso < declarationBoolean) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      break;
    default:
      if (
        declarationNumber === -1 &&
        declarationString === -1 &&
        declarationBoolean === -1
      ) {
        output.push(
          ERROR_LINE +
            (linea + 1) +
            ": La variable " +
            nombreVariable +
            " no esta declarada"
        );
      }
      break;
  }
};

function compileProgram(program) {
  lexicStructure = [];
  symbolsMatched = [];
  output = [];

  let charIndexInstruccion = 0;

  const instructions = program.trim().split(";");

  instructions.forEach((instruction, indexInstruccion) => {
    try {
      let hasSymbols = false;

      instruction = instruction.trim();

      if (
        instruction.length <= 0 &&
        indexInstruccion !== instructions.length - 1
      ) {
        output.push("Instruccion vacia");
        return;
      }

      const parts = instruction.split(" ");

      noDuplicateSymbols(parts, indexInstruccion);

      ALL_TYPES.forEach((symbol) => {
        if (instruction.includes(symbol.tag)) {
          hasSymbols = true;
          symbolsMatched.push(symbol);

          const indexSimbolo =
            charIndexInstruccion + instruction.indexOf(symbol.tag);

          symbol.rule(
            instruction,
            parts,
            indexSimbolo,
            indexInstruccion,
            program
          );
        }
      });

      if (!hasSymbols && indexInstruccion !== instructions.length - 1) {
        output.push("Instruccion invalida");
      } else {
        lexicStructure.push(...parts);
      }

      symbolsMatched.push(ALL_TYPES.find((symbol) => symbol.tag === ";"));
      charIndexInstruccion = charIndexInstruccion + instruction.length;
    } catch (err) {
      console.log(err);
      output.push(ERROR_LINE + (indexInstruccion + 1));
    }
  });
}

function getUserInput() {
  let userInput = document.getElementById("user-input").value;
  compileProgram(userInput);
  document.getElementById("compiled-output").value =
    output && output.length
      ? output.join("\n")
      : "Codigo compilado correctamente. 0 errores";
  return;
}

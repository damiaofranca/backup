import {
  UserType,
  UserTypeName,
  FranchisseLeadStatus,
  FranchisseLeadStatusName,
  FranchisseLeadStatusColor,
  FranchisorLeadStatus,
  FranchisorLeadStatusName,
  FranchisorLeadStatusColor,
} from "./enums";

export function removeAnyMask(str: string): string {
  return str.replace(/\.|-|\\|\/|\(|\)|\s/gm, "");
}

export function getStatusFranchiseeLeadText(status: any): string {
  const status_delta = +status;
  if (status_delta === FranchisseLeadStatus.TREATED) return FranchisseLeadStatusName.TREATED;
  if (status_delta === FranchisseLeadStatus.REJECTED) return FranchisseLeadStatusName.REJECTED;
  if (status_delta === FranchisseLeadStatus.NOT_ANALYZED) return FranchisseLeadStatusName.NOT_ANALYZED;
  return FranchisseLeadStatusName.Unknown;
}

export function getStatusFranchiseeLeadColor(status: any): string {
  const status_delta = +status;
  if (status_delta === FranchisseLeadStatus.TREATED) return FranchisseLeadStatusColor.TREATED;
  if (status_delta === FranchisseLeadStatus.REJECTED) return FranchisseLeadStatusColor.REJECTED;
  if (status_delta === FranchisseLeadStatus.NOT_ANALYZED) return FranchisseLeadStatusColor.NOT_ANALYZED;
  return FranchisseLeadStatusColor.Unknown;
}

export function getStatusFranchisorLeadText(status: any): string {
  const status_delta = +status;
  if (status_delta === FranchisorLeadStatus.TREATED) return FranchisorLeadStatusName.TREATED;
  if (status_delta === FranchisorLeadStatus.REJECTED) return FranchisorLeadStatusName.REJECTED;
  if (status_delta === FranchisorLeadStatus.NOT_ANALYZED) return FranchisorLeadStatusName.NOT_ANALYZED;
  return FranchisorLeadStatusName.Unknown;
}

export function getStatusFranchisorLeadColor(status: any): string {
  const status_delta = +status;
  if (status_delta === FranchisorLeadStatus.TREATED) return FranchisorLeadStatusColor.TREATED;
  if (status_delta === FranchisorLeadStatus.REJECTED) return FranchisorLeadStatusColor.REJECTED;
  if (status_delta === FranchisorLeadStatus.NOT_ANALYZED) return FranchisorLeadStatusColor.NOT_ANALYZED;
  return FranchisorLeadStatusColor.Unknown;
}

export function getStatusText(status: any): string {
  return status ? "Ativo" : "Desativo";
}

export function getStatusAprovedText(status: any): string {
  return typeof status !== "boolean" ? "Em Aberto" : status ? "Aprovado" : "Desaprovado";
}

export function getStatusAprovedColor(status: any): string {
  return typeof status !== "boolean" ? "gold" : status ? "green" : "volcano";
}

export function getUserType(status: number | string): string {
  const status_delta = +status;
  if (status_delta === UserType.Admin) return UserTypeName.Admin;
  return UserTypeName.Franchisee;
}

export const formatPrice = (price: number) => Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

export const formatCPF = (value: string): string => {
  if (value.length === 11) {
    // 111.222.333-44
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, (...params) => {
      return `${params[1]}.${params[2]}.${params[3]}-${params[4]}`;
    });
  } else if (value.length === 13) {
    // 08.28.856/0001-73
    return value.replace(/^(\d{2})(\d{2})(\d{3})(\d{4})(\d{2})$/, (...params) => {
      return `${params[1]}.${params[2]}.${params[3]}/${params[4]}-${params[5]}`;
    });
  }
  return value;
};

// Export alias
export function formatCpfCnpj(value: string) {
  value = removeAnyMask(value || "");
  return formatCPF(value);
}

export const formatPhoneNumber = (value: string): string => {
  value = removeAnyMask(value || "");
  // 88981115258
  if (value.length === 11) {
    // (88) 9 8111-5258
    return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, (...params) => {
      return `(${params[1]}) ${params[2]} ${params[3]}-${params[4]}`;
    });
    // 8881115258
  } else if (value.length === 10) {
    // (88) 8111-5258
    return value.replace(/^(\d{2})(\d{4})(\d{4})$/, (...params) => {
      return `(${params[1]}) ${params[2]}-${params[3]}`;
    });
    // 81115258
  } else if (value.length === 8) {
    // 8111-5258
    return value.replace(/^(\d{4})(\d{4})$/, (...params) => {
      return `${params[1]}-${params[2]}`;
    });
  }
  return value;
};

export const formatCEP = (value: string): string => {
  // 63022370
  if (value.length === 8) {
    // 63022-370
    return value.replace(/^(\d{5})(\d{3})$/, (...params) => {
      return `${params[1]}-${params[2]}`;
    });
  }
  return value;
};

export function getBase64(img: File | any, callback: (...arg: any[]) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function getBase64Promise(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function transformToUpperCaseFromInput(evt: any): void {
  const { target } = evt;
  const { value } = target;

  if (/[a-z]/gm.test(`${value}`)) {
    target.value = `${value}`.toUpperCase();
  }
}

export function transformToLowerCaseFromInput(evt: any): void {
  const { target } = evt;
  const { value } = target;

  if (/[A-Z]/gm.test(`${value}`)) {
    target.value = `${value}`.toLowerCase();
  }
}

export function removeEmpty<I = Partial<any>, O = Partial<any>>(obj: I): O {
  return Object.keys(obj as {})
    .filter((k) => (obj as any)[k] != null) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof (obj as any)[k] === "object"
          ? { ...newObj, [k]: removeEmpty((obj as any)[k]) } // Recurse.
          : { ...newObj, [k]: (obj as any)[k] }, // Copy value.
      {}
    ) as O;
}

export function equals(x: any, y: any): boolean {
  if (x === y) {
    return true; // if both x and y are null or undefined and exactly the same
  } else if (!(x instanceof Object) || !(y instanceof Object)) {
    return false; // if they are not strictly equal, they both need to be Objects
  } else if (x.constructor !== y.constructor) {
    // they must have the exact same prototype chain, the closest we can do is
    // test their constructor.
    return false;
  } else {
    for (const p in x) {
      if (!x.hasOwnProperty(p)) {
        continue; // other properties were tested using x.constructor === y.constructor
      }
      if (!y.hasOwnProperty(p)) {
        return false; // allows to compare x[ p ] and y[ p ] when set to undefined
      }
      if (x[p] === y[p]) {
        continue; // if they have the same strict value or identity then they are equal
      }
      if (typeof x[p] !== "object") {
        return false; // Numbers, Strings, Functions, Booleans must be strictly equal
      }
      if (!equals(x[p], y[p])) {
        return false;
      }
    }
    for (const p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  }
}

export const deepMerge = <T>(target: Partial<any>, source: Partial<any>): T => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target as unknown as T;
};

function convertion(n: number, b: number, p: number = 1, q: number = b * p): number[] {
  return [...(n < q ? [] : convertion(n, b, q)), (n % q) - (n % p)];
}

export function convertToBase(n: number, base: number = 10): number[] {
  return convertion(n, base);
}

export function removeAccents(str: string): string {
  if ("function" === typeof str.normalize) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } else {
    const accents = "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
    const accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    const value = str.split("");
    value.forEach((letter, index) => {
      const i: number = accents.indexOf(letter);
      if (i !== -1) {
        value[index] = accentsOut[i];
      }
    });
    return value.join("");
  }
}

export const deepCopyFunction = <O = any>(inObject: any): O => {
  let outObject, value, key;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    if (key in inObject) {
      value = inObject[key];

      // Recursively (deep) copy for nested objects, including arrays
      (outObject as any)[key] = deepCopyFunction(value);
    }
  }

  return outObject as O;
};

export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export function hash(): string {
  return (crypto as any)?.randomUUID ? (crypto as any)?.randomUUID() : "_" + Math.random().toString(36).substr(2);
}

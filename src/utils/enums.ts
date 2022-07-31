export enum FranchisseLeadStatus {
  NOT_ANALYZED = 1,
  TREATED,
  REJECTED,
}
export enum ReturnScheduleStatus {
  NOT_ANALYZED = 1,
  TREATED,
  REJECTED,
}

export enum ReturnScheduleStatusName {
  NOT_ANALYZED = "Aberto",
  TREATED = "Tratado",
  REJECTED = "Rejeitado",
  Unknown = "Desconhecido",
}

export enum FranchisseLeadStatusName {
  NOT_ANALYZED = "Aberto",
  TREATED = "Tratado",
  REJECTED = "Rejeitado",
  Unknown = "Desconhecido",
}

export enum FranchisseLeadStatusColor {
  NOT_ANALYZED = "gold",
  TREATED = "green",
  REJECTED = "volcano",
  Unknown = "gold",
}

export enum FranchisorLeadStatus {
  NOT_ANALYZED = 1,
  TREATED,
  REJECTED,
}

export enum FranchisorLeadStatusName {
  NOT_ANALYZED = "Aberto",
  TREATED = "Tratado",
  REJECTED = "Rejeitado",
  Unknown = "Desconhecido",
}

export enum FranchisorLeadStatusColor {
  NOT_ANALYZED = "gold",
  TREATED = "green",
  REJECTED = "volcano",
  Unknown = "gold",
}

export enum UserType {
  Admin = 3,
  Franchisee = 2,
  Clerk = 1,
}

export enum UserTypeName {
  Admin = "Franqueadora",
  Franchisee = "Franqueado",
  Clerk = "Atendente",
  Unknown = "Desconhecido",
}

export enum ProductTypesId {
  Internet = 1,
}

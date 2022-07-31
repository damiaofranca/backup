export interface BreadcrumbsItem {
  label: string;
  link?: string;
}

export type Breadcrumbs = BreadcrumbsItem[];

export interface BreadcrumbsProps {
  setBreadcrumbs: (params: Breadcrumbs) => void;
  breadcrumbs: Breadcrumbs;
}

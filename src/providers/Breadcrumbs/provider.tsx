import React, { useCallback, useState } from "react";
import Context from "./context";
import { Breadcrumbs } from "./props";

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbsState] = useState<Breadcrumbs>([]);

  const setBreadcrumbs = useCallback((params: Breadcrumbs) => {
    setBreadcrumbsState(params);
  }, []);

  return (
    <Context.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;

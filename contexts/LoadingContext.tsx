/* eslint-disable react/prop-types */
import React, { createContext, ReactElement, useState } from 'react';

export const LoadingContext = createContext({ isLoading: false, changeStateLoading: undefined });

type LoadingProviderType = {
  children: ReactElement;
};

export const LoadingProvider = ({ children }: LoadingProviderType): ReactElement => {
  const [isLoading, setLoading] = useState(false);

  const changeStateLoading = (newState): void => {
    setLoading(newState);
  };

  return <LoadingContext.Provider value={{ isLoading, changeStateLoading }}>{children}</LoadingContext.Provider>;
};

export default { LoadingContext, LoadingProvider };

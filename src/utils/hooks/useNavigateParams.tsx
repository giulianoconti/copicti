import { useNavigate, useSearchParams } from "react-router-dom";

export const useNavigateParams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateWithParams = (params: Record<string, string>) => {
    for (const key in params) {
      searchParams.set(key, params[key]);
    }
    navigate({ search: searchParams.toString() });
  };

  return navigateWithParams;
};

import { useParams } from "react-router";

export const useStrictParams = <T extends string>(...requiredKeys: T[]) => {
  const params = useParams();

  // 런타임 에러 방어.
  // 여기 걸릴 일이 없어야한다...........
  requiredKeys.forEach((key) => {
    if (params[key] === undefined) {
      throw new Error(
        `URL Parameter '${key}' is missing. Check your Router configuration.`
      );
    }
  });

  return params as Readonly<Record<T, string>>;
};

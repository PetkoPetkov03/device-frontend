import Counter from "~/components/Counter";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { fetchApi } from "~/lib/fetchapi";
import { useContext, useEffect } from "react";
import { AuthContext } from "~/providers/auth/AuthProvider";

export function Welcome() {

  const {token} = useContext(AuthContext)

  const getUsers = async() => {
    console.log(`TOKEN: ${token}`);
    const response = await fetchApi("http://localhost:9000/api/v1/users", "GET", token);
    console.log(response);
  }

  useEffect(() => {
    if(!token) return;
    getUsers()
  }, [token]);
  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <Counter />
    </div>
  );
}
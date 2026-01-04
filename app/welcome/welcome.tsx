import Counter from "~/components/Counter";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <Counter />
    </div>
  );
}
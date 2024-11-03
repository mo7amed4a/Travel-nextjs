import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function layout({ children }) {
  if (cookies()?.get("Authorization")?.value || null) {
    return <> {children}</>;
  }
  redirect("/");
}

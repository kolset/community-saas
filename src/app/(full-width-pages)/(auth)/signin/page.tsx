import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | CrossFit Bjornsvik",
  description: "This is Next.js Signin Page CrossFit Bjornsvik",
};

export default function SignIn() {
  return <SignInForm />;
}

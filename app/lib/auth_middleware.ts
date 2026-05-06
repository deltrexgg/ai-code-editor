
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirectToRoot() {
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (!user) {
      router.replace("/");
    }
  }, []);
}


export function useAuthRedirectToDash() {
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      router.replace("/dashboard");
    }
  }, []);
}
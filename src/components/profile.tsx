"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <div>SIGNED IN: {JSON.stringify(session.data.user)}</div>;
  }
  return <div>NOT SIGNED IN</div>;
}

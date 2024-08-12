// components/withAuth.tsx
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type WithAuthProps = {
  // Define any props that are needed for the HOC, if any
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      if (!session) router.replace("/pages/login");
    }, [session, status, router]);

    if (status === "loading" || !session) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return Wrapper;
};

export default withAuth;

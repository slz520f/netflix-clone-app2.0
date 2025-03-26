// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";
// import prismadb from "../lib/prismadb";
// import { Prisma } from "@prisma/client";

// const serverAuth = async (req: NextApiRequest) => {
//   const session = await getSession({ req });
//   if (!session?.user?.email) {
//     throw new Error("Not signed in");
//   }
//   const currentUser = await prismadb.user.findUnique({
//     where: { email: session.user.email } as Prisma.UserWhereUniqueInput,
//   });
//   if (!currentUser) {
//     throw new Error("Not signed in");
//   }
//   return { currentUser };
// };

// export default serverAuth;
// import { NextApiRequest } from "next";
// import { getSession } from "next-auth/react";
// import prismadb from "../lib/prismadb";
// import { Prisma } from "@prisma/client";

// const serverAuth = async (req: NextApiRequest) => {
//   const session = await getSession({ req });
  
//   if (!session?.user?.email) {
//     throw new Error("Not signed in");
//   }

//   const currentUser = await prismadb.user.findUnique({
//     where: { email: session.user.email } as Prisma.UserWhereUniqueInput,
//   });

//   if (!currentUser) {
//     throw new Error("Not signed in");
//   }

//   return { currentUser };
// };

// export default serverAuth;
// src/app/lib/serverAuth.ts
// src/app/lib/serverAuth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prismadb from "./prismadb";

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
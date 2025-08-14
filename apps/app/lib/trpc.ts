/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/api";

// Create tRPC client
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      // You can pass headers here if needed
      // headers: () => {
      //   const token = localStorage.getItem('token');
      //   return token ? { authorization: `Bearer ${token}` } : {};
      // },
    }),
  ],
});
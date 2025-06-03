export const runtime = "nodejs"; // 👈 Importante

import { handlers } from "@/auth";
export const { GET, POST } = handlers;

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";

import Link from "next/link";

import { Settings, ChartColumnBig, NotebookPen, Target  } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="md:px-40 fixed bottom-0 flex w-full flex-col bg-muted/40 border">
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4">
          <Sheet>

              <Link href="/">
                  <NotebookPen size={24} className="text-gray-800" />
              </Link>

              <Link href="/dashboard">
                  <ChartColumnBig size={24} className="text-gray-800" />
              </Link>

              <Link href="/goals">
                  <Target size={24} className="text-gray-800" />
              </Link>

            <SheetTrigger asChild>
                <div>
                    <Settings size={24} className="text-gray-800" />
                    <span className="sr-only">Abrir/fechar</span>
                </div>
            </SheetTrigger>

            <SheetContent className="w-[300px]">
              <nav>
                <Link href="#">
                  <span>Logo</span>
                </Link>
                <ul className="mt-4 flex flex-col items-center">
                    <li><Link href="/">Início</Link></li>
                    <li><Link href="/login">Entrar</Link></li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}

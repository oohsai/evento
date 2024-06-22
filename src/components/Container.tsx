import { ReactNode } from "react";

type ChildProps = { children: ReactNode[] };

export default function Container({ children }: ChildProps) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto min-h-screen bg-white/[2%]">
      {children}
    </div>
  );
}

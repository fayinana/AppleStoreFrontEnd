import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";

interface ModalProps {
  triggerText: string;
  children: ReactNode;
}

export default function Modal({ triggerText, children }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
        <div className="bg-#1e1c1c p-6 rounded-lg shadow-lg  w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{triggerText}</DialogTitle>
          </DialogHeader>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

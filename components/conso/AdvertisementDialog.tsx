import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

export function AdvertisementDialog() {
  return (
    <>
      <DialogHeader className="hidden">
        <DialogClose>
          <Button variant="ghost">Close</Button>
        </DialogClose>
        <DialogTitle>Advertisement</DialogTitle>
        <DialogDescription>
          You can view an advertisement here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <DialogClose>
          <Button variant="ghost">Close</Button>
        </DialogClose>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
          />
        </div> */}
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}

import { auth } from "@/firebase/config";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@heroui/react";
import { signOut } from "firebase/auth";
import { Clapperboard, LogOut, TvMinimalPlay } from "lucide-react";
import toast from "react-hot-toast";

export default function UserDropdown({ user }) {
  const handleSignLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error(error?.error);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            color="secondary"
            as="button"
            className="transition-transform"
            src={user?.photoURL}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user && user?.displayName}</p>
            <p className="font-semibold">{user && user?.email}</p>
          </DropdownItem>

          <DropdownItem key="Subscription">
            <div className="flex  items-center gap-2 hover:text-purple-500">
              <TvMinimalPlay size={15}/>
              Enrolled Courses
            </div>
          </DropdownItem>
          <DropdownItem key="Courses">
            <div className="flex  items-center gap-2 hover:text-purple-500">
              <Clapperboard size={15}/>
              My Courses
            </div>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={handleSignLogOut}>
            <div className="flex  items-center gap-2 ">
              <LogOut size={15} />
              Log Out
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

import { NAVBAR_ITEMS } from "@/config";

export const NavItems = () => {
  return (
    <div className=" items-center xl:flex hidden">
      {NAVBAR_ITEMS.map((navItem, indx) => (
        <div className="flex items-center justify-center flex-shrink-0">
          <button className="flex items-center hover:bg-blue-900 p-2 rounded-lg">
            <p className="text-white text-xs font-semibold">{navItem.label}</p>
            <navItem.icon className="w-5 h-5 ms-1.5 text-white" />
          </button>
          {indx !== NAVBAR_ITEMS.length - 1 && (
            <span className="h-6 w-px mx-2 bg-gray-400" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
};

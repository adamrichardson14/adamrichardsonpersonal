import { EyeIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

type Props = {
  title: string;
  icon: ReactElement;
};
export default function LoadingMostRecentItem({ title, icon }: Props) {
  return (
    <div className="relative w-full rounded-lg border-l-2 border-b-2 border-gray-800 p-3">
      {icon}

      <h3 className="text-gray-200 mb-2 line-clamp-2 hover:text-gray-50 duration-200 transition-colors">
        {title}
      </h3>

      <div className="flex justify-between">
        <p className="underline underline-offset-4 text-gray-100 hover:text-gray-50 duration-250 transition-colors">
          Please wait
        </p>
        <div className="flex">
          <span className="block text-gray-400">...</span>
          <EyeIcon className="w-6 h-6 text-gray-400 ml-2" />
        </div>
      </div>
    </div>
  );
}

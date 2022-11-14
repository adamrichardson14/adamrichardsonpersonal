type Props = {
  className?: string;
  children: React.ReactNode;
};

import clsx from "clsx";

export default function Container({ className, children }: Props) {
  return (
    <div
      className={clsx(
        "max-w-[872px] px-4 sm:px-6 lg:px-8 mx-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

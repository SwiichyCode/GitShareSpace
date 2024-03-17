"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { useSidebar } from "@/components/layouts/Sidebar/useSidebar";

type Props = {
  dialogHeader: React.ReactNode;
  children: React.ReactNode;
};

export const SidebarDialog = ({ dialogHeader, children }: Props) => {
  const { open, setOpen } = useSidebar();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none inset-y-0 flex h-screen max-w-full md:fixed md:right-0 md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="md:transform md:transition md:ease-in-out md:duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full md:w-screen md:max-w-80">
                  <div className="flex h-full flex-col overflow-y-scroll border-l border-card bg-overlay py-6 shadow-overlay md:rounded-l-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        {dialogHeader}
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-transparent p-2 text-gray-400 transition-colors hover:bg-[#30363D] hover:text-default focus:outline-none"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <X className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import { useState } from "react";

const people = [
  { id: 1, name: "Book" },
  { id: 2, name: "Author" },
];

export default function ListBoxDropdown() {
  const [selected, setSelected] = useState(people[1]);

  return (
    <div className="w-24  rounded-lg text-sm bg-white">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={
            "py-3 px-4 ps-6 pe-10 relative block w-full rounded-lg pr-8 pl-3 text-left text-sm/6 text-black "
          }
        >
          {selected.name}
          <ChevronDownIcon
            className=" -mr-2 mt-[1px] group pointer-events-none absolute top-3.5 right-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="rounded-xl border border-black/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none mt-4"
          >
            {people.map((person) => (
              <ListboxOption
                key={person.name}
                value={person}
                className="group flex cursor-default items-center  gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-indigo-400 data-[focus]:text-white "
              >
                <CheckIcon className="invisible size-4  group-data-[selected]:visible data-[focus]:fill-white" />
                <div className="text-sm/6">{person.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
